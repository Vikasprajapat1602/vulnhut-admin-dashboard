import React from 'react';

export default function Settings() {
  return (
    <div className="p-6 text-white">
      <div className="bg-[rgba(31,41,55,0.85)] backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">Settings</h2>
        <p className="text-gray-300 text-lg mb-6">
          Manage your admin preferences and configurations below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 shadow-md hover:shadow-purple-500/30 transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Theme</h3>
            <p className="text-gray-400 mb-4">Toggle between light and dark modes.</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition">
              Toggle Theme
            </button>
          </div>

          <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 shadow-md hover:shadow-purple-500/30 transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Notifications</h3>
            <p className="text-gray-400 mb-4">Enable or disable alerts.</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition">
              Manage Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
