// 📁 src/App.js
import React, { useState } from 'react';
import './App.css';
import { useTheme } from './ThemeContext';
import Sidebar from './Sidebar';
import Apps from './pages/Apps';
import Tools from './pages/Tools';
import Extra from './pages/Extra';
import Settings from './Settings';
import About from './pages/About';

const App = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Apps');

  const renderContent = () => {
    switch (activeTab) {
      case 'Apps': return <Apps />;
      case 'Tools': return <Tools />;
      case 'Extra': return <Extra />;
      case 'Settings': return <Settings />;
      case 'About': return <About />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', background: theme.background, color: theme.text }}>
      <Sidebar active={activeTab} onChange={setActiveTab} />
      <div style={{ flex: 1 }}>{renderContent()}</div>
    </div>
  );
};

export default App;
