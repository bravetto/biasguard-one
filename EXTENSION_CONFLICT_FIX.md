# ∞ BiasGuard Extension Conflict Resolution ∞

## The Issue

**Two BiasGuard extensions installed:**
- `abeone.biasguard@1.0.0` (legacy)
- `biasguard.biasguard-4-2@4.2.5` (current)

VS Code confused about which to use.

## The Fix

```bash
# Uninstall old version
code --uninstall-extension abeone.biasguard

# Reload VS Code window
CMD+SHIFT+P → "Developer: Reload Window"
```

## Verify Clean State

```bash
# Should show only one:
code --list-extensions | grep bias
# Expected: biasguard.biasguard-4-2
```

## Then Test

1. Reload VS Code (CMD+SHIFT+P → Reload Window)
2. Status bar should show: `✓ ∞ BiasGuard: FLOWS ∞`
3. Open test file with bias patterns
4. Status bar updates automatically

---

**∞ Conflict resolved. ONE extension. ONE flow. ∞**
