'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  const atmosphericQuotes = [
    "The dead do not rest easy here...",
    "Strange whispers rise from the soil when darkness falls...",
    "Someone must tend to the rites...",
    "But something watches from the shadows..."
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Cycle through atmospheric quotes with fade effect
    const interval = setInterval(() => {
      setQuoteVisible(false); // Fade out
      
      setTimeout(() => {
        setCurrentQuote(prev => (prev + 1) % atmosphericQuotes.length);
        setQuoteVisible(true); // Fade in
      }, 500); // Half second for fade out before changing text
    }, 5000); // 5 seconds total display time

    return () => clearInterval(interval);
  }, [atmosphericQuotes.length]);

  return (
    <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden">
      {/* Dark, horror background */}
      <div className="absolute inset-0">
        {/* Multiple dark gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-gray-900/40 via-black to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black"></div>
        
        {/* Ominous moving shadows */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-950/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        </div>
        
        {/* Creepy floating particles - more scattered and dim */}
        <div className="absolute top-16 left-12 w-1 h-1 bg-red-800/60 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-32 right-24 w-1.5 h-1.5 bg-gray-700/40 rounded-full animate-pulse opacity-20 animation-delay-1000"></div>
        <div className="absolute bottom-40 left-8 w-1 h-1 bg-purple-800/50 rounded-full animate-pulse opacity-25 animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/3 w-0.5 h-0.5 bg-gray-600/60 rounded-full animate-pulse opacity-15 animation-delay-3000"></div>
        <div className="absolute bottom-16 right-16 w-1 h-1 bg-red-900/40 rounded-full animate-pulse opacity-20 animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-gray-800/30 rounded-full animate-pulse opacity-30 animation-delay-2000"></div>
        
        {/* Heavy fog/mist effect */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900/40 via-gray-950/20 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-gray-950/30 to-transparent"></div>
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Game title */}
        <div className={`text-center mb-12 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-200 mb-6 text-flicker tracking-wider drop-shadow-2xl" style={{ fontFamily: 'DemonsAndDarlings, serif' }}>
            Whispers in the Soil
            <span className="text-lg md:text-xl text-red-400 ml-3 font-sans opacity-80">BETA</span>
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-red-900/60 to-transparent mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-500 font-serif italic max-w-2xl mx-auto text-center leading-relaxed">
            A horror resource management game where you are the last mourner 
            in a plague-ravaged village
          </p>
        </div>

        {/* Atmospheric quote */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className={`text-base text-gray-400 font-serif italic min-h-[3rem] flex items-center justify-center transition-opacity duration-500 ${quoteVisible ? 'opacity-100' : 'opacity-0'} drop-shadow-lg`}>
            &ldquo;{atmosphericQuotes[currentQuote]}&rdquo;
          </p>
        </div>

        {/* Game description */}
        <div className={`max-w-4xl text-center mb-12 transition-all duration-2000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-black/70 border border-gray-800/50 rounded-lg p-6 backdrop-blur-sm hover:bg-gray-950/80 transition-all duration-300">
              <div className="text-3xl mb-4 opacity-70">⚰️</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-300">Tend to the Dead</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Perform sacred rites and properly bury the departed while managing your 
                faith, sanity, and stamina.
              </p>
            </div>
            
            <div className="bg-black/70 border border-gray-800/50 rounded-lg p-6 backdrop-blur-sm hover:bg-gray-950/80 transition-all duration-300">
              <div className="text-3xl mb-4 opacity-70">🌙</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-300">Survive the Nights</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Face supernatural encounters and make difficult choices that 
                affect your survival in this haunted place.
              </p>
            </div>
            
            <div className="bg-black/70 border border-gray-800/50 rounded-lg p-6 backdrop-blur-sm hover:bg-gray-950/80 transition-all duration-300">
              <div className="text-3xl mb-4 opacity-70">🌿</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-300">Gather Resources</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Forage for herbs, wood, and mysterious artifacts needed 
                for rituals and keeping the restless spirits at bay.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className={`text-center mb-16 transition-all duration-2000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link 
            href="/play-options"
            className="inline-block px-12 py-4 bg-gray-900/80 hover:bg-red-950/30 text-gray-200 text-xl font-semibold rounded-lg border border-gray-700/50 hover:border-red-900/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-950/20 backdrop-blur-sm"
          >
            Enter the Village
          </Link>
          <p className="text-gray-600 text-sm mt-4 italic">
            Are you prepared to face what lurks in the shadows?
          </p>
        </div>

        {/* Beta Notice */}
        <div className={`text-center mb-8 transition-all duration-2000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-red-300 text-sm font-semibold mb-2">🚧 Beta Version</p>
            <p className="text-gray-400 text-xs">
              Some sounds and features are still being added. Your feedback helps us improve the experience!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center transition-all duration-2000 delay-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-700 text-sm italic">
            A dark tale of duty, sacrifice, and the supernatural
          </p>
        </div>
      </div>

      {/* Subtle animated border effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-pulse animation-delay-2000"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent animate-pulse animation-delay-1000"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent animate-pulse animation-delay-3000"></div>
      </div>
    </div>
  );
}