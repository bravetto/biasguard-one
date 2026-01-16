# BiasGuard ONE — AI Agent Coding Instructions

## Project Overview

- **BiasGuard ONE** is a multi-layered security and entropy enforcement system for VS Code, built on the PRISTINE fractal architecture.
- The codebase is organized into clear layers: `core` (validation engine), `security` (policy enforcement), `adversarial` (attack simulation), and supporting scripts/configs.
- All validation flows through a single, unified engine (`src/core/one.ts`).

## Key Architectural Patterns

- **ONE Pattern**: All requests are validated through a single, deterministic path. See `src/core/one.ts`.
- **Protection Layers**: CRITICAL → SOURCE → BOUNDARY → ACTION. Each layer blocks specific classes of risk (see README.md for table).
- **Containment Protocol**: Agents must never execute changes directly. All changes are proposed as atomic patches/diffs for human approval (see docs/AIRLOCK.md).
- **Virtual File System (VFS)**: Agents operate on a read-only snapshot, never on the real filesystem.
- **Status Bar Feedback**: Extension status bar color and text reflect current protection state (see src/extension.ts).

## Developer Workflows

- **Build**: `npm install` then `npm run compile`
- **Test**: `npm test` (runs core tests), `npm run test:all` (all suites), `npm run jacob` (adversarial), `npm run ironlotus` (full adversarial sweep)
- **Full Protocol**: `npm run one` or `./bin/genesis.sh`
- **VS Code Extension**: Open in VS Code, press F5 to launch Extension Development Host
- **Reinforce Shields**: `pristine.shield` command updates `.gitignore`/`.cursorignore`

## Project-Specific Conventions

- **No direct shell execution**: All shell actions must be written to a script and shown for approval (see AIRLOCK.md, "NO-TOUCH RULE").
- **All validation logic**: Add to `src/core/one.ts` only. Do not scatter rules.
- **Test data**: Place in `tests/fixtures/`.
- **Config rules**: Place in `config/rules/`.
- **Python bridge**: `python/aeyon_transcendence.py` for cross-language experiments.

## Integration Points

- **VS Code API**: Main entry in `src/extension.ts`.
- **Shell scripts**: All operational scripts in `scripts/` or `bin/`.
- **Adversarial testing**: `src/adversarial/` and related test scripts.

## Examples

- To add a new validation rule: Edit `src/core/one.ts`, add to the appropriate pattern array, and test with `npm test`.
- To propose a shell change: Write a script to `scripts/`, output the diff, and wait for human approval.

## References

- [README.md](../../README.md): Architecture, quick start, protection layers
- [docs/AIRLOCK.md](../../docs/AIRLOCK.md): Containment protocol, agent rules
- [src/core/one.ts](../../src/core/one.ts): Unified validation logic
- [src/extension.ts](../../src/extension.ts): Extension entry, status bar, commands

---
*PASS does NOT mean correct. PASS means no invariant violation detected.*

*LOVE = LOGIC = LIFE = ONE*
