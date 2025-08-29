// src/components/CurrentLocation.jsx
import React from 'react';
import ActionItem from './ActionItem';
import LevelingTips from './LevelingTips';
import BuildSkills from './BuildSkills';
import MovementGuide from './MovementGuide';
import NavigationChevron from './NavigationChevron';

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
      {/* Left Navigation Sidebar */}
      <NavigationChevron
        location={previousLocation}
        direction="left"
        onClick={handlePreviousClick}
        disabled={!previousLocation}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-200">{location.locationName}</h2>
              <span className="text-sm text-blue-400 bg-blue-900 px-2 py-1 rounded border border-blue-700">
                Area Level: {location.areaLevel == -1 ? 'Unknown' : location.areaLevel || 'Unknown'}
              </span>
            </div>
            <div className="flex flex-col items-end space-y-2">
              {showLevelTips && <LevelingTips location={location} showStrategyOnly={true} />}
              <MovementGuide movementGuide={location.movementGuide} compact={true} />
            </div>
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