/* ==========================================================================
   ClassIQ Reusable Header Web Component (<app-header>)
   Single source of truth for the navigation header across the entire application.
   Supports zero-reload SPA routing, responsive mobile drawer, and active state sync.
   ========================================================================== */

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.updateActiveState();

    // Listen to hash changes to update active states automatically
    window.addEventListener('hashchange', () => this.updateActiveState());
  }

  render() {
    this.innerHTML = `
      <header class="navbar">
        <div class="container">
          <div class="nav-brand-group">
            <a href="#home" class="brand-logo" data-view-target="home">
              <img src="assets/icons/classiq-logo.svg" alt="ClassIQ Logo">
              ClassIQ
            </a>

            <ul class="nav-links">
              <li><a href="#home" class="nav-link nav-link-item active" data-view-target="home">Home</a></li>
              <li><a href="#courses" class="nav-link nav-link-item" data-view-target="courses">Courses</a></li>
              
              <li class="mobile-nav-actions">
                <a href="#login" class="btn-dark nav-btn-login" data-view-target="login" style="text-align: center;">Login</a>
                <a href="#signup" class="btn-lime nav-btn-signup" data-view-target="signup" style="width: 100%; font-size: 0.95rem; padding: 12px; text-align: center;">SignUp</a>
              </li>
            </ul>
          </div>

          <div class="nav-actions">
            <a href="#login" class="btn-dark nav-btn-login" data-view-target="login">Login</a>
            <a href="#signup" class="btn-dark nav-btn-signup" data-view-target="signup">SignUp</a>
            <button class="hamburger-menu" aria-label="Toggle Navigation">☰</button>
          </div>
        </div>
      </header>
    `;
  }

  updateActiveState() {
    const currentView = (window.location.hash.replace('#', '') || 'home').toLowerCase();

    // Update nav links (Home, Courses)
    this.querySelectorAll('.nav-link-item').forEach(link => {
      const target = link.getAttribute('data-view-target');
      if (target === currentView) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Login / SignUp action buttons
    this.querySelectorAll('.nav-btn-login').forEach(btn => {
      if (currentView === 'login') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    this.querySelectorAll('.nav-btn-signup').forEach(btn => {
      if (currentView === 'signup') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

if (!customElements.get('app-header')) {
  customElements.define('app-header', AppHeader);
}
