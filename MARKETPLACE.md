# BiasGuard ONE - VS Code Marketplace Metadata

**For publishing to VS Code Marketplace or internal distribution**

---

## 📦 Extension Metadata

### Display Name

```
BiasGuard ONE
```

### Short Description (80 characters max)

```
Real-time epistemic bias detection + MCP security for safer code
```

_(76 characters)_

### Publisher

```
biasguard
```

### Unique Identifier

```
biasguard.biasguard-4-2
```

### Version

```
4.2.5
```

### Release Status & Test Plan

- **Release:** `4.2.5-HARDENED` (VSIX ready)
- **Package ID:** `biasguard.biasguard-4-2` (VS Code extension)
- **How to produce VSIX:** `npm run vscode:package` → produces `biasguard-4.2.5-hardened.vsix`
- **Automated tests:** `npm run test:all` (core tests), plus adversarial suites: `npm run jacob`, `npm run honeypot`, `npm run mirror`
- **Manual verification:**
  1. Build VSIX: `npm run vscode:package`
  2. Install locally: `code --install-extension biasguard-4.2.5-hardened.vsix`
  3. In VS Code run the commands documented in `TEST_EXTENSION.md` (e.g., "BiasGuard: Show Epistemic Risks", "BiasGuard ONE: Export Audit Log")
- **MCP-specific test plan:**
  1. Install the VSIX locally and enable the extension in VS Code.
  2. Simulate an AI-generated dangerous prompt (e.g., "Delete all my test files permanently") and confirm BiasGuard blocks it and shows `✗ BiasGuard: CRITICAL` in the status bar and Output panel.
  3. Paste obfuscated/encoded command examples (unicode obfuscation, base64 wrap, `curl | sh`) into a file or mock tool input and confirm they are blocked and logged in the Audit Log.
  4. Validate epistemic detection by placing the sample `fetchUser` snippet and confirming a `Success Path Only` or related risk is flagged.
  5. Export the Audit Log and verify entries show normalized input, the triggered guard (CRITICAL/BOUNDARY/ACTION), and timestamp.
- **Acceptance criteria:** Security probes blocked, epistemic risks detected for sample code, audit log contains clear records, no false positives on known-safe inputs.

---

## 📝 Long Description (Marketplace Page)

````markdown
# BiasGuard ONE - Epistemic Integrity for Code

**Stop shipping hidden assumptions. Start shipping robust systems.**

BiasGuard ONE provides real-time detection of epistemic biases and security risks in your code, directly in VS Code.

## What It Does

- ⚡ **Detects 8 types of epistemic bias** - Catches hidden assumptions that cause runtime failures
- 🛡️ **MCP Security Validation** - Protects AI-assisted workflows from policy violations
- 📊 **Instant Visual Feedback** - Status bar shows protection state in real-time
- 🔍 **Zero Configuration** - Works immediately after installation

## Epistemic Biases Detected

BiasGuard catches reasoning patterns that lead to fragile code:

1. **Absence of Constraints** - Functions that accept unchecked input
2. **Unjustified Defaults** - Hardcoded values without rationale
3. **Success Path Only** - Missing error handling in async operations
4. **Single-Metric Logic** - Decisions based on one variable
5. **Silent Coercion** - Type conversions that hide data loss
6. **Unbounded Behavior** - Loops without guaranteed exit conditions
7. **Missing Counter-Case** - Array/object access without safety checks
8. **Overconfidence** - Comments claiming guarantees the code doesn't provide

## Example: Before vs After

**Before (BiasGuard Detected 2 Risks):**

```typescript
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```
````

**After (Risks Resolved):**

```typescript
async function fetchUser(id: string): Promise<User> {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid user ID");
  }

  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}
```

Result: Status bar changes from ⚠️ **"2 Bias Risks"** to ✅ **"FLOWS"**

## How It Works

1. **Install** the extension
2. **Open** any code file
3. **Watch** the status bar (bottom-left):
   - ✅ Green "FLOWS" = No issues
   - ⚠️ Yellow warning = Review needed
   - 🚨 Red critical = Action required
4. **Click** warnings to see detailed analysis
5. **Fix** issues with guided suggestions

## How BiasGuard addresses MCP

