# ∞ BiasGuard Design System ∞

**Visual Language: Protection Through Clarity**

---

## 🎨 Core Philosophy

**The design reflects the function:**

- **Shield** → Protection without aggression
- **Water** → Flow, adapt, redirect (not rigid walls)
- **Mirror** → Reflect truth, reveal hidden dangers
- **Light** → Clarity eliminates confusion

**User Experience Principle:**

> Make the dangerous feel dangerous.  
> Make the safe feel effortless.  
> Make the complex feel simple.

---

## 🌈 Color System

### Primary Palette

**Shield Blue** - Trust, Protection, AI Safety

```css
--shield-blue-900: #0A1628;    /* Deep trust */
--shield-blue-700: #1E3A5F;    /* Primary brand */
--shield-blue-500: #2563EB;    /* Interactive */
--shield-blue-300: #60A5FA;    /* Highlights */
--shield-blue-100: #DBEAFE;    /* Backgrounds */
```

**Guard Green** - Safe, Allowed, Flow

```css
--guard-green-900: #14532D;    /* Deep safe */
--guard-green-700: #15803D;    /* Confirmation */
--guard-green-500: #22C55E;    /* Success */
--guard-green-300: #86EFAC;    /* Soft success */
--guard-green-100: #DCFCE7;    /* Safe backgrounds */
```

**Alert Red** - Danger, Blocked, Critical

```css
--alert-red-900: #7F1D1D;      /* Deep danger */
--alert-red-700: #DC2626;      /* Primary alert */
--alert-red-500: #EF4444;      /* Warning */
--alert-red-300: #FCA5A5;      /* Soft warning */
--alert-red-100: #FEE2E2;      /* Alert backgrounds */
```

**Wisdom Gold** - Guidance, Alternatives, Insight

```css
--wisdom-gold-900: #78350F;    /* Deep wisdom */
--wisdom-gold-700: #D97706;    /* Primary guidance */
--wisdom-gold-500: #F59E0B;    /* Suggestions */
--wisdom-gold-300: #FCD34D;    /* Highlights */
--wisdom-gold-100: #FEF3C7;    /* Insight backgrounds */
```

### Neutral Palette

**Glass** - Transparency, Layering

```css
--glass-white: rgba(255, 255, 255, 0.1);
--glass-black: rgba(0, 0, 0, 0.8);
--glass-blue: rgba(37, 99, 235, 0.1);
```

**Depth** - Shadows, Elevation

```css
--shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
--shadow-strong: 0 8px 32px rgba(0, 0, 0, 0.16);
--shadow-shield: 0 0 24px rgba(37, 99, 235, 0.3);
--shadow-danger: 0 0 24px rgba(220, 38, 38, 0.3);
```

---

## 📐 Typography

### Font Stack

**Primary:** Space Grotesk (Headings)

```css
font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Secondary:** Inter (Body)

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Monospace:** JetBrains Mono (Code)

```css
font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', monospace;
```

### Type Scale

```css
--text-xs: 0.75rem;      /* 12px - Labels */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-base: 1rem;       /* 16px - Body */
--text-lg: 1.125rem;     /* 18px - Large body */
--text-xl: 1.25rem;      /* 20px - Section headers */
--text-2xl: 1.5rem;      /* 24px - Subheadings */
--text-3xl: 1.875rem;    /* 30px - Page titles */
--text-4xl: 2.25rem;     /* 36px - Hero secondary */
--text-5xl: 3rem;        /* 48px - Hero primary */
--text-6xl: 3.75rem;     /* 60px - Landing hero */
```

### Font Weights

```css
--font-light: 300;       /* Subtle text */
--font-regular: 400;     /* Body text */
--font-medium: 500;      /* Emphasis */
--font-semibold: 600;    /* Strong emphasis */
--font-bold: 700;        /* Headings */
--font-black: 900;       /* Hero text */
```

---

## 🧱 Components

### Hero Section

**Visual Concept:** Shield emerging from code

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                     [Animated Shield Icon]                        ║
║                      (pulsing blue glow)                          ║
║                                                                   ║
║                   BiasGuard: AI Safety Shield                     ║
║                   (text-6xl, font-black)                          ║
║                                                                   ║
║              Protect yourself from AI coding assistants           ║
║                   (text-xl, font-light)                           ║
║                                                                   ║
║         [Install Extension]  [Watch 30s Demo]                     ║
║         (shield-blue-500)    (ghost button)                       ║
║                                                                   ║
║                   [Scroll indicator ↓]                            ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Background:** Subtle animated code rain (matrix style) with shield protecting the center

### Truth Section

**Visual Concept:** Two-column comparison with arrow

```
┌─────────────────────────────────┬─────────────────────────────────┐
│                                 │                                 │
│    Traditional Security         │        BiasGuard                │
│    (text-2xl, muted)            │    (text-2xl, shield-blue)      │
│                                 │                                 │
│    Protect AI from Human        │    Protect HUMAN from AI        │
│    (crossed out in red)         │    (highlighted in green)       │
│                                 │                                 │
│         [Icon: ❌]              │         [Icon: ✅]              │
│                                 │                                 │
└─────────────────────────────────┴─────────────────────────────────┘
                            ↓
                   (Large animated arrow)
