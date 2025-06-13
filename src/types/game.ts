export interface Resources {
  faith: number;
  stamina: number;
  sanity: number;
  herbs: number;
  ash: number;
  bones: number;
  wood: number;
}

export interface GameState {
  day: number;
  phase: 'day' | 'night';
  resources: Resources;
  unburiedCorpses: number;
  completedRites: number;
  act: 1 | 2 | 3;
  gameOver: boolean;
  gameOverReason?: string;
  lastAction?: Action;
  spirits: Spirit[];
  knownRituals: Ritual[];
}

export interface Action {
  type: ActionType;
  label: string;
  description: string;
  requirements?: Partial<Resources>;
  effects: ActionEffect[];
  disabled?: boolean;
  disabledReason?: string;
}

export type ActionType = 
  | 'dig_grave'
  | 'burn_body'
  | 'perform_rites'
  | 'forage'
  | 'read_texts'
  | 'sleep'
  | 'rest'
  | 'wake_up'
  | 'ritual'
  | 'abandon'
  | 'craft_tools'
  | 'meditate'
  | 'investigate'
  | 'tend_shrine'
  | 'purify_water';

export interface ActionEffect {
  type: 'resource' | 'event' | 'narrative' | 'gameState';
  target?: keyof Resources | 'unburiedCorpses' | 'completedRites' | 'phase' | 'day';
  value?: number | string;
  message?: string;
  eventId?: string;
}

export interface Spirit {
  id: string;
  name: string;
  restLevel: number; // 0-100, higher is more at rest
  dialogue?: string[];
  requirement?: string;
}

export interface Ritual {
  id: string;
  name: string;
  description: string;
  requirements: Partial<Resources>;
  effects: ActionEffect[];
  unlocked: boolean;
}

export interface GameEvent {
  id: string;
  type: 'spirit_encounter' | 'dream' | 'discovery' | 'judgment';
  title: string;
  description: string;
  choices?: EventChoice[];
  triggered: boolean;
}

export interface EventChoice {
  text: string;
  effects: ActionEffect[];
}