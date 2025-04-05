"use client"

import { useState } from 'react';
import Modal from './Modal';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>
      <button onClick={() => setIsOpen(true)} className="p-2 bg-blue-500 text-white rounded">
        Open Calendar
      </button>
      {isOpen && <Modal date={selectedDate} onClose={() => setIsOpen(false)} />}
    </div>
  );
}
