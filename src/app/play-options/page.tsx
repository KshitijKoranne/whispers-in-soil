'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlayOptionsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden">
      {/* Background effects - matching landing page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-gray-900/40 via-black to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black"></div>
        
        {/* Ominous moving shadows */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-950/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-purple-950/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-32 left-24 w-1 h-1 bg-red-800/60 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-48 right-28 w-1.5 h-1.5 bg-gray-700/40 rounded-full animate-pulse opacity-20 animation-delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-purple-800/50 rounded-full animate-pulse opacity-25 animation-delay-2000"></div>
        <div className="absolute top-72 right-16 w-0.5 h-0.5 bg-gray-600/60 rounded-full animate-pulse opacity-15 animation-delay-3000"></div>
        
        {/* Heavy fog effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900/40 via-gray-950/20 to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Back button - fixed for mobile */}
        <div className={`absolute top-4 left-4 md:top-8 md:left-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <Link 
            href="/landing"
            className="flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200 text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back to Village Gates</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        {/* Page title - adjusted spacing for mobile */}
        <div className={`text-center mb-12 md:mb-16 mt-16 md:mt-0 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-100 mb-6 text-flicker tracking-wider" style={{ fontFamily: 'DemonsAndDarlings, serif' }}>
            Choose Your Path
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 font-serif italic max-w-xl">
            Enter the cursed village through your preferred gateway...
          </p>
        </div>

        {/* Play options */}
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl w-full transition-all duration-2000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Web Version */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 backdrop-blur-sm hover:bg-gray-900/70 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-6">🌐</div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">Web Version</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Play directly in your browser. Experience the full atmospheric horror 
                with rich audio and visual effects. No downloads required.
              </p>
              
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Instant Play
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full Audio
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Auto-Save
                  </span>
                </div>
              </div>

              <Link 
                href="/game"
                className="inline-block w-full px-8 py-4 bg-gray-900/80 hover:bg-red-950/30 text-gray-200 font-semibold rounded-lg border border-gray-700/50 hover:border-red-900/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-950/20 backdrop-blur-sm"
              >
                Enter the Village
              </Link>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 backdrop-blur-sm relative">
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-gray-950/80 rounded-lg flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <p className="text-xl font-semibold text-gray-300 mb-2">Coming Soon</p>
                <p className="text-gray-500 text-sm">The spirits are still preparing this path...</p>
              </div>
            </div>

            <div className="text-center opacity-50">
              <div className="text-6xl mb-6">📱</div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">Mobile App</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Download the native mobile app for Android devices. Optimized for 
                touch controls with offline gameplay support.
              </p>
              
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Offline Play
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Touch Controls
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    APK Download
                  </span>
                </div>
              </div>

              <button 
                disabled
                className="inline-block w-full px-8 py-4 bg-gray-800 text-gray-500 font-semibold rounded-lg border border-gray-700 cursor-not-allowed"
              >
                Download APK
              </button>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className={`text-center mt-12 transition-all duration-2000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-500 text-sm max-w-2xl">
            <strong className="text-gray-400">System Requirements:</strong> Modern web browser with JavaScript enabled. 
            Audio support recommended for the full atmospheric experience. 
            Game saves automatically in your browser&apos;s local storage.
          </p>
        </div>

      </div>

      {/* Animated border effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-pulse animation-delay-2000"></div>
      </div>
    </div>
  );
}