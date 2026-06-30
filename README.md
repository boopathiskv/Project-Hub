# 🚀 Project Hub — Premium Static Dashboard

> A stunning, enterprise-grade single-page **Project Hub** for showcasing all my hosted static websites — built with **only HTML5, CSS3, and Vanilla JavaScript (ES2024+)**. No frameworks. No libraries. No build tools.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge)

---

## 📖 Overview

**Project Hub** is a premium, production-ready single-page dashboard that serves as the central homepage for all my static websites, UI experiments, tools, and landing pages. Inspired by the design language of **Vercel, Apple, Stripe, and Linear**, it delivers a polished, glassmorphic UI with smooth animations, dark/light mode, dynamic counters, live search & filters, and an enterprise-level workflow card — all in just **three files**.

---

## ✨ Features

### 🎨 Design & UX
- 🌗 **Dark / Light mode** — persisted to `localStorage` with system preference fallback
- 🪟 **Glassmorphism** — backdrop blur on nav, cards, badges
- 🌈 **Modern gradients** — premium brand palette (violet → cyan → pink)
- 📱 **Mobile-first responsive** — fluid layouts with CSS Grid & Flexbox
- ✨ **Smooth CSS animations** — easing curves, floating blobs, shimmer effects
- 🎯 **Sticky navigation** — translucent glass header
- 📜 **Smooth scrolling** — native CSS + JS smooth anchor scrolling
- 📊 **Scroll progress bar** — gradient indicator tied to scroll position
- ⬆️ **Back-to-top button** — appears after 600px scroll
- 👁️ **Reveal animations** — IntersectionObserver-driven fade-in on scroll
- ⏳ **Loading animation** — gradient orb intro screen

### 🔍 Functionality
- 🔎 **Live search** — debounced, searches title, description, category, tech stack
- 🏷️ **Category filters** — All, HTML, CSS, JavaScript, UI, Landing Pages, Dashboards, Tools
- 🔢 **Animated counters** — dynamically computed from the `projects[]` array
- ⭐ **Featured projects** — auto-filtered showcase section
- 💼 **Enterprise workflow card** — 5-step delivery process with status badges

### ♿ Quality
- 🎯 **SEO-friendly** — semantic HTML5, Open Graph meta tags, descriptive structure
- ♿ **WCAG accessible** — ARIA labels, focus rings, semantic landmarks, `prefers-reduced-motion` support
- ⚡ **Blazing fast** — zero external assets, zero network requests, inline SVG icons
- 🧩 **Modular code** — clean, well-commented, production-ready

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 (semantic) |
| **Styling** | CSS3 (variables, Grid, Flexbox, gradients, `backdrop-filter`) |
| **Logic** | Vanilla JavaScript (ES2024+) |
| **Icons** | Inline SVG (no icon fonts) |
| **Images** | Pure CSS gradient placeholders (no image files) |
| **Build tools** | None |
| **Dependencies** | None |

---

## 📁 File Structure

```
project-hub/
├── index.html      # Semantic markup & structure
├── style.css       # All styling, theming, animations
├── script.js       # Logic, data, dynamic rendering
└── README.md       # This file
```

> Just **3 source files**. No `node_modules/`, no `dist/`, no `package.json`. Pure web platform.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/boopathiskv/Project-Hub
cd project-hub
```

### 2. Open in browser

Simply open `index.html` in any modern browser. **No build step required.**

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

### 3. (Optional) Run a local server

For best results with `localStorage` and smooth scrolling:

```bash
# Python 3
python -m http.server 8000

# Node.js (with npx)
npx serve

