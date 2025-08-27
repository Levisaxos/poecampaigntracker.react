// src/App.js
import React, { useEffect } from 'react';
import CampaignTracker from './components/CampaignTracker';

function App() {
  useEffect(() => {
    // Set the document title
    document.title = 'PoE2 Campaign Progress Tracker';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Interactive Path of Exile 2 campaign progress tracker. Follow the comprehensive leveling guide with step-by-step progress tracking through all acts.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Interactive Path of Exile 2 campaign progress tracker. Follow the comprehensive leveling guide with step-by-step progress tracking through all acts.';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Set theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#111827');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#111827';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, []);

  return <CampaignTracker />;
}

export default App;