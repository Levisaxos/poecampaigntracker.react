// src/components/OptionsModal.jsx
import React from 'react';
import { X, Settings, EyeOff } from 'lucide-react';

const OptionsModal = ({ isOpen, onClose, options, onOptionsChange }) => {
  if (!isOpen) return null;

  const handleOptionChange = (optionKey, value) => {
    onOptionsChange({
      ...options,
      [optionKey]: value
    });
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <label className="text-sm font-medium text-gray-200">
          {label}
        </label>
        <p className="text-xs text-gray-400 mt-1">
          {description}
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div className={`w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-600'
        }`}>
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          } mt-0.5 ml-0.5`} />
        </div>
      </label>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-700 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-200">Options</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Display Options */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              Display Options
            </h3>
            
            <ToggleSwitch
              checked={options.showBuilds}
              onChange={(e) => handleOptionChange('showBuilds', e.target.checked)}
              label="Build System"
              description="Show build selector and build-specific skills"
            />

            <ToggleSwitch
              checked={options.showLevelTips}
              onChange={(e) => handleOptionChange('showLevelTips', e.target.checked)}
              label="Level Tips"
              description="Show leveling tips and gear recommendations"
            />

            <ToggleSwitch
              checked={options.showNextLocation}
              onChange={(e) => handleOptionChange('showNextLocation', e.target.checked)}
              label="Next Location Panel"
              description="Show detailed next location information"
            />
          </div>

          {/* Action Filtering Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <EyeOff className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                Action Filtering
              </h3>
            </div>
            
            <ToggleSwitch
              checked={options.hideOptional}
              onChange={(e) => handleOptionChange('hideOptional', e.target.checked)}
              label="Hide Optional Actions"
              description="Hide actions marked as optional to focus on required content"
            />

            <ToggleSwitch
              checked={options.hideRecommended}
              onChange={(e) => handleOptionChange('hideRecommended', e.target.checked)}
              label="Hide Recommended Actions"
              description="Hide actions marked as recommended (keeps required and optional)"
            />            
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;