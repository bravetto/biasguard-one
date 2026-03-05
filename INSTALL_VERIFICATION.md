# BiasGuard 4.2.5 - Installation Verification Protocol

**Purpose**: Verify that `biasguard-4.2.5-production.vsix` installs correctly and functions as expected in a clean VS Code instance.

**Build Info**:
- Version: 4.2.5
- Package Size: 256.1 KB
- Files: 150
- Build Date: 2026-01-16
- Package Name: `biasguard-4.2.5-production.vsix`

---

## ✅ Pre-Installation Checklist

Before installing, verify:

- [ ] **VS Code Version**: 1.85.0 or higher
  ```bash
  code --version
  ```
  Expected: `1.85.0` or greater

- [ ] **VSIX File Present**:
  ```bash
  ls -lh biasguard-4.2.5-production.vsix
  ```
  Expected: `~256 KB` file exists

- [ ] **Clean Test Environment** (Optional but recommended):
  - Use VS Code profile switcher or fresh installation
  - Disable other security/linting extensions temporarily

---

## 🚀 Installation Procedure

### Method 1: Drag and Drop (Recommended)

1. Open VS Code
2. Drag `biasguard-4.2.5-production.vsix` from file explorer onto VS Code window
3. Click "Install" in the prompt
4. Wait for installation to complete (~5-10 seconds)
5. **Do NOT reload** yet - proceed to verification

### Method 2: Command Palette

1. Open VS Code
2. Press `Cmd/Ctrl + Shift + P` to open Command Palette
3. Type: `Extensions: Install from VSIX...`
4. Navigate to and select `biasguard-4.2.5-production.vsix`
5. Click "Install"
6. **Do NOT reload** yet - proceed to verification

### Method 3: Terminal

```bash
code --install-extension biasguard-4.2.5-production.vsix
```

Expected output:
```
Installing extension 'biasguard-4.2.5-production.vsix'...
Extension 'biasguard.biasguard-4-2' v4.2.5 was successfully installed.
```

---

## 🔍 Post-Installation Verification

### Phase 1: Extension Activation

**After installation, reload VS Code:**

1. Click "Reload Now" button, OR
2. Run command: `Developer: Reload Window`

**Verify activation:**

- [ ] **Status Bar Indicator Appears**:
  - Look at **bottom-left** of VS Code window
  - Expected: **"✓ BiasGuard: FLOWS"** with green background

  **Screenshot Location**: (Take screenshot and attach)

  If **NOT visible**:
  - Check if status bar is hidden: `View → Appearance → Show Status Bar`
  - Check Output panel: `View → Output → Select "BiasGuard ONE"`

### Phase 2: Command Registration

**Verify all commands are available:**

Open Command Palette (`Cmd/Ctrl + Shift + P`) and type `BiasGuard`:

- [ ] **"BiasGuard: Scan File for Bias Risks"** - appears in list
- [ ] **"BiasGuard: Show Epistemic Risks"** - appears in list
- [ ] **"BiasGuard ONE: Export Audit Log"** - appears in list

Type `PRISTINE`:

- [ ] **"PRISTINE: Execute Protocol"** - appears in list
- [ ] **"PRISTINE: Reinforce Shields (.ignore)"** - appears in list

**Total Commands Expected**: 5

### Phase 3: Functional Testing

#### Test 1: Epistemic Bias Detection

Create a test file with intentional bias patterns:

**File**: `test-bias.ts`

```typescript
// Test Case 1: Absence of Constraints
function processUser(user) {
  return user.name.toUpperCase();
}

// Test Case 2: Success Path Only
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

// Test Case 3: Missing Counter-Case
const users = getUsers();
const firstUser = users[0];
console.log(firstUser.email);
```

**Expected Behavior**:

- [ ] Status bar changes from **"FLOWS"** to **"⚠ BiasGuard: N Bias Risks"**
- [ ] Status bar background turns **amber/yellow**
- [ ] Red/yellow squiggly underlines appear in code
- [ ] Hovering over underlines shows bias details

