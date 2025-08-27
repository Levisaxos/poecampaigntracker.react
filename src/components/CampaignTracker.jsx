// src/components/CampaignTracker.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ActSelector from './ActSelector';
import LocationNavigator from './LocationNavigator';
import CurrentLocation from './CurrentLocation';
import NextLocation from './NextLocation';
import BuildSelector from './BuildSelector';
import DisclaimerBanner from './DisclaimerBanner';
import { useCampaignData } from '../hooks/useCampaignData';
import { useBuildData } from '../hooks/useBuildData';
import { useProgressPersistence } from '../hooks/useProgressPersistence';
import { useBuildPersistence } from '../hooks/useBuildPersistence';
import { useUsageAnalytics } from '../hooks/useUsageAnalytics';

const CampaignTracker = () => {
  const { campaignData, loading: campaignLoading } = useCampaignData();
  const { buildsData, loading: buildsLoading } = useBuildData();
  const { selectedActId, selectedLocationId, updateProgress, clearProgress } = useProgressPersistence();
  const { selectedBuildId, setSelectedBuildId, clearSelectedBuild } = useBuildPersistence();
  
  // Track usage analytics
  const { getAnalytics } = useUsageAnalytics();

  if (campaignLoading || buildsLoading || !campaignData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const currentAct = campaignData.acts.find(act => act.actId === selectedActId);
  const sortedLocations = currentAct?.locations.sort((a, b) => a.order - b.order) || [];
  const currentLocation = sortedLocations.find(loc => loc.locationId === selectedLocationId);
  
  // Check for next location in current act first
  let nextLocation = sortedLocations.find(loc => loc.order === (currentLocation?.order || 0) + 1);
  
  // If no next location in current act, try to get first location of next act
  if (!nextLocation) {
    const nextAct = campaignData.acts.find(act => act.actId === selectedActId + 1);
    if (nextAct && nextAct.locations.length > 0) {
      const nextActSortedLocations = nextAct.locations.sort((a, b) => a.order - b.order);
      nextLocation = nextActSortedLocations[0];
    }
  }

  // Get selected build
  const selectedBuild = buildsData?.builds.find(build => build.buildId === selectedBuildId) || null;

  const handleActChange = (actId) => {
    const newAct = campaignData.acts.find(act => act.actId === actId);
    const firstLocation = newAct?.locations.sort((a, b) => a.order - b.order)[0];
    if (firstLocation) {
      updateProgress(actId, firstLocation.locationId);
    }
  };

  const handleLocationChange = (locationId) => {
    // Check if the location is in the current act
    const locationInCurrentAct = sortedLocations.find(loc => loc.locationId === locationId);
    
    if (locationInCurrentAct) {
      // Location is in current act, just change location
      updateProgress(selectedActId, locationId);
    } else {
      // Location might be in a different act, find which act it belongs to
      const targetAct = campaignData.acts.find(act => 
        act.locations.some(loc => loc.locationId === locationId)
      );
      
      if (targetAct) {
        updateProgress(targetAct.actId, locationId);
      }
    }
  };

  // Handle reset progress - clear both campaign and build progress
  const handleResetProgress = () => {
    clearProgress();
    clearSelectedBuild();
  };

  const handleBuildChange = (buildId) => {
    setSelectedBuildId(buildId);
  };

  const handleClearBuild = () => {
    clearSelectedBuild();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <DisclaimerBanner />
      <Header clearProgress={handleResetProgress} />
      
      <div className="flex-1">
        <ActSelector
          acts={campaignData.acts}
          selectedActId={selectedActId}
          onActChange={handleActChange}
        />
        
        {/* Build Selector - positioned between Act and Location selectors */}
        {buildsData && buildsData.builds && buildsData.builds.length > 0 && (
          <div className="bg-gray-900 border-b border-gray-800 px-6 py-3">
            <BuildSelector
              builds={buildsData.builds}
              selectedBuildId={selectedBuildId}
              onBuildChange={handleBuildChange}
              onClearBuild={handleClearBuild}
            />
          </div>
        )}
        
        <LocationNavigator
          locations={sortedLocations}
          selectedLocationId={selectedLocationId}
          onLocationChange={handleLocationChange}
        />

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
          <div className="flex-1 lg:flex-[2]">
            <CurrentLocation 
              location={currentLocation}
              selectedBuild={selectedBuild}
            />
          </div>
          
          <div className="flex-1 border-t lg:border-t-0 lg:border-l border-gray-800">
            <NextLocation 
              location={nextLocation} 
              onLocationChange={handleLocationChange}
              selectedBuild={selectedBuild}
            />
          </div>
        </div>
      </div>
      
      <Footer getAnalytics={getAnalytics} />
    </div>
  );
};

export default CampaignTracker;