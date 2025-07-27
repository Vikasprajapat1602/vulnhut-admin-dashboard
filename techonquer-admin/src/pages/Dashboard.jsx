import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill, BsFillBellFill, BsBookFill, BsFileTextFill } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 200, alerts: 5 },
  { name: 'Feb', users: 400, alerts: 7 },
  { name: 'Mar', users: 350, alerts: 3 },
  { name: 'Apr', users: 500, alerts: 9 },
  { name: 'May', users: 600, alerts: 8 },
  { name: 'Jun', users: 750, alerts: 11 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Stats cards - Always horizontal with scroll */}
      <div className="overflow-x-auto mb-6">
        <div className="flex gap-4 min-w-max pb-2 " style={{display: 'flex',justifyContent: 'space-evenly'}}>
          <div className="w-80 bg-gradient-to-r from-purple-900/50 to-purple-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3">
              <BsPeopleFill className="text-purple-400 text-4xl" />
              <div className="flex-1">
                <p className="text-purple-200 text-lg font-semibold">Total Users</p>
                <span className="text-4xl font-bold text-white">1,204</span>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <span className="mr-1">↑</span> 12% this month
                </p>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gradient-to-r from-pink-900/50 to-pink-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-pink-500/20 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3">
              <BsFillBellFill className="text-pink-400 text-4xl" />
              <div className="flex-1">
                <p className="text-pink-200 text-lg font-semibold">Active Alerts</p>
                <span className="text-4xl font-bold text-white">36</span>
                <p className="text-sm text-red-400 flex items-center mt-1">
                  <span className="mr-1">↑</span> 8% this week
                </p>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gradient-to-r from-blue-900/50 to-blue-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-500/20 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3">
              <BsBookFill className="text-blue-400 text-4xl" />
              <div className="flex-1">
                <p className="text-blue-200 text-lg font-semibold">Total Courses</p>
                <span className="text-4xl font-bold text-white">58</span>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <span className="mr-1">↑</span> 4 new this month
                </p>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-yellow-500/20 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3">
              <BsFileTextFill className="text-yellow-400 text-4xl" />
              <div className="flex-1">
                <p className="text-yellow-200 text-lg font-semibold">Reports Generated</p>
                <span className="text-4xl font-bold text-white">14</span>
                <p className="text-sm text-gray-300 mt-1">Last 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section - Full width below */}
      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20">
        <h3 className="text-xl font-semibold mb-4 text-white">User Growth & Alerts</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                backdropFilter: 'blur(4px)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="alerts" 
              stroke="#ec4899" 
              strokeWidth={3}
              dot={{ fill: '#ec4899', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
