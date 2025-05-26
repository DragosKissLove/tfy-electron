import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const Extra = () => {
  const { primaryColor } = useTheme();
  const [robloxVersion, setRobloxVersion] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRobloxDowngrade = async () => {
    if (!robloxVersion) return;
    
    setIsProcessing(true);
    setConsoleOutput([]);

    try {
      const logCallback = (message) => {
        setConsoleOutput(prev => [...prev, message]);
      };

      const progressCallback = (type, value) => {
        if (type === 'progress') {
          logCallback(`Download progress: ${Math.round(value / 1024 / 1024)}MB`);
        }
      };

      await window.electron.runFunction('download_roblox_player', {
        version: robloxVersion,
        logCallback,
        progressCallback
      });
    } catch (error) {
      setConsoleOutput(prev => [...prev, `Error: ${error.message}`]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            value={robloxVersion}
            onChange={(e) => setRobloxVersion(e.target.value)}
            placeholder="Enter Roblox version hash"
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-pink-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
            style={{
              boxShadow: '0 0 20px rgba(255, 192, 203, 0.2)',
            }}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRobloxDowngrade}
            disabled={!robloxVersion || isProcessing}
            className="w-full py-3 rounded-lg text-white font-medium relative overflow-hidden"
            style={{
              background: 'linear-gradient(45deg, #ff1b6b, #45caff)',
              boxShadow: '0 0 30px rgba(255, 27, 107, 0.5)',
              opacity: (!robloxVersion || isProcessing) ? 0.5 : 1,
            }}
          >
            {isProcessing ? 'Processing...' : 'Downgrade Roblox'}
          </motion.button>
        </div>

        {consoleOutput.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-black/50 border border-pink-500/30"
            style={{
              boxShadow: '0 0 20px rgba(255, 192, 203, 0.2)',
            }}
          >
            <div className="font-mono text-sm text-gray-300 space-y-1">
              {consoleOutput.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Extra;