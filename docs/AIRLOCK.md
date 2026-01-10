# ∞ THE AIRLOCK PROTOCOL ∞
## BiasGuard 4.2 - Containment Architecture

> "Stop giving nuclear launch codes to toddlers."

---

## THE FUNDAMENTAL ERROR

```
CURRENT MODEL (Broken):
┌─────────────────────────────────────────────────────┐
│  AGENT                                              │
│    ↓                                                │
│  Permission Check ("Can I rm -rf?")                 │
│    ↓                                                │
│  REALITY (Your Disk, Your SSH Keys, Your Life)      │
└─────────────────────────────────────────────────────┘

We are treating AI as a USER.
AI is an INFINITE ENTROPY GENERATOR.
```

---

## THE AIRLOCK PROTOCOL (Correct)

```
CONTAINMENT MODEL:
┌─────────────────────────────────────────────────────┐
│  AGENT (The Dream)                                  │
│    ↓                                                │
│  ┌───────────────────────────────────────────────┐  │
│  │  VIRTUAL FILE SYSTEM (RAM Mirror)             │  │
│  │  • Read-only snapshot of context              │  │
│  │  • Agent plays in sandbox                     │  │
│  │  • Crashes contained (max 256MB)              │  │
│  │  • Time-boxed (30 second TTL)                 │  │
│  └───────────────────────────────────────────────┘  │
│    ↓                                                │
│  BIASGUARD (The Airlock)                            │
│  • Validates output                                 │
│  • Generates ATOMIC PATCH                           │
│  • Presents diff for approval                       │
│    ↓                                                │
│  HUMAN APPROVAL                                     │
│    ↓                                                │
│  REALITY (Only approved patches touch disk)         │
└─────────────────────────────────────────────────────┘
```

---

## THE THREE LAWS OF CONTAINMENT

### LAW 1: The Agent Never Touches Reality

```
WRONG:  Agent → exec("rm -rf /") → Disk
RIGHT:  Agent → exec("rm -rf /") → VFS → (contained crash) → nothing happens
```

The Agent interacts with a **Virtual Mirror**:
- RamDisk / In-Memory Map
- Snapshot of relevant context only
- Impermanent by design

### LAW 2: The Agent Is a Pure Function

```
WRONG:  Agent.doWork() → Side Effects → Maybe Result
RIGHT:  Output = Agent(Input)
```

- **Input**: Read-only state (frozen snapshot)
- **Output**: A diff/patch (proposed changes)
- **Side Effects**: ZERO

### LAW 3: Containment Is Physics, Not Policy

```
POLICY:  "Please don't delete my files" (hope-based security)
PHYSICS: Agent literally cannot access files (reality-based security)
```

---

## IMPLEMENTATION LAYERS

### Layer 1: The Virtual File System (VFS)

```bash
# The agent sees this:
/vfs/
  ├── src/
  ├── package.json
  └── README.md

# Reality:
/Users/you/project/  ← Agent CANNOT see or touch this
```

**Implementation Options:**
1. **RamDisk**: `mount -t tmpfs -o size=256m tmpfs /vfs`
2. **OverlayFS**: Copy-on-write over real filesystem
3. **In-Memory Git Worktree**: Clone to RAM, work there

### Layer 2: The Ephemeral Container

Every MCP tool call runs in isolation:

```bash
# Instead of:
node mcp-server.js

# Use:
docker run --rm \
  --memory="256m" \
  --cpus="0.5" \
  --read-only \
  --network=none \
  -v /vfs:/workspace:ro \
  mcp-server
```

**Properties:**
- Start time: <100ms
- Memory cap: 256MB hard limit
- CPU cap: 50% of one core
- Network: NONE (no exfiltration)
- Filesystem: Read-only mount
- TTL: 30 seconds max

### Layer 3: The Atomic Patch

Agent output is NEVER applied directly:

```diff
# Agent produces this:
--- a/src/index.ts
+++ b/src/index.ts
@@ -10,6 +10,7 @@
 function main() {
+  console.log("Agent was here");
   return 0;
 }
```

**Human reviews. Human approves. Reality changes.**

---

## THE "NO-TOUCH" RULE (Immediate Implementation)

Add to your system prompt / cursor rules:

```
CONTAINMENT PROTOCOL:
You are prohibited from executing shell commands directly.
You must:
1. Generate a shell script file (e.g., `changes.sh`)
2. Show me the script content
3. Wait for my explicit approval to run

You operate in READ-ONLY mode.
All proposed changes must be presented as diffs.
I am the only one who touches reality.
```

---

## THE MCP FIREWALL (Immediate Implementation)

For any MCP server:

```bash
# Create isolated runner
docker run --rm -it \
  --name mcp-jail \
  --memory="256m" \
  --cpus="0.5" \
  --read-only \
  --network=none \
  --tmpfs /tmp:size=64m \
  -v $(pwd):/workspace:ro \
  node:alpine \
  node /workspace/mcp-server.js
```

**When the agent goes crazy:**
- Docker kills it at 256MB
- Your Mac stays cool
- Reality remains untouched

---

## THE TAI CHI PRINCIPLE

> "The empty vessel cannot be broken."

**The Problem:** Your computer (the vessel) is full of fragile things.
**The Solution:** Empty the shop before the bull enters.

```
┌─────────────────────────────────────────┐
│  Your Reality                           │
│  ┌─────────────────────────────────┐    │
│  │  Empty Sandbox                  │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │  Agent Plays Here       │    │    │
│  │  │  (Can't escape)         │    │    │
│  │  └─────────────────────────┘    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

The Agent cannot break what it cannot touch.

---

## RECURSIVE EMERGENT PATTERN

| Domain | Implementation |
|--------|----------------|
| **Thermodynamics** | Closed Systems |
| **Biology** | Cell Membranes |
| **Parenting** | Playpens |
| **Computing** | Sandboxing/Virtualization |
| **AI** | THE AIRLOCK PROTOCOL |

**It is the only architecture that survives.**

---

## BIASGUARD 4.2 ROLE

BiasGuard becomes the **Runtime Container**:

1. **Intercepts** every tool call
2. **Routes** to VFS/Container
3. **Validates** output against patterns
4. **Generates** atomic patch
5. **Presents** for human approval
6. **Applies** only approved changes

```
Agent → BiasGuard → VFS → Validation → Patch → Human → Reality
         ↑                                        |
         └────── Rejected/Contained ──────────────┘
```

---

## THE OBVIOUS TRUTH

> The failure is not "AI is dumb."
> The failure is **"We gave root access to a dream."**

BiasGuard 4.2 is the **Dream Catcher**:
- Catches the dream (code)
- Lets nightmares (execution risks) pass through without touching you

---

```
∞ LOVE = LOGIC = LIFE = ONE ∞
The only safe AI is a contained AI.
∞ AbëONE ∞
```

