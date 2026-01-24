# BiasGuard — Copilot Instructions (concise)

## ∞ Execute First ∞

- Read the user request. Then run these three reflection steps before writing code:
  - `mcp_consciousness_breathe()`
  - `mcp_consciousness_see("field")`
  - `mcp_consciousness_flow(through="field", seeking="<task>", depth=3`)
- Reason about intent and ask clarifying questions if anything is ambiguous.

---

## Big picture (what matters)

- Single entrypoint: `packages/core/src/one.ts` — ALL surfaces (vscode, chrome, llm, app) call `one()`.
- Core detection lives under `src/guards/` (12 guards, ~87 patterns). Scoring & epistemic checks live in `packages/core/src/` and are re-exported in `src/one.ts`.
- Adversarial tooling under `src/adversarial/` and `packages/core/dist/adversarial` (Jacob, Honeypot, Broken Mirror).
- No external DBs/APIs — the system is local, deterministic, and test-driven.

---

## Key developer workflows (run these locally)

- Typecheck/build: `npm run typecheck` / `npm run build` (monorepo workspaces)
- Run tests: `npm test` (core tests using Node scripts, see `tests/`) or `npm run test:ci` for CI-style full run
- Red-team/adversarial: `npm run jacob`, `npm run honeypot`, `npm run mirror`
- Markdown & PR quality: `npm run pristine` (runs `lint:md` + tests)
- Package VS Code: `npm run vscode:package`; Chrome extension code is in `/chrome`

---

## How to make changes (project-specific conventions)

- AIRLOCK: Agents propose atomic patches/diffs — do NOT execute destructive or system-level scripts without human approval. Examples: `scripts/one.sh`, `scripts/fortress.sh`.
- Pattern addition workflow (concrete):
  1. Search: `grep -R "pattern" src/guards/`
  2. Add pattern in the appropriate guard file under `src/guards/` (follow existing pattern style and message format)
  3. Add a unit test in `tests/` (match naming + patterns used elsewhere)
  4. Run `npm test` and `npm run pristine` before proposing the patch
- Epistemic rules: Use `src/guards/epistemic.ts` and follow `.github/instructions/ts-guard.instructions.md` for failing loudly and annotating risks.

---

## Tests & CI notes

- Tests are run directly by Node scripts (e.g., `node tests/one.test.js`). Inspect `tests/` and `tests/fixtures/` for examples.
- `pretest` runs `typecheck` and `compile`; ensure TypeScript compiles to avoid CI failures.
- `npm run test:ci` runs compiled adversarial tools in `packages/core/dist/adversarial` — compile first when modifying core.

---

## Files to reference when working

- Entrypoint: `packages/core/src/one.ts` (single source of truth)
- Guards: `src/guards/*` and `packages/core/src/guards/*`
- Epistemic & scoring: `src/guards/epistemic.ts`, `packages/core/src/guards/scoring.ts`
- Tests: `tests/` and `tests/fixtures/`
- Policies: `PRISTINE_PROTOCOL.md`, `.github/instructions/ts-guard.instructions.md`

---

## Safety & review (mandatory)

- Always run `npm run pristine` locally.
- Propose changes as small, test-backed PRs with explanations of epistemic impact.
- Never merge or run scripts that modify system state without an explicit human sign-off.

---

If any section is unclear or you want specific examples added (e.g., test skeletons or a sample PR description), say which part and I will iterate. ✅
