import { useState, useEffect } from 'react';
import { campaignData } from '../data/campaignData';

export const useCampaignData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - in real app this would be an actual API call
    const loadData = async () => {
      try {
        setData(campaignData);
      } catch (error) {
        console.error('Error loading campaign data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    campaignData: data,
    loading
  };
};