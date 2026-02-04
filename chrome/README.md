# ∞ BiasGuard Chrome Extension ∞

**Real-time bias detection for the web.**

For the 98.6% who aren't coders.

---

## What It Does

BiasGuard Chrome runs **in real-time** on every webpage you visit, detecting:

- **Cognitive biases** (21 patterns) - Halo Effect, Attribution Error, Automation Bias
- **Logical fallacies** (23 patterns) - Ad Hominem, Straw Man, False Dichotomy
- **Implicit bias** (7 patterns) - Microaggressions, coded language
- **Workplace bias** (14 patterns) - Affinity Bias, Maternal Wall, Name Bias
- **Research bias** (15 patterns) - Survivorship, Algorithmic, Proxy Discrimination

**87 patterns across 12 guards. All reflected, not blocked.**

---

## Why It Exists

**2016:** Post-truth crystallized. Pizzagate. Snopes debates. Facebook polarization. Epstein conspiracies. Arguments about whether fact-checkers were biased became more intense than the facts themselves.

**98.6% of humanity** experienced this through **BROWSERS**, not code editors.

**BiasGuard Chrome is the antidote.**

---

## How It Works

### 1. Install
Load the extension in Chrome (Developer Mode → Load Unpacked → select `chrome/` folder)

### 2. Browse Normally
BiasGuard watches in the background. No configuration needed.

### 3. See Bias Reflected
Detected patterns are **highlighted** on the page with subtle underlines.

### 4. Click to Understand
Click any highlight to see:
- **What was detected** - Specific bias patterns
- **Why it matters** - Real-world harm potential
- **How to interpret** - Context for the finding

### 5. Choose Your Response
BiasGuard doesn't block. It **mirrors**. You decide what to believe.

---

## Architecture

```
Web Page
    ↓
Content Script (content.ts)
    ↓
ONE Validation Engine (src/one.ts)
    ↓
12 Guards × 87 Patterns
    ↓
Bias Score (0-100)
    ↓
Sidebar Reflection
    ↓
User Chooses
```

**Same ONE source as VS Code extension. Same guards. Same scoring.**

---

## Build & Deploy

```bash
# Install dependencies
cd chrome
npm install

# Build TypeScript
npm run build

# Load in Chrome
1. Open chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select chrome/ folder

# Package for distribution
npm run package
```

---

## Files

```
chrome/
├── manifest.json           # Extension manifest (Manifest V3)
├── popup.html              # Popup UI
├── src/
│   ├── content.ts          # Content script (injected into pages)
│   ├── background.ts       # Service worker
│   ├── popup.ts            # Popup logic
├── styles/
│   ├── content.css         # Page highlight styles
│   ├── popup.css           # Popup styles
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
└── dist/                   # Compiled output
```

---

## The Mission

**For the teenager** who can't tell if a news article is real.

**For the parent** who doesn't know if their kid's "research" is propaganda.

**For the worker** getting biased performance reviews.

**For the patient** facing algorithmic discrimination.

**For everyone** drowning in post-truth polarization.

---

## Philosophy

BiasGuard is not an authority. It is a mirror.

Everything it sees, you can inspect.

BiasGuard doesn't block. It **reflects**.

BiasGuard doesn't judge. It **transforms awareness**.

---

**∞ LOVE = LIFE = ONE ∞**
