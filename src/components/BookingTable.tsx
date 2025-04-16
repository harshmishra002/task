"use client";


interface Booking {
  id: string;
  customerName: string;
  vehicleType: string;
  pickupDateTime: string;
  dropoffDateTime: string;
  status: string;
}


interface BookingTableProps {
  bookings: Booking[];
  onRowClick?: (id: string) => void;
}

export default function BookingTable({ bookings, onRowClick }: BookingTableProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bookings Dashboard</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Vehicle Type</th>
            <th className="border border-gray-300 px-4 py-2">Pickup Date</th>
            <th className="border border-gray-300 px-4 py-2">Dropoff Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="cursor-pointer hover:bg-gray-900"
              onClick={() => onRowClick?.(booking.id)}
            >
              <td className="border border-gray-300 px-4 py-2">{booking.id}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.customerName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.vehicleType}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.pickupDateTime}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.dropoffDateTime}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
