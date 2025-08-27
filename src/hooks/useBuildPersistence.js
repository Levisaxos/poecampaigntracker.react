import { useState, useEffect } from 'react';

const BUILD_STORAGE_KEY = 'poe2-selected-build';

export const useBuildPersistence = () => {
  const [selectedBuildId, setSelectedBuildIdState] = useState(null);

  // Load selected build from localStorage on component mount
  useEffect(() => {
    try {
      const savedBuildId = localStorage.getItem(BUILD_STORAGE_KEY);
      if (savedBuildId) {
        const buildId = parseInt(savedBuildId, 10);
        console.log('Loaded build from storage:', buildId);
        setSelectedBuildIdState(buildId);
      }
    } catch (error) {
      console.warn('Failed to load selected build:', error);
    }
  }, []);

  // Save build selection whenever it changes
  const setSelectedBuildId = (buildId) => {
    console.log('Setting build ID to:', buildId);
    setSelectedBuildIdState(buildId);
    
    try {
      if (buildId) {
        localStorage.setItem(BUILD_STORAGE_KEY, buildId.toString());
      } else {
        localStorage.removeItem(BUILD_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Failed to save selected build:', error);
    }
  };

  // Clear selected build
  const clearSelectedBuild = () => {
    console.log('Clearing selected build');
    setSelectedBuildIdState(null);
    try {
      localStorage.removeItem(BUILD_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear selected build:', error);
    }
  };

  return {
    selectedBuildId,
    setSelectedBuildId,
    clearSelectedBuild
  };
};