import React from 'react';
import { BookOpen, X } from 'lucide-react';

const BuildSelector = ({ builds, selectedBuildId, onBuildChange, onClearBuild }) => {
  if (!builds || builds.length === 0) {
    return null;
  }

  const selectedBuild = builds.find(build => build.buildId === selectedBuildId);

  return (
    <div className="flex items-center space-x-3">
      <BookOpen className="w-5 h-5 text-blue-400" />
      
      {selectedBuild ? (
        <div className="flex items-center space-x-3 flex-1">
          <div>
            <span className="text-sm font-medium text-gray-200">{selectedBuild.buildName}</span>
            <p className="text-xs text-gray-400">{selectedBuild.description}</p>
          </div>
          <button
            onClick={onClearBuild}
            className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
            title="Clear selected build"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex-1">
          <select
            value={selectedBuildId || ''}
            onChange={(e) => {
              const value = e.target.value;
              onBuildChange(value ? parseInt(value) : null);
            }}
            className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:border-gray-500 transition-colors min-w-0"
          >
            <option value="">Select a build...</option>
            {builds.map(build => (
              <option key={build.buildId} value={build.buildId}>
                {build.buildName}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default BuildSelector;