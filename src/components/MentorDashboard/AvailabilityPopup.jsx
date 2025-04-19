import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

const AvailabilityPopup = ({ onClose }) => {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axiosInstance.get(
          "/connect/mentor/dashboard/availability"
        );
        setAvailability(response.data.data);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to fetch availability"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  const formatTimeSlot = (slot) => {
    return `${slot.startTime} - ${slot.endTime}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg-black-100)] rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--bg-black-100)] p-4 border-b border-[var(--bg-black-50)] flex justify-between items-center">
          <h2 className="text-xl font-bold text-[var(--text-black-900)]">
            My Availability
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-black-700)] hover:text-[var(--skin-color)] focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <LoadingSpinner label="Loading availability..." />
          ) : availability ? (
            <>
              {/* Mentor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={availability.mentorId?.avatar || "/default-avatar.png"}
                  alt={availability.mentorId?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[var(--skin-color)]"
                />
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-black-900)]">
                    {availability.mentorId?.name}
                  </h3>
                  <p className="text-sm text-[var(--text-black-700)]">
                    {availability.mentorId?.profession || "Mentor"}
                  </p>
                  {availability.mentorId?.college && (
                    <p className="text-xs text-[var(--skin-color)] mt-1">
                      {availability.mentorId.college}
                    </p>
                  )}
                </div>
              </div>

              {/* Availability Details */}
              <div className="space-y-4">
                <div className="bg-[var(--bg-black-50)] p-4 rounded-lg">
                  <h4 className="font-medium text-[var(--text-black-900)] mb-2">
                    General Availability
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-[var(--text-black-700)]">
                        <span className="font-medium">Timezone:</span>{" "}
                        {availability.timezone}
                      </p>
                      <p className="text-sm text-[var(--text-black-700)]">
                        <span className="font-medium">Slot Duration:</span>{" "}
                        {availability.slotDuration} mins
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-black-700)]">
                        <span className="font-medium">Recurrence:</span>{" "}
                        {availability.recurrence}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Available Days */}
                <div>
                  <h4 className="font-medium text-[var(--text-black-900)] mb-2">
                    Available Days
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availability.availableDays.map((day) => (
                      <span
                        key={day}
                        className="px-3 py-1 bg-[var(--skin-color)] text-[var(--text-black-900)] rounded-full text-sm"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h4 className="font-medium text-[var(--text-black-900)] mb-2">
                    Time Slots
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availability.timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border ${
                          slot.isBooked
                            ? "border-red-500 bg-red-50"
                            : "border-green-500 bg-green-50"
                        }`}
                      >
                        <p className="text-sm font-medium text-black">
                          {formatTimeSlot(slot)}
                        </p>
                        <p className="text-xs mt-1 text-black">
                          {slot.isBooked ? "Booked" : "Available"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-[var(--text-black-700)] mb-4">
                Availability haven't set up yet
              </p>
              <button
                onClick={() => navigate("/availability/setup")}
                className="px-4 py-2 bg-[var(--skin-color)] hover:bg-[var(--skin-color)]/90 text-[var(--text-black-900)] rounded-lg"
              >
                SET First to see
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPopup;
