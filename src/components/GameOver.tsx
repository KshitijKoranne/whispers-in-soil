'use client';

import { GameState } from '@/types/game';
import { useGame } from '@/contexts/GameContext';

interface GameOverProps {
  gameState: GameState;
}

export default function GameOver({ gameState }: GameOverProps) {
  const { dispatch } = useGame();

  const handleRestart = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const isVictory = () => {
    return gameState.gameOverReason?.includes('duty is complete') || 
           gameState.gameOverReason?.includes('helped restore this place');
  };

  const getGameOverTitle = () => {
    if (isVictory()) {
      return 'Duty Fulfilled';
    }
    if (gameState.resources.sanity <= 0) {
      return 'Madness Consumes You';
    }
    if (gameState.resources.faith <= 0) {
      return 'Faith Abandoned';
    }
    if (gameState.resources.stamina <= 0) {
      return 'Exhaustion Claims You';
    }
    if (gameState.gameOverReason?.includes('plague has returned')) {
      return 'The Plague Returns';
    }
    if (gameState.gameOverReason?.includes('forced to abandon')) {
      return 'Duty Incomplete';
    }
    return 'The End';
  };

  const getGameOverArt = () => {
    return `
    ⚰️ ⚰️ ⚰️
    💀   💀   💀
    🕯️ ✨ 🕯️
    `;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
          <pre className="text-2xl mb-6 text-gray-400">
            {getGameOverArt()}
          </pre>
          
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 text-flicker ${
            isVictory() ? 'text-green-400' : 'text-red-400'
          }`}>
            {getGameOverTitle()}
          </h1>
          
          <div className="bg-gray-800 border border-gray-600 rounded p-4 mb-6">
            <p className="text-gray-300 text-lg italic mb-4">
              {gameState.gameOverReason}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-gray-400">Days Survived</div>
              <div className="text-2xl font-bold text-blue-400">{gameState.day}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-gray-400">Rites Completed</div>
              <div className="text-2xl font-bold text-green-400">{gameState.completedRites}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-gray-400">Unburied Corpses</div>
              <div className="text-2xl font-bold text-red-400">{gameState.unburiedCorpses}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-gray-400">Act Reached</div>
              <div className="text-2xl font-bold text-purple-400">{gameState.act}</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 px-6 rounded-lg border border-gray-600 transition-colors duration-200"
          >
            Begin Again
          </button>

          <div className="mt-6 text-gray-500 text-sm">
            <p>The village remembers your efforts, however brief...</p>
          </div>
        </div>
      </div>
    </div>
  );
}