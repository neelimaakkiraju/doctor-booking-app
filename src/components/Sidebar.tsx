"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  FileText,
  Pill,
  Stethoscope,
  Ambulance,
} from "lucide-react";

const navigation = [
  {
    name: "Appointments",
    href: "/",
    icon: CalendarDays,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Medical Records",
    href: "/records",
    icon: FileText,
  },
  {
    name: "Prescriptions",
    href: "/prescriptions",
    icon: Pill,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex-none p-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">H</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">HealthCare</h1>
            <p className="text-sm text-gray-500">Hospital</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex-none p-6 bg-blue-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-white">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">Emergency</p>
            <p className="text-2xl font-bold text-blue-600">108</p>
          </div>
        </div>
      </div>
    </div>
  );
}
