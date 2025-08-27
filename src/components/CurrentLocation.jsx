// src/components/CurrentLocation.jsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import ActionItem from './ActionItem';
import LevelingTips from './LevelingTips';
import BuildSkills from './BuildSkills';

const CurrentLocation = ({ location, selectedBuild, previousLocation, onLocationChange, showLevelTips }) => {
  if (!location) {
    return (
      <div className="p-6 bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-500">No location selected</h2>
      </div>
    );
  }

  const sortedActions = location.actions.sort((a, b) => a.order - b.order);

  const handlePreviousClick = () => {
    if (previousLocation) {
      onLocationChange(previousLocation.locationId);
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-full">
      {/* Left Navigation Sidebar - Always visible */}
      <div className="flex items-center justify-center border-r border-gray-800">
        <button
          onClick={handlePreviousClick}
          disabled={!previousLocation}
          className={`h-full px-4 transition-colors flex items-center ${
            previousLocation 
              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800 cursor-pointer' 
              : 'text-gray-600 cursor-not-allowed'
          }`}
          title={previousLocation ? `Go to previous: ${previousLocation.locationName}` : 'No previous location'}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-200">{location.locationName}</h2>
              <span className="text-sm text-blue-400 bg-blue-900 px-2 py-1 rounded border border-blue-700">
                Area Level: {location.areaLevel || 'Unknown'}
              </span>
            </div>
            {showLevelTips && <LevelingTips location={location} showStrategyOnly={true} />}
          </div>
          <p className="text-gray-500">Current Area - {sortedActions.length} actions</p>
        </div>

        <div className="space-y-4">
          {sortedActions.map(action => (
            <ActionItem
              key={`${location.locationId}-${action.actionId}`}
              action={action}
              detailed={true}
            />
          ))}
        </div>

        {showLevelTips && (
          <div>
            <LevelingTips location={location} />
          </div>
        )}

        {selectedBuild && (
          <div>
            <BuildSkills 
              build={selectedBuild} 
              currentAreaLevel={location.areaLevel || 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentLocation;