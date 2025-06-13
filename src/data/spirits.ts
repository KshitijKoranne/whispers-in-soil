import { Spirit, GameEvent, GameState } from '@/types/game';

export const spirits: Spirit[] = [
  {
    id: 'lost_child',
    name: 'Lost Child',
    restLevel: 20,
    dialogue: [
      "I can't find my mother... she was here when the sickness came.",
      "The others won't let me rest until all are properly buried.",
      "Help me find peace, mourner."
    ],
    requirement: 'unburiedCorpses > 0'
  },
  {
    id: 'village_elder',
    name: 'Village Elder',
    restLevel: 60,
    dialogue: [
      "You tend to us still, even when hope has fled.",
      "The old ways must be preserved, young mourner.",
      "There are secrets in the earth that the living forgot."
    ],
    requirement: 'completedRites >= 3'
  },
  {
    id: 'plague_victim',
    name: 'Plague Victim',
    restLevel: 10,
    dialogue: [
      "The fever burns eternal... why won't it end?",
      "You must choose: honor the dead or save yourself.",
      "The corruption spreads beyond flesh..."
    ],
    requirement: 'faith < 30'
  }
];

export const spiritEvents: GameEvent[] = [
  {
    id: 'lost_child_encounter',
    type: 'spirit_encounter',
    title: 'A Child\'s Whisper',
    description: 'In your dreams, a small figure appears at the foot of your bed. A child, pale and translucent, looks at you with hollow eyes filled with desperate hope.',
    triggered: false,
    choices: [
      {
        text: 'Promise to help find their mother\'s remains',
        effects: [
          { type: 'resource', target: 'faith', value: 5 },
          { type: 'resource', target: 'sanity', value: -3 },
          { type: 'event', message: 'Your vow brings comfort to the child, but the weight of responsibility haunts you.' }
        ]
      },
      {
        text: 'Gently explain that all the dead must wait their turn',
        effects: [
          { type: 'resource', target: 'faith', value: -2 },
          { type: 'resource', target: 'sanity', value: 2 },
          { type: 'event', message: 'The child fades with disappointment, but your pragmatic approach preserves your resolve.' }
        ]
      }
    ]
  },
  {
    id: 'elder_wisdom',
    type: 'spirit_encounter',
    title: 'Ancient Wisdom',
    description: 'The village elder materializes, his spectral form radiating authority even in death. He carries the weight of generations and offers guidance from beyond.',
    triggered: false,
    choices: [
      {
        text: 'Ask about the forgotten rituals',
        effects: [
          { type: 'resource', target: 'faith', value: 8 },
          { type: 'resource', target: 'herbs', value: 1 },
          { type: 'event', message: 'The elder shares ancient knowledge, revealing a cache of sacred herbs.' }
        ]
      },
      {
        text: 'Inquire about the plague\'s true nature',
        effects: [
          { type: 'resource', target: 'sanity', value: -5 },
          { type: 'resource', target: 'faith', value: 3 },
          { type: 'event', message: 'The truth is more terrible than you imagined, but knowledge brings power.' }
        ]
      }
    ]
  },
  {
    id: 'plague_warning',
    type: 'spirit_encounter',
    title: 'Fever Dreams',
    description: 'A victim of the plague writhes before you, their spiritual form still burning with sickness. Their fevered whispers speak of choices and consequences.',
    triggered: false,
    choices: [
      {
        text: 'Offer to perform purification rites',
        effects: [
          { type: 'resource', target: 'faith', value: -10 },
          { type: 'resource', target: 'stamina', value: -15 },
          { type: 'resource', target: 'sanity', value: 8 },
          { type: 'event', message: 'The purification is exhausting but brings peace to the tormented soul.' }
        ]
      },
      {
        text: 'Keep your distance to preserve yourself',
        effects: [
          { type: 'resource', target: 'sanity', value: -8 },
          { type: 'resource', target: 'faith', value: -3 },
          { type: 'event', message: 'Self-preservation comes at the cost of guilt and spiritual corruption.' }
        ]
      }
    ]
  }
];

export function getSpiritEncounter(gameState: GameState & { triggeredEvents: string[] }): GameEvent | null {
  // Determine which spirits should appear based on game state
  const triggeredEventIds = gameState.triggeredEvents || [];
  
  const eligibleEvents = spiritEvents.filter(event => {
    if (triggeredEventIds.includes(event.id)) return false;
    
    switch (event.id) {
      case 'lost_child_encounter':
        return gameState.unburiedCorpses > 0 && Math.random() < 0.6;
      case 'elder_wisdom':
        return gameState.completedRites >= 2 && Math.random() < 0.4;
      case 'plague_warning':
        return gameState.resources.faith < 40 && Math.random() < 0.5;
      default:
        return false;
    }
  });
  
  if (eligibleEvents.length === 0) return null;
  
  // Return random eligible event
  const randomIndex = Math.floor(Math.random() * eligibleEvents.length);
  return eligibleEvents[randomIndex];
}