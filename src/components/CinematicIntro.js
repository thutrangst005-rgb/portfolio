/**
 * THE ODYSSEY - CINEMATIC INTRO EXPERIENCE
 * 20-30 Second Skinnable Skyship Opening Voyage
 * 5 Narrative Scenes + Celestial Ocean Route Animation + Skimmable Controls
 * YouTube Background Music Integration via IntroMusicPlayer
 */

import { IntroMusicPlayer } from './IntroMusicPlayer.js';

export class CinematicIntro {
  constructor(options = {}) {
    this.container = document.getElementById('cinematic-intro-overlay');
    this.canvas = document.getElementById('intro-ocean-canvas');
    this.progressBar = document.getElementById('intro-progress-bar-fill');
    this.progressLabel = document.getElementById('intro-progress-label');
    this.skipBtn = document.getElementById('intro-skip-btn');
    this.beginBtn = document.getElementById('intro-begin-btn');
    this.finalEnterBtn = document.getElementById('intro-final-enter-btn');
    this.soundToggleBtn = document.getElementById('intro-sound-toggle-btn');
    this.soundText = document.getElementById('intro-sound-text');
    this.soundIcon = document.getElementById('intro-sound-icon');
    this.onComplete = options.onComplete || (() => {});
    
    this.scenes = [
      document.getElementById('intro-scene-1'),
      document.getElementById('intro-scene-2'),
      document.getElementById('intro-scene-3'),
      document.getElementById('intro-scene-4'),
      document.getElementById('intro-scene-5'),
      document.getElementById('intro-scene-final')
    ];

    this.duration = 24000; // 24 seconds total
    this.startTime = null;
    this.currentSceneIdx = 0;
    this.isJourneyStarted = false;
    this.isCompleted = false;
    this.animId = null;

    // Ocean Route Drawing state
    this.routeProgress = 0; // 0 to 1
    this.horizonOpacity = 0;

    // Initialize YouTube Music Player
    this.musicPlayer = new IntroMusicPlayer({
      onStateChange: (isEnabled) => this.updateSoundUI(isEnabled)
    });
    
    this.initCanvas();
    this.bindEvents();
    this.preparePrologue();
  }

  initCanvas() {
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  preparePrologue() {
    this.showScene(0);
    if (this.progressLabel) {
      this.progressLabel.textContent = 'EXPEDITION INITIALIZATION // READY';
    }
    if (this.progressBar) {
      this.progressBar.style.width = '0%';
    }
  }

  bindEvents() {
    if (this.beginBtn) {
      this.beginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.startJourney();
      });
    }

