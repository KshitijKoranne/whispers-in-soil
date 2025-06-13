import { useCallback, useEffect, useState } from 'react';
import { soundManager, initializeSounds } from '@/utils/SoundManager';

export function useSound() {
  const [isEnabled, setIsEnabledState] = useState(soundManager.getEnabled());
  const [volume, setVolumeState] = useState(soundManager.getMasterVolume());

  useEffect(() => {
    // Initialize sounds on mount
    initializeSounds().catch(console.warn);
  }, []);

  const playClick = useCallback(() => {
    soundManager.playSound('click', { volume: 0.8 });
  }, []);

  const playHover = useCallback(() => {
    soundManager.playSound('hover', { volume: 0.4 });
  }, []);

  const playAction = useCallback((action: string) => {
    switch (action) {
      case 'dig':
        soundManager.playSound('dig', { volume: 0.6 });
        break;
      case 'burn':
        soundManager.playSound('burn', { volume: 0.7 });
        break;
      case 'ritual':
        soundManager.playSound('ritual', { volume: 0.5 });
        break;
      case 'forage':
        soundManager.playSound('forage', { volume: 0.6 });
        break;
    }
  }, []);

  const playAmbient = useCallback((phase: 'day' | 'night') => {
    const soundName = phase === 'night' ? 'nightAmbient' : 'dayAmbient';
    soundManager.playAmbient(soundName, { volume: 0.5 });
  }, []);

  const stopAmbient = useCallback(() => {
    soundManager.stopAmbient();
  }, []);

  const playSpiritEncounter = useCallback(() => {
    soundManager.playSound('spiritEncounter', { volume: 0.6 });
  }, []);

  const playGameOver = useCallback(() => {
    soundManager.playSound('gameOver', { volume: 0.8 });
  }, []);

  const playIntroMusic = useCallback(() => {
    soundManager.playMusic('introMusic', { volume: 0.7, loop: false });
  }, []);

  const stopIntroMusic = useCallback(() => {
    soundManager.stopMusic();
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    soundManager.setEnabled(enabled);
    setIsEnabledState(enabled);
  }, []);

  const setVolume = useCallback((volume: number) => {
    soundManager.setMasterVolume(volume);
    setVolumeState(volume);
  }, []);

  return {
    playClick,
    playHover,
    playAction,
    playAmbient,
    stopAmbient,
    playSpiritEncounter,
    playGameOver,
    playIntroMusic,
    stopIntroMusic,
    setEnabled,
    setVolume,
    isEnabled,
    volume,
  };
}