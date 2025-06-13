'use client';

import { useState, useEffect } from 'react';
// import { soundManager } from '@/utils/SoundManager';
import { useSound } from '@/hooks/useSound';

interface IntroSequenceProps {
  onComplete: () => void;
}

const introStory = [
  "The plague came in autumn, when the leaves turned the color of dried blood.",
  "One by one, the villagers fell silent, their voices joining the wind.",
  "You remained, the last mourner in a place forgotten by the living.",
  "The dead do not rest easy here.",
  "Strange whispers rise from the soil when darkness falls.",
  "The graves shift when you're not looking.",
  "Someone must tend to the rites.",
  "Someone must keep the peace.",
  "But something watches from the shadows...",
  "...and it grows hungry."
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const { playIntroMusic, stopIntroMusic } = useSound();

  useEffect(() => {
    setCanSkip(true);
    
    // Start intro music immediately (permission already granted)
    playIntroMusic();
    
    // Cleanup function to stop music when component unmounts
    return () => {
      stopIntroMusic();
    };
  }, [playIntroMusic, stopIntroMusic]);

  useEffect(() => {
    if (currentSentence >= introStory.length) {
      // Stop music before completing intro
      setTimeout(() => {
        stopIntroMusic();
        onComplete();
      }, 2000);
      return;
    }

    // Start with invisible, then fade in after a brief delay
    setIsVisible(false);
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Wait for sentence to be read, then fade out and move to next
    const progressTimer = setTimeout(() => {
      setIsVisible(false);
      
      // After fade out, move to next sentence
      setTimeout(() => {
        setCurrentSentence(prev => prev + 1);
      }, 800); // Wait for fade out to complete (700ms transition + buffer)
    }, 3500); // Display each sentence for 3.5 seconds

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(progressTimer);
    };
  }, [currentSentence, onComplete, stopIntroMusic]);

  const handleSkip = () => {
    if (canSkip) {
      stopIntroMusic();
      onComplete();
    }
  };

  const handleClick = () => {
    // Optional: Allow clicking to skip to next sentence or skip intro
    // For now, just maintain the click area for potential future features
  };

  return (
    <div 
      className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Background atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/20 via-transparent to-gray-950"></div>
      <div className="absolute top-20 left-20 w-2 h-2 bg-gray-600 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute bottom-32 right-32 w-1 h-1 bg-gray-500 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
      <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse opacity-20 animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto p-8 text-center relative z-10">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-16 text-flicker">
          Whispers in the Soil
        </h1>

        {/* Story text container */}
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="max-w-2xl">
            {currentSentence < introStory.length ? (
              <p 
                className={`text-lg md:text-xl text-gray-300 leading-relaxed font-serif transition-opacity duration-700 ease-in-out ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {introStory[currentSentence]}
              </p>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <p className="text-2xl text-gray-200 font-serif italic">
                  Your vigil begins...
                </p>
                <div className="w-16 h-0.5 bg-gray-600 mx-auto animate-expand"></div>
              </div>
            )}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-12">
          <div className="flex justify-center space-x-2 mb-6">
            {introStory.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index <= currentSentence ? 'bg-gray-500' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Skip button */}
        {canSkip && (
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-gray-500 hover:text-gray-400 text-sm transition-colors duration-200 opacity-0 animate-fade-in animation-delay-3000"
          >
            Press to skip...
          </button>
        )}
      </div>
    </div>
  );
}