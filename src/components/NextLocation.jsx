import React from 'react';
import { ChevronRight } from 'lucide-react';

const NextLocation = ({ location, onLocationChange }) => {
  if (!location) {
    return (
      <div className="p-6 bg-gray-800">
        <div className="flex items-center mb-4">
          <ChevronRight className="w-6 h-6 text-gray-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-500">End of Act</h3>
        </div>
        <p className="text-gray-600">You've reached the end of this act!</p>
      </div>
    );
  }

  return (
    <div 
      className="p-6 bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={() => onLocationChange(location.locationId)}
    >
      <div className="flex items-center mb-4">
        <ChevronRight className="w-6 h-6 text-gray-400 mr-2" />
        <h3 className="text-xl font-semibold text-gray-300">Coming Next</h3>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-300 mb-2 hover:text-gray-200 transition-colors">
          {location.locationName}
        </h4>
        <p className="text-gray-500 text-sm">
          {location.actions.length} action{location.actions.length !== 1 ? 's' : ''} to complete
        </p>
      </div>

      <div className="space-y-2">
        {location.actions
          .sort((a, b) => a.order - b.order)
          .slice(0, 3)
          .map(action => (
            <div
              key={`${location.locationId}-${action.actionId}`}
              className="text-sm text-gray-400 bg-gray-900 rounded p-2 border border-gray-700"
            >
              • {action.action}
            </div>
          ))}
        
        {location.actions.length > 3 && (
          <div className="text-sm text-gray-600 italic">
            ...and {location.actions.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export default NextLocation;