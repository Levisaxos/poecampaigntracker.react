import React from 'react';
import ActionItem from './ActionItem';
import LevelingTips from './LevelingTips';
import BuildSkills from './BuildSkills';

const CurrentLocation = ({ location, selectedBuild }) => {
  if (!location) {
    return (
      <div className="p-6 bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-500">No location selected</h2>
      </div>
    );
  }

  const sortedActions = location.actions.sort((a, b) => a.order - b.order);

  return (
    <div className="p-6 bg-gray-900">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-gray-200">{location.locationName}</h2>
            <span className="text-sm text-blue-400 bg-blue-900 px-2 py-1 rounded border border-blue-700">
              Area Level: {location.areaLevel || 'Unknown'}
            </span>
          </div>
          <LevelingTips location={location} showStrategyOnly={true} />
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

      <LevelingTips location={location} />

      {selectedBuild && (
        <BuildSkills 
          build={selectedBuild} 
          currentAreaLevel={location.areaLevel || 1}
        />
      )}
    </div>
  );
};

export default CurrentLocation;