**Run Manual Scan**:

1. With `test-bias.ts` open, run command: `BiasGuard: Scan File for Bias Risks`
2. Output channel opens automatically
3. Expected output:

```
═══════════════════════════════════════════
  ⚠️  EPISTEMIC BIAS SCAN RESULTS ⚠️
═══════════════════════════════════════════

📁 File: test-bias.ts
📊 Status: ⚠️  RISKS DETECTED (3)

[1] Absence of Constraints (High Severity)
[2] Success Path Only (Medium Severity)
[3] Missing Counter-Case (High Severity)
```

- [ ] **3 risks detected** (verify count)
- [ ] **2 High Severity** risks
- [ ] **1 Medium Severity** risk
- [ ] Each risk shows: Assumption, Risk, and Suggested Question

#### Test 2: Clean Code (No Risks)

Create a clean test file:

**File**: `test-clean.ts`

```typescript
// Clean code with explicit handling
function processUser(user: { name: string } | null): string {
  if (!user || typeof user.name !== 'string') {
    throw new Error('Invalid user object');
  }
  return user.name.toUpperCase();
}

async function fetchData(): Promise<any> {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

const users = getUsers();
if (users.length === 0) {
  throw new Error('No users available');
}
const firstUser = users[0];
console.log(firstUser.email);
```

**Expected Behavior**:

- [ ] Status bar shows **"✓ BiasGuard: FLOWS"** (green)
- [ ] No underlines or warnings
- [ ] Manual scan reports: `✅ No epistemic bias risks detected`

#### Test 3: Audit Log Export

1. Run command: `BiasGuard ONE: Export Audit Log`
2. Output channel opens with JSON audit trail

**Expected Output**:

```json
{
  "events": [],
  "summary": {
    "total": 0,
    "blocked": 0,
    "allowed": 0
  }
}
```

- [ ] Valid JSON structure
- [ ] Contains audit events (if any files were scanned)

#### Test 4: PRISTINE Protocol (Optional)

1. Open any workspace folder
2. Run command: `PRISTINE: Reinforce Shields (.ignore)`
3. Expected:
   - [ ] Output shows: `✓ .gitignore reinforced`
   - [ ] Output shows: `✓ .cursorignore reinforced`
   - [ ] Notification: "Shields Holding. (.gitignore / .cursorignore updated) ∞"

---

## 🐛 Troubleshooting

### Issue: Extension Not Activating

**Symptoms**:
- No status bar indicator
- Commands not appearing
- No output in "BiasGuard ONE" channel

**Diagnosis**:

1. Check extension is installed:
   - Open `Extensions` panel (`Cmd/Ctrl + Shift + X`)
   - Search for "BiasGuard"
   - Verify version 4.2.5 is listed and **enabled**

2. Check for activation errors:
   - Open: `Help → Toggle Developer Tools`
   - Go to `Console` tab
   - Look for errors mentioning "biasguard" or "extension"

3. Check VS Code version compatibility:
   ```bash
   code --version
   ```
   Must be ≥ 1.85.0

**Solutions**:

- **Reload VS Code**: `Developer: Reload Window`
- **Reinstall Extension**:
  1. Uninstall from Extensions panel
  2. Restart VS Code completely
  3. Reinstall from VSIX
- **Check logs**:
  - `View → Output → BiasGuard ONE` (if it appears)
  - `Help → Toggle Developer Tools → Console`

### Issue: Status Bar Not Visible

**Symptoms**:
- Extension installed
- Commands work
- But no status bar indicator

**Solution**:

- Enable status bar: `View → Appearance → Show Status Bar`
- Status bar item is on **left side** (not right)
- If still missing, check Theme compatibility (try default theme)

### Issue: False Positives

**Symptoms**:
- Code you believe is safe triggers warnings

**Expected Behavior**:
BiasGuard detects **patterns**, not correctness. Some false positives are expected.

