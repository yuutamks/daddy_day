/**
 * effects.js — Particle Systems and Visual Effects
 * Adapted from the reference project's fireworks system
 */

class EffectsEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.activeEffects = new Set();
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // ─── Bokeh Particles (ambient, always running) ───
  startBokeh() {
    if (this.activeEffects.has('bokeh')) return;
    this.activeEffects.add('bokeh');
    
    // Create initial bokeh particles
    for (let i = 0; i < 25; i++) {
      this.particles.push(this.createBokehParticle());
    }
    
    if (!this.animationId) {
      this.animate();
    }
  }

  createBokehParticle() {
    const colors = [
      'rgba(212, 165, 116, ',  // warm amber
      'rgba(244, 208, 63, ',   // gold
      'rgba(232, 201, 164, ',  // cream
      'rgba(139, 111, 71, ',   // wood
    ];
    return {
      type: 'bokeh',
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.3 - 0.1,
      radius: Math.random() * 3 + 1,
      alpha: Math.random() * 0.3 + 0.05,
      maxAlpha: Math.random() * 0.3 + 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01
    };
  }

  // ─── Fireworks (celebration) ───
  startFireworks() {
    if (this.activeEffects.has('fireworks')) return;
    this.activeEffects.add('fireworks');
    
    this.fireworkInterval = setInterval(() => {
      if (this.activeEffects.has('fireworks')) {
        this.createFirework();
      }
    }, 600);
    
    // Initial burst
    this.createFirework();
    setTimeout(() => this.createFirework(), 200);
    
    if (!this.animationId) {
      this.animate();
    }
  }

  createFirework() {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height * 0.4 + this.canvas.height * 0.05;
    const colors = [
      '#D4A574', '#F4D03F', '#e8c170', '#f7dc6f',
      '#ff9f43', '#ee5a24', '#f8c291', '#fab1a0'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = Math.floor(Math.random() * 20) + 20;
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
      const speed = Math.random() * 3 + 1.5;
      this.particles.push({
        type: 'firework',
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: color,
        radius: Math.random() * 2.5 + 1,
        decay: Math.random() * 0.015 + 0.008,
        gravity: 0.03
      });
    }
  }

  stopFireworks() {
    this.activeEffects.delete('fireworks');
    if (this.fireworkInterval) {
      clearInterval(this.fireworkInterval);
      this.fireworkInterval = null;
    }
  }

  // ─── Stars (hope scenes) ───
  startStars() {
    if (this.activeEffects.has('stars')) return;
    this.activeEffects.add('stars');
    
    for (let i = 0; i < 15; i++) {
      this.particles.push(this.createStarParticle());
    }
    
    this.starInterval = setInterval(() => {
      if (this.activeEffects.has('stars') && this.particles.filter(p => p.type === 'star').length < 20) {
        this.particles.push(this.createStarParticle());
      }
    }, 800);
    
    if (!this.animationId) {
      this.animate();
    }
  }

  createStarParticle() {
    return {
      type: 'star',
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height * 0.6,
      alpha: 0,
      maxAlpha: Math.random() * 0.6 + 0.3,
      radius: Math.random() * 2 + 0.5,
      phase: 0,
      phaseSpeed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.5 ? '#F4D03F' : '#D4A574'
    };
  }

  stopStars() {
    this.activeEffects.delete('stars');
    if (this.starInterval) {
      clearInterval(this.starInterval);
      this.starInterval = null;
    }
  }

  // ─── Emotion Burst (when a choice is made) ───
  createEmotionBurst(mood) {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height * 0.7;
    const moodColors = {
      grateful: '#D4A574',
      sad: '#7a8ba8',
      love: '#F4D03F',
      determined: '#c7955a',
      forgiving: '#88b07a',
      proud: '#e8c170',
      wise: '#8b7a9e',
      compassionate: '#e8a87c',
      accepting: '#88b07a',
      hurt: '#7a8ba8',
      resilient: '#c7955a',
      independent: '#D4A574',
      bittersweet: '#a890b0',
      reflective: '#8eaec0',
      gratitude: '#F4D03F',
      default: '#D4A574'
    };
    
    const color = moodColors[mood] || moodColors.default;
    
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.5 + 0.5;
      this.particles.push({
        type: 'emotion',
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        alpha: 0.8,
        color: color,
        radius: Math.random() * 3 + 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }
  }

  // ─── Animation Loop ───
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      switch (p.type) {
        case 'bokeh':
          this.updateBokeh(p, i);
          break;
        case 'firework':
          this.updateFirework(p, i);
          break;
        case 'star':
          this.updateStar(p, i);
          break;
        case 'emotion':
          this.updateEmotion(p, i);
          break;
      }
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateBokeh(p, i) {
    p.x += p.vx;
    p.y += p.vy;
    p.pulse += p.pulseSpeed;
    
    const currentAlpha = p.maxAlpha * (0.5 + 0.5 * Math.sin(p.pulse));
    
    // Wrap around screen
    if (p.y < -10) p.y = this.canvas.height + 10;
    if (p.x < -10) p.x = this.canvas.width + 10;
    if (p.x > this.canvas.width + 10) p.x = -10;
    
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color + currentAlpha + ')';
    this.ctx.fill();
    
    // Soft glow
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color + (currentAlpha * 0.15) + ')';
    this.ctx.fill();
  }

  updateFirework(p, i) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.alpha -= p.decay;
    
    if (p.alpha <= 0) {
      this.particles.splice(i, 1);
      return;
    }
    
    this.ctx.globalAlpha = p.alpha;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color;
    this.ctx.fill();
    
    // Trail
    this.ctx.beginPath();
    this.ctx.arc(p.x - p.vx, p.y - p.vy, p.radius * 0.6, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color;
    this.ctx.globalAlpha = p.alpha * 0.4;
    this.ctx.fill();
    
    this.ctx.globalAlpha = 1;
  }

  updateStar(p, i) {
    p.phase += p.phaseSpeed;
    p.alpha = p.maxAlpha * (0.3 + 0.7 * Math.abs(Math.sin(p.phase)));
    
    if (!this.activeEffects.has('stars') && p.alpha < 0.05) {
      this.particles.splice(i, 1);
      return;
    }
    
    // Draw 4-pointed star
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.globalAlpha = p.alpha;
    
    // Core
    this.ctx.beginPath();
    this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color;
    this.ctx.fill();
    
    // Cross flare
    this.ctx.strokeStyle = p.color;
    this.ctx.lineWidth = 0.5;
    this.ctx.globalAlpha = p.alpha * 0.5;
    const flareLen = p.radius * 4;
    this.ctx.beginPath();
    this.ctx.moveTo(-flareLen, 0);
    this.ctx.lineTo(flareLen, 0);
    this.ctx.moveTo(0, -flareLen);
    this.ctx.lineTo(0, flareLen);
    this.ctx.stroke();
    
    this.ctx.globalAlpha = 1;
    this.ctx.restore();
  }

  updateEmotion(p, i) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy -= 0.01;
    p.alpha -= p.decay;
    
    if (p.alpha <= 0) {
      this.particles.splice(i, 1);
      return;
    }
    
    this.ctx.globalAlpha = p.alpha;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }

  // ─── Clear all effects ───
  clearAll() {
    this.stopFireworks();
    this.stopStars();
    this.particles = this.particles.filter(p => p.type === 'bokeh');
  }

  // Set effect for scene
  setSceneEffect(effect) {
    if (effect === 'fireworks') {
      this.stopStars();
      this.startFireworks();
    } else if (effect === 'stars') {
      this.stopFireworks();
      this.startStars();
    } else {
      this.clearAll();
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.stopFireworks();
    this.stopStars();
    this.particles = [];
  }
}

window.EffectsEngine = EffectsEngine;
