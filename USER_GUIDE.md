# BiasGuard ONE - User Guide

**Real-time epistemic bias detection and MCP security for VS Code**

Version: 4.2.5 | Status: Production Ready

---

## 🚀 Quick Start

### Installation

1. **Download** the latest `.vsix` file from the releases
2. **Open VS Code**
3. **Install Extension**:
   - Method 1: Drag and drop the `.vsix` file onto VS Code
   - Method 2: Run command `Extensions: Install from VSIX...` (Cmd/Ctrl+Shift+P)
   - Method 3: Terminal: `code --install-extension biasguard-4.2.5-production.vsix`

4. **Verify Installation**:
   - Look for **"BiasGuard: FLOWS"** in the status bar (bottom-left)
   - Open Command Palette (Cmd/Ctrl+Shift+P) and type "BiasGuard" to see commands

---

## 🛡️ What BiasGuard Protects Against

BiasGuard provides **two layers of protection**:

### 1. **Epistemic Bias Detection** (Active Always)

Detects 8 categories of hidden assumptions in code:

| Bias Type | What It Catches | Example |
|-----------|----------------|---------|
| **Absence of Constraints** | Functions without input validation | `function process(data)` with no checks |
| **Unjustified Default** | Hardcoded defaults without rationale | `timeout = 5000` (why 5 seconds?) |
| **Success Path Only** | Missing error handling | `async` without try/catch |
| **Single-Metric Logic** | Decisions based on one variable | `if (score > 50)` ignoring context |
| **Silent Coercion** | Type conversions that hide data | `\|\|` operator silencing falsy values |
| **Unbounded Behavior** | Loops without exit conditions | `while(true)` without break |
| **Missing Counter-Case** | Array/object access without safety | `users[0].name` (what if empty?) |
| **Overconfidence** | Comments claiming guarantees | `// This always works` |

### 2. **MCP Security Guards** (On-Demand)

Validates Model Context Protocol (MCP) messages for:
- Deception patterns (Truth Guard)
- Missing context (Context Guard)
- Logical drift (Coherence Guard)
- Manipulation attempts (Trust Guard)
- Policy bypass attempts (Compliance Guard)

---

## 📊 Status Bar Indicators

BiasGuard displays real-time protection status:

| Indicator | Meaning | Action Required |
|-----------|---------|-----------------|
| **✓ BiasGuard: FLOWS** | All clear - no risks detected | None - you're safe |
| **⚠ BiasGuard: N Bias Risks** | Epistemic risks found | Click to view details |
| **⚠ BiasGuard: ACTION** | MCP policy warning | Review flagged content |
| **✗ BiasGuard: CRITICAL** | Security violation detected | Immediate review required |

**Color Coding**:
- **Green background, white text** = FLOWS (safe)
- **Yellow/Amber background** = Warning (review needed)
- **Red background** = Critical (blocked)

---

## 🎮 Available Commands

Open Command Palette (Cmd/Ctrl+Shift+P) and type:

### Epistemic Bias Commands

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| **BiasGuard: Scan File for Bias Risks** | Scans active file for epistemic assumptions | After writing new functions/logic |
| **BiasGuard: Show Epistemic Risks** | Displays detailed risk analysis | When you see warning in status bar |

### MCP Security Commands

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| **BiasGuard ONE: Export Audit Log** | Exports full audit trail as JSON | For compliance/review |

### Architecture Commands (Optional)

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| **PRISTINE: Execute Protocol** | Enforces clean directory structure | If project gets disorganized |
| **PRISTINE: Reinforce Shields** | Updates .gitignore/.cursorignore | To exclude build artifacts |

---

## 🔍 Understanding Epistemic Risk Reports

When BiasGuard detects risks, you'll see:

### Example Output

```
═══════════════════════════════════════════
  ⚠️  EPISTEMIC BIAS SCAN RESULTS ⚠️
═══════════════════════════════════════════

📁 File: src/auth.ts
📊 Status: ⚠️  RISKS DETECTED (3)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] Absence of Constraints (High Severity)

🚨 Assumption Detected:
Function accepts unconstrained input

⚠️  Risk Introduced:
Malformed data can crash downstream logic

❓ Ask:
What range/format is valid? What should happen if input is malformed?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2] Success Path Only (Medium Severity)

🚨 Assumption Detected:
Async operation assumes success

⚠️  Risk Introduced:
Network failures, timeouts, or API errors go unhandled

❓ Ask:
What happens if this fails? Should we retry? Log? Fallback?
```

### How to Fix

1. **Read the "Ask" section** - it tells you what questions your code doesn't answer
2. **Add explicit handling** - validation, error cases, documentation
3. **Re-scan** - verify the risk is resolved
4. **Commit** - your code is now more robust