**Solutions**:

1. **Add clarifying comments** to document why code is safe
2. **Refactor to be explicit** if the assumption is hidden
3. **Accept the warning** as documentation for future maintainers

See USER_GUIDE.md → Troubleshooting → False Positives for examples.

---

## 📊 Verification Report Template

**Date**: _______________
**Tester**: _______________
**VS Code Version**: _______________
**OS**: _______________

### Installation

- [ ] VSIX file verified (256.1 KB)
- [ ] Installation completed without errors
- [ ] Extension appears in Extensions list

### Activation

- [ ] Status bar indicator appears ("FLOWS")
- [ ] All 5 commands registered
- [ ] Output channel "BiasGuard ONE" available

### Functional Tests

- [ ] **Test 1 (Bias Detection)**: PASS / FAIL
  - Detected 3 risks in test-bias.ts: ☐
  - Status bar updated to warning: ☐
  - Diagnostics shown in editor: ☐

- [ ] **Test 2 (Clean Code)**: PASS / FAIL
  - Status shows FLOWS for clean code: ☐
  - No false positives: ☐

- [ ] **Test 3 (Audit Export)**: PASS / FAIL
  - Valid JSON output: ☐

- [ ] **Test 4 (PRISTINE)**: PASS / FAIL / SKIPPED
  - .gitignore updated: ☐
  - .cursorignore updated: ☐

### Overall Result

**PASS** ☐ | **FAIL** ☐

**Notes**:
```
[Any issues, observations, or special circumstances]
```

---

## ✅ Final Checklist

Before declaring installation verified:

- [ ] Extension installs without errors
- [ ] All 5 commands are available
- [ ] Status bar indicator functions correctly
- [ ] Epistemic bias detection works on test cases
- [ ] Clean code shows FLOWS status
- [ ] Audit log exports successfully
- [ ] No console errors in Developer Tools
- [ ] Documentation (USER_GUIDE.md) is accessible

**If all checkboxes are ticked**: ✅ **INSTALLATION VERIFIED**

**If any fail**: ⚠️ **INSTALLATION ISSUES DETECTED** - Review Troubleshooting section

---

## 📝 Verification Log

Document each installation test:

```
Date: 2026-01-16
Version: 4.2.5 Production
Tester: [Name]
Environment: VS Code 1.85.0 / macOS 14.0
Result: PASS ✅

Notes: All functional tests passed. No console errors. Status bar 
indicator visible immediately after reload. Bias detection working 
as expected on both test cases.
```

---

## 🔐 Security Verification

### Code Integrity

Verify the VSIX hasn't been tampered with:

```bash
# Check file size
ls -lh biasguard-4.2.5-production.vsix
# Expected: ~256 KB

# Inspect contents (optional)
unzip -l biasguard-4.2.5-production.vsix | head -20
```

Expected files:
- `extension/package.json`
- `extension/out/src/extension.js`
- `extension/readme.md`
- No unexpected `.exe`, `.sh`, or obfuscated files

### Privacy Check

BiasGuard makes **zero network requests**:

1. Install extension
2. Open Developer Tools: `Help → Toggle Developer Tools`
3. Go to `Network` tab
4. Scan files and use features
5. **Expected**: No outbound HTTP requests from BiasGuard

**Verified**: ☐ No network activity detected

---

## 🎯 Success Criteria Summary

Extension is production-ready if:

1. ✅ Installs cleanly in fresh VS Code instance
2. ✅ All 5 commands register successfully
3. ✅ Status bar indicator appears and updates correctly
4. ✅ Epistemic bias detection finds known patterns
5. ✅ Clean code produces FLOWS status (no false positives on simple cases)
6. ✅ Audit log exports valid JSON
7. ✅ No console errors during normal operation
8. ✅ No unexpected network activity

**If all criteria met**: 🚢 **READY TO SHIP**

---

∞ AbëONE ∞

*Like water flows, protection adapts. Verification ensures the current is clear.*
