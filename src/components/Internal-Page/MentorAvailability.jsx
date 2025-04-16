import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format, parseISO, getDay } from "date-fns";
import * as tz from "date-fns-tz";
import { axiosInstance } from "../../utils/axios";
import LoadingSpinner from "../common/LoadingSpinner";

const { utcToZonedTime, zonedTimeToUtc } = tz;

const MentorAvailability = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [userTimezone, setUserTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axiosInstance.post(`/connect/${mentorId}`);
        setAvailability(response.data.data);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to load availability",
          {
            className: "bg-[var(--bg-black-100)] text-[var(--text-black-700)]",
          }
        );
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [mentorId, navigate]);

  // Convert time between timezones
  const convertTime = (timeStr, fromTz, toTz, date) => {
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const datetimeStr = `${dateStr}T${timeStr}`;
      const zonedDate = zonedTimeToUtc(datetimeStr, fromTz);
      const localDate = utcToZonedTime(zonedDate, toTz);
      return format(localDate, "HH:mm");
    } catch (error) {
      console.error("Timezone conversion failed:", error);
      return timeStr;
    }
  };

  // Update available slots when date changes
  useEffect(() => {
    if (availability && selectedDate) {
      const dayName = format(selectedDate, "EEEE");

      if (availability.availableDays.includes(dayName)) {
        const slots = availability.timeSlots
          .filter((slot) => !slot.isBooked)
          .map((slot) => ({
            ...slot,
            localStart: convertTime(
              slot.startTime,
              availability.timezone,
              userTimezone,
              selectedDate
            ),
            localEnd: convertTime(
              slot.endTime,
              availability.timezone,
              userTimezone,
              selectedDate
            ),
            originalStart: slot.startTime,
            originalEnd: slot.endTime,
          }));

        setAvailableSlots(slots);
      } else {
        setAvailableSlots([]);
      }
    }
  }, [selectedDate, availability, userTimezone]);

  const handleSlotSelect = (slot) => {
    // Implement booking logic here
    toast.success(`Slot selected: ${slot.localStart} - ${slot.localEnd}`, {
      className: "bg-[var(--bg-black-100)] text-[var(--text-black-700)]",
    });
  };

  if (loading) {
    return <LoadingSpinner label="Loading Availability" />;
  }

  if (!availability) {
    return (
      <div className="flex justify-center items-center h-screen bg-[var(--bg-black-900)] text-[var(--text-black-700)]">
        <p>No availability found for this mentor</p>
      </div>
    );
  }

  // Custom calendar rendering
  const renderCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();

    const days = [];

    // Empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );

      const dayName = format(date, "EEEE");
      const isAvailable = availability.availableDays.includes(dayName);
      const isToday =
        format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
      const isSelected =
        format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => setSelectedDate(date)}
          disabled={!isAvailable || date < today}
          className={`h-12 flex items-center justify-center rounded-full transition-all
            ${
              isSelected
                ? "bg-[var(--skin-color)] text-[var(--text-black-900)]"
                : ""
            }
            ${isToday ? "border-2 border-[var(--skin-color)]" : ""}
            ${
              isAvailable && date >= today
                ? "hover:bg-[var(--bg-black-50)] cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }
          `}
        >
          {day}
          {isAvailable && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--skin-color)]"></span>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-black-900)] text-[var(--text-black-700)] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Calendar Section */}
          <div className="bg-[var(--bg-black-100)] rounded-xl p-6 shadow-lg flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--text-black-900)]">
                {format(selectedDate, "MMMM yyyy")}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSelectedDate(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() - 1,
                        1
                      )
                    )
                  }
                  className="p-2 rounded-full hover:bg-[var(--bg-black-50)]"
                >
                  &lt;
                </button>
                <button
                  onClick={() =>
                    setSelectedDate(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() + 1,
                        1
                      )
                    )
                  }
                  className="p-2 rounded-full hover:bg-[var(--bg-black-50)]"
                >
                  &gt;
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-medium text-[var(--text-black-900)]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

            {/* Timezone info */}
            <div className="mt-6 text-sm text-[var(--text-black-700)]">
              <p>Mentor's timezone: {availability.timezone}</p>
              <p>Your timezone: {userTimezone}</p>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="bg-[var(--bg-black-100)] rounded-xl p-6 shadow-lg md:w-96">
            <h2 className="text-xl font-bold text-[var(--text-black-900)] mb-4">
              Available Slots for {format(selectedDate, "EEEE, MMMM do")}
            </h2>

            {availableSlots.length > 0 ? (
              <div className="space-y-3">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotSelect(slot)}
                    className="w-full p-4 bg-[var(--bg-black-50)] hover:bg-[var(--bg-black-50)]/80 rounded-lg transition flex justify-between items-center"
                  >
                    <span className="font-medium">
                      {slot.localStart} - {slot.localEnd}
                    </span>
                    <span className="text-xs opacity-70">
                      {slot.originalStart} - {slot.originalEnd} (
                      {availability.timezone})
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-[var(--bg-black-50)] rounded-lg">
                <p className="text-center">
                  {availability.availableDays.includes(
                    format(selectedDate, "EEEE")
                  )
                    ? "No available slots for this day"
                    : "Mentor not available on this day"}
                </p>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-6 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[var(--skin-color)]"></div>
                <span>Selected date</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--skin-color)] opacity-50"></div>
                <span>Available day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAvailability;
