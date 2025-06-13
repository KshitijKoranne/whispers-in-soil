import { Action, ActionType, ActionEffect, Resources } from '@/types/game';
import { getRandomForageResult } from './forageResults';
import { getRandomInvestigationResult } from './investigationResults';

export const gameActions: Record<ActionType, Action> = {
  dig_grave: {
    type: 'dig_grave',
    label: 'Dig Grave',
    description: 'Prepare a proper resting place for the dead. Takes time but honors the departed.',
    requirements: { stamina: 20 },
    effects: [
      { type: 'resource', target: 'stamina', value: -20 },
      { type: 'resource', target: 'faith', value: 5 },
      { type: 'gameState', target: 'unburiedCorpses', value: -1 },
      { type: 'event', message: 'You dig deep into the cold earth, preparing a sacred resting place.' }
    ]
  },

  burn_body: {
    type: 'burn_body',
    label: 'Burn Body',
    description: 'Quick cremation, but dishonors traditional rites. The spirits may not approve.',
    requirements: { stamina: 10, wood: 2 },
    effects: [
      { type: 'resource', target: 'stamina', value: -10 },
      { type: 'resource', target: 'wood', value: -2 },
      { type: 'resource', target: 'ash', value: 1 },
      { type: 'resource', target: 'faith', value: -3 },
      { type: 'resource', target: 'sanity', value: -2 },
      { type: 'gameState', target: 'unburiedCorpses', value: -1 },
      { type: 'event', message: 'The flames consume the flesh, but you feel the weight of impropriety.' }
    ]
  },

  perform_rites: {
    type: 'perform_rites',
    label: 'Perform Rites',
    description: 'Conduct sacred rituals to calm the restless dead and maintain spiritual balance.',
    requirements: { faith: 10, herbs: 1 },
    effects: [
      { type: 'resource', target: 'faith', value: -10 },
      { type: 'resource', target: 'herbs', value: -1 },
      { type: 'resource', target: 'sanity', value: 5 },
      { type: 'gameState', target: 'completedRites', value: 1 },
      { type: 'event', message: 'Ancient words flow from your lips, bringing peace to the restless.' }
    ]
  },

  forage: {
    type: 'forage',
    label: 'Forage',
    description: 'Search the abandoned village for herbs, wood, and other useful materials.',
    requirements: { stamina: 15 },
    effects: [
      { type: 'resource', target: 'stamina', value: -15 },
      { type: 'event', message: 'You search through the ruins and abandoned spaces...' }
    ]
  },

  read_texts: {
    type: 'read_texts',
    label: 'Read Old Texts',
    description: 'Study ancient manuscripts to learn forgotten rituals and deepen understanding.',
    requirements: { stamina: 10 },
    effects: [
      { type: 'resource', target: 'stamina', value: -10 },
      { type: 'resource', target: 'faith', value: 3 },
      { type: 'event', message: 'The old words reveal their secrets to you.' }
    ]
  },

  sleep: {
    type: 'sleep',
    label: 'Sleep / End Day',
    description: 'Rest and restore stamina. End the current day and enter the night phase.',
    requirements: {},
    effects: [
      { type: 'resource', target: 'stamina', value: 50 },
      { type: 'gameState', target: 'phase', value: 'night' },
      { type: 'event', message: 'You rest your weary body as darkness falls over the village.' }
    ]
  },

  rest: {
    type: 'rest',
    label: 'Rest',
    description: 'Take a brief respite to recover some stamina without ending the day.',
    requirements: {},
    effects: [
      { type: 'resource', target: 'stamina', value: 25 },
      { type: 'resource', target: 'sanity', value: -2 },
      { type: 'event', message: 'You sit among the graves, catching your breath. The silence is unsettling.' }
    ]
  },

  wake_up: {
    type: 'wake_up',
    label: 'Wake Up / Start Day',
    description: 'Rise with the dawn and begin a new day of tending to the dead.',
    requirements: {},
    effects: [
      { type: 'gameState', target: 'phase', value: 'day' },
      { type: 'gameState', target: 'day', value: 1 },
      { type: 'resource', target: 'stamina', value: 20 },
      { type: 'event', message: 'Dawn breaks over the silent village. Another day begins.' }
    ]
  },

  ritual: {
    type: 'ritual',
    label: 'Special Ritual',
    description: 'Perform advanced rituals with specific component combinations.',
    requirements: {},
    effects: []
  },

  abandon: {
    type: 'abandon',
    label: 'Abandon Village',
    description: 'Leave this cursed place behind. Your duty will remain incomplete, but you will survive.',
    requirements: {},
    effects: [
      { type: 'event', message: 'You turn your back on the village and walk into the dawn, leaving the dead unburied...' }
    ]
  },

  craft_tools: {
    type: 'craft_tools',
    label: 'Craft Tools',
    description: 'Create better tools for digging and rituals. Improves efficiency of future actions.',
    requirements: { wood: 3, bones: 2, stamina: 20 },
    effects: [
      { type: 'resource', target: 'wood', value: -3 },
      { type: 'resource', target: 'bones', value: -2 },
      { type: 'resource', target: 'stamina', value: -20 },
      { type: 'event', message: 'You craft improved tools from bone and wood. Your work will be more efficient.' }
    ]
  },

  meditate: {
    type: 'meditate',
    label: 'Meditate',
    description: 'Quiet your mind and restore sanity through spiritual reflection.',
    requirements: { stamina: 15 },
    effects: [
      { type: 'resource', target: 'stamina', value: -15 },
      { type: 'resource', target: 'sanity', value: 8 },
      { type: 'resource', target: 'faith', value: 2 },
      { type: 'event', message: 'In the silence between whispers, you find a moment of peace.' }
    ]
  },

  investigate: {
    type: 'investigate',
    label: 'Investigate Village',
    description: 'Search the ruins for clues about what happened here. May uncover useful items or disturbing truths.',
    requirements: { stamina: 25 },
    effects: [
      { type: 'resource', target: 'stamina', value: -25 },
      { type: 'event', message: 'You explore the abandoned buildings, uncovering secrets...' }
    ]
  },

  tend_shrine: {
    type: 'tend_shrine',
    label: 'Tend Shrine',
    description: 'Maintain the village shrine with offerings. Keeps spirits calm but requires resources.',
    requirements: { herbs: 2, wood: 1 },
    effects: [
      { type: 'resource', target: 'herbs', value: -2 },
      { type: 'resource', target: 'wood', value: -1 },
      { type: 'resource', target: 'faith', value: 5 },
      { type: 'resource', target: 'sanity', value: 3 },
      { type: 'event', message: 'The shrine glows softly as you place your offerings. The spirits seem pleased.' }
    ]
  },

  purify_water: {
    type: 'purify_water',
    label: 'Purify Water',
    description: 'Cleanse the village well with herbs. Provides clean water for rituals and health.',
    requirements: { herbs: 3, stamina: 20 },
    effects: [
      { type: 'resource', target: 'herbs', value: -3 },
      { type: 'resource', target: 'stamina', value: -20 },
      { type: 'resource', target: 'sanity', value: 5 },
      { type: 'event', message: 'The cursed water runs clear again. You feel a weight lift from the village.' }
    ]
  }
};

