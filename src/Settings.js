import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiRefreshCw } from 'react-icons/fi';

const Settings = () => {
  const { darkMode, setDarkMode, primaryColor, setPrimaryColor } = useTheme();

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };

  const handleCheckUpdates = async () => {
    try {
      if (window.api) {
        await window.api.runPythonFunction('check_for_updates');
      }
    } catch (error) {
      console.error('Error checking updates:', error);
    }
  };

  return (
    <motion.div
      style={{ padding: 30 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 style={{ marginBottom: 20 }}>⚙️ Settings</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            padding: 20,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <h3 style={{ marginBottom: 16 }}>🎨 Appearance</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={handleThemeToggle}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              {darkMode ? <FiMoon /> : <FiSun />}
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </button>
            <input
              type="color"
              value={primaryColor}
              onChange={handleColorChange}
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            padding: 20,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <h3 style={{ marginBottom: 16 }}>🔄 Updates</h3>
          <button
            onClick={handleCheckUpdates}
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <FiRefreshCw />
            Check for Updates
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;