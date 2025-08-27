import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LocationNavigator = ({ locations, selectedLocationId, onLocationChange }) => {
  const scrollRef = useRef(null);
  const selectedButtonRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll when selected location changes
  useEffect(() => {
    if (selectedButtonRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const selectedButton = selectedButtonRef.current;
      
      // Calculate button position relative to container
      const buttonLeft = selectedButton.offsetLeft;
      const containerWidth = container.offsetWidth;
      
      // Check if we can fit all remaining items on screen
      const allButtons = Array.from(container.children);
      const totalItemsWidth = allButtons.reduce((total, child) => {
        return total + child.offsetWidth + 8; // 8px is the gap
      }, 0) - 8; // Remove last gap
      
      const remainingItemsWidth = totalItemsWidth - buttonLeft;
      const canFitRemainingItems = remainingItemsWidth <= containerWidth;
      
      // If we can fit all remaining items, scroll to show them all
      if (canFitRemainingItems) {
        const maxScrollLeft = Math.max(0, totalItemsWidth - containerWidth);
        container.scrollTo({
          left: maxScrollLeft,
          behavior: 'smooth'
        });
      } else {
        // Otherwise, scroll to put selected item visible with proper margin
        // Updated margin to 70px for perfect fit
        const margin = 70;
        const targetScrollLeft = Math.max(0, buttonLeft - margin);
        
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedLocationId, locations]);

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-3">
      <div className="flex items-center">
        <button
          onClick={() => scroll('left')}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-300 transition-colors mr-2 z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
        >
          {locations.map(location => (
            <button
              key={location.locationId}
              ref={selectedLocationId === location.locationId ? selectedButtonRef : null}
              onClick={() => onLocationChange(location.locationId)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedLocationId === location.locationId
                  ? 'bg-gray-700 text-gray-200 border border-gray-600'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300 border border-gray-700'
              }`}
            >
              {location.order}. {location.locationName}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-300 transition-colors ml-2 z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LocationNavigator;