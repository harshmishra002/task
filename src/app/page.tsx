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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = () => {
      const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(storedBookings);
    };

    fetchBookings(); // Load bookings on initial render

    const handleStorageChange = () => {
      fetchBookings(); // Update bookings when localStorage changes
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    fetch("/bookings.json") // Ensure this path matches the location in the public directory
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}, URL: ${res.url}`);
        }
        return res.json();
      })
      .then((data: Booking[]) => {
        console.log("Fetched bookings:", data);
        setBookings(data);
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

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <StatsSection bookings={bookings} />
            <BookingTable
              bookings={bookings}
              onRowClick={(id) => router.push(`/bookings/${id}`)}
            />
          </>
        )}
      </main>
    </div>
  );
}
