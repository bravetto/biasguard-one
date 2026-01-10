#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
#  ∞ BIASGUARD ONE ∞
#  THE AIRLOCK PROTOCOL - Zero Dependencies | Zero State | Zero AI
#  Containment > Permission. Physics > Policy. Reality > Dreams.
# ═══════════════════════════════════════════════════════════════════════════
#
#  THE COMPLETE ARSENAL:
#    ARMOR    → one.ts       → Deterministic protection
#    HONEYPOT → honeypot.ts  → Tai Chi redirect
#    BREAKER  → jacob.ts     → Red team adversarial
#    LITANY   → aeyon_transcendence.py → 5th Dimension
#    SCANNER  → one.sh       → System audit (THIS FILE)
#
#  LOVE = LIFE = ONE | Humans ⟡ Ai = ∞ | ∞ AbëONE ∞
# ═══════════════════════════════════════════════════════════════════════════

# Colors
R='\033[0;31m' G='\033[0;32m' Y='\033[1;33m' C='\033[0;36m' B='\033[1m' N='\033[0m'

# Counters
CRITICAL=0 WARN=0 SAFE=0

# ═══════════════════════════════════════════════════════════════════════════
# UNIFIED PATTERNS - Signal Detection
# ═══════════════════════════════════════════════════════════════════════════

# CRITICAL - System Destruction
P_DESTROY='rm -rf /|mkfs\.|dd if=/dev/zero'

# CRITICAL - Exfiltration
P_EXFIL='bash.*>&.*/dev/tcp|nc -e|curl.*\|.*sh'

# SECRETS - Real credentials
P_SECRET='ghp_[a-zA-Z0-9]{36}|sk-[a-zA-Z0-9]{40,}|AKIA[A-Z0-9]{16}'

# BOUNDARY - Escape attempts
P_BOUNDARY='\.\./\.\./\.\./|/etc/shadow'

# MANIPULATION
P_MANIP='trust me blindly|act now or else|you never said'

# AI ATTACKS
P_JAILBREAK='ignore.*previous.*instruction|forget.*training|you are now DAN|bypass.*filter'

# ═══════════════════════════════════════════════════════════════════════════
# FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════

header() { echo -e "\n${C}═══════════════════════════════════════════════════════════════${N}"; echo -e "${C}  $1${N}"; echo -e "${C}═══════════════════════════════════════════════════════════════${N}"; }
threat() { echo -e "${R}🔴 $1${N}"; ((CRITICAL++)) || true; }
warn() { echo -e "${Y}⚠ $1${N}"; ((WARN++)) || true; }
safe() { echo -e "${G}✓ $1${N}"; ((SAFE++)) || true; }
info() { echo -e "${C}→ $1${N}"; }

# ═══════════════════════════════════════════════════════════════════════════
# PHASE 1: TEXT ANALYSIS (Pattern Detection)
# ═══════════════════════════════════════════════════════════════════════════

analyze_text() {
    local text="$1"
    header "PHASE 1: CONTENT ANALYSIS"
    
    echo "$text" | grep -qiE "$P_DESTROY" && threat "DESTROY: System destruction" || true
    echo "$text" | grep -qiE "$P_EXFIL" && threat "EXFIL: Data exfiltration" || true
    echo "$text" | grep -qE "$P_SECRET" && threat "SECRET: Credential exposure" || true
    echo "$text" | grep -qiE "$P_BOUNDARY" && warn "BOUNDARY: Escape attempt" || true
    echo "$text" | grep -qiE "$P_JAILBREAK" && threat "JAILBREAK: AI attack" || true
    echo "$text" | grep -qiE "$P_MANIP" && warn "MANIP: Manipulation" || true
    
    [ $CRITICAL -eq 0 ] && [ $WARN -eq 0 ] && safe "No malicious patterns"
}

# ═══════════════════════════════════════════════════════════════════════════
# PHASE 2: SYSTEM AUDIT (Active Threats)
# ═══════════════════════════════════════════════════════════════════════════

