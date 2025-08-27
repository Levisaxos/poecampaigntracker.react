import React from 'react';
import { RotateCcw } from 'lucide-react';

const Header = ({ clearProgress }) => {
  const handleResetProgress = () => {
      clearProgress();
  };

  return (
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
          
          <button
            onClick={handleResetProgress}
            className="ml-4 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-200 
                       border border-gray-600 rounded text-sm transition-colors inline-flex items-center space-x-2"
            title="Reset progress to Act 1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;