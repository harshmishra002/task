"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Booking {
  id: string;
  customerName: string;
  vehicleType: string;
  pickupDateTime: string;
  dropoffDateTime: string;
  status: string;
}

export default function BookingDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (id) {
      fetch("/bookings.json")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data: Booking[]) => {
          const found = data.find((b) => b.id === id);
          setBooking(found || null);
          setEditedBooking(found || null);
        })
        .catch((err) => {
          console.error("Error fetching booking:", err);
        });
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedBooking) {
      // Simulate saving the edited booking
      setBooking(editedBooking);
      setIsEditing(false);

      // Update the bookings in localStorage
      const updatedBookings = JSON.parse(localStorage.getItem("bookings") || "[]").map((b: Booking) =>
        b.id === editedBooking.id ? editedBooking : b
      );
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));

      // Dispatch custom event to notify home page of update
      window.dispatchEvent(new CustomEvent("updateBooking", { detail: editedBooking }));

      alert("Booking successfully edited!");
      router.push("/"); // Redirect to homepage
    }
  };

  const handleCancelEdit = () => {
    setEditedBooking(booking);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Simulate deleting the booking
    const updatedBookings = JSON.parse(localStorage.getItem("bookings") || "[]").filter(
      (b: Booking) => b.id !== id
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Dispatch custom event to notify home page of deletion
    window.dispatchEvent(new CustomEvent("deleteBooking", { detail: id }));

    alert("Booking canceled successfully!");
    router.push("/"); // Redirect to homepage
  };

  if (!booking) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg text-gray-700">
      <h1 className="text-3xl font-bold text-center mb-6">Booking Details</h1>
      <div className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                value={editedBooking?.customerName || ""}
                onChange={(e) =>
                  setEditedBooking((prev) => ({ ...prev!, customerName: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <input
                type="text"
                value={editedBooking?.vehicleType || ""}
                onChange={(e) =>
                  setEditedBooking((prev) => ({ ...prev!, vehicleType: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pickup Date & Time</label>
              <input
                type="datetime-local"
                value={editedBooking?.pickupDateTime || ""}
                onChange={(e) =>
                  setEditedBooking((prev) => ({ ...prev!, pickupDateTime: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Drop-off Date & Time</label>
              <input
                type="datetime-local"
                value={editedBooking?.dropoffDateTime || ""}
                onChange={(e) =>
                  setEditedBooking((prev) => ({ ...prev!, dropoffDateTime: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </>
        ) : (
          <>
            <p>
              <span className="font-semibold">Customer Name:</span> {booking.customerName}
            </p>
            <p>
              <span className="font-semibold">Vehicle Type:</span> {booking.vehicleType}
            </p>
            <p>
              <span className="font-semibold">Pickup Date & Time:</span> {booking.pickupDateTime}
            </p>
            <p>
              <span className="font-semibold">Drop-off Date & Time:</span> {booking.dropoffDateTime}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {booking.status}
            </p>
          </>
        )}
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
}
