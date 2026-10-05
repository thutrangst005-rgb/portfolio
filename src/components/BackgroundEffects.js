/**
 * THE ODYSSEY - BACKGROUND EFFECTS ENGINE
 * Celestial Starfield, Constellations, Ambient Particle Drift, & Web Audio Ambient Synth
 */

export class BackgroundEffects {
  constructor() {
    this.canvas = document.getElementById('global-starfield-canvas');
    this.horizonCanvas = document.getElementById('horizon-canvas-bg');
    this.audioCtx = null;
    this.soundEnabled = false;
    this.ambientGain = null;
    this.stars = [];
    this.constellations = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse = { x: this.width / 2, y: this.height / 2, targetX: this.width / 2, targetY: this.height / 2 };
    
    this.initCanvas();
    this.initStars(220);
    this.initConstellations(6);
    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initCanvas() {
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  initStars(count) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08,
        gold: Math.random() > 0.82
      });
    }
  }

  initConstellations(count) {
    this.constellations = [];
    for (let i = 0; i < count; i++) {
      const cx = (Math.random() * 0.8 + 0.1) * this.width;
      const cy = (Math.random() * 0.7 + 0.1) * this.height;
      const points = [];
      const numPoints = Math.floor(Math.random() * 4) + 4;
      for (let j = 0; j < numPoints; j++) {
        points.push({
          x: cx + (Math.random() - 0.5) * 220,
          y: cy + (Math.random() - 0.5) * 180,
          size: Math.random() * 1.5 + 1.2
        });
      }
      this.constellations.push({ points, alpha: Math.random() * 0.25 + 0.15 });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.initStars(220);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    });

    // Sound toggle buttons
    const soundButtons = document.querySelectorAll('[data-sound-toggle]');
    soundButtons.forEach(btn => {
      btn.addEventListener('click', () => this.toggleSound());
    });
  }

  toggleSound() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.setupAmbientSound();
      }
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.soundEnabled = !this.soundEnabled;
    const soundButtons = document.querySelectorAll('[data-sound-toggle]');

    if (this.soundEnabled) {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0.06, this.audioCtx.currentTime, 1);
      }
      this.playGlassChime(587.33); // D5 chime
      soundButtons.forEach(b => {
        b.classList.add('active');
        b.setAttribute('title', 'Sound: Atmospheric Ambience On');
      });
    } else {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0.0001, this.audioCtx.currentTime, 0.5);
      }
      soundButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('title', 'Sound: Muted');
      });
    }
  }

  setupAmbientSound() {
    if (!this.audioCtx) return;
    try {
      // Sub-bass ocean wind drone
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const filter = this.audioCtx.createBiquadFilter();
      this.ambientGain = this.audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.audioCtx.currentTime); // A1 note
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, this.audioCtx.currentTime); // A2 note

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.audioCtx.currentTime);

      this.ambientGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.audioCtx.destination);

      osc1.start();
      osc2.start();
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  }

  playGlassChime(freq = 523.25) {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.audioCtx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.2);
    } catch (e) {
      // Audio context may be restricted
    }
  }

  animate(timestamp) {
    if (!this.ctx) return;

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    const offsetX = (this.mouse.x - this.width / 2) * 0.015;
    const offsetY = (this.mouse.y - this.height / 2) * 0.015;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Constellations
    for (const c of this.constellations) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgba(184, 155, 94, ${c.alpha * 0.4})`;
      this.ctx.lineWidth = 0.6;
      for (let i = 0; i < c.points.length; i++) {
        const p = c.points[i];
        const px = p.x + offsetX * 1.5;
        const py = p.y + offsetY * 1.5;
        if (i === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      }
      this.ctx.stroke();

      for (const p of c.points) {
        const px = p.x + offsetX * 1.5;
        const py = p.y + offsetY * 1.5;
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(242, 235, 221, ${c.alpha * 1.5})`;
        this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // Draw Stars
    for (const star of this.stars) {
      star.x += star.speedX;
      star.y += star.speedY;

      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset) * 0.35 + 0.65;
      const alpha = star.alpha * twinkle;

      const sx = star.x + offsetX;
      const sy = star.y + offsetY;

      this.ctx.beginPath();
      if (star.gold) {
        this.ctx.fillStyle = `rgba(212, 186, 125, ${alpha})`;
      } else {
        this.ctx.fillStyle = `rgba(242, 235, 221, ${alpha})`;
      }
      this.ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    requestAnimationFrame(this.animate);
  }
}
