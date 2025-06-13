import { Ritual } from '@/types/game';

export const rituals: Ritual[] = [
  {
    id: 'cleansing_rite',
    name: 'Rite of Cleansing',
    description: 'Burn herbs and ash to purify the area and calm restless spirits.',
    requirements: { herbs: 2, ash: 1, faith: 15 },
    effects: [
      { type: 'resource', target: 'herbs', value: -2 },
      { type: 'resource', target: 'ash', value: -1 },
      { type: 'resource', target: 'faith', value: -15 },
      { type: 'resource', target: 'sanity', value: 10 },
      { type: 'event', message: 'Sacred smoke rises, and you feel the oppressive weight lift slightly.' }
    ],
    unlocked: true
  },
  {
    id: 'bone_communion',
    name: 'Communion of Bones',
    description: 'Use bone fragments to speak with the dead and learn their desires.',
    requirements: { bones: 1, faith: 20 },
    effects: [
      { type: 'resource', target: 'bones', value: -1 },
      { type: 'resource', target: 'faith', value: -20 },
      { type: 'resource', target: 'sanity', value: -5 },
      { type: 'event', message: 'The bones whisper secrets of the departed.' }
    ],
    unlocked: false
  },
  {
    id: 'final_rest',
    name: 'Rite of Final Rest',
    description: 'The ultimate ritual to permanently lay the dead to rest. Requires great sacrifice.',
    requirements: { herbs: 5, ash: 3, bones: 2, faith: 50 },
    effects: [
      { type: 'resource', target: 'herbs', value: -5 },
      { type: 'resource', target: 'ash', value: -3 },
      { type: 'resource', target: 'bones', value: -2 },
      { type: 'resource', target: 'faith', value: -50 },
      { type: 'event', message: 'The ancient words echo through eternity. Peace descends upon the village.' }
    ],
    unlocked: false
  },
  {
    id: 'forbidden_binding',
    name: 'Forbidden Binding',
    description: 'Dark ritual to control the dead rather than free them. Corrupts the soul.',
    requirements: { bones: 3, ash: 2, faith: 30 },
    effects: [
      { type: 'resource', target: 'bones', value: -3 },
      { type: 'resource', target: 'ash', value: -2 },
      { type: 'resource', target: 'faith', value: -30 },
      { type: 'resource', target: 'sanity', value: -20 },
      { type: 'event', message: 'The dead bend to your will, but at what cost?' }
    ],
    unlocked: false
  }
];

export function getUnlockedRituals(): Ritual[] {
  return rituals.filter(ritual => ritual.unlocked);
}