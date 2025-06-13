'use client';

import { soundManager } from '@/utils/SoundManager';

interface SoundPermissionPromptProps {
  onPermissionGranted: () => void;
  onPermissionDenied: () => void;
}

export default function SoundPermissionPrompt({ onPermissionGranted, onPermissionDenied }: SoundPermissionPromptProps) {
  const handleEnableSound = () => {
    // Initialize audio context immediately
    soundManager.initAudioContext();
    soundManager.setEnabled(true);
    onPermissionGranted();
  };

  const handleDisableSound = () => {
    soundManager.setEnabled(false);
    onPermissionDenied();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center relative overflow-hidden">
      {/* Background atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/20 via-transparent to-gray-950"></div>
      <div className="absolute top-20 left-20 w-2 h-2 bg-gray-600 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute bottom-32 right-32 w-1 h-1 bg-gray-500 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
      <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse opacity-20 animation-delay-2000"></div>

      <div className="max-w-2xl mx-auto p-8 text-center relative z-10">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-8 text-flicker">
          Whispers in the Soil
        </h1>

        {/* Permission prompt */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 animate-fade-in">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.789L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.789A1 1 0 019.383 3.076zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            Enable Audio Experience?
          </h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            This game features atmospheric music and sound effects to enhance your experience. 
            Would you like to enable audio?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEnableSound}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-all duration-200 transform hover:scale-105 border border-gray-600 hover:border-gray-500"
            >
              🔊 Yes, Enable Audio
            </button>
            
            <button
              onClick={handleDisableSound}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all duration-200 transform hover:scale-105 border border-gray-700 hover:border-gray-600"
            >
              🔇 No, Silent Mode
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            You can change this setting anytime using the sound icon in the game.
          </p>
        </div>
      </div>
    </div>
  );
}