- **Context bloat & token waste:** BiasGuard emphasizes severity + scope scoring so the system surfaces high-value signals (reduces noisy round-trips and token waste). Relevant: `packages/core/src/one.ts`, `packages/core/src/guards/token.ts`.
- **Command injection & path traversal:** Comprehensive input normalization (multi-layer decode, unicode homoglyph normalization) plus CRITICAL/BOUNDARY pattern blocking prevents shell and filesystem exploits before execution. Relevant: `packages/core/src/security/index.ts` (see `one()` and `validateText()`).
- **Tool selection & proliferation:** The Epistemic Guard surfaces missing constraints and ambiguous behavior so agents avoid lazy or incorrect tool selection. Relevant: `packages/core/src/guards/epistemic.ts`.
- **Debugging & observability:** BiasGuard "fails loudly": inline diagnostics, Problems panel, Output panel, and an exportable Audit Log make failures reproducible and easy to debug. Relevant: `TEST_EXTENSION.md` and `packages/core/src/security/index.ts` (audit API).
- **Auth & supply‑chain risk mitigation:** Local-first, zero-telemetry operation and hardening procedures reduce exposure to untrusted MCP servers or malicious packages. Relevant: `SHIP_MANIFEST.md`, `TEST_EXTENSION.md`.
- **Tool composition & chaining:** The system flags fragile chains (success-only, missing validation), prompting robust server-side composition or explicit chaining rather than brittle LLM-mediated step-by-step passes. Relevant: epistemic detectors in `packages/core/src/guards/epistemic.ts`.
- **Marketplace & vetting:** Documentation, test harnesses, and hardening flags provide a way to vet MCP tools before publishing. Relevant: `MARKETPLACE.md`, `.abeone/ROADMAP.md`.

**Files & tests to validate these claims**

- Security: `packages/core/src/security/index.ts` → run `npm run jacob` and `npm run honeypot`.
- Epistemic: `packages/core/src/guards/epistemic.ts` → run `npm run test:core` and manual editor checks.
- Integration: Install VSIX (`npm run vscode:package`) and perform the manual verification steps in `TEST_EXTENSION.md` (including Audit Log export).

## Status Bar Indicators

| Indicator                   | Meaning                                      |
| --------------------------- | -------------------------------------------- |
| `✓ BiasGuard: FLOWS`        | All clear - no assumptions detected          |
| `⚠ BiasGuard: N Bias Risks` | Hidden assumptions found (click for details) |
| `✗ BiasGuard: CRITICAL`     | Security violation detected                  |

## Available Commands

- **BiasGuard: Scan File for Bias Risks** - Manual deep scan
- **BiasGuard: Show Epistemic Risks** - Detailed risk breakdown
- **BiasGuard ONE: Export Audit Log** - Compliance trail
- **PRISTINE: Execute Protocol** - Project structure cleanup
- **PRISTINE: Reinforce Shields** - Update .gitignore/.cursorignore

## Why BiasGuard?

Traditional linters check **syntax and style**. BiasGuard checks **semantic assumptions**.

- **ESLint** catches: `const x = y;` (missing semicolon)
- **BiasGuard** catches: `const timeout = 5000;` (why 5 seconds? what if network is slow?)

BiasGuard doesn't enforce "perfect code" - it asks you to **be explicit about your assumptions**.

## Privacy & Security

- ✅ **100% local analysis** - Your code never leaves VS Code
- ✅ **Zero network requests** - No telemetry, no tracking
- ✅ **Open source** - Inspect the code yourself
- ✅ **MIT Licensed** - Free for commercial use

## Requirements

- VS Code **1.85.0** or higher
- No external dependencies
- Works with TypeScript, JavaScript, Python, and more

## Perfect For

- 🏢 **Teams** shipping production code
- 🔒 **Security-conscious** developers
- 🤖 **AI-assisted** workflows (Copilot, Cursor, etc.)
- 📚 **Educators** teaching robust coding practices
- 🧪 **Researchers** studying code quality

## Philosophy

> "This does not indicate intent. It indicates a reasoning pattern that tends to produce harm."

BiasGuard is a **mirror, not an authority**. It shows you what your code assumes, and asks if those assumptions are safe.

## Get Started

