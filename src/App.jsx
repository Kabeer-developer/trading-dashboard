import { useState } from "react";

const USERS = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@mail.com`,
}));

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 8;

  const filteredUsers = USERS.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / PER_PAGE);

  const start = (page - 1) * PER_PAGE;
  const currentUsers = filteredUsers.slice(start, start + PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search users..."
          className="w-full p-2 border rounded mb-4"
        />

        <ul>
          {currentUsers.map(user => (
            <li
              key={user.id}
              className="flex justify-between border-b py-2"
            >
              <span>{user.name}</span>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </li>
          ))}
        </ul>

        {currentUsers.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No student found
          </p>
        )}

        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
