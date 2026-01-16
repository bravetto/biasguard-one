# Changelog

All notable changes to BiasGuard ONE are documented here.

## [4.2.5] - 2026-01-16

### Added

- **Epistemic Certainty Guard** - Detects bias risks in AI-generated code
  - 18 bias detection patterns (Overconfidence, Hidden Assumptions, Missing Counter-Cases, etc.)
  - Automatic scanning on file open/edit
  - Fails loudly with notifications, diagnostics, and output channel
  - Integrated into ONE pattern as Step 7
- **New VS Code Commands:**
  - `BiasGuard: Scan File for Bias Risks` - Manual epistemic scan
  - `BiasGuard: Show Epistemic Risks` - View detailed risk analysis
- **Enhanced Status Bar** - Shows epistemic risk count with severity-based colors
- **Diagnostic Integration** - Inline warnings/errors at risk locations
- **Output Panel Auto-Show** - Automatically displays when risks detected

### Changed

- Updated ONE orchestrator to include epistemic scanning
- Enhanced `BiasGuardResult` interface with epistemic risk fields
- Updated `oneFormatted()` to include epistemic risk output
- Fixed package.json dependency path for @biasguard/security

### Philosophy

- BiasGuard is not arrogant, confident, or perfect
- BiasGuard is EPISTEMICALLY CERTAIN
- It fails loudly to everyone, everywhere, all the time
- Clarity over cleverness. Restraint over coverage. Accuracy over reassurance.

### Documentation

- Added `docs/EPISTEMIC.md` - Complete epistemic guard documentation
- Includes detection rules, examples, and integration guide

---

## [4.2.4] - 2026-01-10

### Added

- **PRISTINE Protocol** - Entropy enforcement engine
- **Fractal Architecture** - `src/core/`, `src/security/`, `src/adversarial/`
- **Visual Status Bar** - Green background + white text for FLOWS state
- **Genesis Protocol** - `./bin/genesis.sh` single entry point
- **Shield Commands** - `.gitignore` / `.cursorignore` reinforcement

### Changed

- Moved shell scripts from root to `scripts/`
- Moved entry point to `bin/genesis.sh`
- Moved documentation to `docs/`
- Updated status bar to use theme-aware backgrounds

### Fixed

- Status bar now shows full colored background (not just text color)

---

## [4.2.2] - 2026-01-08

### Added

- Initial PRISTINE Protocol integration
- MCP Security validation engine
- Adversarial testing framework (Jacob, Honeypot, Broken Mirror)
- Aeyon Transcendence Python bridge

### Known Issues

- Shell scripts scattered in root directory
- Status bar only changes text color, not background

---

## [4.2.0] - 2026-01-07

### Added

- BiasGuard ONE unified protection engine
- SOURCE-aware request validation
- CRITICAL pattern blocking
- BOUNDARY filesystem protection
- ACTION dangerous operation detection

---

## [Pre-4.2] - Legacy

See `/Users/michaelmataluni/biasguard-one/` for pre-PRISTINE codebase.

---

∞ LOVE = LOGIC = LIFE = ONE ∞