    if (this.finalEnterBtn) {
      this.finalEnterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.finish();
      });
    }

    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.skip();
      });
    }

    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.musicPlayer.toggleSound();
      });
    }

    // Keyboard support (Escape or Space to skip)
    window.addEventListener('keydown', (e) => {
      if (!this.isCompleted && (e.key === 'Escape' || (e.key === ' ' && this.isJourneyStarted))) {
        this.skip();
      }
    });
  }

  updateSoundUI(isEnabled) {
    if (!this.soundToggleBtn) return;
    if (isEnabled) {
      this.soundToggleBtn.classList.remove('sound-off');
      if (this.soundText) this.soundText.textContent = 'SOUND ON';
      if (this.soundIcon) this.soundIcon.textContent = '♪';
      this.soundToggleBtn.setAttribute('title', 'Sound: Music On (Click to turn off)');
    } else {
      this.soundToggleBtn.classList.add('sound-off');
      if (this.soundText) this.soundText.textContent = 'SOUND OFF';
      if (this.soundIcon) this.soundIcon.textContent = '✕';
      this.soundToggleBtn.setAttribute('title', 'Sound: Music Muted/Paused (Click to turn on)');
    }
  }

  startJourney() {
    if (this.isJourneyStarted || this.isCompleted) return;
    this.isJourneyStarted = true;

    // Start background soundtrack via YouTube IFrame API
    this.musicPlayer.startJourney();

    // Smoothly hide the initial begin button
    if (this.beginBtn) {
      this.beginBtn.style.opacity = '0';
      this.beginBtn.style.pointerEvents = 'none';
      setTimeout(() => {
        this.beginBtn.style.display = 'none';
      }, 400);
    }

    this.startTime = performance.now();
    this.loop = this.loop.bind(this);
    this.animId = requestAnimationFrame(this.loop);
  }

  showScene(index) {
    this.scenes.forEach((scene, i) => {
      if (!scene) return;
      if (i === index) {
        scene.classList.add('active');
      } else {
        scene.classList.remove('active');
      }
    });
    this.currentSceneIdx = index;
  }

  loop(now) {
    if (this.isCompleted) return;

    const elapsed = now - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);

    // Update progress bar
    if (this.progressBar) {
      this.progressBar.style.width = `${progress * 100}%`;
    }
    if (this.progressLabel) {
      const pct = Math.floor(progress * 100);
      this.progressLabel.textContent = `EXPEDITION INITIALIZATION // ${pct}%`;
    }

    // Scene timeline transitions (24s / ~4s each)
    if (elapsed < 3800) {
      if (this.currentSceneIdx !== 0) this.showScene(0);
    } else if (elapsed < 8200) {
      if (this.currentSceneIdx !== 1) this.showScene(1);
      // Ocean horizon & route start appearing
      this.horizonOpacity = Math.min((elapsed - 3800) / 2000, 1);
      this.routeProgress = Math.min((elapsed - 3800) / 4400, 1);
    } else if (elapsed < 12800) {
      if (this.currentSceneIdx !== 2) this.showScene(2);
      this.routeProgress = Math.min((elapsed - 3800) / 10000, 1);
    } else if (elapsed < 16800) {
      if (this.currentSceneIdx !== 3) this.showScene(3);
    } else if (elapsed < 20800) {
      if (this.currentSceneIdx !== 4) this.showScene(4);
    } else {
      if (this.currentSceneIdx !== 5) this.showScene(5);
    }

    this.renderOceanRoute();

    if (progress >= 1) {
      // Auto finish after a brief moment on the final prompt
      setTimeout(() => {
        if (!this.isCompleted) this.finish();
      }, 1500);
      return;
    }

    this.animId = requestAnimationFrame(this.loop);
  }

  renderOceanRoute() {
    if (!this.ctx || !this.width) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.horizonOpacity <= 0.01) return;

    const horizonY = this.height * 0.72;

    // Ocean Gradient Glow
    const gradient = this.ctx.createLinearGradient(0, horizonY - 100, 0, this.height);
    gradient.addColorStop(0, `rgba(14, 36, 48, ${0.4 * this.horizonOpacity})`);
    gradient.addColorStop(0.5, `rgba(7, 19, 28, ${0.85 * this.horizonOpacity})`);
    gradient.addColorStop(1, `rgba(4, 10, 16, ${1.0 * this.horizonOpacity})`);

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, horizonY - 40, this.width, this.height - horizonY + 40);

    // Subtle horizon line with gold glow
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(184, 155, 94, ${0.6 * this.horizonOpacity})`;
    this.ctx.lineWidth = 1.2;
    this.ctx.moveTo(0, horizonY);
    this.ctx.lineTo(this.width, horizonY);
    this.ctx.stroke();

    // Gentle wave undulations
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(111, 135, 144, ${0.25 * this.horizonOpacity})`;
    this.ctx.lineWidth = 1;
    const time = performance.now() * 0.001;
    for (let x = 0; x < this.width; x += 10) {
      const y = horizonY + Math.sin(x * 0.015 + time) * 4 + 15;
      if (x === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();

    // Celestial Navigation Route (Curved Arc from bottom left to center-right)
    if (this.routeProgress > 0) {
      const p0 = { x: this.width * 0.1, y: this.height * 0.85 };
      const p1 = { x: this.width * 0.35, y: this.height * 0.45 };
      const p2 = { x: this.width * 0.65, y: this.height * 0.65 };
      const p3 = { x: this.width * 0.9, y: this.height * 0.35 };

      // Bezier drawing based on routeProgress
      this.ctx.beginPath();
      this.ctx.setLineDash([6, 6]);
      this.ctx.strokeStyle = `rgba(184, 155, 94, ${0.8 * this.horizonOpacity})`;
      this.ctx.lineWidth = 1.8;

      const steps = 100;
      const currentSteps = Math.floor(steps * this.routeProgress);

      for (let i = 0; i <= currentSteps; i++) {
        const t = i / steps;
        // Cubic bezier interpolation
        const cx = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
        const cy = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;

        if (i === 0) this.ctx.moveTo(cx, cy);
        else this.ctx.lineTo(cx, cy);

        // Current tip marker
        if (i === currentSteps && currentSteps > 0) {
          this.ctx.stroke();
          this.ctx.setLineDash([]);
          this.ctx.beginPath();
          this.ctx.fillStyle = '#D4BA7D';
          this.ctx.arc(cx, cy, 4, 0, Math.PI * 2);
          this.ctx.fill();

          // Pulsing halo
          this.ctx.beginPath();
          this.ctx.strokeStyle = 'rgba(184, 155, 94, 0.5)';
          this.ctx.lineWidth = 1;
          this.ctx.arc(cx, cy, 10 + Math.sin(time * 5) * 3, 0, Math.PI * 2);
          this.ctx.stroke();
          return;
        }
      }
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }
  }

  skip() {
    // When user skips intro, stop the music immediately
    this.musicPlayer.stop();
    this.finish();
  }

  finish() {
    if (this.isCompleted) return;
    this.isCompleted = true;
    cancelAnimationFrame(this.animId);

    // Stop music before entering the main portfolio
    this.musicPlayer.stop();

    sessionStorage.setItem('odyssey_intro_seen', 'true');

    if (this.container) {
      this.container.classList.add('hidden');
    }

    setTimeout(() => {
      if (this.container) {
        this.container.style.display = 'none';
      }
      this.onComplete();
    }, 1200);
  }
}
