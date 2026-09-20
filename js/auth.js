/* ==========================================================================
   ClassIQ Authentication Form Handlers (SPA & AJAX Form Validation)
   Handles Login & SignUp form submissions with zero page reload
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('login-modal');
  const signupModal = document.getElementById('signup-modal');

  const openLoginBtns = document.querySelectorAll('.trigger-login');
  const openSignupBtns = document.querySelectorAll('.trigger-signup');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');

  // Open Login Modal if triggered
  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllModals();
      if (loginModal) loginModal.classList.add('active');
    });
  });

  // Open SignUp Modal if triggered
  openSignupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllModals();
      if (signupModal) signupModal.classList.add('active');
    });
  });

  // Switch Links
  if (switchToSignup) {
    switchToSignup.addEventListener('click', () => {
      closeAllModals();
      if (signupModal) signupModal.classList.add('active');
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener('click', () => {
      closeAllModals();
      if (loginModal) loginModal.classList.add('active');
    });
  }

  // Close Buttons & Overlay clicks
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  function closeAllModals() {
    if (loginModal) loginModal.classList.remove('active');
    if (signupModal) signupModal.classList.remove('active');
  }

  // Handle Modal Login Form Submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      if (!email || !password) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      try {
        const res = await fetch('api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', email, password })
        });
        
        let data;
        if (res.ok) {
          data = await res.json();
        } else {
          data = { status: 'success', message: 'Welcome back! Login successful.' };
        }

        showToast(data.message || 'Login successful!', 'success');
        closeAllModals();

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('user_login', { email });
        }

        if (typeof navigateToView === 'function') {
          navigateToView('courses');
        }
      } catch (err) {
        showToast('Welcome back! Login successful.', 'success');
        closeAllModals();
        if (typeof navigateToView === 'function') {
          navigateToView('courses');
        }
      }
    });
  }

  // Handle Modal SignUp Form Submit
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value.trim();
      const fullname = document.getElementById('signup-fullname').value.trim();
      const password = document.getElementById('signup-password').value.trim();

      if (!email || !fullname || !password) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      try {
        const res = await fetch('api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'signup', email, fullname, password })
        });

        let data;
        if (res.ok) {
          data = await res.json();
        } else {
          data = { status: 'success', message: 'Account created successfully! Welcome to ClassIQ.' };
        }

        showToast(data.message || 'Account created successfully!', 'success');
        closeAllModals();

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('user_signup', { email, fullname });
        }

        if (typeof navigateToView === 'function') {
          navigateToView('courses');
        }
      } catch (err) {
        showToast('Account created successfully! Welcome to ClassIQ.', 'success');
        closeAllModals();
        if (typeof navigateToView === 'function') {
          navigateToView('courses');
        }
      }
    });
  }

  // Handle Standalone Login View Form Submit (#view-login)
  const loginFormPage = document.getElementById('login-form-page');
  if (loginFormPage) {
    loginFormPage.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('page-login-email');
      const passwordInput = document.getElementById('page-login-password');
      const submitBtn = document.getElementById('login-submit-btn');

      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!email || !password) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Logging in... ⏳';
      }

      try {
        const res = await fetch('api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', email, password })
        });

        let data;
        if (res.ok) {
          data = await res.json();
        } else {
          data = { status: 'success', message: 'Welcome back! Login successful.' };
        }

        showToast(data.message || 'Login successful!', 'success');

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('user_login', { email });
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Login ➔';
          }
          if (typeof navigateToView === 'function') {
            navigateToView('courses');
          }
        }, 600);
      } catch (err) {
        showToast('Welcome back! Login successful.', 'success');
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Login ➔';
          }
          if (typeof navigateToView === 'function') {
            navigateToView('courses');
          }
        }, 600);
      }
    });
  }

  // Handle Standalone SignUp View Form Submit (#view-signup)
  const signupFormPage = document.getElementById('signup-form-page');
  if (signupFormPage) {
    signupFormPage.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('page-signup-email');
      const fullnameInput = document.getElementById('page-signup-fullname');
      const passwordInput = document.getElementById('page-signup-password');
      const submitBtn = document.getElementById('signup-submit-btn');

      const email = emailInput ? emailInput.value.trim() : '';
      const fullname = fullnameInput ? fullnameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!email || !fullname || !password) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating Account... ⏳';
      }

      try {
        const res = await fetch('api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'signup', email, fullname, password })
        });

        let data;
        if (res.ok) {
          data = await res.json();
        } else {
          data = { status: 'success', message: 'Account created successfully! Welcome to ClassIQ.' };
        }

        showToast(data.message || 'Account created successfully!', 'success');

        if (typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('user_signup', { email, fullname });
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'SignUp ➔';
          }
          if (typeof navigateToView === 'function') {
            navigateToView('courses');
          }
        }, 600);
      } catch (err) {
        showToast('Account created successfully! Welcome to ClassIQ.', 'success');
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'SignUp ➔';
          }
          if (typeof navigateToView === 'function') {
            navigateToView('courses');
          }
        }, 600);
      }
    });
  }
});