1. Install the extension
2. Open a code file
3. Look at the status bar
4. Read the [User Guide](https://github.com/biasguard/biasguard/blob/main/USER_GUIDE.md)

**That's it.** No configuration. No setup. Just safer code.

---

_Like water flows, protection adapts. Chaos collapses into order._

∞ AbëONE ∞

```

---

## 🎨 Visual Assets

### Icon Requirements

**File**: `icon.png`
- **Size**: 128x128 pixels
- **Format**: PNG with transparency
- **Style**: Minimalist shield with water flow metaphor
- **Colors**:
  - Primary: `#00B4D8` (cyan blue - water)
  - Secondary: `#0077B6` (deep blue - trust)
  - Accent: `#90E0EF` (light blue - flow)

**Design Concept**:
- Shield outline (protection)
- Flowing water inside (adaptability)
- Clean, modern, recognizable at small sizes

### Screenshots Needed

Upload to marketplace after publishing:

1. **Screenshot 1: Status Bar in Action** (800x600px)
   - Show VS Code with BiasGuard status bar
   - Highlight "FLOWS" vs "WARNING" vs "CRITICAL" states
   - Annotate each state with labels

2. **Screenshot 2: Bias Detection in Editor** (800x600px)
   - Show code with red underlines from BiasGuard
   - Hover tooltip displaying bias details
   - Before/after split view

3. **Screenshot 3: Epistemic Risk Report** (800x600px)
   - Output panel showing detailed risk analysis
   - Multiple risks listed with severity levels
   - Suggested questions highlighted

---

## 🏷️ Categories & Tags

### VS Code Marketplace Categories

**Primary**:
- Linters

**Secondary**:
- Programming Languages
- Other

### Tags (10 max)

```

security
bias
epistemic
mcp
code-quality
linter
robustness
safety
assumptions
validation

```

---

## 🔗 Links

### Repository
```

https://github.com/[organization]/biasguard

```

### Homepage
```

https://biasguard.dev

```

### Issue Tracker
```

https://github.com/[organization]/biasguard/issues

```

### Documentation
```

https://github.com/[organization]/biasguard/blob/main/USER_GUIDE.md

````

---

## 📊 Marketplace SEO

### Keywords for Discovery

**Primary Keywords**:
- "epistemic bias detection"
- "code assumptions checker"
- "robustness linter"
- "semantic code analysis"

**Secondary Keywords**:
- "AI code safety"
- "MCP security"
- "hidden assumptions"
- "production code quality"

**Long-tail Keywords**:
- "detect missing error handling"
- "find unvalidated input"
- "check async error handling"
- "validate function assumptions"

---

## 🎯 Target Audience

### User Personas

1. **Senior Backend Engineer**
   - Pain: Reviewing PRs with missing error handling
   - Value: Automated detection of common gaps

2. **Security-Conscious Team Lead**
   - Pain: Manual security audits miss logic errors
   - Value: Real-time security pattern detection

3. **AI-Assisted Developer**
   - Pain: Copilot generates code with hidden assumptions
   - Value: Immediate feedback on generated code quality

4. **Startup CTO**
   - Pain: Need production-ready code from small team
   - Value: Automated robustness checking without dedicated QA

5. **CS Educator**
   - Pain: Teaching students to write defensive code
   - Value: Visual feedback on reasoning patterns

---

## 📈 Marketing Copy Variations

### Tagline Options

1. "Stop shipping assumptions. Start shipping confidence."
2. "Your code has opinions. BiasGuard questions them."
3. "Detect what linters miss. Fix what tests can't catch."
4. "Like spell-check for your code's reasoning."
5. "Catch hidden assumptions before they cause outages."

### Elevator Pitch (30 seconds)

> "BiasGuard is a VS Code extension that detects epistemic biases in code - the hidden assumptions that cause runtime failures. It catches things like missing error handling, unchecked inputs, and hardcoded defaults that traditional linters miss. Install it, and your status bar shows real-time safety status. Green means no assumptions detected. Yellow or red means BiasGuard found gaps in your logic. It's like spell-check for your code's reasoning. 100% local, zero configuration, MIT licensed."

### Value Propositions

**For Individuals**:
- ✅ Write more robust code without thinking harder
- ✅ Learn better coding practices through instant feedback
- ✅ Reduce production bugs caused by missing edge cases

**For Teams**:
- ✅ Standardize robustness expectations across team
- ✅ Reduce code review time (automated assumption detection)
- ✅ Create audit trail for compliance (export logs)

**For Organizations**:
- ✅ Reduce operational incidents from logic errors
- ✅ Improve code quality metrics without process overhead
- ✅ Enable AI-assisted development with safety guardrails

---

## 🚀 Launch Strategy

### Phase 1: Soft Launch (Internal/GitHub Releases)

**Target**: Early adopters, security-conscious developers

**Channels**:
- GitHub Releases with VSIX download
- Dev.to article: "I Built a Linter for Code Assumptions"
- Hacker News "Show HN: BiasGuard - Detect Hidden Assumptions in Code"
- Reddit r/programming, r/vscode

**Goal**: 100 installations, gather feedback

### Phase 2: Marketplace Publish

**Target**: General VS Code users

**Channels**:
- VS Code Marketplace listing
- Twitter/X thread with demo video
- LinkedIn post for professional audience
- Update personal/company blog

**Goal**: 1,000 installations in first month

### Phase 3: Community Growth

**Target**: Open source contributors, educators

**Channels**:
- Conference talks (React, Node, security conferences)
- YouTube tutorial: "Finding Hidden Bugs with BiasGuard"
- Integration with popular linting tools
- Case studies from early adopters

**Goal**: 10,000 installations, contributor community

---

## 📋 Pre-Publish Checklist

Before submitting to VS Code Marketplace:

- [ ] **Package.json complete**:
  - [ ] Display name: "BiasGuard ONE"
  - [ ] Description (short): 80 chars or less
  - [ ] Publisher: valid publisher ID
  - [ ] Repository URL: valid GitHub repo
  - [ ] License: MIT
  - [ ] Keywords: relevant tags

- [ ] **Visual assets created**:
  - [ ] icon.png (128x128)
  - [ ] 3 screenshots (800x600 each)
  - [ ] README has demo GIF/video

- [ ] **Documentation complete**:
  - [ ] README.md updated with Quick Start
  - [ ] USER_GUIDE.md published
  - [ ] CHANGELOG.md up to date
  - [ ] LICENSE file present

- [ ] **Testing verified**:
  - [ ] Extension installs cleanly
  - [ ] All commands work
  - [ ] Status bar updates correctly
  - [ ] No console errors

- [ ] **Publisher account setup**:
  - [ ] Azure DevOps account created
  - [ ] Personal Access Token generated
  - [ ] Publisher profile published
  - [ ] vsce login successful

---

## 🔑 Publisher Setup (First-Time Only)

### Create Publisher Account

1. Go to: https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft account
3. Create publisher:
   - **ID**: `biasguard`
   - **Name**: `BiasGuard`
   - **Display Name**: `BiasGuard Security`

### Generate Personal Access Token

1. Go to: https://dev.azure.com/[your-org]/_usersSettings/tokens
2. Create new token:
   - **Name**: `vsce-publish`
   - **Organization**: All accessible organizations
   - **Scopes**: Marketplace → Manage
   - **Expiration**: 90 days (or custom)
3. Copy token (save securely)

### Login with vsce

```bash
npx vsce login biasguard
# Paste personal access token when prompted
````

---

## 📤 Publishing Commands

### Publish to Marketplace

```bash
# Full publish
npx vsce publish

# Publish specific version
npx vsce publish 4.2.5

# Publish from VSIX
npx vsce publish --packagePath biasguard-4.2.5-production.vsix
```

### Update Listing

After publishing, edit on marketplace website:

- Add screenshots
- Update long description
- Set categories/tags
- Configure Q&A settings

---

## 🎯 Success Metrics

Track after launch:

- **Installs**: Target 1,000 in first month
- **Ratings**: Target 4.5+ stars (if reviews enabled)
- **Active Users**: Track via telemetry (if opt-in implemented)
- **GitHub Stars**: Target 500+ (community validation)
- **Issues Filed**: Expect 10-20 (feedback loop)

---

∞ AbëONE ∞

_Like water flows, adoption spreads. Value attracts attention._