export function createForageAction(): Action {
  const result = getRandomForageResult();
  const effects: ActionEffect[] = [
    { type: 'resource', target: 'stamina', value: -15 }
  ];

  // Add resource effects based on what was found
  if (result.herbs) {
    effects.push({ type: 'resource', target: 'herbs', value: result.herbs });
  }
  if (result.wood) {
    effects.push({ type: 'resource', target: 'wood', value: result.wood });
  }
  if (result.bones) {
    effects.push({ type: 'resource', target: 'bones', value: result.bones });
  }

  // Create the descriptive message
  const foundItems = [];
  if (result.herbs) foundItems.push(`${result.herbs} herbs`);
  if (result.wood) foundItems.push(`${result.wood} wood`);
  if (result.bones) foundItems.push(`${result.bones} bones`);

  const itemsText = foundItems.join(', ');
  const message = `You discover: ${result.name}. ${result.description} [Found: ${itemsText}]`;

  effects.push({ type: 'event', message });

  return {
    ...gameActions.forage,
    effects
  };
}

export function createInvestigateAction(day: number): Action {
  const result = getRandomInvestigationResult(day);
  const effects: ActionEffect[] = [
    { type: 'resource', target: 'stamina', value: -25 }
  ];

  // Add resource effects based on what was found
  if (result.herbs) {
    effects.push({ type: 'resource', target: 'herbs', value: result.herbs });
  }
  if (result.wood) {
    effects.push({ type: 'resource', target: 'wood', value: result.wood });
  }
  if (result.bones) {
    effects.push({ type: 'resource', target: 'bones', value: result.bones });
  }
  if (result.ash) {
    effects.push({ type: 'resource', target: 'ash', value: result.ash });
  }
  if (result.sanityEffect) {
    effects.push({ type: 'resource', target: 'sanity', value: result.sanityEffect });
  }
  if (result.faithEffect) {
    effects.push({ type: 'resource', target: 'faith', value: result.faithEffect });
  }

  // Create the descriptive message
  const foundItems = [];
  if (result.herbs) foundItems.push(`${result.herbs} herbs`);
  if (result.wood) foundItems.push(`${result.wood} wood`);
  if (result.bones) foundItems.push(`${result.bones} bones`);
  if (result.ash) foundItems.push(`${result.ash} ash`);

  let message = `Investigation: ${result.name}. ${result.description}`;
  if (foundItems.length > 0) {
    message += ` [Found: ${foundItems.join(', ')}]`;
  }

  effects.push({ type: 'event', message });

  return {
    ...gameActions.investigate,
    effects
  };
}

