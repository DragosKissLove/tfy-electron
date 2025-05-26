import React from 'react';
import { motion } from 'framer-motion';

const WindowControls = () => {
  const handleClose = () => window.electron.close();
  const handleMinimize = () => window.electron.minimize();
  const handleMaximize = () => window.electron.maximize();

  return (
    <div className="fixed top-0 left-0 right-0 h-8 flex justify-end items-center px-4 bg-black/50 backdrop-blur-sm z-50">
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMinimize}
          className="w-3 h-3 bg-yellow-400 rounded-full hover:brightness-110"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMaximize}
          className="w-3 h-3 bg-green-400 rounded-full hover:brightness-110"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="w-3 h-3 bg-red-400 rounded-full hover:brightness-110"
        />
      </div>
    </div>
  );
};

export default WindowControls;