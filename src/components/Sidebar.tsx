export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <ul>
        <li className="flex items-center mb-4">
          <span className="mr-2">🏠</span>
          <a href="/">Home</a>
        </li>
      </ul>
    </div>
  );
}
