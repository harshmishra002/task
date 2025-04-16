"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookingTable from "../components/BookingTable";
import Sidebar from "../components/Sidebar";
import StatsSection from "../components/StatsSection";

interface Booking {
  id: string;
  customerName: string;
  vehicleType: string;
  pickupDateTime: string;
  dropoffDateTime: string;
  status: string;
}

export default function Home() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = () => {
      const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(storedBookings);
      setFilteredBookings(storedBookings);
    };

    fetchBookings();

    const handleStorageChange = () => {
      fetchBookings();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    fetch("/bookings.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}, URL: ${res.url}`);
        }
        return res.json();
      })
      .then((data: Booking[]) => {
        setBookings(data);
        setFilteredBookings(data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      });

    const handleUpdateBooking = (event: Event) => {
      const customEvent = event as CustomEvent;
      const updatedBooking = customEvent.detail as Booking;
      setBookings((prev) =>
        prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
      );
    };

    const handleDeleteBooking = (event: Event) => {
      const customEvent = event as CustomEvent;
      const bookingId = customEvent.detail as string;
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    };

    window.addEventListener("updateBooking", handleUpdateBooking as EventListener);
    window.addEventListener("deleteBooking", handleDeleteBooking as EventListener);

    return () => {
      window.removeEventListener("updateBooking", handleUpdateBooking);
      window.removeEventListener("deleteBooking", handleDeleteBooking);
    };
  }, []);

  const filterBookings = () => {
    const filtered = bookings.filter((booking) => {
      const pickupDate = new Date(booking.pickupDateTime);
      const dropoffDate = new Date(booking.dropoffDateTime);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return pickupDate >= start && dropoffDate <= end;
      }
      if (start) {
        return pickupDate >= start;
      }
      if (end) {
        return dropoffDate <= end;
      }
      return true;
    });

    setFilteredBookings(filtered);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Navbar matching Sidebar theme */}
        <div className="w-full bg-gray-900 text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-md">
          <h1 className="text-lg font-semibold">Welcome to the Booking Dashboard</h1>
          <p className="text-sm text-gray-300 mt-1 sm:mt-0">
            "Streamlining your ride – one booking at a time."
          </p>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <>
              <StatsSection bookings={filteredBookings} />

              {/* Date Filter */}
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded px-3 py-2 text-sm w-full sm:w-auto"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded px-3 py-2 text-sm w-full sm:w-auto"
                />
                <button
                  onClick={filterBookings}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  Filter
                </button>
              </div>

              <BookingTable
                bookings={filteredBookings}
                onRowClick={(id) => router.push(`/bookings/${id}`)}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