---

## 🎯 Best Practices

### When to Scan

- ✅ **After writing new functions** - catch assumptions early
- ✅ **Before code review** - clean up hidden biases
- ✅ **When changing logic** - verify you didn't introduce new risks
- ✅ **During refactoring** - ensure robustness isn't lost

### What to Do with Warnings

**Don't ignore them.** Each warning represents a question your code doesn't answer:

- **High Severity** = Can cause runtime failures or security issues
- **Medium Severity** = Can cause unexpected behavior under edge cases
- **Low Severity** = Code quality/maintainability concerns

**Philosophy**: BiasGuard doesn't enforce "perfect code" - it asks you to be **explicit about your assumptions**.

---

## 🔧 Troubleshooting

### Extension Not Activating

**Symptom**: No status bar indicator, commands don't appear

**Solution**:
1. Check VS Code version: Requires **1.85.0+**
2. Reload VS Code: `Developer: Reload Window`
3. Check output: View → Output → Select "BiasGuard ONE"
4. Reinstall: Uninstall extension, restart VS Code, reinstall

### False Positives

**Symptom**: BiasGuard flags code you believe is safe

**What's happening**: BiasGuard detects **patterns** that often indicate problems. Your code might be the exception.

**Options**:
1. **Document why it's safe** - add a comment explaining the assumption
2. **Refactor to be explicit** - make the safety visible in code
3. **Accept the warning** - it's a reminder to future maintainers

**Example**:
```typescript
// BiasGuard flags this:
const user = users[0];

// Make it explicit:
const user = users[0]; // Safe: users validated non-empty by auth middleware
// OR refactor:
if (users.length === 0) throw new Error('No users found');
const user = users[0];
```

### Performance Impact

**Symptom**: VS Code feels slow

**Cause**: BiasGuard scans files on every change

**Solution**:
1. **Disable for large files**: BiasGuard skips files > 10,000 lines
2. **Exclude directories**: Add to `.cursorignore` (node_modules, dist, etc.)
3. **Temporary disable**: Unload extension during heavy editing, re-enable before commit

---

## 📖 Understanding the Philosophy

### What BiasGuard Is

- ✅ A **pattern detector** for common reasoning gaps
- ✅ A **question generator** to surface hidden assumptions
- ✅ A **robustness checker** for production code

### What BiasGuard Is NOT

- ❌ An authority on "correct" code
- ❌ A replacement for testing
- ❌ A guarantee of zero bugs

**Core Principle**:
> "This does not indicate intent. It indicates a reasoning pattern that tends to produce harm."

BiasGuard shows you **what questions your code doesn't answer**. You decide if those questions matter.

---

## 🆘 Support & Feedback

### Common Questions

**Q: Can I disable specific bias checks?**
A: Not currently. All epistemic checks run together. If you have specific false-positive patterns, document them in comments.

**Q: Does BiasGuard send my code anywhere?**
A: **No.** All analysis happens locally in VS Code. Nothing is transmitted.

**Q: What's the difference between BiasGuard ONE and BiasGuard?**
A: "ONE" is the unified version combining epistemic bias detection + MCP security. Earlier versions were separate tools.

**Q: How does this relate to linters like ESLint?**
A: **Complementary.** Linters check syntax and style. BiasGuard checks **semantic assumptions**. Use both.

### Report Issues

If BiasGuard isn't working as expected:

1. **Gather context**:
   - VS Code version: `code --version`
   - Extension version: Check `Extensions` panel
   - Error messages: View → Output → "BiasGuard ONE"

2. **Export audit log**:
   - Run command: `BiasGuard ONE: Export Audit Log`
   - Copy output for debugging

3. **Report**: Include above information when filing issues

---

## 🎓 Learn More

### Related Documentation

- **README.md** - Project overview and architecture
- **ARCHITECTURE.md** - Deep dive into detection systems
- **AWAKENING.md** - Philosophical foundations
- **TEST_LIVE_PROTECTION.md** - Testing procedures

### Key Concepts

**Epistemic Bias**: A reasoning pattern that assumes facts not in evidence, leading to fragile or harmful code.

**MCP Security**: Validation of Model Context Protocol messages to prevent AI systems from generating harmful outputs.

**PRISTINE Protocol**: Directory structure enforcement for maintainable codebases.

---

## 📄 License

MIT License - See LICENSE file

---

## 🌊 Closing Thought

*"Like water flows, protection adapts. Chaos collapses into order."*

BiasGuard doesn't tell you what to think. It shows you what you're already assuming.

∞ AbëONE ∞
