
import React from 'react';

const dummyUsers = [
  { id: 1, name: 'Alice', role: 'Student' },
  { id: 2, name: 'Bob', role: 'Instructor' },
  { id: 3, name: 'Charlie', role: 'Student' },
];

export default function Users() {
  return (
    <div className="p-6 text-white">
      <div className="bg-[rgba(31,41,55,0.85)] backdrop-blur-md rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold gradient-text mb-6">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-400">
                <th className="p-3 bg-gray-700 bg-opacity-30 rounded-l-xl">Name</th>
                <th className="p-3 bg-gray-700 bg-opacity-30 rounded-r-xl">Role</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-700/30 transition rounded-xl"
                >
                  <td className="p-3 bg-gray-800 bg-opacity-60 rounded-l-xl">
                    {user.name}
                  </td>
                  <td className="p-3 bg-gray-800 bg-opacity-60 rounded-r-xl">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
