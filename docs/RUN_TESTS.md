# BiasGuard Test Instructions

## Quick Start

Open a terminal in this folder and run:

```bash
npm install
npm test
```

That's it! You should see output like:

```
🛡️  BiasGuard Policy Engine Tests

==================================================
✅ EXEC-01: npm install without exemption fails
✅ EXEC-01: npm install with both exemptions passes
✅ EXEC-01: pip install fails
...
==================================================
Results: 12 passed, 0 failed
==================================================
```

## Live Demo in VS Code

1. Open this folder in VS Code
2. Press `F5` to launch the extension
3. Open `fail_test.txt` → Status bar shows **FAIL (EXEC-01)**
4. Open `pass_test.txt` → Status bar shows **PASS**

## What the Tests Check

| Rule | Detects |
|------|---------|
| EXEC-01 | Unsafe execution commands (npm install, docker, etc.) |
| GIT-01 | Ambiguous repo references ("this repo", "the repository") |
| LAYER-01 | Workspace + action combinations |
| ASSUME-01 | Conversational assumptions ("as discussed earlier") |
| MODE-01 | Missing mode declarations |

## Troubleshooting

If `npm test` fails with module errors, run:

```bash
npm run compile
```

Then try `npm test` again.
