// src/components/Header.jsx
import React, { useState } from 'react';
import { RotateCcw, Settings } from 'lucide-react';
import OptionsModal from './OptionsModal';

const Header = ({ clearProgress, options, onOptionsChange }) => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const handleResetProgress = () => {
    clearProgress();
  };

  const handleOptionsClick = () => {
    setShowOptionsModal(true);
  };

  const handleCloseOptions = () => {
    setShowOptionsModal(false);
  };

  return (
    <>
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">
                Path of Exile 2 - Campaign Progress Tracker
              </h1>
              <p className="text-gray-400 text-sm">
                Track your progress through the Path of Exile 2 campaign with this interactive guide
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={handleOptionsClick}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-200 
                           border border-gray-600 rounded text-sm transition-colors inline-flex items-center space-x-2"
                title="Open options"
              >
                <Settings className="w-4 h-4" />
                <span>Options</span>
              </button>
              
              <button
                onClick={handleResetProgress}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-200 
                           border border-gray-600 rounded text-sm transition-colors inline-flex items-center space-x-2"
                title="Reset progress to Act 1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Progress</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <OptionsModal
        isOpen={showOptionsModal}
        onClose={handleCloseOptions}
        options={options}
        onOptionsChange={onOptionsChange}
      />
    </>
  );
};

export default Header;