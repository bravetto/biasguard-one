# ∞ BiasGuard Chrome Extension - Development Guide ∞

## Quick Start

```bash
# From project root
cd chrome

# Install dependencies
npm install

# Build extension
npm run build

# Load in Chrome
1. Open chrome://extensions/
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `chrome/` directory

# See it work
1. Browse to any news site (CNN, Fox News, NYT)
2. Bias patterns will be highlighted in real-time
3. Click highlights to see detailed analysis
4. Check the extension icon for stats
```

---

## Architecture Flow

### Content Script (`content.ts`)
**Runs on every webpage**

```typescript
Page Load
    ↓
MutationObserver watches DOM
    ↓
Detects text content (> 20 chars)
    ↓
Passes to ONE validation
    ↓
Highlights detected patterns
    ↓
User clicks → Sidebar opens
```

### Background Service Worker (`background.ts`)
**Coordinates state & stats**

- Maintains detection statistics
- Updates badge count
- Handles enable/disable
- Persists settings

### Popup (`popup.ts`)
**User controls**

- Shows stats (scans, detections, severity)
- Toggle protection on/off
- Manual scan trigger
- Links to settings & about

---

## Key Implementation Details

### 1. Real-Time Detection

Uses `MutationObserver` to catch dynamically loaded content:

```typescript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // Scan new nodes as they appear
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

### 2. Batch Scanning

Scans in small batches to avoid blocking the main thread:

```typescript
function batchScan(nodes: Node[], index: number): void {
  const BATCH_SIZE = 10;
  const end = Math.min(index + BATCH_SIZE, nodes.length);
  
  // Scan batch...
  
  // Schedule next batch
  if (end < nodes.length) {
    setTimeout(() => batchScan(nodes, end), 100);
  }
}
```

### 3. ONE Integration

**Same validation engine as VS Code extension:**

```typescript
import { one } from '../../src/one';

const result = one(text, 'chrome');

if (!result.clear) {
  highlightBias(element, result);
}
```

**No code duplication. ONE source. ONE truth.**

### 4. Highlighting Strategy

```typescript
// Add visual indicator
element.classList.add('biasguard-detected');
element.setAttribute('data-biasguard-score', score.toString());

// Add click handler
element.addEventListener('click', (e) => {
  e.preventDefault();
  showDetailsSidebar(result);
});
```

### 5. Sidebar Presentation

```typescript
function showDetails(element: HTMLElement, result: any): void {
  // Create sidebar with:
  // - Bias score (0-100)
  // - Severity level (LOW/MEDIUM/HIGH/CRITICAL)
  // - What was detected
  // - Why it matters
  // - Suggested interpretation
}
```

---

## Performance Considerations

### Memory Management
- Clear highlights on disable
- Remove listeners on cleanup
- Limit stored highlights to 100 max

### CPU Throttling
- Batch scan (10 nodes per batch)
- 100ms delay between batches
- Skip short text (< 20 chars)
- Skip script/style tags

### Network
- **Zero network requests**
- All processing happens locally
- No telemetry, no tracking
- Complete privacy

---

## Testing Strategy

### Test Sites (2016 Post-Truth Battlefield)

1. **Facebook** - Original polarization ground zero
   - Check posts, comments, shared articles
   - Test on inflammatory political content

2. **Twitter/X** - Real-time information warfare
   - Scan tweets with strong framing
   - Test thread detection

3. **News Sites**
   - CNN, Fox News, NYT, Breitbart
   - Compare how same story is framed
   - Detect editorial bias patterns

4. **Reddit** - Community-driven narratives
   - r/politics, r/conservative, r/news
   - Comment thread analysis

5. **YouTube** - Video descriptions & comments
   - Check conspiracy theory videos
   - Test transcript scanning

### Test Patterns to Verify

- [ ] Absolutes ("everyone", "always", "never")
- [ ] Trust assertions ("believe me", "trust me")
- [ ] Reframing ("actually means", "technically")
- [ ] Attribution bias (character vs. situation)
- [ ] Halo effect (one trait → all traits)
- [ ] False dichotomy ("either/or")
- [ ] Ad hominem attacks
- [ ] Straw man arguments

---

## Build & Package

### Development Build
```bash
npm run build
# Creates dist/ with compiled JS
```

### Production Package
```bash
npm run package
# Creates ../dist/chrome/biasguard-chrome-1.0.0.zip
# Ready for Chrome Web Store upload
```

### Manual Package
```bash
# From chrome/ directory
zip -r biasguard-chrome.zip \
  manifest.json \
  popup.html \
  dist/ \
  styles/ \
  icons/ \
  -x "*/.*" -x "*.map"
```

---

## Chrome Web Store Submission

### Required Assets

1. **Icon** (3 sizes)
   - 16x16, 48x48, 128x128
   - PNG format, transparent background
   - Shield emoji → PNG conversion

2. **Screenshots** (at least 1)
   - 1280x800 or 640x400
   - Show detection in action
   - Sidebar with explanation

3. **Promo Image** (440x280)
   - Featured listing graphic
   - Shield + tagline

4. **Description**
```
BiasGuard: Real-time bias detection for the web.

Detects cognitive biases, logical fallacies, and manipulation patterns
in articles, social media, and web content as you browse.

87 patterns. 12 guards. Complete transparency.

BiasGuard is not an authority. It is a mirror.
```

### Privacy Policy

```
BiasGuard makes zero network requests.
All analysis happens locally in your browser.
No data is collected, stored, or transmitted.
No telemetry. No tracking. Complete privacy.
```

---

## Future Enhancements

### Phase 1 (MVP - Complete)
- [x] Real-time detection
- [x] Visual highlighting
- [x] Detail sidebar
- [x] Stats tracking
- [x] Enable/disable toggle

### Phase 2 (Coming Soon)
- [ ] Settings page (min score threshold, categories)
- [ ] Export detection report
- [ ] Keyboard shortcuts
- [ ] Dark/light theme
- [ ] Whitelist domains

### Phase 3 (Advanced)
- [ ] Browser action on specific domains
- [ ] Pattern trend analysis
- [ ] Compare framing across sources
- [ ] Suggest alternative phrasings
- [ ] Share detection examples

---

## The Mission Context

**Remember WHY this exists:**

Your grandmother arguing about vaccine misinformation on Facebook.

Your cousin down the QAnon rabbit hole on Reddit.

The teenager who can't tell if a news article is real.

The parent who doesn't know if their kid's "research" is propaganda.

**98.6% of humans aren't coders. They experience post-truth through browsers.**

**BiasGuard Chrome is their shield.**

---

**∞ LOVE = LIFE = ONE ∞**
