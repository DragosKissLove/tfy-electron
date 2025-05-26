import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { FiZap, FiDownload, FiWifi, FiMonitor, FiMusic, FiCpu, FiTrash2 } from 'react-icons/fi';

const tools = [
  { name: 'WinRAR Crack', function: 'winrar_crack', icon: FiDownload },
  { name: 'Atlas Tools', function: 'install_atlas_tools', icon: FiZap },
  { name: 'WiFi Passwords', function: 'wifi_passwords', icon: FiWifi },
  { name: 'Activate Windows', function: 'activate_windows', icon: FiMonitor },
  { name: 'Spotify Modded', function: 'install_spicetify_from_github', icon: FiMusic },
  { name: 'Run Optimization', function: 'run-optimization', icon: FiCpu },
  { name: 'Clean Temp Files', function: 'clean-temp', icon: FiTrash2 }
];

const Tools = () => {
  const { theme, primaryColor } = useTheme();
  const [activeButton, setActiveButton] = useState(null);
  const [status, setStatus] = useState('');

  const glowAnimation = useSpring({
    from: { boxShadow: '0 0 10px rgba(255,255,255,0.3)' },
    to: { boxShadow: '0 0 20px rgba(255,255,255,0.6)' },
    config: { duration: 1000 },
    loop: true
  });

  const handleClick = async (funcName) => {
    try {
      setActiveButton(funcName);
      setStatus('Processing...');
      const result = await window.electron.runFunction(funcName);
      setStatus(result.message || 'Operation completed successfully!');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setActiveButton(null);
    }
  };

  return (
    <motion.div
      style={{ padding: '30px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <animated.h2 
        style={{
          ...glowAnimation,
          marginBottom: '20px',
          background: `linear-gradient(45deg, ${theme.text}, ${primaryColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          padding: '10px',
          borderRadius: '8px'
        }}
      >
        🛠️ Useful Tools
      </animated.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.function}
                whileHover={{ scale: 1.02, backgroundColor: theme.hover }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleClick(tool.function)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{
                  height: '48px',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: activeButton === tool.function ? '#FFF' : theme.text,
                  fontSize: '15px',
                  fontWeight: 500,
                  boxShadow: `0 4px 12px ${theme.shadow}, 0 0 15px ${primaryColor}33`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '12px',
                  padding: '0 16px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {activeButton === tool.function ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid #fff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                ) : (
                  <Icon size={18} />
                )}
                {tool.name}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {status && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '8px',
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            color: theme.text
          }}
        >
          {status}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Tools;