/**
 * audio.js — Audio Controller
 * Handles background music with fade-in/fade-out and mute toggle
 */

class AudioController {
  constructor() {
    this.bgMusic = document.getElementById('bg-music');
    this.toggleBtn = document.getElementById('audio-toggle');
    this.isMuted = false;
    this.isPlaying = false;
    this.targetVolume = 0.35;
    this.fadeInterval = null;
    
    this.setupToggle();
  }

  setupToggle() {
    if (!this.toggleBtn) return;
    
    this.toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMute();
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      this.fadeOut(0.3);
      this.toggleBtn.classList.add('muted');
      this.toggleBtn.textContent = '🔇';
    } else {
      this.fadeIn(0.5);
      this.toggleBtn.classList.remove('muted');
      this.toggleBtn.textContent = '🎵';
    }
  }

  async play() {
    if (!this.bgMusic || this.isPlaying) return;
    
    try {
      this.bgMusic.volume = 0;
      await this.bgMusic.play();
      this.isPlaying = true;
      
      if (!this.isMuted) {
        this.fadeIn(1.5);
      }
    } catch (err) {
      console.log('Audio autoplay blocked, will play on next interaction');
      // Try again on next click
      const playOnClick = () => {
        this.bgMusic.play().then(() => {
          this.isPlaying = true;
          if (!this.isMuted) this.fadeIn(1.5);
          document.removeEventListener('click', playOnClick);
        }).catch(() => {});
      };
      document.addEventListener('click', playOnClick);
    }
  }

  fadeIn(duration = 1) {
    if (!this.bgMusic) return;
    
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    
    const steps = 30;
    const stepTime = (duration * 1000) / steps;
    const volumeStep = this.targetVolume / steps;
    let currentStep = 0;
    
    this.fadeInterval = setInterval(() => {
      currentStep++;
      const newVol = Math.min(volumeStep * currentStep, this.targetVolume);
      this.bgMusic.volume = newVol;
      
      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, stepTime);
  }

  fadeOut(duration = 1) {
    if (!this.bgMusic) return;
    
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    
    const startVolume = this.bgMusic.volume;
    const steps = 20;
    const stepTime = (duration * 1000) / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;
    
    this.fadeInterval = setInterval(() => {
      currentStep++;
      const newVol = Math.max(startVolume - volumeStep * currentStep, 0);
      this.bgMusic.volume = newVol;
      
      if (currentStep >= steps) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, stepTime);
  }

  // Adjust volume for emotional intensity
  setMood(mood) {
    if (this.isMuted) return;
    
    const moodVolumes = {
      celebration: 0.45,
      dark: 0.2,
      regret: 0.2,
      hopeful: 0.35,
      warm: 0.35,
      nostalgic: 0.3,
      default: 0.35
    };
    
    this.targetVolume = moodVolumes[mood] || moodVolumes.default;
    
    // Smooth transition to new volume
    if (this.bgMusic && this.isPlaying && !this.isMuted) {
      const currentVol = this.bgMusic.volume;
      const diff = this.targetVolume - currentVol;
      const steps = 15;
      let step = 0;
      
      if (this.fadeInterval) clearInterval(this.fadeInterval);
      
      this.fadeInterval = setInterval(() => {
        step++;
        this.bgMusic.volume = currentVol + (diff * step / steps);
        if (step >= steps) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
      }, 50);
    }
  }

  destroy() {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
    }
  }
}

window.AudioController = AudioController;
