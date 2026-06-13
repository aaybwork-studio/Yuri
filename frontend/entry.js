// YURI Custom Theme JS Entrypoint
import './entry.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

class IntroductionHero {
  constructor(element) {
    this.element = element;
    this.isAnimationActive = true;
    this.scrollHeight = parseInt(element.getAttribute('data-scroll-height')) || 600;
    
    this.initElements();
    this.initTimeline();
    this.preloadAndReveal();
  }

  initElements() {
    this.wrapper = this.element.querySelector('[data-introduction-wrapper]');
    this.background = this.element.querySelector('[data-introduction-background]');
    this.logo = this.element.querySelector('[data-introduction-logo]');
    this.images = Array.from(this.element.querySelectorAll('img'));
    this.mainContent = document.querySelector('#MainContent');
    
    // Set loading states
    document.body.classList.remove('page-introduction-loading');
    document.body.classList.add('page-introduction-rendering');
  }

  preloadAndReveal() {
    if (this.images.length === 0) {
      this.onReady();
      return;
    }

    const preloads = this.images.map(img => {
      return new Promise(resolve => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    });

    Promise.all(preloads).then(() => this.onReady());
  }

  onReady() {
    setTimeout(() => {
      this.element.classList.add('is-ready');
      this.images.forEach(img => {
        img.style.opacity = '1';
      });
    }, 100);
  }

  onComplete() {
    if (this.isAnimationActive) {
      this.isAnimationActive = false;
      document.body.classList.remove('page-introduction-rendering');
      ScrollTrigger.refresh();
    }
  }

  initTimeline() {
    if (!this.mainContent) return;

    // Build the scroll pinning timeline using GSAP ScrollTrigger
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.mainContent,
        start: 'top top',
        end: `+=${this.scrollHeight}px`,
        scrub: true,
        pin: true,
        once: false,
        invalidateOnRefresh: true
      },
      onUpdate: () => {
        const progress = this.timeline.progress();
        if (progress >= 0.99 && this.isAnimationActive) {
          this.onComplete();
        } else if (progress < 0.99 && !this.isAnimationActive) {
          this.isAnimationActive = true;
          document.body.classList.add('page-introduction-rendering');
        }
      }
    });

    // 1. Fade logo out on scroll down
    if (this.logo) {
      this.timeline.to(this.logo, {
        opacity: 0,
        duration: 0.6,
        ease: 'power1.out'
      });
    }

    // 2. Translate introduction panel vertically up
    this.timeline.to(this.element, {
      yPercent: -100,
      ease: 'none',
      duration: 1.0
    }, '-=0.1');

    // 3. Fade the background overlay to transparent
    if (this.background) {
      this.timeline.to(this.background, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        ease: 'none',
        duration: 0.5
      }, '-=0.8');
    }
  }
}

// Initialize components on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Intro Scroll Reveal
  const introEl = document.querySelector('[data-mods="introduction"]');
  if (introEl) {
    new IntroductionHero(introEl);

    // Safety fallback: if introduction rendering is stuck, force remove it after 2.5s
    setTimeout(() => {
      if (document.body.classList.contains('page-introduction-rendering')) {
        document.body.classList.remove('page-introduction-rendering');
        document.body.classList.remove('page-introduction-loading');
        console.warn('YURI: Safety fallback triggered. Restored header visibility.');
      }
    }, 2500);

    // Safety scroll fallback: if user scrolls manually, restore header visibility
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20 && document.body.classList.contains('page-introduction-rendering')) {
        document.body.classList.remove('page-introduction-rendering');
        document.body.classList.remove('page-introduction-loading');
      }
    }, { passive: true });
  } else {
    document.body.classList.remove('page-introduction-loading');
  }

  // 2. Initialize Smart Sticky Hiding Header
  const header = document.querySelector('[data-header]');
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Scrolled state
      if (currentScrollY > 15) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      // Hide / Show on direction
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // Scrolling down - hide header
        header.classList.add('is-hidden');
      } else {
        // Scrolling up - show header
        header.classList.remove('is-hidden');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  console.log('YURI custom minimal theme loaded.');
});
