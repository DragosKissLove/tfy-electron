import React, { useState, useEffect } from 'react';
import './App.css';
import { useTheme } from './ThemeContext';
import Sidebar from './Sidebar';
import Apps from './pages/Apps';
import Tools from './pages/Tools';
import Extra from './pages/Extra';
import Settings from './Settings';
import About from './pages/About';
import Login from './components/Login';
import WindowControls from './components/WindowControls';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Apps');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!window.electron) {
        setIsLoading(false);
        return;
      }
      try {
        const settings = await window.electron.getSettings();
        if (settings?.user) {
          setUser(settings.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    window.electron.saveSettings({ user: userData });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 rounded-full border-2 border-pink-500 border-t-transparent"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <WindowControls />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div className="flex bg-black min-h-screen relative">
      <WindowControls />
      <Sidebar active={activeTab} onChange={setActiveTab} user={user} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex-1 h-screen overflow-auto"
        >
          {(() => {
            switch (activeTab) {
              case 'Apps': return <Apps />;
              case 'Tools': return <Tools />;
              case 'Extra': return <Extra />;
              case 'Settings': return <Settings />;
              case 'About': return <About />;
              default: return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;