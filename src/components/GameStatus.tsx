'use client';

import { GameState } from '@/types/game';

interface GameStatusProps {
  gameState: GameState;
}

export default function GameStatus({ gameState }: GameStatusProps) {
  const getPhaseIcon = () => {
    return gameState.phase === 'day' ? '☀️' : '🌙';
  };

  const getActDescription = () => {
    switch (gameState.act) {
      case 1: return 'The Routine';
      case 2: return 'The Awakening';
      case 3: return 'The Reckoning';
      default: return 'Unknown';
    }
  };

  const getPhaseDescription = () => {
    return gameState.phase === 'day' 
      ? 'The pale sun offers little warmth to the abandoned village.'
      : 'Darkness falls, and the whispers grow louder.';
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-4 animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getPhaseIcon()}</span>
          <div>
            <h2 className="text-gray-200 font-semibold">
              Day {gameState.day} - {gameState.phase === 'day' ? 'Day' : 'Night'}
            </h2>
            <p className="text-gray-400 text-sm">{getActDescription()}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-gray-300 text-sm">
            Unburied: <span className="text-red-400 font-mono text-sm">{gameState.unburiedCorpses}</span>
          </div>
          <div className="text-gray-300 text-sm">
            Rites: <span className="text-blue-400 font-mono text-sm">{gameState.completedRites}</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm italic border-t border-gray-700 pt-3">
        {getPhaseDescription()}
      </p>
      
      {gameState.lastAction && (
        <div className="mt-3 p-2 bg-gray-800 rounded border-l-2 border-blue-500">
          <p className="text-gray-300 text-sm">
            Last action: <span className="text-blue-400">{gameState.lastAction.label}</span>
          </p>
        </div>
      )}
    </div>
  );
}