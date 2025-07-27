import React from 'react';
import {
  BsBookFill, BsPeopleFill, BsGraphUp, BsGearFill, BsBugFill, BsBoxArrowUpRight
} from 'react-icons/bs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';

function Home() {
  const trafficData = [
    { name: 'Mon', users: 120, bugs: 5 },
    { name: 'Tue', users: 200, bugs: 3 },
    { name: 'Wed', users: 150, bugs: 2 },
    { name: 'Thu', users: 300, bugs: 6 },
    { name: 'Fri', users: 250, bugs: 4 },
    { name: 'Sat', users: 180, bugs: 1 },
    { name: 'Sun', users: 220, bugs: 0 }
  ];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>VULNHUT ADMIN DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>MANAGE COURSES</h3>
            <BsBookFill className="card_icon" />
          </div>
          <h1>24</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>MANAGE USERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>112</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>REPORTS RECEIVED</h3>
            <BsGraphUp className="card_icon" />
          </div>
          <h1>39</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>BUGS REPORTED</h3>
            <BsBugFill className="card_icon" />
          </div>
          <h1>17</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>ACTIVE SESSIONS</h3>
            <BsBoxArrowUpRight className="card_icon" />
          </div>
          <h1>9</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>SETTINGS CHANGED</h3>
            <BsGearFill className="card_icon" />
          </div>
          <h1>4</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={trafficData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#3498db" name="Active Users" />
            <Bar dataKey="bugs" fill="#e74c3c" name="Bugs Reported" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trafficData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#2ecc71" name="Users Online" />
            <Line type="monotone" dataKey="bugs" stroke="#e67e22" name="Bug Trend" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
