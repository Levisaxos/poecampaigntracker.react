import React from 'react';
import ActionItem from './ActionItem';

const CurrentLocation = ({ location }) => {
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
        <h2 className="text-3xl font-bold text-gray-200 mb-2">{location.locationName}</h2>
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
    </div>
  );
};

export default CurrentLocation;