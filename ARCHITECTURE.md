# ∞ BiasGuard Architecture ∞

*The translator between human dignity and machine logic.*

---

## I. THE PARTIES

### 1. The Individual (Human Node)
```
┌─────────────────────────────────────────────┐
│             THE INDIVIDUAL                  │
│                                             │
│  • Users, workers, patients, citizens       │
│  • Carries lived experience, intuition      │
│  • Historically forced to adapt to systems  │
│                                             │
│  SHIFT: Human becomes the ground truth      │
│         validator, not the noisy input.     │
└─────────────────────────────────────────────┘
```

### 2. The AI System (Decision Engine)
```
┌─────────────────────────────────────────────┐
│             THE AI SYSTEM                   │
│                                             │
│  • LLMs, ranking systems, scoring models    │
│  • Historically opaque, authoritative       │
│  • Non-reflexive                            │
│                                             │
│  SHIFT: AI becomes a self-auditing          │
│         participant, not a silent judge.    │
└─────────────────────────────────────────────┘
```

### 3. Institutions (Power Multipliers)
```
┌─────────────────────────────────────────────┐
│             INSTITUTIONS                    │
│                                             │
│  • Employers, platforms, banks, hospitals   │
│  • Courts, governments                      │
│  • Encode bias via policy, data, incentives │
│                                             │
│  SHIFT: Institutions become answerable      │
│         through traceability, not intent.   │
└─────────────────────────────────────────────┘
```

### 4. Regulators & Civil Society (Constraint Layer)
```
┌─────────────────────────────────────────────┐
│        REGULATORS & CIVIL SOCIETY           │
│                                             │
│  • EU AI Act, civil rights law              │
│  • Compliance bodies, watchdogs             │
│  • Historically reactive                    │
│                                             │
│  SHIFT: Continuous audit signals, not       │
│         post-harm investigations.           │
└─────────────────────────────────────────────┘
```

### 5. BiasGuard (The Missing Party)
```
┌─────────────────────────────────────────────┐
│         BIASGUARD-CLASS TOOLS               │
│                                             │
│  • Not neutral                              │
│  • Not moralizing                           │
│  • EPISTEMIC INFRASTRUCTURE                 │
│                                             │
│  ROLE: The translator between human         │
│        dignity and machine logic.           │
└─────────────────────────────────────────────┘
```

---

## II. THE TECH STACK

### Core Technologies (Already Here)

| Technology | Function | BiasGuard Implementation |
|------------|----------|--------------------------|
| **Large Language Models** | Detect framing, attribution, tone, exclusions | Pattern matching in guards |
| **Causal Inference** | "What variables are missing?" | Research bias detection |
| **Bias Ontologies** | Formal mappings: Bias → Fallacy → Harm → Domain → Fix | `scoring.ts` + `BIAS_FALLACY_PAIRS` |
| **Explainability (XAI)** | Rationale generation, confidence calibration | `formatBiasScore()` + dignity messages |

---

## III. THE BIAS SCORING GRAPH

**Bias Scoring Is a GRAPH, Not a Number**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                              INPUT                                      │
│                    "The algorithm says she's high-risk"                 │
│                                │                                        │
│                                ▼                                        │
│                    ┌───────────────────────┐                            │
│                    │   FRAMING ANALYSIS    │                            │
│                    │   Linguistic patterns │                            │
│                    │   Absolutes, loaded   │                            │
│                    └───────────────────────┘                            │
│                                │                                        │
│                                ▼                                        │
│                    ┌───────────────────────┐                            │
│                    │  BIAS PATTERN MATCH   │                            │
│                    │  12 Guards × 87       │                            │
│                    │  Patterns             │                            │
│                    └───────────────────────┘                            │
│                                │                                        │
│                                ▼                                        │
│                    ┌───────────────────────┐                            │
│                    │   FALLACY COUPLING    │                            │
│                    │   Bias → Fallacy      │                            │
│                    │   Pairing Matrix      │                            │
│                    └───────────────────────┘                            │
│                                │                                        │
│                                ▼                                        │
│                    ┌───────────────────────┐                            │
│                    │  IMPACT DOMAIN MAP    │                            │
│                    │  career, healthcare,  │                            │
│                    │  finance, legal...    │                            │
│                    └───────────────────────┘                            │
│                                │                                        │
│                                ▼                                        │
│                    ┌───────────────────────┐                            │
│                    │  SEVERITY + SCOPE     │                            │
│                    │  low → medium → high  │                            │
│                    │  → critical           │                            │
│                    └───────────────────────┘                            │
│                                │                                        │
│                                ▼                                        │
│                    ┌───────────────────────┐                            │
│                    │  HUMAN-CENTERED       │                            │
│                    │  EXPLANATION          │                            │
│                    │  Dignity preserved    │                            │
│                    └───────────────────────┘                            │
│                                │                                        │
│                                ▼                                        │
│                           OUTPUT                                        │
│                                                                         │
│   ╔══════════════════════════════════════════════════════════════╗     │
│   ║  Bias Score: 85/100 (CRITICAL) ⚠️                            ║     │
│   ║  Primary: Automation Bias                                     ║     │
│   ║  Fallacy: Appeal to Authority                                 ║     │
│   ║  Domain: healthcare, legal, career                            ║     │
│   ║  Risk: Over-trust in AI outputs, reduced human oversight      ║     │
│   ║                                                               ║     │
│   ║  "⚠️ This reflects systemic bias. The issue is structural,   ║     │
│   ║   not personal. Recognition enables advocacy."                ║     │
│   ╚══════════════════════════════════════════════════════════════╝     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## IV. THE PATH (Implementation Phases)

