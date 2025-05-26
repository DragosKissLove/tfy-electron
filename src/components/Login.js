import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [error, setError] = useState('');

  const handleGuestLogin = () => {
    onLogin({ username: 'Guest' });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 opacity-50" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-md mx-4 overflow-hidden"
      >
        <div className="relative p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
              TFY Tool
            </h1>
            <p className="mt-4 text-zinc-400 text-lg">
              The next generation of tools
            </p>
          </div>

          <motion.button
            onClick={handleGuestLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 rounded-2xl text-white font-medium relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-transform group-hover:scale-[1.02]" />
            <span className="relative text-lg">
              Enter as Guest
            </span>
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;