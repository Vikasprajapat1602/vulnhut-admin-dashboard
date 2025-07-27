import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import FileManager from './pages/FileManager';
import Login from './pages/Login';
import './App.css';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  
  const isLoggedIn = localStorage.getItem('user');

  return (
    <Router>
      {!isLoggedIn ? (
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        // Show main app if logged in
        <div className="grid-container">
          <Sidebar 
            openSidebarToggle={openSidebarToggle} 
            OpenSidebar={OpenSidebar}
          />
          <main className="main-container">
            <Routes>
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/files" element={<FileManager />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<h1 className="text-white">404 - Not Found</h1>} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;
