# Harsh Raj — Developer Portfolio

A premium, fully responsive personal portfolio built with **only HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build step.

## 🚀 Live Structure

```
portfolio/
│
├── index.html          # All page markup and sections
├── style.css            # Design tokens, layout, components, animations
├── script.js            # All interactivity (vanilla JS, no dependencies)
├── assets/
│   ├── images/           # Add project screenshots / profile photo here
│   ├── icons/             # Add any extra icon assets here
│   └── resume/
│       └── Harsh_Raj_Resume.pdf   # Replace with your real resume file
└── README.md
```

## ✨ Features

- Dark mode / light mode with a theme switcher (persists via `localStorage`)
- Sticky, scroll-aware navbar with active-section highlighting
- Mobile hamburger menu
- Scroll progress bar
- Custom animated cursor (desktop only)
- Canvas-based ambient particle background in the hero
- Typing animation cycling through taglines
- Signature "full-stack layer stack" hero visual with mouse parallax
- Animated skill progress bars and counters (Intersection Observer driven)
- Auto-scrolling testimonials carousel (pauses on hover)
- Client-side validated contact form (no backend — swap in your own endpoint)
- Ripple effect on buttons
- Scroll-to-top button
- Loading screen with animated progress bar
- Fully responsive: mobile, tablet, and desktop breakpoints
- Respects `prefers-reduced-motion`
- Semantic HTML, visible focus states, and alt/aria labeling for accessibility

## 🎨 Customization

All design tokens live at the top of `style.css` inside `:root`:

```css
--color-primary: #2563EB;
--color-secondary: #0F172A;
--color-accent: #38BDF8;
--color-bg: #020617;
```

Change these values to re-theme the entire site instantly.

### Updating content

- **Text & copy** — edit directly inside `index.html`.
- **Projects** — edit the `projects` array inside `script.js` (`initProjects()`), or convert the section back to static HTML if you prefer not to generate it via JS.
- **Resume** — replace `assets/resume/Harsh_Raj_Resume.pdf` with your actual resume (keep the same filename, or update the `href` in `index.html`).
- **Social links** — update the `href` attributes on the social icons in the hero and footer.
- **Contact form** — the form currently only validates and shows a confirmation message in the browser. To actually receive messages, connect it to a service like Formspree, EmailJS, or your own backend endpoint, and update the `fetch`/submit logic in `initContactForm()` inside `script.js`.

## 🖥️ Running locally

No build tools are required. Just open `index.html` in a browser, or serve the folder locally:

```bash
# Python 3
python -m http.server 8000

# Node (with the `serve` package)
npx serve .
```

Then visit `http://localhost:8000`.

## ☁️ Deployment

This project is static and can be deployed as-is to:

- **GitHub Pages** — push the folder to a repo and enable Pages on the `main` branch.
- **Vercel** — import the repo, no framework preset needed (root output directory).
- **Netlify** — drag-and-drop the folder or connect the repo; no build command required.

## ✅ Notes on performance & quality

- Images should be added as optimized `webp`/`jpg` files inside `assets/images/` and given `loading="lazy"` where they aren't above the fold.
- All animation is CSS/JS based (no external animation libraries) to keep the bundle minimal.
- Update the `<title>`, meta description, and Open Graph tags in `index.html` if you change branding.

---

Built with clean, modular, and well-commented code — ready to extend.