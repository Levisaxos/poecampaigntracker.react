import React from 'react';
import { Navigation } from 'lucide-react';

const MovementGuide = ({ movementGuide, compact = false }) => {
  if (!movementGuide) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 rounded border text-sm bg-purple-900 border-purple-700 text-purple-200">
        <Navigation className="w-4 h-4" />
        <span>{movementGuide}</span>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-300 mb-3 flex items-center space-x-2">
        <Navigation className="w-5 h-5 text-purple-400" />
        <span>Movement Guide</span>
      </h3>
      <div className="bg-gray-800 rounded border border-purple-600 p-4">
        <p className="text-purple-200 flex items-start space-x-2">
          <Navigation className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
          <span>{movementGuide}</span>
        </p>
      </div>
    </div>
  );
};

export default MovementGuide;