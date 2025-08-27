// src/hooks/useOptionsPersistence.js
import { useState, useEffect } from 'react';

const OPTIONS_STORAGE_KEY = 'poe2-tracker-options';

const DEFAULT_OPTIONS = {
  showBuilds: true,
  showLevelTips: true,
  showNextLocation: true
};

export const useOptionsPersistence = () => {
  const [options, setOptionsState] = useState(DEFAULT_OPTIONS);

  // Load options from localStorage on component mount
  useEffect(() => {
    try {
      const savedOptions = localStorage.getItem(OPTIONS_STORAGE_KEY);
      if (savedOptions) {
        const parsedOptions = JSON.parse(savedOptions);
        // Merge with defaults to ensure new options are included
        setOptionsState({ ...DEFAULT_OPTIONS, ...parsedOptions });
      }
    } catch (error) {
      console.warn('Failed to load saved options:', error);
      setOptionsState(DEFAULT_OPTIONS);
    }
  }, []);

  // Save options whenever they change
  const setOptions = (newOptions) => {
    setOptionsState(newOptions);
    
    try {
      localStorage.setItem(OPTIONS_STORAGE_KEY, JSON.stringify(newOptions));
    } catch (error) {
      console.warn('Failed to save options:', error);
    }
  };

  // Reset options to defaults
  const resetOptions = () => {
    setOptionsState(DEFAULT_OPTIONS);
    try {
      localStorage.setItem(OPTIONS_STORAGE_KEY, JSON.stringify(DEFAULT_OPTIONS));
    } catch (error) {
      console.warn('Failed to reset options:', error);
    }
  };

  return {
    options,
    setOptions,
    resetOptions
  };
};