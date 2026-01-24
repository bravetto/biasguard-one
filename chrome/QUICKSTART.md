# ∞ BiasGuard Chrome Extension ∞

**Real-time bias detection for the web. For the 98.6%.**

---

## 🚀 Quick Start

```bash
cd chrome
./install.sh

# Then in Chrome:
# 1. chrome://extensions/
# 2. Enable "Developer mode"
# 3. "Load unpacked" → select chrome/dist/
```

**Test it:** Open `chrome/test.html` to verify all 87 patterns detect correctly.

---

## 📁 Structure

```
chrome/
├── manifest.json          # Chrome extension manifest (V3)
├── webpack.config.js      # Bundles ONE source → dist
├── install.sh             # One-command setup
├── test.html              # Local test page (all guards)
├── src/
│   ├── content.ts         # Page injection (MutationObserver)
│   ├── background.ts      # Stats & coordination
│   ├── popup.ts           # User controls
├── styles/
│   ├── content.css        # Highlight styles
│   ├── popup.css          # Popup styles
├── scripts/
│   ├── generate-icons.js  # Shield emoji → PNG
│   ├── test-detection.js  # Verify 87 patterns
├── dist/                  # Built extension (load this)
```

---

## 🏗️ Build System

**Webpack bundles ONE source without duplication:**

```javascript
resolve: {
  alias: {
    '@biasguard/one': '../packages/core/src/one.ts',
    '@biasguard/guards': '../src/guards',
  }
}
```

**ONE source. Multiple surfaces. Pure convergence.**

```bash
npm run build    # Production bundle
npm run watch    # Development mode
npm run package  # Create .zip for Chrome Web Store
```

---

## 🧪 Testing

### Local Test Page

```bash
open test.html
```

Tests all 12 guards:

- Truth (absolutes, trust assertions)
- Cognitive (attribution bias, halo effect)
- Fallacies (ad hominem, straw man)
- Workplace (affinity bias, maternal wall)
- Awareness (implicit bias, microaggressions)
- Research (survivorship, algorithmic)
- Context, Coherence, Trust, Token, Compliance, Creativity

### Real-World Testing

1. Facebook (original polarization ground zero)
2. Twitter/X (information warfare)
3. Fox News, CNN, NYT (editorial framing)
4. Reddit (r/politics, r/conspiracy)

---

## 🌊 The Flow

```
Web Page
    ↓
Content Script (content.ts)
    ↓
MutationObserver watches DOM
    ↓
Text (>20 chars) → ONE(text, 'chrome')
    ↓
87 Patterns × 12 Guards
    ↓
Detected? → Highlight with score
    ↓
User Clicks → Sidebar opens
    ↓
Shows: What detected | Why matters | Context
    ↓
User chooses response
```

---

## 🎯 The Mission

**2016:** Post-truth crystallized. Pizzagate. Snopes debates. Facebook polarization.

**98.6% of humanity** experienced this through **browsers**, not code editors.

**BiasGuard Chrome is the antidote.**

For the teenager who can't tell if news is real.
For the parent whose kid is down a rabbit hole.
For everyone drowning in manipulation.

**BiasGuard doesn't block. It mirrors.**

---

**∞ LOVE = LIFE = ONE ∞**
