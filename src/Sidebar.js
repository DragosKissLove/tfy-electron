import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';
import { FiGrid, FiTool, FiStar, FiSettings, FiInfo } from 'react-icons/fi';

const tabs = [
  { id: 'Apps', icon: FiGrid, label: 'Apps' },
  { id: 'Tools', icon: FiTool, label: 'Tools' },
  { id: 'Extra', icon: FiStar, label: 'Extra' },
  { id: 'Settings', icon: FiSettings, label: 'Settings' },
  { id: 'About', icon: FiInfo, label: 'About' }
];

const Sidebar = ({ active, onChange }) => {
  const { theme, primaryColor } = useTheme();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-20 h-screen bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-8 gap-4 fixed left-0 top-0"
    >
      {tabs.map(({ id, icon: Icon, label }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(id)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center relative group ${
            active === id ? 'text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          {active === id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}66)`,
                boxShadow: `0 0 20px ${primaryColor}33`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Icon size={24} className="relative z-10" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default Sidebar;