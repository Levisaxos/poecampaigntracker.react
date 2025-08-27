import { useEffect } from 'react';

const ANALYTICS_STORAGE_KEY = 'poe2-analytics';
const PROGRESS_STORAGE_KEY = 'poe2-campaign-progress';

export const useUsageAnalytics = () => {
  useEffect(() => {
    // Check if this is a new unique user
    const trackUniqueUser = () => {
      try {
        // Check if analytics data exists
        let analyticsData = localStorage.getItem(ANALYTICS_STORAGE_KEY);
        let analytics = analyticsData ? JSON.parse(analyticsData) : {};

        // Check if progress data exists (indicates returning user vs completely new user)
        const hasProgressData = localStorage.getItem(PROGRESS_STORAGE_KEY) !== null;
        
        const now = new Date();
        const today = now.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        // Initialize analytics structure if it doesn't exist
        if (!analytics.userId) {
          analytics.userId = generateSimpleId();
          analytics.firstVisit = now.toISOString();
          analytics.isReturningUser = hasProgressData;
        }

        // Track daily visits
        if (!analytics.dailyVisits) {
          analytics.dailyVisits = {};
        }
        
        // Only count one visit per day
        if (!analytics.dailyVisits[today]) {
          analytics.dailyVisits[today] = {
            timestamp: now.toISOString(),
            userAgent: navigator.userAgent.slice(0, 100), // Truncate for privacy
            referrer: document.referrer ? new URL(document.referrer).hostname : 'direct',
            screenSize: `${window.screen.width}x${window.screen.height}`,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          };
          
          analytics.lastVisit = now.toISOString();
          analytics.totalVisits = (analytics.totalVisits || 0) + 1;
          
          // Save updated analytics
          localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics));
          
          // Log to console for debugging (remove in production)
          console.log('Usage tracked:', {
            userId: analytics.userId,
            totalVisits: analytics.totalVisits,
            isNewUser: !hasProgressData,
            today: today
          });
        }
        
        // Clean old data (keep only last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];
        
        Object.keys(analytics.dailyVisits).forEach(date => {
          if (date < cutoffDate) {
            delete analytics.dailyVisits[date];
          }
        });
        
        // Save cleaned data
        localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics));
        
      } catch (error) {
        // Silently fail if localStorage is not available or other errors occur
        console.warn('Analytics tracking failed:', error);
      }
    };

    // Track on component mount
    trackUniqueUser();
  }, []);

  // Function to get current analytics (useful for debugging or stats display)
  const getAnalytics = () => {
    try {
      const analyticsData = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      return analyticsData ? JSON.parse(analyticsData) : null;
    } catch {
      return null;
    }
  };

  return { getAnalytics };
};

// Simple ID generator that doesn't use any personal information
const generateSimpleId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
};