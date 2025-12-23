"use client";

import { useMemo, useState } from "react";
import { CheckCircle, Clock3, Pill, Search } from "lucide-react";

type RxStatus = "Active" | "Pending" | "Completed";

type Prescription = {
  id: string;
  patient: string;
  recordId: string;
  status: RxStatus;
  medications: { name: string; dosage: string }[];
  doctor: string;
  date: string;
};

const prescriptions: Prescription[] = [
  {
    id: "rx-1",
    patient: "John Doe",
    recordId: "#MR-001",
    status: "Active",
    medications: [
      { name: "Amoxicillin", dosage: "500mg" },
      { name: "Ibuprofen", dosage: "400mg" },
    ],
    doctor: "Dr. Smith",
    date: "2024-03-15",
  },
  {
    id: "rx-2",
    patient: "Alice Smith",
    recordId: "#MR-002",
    status: "Completed",
    medications: [
      { name: "Paracetamol", dosage: "500mg" },
      { name: "Vitamin C", dosage: "1000mg" },
    ],
    doctor: "Dr. Johnson",
    date: "2024-03-10",
  },
  {
    id: "rx-3",
    patient: "Robert Johnson",
    recordId: "#MR-003",
    status: "Pending",
    medications: [
      { name: "Lisinopril", dosage: "10mg" },
      { name: "Metformin", dosage: "500mg" },
    ],
    doctor: "Dr. Williams",
    date: "2024-03-14",
  },
];

const statusColor: Record<RxStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-slate-100 text-slate-800",
};

export default function Prescriptions() {
  const [status, setStatus] = useState<RxStatus | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return prescriptions
      .filter((rx) => {
        const matchesStatus = status === "All" || rx.status === status;
        const matchesQuery =
          rx.patient.toLowerCase().includes(query.toLowerCase()) ||
          rx.medications.some((m) =>
            m.name.toLowerCase().includes(query.toLowerCase())
          );
        return matchesStatus && matchesQuery;
      })
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, [query, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
            Prescriptions
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Medication hub</h1>
          <p className="text-sm text-slate-500">
            Track active scripts, pending approvals, and historical records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <CheckCircle className="w-4 h-4" /> Verified doctors
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Clock3 className="w-4 h-4" /> Auto reminders
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/70 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="grid gap-4 sm:grid-cols-3 sm:items-center">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/30 sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by patient or medication"
              className="w-full text-sm outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {(["All", "Active", "Pending", "Completed"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item as RxStatus | "All")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  status === item
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-slate-500">{filtered.length} record(s)</div>
      </div>

      {/* Prescription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((rx) => (
          <div
            key={rx.id}
            className="bg-white/90 backdrop-blur-xl border border-slate-200/70 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                  <span className="text-blue-600 font-semibold">
                    {rx.patient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {rx.patient}
                  </h3>
                  <p className="text-sm text-slate-500">{rx.recordId}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor[rx.status]}`}
              >
                {rx.status}
              </span>
            </div>
            <div className="space-y-3">
              {rx.medications.map((med) => (
                <div
                  key={med.name}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <Pill className="w-4 h-4 text-blue-500" />
                    {med.name}
                  </div>
                  <div className="text-sm text-slate-500">{med.dosage}</div>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  Prescribed by: {rx.doctor}
                </div>
                <div className="text-sm text-slate-600">Date: {rx.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription History */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/70 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Prescription history
          </h2>
          <span className="text-xs text-slate-500">
            Sorted by most recent date
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Dosage
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Prescribed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filtered.map((rx) =>
                rx.medications.map((med) => (
                  <tr key={`${rx.id}-${med.name}`} className="hover:bg-slate-50/60">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-slate-900">
                        {rx.patient}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{med.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{med.dosage}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{rx.doctor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{rx.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor[rx.status]}`}
                      >
                        {rx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-6 text-center text-sm text-slate-500">
            No prescriptions match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
