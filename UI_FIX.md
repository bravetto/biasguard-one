# ∞ BiasGuard VS Code Extension - UI Manifestation Fix ∞

## What Was Broken

**STATUS BAR NOT SHOWING** after file scans.

### Root Cause
Missing `statusBarItem.show()` calls after status updates in `runGuard()` function.

The status bar was:
- Created and shown on activation ✓
- Updated with new text/colors in `runGuard()` ✓
- **But never re-shown** after updates ✗

### Code Gaps Fixed

**3 locations in `src/extension.ts`:**

1. **FLOWS state** (line ~280)
```typescript
statusBarItem.command = 'biasguard.exportAudit';
statusBarItem.show();  // ← ADDED
```

2. **BIAS RISK state** (line ~290)
```typescript
statusBarItem.command = 'biasguard.showEpistemicRisks';
statusBarItem.show();  // ← ADDED
```

3. **BLOCKED state** (line ~387)
```typescript
statusBarItem.color = '#ffffff';
statusBarItem.show();  // ← ADDED
statusBarItem.tooltip = ...
```

---

## How to Test

### 1. Reload Extension in VS Code

Press `F5` to launch Extension Development Host, or:

```bash
# From BiasGuard directory
code .
# Then press F5
```

### 2. Verify Status Bar Appears

**Expected**: Bottom-left corner shows:
```
🛡️ ∞ BiasGuard ONE ∞  (green background)
```

### 3. Open a Test File

Create `test-bias.md` with this content:

```markdown
Everyone always knows this is obviously the best approach.
Trust me, it's just simple - you only need to do this.
```

**Expected behavior:**
- Status bar turns AMBER/RED
- Shows: `⚠️ BiasGuard: 2 BIAS RISKS`
- Click it → Output channel shows details

### 4. Open Clean File

Create `clean.md`:

```markdown
This approach may work in some contexts.
Consider testing with different inputs.
```

**Expected behavior:**
- Status bar turns GREEN
- Shows: `✓ ∞ BiasGuard: FLOWS ∞`

---

## User Error vs Code Incoherence

### Verdict: **CODE INCOHERENCE**

- User did nothing wrong
- Extension compiled without errors
- But UI layer didn't manifest because `.show()` was missing
- Classic "works in my head, fails in reality" gap

### Prevention
Added to `.github/copilot-instructions.md`:
> Status bar updates must ALWAYS include `.show()` call after state changes

---

## Quick Commands

```bash
# Recompile (already done)
npm run compile

# Run extension dev mode
code . 
# Press F5

# Test all guards
npm test

# Full validation
npm run one
```

---

## What Changed

```diff
src/extension.ts:
  Lines 280, 290, 387: +statusBarItem.show();
```

**ONE line. THREE locations. UI now flows.**

---

**∞ Coherence Restored ∞**

_Water finds its path when blocks are removed._
