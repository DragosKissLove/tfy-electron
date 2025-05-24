import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';

const tabs = ['Apps', 'Tools', 'Extra', 'Settings', 'About'];

const Sidebar = ({ active, onChange }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        width: 180,
        height: '100vh',
        backgroundColor: 'black',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRight: `2px solid ${theme.border}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // ⬅️ doar pe verticală
        gap: 12,
        padding: '0 12px',
      }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange(tab)}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '12px 18px',
            color: theme.text,
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            boxShadow: tab === active
              ? `0 4px 20px ${theme.primary}55, 0 0 5px ${theme.primary}aa inset`
              : '0 1px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',            // 🔥 ocupa toată lățimea disponibilă
            margin: '0 auto',         // 🔥 centrat pe orizontală
          }}
        >
          {tab}
        </motion.button>
      ))}
    </div>
  );
};

export default Sidebar;
