/**
 * engine.js — Visual Novel Engine
 * Core engine: typewriter text, scene management, choices, transitions
 */

class VisualNovelEngine {
  constructor() {
    // DOM elements
    this.app = document.getElementById('vn-app');
    this.titleScreen = document.getElementById('title-screen');
    this.startButton = document.getElementById('start-button');
    this.bgLayer = document.getElementById('bg-layer');
    this.bgImageA = document.getElementById('bg-image-a');
    this.bgImageB = document.getElementById('bg-image-b');
    this.moodGlow = document.getElementById('mood-glow');
    this.photoContainer = document.getElementById('photo-container');
    this.scenePhoto = document.getElementById('scene-photo');
    this.photoCaption = document.getElementById('photo-caption');
    this.dialogBox = document.getElementById('dialog-box');
    this.narratorName = document.getElementById('narrator-name');
    this.dialogText = document.getElementById('dialog-text');
    this.clickIndicator = document.getElementById('click-indicator');
    this.choicesContainer = document.getElementById('choices-container');
    this.chapterCard = document.getElementById('chapter-card');
    this.chapterCardTitle = document.getElementById('chapter-card-title');
    this.chapterCardSubtitle = document.getElementById('chapter-card-subtitle');
    this.chapterInfo = document.getElementById('chapter-info');
    this.progressFill = document.getElementById('progress-fill');
    this.finalOverlay = document.getElementById('final-overlay');
    this.loadingScreen = document.getElementById('loading-screen');

    // State
    this.storyData = window.STORY_DATA;
    this.currentChapter = 0;
    this.currentScene = 0;
    this.isTyping = false;
    this.typewriterTimeout = null;
    this.charIndex = 0;
    this.currentText = '';
    this.dynamicVariant = null;
    this.pendingChoices = null;  // Choices waiting to be shown after a click
    this.activeBg = 'a'; // which bg image is active
    this.isTransitioning = false;
    this.hasStarted = false;
    this.totalScenes = 0;
    this.completedScenes = 0;

    // Systems
    this.effects = new EffectsEngine('effects-canvas');
    this.audio = new AudioController();

    // Count total scenes for progress
    this.storyData.chapters.forEach(ch => {
      this.totalScenes += ch.scenes.length;
    });

    // Bind events
    this.setupEvents();
    
    // Preload first chapter backgrounds
    this.preloadChapter(0);
  }

