import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const Extra = () => {
  const { theme } = useTheme();
  const [updateStatus, setUpdateStatus] = useState('');

  const handleCheckUpdates = async () => {
    try {
      // Check if we're in Electron environment and the API is available
      if (window.api && typeof window.api.runPythonFunction === 'function') {
        await window.api.runPythonFunction('check_for_updates');
        setUpdateStatus('Update check completed');
      } else {
        console.warn('Electron API not available - app may be running in development mode');
        setUpdateStatus('Update checking is only available in the desktop app');
      }
    } catch (error) {
      console.error('Error checking updates:', error);
      setUpdateStatus('Failed to check for updates');
    }
  };

  return (
    <motion.div
      style={{ padding: 30 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 style={{ marginBottom: 20 }}>🎮 Extra Features</h2>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCheckUpdates}
        style={{
          padding: '12px 24px',
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          color: theme.text,
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: 500,
          boxShadow: theme.shadow,
          marginBottom: '10px'
        }}
      >
        Check for Updates
      </motion.button>

      {updateStatus && (
        <p style={{ 
          marginTop: '10px',
          color: theme.text,
          fontSize: '14px'
        }}>
          {updateStatus}
        </p>
      )}
    </motion.div>
  );
};

export default Extra;