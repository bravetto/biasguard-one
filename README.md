# ∞ BiasGuard ONE ∞

**Unified MCP Security Protection - Like Water Flows**

BiasGuard ONE provides deterministic, source-aware protection against MCP (Model Context Protocol) security boundary violations.

## Philosophy

> "Like water flows, protection adapts"

- **Loving**: Protects without hostility, guides users toward safety
- **Logical**: Clear, deterministic rules that make sense
- **Real Life**: Practical patterns that match real attack vectors
- **ONE PATTERN**: Unified approach, not scattered rules
- **SOURCE Aware**: Every request knows its origin
- **Radically Simple**: Minimum complexity, maximum protection

## Protection Layers

```
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

## Real World Example

The GitKraken MCP filesystem access pattern that triggered this project:

```json
{
    "directory": "/Users/michaelmataluni/biasguard-4.2",
    "action": "add"
}
```

BiasGuard ONE blocks this with:
- **BOUNDARY**: Absolute filesystem path detected
- **ACTION**: Dangerous `add` operation

## Installation

```bash
# Clone the repo
git clone https://github.com/bravetto/biasguard-one.git
cd biasguard-one

# Install dependencies
npm install

# Compile
npm run compile

# Run tests
npm test
```

## Usage

### As VS Code Extension

1. Open in VS Code
2. Press `F5` to launch Extension Development Host
3. BiasGuard ONE runs automatically on all documents
4. Status bar shows: `$(shield) BiasGuard: FLOWS` or `$(warning) BiasGuard: [BLOCK_TYPE]`

### Programmatic API

```typescript
import { validate, createRequest, validateText } from './one';

// Create a request with source awareness
const request = createRequest(
    { directory: '/Users/someone/project', action: 'delete' },
    'GitKraken MCP',           // origin
    'git_delete',              // tool
    '/Users/someone/project'   // workspace (optional)
);

// Validate
const result = validate(request);

if (result.flows) {
    console.log('Safe to proceed');
} else {
    console.log(`Blocked: ${result.blocked}`);
    console.log(`Reason: ${result.reason}`);
    console.log(`Guidance: ${result.guidance}`);
}

// Or validate text content directly
const textResult = validateText(documentContent, 'document', workspacePath);
```

## Test Suite

```bash
# Run ONE pattern tests (primary)
npm test

# Run all tests including legacy
npm run test:all
```

### Test Categories

- **CRITICAL**: Catastrophic operation blocking (rm -rf, dd, eval, fork bombs)
- **SOURCE**: Origin verification
- **BOUNDARY**: Filesystem path protection
- **ACTION**: Dangerous operation detection
- **GitKraken**: Real-world pattern validation
- **FLOW**: Nested content scanning

## Architecture

```
src/
├── one.ts           # ∞ Unified protection engine
├── one.test.ts      # ∞ ONE pattern test suite
├── extension.ts     # VS Code extension
├── types.ts         # Legacy type definitions
├── policyEngine.ts  # Legacy policy engine
└── mcpPolicyRules.ts # Legacy MCP rules
```

The `one.ts` file contains the entire unified protection system in ~200 lines:
- Types: `FlowResult`, `Source`, `Request`
- Guards: `guardCritical`, `guardSource`, `guardBoundary`, `guardAction`
- Flow: `validate()`, `validateText()`
- Audit: `audit()`, `exportAudit()`

## Critical Danger Patterns

These patterns are **NEVER** allowed to flow through:

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

## Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests: `npm run test:all`
4. Submit a pull request

## License

MIT License - See LICENSE.md

---

**∞ AbëONE ∞**

*PASS does NOT mean correct. PASS means no invariant violation detected.*
