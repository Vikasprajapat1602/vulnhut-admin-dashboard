import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden px-4">
      
      <div className="absolute w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-30 top-1/4 left-1/3 animate-ping" />
      <div className="absolute w-64 h-64 bg-pink-500 rounded-full blur-2xl opacity-20 top-1/2 right-1/4 animate-pulse" />

      
      <div className="relative z-10 w-full max-w-md">
        
        <div className="absolute inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-2xl blur-md opacity-60 animate-tilt" />
        
        <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <label htmlFor="email" className="block text-sm text-white mb-2 font-medium">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-white text-lg"></span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-[1.02] transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-white mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-white text-lg"></span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-[1.02] transition-all duration-200"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-center text-sm font-medium">{error}</p>
            )}

            <div className="text-right text-sm text-purple-300 hover:underline cursor-pointer">
              Forgot Password?
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
