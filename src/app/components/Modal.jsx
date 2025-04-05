import { useState } from 'react';

export default function AppointmentModal({ date, onClose }) {
  const [appointment, setAppointment] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl">Book an appointment for {date || "selected date"}</h2>
        <input
          type="text"
          placeholder="Enter details"
          className="border p-2 mt-2 w-full"
          value={appointment}
          onChange={(e) => setAppointment(e.target.value)}
        />
        <div className="mt-4 flex justify-between">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
