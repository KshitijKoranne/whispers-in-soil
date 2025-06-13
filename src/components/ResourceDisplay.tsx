'use client';

import { Resources } from '@/types/game';

interface ResourceDisplayProps {
  resources: Resources;
}

export default function ResourceDisplay({ resources }: ResourceDisplayProps) {
  const getResourceColor = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 70) return 'text-green-400';
    if (percentage >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const resourceItems = [
    { label: 'Faith', value: resources.faith, max: 100, icon: '✟' },
    { label: 'Stamina', value: resources.stamina, max: 100, icon: '⚡' },
    { label: 'Sanity', value: resources.sanity, max: 100, icon: '🧠' },
    { label: 'Herbs', value: resources.herbs, max: 20, icon: '🌿' },
    { label: 'Ash', value: resources.ash, max: 10, icon: '💀' },
    { label: 'Bones', value: resources.bones, max: 10, icon: '🦴' },
    { label: 'Wood', value: resources.wood, max: 20, icon: '🪵' }
  ];

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-4 animate-slide-up animation-delay-1000">
      <h3 className="text-gray-300 text-sm font-semibold mb-3 border-b border-gray-700 pb-2">
        Resources
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {resourceItems.map(({ label, value, max, icon }) => (
          <div key={label} className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">{icon}</span>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-xs">{label}</span>
                <span className={`text-xs font-mono ${getResourceColor(value, max)}`}>
                  {value}/{max}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 animate-progress ${
                    value >= max * 0.7 ? 'bg-green-500' :
                    value >= max * 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ 
                    width: `${Math.min((value / max) * 100, 100)}%`,
                    '--progress-width': `${Math.min((value / max) * 100, 100)}%`
                  } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}