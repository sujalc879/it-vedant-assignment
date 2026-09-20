/* ==========================================================================
   ClassIQ Google Analytics 4 (GA4) & Google Tag Manager (GTM) Tracker
   Handles dynamic event tracking for page views, user auth, course enrollments,
   search queries, category filters, and newsletter subscriptions.
   ========================================================================== */

// Configure Measurement ID (replace 'G-CLASS1Q2024' with your live GA4 ID when publishing)
const GA_MEASUREMENT_ID = window.GA_MEASUREMENT_ID || 'G-9WNJ04H4LM';

// Enable Developer Console Logging
const GA_DEBUG_MODE = true;

// Initialize Google Analytics gtag script dynamically
(function initGA() {
  if (!document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  if (GA_DEBUG_MODE) {
    console.log(`%c[Google Analytics] Initialized GA4 Tag: ${GA_MEASUREMENT_ID}`, 'color: #B2FF4D; font-weight: bold; background: #111; padding: 4px 8px; border-radius: 4px;');
  }
})();

/**
 * Custom Event Tracker Helper
 * @param {string} eventName - Name of the custom analytics event
 * @param {object} eventParams - Payload parameters (e.g. course_id, search_term)
 */
function trackAnalyticsEvent(eventName, eventParams = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    page_location: window.location.href,
    page_title: document.title,
    ...eventParams
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  } else if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...payload });
  }

  if (GA_DEBUG_MODE) {
    console.log(`%c[GA4 Event] ${eventName}`, 'color: #00A4EF; font-weight: bold;', payload);
  }
}
