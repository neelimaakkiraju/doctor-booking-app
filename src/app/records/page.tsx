"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";

type RecordStatus = "Active" | "Pending" | "Inactive";

type MedicalRecord = {
  id: string;
  name: string;
  shortId: string;
  department: string;
  lastVisit: string;
  age: number;
  gender: "Male" | "Female";
  status: RecordStatus;
};

const records: MedicalRecord[] = [
  {
    id: "1",
    name: "John Doe",
    shortId: "#MR-001",
    department: "Cardiology",
    lastVisit: "2024-03-15",
    age: 45,
    gender: "Male",
    status: "Active",
  },
  {
    id: "2",
    name: "Alice Smith",
    shortId: "#MR-002",
    department: "Neurology",
    lastVisit: "2024-03-14",
    age: 32,
    gender: "Female",
    status: "Pending",
  },
  {
    id: "3",
    name: "Robert Johnson",
    shortId: "#MR-003",
    department: "Pediatrics",
    lastVisit: "2024-03-13",
    age: 58,
    gender: "Male",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Sophia Lee",
    shortId: "#MR-004",
    department: "Cardiology",
    lastVisit: "2024-03-12",
    age: 28,
    gender: "Female",
    status: "Active",
  },
];

const statusStyles: Record<RecordStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Inactive: "bg-rose-100 text-rose-700",
};

export default function MedicalRecords() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState<RecordStatus | "All">("All");

  const filtered = useMemo(() => {
    return records
      .filter((record) => {
        const matchesQuery =
          record.name.toLowerCase().includes(query.toLowerCase()) ||
          record.shortId.toLowerCase().includes(query.toLowerCase());
        const matchesDept =
          department === "All" || record.department === department;
        const matchesStatus = status === "All" || record.status === status;
        return matchesQuery && matchesDept && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
      );
  }, [department, query, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
            Records
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Medical records
          </h1>
          <p className="text-sm text-slate-500">
            Search, filter, and review recent visits at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            24h updates
          </div>
          <div className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            Export coming soon
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/70 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/30">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by patient or ID"
              className="w-full text-sm outline-none"
            />
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/30">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            >
              <option value="All">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-2 items-center">
            {(["All", "Active", "Pending", "Inactive"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item as RecordStatus | "All")}
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
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{filtered.length} record(s) found</span>
          <span className="hidden sm:inline">Sorted by last visit</span>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/60">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                          <span className="text-blue-600 font-semibold">
                            {record.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-slate-900">
                          {record.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {record.gender}, {record.age}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 font-medium">
                      {record.shortId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">
                      {record.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{record.lastVisit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[record.status]}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      View
                    </button>
                    <button className="text-slate-500 hover:text-slate-700">
                      Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-6 text-center text-sm text-slate-500">
            No records match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
