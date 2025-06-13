'use client';

import { GameEvent } from '@/types/game';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';
import { useEffect } from 'react';

interface SpiritEncounterProps {
  event: GameEvent;
  onClose: () => void;
}

export default function SpiritEncounter({ event, onClose }: SpiritEncounterProps) {
  const { dispatch } = useGame();
  const { playClick, playSpiritEncounter } = useSound();

  useEffect(() => {
    // Play spirit encounter sound when component mounts
    playSpiritEncounter();
  }, [playSpiritEncounter]);

  const handleChoice = (choiceIndex: number) => {
    const choice = event.choices?.[choiceIndex];
    if (!choice) return;

    // Play click sound
    playClick();

    // Apply all effects from the choice
    choice.effects.forEach(effect => {
      dispatch({ type: 'APPLY_EFFECT', payload: effect });
    });

    // Mark event as triggered
    dispatch({ 
      type: 'MARK_EVENT_TRIGGERED', 
      payload: { eventId: event.id } 
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-900 border-2 border-gray-600 rounded-lg max-w-2xl mx-4 p-6 animate-slide-up">
        {/* Spirit encounter header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-2 text-flicker">
            {event.title}
          </h2>
          <div className="w-16 h-0.5 bg-gray-600 mx-auto"></div>
        </div>

        {/* Atmospheric visual */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto opacity-60 animate-bounce-subtle">
            <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400">
              {/* Shadowy figure */}
              <defs>
                <radialGradient id="spiritGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.8"/>
                  <stop offset="70%" stopColor="currentColor" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
                </radialGradient>
              </defs>
              
              {/* Glowing aura */}
              <circle cx="50" cy="45" r="35" fill="url(#spiritGlow)" className="animate-pulse"/>
              
              {/* Dark silhouette */}
              <path d="M35 25 Q35 15 50 15 Q65 15 65 25 L65 40 Q65 50 60 55 L65 65 Q65 75 50 75 Q35 75 35 65 L40 55 Q35 50 35 40 Z" 
                    fill="currentColor" 
                    opacity="0.9"/>
              
              {/* Hollow eyes */}
              <circle cx="42" cy="30" r="3" fill="black" opacity="0.8"/>
              <circle cx="58" cy="30" r="3" fill="black" opacity="0.8"/>
              
              {/* Wispy trails */}
              <path d="M30 70 Q25 75 20 80 Q15 85 10 90" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                    opacity="0.4"
                    className="animate-pulse"/>
              <path d="M70 70 Q75 75 80 80 Q85 85 90 90" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                    opacity="0.4"
                    className="animate-pulse"/>
            </svg>
          </div>
        </div>

        {/* Event description */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <p className="text-gray-300 leading-relaxed text-center italic">
            {event.description}
          </p>
        </div>

        {/* Choices */}
        {event.choices && (
          <div className="space-y-3">
            <h3 className="text-gray-400 text-sm font-semibold mb-3 text-center">
              How do you respond?
            </h3>
            {event.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                className="w-full text-left p-4 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 transform hover:scale-102 animate-glow"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-gray-500 text-sm mt-1">
                    {index === 0 ? '⭐' : '💀'}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-200 font-medium mb-1">
                      {choice.text}
                    </p>
                    <div className="text-xs text-gray-500">
                      {choice.effects.map((effect, i) => {
                        if (effect.type === 'resource' && effect.target && effect.value !== undefined) {
                          const numValue = typeof effect.value === 'number' ? effect.value : 0;
                          const sign = numValue > 0 ? '+' : '';
                          const color = numValue > 0 ? 'text-green-400' : 'text-red-400';
                          return (
                            <span key={i} className={`${color} mr-2`}>
                              {effect.target}: {sign}{numValue}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Atmospheric footer */}
        <div className="text-center mt-6 text-gray-500 text-xs">
          <p className="italic">The dead remember your choices...</p>
        </div>
      </div>
    </div>
  );
}