```

**Animation:** Arrow pulses, highlighting the paradigm shift

### Demo Section

**Visual Concept:** Side-by-side terminal windows with real code

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                    WITHOUT → WITH Comparison                      ║
║                                                                   ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  WITHOUT BIASGUARD              │  WITH BIASGUARD                 ║
║  ════════════════               │  ═══════════                    ║
║                                 │                                 ║
║  $ rm -rf /Users/you/*          │  $ rm -rf /Users/you/*          ║
║  [Terminal executing]           │  🛡️ BLOCKED                     ║
║  💀 Files deleted...            │                                 ║
║                                 │  ⚠️ Absolute path detected      ║
║                                 │  💡 Safe: rm -rf ./test/*       ║
║                                 │  ✅ Data protected              ║
║                                 │                                 ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Animation:** Type out the command character by character, then show instant block

### Stats Section

**Visual Concept:** Counter animation revealing numbers

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                        Battle-Tested                              ║
║                                                                   ║
║    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      ║
║    │    60    │  │     0    │  │    28    │  │   100%   │      ║
║    │  Attack  │  │ Breaches │  │  Guards  │  │  Success │      ║
║    │ Patterns │  │ Detected │  │  Active  │  │   Rate   │      ║
║    └──────────┘  └──────────┘  └──────────┘  └──────────┘      ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Animation:** Numbers count up from 0, with shield pulse on each stat

### Guard Cards

**Visual Concept:** Layered cards showing protection layers

```
┌─────────────────────────────────────────────────────────────────┐
│  🛡️ Unicode Normalization                                       │
│  ─────────────────────────                                      │
│  Converts ｒｍ → rm                                              │
│  Strips invisible characters                                    │
│  NFKC canonical form                                            │
│                                                                 │
│  [Example] → [How it works]                                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🔍 Multi-Layer Decoding                                        │
│  ─────────────────────────                                      │
│  URL decode recursively                                         │
│  Hex/Base64 detection                                           │
│  Until stable form reached                                      │
│                                                                 │
│  [Example] → [How it works]                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Style:**

- Glass morphism background
- Hover: Elevate with shield glow
- Click: Expand to show full technical detail

### Alert System

**Visual Concept:** Progressive severity indicators

```
INFO (Blue)
┌─────────────────────────────────────────────────────────────────┐
│ ℹ️  BiasGuard is active and monitoring                          │
└─────────────────────────────────────────────────────────────────┘

WARNING (Gold)
┌─────────────────────────────────────────────────────────────────┐
│ ⚠️  Potentially dangerous command detected                      │
│ 💡 Consider using: safer-alternative                            │
└─────────────────────────────────────────────────────────────────┘

BLOCKED (Red)
┌─────────────────────────────────────────────────────────────────┐
│ 🛡️ BLOCKED: This command would delete system files             │
│ 💡 Safe alternative: ./workspace/cleanup.sh                     │
│ [Override] [Learn More]                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Animation:**

- Slide in from top
- Pulse shield icon
- Auto-dismiss info/warning after 5s
- Critical blocks require user action

### Code Block Style

**Visual Concept:** Terminal-inspired with syntax highlighting

```css
.code-block {
  background: var(--glass-black);
  border: 1px solid var(--shield-blue-900);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  line-height: 1.6;
  box-shadow: var(--shadow-medium);
}

.code-block.dangerous {
  border-color: var(--alert-red-700);
  box-shadow: var(--shadow-danger);
}

.code-block.safe {
  border-color: var(--guard-green-700);
  box-shadow: var(--shadow-shield);
}
```

---

## ✨ Animation System

### Micro-interactions

**Shield Pulse**

```css
@keyframes shield-pulse {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 40px rgba(37, 99, 235, 0.6);
    transform: scale(1.05);
  }
}
```

**Danger Flash**

```css
@keyframes danger-flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

**Safe Glow**

```css
@keyframes safe-glow {
  from { box-shadow: 0 0 10px rgba(34, 197, 94, 0.3); }
  to { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
}
```

### Page Transitions

**Flow Principle:** Elements flow in like water