export function getAvailableActions(resources: Resources, phase: 'day' | 'night', unburiedCorpses: number = 0, day: number = 1): Action[] {
  const actions = Object.values(gameActions);
  
  if (phase === 'night') {
    return [gameActions.wake_up, gameActions.read_texts];
  }
  
  // Filter out actions based on game state and progression
  const filteredActions = actions.filter(action => {
    if (action.type === 'sleep') return true;  // Sleep is always available during day
    if (action.type === 'wake_up') return false;  // Wake up only during night
    
    // Skip forage and investigate here - we'll handle them separately  
    if (action.type === 'forage' || action.type === 'investigate') return false;
    
    // Progressive unlocking based on day
    if (day === 1) {
      // Day 1: Only basic actions + corpse handling
      return ['dig_grave', 'burn_body', 'rest', 'meditate'].includes(action.type);
    } else if (day <= 3) {
      // Days 2-3: Add reading, investigating, foraging  
      return ['dig_grave', 'burn_body', 'rest', 'read_texts', 'meditate', 'investigate'].includes(action.type);
    } else if (day <= 5) {
      // Days 4-5: Add perform_rites and shrine tending
      return ['dig_grave', 'burn_body', 'rest', 'read_texts', 'perform_rites', 'meditate', 'investigate', 'tend_shrine'].includes(action.type);
    } else if (day <= 8) {
      // Days 6-8: Add crafting and water purification
      return ['dig_grave', 'burn_body', 'rest', 'read_texts', 'perform_rites', 'meditate', 'investigate', 'tend_shrine', 'craft_tools', 'purify_water'].includes(action.type);
    }
    
    // Day 9+: All actions available except ritual (that's special) 
    if (action.type === 'ritual') return false;
    
    // Abandon is available from day 3 onwards (when players understand the game)
    if (action.type === 'abandon' && day < 3) return false;
    
    return true;
  }).map(action => {
    // Add disabled reasons for actions that can't be performed
    if ((action.type === 'dig_grave' || action.type === 'burn_body') && unburiedCorpses <= 0) {
      return {
        ...action,
        disabled: true,
        disabledReason: 'No unburied corpses remain'
      };
    }
    
    return action;
  });

  // Add the dynamic forage action (unlocked from day 2)
  if (day > 1) {
    filteredActions.push(createForageAction());
  }

  // Add the dynamic investigate action (unlocked from day 2)
  if (day > 1) {
    filteredActions.push(createInvestigateAction(day));
  }

  return filteredActions;
}