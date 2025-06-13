export interface ForageResult {
  name: string;
  description: string;
  herbs?: number;
  wood?: number;
  bones?: number;
  rarity: 'common' | 'uncommon' | 'rare';
}

export const forageResults: ForageResult[] = [
  // Herb findings
  {
    name: "Moonbell Flowers",
    description: "Pale, ghostly flowers that bloom only in places touched by death. Their petals shimmer with otherworldly light.",
    herbs: 3,
    rarity: 'uncommon'
  },
  {
    name: "Graveyard Moss",
    description: "Thick, dark moss growing on weathered tombstones. Said to absorb the essence of the departed.",
    herbs: 2,
    rarity: 'common'
  },
  {
    name: "Widow's Sage",
    description: "Bitter herbs that grow wild in abandoned gardens. Their leaves carry the weight of forgotten sorrows.",
    herbs: 2,
    rarity: 'common'
  },
  {
    name: "Death Cap Mushrooms",
    description: "Dangerous but potent fungi sprouting near decay. Handle with caution - they hold dark power.",
    herbs: 4,
    rarity: 'rare'
  },
  {
    name: "Dried Willow Bark",
    description: "Strips of bark from the weeping willows that guard the cemetery. Still damp with spectral tears.",
    herbs: 1,
    wood: 1,
    rarity: 'common'
  },

  // Wood findings
  {
    name: "Coffin Wood Scraps",
    description: "Weathered planks from broken caskets. The wood remembers its sacred purpose.",
    wood: 4,
    rarity: 'uncommon'
  },
  {
    name: "Chapel Roof Beams",
    description: "Sturdy timber fallen from the ruined chapel. Blessed wood, perfect for funeral pyres.",
    wood: 5,
    rarity: 'rare'
  },
  {
    name: "Fence Post Fragments",
    description: "Broken pieces of the cemetery's perimeter fence. Iron nails still embedded in the grain.",
    wood: 3,
    rarity: 'common'
  },
  {
    name: "Old Pew Wood",
    description: "Sacred oak from the abandoned church pews. Worn smooth by countless prayers.",
    wood: 3,
    herbs: 1,
    rarity: 'uncommon'
  },
  {
    name: "Driftwood",
    description: "Smooth branches carried by the wind from distant forests. They whisper of places untouched by plague.",
    wood: 2,
    rarity: 'common'
  },

  // Bone findings (rare)
  {
    name: "Ancient Finger Bones",
    description: "Delicate bones from a long-forgotten grave. They still wear traces of burial cloth.",
    bones: 1,
    rarity: 'rare'
  },
  {
    name: "Crow Skulls",
    description: "Small skulls from the ravens that watch over the dead. Their empty sockets seem to follow you.",
    bones: 1,
    herbs: 1,
    rarity: 'uncommon'
  },

  // Mixed findings
  {
    name: "Overgrown Garden Patch",
    description: "A hidden corner where nature has reclaimed the earth. Life persists even in this place of death.",
    herbs: 1,
    wood: 2,
    rarity: 'common'
  },
  {
    name: "Ruined Shed Contents",
    description: "Tools and materials left behind by the village carpenter. Dust-covered but still useful.",
    wood: 2,
    herbs: 1,
    rarity: 'common'
  },
  {
    name: "Apothecary's Cache",
    description: "A hidden stash of the village healer's supplies. Wrapped in oiled cloth, preserved from the elements.",
    herbs: 3,
    bones: 1,
    rarity: 'rare'
  }
];

export function getRandomForageResult(): ForageResult {
  // Weight the random selection by rarity
  const rarityWeights = {
    common: 70,
    uncommon: 25,
    rare: 5
  };

  const totalWeight = Object.values(rarityWeights).reduce((sum, weight) => sum + weight, 0);
  const random = Math.random() * totalWeight;

  let currentWeight = 0;
  let selectedRarity: 'common' | 'uncommon' | 'rare' = 'common';

  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    currentWeight += weight;
    if (random <= currentWeight) {
      selectedRarity = rarity as 'common' | 'uncommon' | 'rare';
      break;
    }
  }

  // Get all results of the selected rarity
  const resultsOfRarity = forageResults.filter(result => result.rarity === selectedRarity);
  
  // Return a random result from the selected rarity
  return resultsOfRarity[Math.floor(Math.random() * resultsOfRarity.length)];
}