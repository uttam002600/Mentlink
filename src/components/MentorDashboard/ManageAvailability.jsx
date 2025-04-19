import { useContext, useState } from "react";
import Select from "react-select";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utils/axios.js";
import { ApiContext } from "../../Context/ContextProvider.jsx";
import AvailabilityPopup from "./AvailabilityPopup.jsx";

const ManageAvailability = () => {
  const { authUser: user } = useContext(ApiContext);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("17:00");
  const [showAvailability, setShowAvailability] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      availableDays: [],
      slotDuration: 30,
      recurrence: "WEEKLY",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const dayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const durationOptions = [
    { value: 15, label: "15 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "1 hour" },
  ];

  const recurrenceOptions = [
    { value: "ONE_TIME", label: "One-time" },
    { value: "WEEKLY", label: "Weekly" },
    { value: "MONTHLY", label: "Monthly" },
  ];

  // Generate timezone options
  const timezoneOptions = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Asia/Kolkata", label: "India (IST)" },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        mentorId: user._id,
        availableDays: data.availableDays.map((day) => day.value),
        timeSlots: [
          {
            startTime,
            endTime,
            isBooked: false,
            bookedBy: null,
          },
        ],
        timezone: data.timezone.value,
        slotDuration: data.slotDuration.value,
        recurrence: data.recurrence.value,
      };

      await axiosInstance.patch("/users/mentor/availability", payload);
      toast.success("Availability saved successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      console.error("Error saving availability:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="p-4 sm:p-5 md:p-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[--text-black-900]">
            Manage Availability
          </h2>
          <button
            onClick={() => setShowAvailability(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-lg text-white font-medium bg-[--skin-color] hover:bg-purple-500 transition"
          >
            Availability Status
          </button>
        </div>
      </div>
      {showAvailability && (
        <AvailabilityPopup onClose={() => setShowAvailability(false)} />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Days Selection */}
        <div className="bg-[--bg-black-100] rounded-lg shadow-md p-6">
          <label className="block text-sm font-medium text-[--text-black-700] mb-2">
            Select Available Days
          </label>
          <Select
            isMulti
            options={dayOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={(selected) => setValue("availableDays", selected)}
            value={watch("availableDays")}
            required
          />
        </div>

        {/* Time Range */}
        <div className="bg-[--bg-black-100] rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[--text-black-700] mb-2">
              Start Time
            </label>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              disableClock
              className="w-full bg-[--bg-black-50] rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[--text-black-700] mb-2">
              End Time
            </label>
            <TimePicker
              onChange={setEndTime}
              value={endTime}
              disableClock
              className="w-full bg-[--bg-black-50] rounded-md p-2"
            />
          </div>
        </div>

        {/* Slot Duration */}
        <div className="bg-[--bg-black-100] rounded-lg shadow-md p-6">
          <label className="block text-sm font-medium text-[--text-black-700] mb-2">
            Slot Duration
          </label>
          <Select
            options={durationOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={(selected) => setValue("slotDuration", selected)}
            value={watch("slotDuration")}
            required
          />
        </div>

        {/* Recurrence */}
        <div className="bg-[--bg-black-100] rounded-lg shadow-md p-6">
          <label className="block text-sm font-medium text-[--text-black-700] mb-2">
            Recurrence Pattern
          </label>
          <Select
            options={recurrenceOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={(selected) => setValue("recurrence", selected)}
            value={watch("recurrence")}
            required
          />
        </div>

        {/* Timezone */}
        <div className="bg-[--bg-black-100] rounded-lg shadow-md p-6">
          <label className="block text-sm font-medium text-[--text-black-700] mb-2">
            Timezone
          </label>
          <Select
            options={timezoneOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={(selected) => setValue("timezone", selected)}
            value={watch("timezone")}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-white font-medium ${
              loading
                ? "bg-[--skin-color] opacity-70"
                : "bg-[--skin-color] hover:bg-green"
            } transition-colors duration-200`}
          >
            {loading ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </form>

      {/* Custom styles for react-select to match our theme */}
      <style jsx global>{`
        .react-select-container .react-select__control {
          background-color: var(--bg-black-50);
          border-color: var(--bg-black-50);
          min-height: 44px;
        }
        .react-select-container .react-select__control--is-focused {
          border-color: var(--skin-color);
          box-shadow: 0 0 0 1px var(--skin-color);
        }
        .react-select-container .react-select__multi-value {
          background-color: var(--skin-color);
          color: white;
        }
        .react-select-container .react-select__multi-value__label {
          color: white;
        }
        .react-select-container .react-select__multi-value__remove:hover {
          background-color: var(--skin-color-dark);
          color: white;
        }
        .react-select-container .react-select__option--is-selected {
          background-color: var(--skin-color);
        }
        .react-select-container .react-select__option--is-focused {
          background-color: var(--bg-black-50);
        }
      `}</style>
    </div>
  );
};

export default ManageAvailability;
