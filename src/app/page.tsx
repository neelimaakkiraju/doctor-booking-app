import Calendar from "@/components/Calendar";
import { CalendarCheck, Clock3, PhoneCall, Shield } from "lucide-react";

export default function Home() {
  const highlights = [
    {
      title: "Same-day slots",
      value: "18",
      change: "+4 today",
      icon: CalendarCheck,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Avg. wait time",
      value: "06m",
      change: "2m faster",
      icon: Clock3,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      title: "Secure records",
      value: "HIPAA ready",
      change: "Cloud encrypted",
      icon: Shield,
      tone: "bg-indigo-50 text-indigo-700",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-sm rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Appointments
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Manage bookings with clarity
              </h1>
              <p className="text-base text-slate-600 max-w-2xl">
                Real-time scheduling, quick edits, and clean visibility across
                doctors and patients. Everything is synced locally so you can
                continue where you left off.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#book"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
              >
                <CalendarCheck className="w-4 h-4" />
                Book appointment
              </a>
              <a
                href="tel:108"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold shadow hover:bg-slate-800 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                Emergency: 108
              </a>
            </div>
          </div>
          <div className="grid w-full sm:grid-cols-3 gap-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200/70 bg-white shadow-sm px-4 py-3"
              >
                <div
                  className={`inline-flex items-center justify-center rounded-lg p-2 mb-3 ${item.tone}`}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="text-sm text-slate-500">{item.title}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xl font-semibold text-slate-900">
                    {item.value}
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-12 gap-6" id="book">
        <div className="lg:col-span-8">
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/70 shadow-sm rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Appointment calendar
                </h2>
                <p className="text-sm text-slate-500">
                  Tap any date to view or book appointments.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
                Real-time local sync
              </span>
            </div>
            <Calendar />
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                  Need quick help?
                </p>
                <h3 className="text-2xl font-bold leading-tight">
                  Call the triage desk
                </h3>
                <p className="text-sm text-white/80">
                  We route to the right doctor in under 2 minutes.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/15">
                <PhoneCall className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="bg-white text-blue-700 px-3 py-2 rounded-xl font-semibold text-lg shadow">
                108
              </div>
              <div className="space-y-1 text-sm text-white/80">
                <p>24/7 medical support</p>
                <p>Priority ambulance dispatch</p>
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/70 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">
              Tips for faster booking
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                Use the popover to preview appointments before opening.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                Edit or delete directly from the list view for a date.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                Add reasons so doctors get context instantly.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
