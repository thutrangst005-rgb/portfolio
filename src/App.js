/**
 * THE ODYSSEY - MAIN APPLICATION ENTRYPOINT
 * Coordinates state, initializes audio-visual engines, routes, and modal overlays
 */

import { BackgroundEffects } from './components/BackgroundEffects.js';
import { CinematicIntro } from './components/CinematicIntro.js';
import { Navigation } from './components/Navigation.js';
import { CaseStudyModal } from './components/CaseStudyModal.js';
import { HorizonOcean } from './components/HorizonOcean.js';
import { RouteVisualizer } from './components/RouteVisualizer.js';

class OdysseyApp {
  constructor() {
    this.init();
  }

  init() {
    // 1. Initialize Background Stars & Web Audio Synthesizer
    this.bgEffects = new BackgroundEffects();

    // 2. Initialize Navigation & Sticky Scroll Spy
    this.navigation = new Navigation();

    // 3. Initialize Route Visualizer & Number Counters
    this.routeVisualizer = new RouteVisualizer();

    // 4. Initialize Full-screen Project Case Study Modal
    this.caseStudyModal = new CaseStudyModal();

    // 5. Initialize Horizon Ocean Canvas (Section 06)
    this.horizonOcean = new HorizonOcean();

    // 6. Initialize Cinematic 24-second Skyship Intro
    this.intro = new CinematicIntro({
      onComplete: () => {
        // Trigger subtle entrance for hero elements
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
          heroContent.classList.add('visible');
        }
      }
    });

    // 7. General Micro-interactions & Email Quick Copy
    this.bindCopyEmailAction();
  }

  bindCopyEmailAction() {
    const emailBtns = document.querySelectorAll('[data-copy-email]');
    emailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const email = btn.getAttribute('data-copy-email') || 'trangphan.finance@gmail.com';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = 'EMAIL COPIED ✓';
            setTimeout(() => {
              btn.innerHTML = originalText;
            }, 2500);
          });
        }
      });
    });
  }
}

// Instantiate on DOM readiness
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new OdysseyApp());
} else {
  new OdysseyApp();
}
