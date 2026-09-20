/* ==========================================================================
   ClassIQ Creative Motion Engine & Single-Page Router (SPA)
   Scroll Reveal Animations, Ambient Cursor Glow, Mobile Menu, SPA Router, Toast Alerts
   ========================================================================== */

/**
 * SPA View Router - Switches active view container without page reloads
 * @param {string} targetViewId - 'home' | 'courses' | 'login' | 'signup'
 */
function navigateToView(targetViewId) {
  if (!targetViewId) targetViewId = 'home';
  targetViewId = targetViewId.replace('#', '').toLowerCase();

  const validViews = ['home', 'courses', 'login', 'signup'];
  if (!validViews.includes(targetViewId)) {
    targetViewId = 'home';
  }

  const allViews = document.querySelectorAll('.page-view');
  allViews.forEach(view => {
    view.classList.remove('active-view');
    view.style.display = 'none';
  });

  const targetViewEl = document.getElementById(`view-${targetViewId}`);
  if (targetViewEl) {
    targetViewEl.style.display = 'block';
    // Force reflow for animation restart
    void targetViewEl.offsetWidth;
    targetViewEl.classList.add('active-view');
  }

  // Update Navbar Active state
  document.querySelectorAll('app-header').forEach(headerEl => {
    if (typeof headerEl.updateActiveState === 'function') {
      headerEl.updateActiveState();
    }
  });
  document.querySelectorAll('.nav-link-item').forEach(link => {
    const linkTarget = link.getAttribute('data-view-target') || link.getAttribute('href');
    if (linkTarget && linkTarget.replace('#', '').toLowerCase() === targetViewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  document.querySelectorAll('.nav-btn-login').forEach(btn => {
    btn.classList.toggle('active', targetViewId === 'login');
  });
  document.querySelectorAll('.nav-btn-signup').forEach(btn => {
    btn.classList.toggle('active', targetViewId === 'signup');
  });

  // Re-trigger reveal animations for elements inside the target view
  if (targetViewEl) {
    const newlyVisibleReveals = targetViewEl.querySelectorAll('.reveal-on-scroll');
    newlyVisibleReveals.forEach(el => el.classList.add('is-visible'));
  }

  // Update URL Hash without trigger loop
  if (window.location.hash !== `#${targetViewId}`) {
    history.pushState(null, null, `#${targetViewId}`);
  }

  // Close Mobile Navigation Drawer
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  if (navLinks) navLinks.classList.remove('active');
  if (navOverlay) navOverlay.classList.remove('active');
  if (hamburgerBtn) {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.innerHTML = '☰';
  }
  document.body.style.overflow = '';

  // Scroll to top cleanly
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Track Analytics View Event
  if (typeof trackAnalyticsEvent === 'function') {
    trackAnalyticsEvent('view_page', { page_view: targetViewId });
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // 1. Create Ambient Cursor Glow Follower
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-light-glow';
  document.body.appendChild(cursorGlow);

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // 2. Intersection Observer for Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Mobile Menu Drawer Toggle & Overlay Handler
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  function openMobileMenu() {
    if (navLinks) navLinks.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    if (hamburgerBtn) {
      hamburgerBtn.classList.add('active');
      hamburgerBtn.innerHTML = '✕';
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.innerHTML = '☰';
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileMenu);
    }
  }

  // 4. SPA Navigation Link Interceptor - 100% Zero-Reload View Switching
  document.body.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-view-target], a[href^="#"]');
    if (targetLink) {
      const targetView = targetLink.getAttribute('data-view-target') || targetLink.getAttribute('href');
      if (targetView && (targetView.startsWith('#') || !targetView.includes('.'))) {
        e.preventDefault();
        const viewName = targetView.replace('#', '');
        
        // Handle filter shortcut buttons (e.g. View Courses -> Web Dev)
        const categoryShortcut = targetLink.getAttribute('data-category');
        navigateToView(viewName);

        if (categoryShortcut && typeof window.applyCategoryFilter === 'function') {
          window.applyCategoryFilter(categoryShortcut);
        }
      }
    }
  });

  // Handle Browser Back/Forward buttons via Hash Change
  window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
      navigateToView(currentHash);
    }
  });

  // Initialize View from current Hash or default to 'home'
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateToView(initialHash);

  // 5. Newsletter Subscription Form Handler
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      try {
        const response = await fetch('api/subscribe.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email })
        });
        
        let result;
        if (response.ok) {
          result = await response.json();
        } else {
          result = { status: 'success', message: 'Thank you for subscribing to ClassIQ!' };
        }

        showToast(result.message || 'Subscribed successfully!', 'success');
        if (emailInput) emailInput.value = '';

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('newsletter_subscribe', { email: email });
        }
      } catch (err) {
        showToast('Thank you for subscribing to ClassIQ!', 'success');
        if (emailInput) emailInput.value = '';
      }
    });
  }
});

/**
 * Toast Notification System
 * @param {string} message - Text message to present in toast
 * @param {string} type - 'success' | 'error' | 'info'
 */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
