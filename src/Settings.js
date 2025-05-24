// 📁 src/pages/Settings.js
import React from 'react';
import { useTheme } from './ThemeContext';

const Settings = () => {
  const { darkMode, setDarkMode, primaryColor, setPrimaryColor } = useTheme();

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ marginBottom: 20 }}>⚙️ Setări</h2>

      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 10 }}>🌗 Trecere între Light/Dark:</label>
        <button onClick={handleThemeToggle}>
          {darkMode ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 10 }}>🎨 Culoare primară:</label>
        <input type="color" value={primaryColor} onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default Settings;
