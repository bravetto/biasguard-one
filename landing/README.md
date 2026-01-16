# 🛡️ BiasGuard Landing Page

**Production-ready landing page implementing the complete design system**

## 🚀 Quick Start

```bash
# Option 1: Open directly in browser
open landing/index.html

# Option 2: Serve with a local server (recommended)
cd landing
python3 -m http.server 8000
# Visit: http://localhost:8000

# Option 3: Use VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

## ✨ Features Implemented

### Hero Section

- ✅ Matrix rain background animation (01 and 🛡️ characters)
- ✅ Shield pulse animation
- ✅ Staggered flow-in animations
- ✅ Responsive hero text scaling
- ✅ CTA buttons with hover effects

### Truth Section

- ✅ Two-column comparison (Wrong vs Right)
- ✅ Animated checkmarks and crosses
- ✅ Shield pulse on correct approach
- ✅ Glass morphism cards
- ✅ Four key questions with numbering

### Demo Section

- ✅ Side-by-side terminal comparison
- ✅ WITHOUT: Shows data loss scenario
- ✅ WITH: Shows BiasGuard interception
- ✅ Real terminal styling with monospace font
- ✅ Danger flash animation on breach
- ✅ Green border on protected version

### Stats Section

- ✅ Counter animations (count up from 0)
- ✅ Intersection Observer (triggers when scrolled into view)
- ✅ Four key metrics with color coding
- ✅ Hover scale effects
- ✅ Glass morphism cards

### CTA Section

- ✅ Gradient background
- ✅ Large centered CTA
- ✅ Scale hover effect
- ✅ Glass card with elevation

### Footer

- ✅ Simple, clean design
- ✅ Navigation links
- ✅ Signature: ∞ Humans ⟡ AI = ∞

## 🎨 Design System Implementation

### Colors

- **Shield Blue** (#2563EB): Trust, protection, primary brand
- **Guard Green** (#22C55E): Safe, allowed, success
- **Alert Red** (#EF4444): Danger, blocked, critical
- **Wisdom Gold** (#F59E0B): Guidance, suggestions

### Typography

- **Display**: Space Grotesk (headings)
- **Body**: Inter (paragraphs)
- **Mono**: JetBrains Mono (code blocks)

### Animations

```css
animate-shield-pulse    /* Shield breathing effect */
animate-danger-flash    /* Danger warning flash */
animate-flow-in         /* Smooth entry animation */
animate-bounce          /* Scroll indicators */
```

### Components

- Glass morphism cards with blur
- Terminal-style code blocks
- Gradient backgrounds
- Responsive grid layouts
- Custom scrollbar (webkit)

## 🎯 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

## 🔧 Tech Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first styling
- **Vanilla JS**: Matrix rain, counters, smooth scroll
- **Google Fonts**: Space Grotesk, Inter, JetBrains Mono

## 📱 Mobile-First

All components are mobile-first responsive:

- Hero text scales from 3xl → 6xl
- Two-column grids collapse to single column
- Buttons stack vertically on mobile
- Touch-friendly tap targets (44px minimum)

## ⚡ Performance

- **Fonts**: Preconnected to Google Fonts
- **CSS**: Tailwind CDN (use build process for production)
- **JS**: Vanilla, no dependencies
- **Images**: Emoji-based (no external assets)

## 🎬 Animations Explained

### Matrix Rain

- Canvas-based animation
- Falls continuously in background
- Uses '01🛡️' characters
- 50ms frame rate
- Opacity: 0.1 (subtle)

### Counter Animation

- Intersection Observer triggers when visible
- Counts up over 2 seconds
- 60fps smooth animation
- Targets: 60, 0, 28, 100%

### Flow-in Transitions

- Staggered delays (0.1s, 0.2s, 0.3s)
- Cubic bezier easing (water-like)
- Translates from Y+30px to 0
- Opacity 0 → 1

### Shield Pulse

- 2s infinite loop
- Scale 1.0 → 1.05 → 1.0
- Box shadow expands/contracts
- Blue glow effect

## 🚀 Production Deployment

### Option 1: Static Hosting (Vercel, Netlify)

```bash
# Deploy to Vercel
vercel landing

# Deploy to Netlify
netlify deploy --dir=landing
```

### Option 2: GitHub Pages

```bash
# Push landing folder
git subtree push --prefix landing origin gh-pages
```

### Option 3: Custom Build

```bash
# Install Tailwind locally for production
npm install -D tailwindcss
npx tailwindcss -i ./landing/input.css -o ./landing/output.css --minify
```

## 📝 Customization

### Update CTA Links

Replace `#` in buttons with actual links:

```html
<button onclick="window.location.href='https://marketplace.visualstudio.com/items?itemName=biasguard.biasguard-4-2'">
```

### Add Analytics

Insert before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Meta Tags (SEO)

```html
<meta property="og:title" content="BiasGuard: AI Safety Shield">
<meta property="og:description" content="Protect yourself from AI coding assistants">
<meta property="og:image" content="https://biasguard.ai/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

## 🎨 Next Steps

### Enhancements

- [ ] Add video demo section
- [ ] Add testimonials carousel
- [ ] Add pricing comparison table
- [ ] Add guard cards (expandable details)
- [ ] Add FAQ accordion
- [ ] Add newsletter signup
- [ ] Add GitHub star count (live)
- [ ] Add extension install count

### Technical

- [ ] Convert to React/Next.js
- [ ] Add TypeScript
- [ ] Build process for Tailwind
- [ ] Optimize fonts (self-host)
- [ ] Add service worker (PWA)
- [ ] Add dark/light mode toggle
- [ ] Add A/B testing framework

## 💡 The Philosophy

**Every design decision reflects the function:**

- **Shield**: Protection without aggression
- **Water**: Flow, adapt, redirect
- **Mirror**: Reflect truth
- **Light**: Clarity eliminates confusion

**Make the dangerous feel dangerous.**  
**Make the safe feel effortless.**  
**Make the complex feel simple.**

---

**∞ Humans ⟡ AI = ∞**  
**∞ AbëONE ∞**