# Then open http://localhost:8000
```

---

## 🎯 Customization

### Adding a new project

Open `script.js` and append a new object to the `projects[]` array:

```javascript
const projects = [
  // ... existing projects
  {
    title: 'My New App',
    description: 'A short, compelling description of the project.',
    category: 'Tools',                    // Must match a CATEGORIES entry
    tech: ['HTML', 'CSS', 'JS'],          // Array of tech badges
    live: 'https://my-app.example.com',   // Live demo URL
    github: 'https://github.com/.../repo',// Optional source URL ('' to hide)
    featured: true,                       // Show in Featured section
    gradient: 'linear-gradient(135deg,#7c5cff,#00d4ff)', // Preview background
  },
];
```

> The **counters automatically recalculate** — Total Projects, Categories, and Technologies update on next refresh.

### Changing categories

Edit the `CATEGORIES` array in `script.js`:

```javascript
const CATEGORIES = ['All', 'HTML', 'CSS', 'JavaScript', 'UI', 'Landing Pages', 'Dashboards', 'Tools'];
```

### Changing brand colors

Edit the CSS variables in `style.css` under `:root`:

```css
:root {
  --grad-primary: linear-gradient(135deg, #7c5cff 0%, #00d4ff 50%, #ff5ca8 100%);
  --accent:       #7c5cff;
  --accent-2:     #00d4ff;
}
```

---

## 📦 Project Data Structure

Each project follows this schema:

```javascript
{
  title:       string,    // Project name
  description: string,    // Short tagline (1–2 sentences)
  category:    string,    // One of CATEGORIES
  tech:        string[],  // Tech badges
  live:        string,    // Live demo URL
  github:      string,    // GitHub URL (optional, '' hides button)
  featured:    boolean,   // Show in Featured section
  gradient:    string,    // CSS gradient for preview placeholder
}
```

---

## 💼 Delivery Workflow

The enterprise workflow card showcases my real **end-to-end process** from concept to production:

| Step | Stage | Description |
|------|-------|-------------|
| **01** | 💡 **Ideation** | Define scope & requirements |
| **02** | ✨ **AI-Assisted Prompting** | Architect solutions with AI tooling |
| **03** | ⚡ **Engineering** | Production-grade implementation |
| **04** | ✅ **Quality Assurance** | Cross-browser & accessibility testing |
| **05** | 🚀 **Deployment** | CI/CD to production hosting |

---

## 🌐 Browser Support

| Browser | Version |
|---|---|
| Chrome / Edge | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Opera | ✅ 76+ |
| Mobile Safari | ✅ iOS 14+ |
| Chrome Android | ✅ Latest |

> Uses modern features: CSS `backdrop-filter`, `aspect-ratio`, `:focus-visible`, ES2024 syntax, `IntersectionObserver`.

---

## ♿ Accessibility

- ✅ Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ ARIA labels on interactive elements
- ✅ Visible focus rings via `:focus-visible`
- ✅ Keyboard navigation throughout
- ✅ `prefers-reduced-motion` respected (animations disabled)
- ✅ Sufficient color contrast in both themes
- ✅ Screen-reader-friendly hidden decorative elements (`aria-hidden="true"`)

---

## ⚡ Performance

- 🚀 **Zero external requests** — no fonts, CDNs, images, or analytics
- 📦 **Tiny footprint** — ~30KB total (HTML + CSS + JS, uncompressed)
- 🎨 **GPU-accelerated** animations using `transform` and `opacity`
- 🧠 **Debounced search** — input handler throttled to 180ms
- 👁️ **IntersectionObserver** — efficient scroll-driven reveals
- 🌀 **`requestAnimationFrame`** counters with easeOutCubic interpolation

---

## 🗺️ Roadmap

- [ ] Project detail modal with screenshots
- [ ] Multi-tag filtering (combine category + tech)
- [ ] JSON-driven config for non-technical edits
- [ ] PWA support with offline cache
- [ ] Optional analytics-free visitor counter

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

```
MIT License © Boopathi Subramanian
```

---

## 👤 Author

**Boopathi Subramanian**
📍 Bengaluru, India
🌐 Crafting polished web experiences with care & intent.

---

## 🙌 Acknowledgments

Design inspiration from:
- [Vercel](https://vercel.com) — clean dashboards
- [Apple](https://apple.com) — typography & spacing
- [Stripe](https://stripe.com) — gradients & motion
- [Linear](https://linear.app) — premium minimalism

---

<div align="center">

⭐ **If you find this useful, please star the repository!**

Made with ❤️ and ☕ in Bengaluru

</div>
