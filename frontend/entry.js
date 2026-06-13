// YURI Theme Frontend Entrypoint
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
    
    // Add active classes to body on start
    document.body.classList.remove('page-introduction-loading');
    document.body.classList.add('page-introduction');
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
          img.onerror = resolve; // Continue even if an image fails to load
        }
      });
    });

    Promise.all(preloads).then(() => this.onReady());
  }

  onReady() {
    setTimeout(() => {
      this.element.classList.add('is-ready');
      // Fade in preloaded vertical/desktop images
      this.images.forEach(img => {
        img.style.opacity = '1';
      });
    }, 150);
  }

  onComplete() {
    if (this.isAnimationActive) {
      this.isAnimationActive = false;
      document.body.classList.remove('page-introduction');
      document.body.classList.remove('page-introduction-rendering');
      
      // Trigger resize for ScrollTrigger updates
      ScrollTrigger.refresh();
    }
  }

  initTimeline() {
    if (!this.mainContent) return;

    // Set body to auto scroll
    gsap.set(document.body, { overflowY: 'auto' });

    // Build the scroll pinning timeline
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
          document.body.classList.add('page-introduction');
          document.body.classList.add('page-introduction-rendering');
        }
      }
    });

    // 1. Fade the logo out
    if (this.logo) {
      this.timeline.to(this.logo, {
        opacity: 0,
        duration: 0.7,
        ease: 'power1.out'
      });
    }

    // 2. Wipe the introduction panel vertically out of view
    this.timeline.to(this.element, {
      yPercent: -100,
      ease: 'none',
      duration: 1.0
    }, '-=0.2');

    // 3. Fade the background overlay to transparent
    if (this.background) {
      this.timeline.to(this.background, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        ease: 'none',
        duration: 0.6
      }, '-=0.8');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const introEl = document.querySelector('[data-mods="introduction"]');
  if (introEl) {
    new IntroductionHero(introEl);
  } else {
    // If no intro hero is present, ensure correct body layout classes
    document.body.classList.remove('page-introduction-loading');
  }

  console.log('YURI Theme: Homepage Scroll Reveal Initialized');
});
