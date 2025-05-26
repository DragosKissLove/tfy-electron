import React from 'react';
import { motion } from 'framer-motion';

const WindowControls = () => {
  const handleClose = () => window.electron?.close();
  const handleMinimize = () => window.electron?.minimize();
  const handleMaximize = () => window.electron?.maximize();

  return (
    <div className="fixed top-0 right-0 flex items-center gap-2 p-3 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleMinimize}
        className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center group transition-colors"
      >
        <div className="w-3 h-[2px] bg-zinc-400 group-hover:bg-white transition-colors" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleMaximize}
        className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center group transition-colors"
      >
        <div className="w-3 h-3 border-2 border-zinc-400 group-hover:border-white transition-colors" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClose}
        className="w-6 h-6 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center group transition-colors"
      >
        <div className="relative w-3 h-3">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-100 rotate-45" />
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-100 -rotate-45" />
        </div>
      </motion.button>
    </div>
  );
};

export default WindowControls;