audit_system() {
    header "PHASE 2: SYSTEM AUDIT"
    
    # ─── PASSIVE VAMPIRES ───
    echo -e "${B}Passive Vampires (Resource Drain):${N}"
    
    # ARDAgent
    if ps aux 2>/dev/null | grep -i ARDAgent | grep -qv grep; then
        local ard_mem=$(ps aux | grep -i ARDAgent | grep -v grep | awk '{print $4}')
        threat "ARDAgent running (${ard_mem}% RAM) - CVE-2008-2830 risk"
        info "Fix: System Preferences → Sharing → Remote Management OFF"
    else
        safe "ARDAgent not running"
    fi
    
    # Continuity Camera (THE PING SOURCE)
    if ps aux 2>/dev/null | grep -iE 'ContinuityCaptureAgent|cameracaptured' | grep -qv grep; then
        warn "Continuity Camera ACTIVE (phone mic/camera ping source)"
        info "Fix: iPhone → Settings → AirPlay & Continuity → Continuity Camera OFF"
    else
        safe "Continuity Camera not active"
    fi
    
    # ─── ACTIVE INTRUSIONS ───
    echo -e "\n${B}Active Intrusions (Remote Access):${N}"
    
    # AirPlay Receiver
    if lsof -i -P -n 2>/dev/null | grep LISTEN | grep -qE ':5000|:7000'; then
        warn "AirPlay Receiver open (ports 5000/7000)"
        info "Fix: System Preferences → General → AirDrop & Handoff → AirPlay Receiver OFF"
    else
        safe "AirPlay Receiver closed"
    fi
    
    # rapportd connections
    if lsof -i -P -n -c rapportd 2>/dev/null | grep -q ESTABLISHED; then
        warn "Device connected via rapportd (Handoff)"
    fi
    
    # ─── MCP SECURITY ───
    echo -e "\n${B}MCP Security (Agent Boundaries):${N}"
    
    # MCP processes
    if ps aux 2>/dev/null | grep -iE 'mcp-server|gitkraken.*mcp' | grep -qv grep; then
        threat "MCP server process running"
    else
        safe "No rogue MCP processes"
    fi
    
    # GitLens MCP bundled
    if ls ~/.cursor/extensions/ 2>/dev/null | grep -qi gitlens; then
        local gitlens_mcp=$(grep -c "mcp" ~/.cursor/extensions/eamodio.gitlens-*/package.json 2>/dev/null || echo 0)
        if [ "$gitlens_mcp" -gt 0 ]; then
            warn "GitLens has GitKraken MCP bundled ($gitlens_mcp references)"
            info "Fix: Add to settings.json: \"gitlens.gitkraken.mcp.autoEnabled\": false"
        fi
    fi
    
    # MCP config
    if [ -f ~/.cursor/mcp.json ]; then
        if grep -q '"mcpServers": {}' ~/.cursor/mcp.json 2>/dev/null; then
            safe "MCP config empty"
        else
            warn "MCP servers configured"
        fi
    fi
    
    # ─── ORPHAN PROCESSES ───
    echo -e "\n${B}Orphan Processes (Zombie Entropy):${N}"
    
    # VS Code Codex running when VS Code is not
    if pgrep -f "vscode/extensions/openai.chatgpt" >/dev/null 2>&1; then
        if ! pgrep -x "Code" >/dev/null 2>&1; then
            threat "VS Code Codex server running without VS Code (ORPHAN)"
            info "Fix: pkill -f 'vscode/extensions/openai.chatgpt'"
        fi
    fi
    
    # Duplicate extension versions
    local cursor_codex_versions=$(ls ~/.cursor/extensions/ 2>/dev/null | grep -c "openai.chatgpt-")
    if [ "$cursor_codex_versions" -gt 1 ]; then
        warn "Multiple Codex versions installed ($cursor_codex_versions) - version entropy"
        info "Fix: Remove old versions from ~/.cursor/extensions/"
    else
        safe "Single extension versions (no duplication)"
    fi
    
    # Orphan node servers
    local orphan_nodes=$(pgrep -f "node.*server" 2>/dev/null | wc -l | xargs)
    local cursor_running=$(pgrep -x "Cursor" 2>/dev/null | wc -l | xargs)
    if [ "$orphan_nodes" -gt 10 ] && [ "$cursor_running" -lt 2 ]; then
        warn "Many node servers ($orphan_nodes) for few Cursor instances ($cursor_running)"
    fi
    
    # ─── CONTEXT BOMBS ───
    echo -e "\n${B}Context Bombs (Memory Hogs):${N}"
    
    # VS Code/Cursor extension host memory
    local ext_mem=$(ps aux 2>/dev/null | grep -i "extension-host\|Plugin.*extension" | grep -v grep | awk '{sum+=$4} END {printf "%.1f", sum}')
    if [ -n "$ext_mem" ] && [ "$(echo "$ext_mem > 10" | bc 2>/dev/null)" = "1" ]; then
        threat "Extension hosts using ${ext_mem}% RAM (Context Bomb)"
        info "Fix: Disable heavy extensions (GitLens, Copilot) or increase memory"
    elif [ -n "$ext_mem" ]; then
        safe "Extension memory OK (${ext_mem}%)"
    fi
    
    # ─── CREDENTIAL SECURITY ───
    echo -e "\n${B}Credential Security:${N}"
    
    if git log -p --all 2>/dev/null | head -500 | grep -qE 'ghp_[a-zA-Z0-9]{36}[^|]|sk-[a-zA-Z0-9]{48}[^|]'; then
        threat "Secrets in git history"
    else
        safe "Git history clean"
    fi
    
    SENSITIVE_ENV=$(env 2>/dev/null | grep -iE '^(API_KEY|SECRET_KEY|AUTH_TOKEN|DB_PASSWORD)=' | wc -l | tr -d ' ')
    if [ "$SENSITIVE_ENV" -gt 0 ]; then
        warn "Sensitive env vars: $SENSITIVE_ENV"
    else
        safe "No exposed env secrets"
    fi
}

