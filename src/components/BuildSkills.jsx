import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const BuildSkills = ({ build, currentAreaLevel, showSummaryOnly = false }) => {
  if (!build) {
    return null;
  }

  // Helper function to get the highest level skills that should be available for a given area level
  const getApplicableSkills = (targetAreaLevel) => {
    // Get all skills that are at or below the target area level
    const applicableSkills = build.skills.filter(skill => 
      skill.levelRequirement <= targetAreaLevel
    );
    
    // If no skills are found, return empty array
    if (applicableSkills.length === 0) {
      return [];
    }
    
    // Find the highest level that has skills
    const highestLevel = Math.max(...applicableSkills.map(skill => skill.levelRequirement));
    
    // Return only the skills for the highest level
    return applicableSkills.filter(skill => skill.levelRequirement === highestLevel);
  };

  // If showing summary only (for Next Location), return condensed format
  if (showSummaryOnly) {
    const relevantSkills = getApplicableSkills(currentAreaLevel).slice(0, 2);
    
    if (relevantSkills.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Build Skills Available</h4>
        <div className="space-y-2">
          {relevantSkills.map((skill) => (
            <div key={skill.skillId} className="text-sm text-gray-500">
              <span className="text-gray-400">Level {skill.levelRequirement}:</span>{' '}
              <span>{skill.skillName}</span>{' '}
              <span className="text-gray-600">({skill.supports.length} support{skill.supports.length !== 1 ? 's' : ''})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Get applicable skills using the helper function
  const relevantSkills = getApplicableSkills(currentAreaLevel);

  if (relevantSkills.length === 0) {
    return null;
  }

  const skillLevel = relevantSkills[0]?.levelRequirement || currentAreaLevel;

  return (
    <div className="mt-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-3">
            Level {skillLevel} Skills
          </h3>

          <div className="space-y-2">
            {relevantSkills.map(skill => (
              <div key={skill.skillId} className="bg-gray-800 rounded border border-gray-600">
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-400">Build Skill</span>
                        <span className="text-gray-500">-</span>
                        <span className="font-medium text-gray-200">{skill.skillName}</span>
                        <span className="text-gray-500">-</span>
                        <span className="px-2 py-1 rounded text-xs border bg-green-800 text-green-300 border-green-700">
                          Available
                        </span>
                      </div>
                      
                      <p className="text-sm text-green-400 mb-1">
                        Uncut Skill Gem Level: {skill.uncutSkillGemLevel}
                      </p>
                      
                      {skill.supports.length > 0 && (
                        <p className="text-sm text-blue-400">
                          Supports: {skill.supports.map(support => support.supportName).join(', ')}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 ml-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildSkills;