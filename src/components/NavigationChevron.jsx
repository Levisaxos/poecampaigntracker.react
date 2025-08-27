// src/components/NavigationChevron.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationChevron = ({ 
  location, 
  direction = 'left', 
  onClick, 
  disabled = false 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const ChevronIcon = direction === 'left' ? ChevronLeft : ChevronRight;
  const label = direction === 'left' ? 'PREVIOUS' : 'NEXT';
  
  return (
    <div 
      onClick={!disabled && location ? onClick : undefined}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`relative flex flex-col items-center justify-center border-gray-800 py-4 bg-gray-850 transition-all duration-200 ${
        !disabled && location
          ? 'hover:bg-gray-700 cursor-pointer' 
          : 'cursor-not-allowed'
      }`}
    >
      {/* Immediate Hover Tooltip */}
      {showTooltip && location && (
        <div className={`absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 border border-gray-600 rounded shadow-lg whitespace-nowrap ${
          direction === 'left' ? 'left-full ml-2' : 'right-full mr-2'
        }`}>
          Go to {direction === 'left' ? 'previous' : 'next'}: {location.locationName}
        </div>
      )}

      {/* Static Label */}
      <div className="mb-4 text-xs font-medium text-gray-400 text-center pointer-events-none">
        {label.split('').map((char, index) => (
          <div key={index} className="leading-tight">
            {char}
          </div>
        ))}
      </div>

      {/* Chevron Icon */}
      <div className={`px-3 py-2 flex items-center rounded-lg pointer-events-none ${
        !disabled && location
          ? 'text-gray-300' 
          : 'text-gray-600'
      }`}>
        <ChevronIcon className="w-7 h-7" />
      </div>
    </div>
  );
};

export default NavigationChevron;