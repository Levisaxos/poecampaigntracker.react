export const levelingData = {
    levels: [
        {
            level: 1,
            priority: 'High',
            category: 'Movement Speed',
            items: [
                {
                    itemType: 'Boots',
                    targetStat: '10% increased Movement Speed',
                    modifier: "Runner's (Prefix)",
                    instructions: [
                        'Search all Boot drops and vendor boots until Movement Speed boots are obtained',
                        'Transmute boots aggressively',
                        'Augment Magic boots without a Prefix',
                        "Suffixes on Magic (Blue) boots are identified by 'Boots of the [Suffix name]'"
                    ]
                }
            ]
        },
        {
            level: 4,
            priority: 'High',
            category: 'Flask Upgrade',
            items: [
                {
                    itemType: 'Medium Life Flask',
                    source: 'Free drops from Cauldron in Witch Hut encounter (Grelwood)',
                    instructions: ['Be sure to grab them from the Cauldron encounter']
                },
                {
                    itemType: 'Medium Mana Flask',
                    source: 'Free drops from Cauldron in Witch Hut encounter (Grelwood)',
                    instructions: ['Be sure to grab them from the Cauldron encounter']
                }
            ]
        },
        {
            level: 8,
            priority: 'Medium',
            category: 'Rings, Amulets & Flask Charges',
            items: [
                {
                    itemType: 'Ruby Ring',
                    source: 'Cemetery of the Eternals Ancient Ruins Site (one attempt) or vendors',
                    note: 'High chance of getting Iron or Lazuli Ring instead'
                },
                {
                    itemType: 'Attribute Amulets',
                    variants: ['Amber Amulet', 'Jade Amulet', 'Lapis Amulet'],
                    purpose: 'Higher total Attributes to focus on better passive clusters',
                    note: "Often doesn't matter which Attributes you get - adjust Attribute Passives accordingly"
                },
                {
                    itemType: 'Flask with Charge Regen',
                    targetStat: 'Gains 0.15 Charges per Second',
                    modifier: 'of the Foliage (Suffix)',
                    instructions: ['Keep eye on vendor Flask options', 'Ensures flask charges even in boss fights']
                },
                {
                    itemType: 'Stone Charm',
                    purpose: 'Prevents getting stunned repeatedly by groups of enemies'
                }
            ]
        },
        {
            level: 10,
            priority: 'High',
            category: 'Flask Upgrade',
            items: [
                {
                    itemType: 'Greater Life Flask',
                    source: 'Drops from Hunting Grounds or Una (80-500 Gold)',
                    instructions: ['If not obtained as drops, return to town and buy from Una']
                },
                {
                    itemType: 'Greater Mana Flask',
                    source: 'Drops from Hunting Grounds or Una (80-500 Gold)',
                    instructions: ['If not obtained as drops, return to town and buy from Una']
                }
            ]
        },
        {
            level: 12,
            priority: 'High',
            category: 'Cold Resistance',
            items: [
                {
                    itemType: 'Sapphire Ring',
                    purpose: 'Cold Resistance for Count Ogham boss fight',
                    deadline: 'Level 15',
                    targetResistance: '30-40% Cold Resistance',
                    warning: "Many players struggle with Act 1's final boss if they have less than 30% to 40% Cold Resistance!"
                }
            ]
        },
        {
            level: 15,
            priority: 'Medium',
            category: 'Movement Speed Upgrade',
            items: [
                {
                    itemType: 'Boots',
                    targetStat: '15% increased Movement Speed',
                    modifier: "Sprinter's (Prefix)",
                    instructions: [
                        'Not vital to immediately upgrade if you already have 10% Movement Speed',
                        'Keep eye on drops or vendor boots for easy upgrades',
                        'If no movespeed at all, begin aggressively searching and crafting',
                        'Transmute white boots, Augment boots with Suffix but no Prefix'
                    ]
                }
            ]
        },
        {
            level: 16,
            priority: 'High',
            category: 'Flask Upgrade & Lightning Resistance',
            items: [
                {
                    itemType: 'Grand Life Flask',
                    source: 'Lucky drop from Ogham Manor or Act 2 vendors',
                    note: 'Act 1 vendors max out at Item Level 15'
                },
                {
                    itemType: 'Grand Mana Flask',
                    source: 'Lucky drop from Ogham Manor or Act 2 vendors',
                    note: 'Act 1 vendors max out at Item Level 15'
                },
                {
                    itemType: 'Topaz Ring',
                    purpose: 'Lightning Resistance supplement'
                }
            ]
        },
        {
            level: 23,
            priority: 'Medium',
            category: 'Flask Upgrade & Belt Slots',
            location: 'Middle of Act 3 (Keth/Mastodon Badlands/Valley of Titans)',
            items: [
                {
                    itemType: 'Giant Life Flask',
                    instructions: ['Begin looking for Flask upgrades around middle of Act 3']
                },
                {
                    itemType: 'Giant Mana Flask',
                    instructions: ['Begin looking for Flask upgrades around middle of Act 3']
                },
                {
                    itemType: 'Belt with +1 Charm Slot',
                    modifier: 'of Symbolism (Suffix)',
                    note: 'Modifier is rare but useful and potentially valuable'
                }
            ]
        },
        {
            level: 26,
            priority: 'Medium',
            category: 'Improved Flask Charges',
            items: [
                {
                    itemType: 'Flask with Better Charge Regen',
                    targetStat: 'Gains 0.2 Charges per Second',
                    modifier: 'of the Verdant (Suffix) and higher tier versions',
                    instructions: [
                        'Check vendors and Flask drops',
                        'Use spare Transmutes and Augments to craft each new tier of flask',
                        'Flask Charge Regeneration effective for most players to avoid retreating in boss fights'
                    ]
                }
            ]
        },
        {
            level: 30,
            priority: 'High',
            category: 'Major Upgrades',
            location: 'End of Act 2 / Dreadnought zones preparation',
            items: [
                {
                    itemType: 'Colossal Life Flask',
                    source: 'Zarka in Act 2 town',
                    instructions: ['Try to upgrade before challenging Dreadnought zones and final boss']
                },
                {
                    itemType: 'Colossal Mana Flask',
                    source: 'Zarka in Act 2 town',
                    instructions: ['Try to upgrade before challenging Dreadnought zones and final boss']
                },
                {
                    itemType: '20% Movement Speed Boots',
                    targetStat: '20% increased Movement Speed',
                    modifier: "Stallion's (Prefix)",
                    instructions: ['Upgrade ASAP, especially if stuck on 10% for a while']
                },
                {
                    itemType: 'Solar Amulet',
                    purpose: 'Allows most builds to add extra Support Gem to Spirit skills (Precision, Clarity, Cannibalism)',
                    note: 'Any Amulet with useful modifiers is helpful - may not be worth prioritizing over Life and Resistances'
                }
            ]
        },
        {
            level: 32,
            priority: 'Medium',
            category: 'Cast Speed (Spellcasters)',
            buildSpecific: 'Spellcasters Only',
            items: [
                {
                    itemType: 'Pearl Ring',
                    purpose: 'Cast Speed increases - makes leveling more comfortable',
                    source: "Hanging Tree event in Act 3's Sandswept Marsh (small chance)",
                    note: 'Resistance Rings may still be higher priority unless resistances are sufficient',
                    reminder: "Don't forget to complete Orok Campsite for free Jeweller's Orb!"
                }
            ]
        },
        {
            level: 35,
            priority: 'Medium',
            category: 'All Resistances',
            items: [
                {
                    itemType: 'Prismatic Ring',
                    purpose: 'All Elemental Resistance',
                    efficiency: '1% All Elemental Resistance = 1% Fire + 1% Cold + 1% Lightning combined',
                    note: 'Gives roughly same total Resistances as other ring types'
                }
            ]
        },
        {
            level: 40,
            priority: 'High',
            category: 'Flask Upgrade',
            location: 'The Drowned City (Act 3)',
            items: [
                {
                    itemType: 'Gargantuan Life Flask',
                    purpose: 'Preparation for upcoming difficult boss fights'
                },
                {
                    itemType: 'Gargantuan Mana Flask',
                    purpose: 'Preparation for upcoming difficult boss fights'
                }
            ]
        },
        {
            level: 50,
            priority: 'High',
            category: 'Peak Movement Speed & Flask Upgrade',
            items: [
                {
                    itemType: '25% Movement Speed Boots',
                    targetStat: '25% increased Movement Speed',
                    modifier: "Gazelle's (Prefix)",
                    note: 'Fastest modifier available until level 70',
                    instructions: [
                        'Upgrade whenever possible',
                        'Check drops, vendors, and craft aggressively from level 50',
                        'Especially important if currently on 15% or lower',
                        'Consider using Regal Orb on 25% Movespeed boots with Resistance Suffix'
                    ]
                },
                {
                    itemType: 'Transcendent Life Flask'
                },
                {
                    itemType: 'Transcendent Mana Flask'
                }
            ]
        },
        {
            level: 60,
            priority: 'High',
            category: 'Endgame Flask Preparation',
            items: [
                {
                    itemType: 'Ultimate Life Flask',
                    instructions: [
                        'Keep finding, buying, and crafting until desired modifiers obtained',
                        'Worth spending decent sum of gold, Transmutes and Augments',
                        'Well-rolled Flasks can carry into endgame'
                    ]
                },
                {
                    itemType: 'Ultimate Mana Flask',
                    instructions: [
                        'Keep finding, buying, and crafting until desired modifiers obtained',
                        'Worth spending decent sum of gold, Transmutes and Augments',
                        'Well-rolled Flasks can carry into endgame'
                    ]
                }
            ]
        },
        {
            level: 62,
            priority: 'Medium',
            category: 'Charge Generation',
            items: [
                {
                    itemType: 'Fine Belt',
                    purpose: 'Charge Regeneration',
                    usage: 'Used instead of (or in addition to) charge gain modifier on Flasks',
                    benefit: 'Ensures you always have charges when needed'
                }
            ]
        }
    ],
    craftingCurrency: {
        transmute: 'Used aggressively on boots and flasks throughout leveling',
        augment: 'Used on Magic items without desired prefix/suffix',
        regal: 'Consider using on 25% Movement Speed boots with good suffix at level 50+'
    },
    generalTips: {
        resistances: 'Prioritize getting 30-40% resistances before major boss fights',
        movementSpeed: 'Movement Speed is crucial - upgrade whenever possible',
        flaskCharges: 'Flask charge regeneration modifiers prevent attrition deaths in boss fights',
        vendors: 'Check NPC vendors regularly, especially if you have excess Gold'
    }
};