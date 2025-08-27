export const buildsData = {
  builds: [
    {
      buildId: 1,
      buildName: "Essence Drain - Contagion",
      description: "A damage over time focused build using Essence Drain and Contagion combo",
      skills: [
        {
          skillId: 1,
          skillName: "Essence Drain",
          levelRequirement: 6,
          uncutSkillGemLevel: 3,
          supports: [            
            {
              supportId: 1,
              supportName: "Swift Affliction",
              uncutSupportGemLevel: 1
            },
            {
              supportId: 2,
              supportName: "Zenith",
              uncutSupportGemLevel: 1
            },
            {
              supportId: 2,
              supportName: "Chain",
              uncutSupportGemLevel: 1
            }
          ]
        },
        {
          skillId: 2,
          skillName: "Contagion",
          levelRequirement: 1,
          uncutSkillGemLevel: 1,
          supports: [
            {
              supportId: 1,
              supportName: "Unleash",
              uncutSupportGemLevel: 1
            },
            {
              supportId: 2,
              supportName: "Magnified Effect",
              uncutSupportGemLevel: 1
            },
            {
              supportId: 3,
              supportName: "Hinder",
              uncutSupportGemLevel: 1
            }
          ]
        },
        {
          skillId: 3,
          skillName: "Fire Wall",
          levelRequirement: 6,
          uncutSkillGemLevel: 3,
          supports: []
        },
        {
          skillId: 4,
          skillName: "Withering Presence",
          levelRequirement: 11,
          uncutSkillGemLevel: 5,
          supports: [
            {
              supportId: 1,
              supportName: "Persistaece",
              uncutSupportGemLevel: 1
            }
          ]
        },
        {
          skillId: 5,
          skillName: "Bonestorm",
          levelRequirement: 16,
          uncutSkillGemLevel: 5,
          supports: [
            {
              supportId: 1,
              supportName: "Scattershot",
              uncutSupportGemLevel: 1
            },
            {
              supportId: 2,
              supportName: "Brutality",
              uncutSupportGemLevel: 1
            }
          ]
        },
        {
          skillId: 6,
          skillName: "Dark Effigy",
          levelRequirement: 6,
          uncutSkillGemLevel: 3,
          supports: [
            {
              supportId: 1,
              supportName: "Overabundance",
              uncutSupportGemLevel: 1
            },
            {
              supportId: 2,
              supportName: "Arcane Tempo",
              uncutSupportGemLevel: 1
            }
          ]
        },
        {
          skillId: 1,
          skillName: "Despair",
          levelRequirement: 16,
          uncutSkillGemLevel: 9,
          supports: [
            {
              supportId: 1,
              supportName: "Heightened Curse",
              uncutSupportGemLevel: 1
            },
            {
              supportId: 2,
              supportName: "Cursed Ground",
              uncutSupportGemLevel: 1
            }
          ]
        }        
      ]
    }
  ]
};