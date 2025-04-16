interface Booking {
  status: string;
}

interface StatsSectionProps {
  bookings: Booking[];
}

export default function StatsSection({ bookings }: StatsSectionProps) {
  const total = bookings.length;
  const upcoming = bookings.filter((b) => b.status === "Confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "Cancelled").length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-500 text-white p-4 rounded">
        <h2 className="text-lg font-bold">Total Bookings</h2>
        <p>{total}</p>
      </div>
      <div className="bg-green-500 text-white p-4 rounded">
        <h2 className="text-lg font-bold">Upcoming</h2>
        <p>{upcoming}</p>
      </div>
      <div className="bg-red-500 text-white p-4 rounded">
        <h2 className="text-lg font-bold">Cancelled</h2>
        <p>{cancelled}</p>
      </div>
    </div>
  );
}
