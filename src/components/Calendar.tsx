"use client";

import { useState, useEffect, useRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import toast, { Toaster } from "react-hot-toast";

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  reason: string;
}

const STORAGE_KEY = "doctor-appointments";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [newAppointment, setNewAppointment] = useState({
    time: "",
    patientName: "",
    reason: "",
  });
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const storedAppointments = localStorage.getItem(STORAGE_KEY);
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dayAppointments = getAppointmentsForDate(date);
    if (dayAppointments.length > 0) {
      setShowAppointmentsModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleBookAppointment = () => {
    if (selectedDate && newAppointment.time && newAppointment.patientName) {
      const appointment: Appointment = {
        id: Math.random().toString(36).substr(2, 9),
        date: selectedDate.toISOString(),
        time: newAppointment.time,
        patientName: newAppointment.patientName,
        reason: newAppointment.reason,
      };
      setAppointments([...appointments, appointment]);
      setShowModal(false);
      setNewAppointment({ time: "", patientName: "", reason: "" });
      toast.success("Appointment booked successfully!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "rgba(255, 255, 255, 0.8)",
          color: "#000",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      });
    } else {
      toast.error("Please fill in all required fields", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "rgba(255, 255, 255, 0.8)",
          color: "#000",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  };

  const handleEditAppointment = () => {
    if (editingAppointment) {
      setAppointments(
        appointments.map((app) =>
          app.id === editingAppointment.id ? editingAppointment : app
        )
      );
      setEditingAppointment(null);
      setShowAppointmentsModal(false);
      toast.success("Appointment updated successfully!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "rgba(255, 255, 255, 0.8)",
          color: "#000",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  };

  const handleDeleteAppointment = (id: string) => {
    // const appointment = appointments.find((app) => app.id === id);
    setAppointments(appointments.filter((app) => app.id !== id));
    setShowAppointmentsModal(false);
    toast.success("Appointment deleted successfully!", {
      duration: 3000,
      position: "top-right",
      style: {
        background: "rgba(255, 255, 255, 0.8)",
        color: "#000",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
    });
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) =>
      isSameDay(new Date(appointment.date), date)
    );
  };

  const handleDateHover = (date: Date, event: React.MouseEvent) => {
    const dayAppointments = getAppointmentsForDate(date);
    if (dayAppointments.length > 0) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set the position
      setPopoverPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Set the date
      setHoveredDate(date);

      // Show the popover after a small delay
      timeoutRef.current = setTimeout(() => {
        setShowPopover(true);
      }, 100);
    }
  };

  const handleDateLeave = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide the popover after a small delay
    timeoutRef.current = setTimeout(() => {
      setShowPopover(false);
      setHoveredDate(null);
    }, 100);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <Toaster />
      <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-gray-100/50">
        {/* Calendar Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() - 1
                    )
                  )
                }
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1
                    )
                  )
                }
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Calendar Grid */}
        <div className="p-3">
          <div className="grid grid-cols-7 gap-2">
            {/* Weekday Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
            {/* Calendar Days */}
            {daysInMonth.map((day) => {
              const dayAppointments = getAppointmentsForDate(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={day.toString()}
                  className={`relative aspect-square rounded-lg transition-all duration-200 ${
                    isCurrentMonth
                      ? "bg-white/80 hover:bg-white"
                      : "bg-gray-50/50 text-gray-400"
                  } ${
                    isSelected
                      ? "ring-2 ring-blue-500 bg-blue-50/80"
                      : isToday
                      ? "ring-2 ring-green-500 bg-green-50/80"
                      : "hover:ring-1 hover:ring-gray-200"
                  }`}
                  onClick={() => handleDateClick(day)}
                  onMouseEnter={(e) => handleDateHover(day, e)}
                  onMouseLeave={handleDateLeave}
                >
                  <div className="flex h-full flex-col p-1.5">
                    <span
                      className={`text-lg font-semibold ${
                        isCurrentMonth
                          ? isToday
                            ? "text-green-600"
                            : "text-gray-800"
                          : "text-gray-400"
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                    {dayAppointments.length > 0 && (
                      <div className="mt-0.5 flex-1 overflow-hidden">
                        <div className="h-full space-y-0.5">
                          {dayAppointments.slice(0, 2).map((appointment) => (
                            <div
                              key={appointment.id}
                              className="rounded bg-blue-50/80 px-1 py-0.5 text-[10px] text-blue-700"
                            >
                              {appointment.time}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="rounded bg-gray-100/80 px-1 py-0.5 text-[10px] text-gray-500">
                              +{dayAppointments.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Appointment Popover */}
      {showPopover && hoveredDate && (
        <div
          ref={popoverRef}
          role="tooltip"
          className="fixed z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-200 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
          style={{
            left: `${popoverPosition.x}px`,
            top: `${popoverPosition.y + 20}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {format(hoveredDate, "MMMM d, yyyy")}
            </h3>
          </div>
          <div className="px-3 py-2">
            <div className="space-y-2">
              {getAppointmentsForDate(hoveredDate).map((appointment) => (
                <div
                  key={appointment.id}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {appointment.patientName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Time:</span>{" "}
                    {appointment.time}
                  </div>
                  {appointment.reason && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span className="font-medium">Reason:</span>{" "}
                      {appointment.reason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            data-popper-arrow
            className="absolute w-2 h-2 bg-white border border-gray-200 dark:border-gray-600 dark:bg-gray-800"
            style={{
              left: "50%",
              top: "-2px",
              transform: "translateX(-50%) rotate(45deg)",
            }}
          ></div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md border border-gray-100/50">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-semibold text-white tracking-tight">
                Book Appointment
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <div className="mt-1 text-lg font-medium text-gray-900 bg-gray-50/50 rounded-xl px-4 py-2.5 border border-gray-200 flex items-center justify-between">
                    <span>
                      {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                    </span>
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        time: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 px-4 py-2.5"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Patient Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newAppointment.patientName}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        patientName: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 px-4 py-2.5"
                    placeholder="Enter patient's full name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Reason for Visit
                </label>
                <div className="relative">
                  <textarea
                    value={newAppointment.reason}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        reason: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 px-4 py-2.5"
                    rows={3}
                    placeholder="Brief description of the reason for visit"
                  />
                  <div className="absolute top-3 right-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100/50 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    />
                  </svg>
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Appointments Modal */}
      {showAppointmentsModal && selectedDate && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md border border-gray-100/50">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-semibold text-white tracking-tight">
                Appointments for {format(selectedDate, "MMMM d, yyyy")}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {getAppointmentsForDate(selectedDate).map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white/50 backdrop-blur-sm border border-gray-100/50 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {appointment.patientName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Time:</span>{" "}
                        {appointment.time}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Reason:</span>{" "}
                        {appointment.reason}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingAppointment(appointment);
                          setShowAppointmentsModal(false);
                        }}
                        className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAppointmentsModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100/50 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowAppointmentsModal(false);
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200"
                >
                  Book New
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {editingAppointment && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md border border-gray-100/50">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-semibold text-white tracking-tight">
                Edit Appointment
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <div className="mt-1 text-lg font-medium text-gray-900 bg-gray-50/50 rounded-xl px-4 py-2.5 border border-gray-200 flex items-center justify-between">
                    <span>
                      {format(
                        new Date(editingAppointment.date),
                        "MMMM d, yyyy"
                      )}
                    </span>
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={editingAppointment.time}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        time: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 px-4 py-2.5"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Patient Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={editingAppointment.patientName}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        patientName: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 px-4 py-2.5"
                    placeholder="Enter patient's full name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Reason for Visit
                </label>
                <div className="relative">
                  <textarea
                    value={editingAppointment.reason}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        reason: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 px-4 py-2.5"
                    rows={3}
                    placeholder="Brief description of the reason for visit"
                  />
                  <div className="absolute top-3 right-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => {
                    setEditingAppointment(null);
                    setShowAppointmentsModal(true);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100/50 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditAppointment}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