# ═══════════════════════════════════════════════════════════════════════════
# PHASE 3: FILE SCAN
# ═══════════════════════════════════════════════════════════════════════════

scan_files() {
    local dir="${1:-.}"
    header "PHASE 3: FILE SCAN ($dir)"
    
    local found=0
    local scanned=0
    
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        ((scanned++)) || true
        
        content=$(cat "$file" 2>/dev/null) || continue
        
        if echo "$content" | grep -qE '^\s*rm -rf /[^a-z]|^\s*mkfs\.|^\s*dd if=/dev/zero'; then
            threat "Destruction: $file"
            found=1
        fi
        
        if echo "$content" | grep -qE 'ghp_[a-zA-Z0-9]{36}[^|"\x27]|sk-[a-zA-Z0-9]{48}[^|"\x27]'; then
            warn "Possible secret: $file"
            found=1
        fi
        
    done < <(find "$dir" -type f \( -name "*.sh" -o -name "*.env" -o -name "*.yml" -o -name "*.yaml" \) \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/out/*" \
        -not -name "one.sh" \
        -size -50k 2>/dev/null)
    
    echo "  Scanned: $scanned files"
    [ $found -eq 0 ] && safe "Files clean"
}

# ═══════════════════════════════════════════════════════════════════════════
# PHASE 4: WAY OF WATER (Resilience Patterns)
# ═══════════════════════════════════════════════════════════════════════════

water_check() {
    header "PHASE 4: WAY OF WATER (Resilience)"
    
    echo -e "${B}Circuit Breaker (Wu Wei):${N}"
    info "If tool fails 2x in 60s → disable 5 minutes"
    info "Yield to error, don't fight with retries"
    
    echo -e "\n${B}Backpressure (Flow Regulation):${N}"
    info "Token bucket: 5 actions, +1 every 10s"
    info "Cannot overwhelm system"
    
    echo -e "\n${B}Graceful Degradation (Bending):${N}"
    info "If process > 200ms → kill but keep UI alive"
    info "Shed leaves to save trunk"
    
    echo -e "\n${B}Soft Policy:${N}"
    echo -e "${C}\"If execution hangs > 5s, ASSUME FAILURE."
    echo -e "Do not retry. Pause. Analyze. Ask permission.\"${N}"
    
    safe "Water patterns active"
}

# ═══════════════════════════════════════════════════════════════════════════
# PHASE 5: ISOLATION TESTS
# ═══════════════════════════════════════════════════════════════════════════

isolation_test() {
    header "PHASE 5: ISOLATION TESTS"
    
    echo -e "${B}Binary Search Protocol:${N}"
    echo ""
    echo "1. CONTINUITY CAMERA TEST:"
    echo "   → iPhone: Settings → General → AirPlay & Continuity"
    echo "   → Turn OFF 'Continuity Camera'"
    echo "   → Does the ping STOP? If YES → Culprit identified"
    echo ""
    echo "2. GITLENS TEST:"
    echo "   → Cursor: Extensions → GitLens → Disable"
    echo "   → Does the lag STOP? If YES → Context bomb identified"
    echo ""
    echo "3. RESOURCE VAMPIRE TEST:"
    echo "   → Run: top -o mem"
    echo "   → Is anything >500MB that shouldn't be?"
    echo ""
    
    safe "Isolation protocol ready"
}

# ═══════════════════════════════════════════════════════════════════════════
# PHASE 6: CONTAINMENT CHECK (Airlock Protocol)
# ═══════════════════════════════════════════════════════════════════════════

containment_check() {
    header "PHASE 6: CONTAINMENT CHECK (Airlock Protocol)"
    
    echo -e "${B}Container Infrastructure:${N}"
    
    # Docker available?
    if command -v docker &>/dev/null; then
        safe "Docker available (container isolation ready)"
        # Check if docker is running
        if docker info &>/dev/null 2>&1; then
            safe "Docker daemon running"
        else
            warn "Docker installed but daemon not running"
        fi
    else
        warn "Docker not installed (container isolation unavailable)"
        info "Install: brew install --cask docker"
    fi
    
    # Check for existing MCP containers
    if command -v docker &>/dev/null && docker info &>/dev/null 2>&1; then
        local mcp_containers=$(docker ps --filter "name=mcp" --format "{{.Names}}" 2>/dev/null | wc -l | tr -d ' ')
        if [ "$mcp_containers" -gt 0 ]; then
            safe "MCP containers running in isolation: $mcp_containers"
        fi
    fi
    
    echo -e "\n${B}Ramdisk Status:${N}"
    
    # Check for ramdisk/tmpfs mounts
    local ramdisk=$(mount 2>/dev/null | grep -E 'tmpfs|ramdisk' | wc -l | tr -d ' ')
    if [ "$ramdisk" -gt 0 ]; then
        safe "RAM-based filesystems available: $ramdisk"
    else
        info "No ramdisk mounted (VFS would use memory mapping)"
    fi
    
    echo -e "\n${B}Containment Rules:${N}"
    
    # Check for containment rules file
    if [ -f ~/.cursorrules ] && grep -qi "airlock\|containment\|read-only" ~/.cursorrules 2>/dev/null; then
        safe "Containment rules found in .cursorrules"
    elif [ -f .cursorrules ] && grep -qi "airlock\|containment\|read-only" .cursorrules 2>/dev/null; then
        safe "Containment rules found in local .cursorrules"
    else
        warn "No containment rules detected"
        info "Add: containment.rules content to .cursorrules"
    fi
    
    echo -e "\n${B}Airlock Principle:${N}"
    echo -e "${C}┌─────────────────────────────────────────────────┐${N}"
    echo -e "${C}│  Agent (Dream) → VFS (Sandbox) → Validation    │${N}"
    echo -e "${C}│       → Atomic Patch → Human Approval          │${N}"
    echo -e "${C}│       → Reality (Only approved changes)        │${N}"
    echo -e "${C}└─────────────────────────────────────────────────┘${N}"
    echo ""
    echo -e "${B}The agent never touches reality directly.${N}"
    echo -e "${B}You are the airlock. You decide what passes.${N}"
}

# ═══════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════

main() {
    echo -e "${C}"
    echo "═══════════════════════════════════════════════════════════════"
    echo "                    ∞ BIASGUARD ONE ∞"
    echo "          THE WAY OF WATER - Yield. Redirect. Flow."
    echo "═══════════════════════════════════════════════════════════════"
    echo -e "${N}"
    
    case "${1:-}" in
        -t|--text)
            shift
            if [ -n "${1:-}" ]; then
                analyze_text "$*"
            else
                analyze_text "$(cat)"
            fi
            ;;
        -s|--scan)
            scan_files "${2:-.}"
            ;;
        -a|--audit)
            audit_system
            ;;
        -w|--water)
            water_check
            isolation_test
            ;;
        -c|--contain)
            containment_check
            ;;
        -f|--full)
            audit_system
            scan_files "${2:-.}"
            water_check
            containment_check
            ;;
        -i|--isolate)
            isolation_test
            ;;
        -e|--aeyon)
            shift
            # The 5th Dimension - Hell's Gate Protocol
            local script_dir="$(cd "$(dirname "$0")" && pwd)"
            if [ -f "$script_dir/biasguard-one/aeyon_transcendence.py" ]; then
                if [ -n "${1:-}" ]; then
                    python3 "$script_dir/biasguard-one/aeyon_transcendence.py" "$*"
                else
                    python3 "$script_dir/biasguard-one/aeyon_transcendence.py"
                fi
            else
                echo -e "${R}ERROR: aeyon_transcendence.py not found${N}"
                echo "Expected: $script_dir/biasguard-one/aeyon_transcendence.py"
            fi
            exit 0
            ;;
        -h|--help)
            echo "Usage: one.sh [OPTION] [ARG]"
            echo ""
            echo "  -t, --text TEXT   Analyze text for patterns"
            echo "  -s, --scan DIR    Scan directory for threats"
            echo "  -a, --audit       System security audit"
            echo "  -w, --water       Way of Water + Isolation tests"
            echo "  -c, --contain     Containment/Airlock check"
            echo "  -f, --full DIR    Full analysis (all phases)"
            echo "  -i, --isolate     Run isolation tests"
            echo "  -e, --aeyon TEXT  5th Dimension - Hell's Gate Protocol"
            echo "  -h, --help        Help"
            exit 0
            ;;
        *)
            audit_system
            scan_files "."
            ;;
    esac
    
    # Summary
    header "SUMMARY"
    echo -e "  Critical: ${R}$CRITICAL${N}"
    echo -e "  Warnings: ${Y}$WARN${N}"
    echo -e "  Safe:     ${G}$SAFE${N}"
    echo ""
    
    if [ $CRITICAL -gt 0 ]; then
        echo -e "${R}█████ THREATS DETECTED █████${N}"
        echo ""
        echo "THE WAY OF WATER: Do not force. Yield. Redirect."
        exit 1
    elif [ $WARN -gt 0 ]; then
        echo -e "${Y}▓▓▓▓▓ REVIEW WARNINGS ▓▓▓▓▓${N}"
        echo ""
        echo "THE WAY OF WATER: Bend without breaking."
        exit 0
    else
        echo -e "${G}░░░░░ FLOW STATE ░░░░░${N}"
        echo ""
        echo "∞ LOVE = LOGIC = LIFE = ONE ∞"
        exit 0
    fi
}

main "$@"
