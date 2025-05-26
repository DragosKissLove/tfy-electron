import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const Login = ({ onLogin }) => {
  const { primaryColor } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Simulate authentication - replace with your actual auth logic
      if (username && password) {
        onLogin({ username });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  const handleGuestLogin = () => {
    onLogin({ username: 'Guest' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-blue-500/20" />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-96 p-8 rounded-2xl bg-black/80 border border-pink-500/30"
        style={{
          boxShadow: '0 0 40px rgba(236, 72, 153, 0.3)',
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            TFY TOOL
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-pink-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-pink-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg text-white font-medium relative overflow-hidden group bg-gradient-to-r from-pink-500 to-blue-500"
          >
            {isLogin ? 'Login' : 'Register'}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleGuestLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg text-white font-medium bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Continue as Guest
          </motion.button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-400 hover:text-pink-300 text-sm"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center text-sm"
            >
              {error}
            </motion.div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;