// src/components/CurrentLocation.jsx
import React from 'react';
import ActionItem from './ActionItem';
import LevelingTips from './LevelingTips';
import BuildSkills from './BuildSkills';
import MovementGuide from './MovementGuide';
import NavigationChevron from './NavigationChevron';

const CurrentLocation = ({ location, selectedBuild, previousLocation, onLocationChange, showLevelTips, options }) => {
  if (!location) {
    return (
      <div className="p-6 bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-500">No location selected</h2>
      </div>
    );
  }

  // Filter and sort actions based on priority (Required > Recommended > Optional) then by order
  const filterAndSortActions = (actions) => {
    if (!options) {
      return actions.sort((a, b) => a.order - b.order);
    }
    
    // First filter based on options
    const filtered = actions.filter(action => {
      // If hideOptional is true, hide actions that are optional (but not recommended)
      if (options.hideOptional && action.isOptional && !action.isRecommended) {
        return false;
      }
      
      // If hideRecommended is true, hide actions that are recommended
      if (options.hideRecommended && action.isRecommended) {
        return false;
      }
      
      return true;
    });
    
    // Then sort by priority first, then by order
    return filtered.sort((a, b) => {
      // Get priority values: Required = 0, Recommended = 1, Optional = 2
      const getPriority = (action) => {
        if (!action.isOptional && !action.isRecommended) return 0; // Required
        if (action.isRecommended) return 1; // Recommended
        return 2; // Optional
      };
      
      const priorityA = getPriority(a);
      const priorityB = getPriority(b);
      
      // If priorities are different, sort by priority
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If same priority, sort by order
      return a.order - b.order;
    });
  };

  const sortedActions = location.actions.sort((a, b) => a.order - b.order);
  const filteredActions = filterAndSortActions(location.actions);
  const hiddenActionCount = sortedActions.length - filteredActions.length;

  // Count actions by type for display
  const getActionCounts = (actions) => {
    const counts = {
      required: 0,
      recommended: 0,
      optional: 0
    };

    actions.forEach(action => {
      if (!action.isOptional && !action.isRecommended) {
        counts.required++;
      } else if (action.isRecommended) {
        counts.recommended++;
      } else {
        counts.optional++;
      }
    });

    return counts;
  };

  const actionCounts = getActionCounts(filteredActions);
  const totalActions = actionCounts.required + actionCounts.recommended + actionCounts.optional;

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
  {showLevelTips && (
    <div className="flex-shrink-0">
      <LevelingTips location={location} showStrategyOnly={true} />
    </div>
  )}
</div>
          
          {/* Movement Guide on separate line with full width */}
          {location.movementGuide && (
            <div className="mb-4">
              <MovementGuide movementGuide={location.movementGuide} compact={true} />
            </div>
          )}
          
          {/* Action counts in format: "2 (**1**, **1**) actions" */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <span>{totalActions}</span>
              <span className='ml-1'>(</span>
              {actionCounts.required > 0 && (
                <>
                  <span className="text-red-400 font-bold">{actionCounts.required}</span>
                  {(actionCounts.recommended > 0 || actionCounts.optional > 0) && <span>, </span>}
                </>
              )}
              {actionCounts.recommended > 0 && (
                <>
                  <span className="text-green-400 font-bold">{actionCounts.recommended}</span>
                  {actionCounts.optional > 0 && <span>, </span>}
                </>
              )}
              {actionCounts.optional > 0 && (
                <span className="text-gray-400 font-bold">{actionCounts.optional}</span>
              )}
              <span className='mr-1'>)</span>
              <span>action{totalActions !== 1 ? 's' : ''}</span>
            </div>
            
            {hiddenActionCount > 0 && (
              <p className="text-gray-600 text-sm">
                ({hiddenActionCount} hidden by filters)
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredActions.map(action => (
            <ActionItem
              key={`${location.locationId}-${action.actionId}`}
              action={action}
              detailed={true}
            />
          ))}
          
          {filteredActions.length === 0 && sortedActions.length > 0 && (
            <div className="bg-gray-800 border border-gray-600 rounded p-4 text-center">
              <p className="text-gray-400">All actions are hidden by current filters.</p>
              <p className="text-gray-500 text-sm mt-1">
                Check your options to show optional or recommended actions.
              </p>
            </div>
          )}
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