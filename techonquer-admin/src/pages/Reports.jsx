import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Bug', students: 23 },
  { name: 'Logins', students: 150 },
  { name: 'Course Views', students: 320 },
  { name: 'Group A', students: 60 },
  { name: 'Group B', students: 35 },
];

export default function Report() {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Reports & Analytics</h2>
        <p className="text-white/60">Track student enrollment trends across different courses.</p>
      </div>

      <div className="relative">
        
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 blur-md opacity-20 z-0"></div>

        
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Enrollment per Course</h3>
          {data.length === 0 ? (
            <p className="text-white/70">No report data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="students" fill="#a78bfa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}