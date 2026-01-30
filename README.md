# Doctor Appointment Booking System

<img src="https://raw.githubusercontent.com/neelimaakkiraju/doctor-booking-app/main/public/logo.svg" alt="Doctor Booking Logo" width="80" />

**AI-powered doctor appointment management — modern, secure, and efficient.**

Get personalized appointment management in seconds. Book, edit, and track appointments, manage medical records, and prescriptions — all in one place.

<img src="https://img.shields.io/badge/Next.js-14-blue.svg" />
<img src="https://img.shields.io/badge/React-19-blue.svg" />
<img src="https://img.shields.io/badge/TailwindCSS-4.x-38bdf8.svg" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178c6.svg" />
<img src="https://img.shields.io/badge/Date--Fns-4.x-6c757d.svg" />
<img src="https://img.shields.io/badge/Lucide-React-yellow.svg" />
<img src="https://img.shields.io/badge/Framer--Motion-12.x-ff61f6.svg" />

---

## Features

|  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/calendar-days.svg" width="20" />   | **Monthly Calendar** | Visualize and manage appointments with an interactive calendar view |
| :------------------------------------------------------------------------------------------------------------: | :------------------- | :------------------------------------------------------------------ |
|       <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/edit.svg" width="20" />       | **Appointment CRUD** | Book, edit, and delete appointments in real time                    |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layout-dashboard.svg" width="20" /> | **Dashboard**        | View patient stats, today’s appointments, and key metrics           |
|    <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/file-text.svg" width="20" />     | **Medical Records**  | Browse and filter patient medical records                           |
|       <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/pill.svg" width="20" />       | **Prescriptions**    | Track and manage prescriptions for each patient                     |
|       <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/bell.svg" width="20" />       | **Notifications**    | Real-time feedback with toast notifications                         |
|      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield.svg" width="20" />      | **Secure Data**      | HIPAA-ready, cloud-encrypted records                                |
|      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/search.svg" width="20" />      | **Fast Search**      | Quickly find records, appointments, and prescriptions               |

---

## Demo Mode

<img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/eye.svg" width="20" /> **No API key? No problem!**

Doctor Booking gracefully handles missing or invalid API keys:

- Automatically falls back to realistic mock responses
- Shows a clear "Demo Mode" banner at the top of the app
- Each response displays a "Sample Result" badge
- Perfect for testing, development, and portfolio demos

No 401 errors, no broken UI — just a smooth experience.

---

## Tech Stack

| Layer                                                                                                             | Technology                   |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/rocket.svg" width="18" /> Framework    | Next.js 14, React 19         |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/paintbrush.svg" width="18" /> Styling  | Tailwind CSS v4              |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/code.svg" width="18" /> Language       | TypeScript (strict mode)     |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/database.svg" width="18" /> State      | React state, local storage   |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/calendar.svg" width="18" /> Date Utils | date-fns                     |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" width="18" /> Icons      | Lucide React                 |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/bell.svg" width="18" /> Notifications  | react-hot-toast              |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/film.svg" width="18" /> Animation      | framer-motion                |
| <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/check.svg" width="18" /> Linting       | ESLint, next/core-web-vitals |

---

## Project Structure

```text
src/
  app/
    dashboard/         # Stats and metrics
    prescriptions/     # Prescription management
    records/           # Medical records
    globals.css        # Global styles
    layout.tsx         # App layout
    page.tsx           # Home page (calendar)
  components/
    AppShell.tsx       # Main app shell
    Calendar.tsx       # Calendar component
    Sidebar.tsx        # Navigation sidebar
public/
  ...assets...
```

---

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
git clone https://github.com/neelimaakkiraju/doctor-booking-app.git
cd doctor-booking-app
npm install
# or
yarn install
```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. View the calendar for available slots
2. Click a date to book an appointment
3. Fill in details and submit
4. Manage appointments, records, and prescriptions from the sidebar

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
