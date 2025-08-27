import { useState, useEffect } from 'react';
import { buildsData } from '../data/buildsData';

export const useBuildData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - in real app this would be an actual API call
    const loadData = async () => {
      try {
        setData(buildsData);
      } catch (error) {
        console.error('Error loading builds data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    buildsData: data,
    loading
  };
};