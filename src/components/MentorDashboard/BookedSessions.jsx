import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { axiosInstance } from "../../utils/axios";
import LoadingSpinner from "../common/LoadingSpinner";

const BookedSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 5;
  const navigate = useNavigate();

  // Status options with colors (same as mentee dashboard)
  const statusOptions = [
    { value: "all", label: "All Sessions", color: "bg-gray-100" },
    { value: "PENDING", label: "Pending", color: "bg-yellow-100" },
    { value: "APPROVED", label: "Approved", color: "bg-green-100" },
    { value: "DECLINED", label: "Declined", color: "bg-red-100" },
    { value: "CANCELLED", label: "Cancelled", color: "bg-gray-300" },
    { value: "COMPLETED", label: "Completed", color: "bg-blue-100" },
    { value: "RESCHEDULED", label: "Rescheduled", color: "bg-purple-100" },
  ];

  // Fetch sessions for mentor
  const fetchSessions = async () => {
    try {
      const response = await axiosInstance.get("/connect/mentor/sessions");
      setSessions(response.data.data);
      setFilteredSessions(response.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Filter sessions based on status
  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredSessions(sessions);
    } else {
      setFilteredSessions(
        sessions.filter((session) => session.status === selectedStatus)
      );
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [selectedStatus, sessions]);

  // Handle session approval/decline
  const handleSessionDecision = async (sessionId, decision) => {
    setIsUpdating(true);
    try {
      const response = await axiosInstance.patch(
        `/api/sessions/${sessionId}/status`,
        {
          status: decision,
          message: `Session ${decision.toLowerCase()} by mentor`,
        }
      );

      toast.success(`Session ${decision.toLowerCase()} successfully`);
      fetchSessions(); // Refresh the list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update session");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle status update
  const handelConnect = async (sessionId) => {
    setIsUpdating(true);
    try {
      const response = await axiosInstance.put("/connect/approve", {
        sessionId,
      });

      toast.success("Appointment approved and created successfully");
      fetchSessions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to APPROVE Session");
    } finally {
      setIsUpdating(false);
    }
  };

  // handle cancellation of appointment
  const handleCancelSession = async (sessionId) => {
    try {
      const response = await axiosInstance.patch(
        `/connect/${sessionId}/cancel`
      );

      toast.success("Session cancelled successfully");
      // Update local state or refetch sessions
      fetchSessions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel session");
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.color : "bg-gray-100";
  };

  // Pagination logic
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = filteredSessions.slice(
    indexOfFirstSession,
    indexOfLastSession
  );
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

  if (loading) {
    return <LoadingSpinner label="Loading your appointments..." />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-black-900)] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[var(--text-black-900)]">
          My Appointments
        </h1>

        {/* Status Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedStatus === option.value
                  ? "bg-[var(--skin-color)] text-[var(--text-black-900)]"
                  : "bg-[var(--bg-black-100)] hover:bg-[var(--bg-black-50)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {currentSessions.length === 0 ? (
            <div className="bg-[var(--bg-black-100)] p-6 rounded-lg text-center">
              <p>No appointments found</p>
            </div>
          ) : (
            currentSessions.map((session) => (
              <div
                key={session._id}
                className={`bg-[var(--bg-black-100)] rounded-lg p-6 shadow-md border-l-4 ${getStatusColor(
                  session.status
                )}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Mentee Info (changed from mentor) */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={session.menteeId?.avatar || "/default-avatar.png"}
                      alt={session.menteeId?.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-black">
                        {session.menteeId?.fullName}
                      </h3>
                      <p className="text-sm text-black">
                        {session.menteeId?.college}
                      </p>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div>
                    <p className="font-medium text-black">
                      {format(new Date(session.date), "MMMM do, yyyy")}
                    </p>
                    <p className="text-black">
                      <span className="font-medium">Time:</span> {session.time}
                    </p>
                    <p className="text-black">
                      <span className="font-medium">Duration:</span>{" "}
                      {session.duration} mins
                    </p>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === "PENDING"
                          ? "bg-yellow-500 text-yellow-900"
                          : session.status === "APPROVED"
                          ? "bg-green-500 text-green-900"
                          : session.status === "DECLINED"
                          ? "bg-red-500 text-red-900"
                          : "bg-gray-500 text-gray-900"
                      }`}
                    >
                      {session.status}
                    </span>

                    {session.status === "PENDING" && (
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => handelConnect(session._id)}
                          disabled={isUpdating}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleCancelSession(session._id)}
                          disabled={isUpdating}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                {session.message && (
                  <div className="mt-4 pt-4 border-t border-[var(--bg-black-50)]">
                    <p className="text-sm italic text-black">
                      <span className="font-medium">Mentee's message:</span>{" "}
                      {session.message}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[var(--bg-black-100)] hover:bg-[var(--bg-black-50)] rounded text-sm"
            >
              Previous
            </button>
            <span className="text-[var(--text-black-700)]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[var(--bg-black-100)] hover:bg-[var(--bg-black-50)] rounded text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedSessions;
