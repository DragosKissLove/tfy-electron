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
        className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleMaximize}
        className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClose}
        className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"
      />
    </div>
  );
};

export default WindowControls;