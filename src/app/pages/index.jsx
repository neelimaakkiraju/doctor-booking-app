import Calendar from '../components/Calendar';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Doctor Appointment Booking</h1>
      <Calendar />
    </div>
  );
}
