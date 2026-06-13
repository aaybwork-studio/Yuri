// YURI Custom Theme JS Entrypoint
import './entry.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Update ScrollTrigger on scroll
lenis.on('scroll', ScrollTrigger.update);

// Sync GSAP ticker with Lenis RAF
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable lag smoothing to prevent syncing jumps
gsap.ticker.lagSmoothing(0);

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
    
    // Remove loading lock (allow scrolling)
    document.body.classList.remove('page-introduction-loading');
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

  initTimeline() {
    if (!this.mainContent) return;

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.mainContent,
        start: 'top top',
        end: `+=${this.scrollHeight}px`,
        scrub: true,
        pin: true,
        once: false,
        invalidateOnRefresh: true
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

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Intro Scroll Reveal
  const introEl = document.querySelector('[data-mods="introduction"]');
  let introScrollHeight = 0;

  if (introEl) {
    const introHero = new IntroductionHero(introEl);
    introScrollHeight = introHero.scrollHeight;
  } else {
    // No intro hero on this page, clean up body class
    document.body.classList.remove('page-introduction-loading');
  }

  // 2. Header: single scroll-position-based visibility system
  //    - Hidden while scrollY < introScrollHeight (hero zone)
  //    - Visible once past the hero
  //    - Hides on scroll-down, shows on scroll-up (smart sticky)
  const header = document.querySelector('[data-header]');
  if (header) {
    let lastScrollY = lenis.scroll || window.scrollY;
    const isHomepage = !!introEl;

    // Set initial state
    if (isHomepage && lastScrollY < introScrollHeight) {
      header.classList.add('is-intro-active');
    }

    lenis.on('scroll', ({ scroll }) => {
      const y = scroll;

      // --- INTRO HERO ZONE ---
      if (isHomepage && y < introScrollHeight) {
        header.classList.add('is-intro-active');
        header.classList.remove('is-scrolled', 'is-hidden');
        lastScrollY = y;
        return;
      }

      // --- PAST HERO: header is visible ---
      header.classList.remove('is-intro-active');

      // Background blur when scrolled
      if (y > introScrollHeight + 15) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      // Smart sticky: hide on scroll-down, show on scroll-up
      if (y > lastScrollY && y > introScrollHeight + 60) {
        header.classList.add('is-hidden');
      } else if (y < lastScrollY) {
        header.classList.remove('is-hidden');
      }

      lastScrollY = y;
    });
  }

  console.log('YURI custom minimal theme loaded.');
});
