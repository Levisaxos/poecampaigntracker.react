import React, { useState } from 'react';
import ActSelector from './ActSelector';
import LocationNavigator from './LocationNavigator';
import CurrentLocation from './CurrentLocation';
import NextLocation from './NextLocation';
import { useCampaignData } from '../hooks/useCampaignData';

const CampaignTracker = () => {
  const { campaignData, loading } = useCampaignData();
  const [selectedActId, setSelectedActId] = useState(1);
  const [selectedLocationId, setSelectedLocationId] = useState(1);

  if (loading || !campaignData) {
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

  const handleActChange = (actId) => {
    setSelectedActId(actId);
    const newAct = campaignData.acts.find(act => act.actId === actId);
    const firstLocation = newAct?.locations.sort((a, b) => a.order - b.order)[0];
    if (firstLocation) {
      setSelectedLocationId(firstLocation.locationId);
    }
  };

  const handleLocationChange = (locationId) => {
    // Check if the location is in the current act
    const locationInCurrentAct = sortedLocations.find(loc => loc.locationId === locationId);
    
    if (locationInCurrentAct) {
      // Location is in current act, just change location
      setSelectedLocationId(locationId);
    } else {
      // Location might be in a different act, find which act it belongs to
      const targetAct = campaignData.acts.find(act => 
        act.locations.some(loc => loc.locationId === locationId)
      );
      
      if (targetAct) {
        setSelectedActId(targetAct.actId);
        setSelectedLocationId(locationId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ActSelector
        acts={campaignData.acts}
        selectedActId={selectedActId}
        onActChange={handleActChange}
      />
      
      <LocationNavigator
        locations={sortedLocations}
        selectedLocationId={selectedLocationId}
        onLocationChange={handleLocationChange}
      />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        <div className="flex-1 lg:flex-[2]">
          <CurrentLocation location={currentLocation} />
        </div>
        
        <div className="flex-1 border-t lg:border-t-0 lg:border-l border-gray-800">
          <NextLocation 
            location={nextLocation} 
            onLocationChange={handleLocationChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignTracker;