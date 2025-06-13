'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, Action, ActionEffect, Resources } from '@/types/game';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  performAction: (action: Action) => void;
  canPerformAction: (action: Action) => boolean;
  hasSeenIntro: boolean;
  markIntroSeen: () => void;
  triggeredEvents: Set<string>;
}

type GameAction = 
  | { type: 'PERFORM_ACTION'; payload: Action }
  | { type: 'APPLY_EFFECT'; payload: ActionEffect }
  | { type: 'ADVANCE_DAY' }
  | { type: 'SET_PHASE'; payload: 'day' | 'night' }
  | { type: 'LOAD_GAME'; payload: GameState }
  | { type: 'RESET_GAME' }
  | { type: 'TRIGGER_SPIRIT_ENCOUNTER'; payload: string }
  | { type: 'MARK_EVENT_TRIGGERED'; payload: { eventId: string } };

const initialState: GameState = {
  day: 1,
  phase: 'day',
  resources: {
    faith: 50,
    stamina: 100,
    sanity: 80,
    herbs: 3,
    ash: 1,
    bones: 0,
    wood: 5
  },
  unburiedCorpses: 3,
  completedRites: 0,
  act: 1,
  gameOver: false,
  spirits: [],
  knownRituals: []
};

const GAME_STARTED_KEY = 'whispers-game-started';

// Progressive difficulty functions
function calculateNewCorpses(day: number): number {
  if (day <= 3) return Math.floor(Math.random() * 2) + 1; // 1-2 corpses
  if (day <= 7) return Math.floor(Math.random() * 3) + 1; // 1-3 corpses  
  if (day <= 14) return Math.floor(Math.random() * 3) + 2; // 2-4 corpses
  return Math.floor(Math.random() * 4) + 3; // 3-6 corpses (late game)
}

function calculateNightSanityCost(day: number): number {
  const baseCost = 2;
  const scalingCost = Math.floor(day / 3); // Increases every 3 days
  return Math.min(baseCost + scalingCost, 8); // Max 8 sanity loss per night
}

function calculateRandomEvents(day: number): string[] {
  const events = [];
  
  // Early game events (days 1-5)
  if (day <= 5) {
    const earlyEvents = [
      'You find a child\'s toy among the ruins. The memories haunt you.',
      'Strange scratching sounds echo from empty houses during the night.',
      'A cold wind carries whispers in a language you don\'t understand.',
      'You discover disturbed graves that seem to have been dug from within.'
    ];
    if (Math.random() < 0.3) events.push(earlyEvents[Math.floor(Math.random() * earlyEvents.length)]);
  }
  
  // Mid game events (days 6-14)
  if (day > 5 && day <= 14) {
    const midEvents = [
      'Dark shapes move between the tombstones when you\'re not looking.',
      'The church bell rings at midnight, though no one is there to ring it.',
      'You find fresh flowers on a grave you buried yesterday.',
      'Footprints appear in the mud that match no living person\'s stride.'
    ];
    if (Math.random() < 0.4) events.push(midEvents[Math.floor(Math.random() * midEvents.length)]);
  }
  
  // Late game events (days 15+)
  if (day > 14) {
    const lateEvents = [
      'The dead speak to you in dreams, demanding proper rites.',
      'Shadows take the shape of those you\'ve failed to bury properly.',
      'The ground trembles with the restlessness of angry spirits.',
      'You see your own reflection standing among the unburied dead.'
    ];
    if (Math.random() < 0.5) events.push(lateEvents[Math.floor(Math.random() * lateEvents.length)]);
  }
  
  return events;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'PERFORM_ACTION':
      return handleActionPerformed(state, action.payload);
    
    case 'APPLY_EFFECT':
      return applyEffect(state, action.payload);
    
    case 'ADVANCE_DAY':
      return {
        ...state,
        day: state.day + 1,
        phase: 'day',
        resources: {
          ...state.resources,
          stamina: Math.min(100, state.resources.stamina + 20)
        }
      };
    
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    
    case 'LOAD_GAME':
      return action.payload;
    
    case 'RESET_GAME':
      return initialState;
    
    case 'MARK_EVENT_TRIGGERED':
      // This will be handled in the provider
      return state;
    
    default:
      return state;
  }
}

function handleActionPerformed(state: GameState, action: Action): GameState {
  let newState: GameState = { ...state, lastAction: action };
  
  // Handle abandon action immediately
  if (action.type === 'abandon') {
    return {
      ...newState,
      gameOver: true,
      gameOverReason: 'You abandoned your sacred duty and fled the village. The dead remain unburied, but you live to see another day.'
    };
  }
  
  // Apply all effects
  for (const effect of action.effects) {
    newState = applyEffect(newState, effect);
  }
  
  // Check for game over conditions
  if (newState.resources.sanity <= 0) {
    newState.gameOver = true;
    newState.gameOverReason = 'Your mind has shattered under the weight of guilt and horror. The whispers drive you into the darkness.';
  }
  
  if (newState.resources.faith <= 0 && newState.unburiedCorpses > 0) {
    newState.gameOver = true;
    newState.gameOverReason = 'You have lost all faith in your sacred duty. The dead will never rest, and neither will you.';
  }
  
  if (newState.resources.stamina <= 0 && newState.day > 3) {
    newState.gameOver = true;
    newState.gameOverReason = 'Exhaustion overwhelms you. Your body gives out among the graves you could not tend.';
  }
  
  // Victory condition: All corpses buried + high faith + high sanity + sufficient rites
  if (newState.unburiedCorpses === 0 && newState.resources.faith >= 70 && 
      newState.resources.sanity >= 60 && newState.completedRites >= 5 && newState.day >= 7) {
    newState.gameOver = true;
    newState.gameOverReason = 'Your duty is complete. The village is at peace, and the spirits rest easy. You have honored the dead with dignity and purpose.';
  }
  
  // Plague returns if too many corpses remain unburied for too long
  if (newState.unburiedCorpses >= 5 && newState.day >= 10) {
    newState.gameOver = true;
    newState.gameOverReason = 'The plague has returned. Too many bodies left unburied have attracted disease and corruption back to the village.';
  }
  
  // Time limit ending - village reclaimed
  if (newState.day >= 21) {
    if (newState.unburiedCorpses === 0 && newState.completedRites >= 3) {
      newState.gameOver = true;
      newState.gameOverReason = 'After three weeks, survivors return to reclaim the village. Your work helped restore this place to the living.';
    } else {
      newState.gameOver = true;
      newState.gameOverReason = 'After three weeks, you are forced to abandon your post. The village remains cursed by your incomplete work.';
    }
  }
  
  return newState;
}

function applyEffect(state: GameState, effect: ActionEffect): GameState {
  switch (effect.type) {
    case 'resource':
      if (effect.target && effect.value !== undefined && effect.target in state.resources) {
        const currentValue = state.resources[effect.target as keyof Resources];
        const numValue = typeof effect.value === 'number' ? effect.value : 0;
        const newValue = Math.max(0, Math.min(100, currentValue + numValue));
        return {
          ...state,
          resources: {
            ...state.resources,
            [effect.target]: newValue
          }
        };
      }
      return state;
    
    case 'gameState':
      if (effect.target && effect.value !== undefined) {
        if (effect.target === 'unburiedCorpses') {
          return {
            ...state,
            unburiedCorpses: Math.max(0, state.unburiedCorpses + (effect.value as number))
          };
        }
        if (effect.target === 'completedRites') {
          return {
            ...state,
            completedRites: Math.max(0, state.completedRites + (effect.value as number))
          };
        }
        if (effect.target === 'phase') {
          const newState = {
            ...state,
            phase: effect.value as 'day' | 'night'
          };
          
          // When advancing to day phase, spawn new corpses and increase difficulty
          if (effect.value === 'day') {
            const newDay = newState.day + 1;
            const newCorpses = calculateNewCorpses(newDay);
            const sanityCost = calculateNightSanityCost(newDay);
            const randomEvents = calculateRandomEvents(newDay);
            
            // Store random events in the action for display
            const updatedAction = newState.lastAction ? {
              ...newState.lastAction,
              randomEvents
            } : undefined;
            
            return {
              ...newState,
              day: newDay,
              unburiedCorpses: newState.unburiedCorpses + newCorpses,
              resources: {
                ...newState.resources,
                sanity: Math.max(0, newState.resources.sanity - sanityCost)
              },
              lastAction: updatedAction
            };
          }
          
          return newState;
        }
        if (effect.target === 'day') {
          return {
            ...state,
            day: state.day + (effect.value as number)
          };
        }
      }
      return state;
    
    case 'event':
      // Handle special events
      return state;
    
    case 'narrative':
      // Handle narrative changes
      return state;
    
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [hasSeenIntro, setHasSeenIntro] = React.useState(false);
  const [triggeredEvents, setTriggeredEvents] = React.useState<Set<string>>(new Set());
  
  // Load saved game and intro state on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('whispers-in-soil-save');
    const introSeen = localStorage.getItem(GAME_STARTED_KEY);
    
    setHasSeenIntro(Boolean(introSeen));
    
    if (savedGame) {
      try {
        const gameState = JSON.parse(savedGame);
        dispatch({ type: 'LOAD_GAME', payload: gameState });
      } catch (error) {
        console.error('Failed to load saved game:', error);
      }
    }
  }, []);
  
  // Save game on state change
  useEffect(() => {
    localStorage.setItem('whispers-in-soil-save', JSON.stringify(state));
  }, [state]);
  
  const canPerformAction = (action: Action): boolean => {
    if (action.requirements) {
      for (const [resource, required] of Object.entries(action.requirements)) {
        const current = state.resources[resource as keyof Resources];
        if (current < (required || 0)) {
          return false;
        }
      }
    }
    return true;
  };
  
  const performAction = (action: Action) => {
    if (canPerformAction(action)) {
      dispatch({ type: 'PERFORM_ACTION', payload: action });
    }
  };
  
  const markIntroSeen = () => {
    localStorage.setItem(GAME_STARTED_KEY, 'true');
    setHasSeenIntro(true);
  };

  // Enhanced dispatch to handle spirit events
  const enhancedDispatch = (action: GameAction) => {
    if (action.type === 'MARK_EVENT_TRIGGERED') {
      setTriggeredEvents(prev => new Set([...prev, action.payload.eventId]));
    }
    dispatch(action);
  };
  
  return (
    <GameContext.Provider value={{ state, dispatch: enhancedDispatch, performAction, canPerformAction, hasSeenIntro, markIntroSeen, triggeredEvents }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}