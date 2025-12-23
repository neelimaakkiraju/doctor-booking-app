"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  FileText,
  Pill,
  // Stethoscope,
  // Ambulance,
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
    <div className="flex flex-col h-full w-full lg:w-64 bg-white border border-gray-200/70 rounded-2xl lg:rounded-none shadow-sm lg:shadow-none overflow-hidden">
      {/* Header */}
      <div className="flex-none p-6 pb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">H</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">
              HealthCare
            </h1>
            <p className="text-sm text-gray-500">Hospital System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-semibold">{item.name}</span>
              {isActive && (
                <span className="ml-auto w-2 h-2 rounded-full bg-blue-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex-none p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100/70">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white shadow-sm">
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
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Emergency
              </p>
              <p className="text-xl font-bold text-blue-600">108</p>
            </div>
          </div>
          <a
            href="#book"
            className="px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Book visit
          </a>
        </div>
      </div>
    </div>
  );
}
