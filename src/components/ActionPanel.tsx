'use client';

import { Action } from '@/types/game';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

interface ActionPanelProps {
  actions: Action[];
}

export default function ActionPanel({ actions }: ActionPanelProps) {
  const { performAction, canPerformAction } = useGame();
  const { playClick, playAction } = useSound();

  const handleActionClick = (action: Action) => {
    if (canPerformAction(action)) {
      // Play appropriate sound based on action type
      if (['dig_grave', 'burn_body', 'perform_rites', 'forage'].includes(action.type)) {
        const soundType = action.type === 'dig_grave' ? 'dig' : 
                         action.type === 'burn_body' ? 'burn' : 
                         action.type === 'perform_rites' ? 'ritual' : 'forage';
        playAction(soundType);
      } else {
        playClick();
      }
      
      performAction(action);
    } else {
      // Still play click sound for feedback even if action can't be performed
      playClick();
    }
  };

  const getActionIcon = (actionType: string) => {
    const icons: Record<string, string> = {
      dig_grave: '⚰️',
      burn_body: '🔥',
      perform_rites: '✨',
      forage: '🔍',
      read_texts: '📜',
      sleep: '😴',
      rest: '💤',
      wake_up: '🌅',
      ritual: '🕯️',
      abandon: '🚪',
      craft_tools: '🔨',
      meditate: '🧘',
      investigate: '🕵️',
      tend_shrine: '⛩️',
      purify_water: '💧'
    };
    return icons[actionType] || '❓';
  };

  const getRequirementsText = (action: Action) => {
    if (!action.requirements) return '';
    
    const reqs = Object.entries(action.requirements)
      .map(([resource, amount]) => `${resource}: ${amount}`)
      .join(', ');
    
    return reqs ? `Requires: ${reqs}` : '';
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 animate-slide-up animation-delay-2000">
      <h3 className="text-gray-300 text-sm font-semibold mb-3 border-b border-gray-700 pb-2">
        Available Actions
      </h3>
      
      <div className="space-y-2">
        {actions.map((action) => {
          const canPerform = canPerformAction(action);
          const isDisabled = action.disabled || !canPerform;
          
          return (
            <button
              key={action.type}
              onClick={() => handleActionClick(action)}
              disabled={isDisabled}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 transform hover:scale-102 ${
                isDisabled
                  ? 'bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500 active:bg-gray-600 animate-glow'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-xl mt-0.5">{getActionIcon(action.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${isDisabled ? 'text-gray-500' : 'text-gray-200'}`}>
                      {action.label}
                    </h4>
                    {!canPerform && action.requirements && (
                      <span className="text-red-400 text-xs">!</span>
                    )}
                  </div>
                  <p className={`text-sm ${isDisabled ? 'text-gray-600' : 'text-gray-400'}`}>
                    {action.description}
                  </p>
                  {action.requirements && (
                    <p className={`text-xs mt-1 ${isDisabled ? 'text-gray-600' : 'text-gray-500'}`}>
                      {getRequirementsText(action)}
                    </p>
                  )}
                  {action.disabledReason && (
                    <p className="text-xs mt-1 text-red-400">
                      {action.disabledReason}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}