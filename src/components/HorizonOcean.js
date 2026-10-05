/**
 * THE ODYSSEY - SECTION 06 HORIZON OCEAN CANVAS
 * Luminous twilight horizon with gentle mathematical sine waves,
 * celestial reflections, and deep ocean atmospheric gradient.
 */

export class HorizonOcean {
  constructor() {
    this.canvas = document.getElementById('horizon-canvas-bg');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.parentElement.clientWidth || window.innerWidth;
    this.height = this.canvas.parentElement.clientHeight || 600;
    this.time = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.width = parent ? parent.clientWidth : window.innerWidth;
    this.height = parent ? parent.clientHeight : 600;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  animate() {
    if (!this.ctx) return;
    this.time += 0.015;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const horizonY = this.height * 0.58;

    // Atmospheric Celestial Sunset / Twilight Gradient
    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, 'rgba(7, 19, 28, 1)');
    skyGrad.addColorStop(0.65, 'rgba(14, 36, 48, 0.95)');
    skyGrad.addColorStop(0.9, 'rgba(30, 48, 58, 0.8)');
    skyGrad.addColorStop(1, 'rgba(184, 155, 94, 0.25)'); // subtle gold glow at horizon

    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, this.width, horizonY);

    // Ocean Body Gradient
    const oceanGrad = this.ctx.createLinearGradient(0, horizonY, 0, this.height);
    oceanGrad.addColorStop(0, 'rgba(14, 36, 48, 0.98)');
    oceanGrad.addColorStop(0.4, 'rgba(10, 26, 36, 0.99)');
    oceanGrad.addColorStop(1, 'rgba(4, 10, 16, 1)');

    this.ctx.fillStyle = oceanGrad;
    this.ctx.fillRect(0, horizonY, this.width, this.height - horizonY);

    // Glowing Horizon Line
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(212, 186, 125, 0.65)';
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowColor = 'rgba(184, 155, 94, 0.8)';
    this.ctx.shadowBlur = 15;
    this.ctx.moveTo(0, horizonY);
    this.ctx.lineTo(this.width, horizonY);
    this.ctx.stroke();
    this.ctx.shadowBlur = 0; // reset shadow

    // 4 Layered Sine-wave Ocean Lines for Depth
    const waves = [
      { yOffset: 12, amp: 4, freq: 0.012, speed: 1.0, color: 'rgba(184, 155, 94, 0.35)', width: 1.2 },
      { yOffset: 35, amp: 7, freq: 0.009, speed: 0.8, color: 'rgba(111, 135, 144, 0.4)', width: 1.0 },
      { yOffset: 70, amp: 10, freq: 0.007, speed: 0.6, color: 'rgba(14, 36, 48, 0.8)', width: 1.5 },
      { yOffset: 120, amp: 14, freq: 0.005, speed: 0.4, color: 'rgba(111, 135, 144, 0.25)', width: 1.0 }
    ];

    waves.forEach(w => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = w.color;
      this.ctx.lineWidth = w.width;

      for (let x = 0; x <= this.width; x += 8) {
        const y = horizonY + w.yOffset + Math.sin(x * w.freq + this.time * w.speed) * w.amp;
        if (x === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.stroke();
    });

    requestAnimationFrame(this.animate);
  }
}