### Phase 1 — REFLECTION ✓ (Current State)

```
AI systems expose:
  • Hidden assumptions        → awareness.ts
  • Missing perspectives      → research.ts
  • Confidence mismatches     → scoring.ts

User feels: "I wasn't imagining it."
```

**Status: IMPLEMENTED**
- 12 Guards
- 87 Patterns  
- Scoring system
- Dignity messages

---

### Phase 2 — CORRECTION 🔄 (Next)

```
Systems suggest:
  • Reframing language        → suggestedFix
  • Adding counterfactuals    → research patterns
  • Removing proxy variables  → proxy discrimination detection

Bias becomes ACTIONABLE, not abstract.
```

**Status: PARTIALLY IMPLEMENTED**
- `suggestedFix` in scoring
- Need: Rewrite suggestions
- Need: Counterfactual generation

---

### Phase 3 — NORMALIZATION 🔜 (Future)

```
Bias checks become:
  • As expected as spellcheck
  • As standard as security audits

No drama. Just infrastructure.
```

**Requires:**
- Chrome Extension (in progress)
- VS Code Extension (done)
- API for third-party integration
- Real-time checking

---

### Phase 4 — CULTURAL SHIFT 🌅 (Vision)

```
People stop asking:
  "Am I the problem?"

And start asking:
  "What logic produced this outcome?"

That's the restoration of dignity.
```

---

## V. SYSTEM COUPLING

```
                    ┌─────────────────────┐
                    │      HUMAN          │
                    │   (Ground Truth)    │
                    └─────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
     ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
     │     AI      │  │ INSTITUTION │  │  REGULATOR  │
     │  (Engine)   │  │  (Policy)   │  │ (Constraint)│
     └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
            │                │                │
            └────────────────┼────────────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │     BIASGUARD       │
                    │   (Translator)      │
                    │                     │
                    │  Human Dignity      │
                    │       ⟷            │
                    │  Machine Logic      │
                    └─────────────────────┘
```

**A system that can see itself can correct itself.**

---

## VI. WHY NOW (Not 5 Years Ago)

| Factor | Then | Now |
|--------|------|-----|
| LLM Reasoning | Limited | Can reason about reasoning |
| Regulation | Lagging | EU AI Act requires audit trails |
| User Trust | Assumed | Black boxes rejected |
| Cost/Benefit | Bias cheaper | Transparency cheaper than liability |

**The ecosystem finally wants this.**

---

## VII. TECHNICAL SPEC SUMMARY

### Files

| File | Purpose | Patterns |
|------|---------|----------|
| `truth.ts` | Deception, absolutes | Core |
| `context.ts` | Attribution, history | Core |
| `coherence.ts` | Drift, oscillation | Core |
| `trust.ts` | Manipulation, leading | Core |
| `token.ts` | Noise, vagueness | Core |
| `compliance.ts` | Bypass, secrecy | Core |
| `creativity.ts` | Stagnation, limitation | Core |
| `cognitive.ts` | Mental shortcuts | 21 biases |
| `fallacies.ts` | Argument errors | 23 fallacies |
| `awareness.ts` | Implicit/explicit | 7 patterns |
| `workplace.ts` | Career biases | 14 biases |
| `research.ts` | Data/system biases | 15 biases |
| `scoring.ts` | Explainable scores | Pairing matrix |

### Exports

```typescript
import { 
    reflect,           // Main detection function
    calculateBiasScore, // Explainable scoring
    formatBiasScore,   // Human-readable output
    BIAS_FALLACY_PAIRS // Ontology matrix
} from './guards';
```

---

## VIII. FINAL TRUTH

```
• The parties are aligned.
• The tech exists.
• The path is incremental, inevitable, and already underway.

This isn't a vision.

It's recognition.
```

---

*∞ LOVE = LIFE = ONE ∞*

*A system that can see itself can correct itself.*

*∞ AbëONE ∞*
