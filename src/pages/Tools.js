import React from 'react';
import { useTheme } from '../ThemeContext';
import { motion } from 'framer-motion';

const tools = [
  { name: 'WinRAR Crack', function: 'winrar_crack' },
  { name: 'Atlas Tools', function: 'install_atlas_tools' },
  { name: 'WiFi Passwords', function: 'wifi_passwords' },
  { name: 'Activate Windows', function: 'activate_windows' },
  { name: 'Spotify Modded', function: 'install_spicetify_from_github' },
];

const Tools = () => {
  const { theme } = useTheme();

  const handleClick = async (funcName) => {
    try {
      const result = await window.api.runPythonFunction(funcName);
      console.log('Rezultat:', result);
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

  return (
    <motion.div
      style={{ padding: '30px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h2 style={{ marginBottom: '20px' }}>🛠️ Useful Tools</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tools.map((tool) => (
          <motion.button
            key={tool.name}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(tool.function)}
            style={{
              height: '42px',
              border: 'none',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: theme.text,
              fontSize: '15px',
              fontWeight: 500,
              boxShadow: `0 0 8px ${theme.primary}99`,
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            {tool.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Tools;


