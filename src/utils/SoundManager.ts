export type SoundType = 
  | 'ambient' 
  | 'click' 
  | 'hover' 
  | 'spirit' 
  | 'action' 
  | 'notification';

interface SoundConfig {
  volume?: number;
  loop?: boolean;
  fade?: boolean;
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private currentAmbient: HTMLAudioElement | null = null;
  private enabled: boolean = true;
  private masterVolume: number = 0.7;
  private userHasInteracted: boolean = false;
  private pendingAmbient: { name: string; config: SoundConfig } | null = null;
  private lastAmbientName: string | null = null;
  private currentMusic: HTMLAudioElement | null = null;

  constructor() {
    // Initialize audio context on user interaction
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.initAudioContext.bind(this), { once: true });
      document.addEventListener('keydown', this.initAudioContext.bind(this), { once: true });
      document.addEventListener('touchstart', this.initAudioContext.bind(this), { once: true });
    }
  }

  public initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.userHasInteracted = true;
      console.log('Audio context initialized, user interaction detected');
      
      // Play pending ambient sound if any
      if (this.pendingAmbient) {
        console.log('Playing pending ambient sound:', this.pendingAmbient.name);
        this.playAmbient(this.pendingAmbient.name, this.pendingAmbient.config);
        this.pendingAmbient = null;
      }
    }
  }

  async preloadSound(name: string, path: string): Promise<void> {
    if (this.sounds.has(name)) return;

    try {
      const audio = new Audio(path);
      audio.preload = 'auto';
      
      return new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', () => {
          this.sounds.set(name, audio);
          resolve();
        });
        audio.addEventListener('error', (error) => {
          console.warn(`Failed to preload sound: ${name} from ${path}`, error);
          reject(error);
        });
      });
    } catch (error) {
      console.warn(`Failed to preload sound: ${name}`, error);
    }
  }

  playSound(name: string, config: SoundConfig = {}): void {
    if (!this.enabled) return;

    const audio = this.sounds.get(name);
    if (!audio) return;

    try {
      // Clone audio for overlapping sounds
      const audioClone = audio.cloneNode() as HTMLAudioElement;
      audioClone.volume = (config.volume ?? 1) * this.masterVolume;
      audioClone.loop = config.loop ?? false;

      audioClone.play().catch(error => {
        console.warn(`Failed to play sound: ${name}`, error);
      });

      // Clean up non-looping sounds
      if (!audioClone.loop) {
        audioClone.addEventListener('ended', () => {
          audioClone.remove();
        });
      }
    } catch (error) {
      console.warn(`Error playing sound: ${name}`, error);
    }
  }

  playAmbient(name: string, config: SoundConfig = {}): void {
    console.log(`playAmbient called: ${name}, enabled: ${this.enabled}, userHasInteracted: ${this.userHasInteracted}`);
    if (!this.enabled) return;
    if (!this.userHasInteracted) {
      console.log('Ambient sound blocked - saving for after user interaction');
      this.pendingAmbient = { name, config };
      return;
    }

    // Stop current ambient
    this.stopAmbient();

    const audio = this.sounds.get(name);
    if (!audio) {
      console.warn(`Ambient sound not found: ${name}. Available sounds:`, Array.from(this.sounds.keys()));
      return;
    }

    try {
      console.log(`Playing ambient sound: ${name}`);
      this.currentAmbient = audio.cloneNode() as HTMLAudioElement;
      this.currentAmbient.volume = (config.volume ?? 0.3) * this.masterVolume;
      this.currentAmbient.loop = true;
      this.lastAmbientName = name; // Remember the last ambient sound

      console.log(`Ambient volume set to: ${this.currentAmbient.volume}`);

      this.currentAmbient.play().catch(error => {
        console.warn(`Failed to play ambient sound: ${name}`, error);
      });
    } catch (error) {
      console.warn(`Error playing ambient sound: ${name}`, error);
    }
  }

  stopAmbient(): void {
    if (this.currentAmbient) {
      this.currentAmbient.pause();
      this.currentAmbient.currentTime = 0;
      this.currentAmbient = null;
    }
  }

  playMusic(name: string, config: SoundConfig = {}): void {
    console.log(`playMusic called: ${name}, enabled: ${this.enabled}, userHasInteracted: ${this.userHasInteracted}`);
    if (!this.enabled) return;
    if (!this.userHasInteracted) {
      console.log('Music blocked - saving for after user interaction');
      this.pendingAmbient = { name, config }; // Reuse pending mechanism
      return;
    }

    // Stop current music
    this.stopMusic();

    const audio = this.sounds.get(name);
    if (!audio) {
      console.warn(`Music not found: ${name}. Available sounds:`, Array.from(this.sounds.keys()));
      return;
    }

    try {
      console.log(`Playing music: ${name}`);
      this.currentMusic = audio.cloneNode() as HTMLAudioElement;
      this.currentMusic.volume = (config.volume ?? 0.6) * this.masterVolume;
      this.currentMusic.loop = config.loop ?? false;

      this.currentMusic.play().catch(error => {
        console.warn(`Failed to play music: ${name}`, error);
      });
    } catch (error) {
      console.warn(`Error playing music: ${name}`, error);
    }
  }

  stopMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
      this.currentMusic = null;
    }
  }

  setEnabled(enabled: boolean): void {
    const wasEnabled = this.enabled;
    this.enabled = enabled;
    
    if (!enabled) {
      this.stopAmbient();
      this.stopMusic();
    } else if (!wasEnabled && enabled && this.userHasInteracted && this.lastAmbientName) {
      // Re-enable: restart the last ambient sound
      console.log(`Re-enabling sounds, restarting ambient: ${this.lastAmbientName}`);
      this.playAmbient(this.lastAmbientName, { volume: 0.5 });
    }
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.currentAmbient) {
      this.currentAmbient.volume = 0.3 * this.masterVolume;
    }
    if (this.currentMusic) {
      this.currentMusic.volume = 0.6 * this.masterVolume;
    }
  }

  getEnabled(): boolean {
    return this.enabled;
  }

  getMasterVolume(): number {
    return this.masterVolume;
  }
}

// Singleton instance
export const soundManager = new SoundManager();

// Sound configuration
export const SOUNDS = {
  // UI Sounds
  click: '/sounds/click.mp3',
  hover: '/sounds/hover.mp3',
  
  // Game Actions
  dig: '/sounds/dig.mp3',
  burn: '/sounds/burn.mp3',
  ritual: '/sounds/ritual.mp3',
  forage: '/sounds/forage.mp3',
  
  // Ambient
  nightAmbient: '/sounds/night.mp3',
  dayAmbient: '/sounds/day-ambient.mp3',
  
  // Events
  spiritEncounter: '/sounds/spirit-whispers.mp3',
  whisper: '/sounds/whisper.mp3',
  gameOver: '/sounds/game-over.mp3',
  
  // Music
  introMusic: '/sounds/intro-music.mp3',
} as const;

// Preload all sounds
export async function initializeSounds(): Promise<void> {
  const loadPromises = Object.entries(SOUNDS).map(([name, path]) =>
    soundManager.preloadSound(name, path)
  );
  
  await Promise.allSettled(loadPromises);
}