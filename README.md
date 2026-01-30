
# Doctor Booking App

<p><b>Modern Next.js + Tailwind CSS doctor appointment system</b> — fast, secure, and easy to extend.</p>

<p>
<img src="https://img.shields.io/badge/Next.js-16.x-black?logo=nextdotjs" />
<img src="https://img.shields.io/badge/React-19.x-61dafb?logo=react" />
<img src="https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?logo=tailwindcss" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript" />
<img src="https://img.shields.io/badge/Date--Fns-4.x-6c757d" />
<img src="https://img.shields.io/badge/Lucide-React-yellow" />
<img src="https://img.shields.io/badge/Framer--Motion-12.x-ff61f6" />
<img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## Features

| Feature                | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| 📅 Monthly Calendar    | Visualize and manage appointments with an interactive calendar view |
| ✏️ Appointment CRUD    | Book, edit, and delete appointments in real time                   |
| 📊 Dashboard           | View patient stats, today’s appointments, and key metrics          |
| 📁 Medical Records     | Browse and filter patient medical records                          |
| 💊 Prescriptions       | Track and manage prescriptions for each patient                    |
| 🔔 Notifications       | Real-time feedback with toast notifications                        |
| 🛡️ Secure Data         | HIPAA-ready, cloud-encrypted records                               |
| 🔎 Fast Search         | Quickly find records, appointments, and prescriptions              |
| 📱 Responsive UI       | Mobile-first, built with Tailwind CSS                              |
| ⚡ Fast & Modern        | Optimized for performance and developer experience                 |

---

## Demo Mode

No backend? No problem!

This app can be run in demo mode with mock appointment data:

- Instantly loads sample appointments for testing and development
- No API keys or backend required
- No errors, just a smooth experience

---

## Tech Stack

| Layer       | Technology                                 |
| ----------- | ------------------------------------------ |
| Framework   | Next.js 16, React 19                       |
| Styling     | Tailwind CSS 4                             |
| Language    | TypeScript (strict mode)                   |
| State       | React state, local storage                  |
| Date Utils  | date-fns                                   |
| Icons       | Lucide React                               |
| Animation   | framer-motion                              |
| Notifications | react-hot-toast                          |
| Linting     | ESLint, next/core-web-vitals               |

---

## Project Structure

doctor-booking-app/
├── package.json           # Project dependencies & scripts
├── postcss.config.mjs     # PostCSS/Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── eslint.config.mjs      # ESLint configuration
├── public/                # Static assets (SVGs, etc)
│   ├── globe.svg
│   ├── file.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── dashboard/         # Stats and metrics
│   │   │   └── page.tsx
│   │   ├── prescriptions/     # Prescription management
│   │   │   └── page.tsx
│   │   ├── records/           # Medical records
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # App layout
│   │   └── page.tsx           # Home page (calendar)
│   ├── components/
│   │   ├── AppShell.tsx       # Main app shell
│   │   ├── Calendar.tsx       # Calendar component
│   │   └── Sidebar.tsx        # Navigation sidebar

---

## Scripts

| Command       | Description                |
| ------------- | -------------------------- |
| npm run dev   | Start development server   |
| npm run build | Build for production       |
| npm start     | Start production server    |
| npm run lint  | Run ESLint                 |

---

Bootstrapped with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).
