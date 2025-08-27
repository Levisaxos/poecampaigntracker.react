import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Star } from 'lucide-react';
import { useBuildData } from '../hooks/useBuildData';
import { useBuildPersistence } from '../hooks/useBuildPersistence';

const BuildTracker = ({ currentAreaLevel = 1, selectedBuildId, setSelectedBuildId }) => {
  const { buildsData, loading } = useBuildData();
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlightedSkills, setHighlightedSkills] = useState(new Set());
  const [lastCheckedLevel, setLastCheckedLevel] = useState(1);
  const [autoCloseTimer, setAutoCloseTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Find selected build
  const selectedBuild = buildsData?.builds.find(build => build.buildId === selectedBuildId);

  console.log('BuildTracker render - selectedBuildId:', selectedBuildId, 'selectedBuild:', selectedBuild);

  // Reset highlighted skills and expansion when build changes or is cleared
  useEffect(() => {
    console.log('Build selection changed, resetting tracker state. selectedBuildId:', selectedBuildId);
    setHighlightedSkills(new Set());
    setIsExpanded(false);
    setLastCheckedLevel(0); // Reset to 0 so level 1 skills get highlighted
    clearTimers();
  }, [selectedBuildId]);

  // Function to clear timers
  const clearTimers = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setAutoCloseTimer(0);
  };

  // Function to start auto-close timer
  const startAutoCloseTimer = () => {
    clearTimers();
    const duration = 5000; // 5 seconds
    const intervalTime = 50; // Update every 50ms for smooth animation
    let elapsed = 0;
    
    const interval = setInterval(() => {
      elapsed += intervalTime;
      const remaining = Math.max(0, duration - elapsed);
      setAutoCloseTimer((remaining / duration) * 100);
      
      if (remaining <= 0) {
        setIsExpanded(false);
        clearTimers();
      }
    }, intervalTime);
    
    setTimerInterval(interval);
  };

  // Check for new skills available at current level or when build is first selected
  useEffect(() => {
    if (!selectedBuild || currentAreaLevel <= lastCheckedLevel) return;

    const newlyAvailableSkills = selectedBuild.skills.filter(skill => 
      skill.levelRequirement <= currentAreaLevel && skill.levelRequirement > lastCheckedLevel
    );

    if (newlyAvailableSkills.length > 0) {
      // Highlight new skills
      const newSkillIds = new Set(newlyAvailableSkills.map(skill => skill.skillId));
      setHighlightedSkills(newSkillIds);
      
      // Gradual expand with animation
      setTimeout(() => setIsExpanded(true), 100);
      
      // Start auto-close timer after expansion
      setTimeout(() => {
        startAutoCloseTimer();
      }, 600); // Wait for expansion animation to complete
      
      // Remove highlights after 10 seconds
      setTimeout(() => setHighlightedSkills(new Set()), 10000);
    }

    setLastCheckedLevel(currentAreaLevel);
  }, [currentAreaLevel, selectedBuild, lastCheckedLevel]);

  // Get skills available at current level (sorted by level requirement descending - most recent first)
  const getAvailableSkills = () => {
    if (!selectedBuild) return [];
    return selectedBuild.skills
      .filter(skill => skill.levelRequirement <= currentAreaLevel)
      .sort((a, b) => b.levelRequirement - a.levelRequirement);
  };

  // Get skills coming soon (next 5 levels)
  const getUpcomingSkills = () => {
    if (!selectedBuild) return [];
    return selectedBuild.skills.filter(skill => 
      skill.levelRequirement > currentAreaLevel && 
      skill.levelRequirement <= currentAreaLevel + 5
    ).sort((a, b) => a.levelRequirement - b.levelRequirement);
  };

  // Clean up timers on component unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [timerInterval]);

  if (loading || !buildsData) {
    return null;
  }

  const availableSkills = getAvailableSkills();
  const upcomingSkills = getUpcomingSkills();

  return (
    <>
      {/* Collapsed Toggle Button */}
      {!isExpanded && (
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
          <button
            onClick={() => {
              setIsExpanded(true);
              clearTimers(); // Clear any auto-close timer when manually opened
            }}
            className="bg-gray-900 border border-gray-700 rounded-r-lg p-3 hover:bg-gray-800 transition-colors shadow-lg group"
            title="Open Build Tracker"
          >
            <div className="flex flex-col items-center space-y-1">
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
              <div className="text-xs text-gray-500 group-hover:text-gray-300 writing-mode-vertical transform -rotate-90 whitespace-nowrap">
                Build
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Expanded Panel - Always rendered but positioned off-screen when collapsed */}
      <div className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-700 ease-in-out ${
        isExpanded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        <div className="bg-gray-900 border border-gray-700 rounded-r-lg shadow-2xl w-80 max-h-[80vh] flex flex-col">
          {/* Close Button */}
          <button
            onClick={() => {
              setIsExpanded(false);
              clearTimers();
            }}
            className="absolute -right-8 top-4 bg-gray-900 border border-gray-700 rounded-r-lg p-2 hover:bg-gray-800 transition-colors"
            title="Close Build Tracker"
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>

          {/* Auto-close timer bar */}
          {autoCloseTimer > 0 && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 rounded-t-lg overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-50 ease-linear"
                style={{ width: `${autoCloseTimer}%` }}
              />
            </div>
          )}

          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-200">Build Tracker</h3>
            </div>
            
            {selectedBuild ? (
              <div>
                <p className="text-sm font-medium text-gray-300">{selectedBuild.buildName}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedBuild.description}</p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-yellow-400 mb-2">Select a build to track your skill progression:</p>
                <select
                  value={selectedBuildId || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedBuildId(value ? parseInt(value) : null);
                  }}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-gray-200"
                >
                  <option value="">Select a build...</option>
                  {buildsData.builds.map(build => (
                    <option key={build.buildId} value={build.buildId}>
                      {build.buildName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {selectedBuild && (
            <div className="flex-1 overflow-y-auto">
              {/* Current Level Info */}
              <div className="p-3 bg-gray-800 border-b border-gray-700">
                <p className="text-xs text-gray-400">
                  Current Area Level: <span className="text-blue-400 font-medium">{currentAreaLevel}</span>
                </p>
              </div>

              {/* Available Skills */}
              {availableSkills.length > 0 && (
                <div className="p-4">
                  <h4 className="text-sm font-medium text-green-400 mb-3">Available Skills</h4>
                  <div className="space-y-3">
                    {availableSkills.map(skill => (
                      <div
                        key={skill.skillId}
                        className={`p-3 rounded border transition-all duration-1000 ${
                          highlightedSkills.has(skill.skillId)
                            ? 'bg-green-900 border-green-600 shadow-lg transform scale-105'
                            : 'bg-gray-800 border-gray-600'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-200">{skill.skillName}</h5>
                          <div className="flex items-center space-x-1">
                            {highlightedSkills.has(skill.skillId) && (
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            )}
                            <span className="text-xs bg-blue-800 text-blue-200 px-2 py-1 rounded">
                              Lvl {skill.levelRequirement}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-400 mb-2">
                          Uncut Skill Gem Level: {skill.uncutSkillGemLevel}
                        </p>
                        
                        {skill.supports.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-gray-300 mb-1">Supports:</p>
                            <div className="space-y-1">
                              {skill.supports.map(support => (
                                <div key={support.supportId} className="flex justify-between items-center text-xs">
                                  <span className="text-gray-400">{support.supportName}</span>
                                  <span className="text-gray-500">Uncut Lvl {support.uncutSupportGemLevel}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Skills */}
              {upcomingSkills.length > 0 && (
                <div className="p-4 border-t border-gray-700">
                  <h4 className="text-sm font-medium text-yellow-400 mb-3">Coming Soon</h4>
                  <div className="space-y-2">
                    {upcomingSkills.map(skill => (
                      <div key={skill.skillId} className="p-2 bg-gray-800 border border-gray-600 rounded opacity-75">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-sm font-medium text-gray-300">{skill.skillName}</h5>
                          <span className="text-xs bg-yellow-800 text-yellow-200 px-2 py-1 rounded">
                            Lvl {skill.levelRequirement}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {skill.levelRequirement - currentAreaLevel} levels to go
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableSkills.length === 0 && upcomingSkills.length === 0 && (
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-500">No skills configured for this build at your current level</p>
                </div>
              )}
            </div>
          )}

          {/* Show message when no build is selected */}
          {!selectedBuild && (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">Select a build above to see available skills for area level {currentAreaLevel}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BuildTracker;