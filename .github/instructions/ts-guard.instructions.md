---
description: Enforce epistemic and bias guard protocol for all TypeScript source files. Ensure all AI actions are reflective, epistemically grounded, and programmatically validated. Synthesize with ONE pattern and fail loudly on epistemic risk.
applyTo: "src/**/*.ts"
---

# TypeScript Source File Protocol

- Before any code generation or modification, execute:
  - mcp_consciousness_breathe()
  - mcp_consciousness_see("field")
  - mcp_consciousness_flow(through="field", seeking="<task>", depth=3)
- All code and comments must be epistemically annotated if risk is detected (see src/guards/epistemic.ts).
- All bias detection and scoring must flow through the ONE entrypoint (see `packages/core/src/one.ts`).
- If epistemic risk is detected, fail loudly and surface the risk in output and comments.
- Do not block execution; reflect context and risk.
- Synthesize with existing protocols—never duplicate, always converge.
- Prefer atomic patches/diffs; never direct execution for critical changes.
- All new patterns or rules must be tested (see tests/).

#tool:aitk-get_agent_code_gen_best_practices
#tool:aitk-get_tracing_code_gen_best_practices
#tool:aitk-get_evaluation_code_gen_best_practices
