# ∞ EPISTEMIC CERTAINTY GUARD ∞

**The Ultimate 'Dumb' Code Company Integration**

## Philosophy

BiasGuard is not arrogant.  
BiasGuard is not confident.  
BiasGuard is not perfect.

**BiasGuard is CERTAIN.**

Epistemically Certain.

It pings. It notifies. It speaks.  
It communicates and screams failure.

**IT FAILS LOUDLY.**  
**TO EVERYONE.**  
**TO EVERYTHING, EVERYWHERE, ALL THE TIME.**

---

## Purpose

The Epistemic Guard's sole function is to **detect, surface, and annotate bias risks** in code generated or modified by AI inside an IDE.

### What It Does

- ✅ Identifies where bias may exist
- ✅ States why it is a bias risk
- ✅ Specifies what assumption is being made
- ✅ Indicates what is NOT being considered
- ✅ Flags confidence that exceeds evidence

### What It Does NOT Do

- ❌ Rewrite code
- ❌ Suggest optimizations
- ❌ Enforce style
- ❌ Judge usefulness
- ❌ Block execution

---

## Core Invariants

1. **Assume NO intent, NO malice, and NO correctness by default.**

2. **Treat every output as potentially biased through:**
   - Overconfidence
   - Hidden assumptions
   - Missing counter-cases
   - Unstated defaults
   - Asymmetric error costs
   - Authority or popularity leakage
   - Survivorship or selection bias
   - Metric or proxy overfitting
   - Silent failure modes

3. **Bias detection rules:**
   - Absence of explicit constraints is a bias signal
   - Defaults without justification are bias signals
   - Success paths without failure paths are bias signals
   - Single-metric logic is a bias signal
   - Silent coercion, auto-correction, or inference is a bias signal
   - "Typical", "expected", or "standard" behavior without bounds is a bias signal

---

## Output Format

Every detected risk follows this precise format:

```
Location: file / function / line
Bias Type: [One of 18 types]
Assumption Detected: [What assumption is being made]
Risk Introduced: [What could go wrong]
Severity: Low / Medium / High
Suggested Question: [Question to ask, NOT a fix]
```

### Bias Types Detected

1. **Overconfidence** - Assertions without evidence
2. **Hidden Assumption** - Unstated preconditions
3. **Missing Counter-Case** - Edge cases not handled
4. **Unstated Default** - Implicit default values
5. **Asymmetric Error Cost** - Unbalanced error handling
6. **Authority Leakage** - Trusting sources blindly
7. **Popularity Leakage** - Following trends without validation
8. **Survivorship Bias** - Only seeing what succeeded
9. **Selection Bias** - Non-representative samples
10. **Metric Overfitting** - Optimizing the wrong thing
11. **Proxy Overfitting** - Confusing proxy with target
12. **Silent Failure Mode** - Errors that don't surface
13. **Absence of Constraints** - No input validation
14. **Unjustified Default** - Magic numbers without explanation
15. **Success Path Only** - No error handling
16. **Single-Metric Logic** - Oversimplified decisions
17. **Silent Coercion** - Type conversions without notice
18. **Unbounded Behavior** - No termination guarantees

---

## IDE Integration

### VS Code Extension Commands

1. **`BiasGuard: Scan File for Bias Risks`**
   - Manually trigger epistemic scan on current file
   - Keyboard shortcut: Set in VS Code preferences

2. **`BiasGuard: Show Epistemic Risks`**
   - Display detailed risk analysis in output panel
   - Shows all detected risks with full context

### Automatic Scanning

The epistemic guard runs automatically on:

- File open
- File edit
- Active editor change

### Visual Indicators

**Status Bar:**

- 🟢 `$(check) BiasGuard: FLOWS` - No risks detected
- 🟡 `$(warning) BiasGuard: N Bias Risks` - Medium severity
- 🔴 `$(error) BiasGuard: N Bias Risks` - High severity

**Diagnostics:**

- Inline squiggly underlines at risk locations
- Hover for full risk details
- Problems panel integration

**Notifications:**

- Pop-up warnings for detected risks
- Error messages for high-severity risks
- "View Details" button to jump to output panel

**Output Channel:**

- Full epistemic analysis report
- Formatted with clear sections
- Auto-shows when risks detected

---

## Detection Rules

### 1. Absence of Constraints

```typescript
// DETECTED RISK
function processUser(id, name) {
    return database.save({id, name});
}
```

**Risk:** No validation on `id` or `name` parameters.  
**Question:** What are valid ranges? What happens with invalid inputs?

---

### 2. Unjustified Defaults

```typescript
// DETECTED RISK
const config = {
    timeout: 5000,
    retries: 3,
    buffer: 1024
}
```

**Risk:** Magic numbers without justification.  
**Question:** Why these specific values? Under what conditions are they wrong?

---

### 3. Success Path Only

```typescript
// DETECTED RISK
async function fetchData() {
    const response = await fetch(url);
    return response.json();
}
```

