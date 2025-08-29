import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Zap, Clock, AlertTriangle } from 'lucide-react';
import { levelingData } from '../data/levelingData';

const LevelingTips = ({ location, showStrategyOnly = false, showSummaryOnly = false }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const getClearingStrategyInfo = (strategy) => {
    switch (strategy) {
      case 'fast':
        return {
          icon: <Zap className="w-4 h-4 text-yellow-400" />,
          text: 'Rush through - minimal clearing',
          className: 'bg-yellow-900 border-yellow-700 text-yellow-200'
        };
      case 'slow':
        return {
          icon: <Clock className="w-4 h-4 text-green-400" />,
          text: 'Clear thoroughly - good for leveling',
          className: 'bg-green-900 border-green-700 text-green-200'
        };
      case 'normal':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-blue-400" />,
          text: 'Normal clearing strategy',
          className: 'bg-blue-900 border-blue-700 text-blue-200'
        };
      case 'unknown':
      case 'undefined':
      case undefined:
      case null:
        return {
          icon: <AlertTriangle className="w-4 h-4 text-gray-400" />,
          text: 'Strategy not determined',
          className: 'bg-gray-700 border-gray-600 text-gray-300'
        };
      default:
        return {
          icon: <AlertTriangle className="w-4 h-4 text-gray-400" />,
          text: 'Strategy not determined',
          className: 'bg-gray-700 border-gray-600 text-gray-300'
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-400 bg-red-900 border-red-700';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-900 border-yellow-700';
      default:
        return 'text-gray-400 bg-gray-700 border-gray-600';
    }
  };

  // If only showing strategy, return just the strategy badge
  if (showStrategyOnly) {
    const strategyInfo = getClearingStrategyInfo(location.clearingStrategy);
    return (
      <div className={`flex items-center space-x-2 px-3 py-1 rounded border text-sm ${strategyInfo.className}`}>
        {strategyInfo.icon}
        <span>{strategyInfo.text}</span>
      </div>
    );
  }

  const toggleItemExpansion = (itemIndex, levelIndex) => {
    const itemId = `${levelIndex}-${itemIndex}`;
    const newExpanded = new Set(expandedItems);
    
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    
    setExpandedItems(newExpanded);
  };

  // Helper function to get the highest level tips that should be available for a given area level
  const getApplicableLevels = (targetAreaLevel) => {
    // Get all level tips that are at or below the target area level
    const applicableTips = levelingData.levels.filter(levelData => 
      levelData.level <= targetAreaLevel
    );
    
    // If no tips are found, return empty array
    if (applicableTips.length === 0) {
      console.log(`No tips found for area level ${targetAreaLevel}`);
      return [];
    }
    
    // Find the highest level that has tips
    const highestLevel = Math.max(...applicableTips.map(tip => tip.level));
    
    // Return only the tips for the highest level
    const mostRecentTips = applicableTips.filter(tip => tip.level === highestLevel);
    console.log(`Area Level ${targetAreaLevel}: Showing only Level ${highestLevel} tips (${mostRecentTips.length} categories)`);
    return mostRecentTips;
  };

  // If showing summary only (for Next Location), return condensed format
  if (showSummaryOnly) {
    if (!location) return null;
    if (!location.areaLevel && location.areaLevel !== 0) return null;
    
    const relevantLevels = getApplicableLevels(location.areaLevel).slice(0, 2); // Show last 2 for summary

    if (relevantLevels.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Level Tips Available</h4>
        <div className="space-y-2">
          {relevantLevels.map((levelData) => (
            <div key={levelData.level} className="text-sm text-gray-500">
              <span className="text-gray-400">Level {levelData.level}:</span>{' '}
              <span>{levelData.category}</span>{' '}
              <span className="text-gray-600">({levelData.items.length} item{levelData.items.length !== 1 ? 's' : ''})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!location) {
    return null;
  }

  // If no area level is set, don't show any tips
  if (!location.areaLevel && location.areaLevel !== 0) {
    return null;
  }

  // Get applicable levels using the helper function
  const relevantLevels = getApplicableLevels(location.areaLevel);

  if (relevantLevels.length === 0) {
    return null;
  }

  if (relevantLevels.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="space-y-4">
        {relevantLevels.map((levelData, levelIndex) => (
          <div key={levelData.level}>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Level {levelData.level}
            </h3>

            <div className="space-y-2">
              {levelData.items.map((item, itemIndex) => {
                const itemId = `${levelIndex}-${itemIndex}`;
                const isExpanded = expandedItems.has(itemId);
                const hasInstructions = item.instructions && item.instructions.length > 0;

                return (
                  <div key={itemIndex} className="bg-gray-800 rounded border border-gray-600">
                    <div 
                      className={`p-3 ${hasInstructions ? 'cursor-pointer hover:bg-gray-750' : ''}`}
                      onClick={() => hasInstructions && toggleItemExpansion(itemIndex, levelIndex)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm text-gray-400">{levelData.category}</span>
                            <span className="text-gray-500">-</span>
                            <span className="font-medium text-gray-200">{item.itemType}</span>
                            <span className="text-gray-500">-</span>
                            <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(levelData.priority)}`}>
                              Priority: {levelData.priority}
                            </span>
                            {hasInstructions && (
                              <div className="flex items-center space-x-1 ml-2">
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                          
                          {item.targetStat && (
                            <p className="text-sm text-green-400 mb-1">{item.targetStat}</p>
                          )}
                          
                          {item.purpose && (
                            <p className="text-sm text-gray-400 mb-1">{item.purpose}</p>
                          )}
                          
                          {item.source && (
                            <p className="text-sm text-blue-400 mb-1">Source: {item.source}</p>
                          )}
                          
                          {item.note && (
                            <p className="text-sm text-yellow-400 mb-1">Note: {item.note}</p>
                          )}
                          
                          {item.warning && (
                            <p className="text-sm text-red-400 mb-1">⚠️ {item.warning}</p>
                          )}
                        </div>
                      </div>

                      {isExpanded && hasInstructions && (
                        <div className="mt-3 pt-3 border-t border-gray-600">
                          <p className="text-sm font-medium text-gray-300 mb-2">Instructions:</p>
                          <ul className="space-y-1">
                            {item.instructions.map((instruction, instrIndex) => (
                              <li key={instrIndex} className="text-sm text-gray-400 flex items-start">
                                <span className="text-gray-500 mr-2">•</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelingTips;