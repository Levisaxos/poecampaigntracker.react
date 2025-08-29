import React from 'react';
import { getActionStyle, getActionIcon, getActionTag } from '../utils/actionHelpers';

const ActionItem = ({ action, detailed = false }) => {
  const actionTag = getActionTag(action);
  
  return (
    <div className={`p-2 rounded ${getActionStyle(action)}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {getActionIcon(action)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <p className="font-medium flex-1 mr-3">{action.action}</p>
            <span className={actionTag.className}>
              {actionTag.text}
            </span>
          </div>
          
          {action.reward && (
            <div className="text-sm text-gray-400 bg-gray-900 bg-opacity-50 rounded px-2 py-1 inline-block border border-gray-700">
              <strong>Reward:</strong> {action.reward}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionItem;