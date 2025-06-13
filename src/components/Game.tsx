'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { getAvailableActions } from '@/data/actions';
import { getSpiritEncounter } from '@/data/spirits';
import { GameEvent } from '@/types/game';
import { useSound } from '@/hooks/useSound';
import ResourceDisplay from './ResourceDisplay';
import GameStatus from './GameStatus';
import ActionPanel from './ActionPanel';
import GameOver from './GameOver';
import IntroSequence from './IntroSequence';
import SpiritEncounter from './SpiritEncounter';
import SoundSettings from './SoundSettings';
import SoundPermissionPrompt from './SoundPermissionPrompt';

export default function Game() {
  const { state, hasSeenIntro, markIntroSeen, triggeredEvents } = useGame();
  const { playAmbient, playGameOver, isEnabled } = useSound();
  const [currentSpiritEvent, setCurrentSpiritEvent] = useState<GameEvent | null>(null);
  const [soundPermissionAsked, setSoundPermissionAsked] = useState(() => {
    // Check if user has previously made a choice
    if (typeof window !== 'undefined') {
      return localStorage.getItem('soundPermissionAsked') === 'true';
    }
    return false;
  });

  // Handle ambient sound based on phase and enabled state
  useEffect(() => {
    if (!state.gameOver && isEnabled) {
      playAmbient(state.phase);
    }
  }, [state.phase, state.gameOver, isEnabled, playAmbient]);

  // Play game over sound
  useEffect(() => {
    if (state.gameOver) {
      playGameOver();
    }
  }, [state.gameOver, playGameOver]);

  // Check for spirit encounters when phase changes to night
  useEffect(() => {
    if (state.phase === 'night' && !currentSpiritEvent) {
      const encounter = getSpiritEncounter({
        ...state,
        triggeredEvents: Array.from(triggeredEvents)
      });
      
      if (encounter && !triggeredEvents.has(encounter.id)) {
        setCurrentSpiritEvent(encounter);
      }
    }
  }, [state.phase, state.day, state.unburiedCorpses, state.completedRites, triggeredEvents, currentSpiritEvent]);

  // Show sound permission prompt first
  if (!soundPermissionAsked) {
    return (
      <SoundPermissionPrompt 
        onPermissionGranted={() => {
          setSoundPermissionAsked(true);
          localStorage.setItem('soundPermissionAsked', 'true');
        }}
        onPermissionDenied={() => {
          setSoundPermissionAsked(true);
          localStorage.setItem('soundPermissionAsked', 'true');
        }}
      />
    );
  }

  if (!hasSeenIntro) {
    return <IntroSequence onComplete={markIntroSeen} />;
  }

  if (state.gameOver) {
    return <GameOver gameState={state} />;
  }

  // Show spirit encounter if one is active
  if (currentSpiritEvent) {
    return (
      <SpiritEncounter 
        event={currentSpiritEvent} 
        onClose={() => setCurrentSpiritEvent(null)} 
      />
    );
  }

  const availableActions = getAvailableActions(state.resources, state.phase, state.unburiedCorpses, state.day);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 animate-fade-in">
      <SoundSettings />
      <div className="container mx-auto max-w-4xl p-4 space-y-4">
        {/* Game Title */}
        <header className="text-center py-6 border-b border-gray-700 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 text-flicker mb-2" style={{ fontFamily: 'DemonsAndDarlings, serif' }}>
            Whispers in the Soil <span className="text-sm text-red-400 font-sans opacity-70">BETA</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base italic">
            You are the last mourner in a village long-abandoned by life...
          </p>
        </header>

        {/* Game Status */}
        <GameStatus gameState={state} />

        {/* Resources */}
        <ResourceDisplay resources={state.resources} />

        {/* Narrative Log */}
        {state.lastAction && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 animate-fade-in">
            <h3 className="text-gray-300 text-sm font-semibold mb-2">Recent Events</h3>
            <div className="space-y-2">
              {state.lastAction.effects
                .filter(effect => effect.type === 'event' && effect.message)
                .map((effect, index) => (
                  <p key={index} className="text-gray-400 text-sm italic animate-slide-up">
                    {effect.message}
                  </p>
                ))}
            </div>
          </div>
        )}

        {/* Action Panel */}
        <ActionPanel actions={availableActions} />

        {/* Footer */}
        <footer className="text-center text-gray-500 text-xs py-4 border-t border-gray-800">
          <p>Use your resources wisely. The dead are watching.</p>
          <p className="text-gray-600 mt-2">Beta v0.9 - Some features and sounds still being added</p>
        </footer>
      </div>
    </div>
  );
}