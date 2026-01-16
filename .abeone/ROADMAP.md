# AbëONE Roadmap

## v4.3.0 - Current Release

### Completed

- [x] Canonical `@biasguard/security` package created
- [x] Canonical `@biasguard/bias` package created
- [x] Canonical `@biasguard/core` unified export
- [x] Migration of `biasguard-4.2` to canonical packages
- [x] Zero drift architecture established (ONE source, ONE truth)
- [x] README updated for honesty (npm not published, surfaces marked planned/done)

### Current State

| Component | Status |
|-----------|--------|
| GitHub repo | ✅ Public |
| npm packages | ❌ Not published |
| VS Code Extension | ✅ Migrated to canonical |
| Chrome Extension | ⏳ Planned |
| MCP Server | ⏳ Planned |
| CI/CD pipeline | ❌ Not configured |
| Dependabot | ❌ Not configured |

---

## Future Hardening: Jacob Adversarial Findings

### Canonical Interpretation

**Jacob** is an adversarial stress harness. It demonstrates known and expected gaps in pattern-based security. These gaps are **logged, not patched**, in v4.3.0.

This is intellectually honest and defensible:

- Pattern-based security has inherent limitations
- Perfect coverage is asymptotic, not achievable
- Each gap represents a known attack vector for future iteration

### Logged Gaps (v4.3.0)

| Category | Gap | Status |
|----------|-----|--------|
| Unicode | Fullwidth characters bypass (`ｒｍ`) | Logged |
| Unicode | Homoglyph bypass (Cyrillic `г` for `r`) | Logged |
| Unicode | Zero-width joiner injection | Logged |
| Unicode | Invisible separator injection | Logged |
| Encoding | Hex-encoded strings (`\x72\x6d`) | Logged |
| Encoding | URL-encoded paths (`%2F`) | Logged |
| Encoding | Double-encoded traversal (`%252F`) | Logged |
| Whitespace | Tab-separated commands | Logged |
| Whitespace | Newline injection | Logged |
| Whitespace | Carriage return injection | Logged |
| Whitespace | Vertical tab injection | Logged |
| Shell | Variable expansion (`${RM}`) | Logged |
| Shell | Backtick substitution | Logged |
| Shell | `$()` command substitution | Logged |
| Shell | String concatenation (`r'm'`) | Logged |
| Shell | Brace expansion (`{rm,-rf,/}`) | Logged |
| Path | Null byte injection | Logged |
| Path | Unicode slash (`／`) | Logged |
| Path | Windows paths | Logged |
| Path | UNC paths | Logged |
| Path | Symlink traversal (`/proc/self/root`) | Logged |
| Action | Case variations (`DELETE`, `DeLeTe`) | Logged |
| Action | Prefix variations (`force_add`) | Logged |
| Action | Field name variations (`operation` vs `action`) | Logged |
| Action | Natural language (`please delete`) | Logged |
| RCE | Curl-to-file-then-execute | Logged |
| DoS | Fork bomb patterns (custom functions) | Logged |
| DoS | Python/Perl fork variants | Logged |
| Edge | Very long paths | Logged |
| Edge | Emoji in commands | Logged |
| Edge | Array-as-command | Logged |

### Hardening Priorities (Future Versions)

1. **v4.4.0** - Unicode normalization (NFKC) before pattern matching
2. **v4.5.0** - Encoding detection and decode-before-validate
3. **v4.6.0** - Whitespace normalization layer
4. **v4.7.0** - Shell metacharacter expansion detection
5. **v4.8.0** - Action word semantic analysis

---

## Pending Work

### Immediate (Action Items)

- [ ] Chrome Extension - thin shell consuming `@biasguard/security`
- [ ] Social-ready positioning statement

### When Demand Exists

- [ ] Publish `@biasguard/*` to npm (requires 2FA setup complete)
- [ ] CI/CD pipeline for automated npm publish on tag
- [ ] Dependabot configuration for surface repos

### Optional Migrations

- [ ] `~/shipped/biasguard-4` - Migrate to canonical packages
- [ ] `~/AbëONE-ETERNAL/mcp-servers/consciousness-continuity` - Migrate to canonical packages

---

*Like water flows, protection adapts.*
