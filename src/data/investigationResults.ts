export interface InvestigationResult {
  name: string;
  description: string;
  herbs?: number;
  wood?: number;
  bones?: number;
  ash?: number;
  sanityEffect?: number;
  faithEffect?: number;
}

const investigationResults: InvestigationResult[] = [
  // Early game discoveries (days 1-5)
  {
    name: "A Child's Diary",
    description: "You find the diary of a young plague victim. Their innocent words about 'the coughing sickness' haunt you.",
    sanityEffect: -3,
    faithEffect: 2
  },
  {
    name: "Hidden Medicine Cache", 
    description: "Behind a loose stone, you discover herbs preserved by a village healer who never returned.",
    herbs: 3,
    sanityEffect: 1
  },
  {
    name: "Makeshift Barricade",
    description: "Someone tried to board up their home. The wood is useful, but the scratch marks on the inside are disturbing.",
    wood: 2,
    sanityEffect: -1
  },
  {
    name: "Prayer Beads",
    description: "A set of well-worn prayer beads dropped in haste. They still carry the warmth of faith.",
    faithEffect: 4
  },
  {
    name: "Empty Granary",
    description: "The village stores are completely bare. People must have been starving before the plague took them.",
    sanityEffect: -2
  },
  
  // Mid game discoveries (days 6-14)
  {
    name: "Mass Grave Site",
    description: "You uncover evidence of a hastily dug mass grave. Some bones remain scattered about.",
    bones: 4,
    sanityEffect: -4,
    faithEffect: -2
  },
  {
    name: "Ritual Altar",
    description: "A hidden shrine where desperate villagers tried to appease death itself. Ash and bone fragments litter the ground.",
    ash: 2,
    bones: 1,
    sanityEffect: -3,
    faithEffect: 3
  },
  {
    name: "Plague Doctor's Kit",
    description: "Medical supplies abandoned by a fleeing healer. The herbs are still potent, but their story is grim.",
    herbs: 4,
    sanityEffect: -2
  },
  {
    name: "Burnt Church Records",
    description: "Half-charred records of final rites never completed. The names of the dead cry out for proper burial.", 
    faithEffect: 5,
    sanityEffect: -1
  },
  {
    name: "Hidden Food Store",
    description: "A secret cache hidden by survivors. Finding it brings hope that someone might have escaped.",
    herbs: 2,
    wood: 1,
    sanityEffect: 3
  },
  
  // Late game discoveries (days 15+)
  {
    name: "Survivor's Journal",
    description: "The final entry of the last survivor describes watching spirits rise from improperly buried dead.",
    sanityEffect: -5,
    faithEffect: 6
  },
  {
    name: "Cursed Relic",
    description: "An artifact that seems to pulse with malevolent energy. It may be connected to the village's fate.",
    bones: 3,
    ash: 3,
    sanityEffect: -4,
    faithEffect: -3
  },
  {
    name: "Sacred Grove",
    description: "A hidden grove where the village wise woman performed final rites. The trees still hum with spiritual power.",
    herbs: 5,
    faithEffect: 8,
    sanityEffect: 2
  },
  {
    name: "Underground Chamber",
    description: "A hidden chamber beneath the village contains evidence of ancient burial practices and powerful rituals.",
    bones: 6,
    ash: 4,
    faithEffect: 10,
    sanityEffect: -3
  }
];

export function getRandomInvestigationResult(day: number): InvestigationResult {
  let availableResults;
  
  if (day <= 5) {
    availableResults = investigationResults.slice(0, 5); // Early game results
  } else if (day <= 14) {
    availableResults = investigationResults.slice(5, 10); // Mid game results
  } else {
    availableResults = investigationResults.slice(10); // Late game results
  }
  
  return availableResults[Math.floor(Math.random() * availableResults.length)];
}