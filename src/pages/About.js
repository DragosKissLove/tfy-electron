import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const About = () => {
  const { theme } = useTheme();

  const handleOpenDiscord = async () => {
    try {
      await window.api.runPythonFunction('open_discord');
    } catch (error) {
      console.error('Error opening Discord:', error);
    }
  };

  return (
    <motion.div
      style={{ padding: 30 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 style={{ marginBottom: 20 }}>📘 About TFY Tool</h2>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpenDiscord}
        style={{
          padding: '12px 24px',
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          color: theme.text,
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: 500,
          boxShadow: theme.shadow
        }}
      >
        Join Discord
      </motion.button>
    </motion.div>
  );
};

export default About;