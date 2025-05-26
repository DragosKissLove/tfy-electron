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

    try {
      const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_GITHUB_TOKEN'
        },
        body: JSON.stringify({
          files: {
            'users.json': {
              content: JSON.stringify({ username, password })
            }
          },
          public: false
        })
      });

      if (response.ok) {
        onLogin({ username });
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black"
      style={{
        background: 'linear-gradient(45deg, #000000, #1a1a1a)',
      }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${primaryColor}22 0%, transparent 50%)`,
            animation: 'gradientMove 8s linear infinite',
          }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-96 p-8 rounded-2xl"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="flex justify-center mb-8">
          <img src="/tfy-logo.png" alt="TFY Tool" className="h-12" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-pink-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
              style={{
                boxShadow: '0 0 20px rgba(255, 192, 203, 0.2)',
              }}
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-pink-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
              style={{
                boxShadow: '0 0 20px rgba(255, 192, 203, 0.2)',
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg text-white font-medium relative overflow-hidden group"
            style={{
              background: 'linear-gradient(45deg, #ff1b6b, #45caff)',
              boxShadow: '0 0 30px rgba(255, 27, 107, 0.5)',
            }}
          >
            <span className="relative z-10">
              {isLogin ? 'Login' : 'Register'}
            </span>
            <div
              className="absolute inset-0 border-2 border-transparent"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'translateX(-100%)',
                animation: 'borderMove 2s linear infinite',
              }}
            />
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