  // ─── Event Setup ───
  setupEvents() {
    // Start button
    this.startButton.addEventListener('click', () => this.start());

    // Click to advance (on dialog box and app)
    this.app.addEventListener('click', (e) => {
      if (!this.hasStarted) return;
      
      // Don't advance if clicking on buttons or controls
      if (e.target.closest('#audio-toggle') || 
          e.target.closest('.choice-btn') ||
          e.target.closest('#start-button') ||
          e.target.closest('.final-restart')) {
        return;
      }

      this.handleClick(e);
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!this.hasStarted && this.titleScreen && !this.titleScreen.classList.contains('hidden')) {
          this.start();
        } else {
          this.handleClick();
        }
      }
    });

    // Touch support
    this.app.addEventListener('touchend', (e) => {
      if (!this.hasStarted) return;
      if (e.target.closest('#audio-toggle') || 
          e.target.closest('.choice-btn') ||
          e.target.closest('#start-button') ||
          e.target.closest('.final-restart')) {
        return;
      }
      // Prevent double-fire
      e.preventDefault();
    });
  }

  // ─── Start the Novel ───
  async start() {
    this.hasStarted = true;
    this.titleScreen.classList.add('hidden');
    
    // Start audio
    await this.audio.play();
    
    // Start ambient particles
    this.effects.startBokeh();
    
    // Begin first chapter
    setTimeout(() => {
      this.loadingScreen.classList.add('hidden');
      this.playScene();
    }, 500);
  }

  // ─── Handle Click / Advance ───
  handleClick(e) {
    if (this.isTransitioning) return;

    // If chapter card is visible, dismiss it
    if (this.chapterCard.classList.contains('visible')) {
      this.dismissChapterCard();
      return;
    }

    // If choices are visible, don't advance
    if (this.choicesContainer.classList.contains('visible')) {
      return;
    }

    // If typing, complete the text instantly
    if (this.isTyping) {
      this.completeText();
      return;
    }

    // Add click ripple
    if (e) {
      this.createClickRipple(e.clientX, e.clientY);
    }

    // If there are pending choices, show them now instead of advancing
    if (this.pendingChoices) {
      const choices = this.pendingChoices;
      this.pendingChoices = null;
      this.clickIndicator.classList.remove('visible');
      this.showChoices(choices);
      return;
    }

    // Advance to next scene
    this.nextScene();
  }

  // ─── Play Current Scene ───
  playScene() {
    const chapter = this.storyData.chapters[this.currentChapter];
    if (!chapter) {
      this.showFinalScreen();
      return;
    }

    const scene = chapter.scenes[this.currentScene];
    if (!scene) {
      // Move to next chapter
      this.currentChapter++;
      this.currentScene = 0;
      this.preloadChapter(this.currentChapter);
      this.playScene();
      return;
    }

    // Update progress
    this.updateProgress();

    // Update chapter info
    this.chapterInfo.textContent = `${chapter.title}`;

    // Is this a chapter card?
    if (scene.isChapterCard) {
      this.showChapterCard(scene);
      return;
    }

    // Is this the final scene?
    if (scene.isFinalScene) {
      this.showFinalScene(scene);
      return;
    }

    // Set background
    this.setBackground(scene.background);

    // Set mood
    this.setMood(scene.mood);
    this.audio.setMood(scene.mood);

    // Set effect
    if (scene.effect) {
      this.effects.setSceneEffect(scene.effect);
    } else {
      this.effects.clearAll();
    }

    // Handle photo
    if (scene.photo) {
      this.showPhoto(scene.photo, scene.photoCaption);
    } else {
      this.hidePhoto();
    }

    // Handle dialog
    this.showDialog(scene);
  }

  // ─── Background Management ───
  setBackground(src) {
    if (!src) return;
    
    const currentBg = this.activeBg === 'a' ? this.bgImageA : this.bgImageB;
    const nextBg = this.activeBg === 'a' ? this.bgImageB : this.bgImageA;
    
    // Check if same background
    if (currentBg.src && currentBg.src.endsWith(src.split('/').pop())) {
      return;
    }
    
    nextBg.src = src;
    nextBg.classList.remove('inactive');
    nextBg.classList.add('active');
    nextBg.classList.add('bg-zoom-in');
    
    currentBg.classList.remove('active');
    currentBg.classList.add('inactive');
    
    // Clean up old zoom after transition
    setTimeout(() => {
      currentBg.classList.remove('bg-zoom-in');
    }, 1200);
    
    this.activeBg = this.activeBg === 'a' ? 'b' : 'a';
  }

  // ─── Mood Glow ───
  setMood(mood) {
    // Remove all mood classes
    this.moodGlow.className = 'mood-glow active';
    if (mood) {
      this.moodGlow.classList.add(mood);
    }
  }

  // ─── Photo Management ───
  showPhoto(src, caption) {
    if (this.scenePhoto.src && this.scenePhoto.src.endsWith(src.split('/').pop())) {
      // Same photo, already showing
      if (!this.photoContainer.classList.contains('visible')) {
        this.photoContainer.classList.add('visible');
      }
      return;
    }
    
    // Fade out first if showing
    if (this.photoContainer.classList.contains('visible')) {
      this.photoContainer.classList.remove('visible');
      setTimeout(() => {
        this.scenePhoto.src = src;
        this.photoCaption.textContent = caption || '';
        this.photoContainer.classList.add('visible');
      }, 500);
    } else {
      this.scenePhoto.src = src;
      this.photoCaption.textContent = caption || '';
      setTimeout(() => {
        this.photoContainer.classList.add('visible');
      }, 300);
    }
  }

  hidePhoto() {
    this.photoContainer.classList.remove('visible');
  }

  // ─── Dialog / Typewriter ───
  showDialog(scene) {
    this.dialogBox.classList.remove('hidden');
    this.clickIndicator.classList.remove('visible');
    
    // Set narrator
    this.narratorName.textContent = scene.narrator || '';
    
    // Determine text
    let text;
    if (scene.isDynamic && this.dynamicVariant) {
      text = this.dynamicVariant;
      this.dynamicVariant = null;
    } else if (scene.isDynamic) {
      text = scene.defaultText;
    } else {
      text = scene.text;
    }
    
    if (!text) {
      this.nextScene();
      return;
    }
    
    // Start typewriter
    this.startTypewriter(text, scene);
  }

  startTypewriter(text, scene) {
    this.currentText = text;
    this.isTyping = true;
    this.charIndex = 0;
    this.dialogText.innerHTML = '';
    
    // Create character spans
    const chars = text.split('');
    const fragment = document.createDocumentFragment();
    
    chars.forEach((char) => {
      if (char === ' ') {
        fragment.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        fragment.appendChild(span);
      }
    });
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.id = 'typewriter-cursor';
    fragment.appendChild(cursor);
    
    this.dialogText.appendChild(fragment);
    
    // Get all char spans
    const charSpans = this.dialogText.querySelectorAll('.char');
    
    // Animate characters
    this.typewriterAnimate(charSpans, 0, scene);
  }

  typewriterAnimate(charSpans, index, scene) {
    if (index >= charSpans.length) {
      this.isTyping = false;
      this.onTypewriterComplete(scene);
      return;
    }
    
    charSpans[index].classList.add('visible');
    this.charIndex = index;
    
    // Variable speed for natural feel
    const char = charSpans[index].textContent;
    let delay = 32;
    if (char === '.' || char === '…') delay = 280;
    else if (char === ',') delay = 140;
    else if (char === '!' || char === '?') delay = 200;
    else if (char === ':') delay = 180;
    
    this.typewriterTimeout = setTimeout(() => {
      this.typewriterAnimate(charSpans, index + 1, scene);
    }, delay);
  }

  completeText() {
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
    }
    
    // Show all chars
    const charSpans = this.dialogText.querySelectorAll('.char');
    charSpans.forEach(span => span.classList.add('visible'));
    
    this.isTyping = false;
    
    // Get current scene for completion callback
    const chapter = this.storyData.chapters[this.currentChapter];
    const scene = chapter?.scenes[this.currentScene];
    if (scene) {
      this.onTypewriterComplete(scene);
    }
  }

  onTypewriterComplete(scene) {
    // Remove cursor
    const cursor = document.getElementById('typewriter-cursor');
    if (cursor) cursor.remove();
    
    // Always show click indicator first so the reader can absorb the text.
    // If the scene has choices, store them as pending — they'll appear on the next click.
    if (scene.choices && scene.choices.length > 0) {
      this.pendingChoices = scene.choices;
    }
    this.clickIndicator.classList.add('visible');
  }

  // ─── Choices System ───
  showChoices(choices) {
    this.dialogBox.classList.add('hidden');
    this.choicesContainer.innerHTML = '';
    
    // Add prompt
    const prompt = document.createElement('div');
    prompt.className = 'choice-prompt';
    prompt.textContent = '¿Qué sientes?';
    this.choicesContainer.appendChild(prompt);
    
    // Add buttons
    choices.forEach((choice, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn animate-in';
      btn.textContent = choice.text;
      btn.style.animationDelay = `${0.1 + i * 0.15}s`;
      
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectChoice(choice, btn);
      });
      
      this.choicesContainer.appendChild(btn);
    });
    
    this.choicesContainer.classList.add('visible');
  }

  selectChoice(choice, btn) {
    // Visual feedback
    btn.classList.add('selected');
    
    // Emotion burst
    this.effects.createEmotionBurst(choice.mood);
    
    // Create emotion wave in DOM
    const wave = document.createElement('div');
    wave.className = `emotion-wave ${choice.mood}`;
    this.app.appendChild(wave);
    setTimeout(() => wave.remove(), 1500);
    
    // Store dynamic variant for next scene
    if (choice.nextVariant) {
      this.dynamicVariant = choice.nextVariant;
    }
    
    // Fade out choices after delay
    setTimeout(() => {
      this.choicesContainer.classList.remove('visible');
      
      setTimeout(() => {
        this.choicesContainer.innerHTML = '';
        this.nextScene();
      }, 400);
    }, 600);
  }

  // ─── Chapter Card ───
  showChapterCard(scene) {
    // Set background first
    this.setBackground(scene.background);
    
    // Set effect if any
    if (scene.effect) {
      this.effects.setSceneEffect(scene.effect);
    }
    
    // Hide dialog
    this.dialogBox.classList.add('hidden');
    this.hidePhoto();
    
    // Show card
    this.chapterCardTitle.textContent = scene.chapterTitle;
    this.chapterCardSubtitle.textContent = scene.chapterSubtitle;
    
    this.chapterCard.classList.add('visible');
    this.isTransitioning = true;
    
    // Allow dismissal after animation
    setTimeout(() => {
      this.isTransitioning = false;
    }, 2000);
  }

  dismissChapterCard() {
    this.chapterCard.classList.remove('visible');
    this.isTransitioning = true;
    
    setTimeout(() => {
      this.isTransitioning = false;
      this.nextScene();
    }, 800);
  }

  // ─── Final Scene ───
  showFinalScene(scene) {
    this.setBackground(scene.background);
    this.effects.setSceneEffect('fireworks');
    this.dialogBox.classList.add('hidden');
    this.hidePhoto();
    
    // Build final overlay content
    this.finalOverlay.innerHTML = `
      <div class="final-emoji">${scene.finalEmoji || '🎉'}</div>
      <div class="final-title">${scene.text}</div>
      <div class="final-subtext">${scene.finalSubtext || ''}</div>
      <button class="final-restart" id="restart-btn">Volver a leer ↺</button>
    `;
    
    this.finalOverlay.classList.add('visible');
    
    // Restart button
    document.getElementById('restart-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.restart();
    });
  }

  showFinalScreen() {
    // Fallback if we run past all chapters
    this.showFinalScene({
      text: 'Feliz Día del Padre',
      finalEmoji: '🎉💛👨‍👦',
      finalSubtext: 'Con todo mi cariño, respeto y admiración.',
      background: 'assets/backgrounds/ch8_celebracion.png'
    });
  }

  // ─── Navigation ───
  nextScene() {
    this.currentScene++;
    this.completedScenes++;
    this.playScene();
  }

  updateProgress() {
    const progress = (this.completedScenes / this.totalScenes) * 100;
    this.progressFill.style.width = `${Math.min(progress, 100)}%`;
  }

  // ─── Preload ───
  preloadChapter(chapterIndex) {
    const chapter = this.storyData.chapters[chapterIndex];
    if (!chapter) return;
    
    const images = new Set();
    chapter.scenes.forEach(scene => {
      if (scene.background) images.add(scene.background);
      if (scene.photo) images.add(scene.photo);
    });
    
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  // ─── Restart ───
  restart() {
    this.currentChapter = 0;
    this.currentScene = 0;
    this.completedScenes = 0;
    this.dynamicVariant = null;
    this.isTyping = false;
    this.isTransitioning = false;
    
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
    
    this.finalOverlay.classList.remove('visible');
    this.choicesContainer.classList.remove('visible');
    this.chapterCard.classList.remove('visible');
    this.choicesContainer.innerHTML = '';
    
    this.effects.clearAll();
    
    setTimeout(() => {
      this.playScene();
    }, 500);
  }

  // ─── Click Ripple ───
  createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    this.app.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
}

// ─── Initialize on DOM Ready ───
document.addEventListener('DOMContentLoaded', () => {
  // Simulate loading
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
    
    // Initialize engine
    window.vnEngine = new VisualNovelEngine();
  }, 800);
});
