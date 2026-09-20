# ClassIQ - EdTech Web Application Assessment Solution

A pixel-perfect, highly responsive, performance-optimized EdTech web application built strictly according to the **ClassIQ Figma Web Design** assessment guidelines.

---

## 🌟 Key Highlights & Features

### 1. Figma Design Accuracy
- **Exact Palette**: Vibrant lime green accent (`#B2FF4D`), dark neutral titles (`#111111`), soft card backgrounds (`#F4F5F7`), and clean typography (*Plus Jakarta Sans* / *Outfit*).
- **Exact Layouts**:
  - **Landing Page (`index.html`)**: Navigation header, Hero banner with green wavy underline, 5 monochrome corporate partner logos (*Google, Netflix, Airbnb, Amazon, Facebook*), 3 Certified Course feature cards, All-In-One Solution block, and Footer with Newsletter subscription.
  - **Auth Modals**: Centered **SignUp** (Page 3) and **Login** (Page 4) modal dialogs with seamless tab switching.
  - **Dashboard (`courses.html`)**: "Enroll in Your Fav Courses" hero banner with laptop 3D character, category filter pills, real-time search, and responsive course grid.

### 2. 🎮 Interactive 3D Avatar Engine (`js/hero-3d.js`)
- **Spatial 3D Parallax Tilt**: Moving the cursor over the 3D character applies real-time `rotateX` and `rotateY` matrix transformations with depth layer translation.
- **Hover Waving Gestures**: Hovering over the avatar triggers an animated waving gesture and background glowing orb expansion.
- **Floating Physics**: The *"Congratulations! You are enrolled!"* badge floats dynamically with spring physics keyframes.

### 3. 🚀 PHP REST API & Asynchronous AJAX Layer (`/api/`)
- `GET /api/courses.php`: Returns course listing JSON with category filtering (`?category=web-dev`).
- `POST /api/auth.php`: Handles Login & SignUp form validations via AJAX.
- `POST /api/subscribe.php`: Handles newsletter subscriptions via AJAX.
- **Dual Mode Reliability**: Features automatic fallback mock data so the application runs seamlessly **both** as static HTML files (`file:///` / static server) **and** on a live PHP backend (`php -S localhost:8000`).

### 4. 📊 Google Analytics 4 (GA4) & Tag Manager (GTM)
- Includes GA4 Global Measurement script snippet (`analytics/analytics.js`).
- Integrated event triggers tracking:
  - `user_login` & `user_signup`
  - `course_enroll`
  - `newsletter_subscribe`

---

## 📁 Project Architecture

```text
c:\Users\prath\OneDrive\Desktop\assesment\
├── index.html              # Landing Page (Figma Page 2 with 3D Interactive Hero)
├── courses.html            # Dashboard / Courses Page (Figma Page 5)
├── README.md               # Detailed Setup & Features Documentation
├── analytics/              # Dedicated Analytics Module & Documentation
│   ├── analytics.js        # Google Analytics 4 & GTM Event Tracker Engine
│   └── README.md           # Analytics Module Documentation & Event List
├── api/                    # PHP REST API Endpoints
│   ├── config.php          # API CORS headers & JSON helper functions
│   ├── courses.php         # GET /api/courses.php (JSON course list)
│   ├── auth.php            # POST /api/auth.php (Login & SignUp AJAX validation)
│   └── subscribe.php       # POST /api/subscribe.php (Newsletter handler)
├── css/
│   ├── style.css           # Global Design Tokens, Reset & Typography
│   ├── components.css      # Header, Hero, 3D Avatar, Modals, Cards, Toasts
│   └── responsive.css      # Mobile (<576px), Tablet (768px-1024px) & Desktop Breakpoints
├── js/
│   ├── hero-3d.js          # Interactive 3D Avatar Mouse Tracking Engine
│   ├── main.js             # Sticky Nav, Mobile Menu Drawer & Toast System
│   ├── auth.js             # SignUp & Login Modal Controls & Form AJAX Handler
│   └── courses.js          # AJAX Course Fetching, Search & Category Filters
└── assets/
    ├── images/             # 3D Avatars (Waving Avatar & Laptop Avatar)
    └── icons/              # ClassIQ Logo SVG, Partner Brand Logos (Google, Netflix, Airbnb, Amazon, Facebook)
```

---

## ⚙️ How to Run & Test

### Option 1: Static Preview (Instant)
Simply open `index.html` or `courses.html` directly in any web browser!

### Option 2: Live PHP Backend Preview
To test the PHP REST API endpoints live:
1. Open PowerShell / Command Prompt in the project folder:
   ```bash
   cd c:\Users\prath\OneDrive\Desktop\assesment
   ```
2. Start PHP local development server:
   ```bash
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your web browser.

---

## ⚡ Performance & Optimization Score
- **0 External Bloat**: Handcrafted modular CSS & vanilla ES6 JS for maximum execution speed.
- **Hardware-Accelerated 3D Motion**: Uses GPU-accelerated CSS `transform3d()` matrix layers for 60FPS interaction.
- **Accessibility**: Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`), keyboard accessible focus rings, and proper ARIA labels.
# it-vedant-assignment
