// src/hooks/useProgressPersistence.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'poe2-campaign-progress';

export const useProgressPersistence = () => {
  const [selectedActId, setSelectedActId] = useState(1);
  const [selectedLocationId, setSelectedLocationId] = useState(1);

  // Load progress from localStorage on component mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const { actId, locationId } = JSON.parse(savedProgress);
        setSelectedActId(actId || 1);
        setSelectedLocationId(locationId || 1);
      }
    } catch (error) {
      console.warn('Failed to load saved progress:', error);
      // Fallback to defaults if parsing fails
      setSelectedActId(1);
      setSelectedLocationId(1);
    }
  }, []);

  // Save progress whenever act or location changes
  const updateProgress = (actId, locationId) => {
    setSelectedActId(actId);
    setSelectedLocationId(locationId);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        actId,
        locationId,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.warn('Failed to save progress:', error);
    }
  };

  // Clear saved progress (useful for reset functionality)
  const clearProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSelectedActId(1);
      setSelectedLocationId(1);
    } catch (error) {
      console.warn('Failed to clear progress:', error);
    }
  };

  return {
    selectedActId,
    selectedLocationId,
    updateProgress,
    clearProgress
  };
};