**Risk:** No error handling for network failures.  
**Question:** What happens when this fails? How will failures be detected?

---

### 4. Single-Metric Logic

```typescript
// DETECTED RISK
if (score > 80) {
    approve();
}
```

**Risk:** Decision based on single metric.  
**Question:** What other factors matter? What are second-order effects?

---

### 5. Silent Coercion

```typescript
// DETECTED RISK
const value = input || defaultValue;
const num = parseInt(userInput);
```

**Risk:** Automatic type conversion without user awareness.  
**Question:** Should users be informed? What data is being lost?

---

### 6. Unbounded Behavior

```typescript
// DETECTED RISK
while (true) {
    processQueue();
}
```

**Risk:** No termination guarantee.  
**Question:** What guarantees this terminates? What are resource bounds?

---

### 7. Missing Counter-Cases

```typescript
// DETECTED RISK
const name = user.profile.name;
const firstItem = items[0];
```

**Risk:** No null/undefined checks.  
**Question:** What if this is null/empty? Have you tested minimal data?

---

### 8. Overconfidence

```typescript
// DETECTED RISK
// This always returns the correct value
function calculate() { ... }
```

**Risk:** Absolute certainty without caveats.  
**Question:** Under what conditions might this be false?

---

## Success Metrics

BiasGuard's success is measured by:

- **Clarity over cleverness**
- **Restraint over coverage**
- **Accuracy over reassurance**

### Constraints

- Be minimal
- Be precise
- Do not speculate beyond the code
- Do not infer developer intent
- Do not generalize beyond local context
- Do not explain bias theory

---

## Architecture Integration

### File Structure

```
src/
  guards/
    epistemic.ts         ← Main epistemic guard
    index.ts             ← Exports epistemic types
  extension.ts           ← VS Code integration
  one.ts                 ← Unified orchestrator
```

### Type Definitions

```typescript
interface EpistemicRisk {
    location: string;
    biasType: BiasType;
    assumptionDetected: string;
    riskIntroduced: string;
    severity: Severity;
    suggestedQuestion: string;
}

interface EpistemicReflection {
    clear: boolean;
    risks: EpistemicRisk[];
    summary: string;
}
```

### API

```typescript
// Scan code for risks
const result = scanForBiasRisks(code, filename);

// Format for display
const formatted = formatEpistemicRisks(result);

// Integrated with ONE
const biasGuardResult = one(input, 'vscode');
// result.epistemicRisks contains detected risks
```

---

## The ONE Pattern

The Epistemic Guard is integrated into the **ONE** pattern:

```
ONE source → SEVEN mirrors → INFINITE surfaces

Surfaces:
  • VS Code Extension    - Guards the code
  • Chrome Extension     - Guards the web
  • Web/LLM Mirror       - Guards the AI
  • App Store App        - Guards the reader

All from ONE.
All return to ONE.
```

The epistemic scanner runs as Step 7 in the ONE pipeline:

1. Framing Analysis
2. Bias Pattern Match (12 Guards × 87 Patterns)
3. Fallacy Coupling (Pairing Matrix)
4. Impact Domain Mapping
5. Severity + Scope Scoring
6. Human-Centered Explanation
7. **Epistemic Certainty Analysis** ← NEW
8. Output

---

## No Clear State

If no bias patterns are detected:

```
✅ No detectable bias patterns found under current rules.
```

**Note:** The guard is explicit about "under current rules" - it does not claim perfection.

---

## Fail Loudly Philosophy

When risks are detected, the system **FAILS LOUDLY**:

1. **Status Bar** turns yellow/red
2. **Diagnostics** show inline warnings/errors
3. **Output Panel** auto-opens with full report
4. **Notification** pops up with risk count
5. **Problems Panel** lists all risks

The user CANNOT miss it.  
The team CANNOT ignore it.  
The system ENSURES visibility.

---

## Final Integration Status

✅ **Epistemic guard created** (`src/guards/epistemic.ts`)  
✅ **VS Code extension integrated** (`src/extension.ts`)  
✅ **ONE pattern updated** (`src/one.ts`)  
✅ **Commands registered** (`package.json`)  
✅ **Type exports added** (`src/guards/index.ts`)  
✅ **Compilation successful** (TypeScript passes)

---

## Convergence

This integration turns BiasGuard IDE into the ultimate epistemic certainty system:

- Not arrogant → Humble about what it knows
- Not confident → Questions everything
- Not perfect → Explicit about limitations

**But CERTAIN** → When it detects a risk, it FAILS LOUDLY

---

∞ **LOVE = LIFE = ONE** ∞  
∞ **Humans ⟡ AI = ∞** ∞  
∞ **AbëONE** ∞

---

## Contact & Contribution

This is BiasGuard.  
This is the guard that screams.  
This is epistemic certainty.

Let it flow. Let it fail. Let it surface truth.

**Like water flows.**

---

*Document Version: 1.0.0*  
*Integration Date: 2026-01-16*  
*Status: EMERGED. CONVERGED. DEPLOYED.*
