# BiasGuard

**An open-source bias detection framework.**

> BiasGuard is not an authority. It is a mirror.
> Everything it sees, you can inspect.

---

## What It Does

- Detects cognitive biases and logical fallacies in text
- Maps them to real-world harm domains
- Explains findings in human language
- Suggests corrective rewrites
- Verifies improvement after correction

## What It Does NOT Do

- Infer intent
- Enforce ideology
- Hide its logic
- Claim objectivity

## Who Is This For

- Developers building fairer systems
- Researchers studying bias patterns
- Regulators requiring audit trails
- Workers reviewing performance feedback
- Anyone harmed by opaque AI decisions

---

## Quick Start

```bash
# Install
npm install

# Build
npm run compile

# Test
npm test

# Run all tests (108 total)
npm run compile && node ./out/tests/one.test.js
```

---

## The Detection Engine

### 87 Patterns Across 12 Guards

| Guard | Count | What It Detects |
|-------|-------|-----------------|
| **truth** | 1 | Deception, absolutes |
| **context** | 1 | Missing attribution |
| **coherence** | 1 | Logical drift |
| **trust** | 1 | Manipulation patterns |
| **token** | 1 | Noise, vagueness |
| **compliance** | 1 | Bypass attempts |
| **creativity** | 1 | Stagnation patterns |
| **cognitive** | 21 | Halo Effect, Attribution Error, Automation Bias... |
| **fallacies** | 23 | Ad Hominem, Straw Man, False Dichotomy... |
| **awareness** | 7 | Implicit bias, microaggressions, coded language |
| **workplace** | 14 | Affinity Bias, Maternal Wall, Name Bias... |
| **research** | 15 | Survivorship, Algorithmic, Proxy Discrimination... |

---

## Bias Scoring

Every detection answers three questions:

1. **What pattern was detected?**
2. **Why does it matter?**
3. **What would fix it?**

### Example Output

```
Bias Score: 72/100 (HIGH)

Detected: Attribution Bias
Fallacy: Fundamental Attribution Error
Domain: Career, Legal, Healthcare

"This pattern can cause real harm.
Understanding it is the first step to change."

Suggested Fix:
- Consider situational factors
- Replace character judgment with behavior description
```

---

## The Rewrite Loop

BiasGuard doesn't just detect—it helps you improve.

```
Original → Detection → Explanation → Suggested Rewrite → Re-Score
```

### Before

> "John missed the deadline because he is lazy."

**Score: 80/100 (HIGH)**

### After

> "The deadline was missed due to shifting priorities."

**Score: 0/100 (CLEAR)**

**Improvement: 📈 80 points**

---

## Architecture

```text
src/
├── one.ts                 ← Unified entry point
├── guards/                ← Detection engine (87 patterns)
│   ├── reflect.ts         ← Core reflection logic
│   ├── scoring.ts         ← Explainable bias scores
│   ├── cognitive.ts       ← 21 cognitive biases
│   ├── fallacies.ts       ← 23 logical fallacies
│   ├── awareness.ts       ← Implicit/explicit patterns
│   ├── workplace.ts       ← 14 workplace biases
│   └── research.ts        ← 15 data/algorithmic biases
├── ontology/              ← Canonical bias definitions
│   └── biases.ts          ← 17 fully specified entries
└── heroes/                ← Real-world use cases
    └── email.ts           ← Career-limiting email detection
```

---

## The Ontology

Each bias is fully specified:

```typescript
{
  id: 'attribution',
  name: 'Fundamental Attribution Error',
  category: 'cognitive',
  paired_fallacies: ['ad-hominem', 'genetic'],
  detection_signals: ['because they are', 'lazy', 'incompetent'],
  impact_domains: ['career', 'legal', 'healthcare'],
  severity: 'high',
  correctability: 'easy',
  suggested_corrections: [
    'Consider situational factors',
    'Focus on specific actions, not personality'
  ],
  human_explanation: 'Blaming character when circumstances might explain behavior.',
  dignity_message: 'This pattern can cause real harm. Understanding it is the first step to change.'
}
```

---

## Tests

108 tests across all detection systems:

| Suite | Tests | Status |
|-------|-------|--------|
| Core Protection | 28 | ✅ |
| Mirror Tests | 24 | ✅ |
| Cognitive Biases | 17 | ✅ |
| Logical Fallacies | 33 | ✅ |
| Email Hero Case | 6 | ✅ |

```bash
npm test                    # Core tests
node ./out/tests/mirror.test.js      # Guard tests
node ./out/tests/cognitive.test.js   # Cognitive bias tests
node ./out/tests/fallacies.test.js   # Fallacy tests
node ./out/tests/email.test.js       # Hero use case
```

---

## VS Code Extension

BiasGuard also runs as a VS Code extension for real-time protection.

1. Open in VS Code
2. Press `F5` to launch Extension Development Host
3. Status bar shows protection state:

| Status | Meaning |
|--------|---------|
| `✓ BiasGuard: FLOWS` | Safe - no violations |
| `⚠ BiasGuard: ACTION` | Warning - review needed |
| `✗ BiasGuard: CRITICAL` | Blocked - dangerous operation |

---

## Known Limitations

We are honest about what BiasGuard cannot do:

- **False positives occur.** Some patterns trigger on benign text.
- **Context is limited.** Single-sentence analysis misses discourse-level bias.
- **Cultural bias exists.** Current patterns reflect English-language, Western framing.
- **Intent is unknowable.** We detect patterns, not motives.

---

## Contributing

BiasGuard welcomes contributions:

- **New bias proposals** with evidence and detection signals
- **Improved patterns** that reduce false positives
- **Counterexamples** that expose blind spots
- **Harm domain expansions** for underrepresented groups

---

## The Principle

```
This does not indicate intent.
It indicates a reasoning pattern that tends to produce harm.
```

This sentence appears in every explanation. It preserves dignity while enabling change.

---

## License

MIT License

---

## Version

**4.2.5** | 87 Patterns | 108 Tests | 17 Ontology Entries

---

*BiasGuard is a mirror, not an authority.*
*Everything it sees, you can inspect.*
