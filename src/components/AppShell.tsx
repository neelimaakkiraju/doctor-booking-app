"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block flex-none shadow-lg">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-72 max-w-[85vw] transform transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full bg-white shadow-xl border-r border-slate-200">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden sticky top-0 z-20 bg-gradient-to-r from-white to-blue-50/80 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg border border-slate-200 bg-white shadow-sm active:scale-95 transition"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Dashboard
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Doctor Booking
            </p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-4 py-6 sm:px-6 lg:px-10 bg-gradient-to-br from-slate-50 via-white to-blue-50/60">
            <div className="mx-auto w-full max-w-6xl space-y-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

