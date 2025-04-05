import Image from "next/image";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Doctor Appointment Booking
          </h1>
        </div>
      </header>
      <div className="container mx-auto py-8">
        <Calendar />
      </div>
    </main>
  );
}
