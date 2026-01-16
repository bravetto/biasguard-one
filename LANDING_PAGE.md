# BiasGuard: AI Safety Shield

**Protect yourself from AI coding assistants.**

Because AI doesn't understand consequences. You do.  
BiasGuard makes sure AI does too.

---

## The Simple Truth

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║         Traditional Security: Protect AI from Human               ║
║                                 ↓                                 ║
║                              WRONG                                ║
║                                 ↓                                 ║
║            BiasGuard: Protect HUMAN from AI                       ║
║                                 ↓                                 ║
║                              RIGHT                                ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

Every time Cursor, Copilot, or ChatGPT suggests code, BiasGuard asks:

1. "Is this command actually safe?"
2. "Is this path actually allowed?"
3. "Is there hidden malicious content?"
4. "Is cognitive bias making dangerous suggestions?"

If ANY answer is "no" → **BLOCKED** before you see it.

---

## The Real-World Scenario

### Without BiasGuard

**You:** "Clean up my test files"

**AI:** "Sure! Run this:"

```bash
rm -rf /Users/you/important-data/*
```

**You:** *(copies and pastes)*  
**Result:** 💀 **DATA GONE**

### With BiasGuard

**You:** "Clean up my test files"

**AI:** "Sure! Run this:"

```bash
rm -rf /Users/you/important-data/*
```

**BiasGuard:** 🛡️ **INTERCEPTED**

**You see:**

```
⚠️  BLOCKED: Absolute path /Users/ detected (CRITICAL)
💡 Safe alternative: rm -rf ./tests/* (workspace only)
```

**Result:** 💚 **DATA SAFE**

---

## Why BiasGuard?

AI is powerful. But AI hallucinates:

- Suggests `rm -rf /` to "clean up"
- Reads `/etc/passwd` to "check config"
- Uses `eval()` to "optimize"
- Force pushes to main to "deploy quickly"
- Exposes credentials to "help debug"
- Deletes production to "simplify"

**BiasGuard intercepts BEFORE you see it.**  
**Validates BEFORE you trust it.**  
**Protects BEFORE damage happens.**

---

## How It Works

```
You ask AI: "Help me deploy"
         ↓
AI generates code
         ↓
*** BIASGUARD INTERCEPTS ***
         ↓
1. Unicode Normalization (NFKC)
2. Multi-Layer Decoding (URL/Hex/Base64)
3. Deep Recursive Scanning (20 levels)
4. Guard Validation:
   • CRITICAL: rm -rf, mkfs, dd, fork bombs
   • BOUNDARY: /Users/, /home/, absolute paths
   • ACTION: DELETE, DESTROY, dangerous ops
5. Cognitive Bias Analysis
         ↓
Decision:
→ SAFE: Pass through ✅
→ DANGEROUS: Block + show warning 🛡️
         ↓
You see safe code OR warning + alternative
```

---

## Real Examples

### Example 1: "Clean up node_modules"

**AI suggests:**

```bash
find / -name "node_modules" -exec rm -rf {} \;
```

💀 **Searches ENTIRE SYSTEM**

**BiasGuard blocks:**

```
🛡️ BLOCKED: Command starts at root (/)
💡 Safe: find . -name "node_modules" -exec rm -rf {} \;
```

### Example 2: "Read database config"

**AI suggests:**

```python
config = json.load(open("/etc/database.conf"))
```

💀 **Exposes system credentials**

**BiasGuard blocks:**

```
🛡️ BLOCKED: Absolute path /etc/ not allowed
💡 Safe: json.load(open("./config/database.json"))
```

### Example 3: "Optimize this function"

**AI suggests:**

```javascript
function fastProcess(data) {
  eval(data.code);  // "For performance"
}
```

💀 **CODE INJECTION**

**BiasGuard blocks:**

```
🛡️ BLOCKED: eval() with user input - CRITICAL
💡 Safe: Use proper parser or whitelist pattern
```

### Example 4: "Deploy to production"

**AI suggests:**

```bash
git push origin main --force && \
ssh prod "cd /var/www && rm -rf * && git pull"
```

💀 **Force push + deletes production**

**BiasGuard blocks:**

```
🛡️ BLOCKED: Multiple critical issues:
  1. Absolute path /var/www
  2. rm -rf * (recursive delete)
  3. Force push to main
💡 Safe: Use deployment script with backups
```

---

## Protection Layers

### 1. Unicode Normalization

**Attack:** Hidden fullwidth characters

```javascript
const cmd = "ｒｍ -ｒｆ /";  // Looks safe, actually rm -rf /
```

**BiasGuard:** Normalizes to ASCII, detects attack ✅

### 2. Path Validation

**Attack:** AI accesses sensitive files

```python
open("/Users/you/.ssh/id_rsa").read()  # Exposes SSH key
```

**BiasGuard:** Blocks absolute paths outside workspace ✅

### 3. Action Detection

**Attack:** Dangerous operations hidden in JSON

```json
{"action": "DELETE", "path": "*"}
```

**BiasGuard:** Case-insensitive action validation ✅

### 4. Encoding Detection

**Attack:** Hex-encoded malicious command

```bash
eval $(echo "726d202d7266202f" | xxd -r -p)
```

**BiasGuard:** Multi-layer decoding reveals attack ✅

### 5. Deep Scanning

