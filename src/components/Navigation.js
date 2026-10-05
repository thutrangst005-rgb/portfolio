/**
 * THE ODYSSEY - EDITORIAL NAVIGATION COMPONENT
 * Sticky header with brand, coordinates, numbered menu, scroll progress & mobile drawer
 */

export class Navigation {
  constructor() {
    this.header = document.getElementById('main-header');
    this.progressBar = document.getElementById('nav-scroll-progress');
    this.menuLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    this.mobileTrigger = document.getElementById('mobile-menu-trigger');
    this.mobileDrawer = document.getElementById('mobile-nav-drawer');
    this.sections = document.querySelectorAll('section[id]');
    
    this.bindEvents();
    this.updateScrollProgress();
  }

  bindEvents() {
    // Window scroll tracking
    window.addEventListener('scroll', () => {
      this.updateScrollProgress();
      this.updateActiveSection();
    }, { passive: true });

    // Smooth navigation click
    this.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
          if (this.mobileDrawer && this.mobileDrawer.classList.contains('open')) {
            this.toggleMobileMenu(false);
          }
        }
      });
    });

    // Mobile trigger toggle
    if (this.mobileTrigger) {
      this.mobileTrigger.addEventListener('click', () => {
        const isOpen = this.mobileDrawer.classList.contains('open');
        this.toggleMobileMenu(!isOpen);
      });
    }

    // Close mobile drawer on backdrop click or resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1080 && this.mobileDrawer && this.mobileDrawer.classList.contains('open')) {
        this.toggleMobileMenu(false);
      }
    });
  }

  toggleMobileMenu(open) {
    if (!this.mobileDrawer) return;
    if (open) {
      this.mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      this.mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (this.progressBar) {
      this.progressBar.style.width = `${progress}%`;
    }
  }

  updateActiveSection() {
    const scrollPosition = window.scrollY + 200;

    this.sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        this.menuLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}
