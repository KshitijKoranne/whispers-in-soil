'use client';

import { useSound } from '@/hooks/useSound';
import { useState } from 'react';

export default function SoundSettings() {
  const { isEnabled, volume, setEnabled, setVolume } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 border border-gray-600 rounded-lg p-2 hover:bg-gray-700 transition-colors"
        title="Sound Settings"
      >
        <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          {isEnabled ? (
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.789A1 1 0 019.383 3.076zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.789A1 1 0 019.383 3.076zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-lg min-w-[200px]">
          <h3 className="text-gray-200 font-semibold mb-3">Sound Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-gray-300 text-sm">Enabled</label>
              <button
                onClick={() => setEnabled(!isEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  isEnabled ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                disabled={!isEnabled}
                className="w-full accent-gray-400"
              />
              <div className="text-xs text-gray-500 text-center">
                {Math.round(volume * 100)}%
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}