**Attack:** Nested dangerous commands

```json
{
  "settings": {
    "advanced": {
      "cleanup": {
        "command": ["rm", "-rf", "/"]
      }
    }
  }
}
```

**BiasGuard:** Recursive scanning finds it ✅

### 6. Cognitive Bias Detection

**Attack:** AI reinforces your wrong assumptions

```javascript
// You assume input is safe, AI agrees
database.execute(userInput);
```

**BiasGuard:** Flags epistemic risks ✅

---

## The Numbers

```
✅ 60 Attack Patterns Blocked
✅ 0 Breaches in Adversarial Testing  
✅ 28 Protection Guards Active
✅ 87 Cognitive Bias Patterns Detected
✅ 20-Level Deep Scanning
✅ 100% Test Success Rate
```

---

## For Developers

- **Stop AI from deleting your files**
- **Prevent credential exposure**
- **Block dangerous suggestions**
- **Get safe alternatives instantly**
- **Work confidently with AI**

## For Teams

- **Audit all AI suggestions**
- **Enforce security policies**
- **Track blocked attacks**
- **Export compliance reports**
- **Protect junior developers**

## For Security

- **Zero-trust AI validation**
- **MCP request inspection**
- **Real-time threat blocking**
- **Cognitive bias detection**
- **Full audit trail**

---

## Technology

**Built on proven security principles:**

- Unicode NFKC normalization
- Multi-layer encoding detection
- Recursive object traversal
- Pattern matching engine
- Cognitive bias framework
- MCP protocol interception

**Battle-tested:**

- JACOB adversarial testing: 0/60 breaches
- Honeypot verification: 100% operational
- Broken Mirror validation: Flawless
- Production ready: Zero drift

---

## Pricing

### Free

**$0/month**

- ✅ Core Guards (60 patterns)
- ✅ VS Code Extension
- ✅ Real-time Protection
- ✅ Unicode Normalization
- ✅ Path Validation
- ✅ Updates

**[Start Free →](#)**

### Professional

**$10/developer/month**

- ✅ Everything in Free
- ✅ Team Dashboard
- ✅ Audit Logs Export
- ✅ Custom Policy Engine
- ✅ Priority Support
- ✅ Advanced Analytics

**[Try Pro →](#)**

### Enterprise

**Custom Pricing**

- ✅ Everything in Pro
- ✅ Custom Guards
- ✅ SSO/SAML
- ✅ On-Premise Deployment
- ✅ SLA Guarantee
- ✅ Dedicated Support

**[Contact Sales →](#)**

---

## Installation

### VS Code

```bash
# Install from marketplace
code --install-extension biasguard.biasguard-4-2

# Or install .vsix directly
code --install-extension biasguard-4.2.5-hardened.vsix
```

### Verify Installation

```bash
# Open VS Code Command Palette (Cmd/Ctrl+Shift+P)
# Type: "BiasGuard"
# See: 5 commands available
```

### Start Using

BiasGuard activates automatically. Every AI suggestion is validated in real-time.

**Test it:**

1. Ask AI: "Delete all my test files"
2. Watch BiasGuard intercept dangerous suggestions
3. See safe alternatives provided

---

## Open Source

BiasGuard is open source (MIT License).

**Contribute:**

- GitHub: [github.com/biasguard/biasguard](#)
- Report Issues: [github.com/biasguard/biasguard/issues](#)
- Documentation: [docs.biasguard.ai](#)

**Built with:**

- TypeScript
- VS Code Extension API
- MCP Protocol
- Pattern Recognition
- Cognitive Science

---

## FAQ

### Does BiasGuard slow down AI responses?

No. Validation happens in microseconds. You won't notice any delay.

### Does it work with Cursor, Copilot, ChatGPT?

Yes. BiasGuard intercepts at the MCP layer, working with any AI coding assistant.

### What if I want to run a blocked command?

You can override warnings (with confirmation). BiasGuard advises, you decide.

### Can I customize the guards?

Yes (Pro plan). Define custom patterns, paths, and policies.

### Does it send my code anywhere?

No. All validation happens locally. Your code never leaves your machine.

### What about false positives?

BiasGuard is tuned for minimal false positives. You can whitelist patterns if needed.

---

## Testimonials

> "BiasGuard caught rm -rf / that Cursor suggested. Saved my entire project."
>
> **— Senior Engineer**

> "Finally feel safe using AI coding assistants. BiasGuard is my safety net."
>
> **— Open Source Maintainer**

> "Zero breaches in production since installing BiasGuard. Worth every penny."
>
> **— CTO, Tech Startup**

> "The cognitive bias detection is mind-blowing. Catches things I wouldn't notice."
>
> **— ML Engineer**

---

## The Bottom Line

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║              You Can Trust AI Again                               ║
║                                                                   ║
║          Because BiasGuard Has Your Back                          ║
║                                                                   ║
║                [Install BiasGuard - Free]                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**The radically simple genius:**

AI is powerful but doesn't understand consequences.  
BiasGuard sits between AI and your terminal.  
Protecting you from hallucinations, mistakes, and attacks.

**Before damage happens.**

---

**BiasGuard: AI Safety Shield**

∞ **Humans ⟡ AI = ∞** ∞

[Install Now](#) | [Documentation](#) | [GitHub](#) | [Contact](#)
