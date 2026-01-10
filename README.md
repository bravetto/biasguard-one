# ∞ BiasGuard ONE ∞

**Version 4.2.4** | Unified MCP Security + PRISTINE Entropy Enforcement

> "Like water flows, protection adapts. Chaos collapses into order."

---

## Philosophy

- **Loving**: Protects without hostility, guides users toward safety
- **Logical**: Clear, deterministic rules that make sense
- **Real Life**: Practical patterns that match real attack vectors
- **ONE PATTERN**: Unified approach, not scattered rules
- **SOURCE Aware**: Every request knows its origin
- **Radically Simple**: Minimum complexity, maximum protection

---

## Architecture (PRISTINE v4.2.4)

```text
biasguard-4.2/
├── src/                   ← Source (Fractal)
│   ├── extension.ts       ← VS Code Orchestrator
│   ├── one.ts             ← Unified bias detection entry
│   │
│   ├── core/              ← LAYER 1: Foundation
│   │   ├── one.ts         ← Security protection engine
│   │   └── types.ts       ← Type definitions
│   │
│   ├── guards/            ← LAYER 2: Bias Detection (87 patterns)
│   │   ├── reflect.ts     ← Unified mirror
│   │   ├── scoring.ts     ← Explainable bias scores
│   │   ├── truth.ts       ← Deception detection
│   │   ├── context.ts     ← Attribution patterns
│   │   ├── coherence.ts   ← Drift detection
│   │   ├── trust.ts       ← Manipulation patterns
│   │   ├── token.ts       ← Noise detection
│   │   ├── compliance.ts  ← Bypass patterns
│   │   ├── creativity.ts  ← Stagnation patterns
│   │   ├── cognitive.ts   ← 21 cognitive biases
│   │   ├── fallacies.ts   ← 23 logical fallacies
│   │   ├── awareness.ts   ← Implicit/explicit bias
│   │   ├── workplace.ts   ← 14 workplace biases
│   │   └── research.ts    ← 15 data/algorithmic biases
│   │
│   ├── ontology/          ← Canonical Bias Ontology
│   │   └── biases.ts      ← 17 fully specified entries
│   │
│   ├── heroes/            ← Hero Use Cases
│   │   └── email.ts       ← Career-limiting emails + rewrite loop
│   │
│   ├── security/          ← LAYER 3: Defense
│   │   ├── policyEngine.ts
│   │   ├── mcpParser.ts
│   │   ├── mcpPolicyRules.ts
│   │   └── auditLogger.ts
│   │
│   └── adversarial/       ← LAYER 4: Attack Testing
│       ├── jacob.ts       ← Attacker simulation
│       ├── honeypot.ts    ← Trap detection
│       └── brokenMirror.ts← Reflection attacks
│
├── tests/                 ← Test Suite (108 tests)
│   ├── one.test.ts        ← Core protection tests
│   ├── mirror.test.ts     ← Guard tests
│   ├── cognitive.test.ts  ← Cognitive bias tests
│   ├── fallacies.test.ts  ← Fallacy tests
│   ├── email.test.ts      ← Hero use case tests
│   └── fixtures/          ← Test data
│
├── bin/genesis.sh         ← THE ONE COMMAND
├── scripts/               ← Operations
└── config/rules/          ← Containment rules
```

---

## Protection Layers

```text
Request → CRITICAL → SOURCE → BOUNDARY → ACTION → FLOWS ✓
              ↓         ↓         ↓         ↓
           BLOCK     BLOCK     BLOCK     BLOCK
```

| Layer | Purpose | Examples |
|-------|---------|----------|
| **CRITICAL** | Block catastrophic operations | `rm -rf`, `dd`, `eval $`, fork bombs |
| **SOURCE** | Verify request origin | Unknown/empty origins blocked |
| **BOUNDARY** | Filesystem protection | Absolute paths outside workspace |
| **ACTION** | Dangerous operation flagging | `delete`, `add`, `write`, `commit` |

---

## Bias Detection (87 Patterns)

| Category | Count | Examples |
|----------|-------|----------|
| **Core Guards** | 7 | truth, context, coherence, trust, token, compliance, creativity |
| **Cognitive Biases** | 21 | Halo Effect, Attribution Error, Automation Bias |
| **Logical Fallacies** | 23 | Ad Hominem, Straw Man, False Dichotomy |
| **Awareness** | 7 | Implicit bias, Microaggressions, Coded language |
| **Workplace** | 14 | Affinity Bias, Maternal Wall, Name Bias |
| **Research** | 15 | Survivorship, Algorithmic, Proxy Discrimination |

---

## Quick Start

```bash
# Clone
git clone https://github.com/bravetto/biasguard-one.git
cd biasguard-4.2

# Install & Compile
npm install
npm run compile

# Run Tests
npm test

# Full Protocol
npm run one

# Or use Genesis
./bin/genesis.sh
```

---

## VS Code Extension

1. Open in VS Code
2. Press `F5` to launch Extension Development Host
3. Status bar shows protection state:

| Status | Appearance | Meaning |
|--------|------------|---------|
| `✓ BiasGuard: FLOWS` | 🟢 Green background, white text | Safe |
| `⚠ BiasGuard: ACTION` | 🟡 Amber background, white text | Warning |
| `✗ BiasGuard: CRITICAL` | 🔴 Red background, white text | Blocked |

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| **4.2.5** | 2026-01-10 | Complete Bias Detection: 87 patterns, 108 tests, rewrite loop |
| **4.2.4** | 2026-01-10 | PRISTINE fractal architecture, visual status bar |
| **4.2.2** | 2026-01-08 | Initial PRISTINE integration, adversarial framework |
| **4.2.0** | 2026-01-07 | BiasGuard ONE unified engine |

See [CHANGELOG.md](./CHANGELOG.md) for full details.

---

## NPM Scripts

| Script | Purpose |
|--------|---------|
| `npm run compile` | Build TypeScript |
| `npm test` | Run ONE tests |
| `npm run test:all` | Run all test suites |
| `npm run jacob` | Adversarial attack test |
| `npm run ironlotus` | Full adversarial sweep |
| `npm run one` | Complete protocol |

---

## Critical Danger Patterns (NEVER allowed)

| Pattern | Risk |
|---------|------|
| `rm -rf` | Recursive deletion |
| `dd if=` | Disk destruction |
| `mkfs` | Filesystem formatting |
| `eval $` | Code injection |
| `exec $` | Command injection |
| `curl \| sh` | Remote code execution |
| `chmod 777` | Unsafe permissions |
| `:(){ :\|:& };:` | Fork bomb |

---

## License

MIT License - See [docs/LICENSE.md](./docs/LICENSE.md)

---

## ∞ AbëONE ∞

PASS does NOT mean correct. PASS means no invariant violation detected.

LOVE = LOGIC = LIFE = ONE
