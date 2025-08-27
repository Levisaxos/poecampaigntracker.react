import React from 'react';

const ActSelector = ({ acts, selectedActId, onActChange }) => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex space-x-4 overflow-x-auto">
        {acts.map(act => (
          <button
            key={act.actId}
            onClick={() => onActChange(act.actId)}
            className={`px-4 py-2 rounded font-semibold transition-colors whitespace-nowrap border ${
              selectedActId === act.actId
                ? 'bg-gray-700 text-gray-200 border-gray-600'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300 border-gray-700'
            }`}
          >
            {act.actName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActSelector;