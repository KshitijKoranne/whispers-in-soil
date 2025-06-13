'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing page
    router.replace('/landing');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-100 mb-4 text-flicker" style={{ fontFamily: 'DemonsAndDarlings, serif' }}>
          Whispers in the Soil
        </div>
        <div className="text-gray-400">Entering the village...</div>
      </div>
    </div>
  );
}
