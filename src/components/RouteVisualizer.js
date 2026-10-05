/**
 * THE ODYSSEY - ROUTE VISUALIZER & SCROLL COUNTERS
 * Animates vertical SVG journey route line, draws connections between milestones,
 * and triggers smooth numerical counter increments on viewport entry.
 */

export class RouteVisualizer {
  constructor() {
    this.routeLine = document.getElementById('journey-route-path');
    this.metricNumbers = document.querySelectorAll('[data-counter-value]');
    this.revealElements = document.querySelectorAll('.reveal-fade-up');

    this.initScrollObservers();
    this.initJourneyRouteProgress();
  }

  initScrollObservers() {
    // Reveal Elements on enter
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    this.revealElements.forEach(el => revealObserver.observe(el));

    // Animated Numbers Counter Observer
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.3 });

    this.metricNumbers.forEach(num => counterObserver.observe(num));
  }

  animateCounter(element) {
    const targetStr = element.getAttribute('data-counter-value');
    const hasPlus = targetStr.includes('+');
    const hasM = targetStr.includes('M+');
    const isDecimal = targetStr.includes('.');

    let numericTarget = parseFloat(targetStr.replace(/[^0-9.]/g, ''));
    if (isNaN(numericTarget)) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = numericTarget * ease;

      if (isDecimal) {
        element.textContent = current.toFixed(2);
      } else {
        const intVal = Math.floor(current);
        if (hasM) {
          element.textContent = `${intVal}M+`;
        } else if (hasPlus) {
          element.textContent = `${intVal.toLocaleString()}+`;
        } else {
          element.textContent = intVal.toString();
        }
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = targetStr; // ensure exact ending string
      }
    };

    requestAnimationFrame(update);
  }

  initJourneyRouteProgress() {
    const journeySection = document.getElementById('journey');
    if (!journeySection || !this.routeLine) return;

    window.addEventListener('scroll', () => {
      const rect = journeySection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the journey section the user has scrolled
      const totalDist = rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / (totalDist + windowHeight * 0.4)));

      const pathLength = this.routeLine.getTotalLength ? this.routeLine.getTotalLength() : 600;
      this.routeLine.style.strokeDasharray = pathLength;
      this.routeLine.style.strokeDashoffset = pathLength * (1 - progress);
    }, { passive: true });
  }
}
