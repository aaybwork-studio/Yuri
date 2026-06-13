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

  // 3. Slide-out Drawer Navigation Menu
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuClose = document.querySelector('[data-menu-close]');
  const menuOverlay = document.querySelector('[data-menu-overlay]');
  const menuDrawer = document.querySelector('[data-menu-drawer]');

  let openMenu, closeMenu;

  if (menuToggle && menuDrawer && menuOverlay) {
    openMenu = () => {
      if (typeof closeCart === 'function') closeCart();
      menuDrawer.classList.remove('-translate-x-full');
      menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
      menuOverlay.classList.add('opacity-100', 'pointer-events-auto');
      document.body.classList.add('overflow-hidden');
      if (typeof lenis !== 'undefined') {
        lenis.stop();
      }
    };

    closeMenu = () => {
      menuDrawer.classList.add('-translate-x-full');
      menuOverlay.classList.add('opacity-0', 'pointer-events-none');
      menuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
      document.body.classList.remove('overflow-hidden');
      if (typeof lenis !== 'undefined') {
        lenis.start();
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      openMenu();
    });

    if (menuClose) {
      menuClose.addEventListener('click', closeMenu);
    }
    menuOverlay.addEventListener('click', closeMenu);
  }

  // 4. Slide-out Cart Drawer
  const cartToggles = document.querySelectorAll('[data-cart-toggle]');
  const cartClose = document.querySelector('[data-cart-close]');
  const cartOverlay = document.querySelector('[data-cart-overlay]');
  const cartDrawer = document.querySelector('[data-cart-drawer]');
  const cartItemsContainer = document.querySelector('[data-cart-items]');
  const cartTitle = document.querySelector('[data-cart-title]');
  const cartSubtotal = document.querySelector('[data-cart-subtotal]');
  const cartFooter = document.querySelector('[data-cart-footer]');
  const cartCountSpans = document.querySelectorAll('[data-cart-count]');

  const formatMoney = (cents) => {
    const dollars = (cents / 100).toFixed(2);
    const currency = window.Shopify?.currency?.active || 'USD';
    const symbol = window.Shopify?.currency?.symbol || '$';
    if (currency === 'EUR') {
      return `${dollars.replace('.', ',')} €`;
    }
    return `${symbol}${dollars}`;
  };

  const renderCart = (cart) => {
    // Update count spans
    cartCountSpans.forEach(span => {
      span.textContent = cart.item_count;
    });

    if (cartTitle) {
      cartTitle.textContent = `BAG (${cart.item_count})`;
    }

    if (!cartItemsContainer) return;

    if (cart.item_count === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-24 space-y-6 font-sans text-[11px] tracking-widest text-neutral-400">
          <p>YOUR BAG IS CURRENTLY EMPTY.</p>
          <button type="button" class="inline-block border border-black px-8 py-3 text-[10px] text-black tracking-widest hover:bg-black hover:text-white transition-colors duration-300 bg-transparent rounded-none uppercase cursor-pointer" data-cart-close-btn>
            CONTINUE SHOPPING
          </button>
        </div>
      `;
      if (cartFooter) {
        cartFooter.style.display = 'none';
      }
      
      // Wire up continue shopping close button
      const continueShoppingBtn = cartItemsContainer.querySelector('[data-cart-close-btn]');
      if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeCart);
      }
    } else {
      if (cartFooter) {
        cartFooter.style.display = 'block';
      }

      let html = '<div class="space-y-6">';
      cart.items.forEach((item, index) => {
        html += `
          <div class="cart-drawer-item border-b border-black/5 pb-4" data-line-item-key="${item.key}">
            <a href="${item.url}" class="block aspect-[3/4] bg-neutral-100 overflow-hidden">
              <img src="${item.image || ''}" alt="${item.product_title || ''}" class="w-full h-full object-cover">
            </a>
            <div class="space-y-1.5 font-sans text-[10px] tracking-widest uppercase text-black">
              <a href="${item.url}" class="text-[11px] font-normal hover:underline block leading-tight">${item.product_title}</a>
              ${item.variant_title && item.variant_title !== 'Default Title' ? `<div class="text-neutral-500 text-[9px]">${item.variant_title}</div>` : ''}
              <div class="text-neutral-500">${formatMoney(item.price)}</div>
              
              <div class="flex items-center justify-between pt-2">
                <div class="flex items-center border border-black/15">
                  <button type="button" class="cart-drawer-qty-btn" data-qty-change data-change-line="${index + 1}" data-change-val="-1">-</button>
                  <span class="cart-drawer-qty-input">${item.quantity}</span>
                  <button type="button" class="cart-drawer-qty-btn" data-qty-change data-change-line="${index + 1}" data-change-val="1">+</button>
                </div>
                
                <button type="button" class="text-[9px] text-neutral-400 hover:text-black underline bg-transparent border-0 cursor-pointer p-0" data-cart-remove data-remove-line="${index + 1}">
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        `;
      });
      html += '</div>';
      cartItemsContainer.innerHTML = html;

      if (cartSubtotal) {
        cartSubtotal.textContent = formatMoney(cart.total_price);
      }

      // Add event listeners for qty change and remove buttons
      cartItemsContainer.querySelectorAll('[data-qty-change]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const line = e.target.getAttribute('data-change-line');
          const val = parseInt(e.target.getAttribute('data-change-val'));
          const currentQty = parseInt(e.target.parentElement.querySelector('.cart-drawer-qty-input').textContent);
          const newQty = currentQty + val;
          if (newQty >= 0) {
            await updateCartQuantity(line, newQty);
          }
        });
      });

      cartItemsContainer.querySelectorAll('[data-cart-remove]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const line = e.target.getAttribute('data-remove-line');
          await updateCartQuantity(line, 0);
        });
      });
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      renderCart(cart);
      return cart;
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const updateCartQuantity = async (line, quantity) => {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: parseInt(line), quantity: parseInt(quantity) })
      });
      const cart = await res.json();
      renderCart(cart);
    } catch (err) {
      console.error('Error changing item quantity:', err);
    }
  };

  openCart = async () => {
    if (typeof closeMenu === 'function') closeMenu();
    
    await fetchCart();
    
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('translate-x-full');
      cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
      cartOverlay.classList.add('opacity-100', 'pointer-events-auto');
      document.body.classList.add('overflow-hidden');
      if (typeof lenis !== 'undefined') {
        lenis.stop();
      }
    }
  };

  closeCart = () => {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('translate-x-full');
      cartOverlay.classList.add('opacity-0', 'pointer-events-none');
      cartOverlay.classList.remove('opacity-100', 'pointer-events-auto');
      document.body.classList.remove('overflow-hidden');
      if (typeof lenis !== 'undefined') {
        lenis.start();
      }
    }
  };

  if (cartDrawer && cartOverlay) {
    cartToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    });

    if (cartClose) {
      cartClose.addEventListener('click', closeCart);
    }
    cartOverlay.addEventListener('click', closeCart);
  }

  // Intercept Add to Bag Form submissions
  document.addEventListener('submit', async (e) => {
    const form = e.target;
    if (form.action && form.action.includes('/cart/add')) {
      e.preventDefault();
      
      const submitButton = form.querySelector('[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : 'ADD TO BAG';
      if (submitButton) {
        submitButton.textContent = 'ADDING...';
        submitButton.disabled = true;
      }

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: new FormData(form)
        });
        
        // Success: reopen cart and animate
        await openCart();
      } catch (err) {
        console.error('Error adding product to cart:', err);
      } finally {
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      }
    }
  });

  // Fetch cart data on page load to sync count badge
  fetchCart();

  console.log('YURI custom minimal theme loaded.');
});
