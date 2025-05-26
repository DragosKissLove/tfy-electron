import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const userData = { username };
      onLogin(userData);
      if (window.electron) {
        await window.electron.saveSettings({ user: userData });
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  const handleGuestLogin = async () => {
    const userData = { username: 'Guest' };
    onLogin(userData);
    if (window.electron) {
      await window.electron.saveSettings({ user: userData });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-8 mx-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10"
        style={{
          boxShadow: '0 0 40px rgba(192, 132, 252, 0.2)',
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-400">Sign in to continue to the application</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleGuestLogin}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 px-4 rounded-lg text-white font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Continue as Guest
            </motion.button>
          </div>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </motion.div>
    </div>
  );
};

export default Login;