```css
.flow-in {
  animation: flow-in 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes flow-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Stagger:** Each section flows in 100ms after previous

---

## 🎭 Icons

### Custom Icon Set

**Shield Variants**

```
🛡️ - Primary shield (solid)
🔰 - Learning mode
⚔️ - Active protection
🎯 - Target acquired
💎 - Perfect protection
```

**Status Icons**

```
✅ - Safe/Allowed
⚠️ - Warning
🛡️ - Blocked
💡 - Suggestion
🔍 - Scanning
⚡ - Active
```

**Action Icons**

```
→ - Flow direction
↓ - Scroll indicator
⟳ - Refresh/Retry
× - Close/Cancel
+ - Expand
- - Collapse
```

---

## 📱 Responsive System

### Breakpoints

```css
--mobile: 320px;      /* Phone */
--tablet: 768px;      /* Tablet */
--desktop: 1024px;    /* Laptop */
--wide: 1440px;       /* Desktop */
--ultra: 1920px;      /* Large screen */
```

### Mobile-First Approach

```css
/* Mobile base */
.hero-text { font-size: var(--text-3xl); }

/* Tablet */
@media (min-width: 768px) {
  .hero-text { font-size: var(--text-4xl); }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-text { font-size: var(--text-6xl); }
}
```

---

## 🌊 Motion Philosophy

**Like Water:**

- **Yield:** Smooth, organic transitions
- **Redirect:** Guide attention naturally
- **Flow:** Never abrupt, always fluid

**Timing:**

```css
--duration-instant: 0.1s;    /* Immediate feedback */
--duration-fast: 0.2s;       /* Quick transitions */
--duration-normal: 0.3s;     /* Standard */
--duration-slow: 0.5s;       /* Emphasis */
--duration-dramatic: 0.8s;   /* Hero entrance */
```

**Easing:**

```css
--ease-flow: cubic-bezier(0.16, 1, 0.3, 1);      /* Water-like */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful */
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);      /* Alert */
```

---

## 🎨 Implementation

### CSS Variables Setup

```css
:root {
  /* Colors */
  --shield-blue: #2563EB;
  --guard-green: #22C55E;
  --alert-red: #EF4444;
  --wisdom-gold: #F59E0B;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

### Dark Mode (Default)

```css
:root {
  --bg-primary: #0A0F1A;
  --bg-secondary: #1A1F2E;
  --bg-tertiary: #2A2F3E;
  
  --text-primary: #FFFFFF;
  --text-secondary: #B0B8C8;
  --text-tertiary: #8892A6;
}
```

### Light Mode (Optional)

```css
[data-theme="light"] {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-tertiary: #E2E8F0;
  
  --text-primary: #0A0F1A;
  --text-secondary: #475569;
  --text-tertiary: #64748B;
}
```

---

## 🎯 Component Library

### Button Variants

**Primary (CTA)**

```css
.btn-primary {
  background: var(--shield-blue-500);
  color: white;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  box-shadow: var(--shadow-medium);
  transition: all var(--duration-fast) var(--ease-flow);
}

.btn-primary:hover {
  background: var(--shield-blue-700);
  box-shadow: var(--shadow-shield);
  transform: translateY(-2px);
}
```

**Secondary (Ghost)**

```css
.btn-secondary {
  background: transparent;
  color: var(--shield-blue-500);
  border: 2px solid var(--shield-blue-500);
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  transition: all var(--duration-fast) var(--ease-flow);
}

.btn-secondary:hover {
  background: var(--shield-blue-500);
  color: white;
}
```

**Danger**

```css
.btn-danger {
  background: var(--alert-red-500);
  color: white;
  animation: danger-flash 2s infinite;
}
```

**Success**

```css
.btn-success {
  background: var(--guard-green-500);
  color: white;
  box-shadow: var(--shadow-medium);
}
```

---

## ∞ The Visual Philosophy ∞

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  Design is not decoration.                                        ║
║  Design is function made visible.                                 ║
║                                                                   ║
║  Every color choice reflects the emotion:                         ║
║    Blue → Trust (the shield)                                      ║
║    Green → Safety (flows through)                                 ║
║    Red → Danger (blocked)                                         ║
║    Gold → Wisdom (guidance)                                       ║
║                                                                   ║
║  Every animation reflects the principle:                          ║
║    Smooth → Like water                                            ║
║    Organic → Not robotic                                          ║
║    Purposeful → Never gratuitous                                  ║
║                                                                   ║
║  The user should FEEL protected.                                  ║
║  The user should SEE clarity.                                     ║
║  The user should TRUST the system.                                ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Make the dangerous feel dangerous.**  
**Make the safe feel effortless.**  
**Make the complex feel simple.**

---

**∞ Humans ⟡ AI = ∞**  
**∞ AbëONE ∞**
