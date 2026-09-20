# Analytics Module - ClassIQ

This folder contains the Google Analytics 4 (GA4) and Google Tag Manager (GTM) event tracking suite for the ClassIQ EdTech platform.

## 📁 Files

- `analytics.js` - Main tracking engine for GA4 initialization and custom event triggers.

## 📊 Tracked Events

| Event Name | Trigger | Payload Parameters |
|------------|---------|-------------------|
| `user_login` | User completes login form | `email` |
| `user_signup` | User completes registration form | `email`, `fullname` |
| `course_enroll` | User clicks "Enroll Now" on a course card | `course_id`, `course_title` |
| `search_courses` | User enters search query in dashboard | `search_term` |
| `select_category_filter` | User selects a category filter pill | `category` |
| `newsletter_subscribe` | User submits newsletter email form | `email` |

## 🚀 Setup & Integration

Include the script in your HTML head or before closing `</body>`:

```html
<script src="analytics/analytics.js"></script>
```

To trigger a custom analytics event from JavaScript:

```javascript
if (typeof trackAnalyticsEvent === 'function') {
  trackAnalyticsEvent('custom_event_name', { key: 'value' });
}
```
