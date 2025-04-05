# Doctor Appointment Booking System

A modern web application for booking doctor appointments, built with Next.js and Tailwind CSS.

## Features

- Monthly calendar view for appointments
- Book, edit, and delete appointments
- Responsive design for all devices
- Clean and intuitive user interface
- Real-time appointment management

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/neelimaakkiraju/doctor-booking-app.git
cd doctor-booking-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. View the calendar to see available dates
2. Click on a date to book an appointment
3. Fill in the appointment details in the modal
4. Submit to book the appointment
5. View your appointments on the calendar

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- date-fns for date manipulation

## Project Structure

```
src/
  ├── app/
  │   ├── dashboard/
  │   │   └── page.tsx
  │   ├── prescriptions/
  │   │   └── page.tsx
  │   ├── records/
  │   │   └── page.tsx
  │   ├── favicon.ico
  │   ├── globals.css
  │   ├── layout.tsx
  │   └── page.tsx
  ├── components/
  │   ├── Calendar.tsx
  │   └── Sidebar.tsx

```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
