import React from 'react';
import { motion } from 'framer-motion';

const WindowControls = () => {
  const handleClose = () => {
    window.electron.close();
  };

  const handleMinimize = () => {
    window.electron.minimize();
  };

  const handleMaximize = () => {
    window.electron.maximize();
  };

  return (
    <div className="window-controls absolute top-4 left-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClose}
        className="window-control window-close"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleMinimize}
        className="window-control window-minimize"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleMaximize}
        className="window-control window-maximize"
      />
    </div>
  );
};

export default WindowControls;