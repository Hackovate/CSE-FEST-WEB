CSE FEST 2025 — Static Website

This folder contains a responsive, accessible, and animated static website for CSE FEST 2025 built with HTML, Bootstrap 5, AOS, and custom CSS/JS.

Files
- index.html — Main page
- style.css — Custom styles
- script.js — JS for animations, smooth scroll, and client-side validation
- assets/img — Image folder (place event images here)

Usage
1. Open `index.html` in your browser (double-click or open via your editor).
2. Replace placeholder images in the gallery and event cards by placing images in `assets/img` and updating the `src` attributes.

Notes
- The site uses external CDNs for Bootstrap and AOS. For offline use, replace CDN links with local copies.
- Forms are client-side validated and show simulated success messages. Hook them to a backend or email service to persist submissions.
- Replace the Google Maps iframe `src` in `index.html` with your venue coordinates if needed.

Event registration
- Event pages now link to a Google Form for registration. Replace the placeholder URL `https://forms.gle/REPLACE_WITH_YOUR_FORM` in each file under `events/` with your real Google Form link so users are sent to the live form.

Accessibility & Performance
- Images include alt text. Semantic HTML tags are used.
- Fonts use Google Fonts (Poppins & Roboto).
- Keep images optimized for fast loading.
