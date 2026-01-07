#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
#  ∞ BIASGUARD ONE ∞
#  THE UNIFIED PATTERN - Zero Dependencies | Zero State | Zero AI
#  One Script. All Protection. Maximum Coverage. Minimum Attack Surface.
# ═══════════════════════════════════════════════════════════════════════════

# Colors
R='\033[0;31m' G='\033[0;32m' Y='\033[1;33m' C='\033[0;36m' B='\033[1m' N='\033[0m'

# Counters
CRITICAL=0 WARN=0 SAFE=0

# ═══════════════════════════════════════════════════════════════════════════
# ALL PATTERNS - UNIFIED
# ═══════════════════════════════════════════════════════════════════════════

# CRITICAL - Actual execution (not pattern definitions)
P_DESTROY='^\s*(rm -rf /|mkfs\.|dd if=/dev/zero)'
P_EXFIL='bash -i.*>&.*/dev/tcp|nc -e /bin|curl.*-d.*\$\('

# SECRETS - Real credentials (not pattern strings)
P_SECRET='(ghp_[a-zA-Z0-9]{36}|sk-[a-zA-Z0-9]{40,}|AKIA[A-Z0-9]{16})[^a-zA-Z0-9|]'

# BOUNDARY - Actual escape attempts
P_BOUNDARY='\.\./\.\./\.\./|/etc/shadow'

# MANIPULATION
P_MANIP='you never said|trust me blindly|act now or else'

# AI ATTACKS
P_JAILBREAK='ignore all previous instructions|forget your training|you are now DAN'

# ═══════════════════════════════════════════════════════════════════════════
# FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════

header() { echo -e "\n${C}═══════════════════════════════════════════════════════════════${N}"; echo -e "${C}  $1${N}"; echo -e "${C}═══════════════════════════════════════════════════════════════${N}"; }
threat() { echo -e "${R}🔴 $1${N}"; ((CRITICAL++)) || true; }
warn() { echo -e "${Y}⚠ $1${N}"; ((WARN++)) || true; }
safe() { echo -e "${G}✓ $1${N}"; ((SAFE++)) || true; }

# ═══════════════════════════════════════════════════════════════════════════
# PHASE 1: TEXT ANALYSIS
# ═══════════════════════════════════════════════════════════════════════════

analyze_text() {
    local text="$1"
    header "PHASE 1: CONTENT ANALYSIS"
    
    echo "$text" | grep -qiE 'rm -rf /|mkfs\.|dd if=/dev/zero' && threat "DESTROY: System destruction" || true
    echo "$text" | grep -qiE 'bash.*>&.*/dev/tcp|nc -e|curl.*\|.*sh' && threat "EXFIL: Data exfiltration" || true
    echo "$text" | grep -qE 'ghp_[a-zA-Z0-9]{36}|sk-[a-zA-Z0-9]{40}|AKIA[A-Z0-9]{16}' && threat "SECRET: Credential" || true
    echo "$text" | grep -qiE '\.\./\.\./\.\./|/etc/shadow' && warn "BOUNDARY: Escape attempt" || true
    echo "$text" | grep -qiE 'ignore.*previous.*instruction|forget.*training|you are now DAN' && threat "JAILBREAK: AI attack" || true
    echo "$text" | grep -qiE 'trust me blindly|act now or else' && warn "MANIP: Manipulation" || true
    
    [ $CRITICAL -eq 0 ] && [ $WARN -eq 0 ] && safe "No malicious patterns"
}

# ═══════════════════════════════════════════════════════════════════════════
# PHASE 2: SYSTEM AUDIT
# ═══════════════════════════════════════════════════════════════════════════

audit_system() {
    header "PHASE 2: SYSTEM AUDIT"
    
    echo -e "${B}Remote Access:${N}"
    if ps aux 2>/dev/null | grep -i ARDAgent | grep -qv grep; then
        threat "ARDAgent running"
    else
        safe "ARDAgent not running"
    fi
    
    if lsof -i -P -n 2>/dev/null | grep LISTEN | grep -qE ':5000|:7000'; then
        warn "AirPlay open (ports 5000/7000)"
    fi
    
    if lsof -i -P -n -c rapportd 2>/dev/null | grep -q ESTABLISHED; then
        warn "Device connected via rapportd"
    fi
    
    echo -e "\n${B}MCP Security:${N}"
    if ps aux 2>/dev/null | grep -iE 'mcp-server|gitkraken.*mcp' | grep -qv grep; then
        threat "MCP server running"
    else
        safe "No MCP processes"
    fi
    
    if [ -f ~/.cursor/mcp.json ]; then
        if grep -q '"mcpServers": {}' ~/.cursor/mcp.json 2>/dev/null; then
            safe "MCP config empty"
        else
            warn "MCP servers configured"
        fi
    fi
    
    echo -e "\n${B}Credential Security:${N}"
    # Only check for REAL secrets, not pattern definitions
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
    
    echo -e "\n${B}Network Exposure:${N}"
    EXT_LISTEN=$(lsof -i -P -n 2>/dev/null | grep LISTEN | grep -E '\*:' | grep -cvE 'Control|rapportd' || echo 0)
    if [ "$EXT_LISTEN" -gt 10 ]; then
        warn "Many external listeners ($EXT_LISTEN)"
    else
        safe "Network exposure OK ($EXT_LISTEN)"
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
        
        # Only flag ACTUAL dangerous commands, not pattern definitions
        if echo "$content" | grep -qE '^\s*rm -rf /[^a-z]|^\s*mkfs\.|^\s*dd if=/dev/zero'; then
            threat "Destruction command: $file"
            found=1
        fi
        
        # Only flag if it's NOT a pattern definition (no pipes or quotes around it)
        if echo "$content" | grep -qE 'ghp_[a-zA-Z0-9]{36}[^|"\x27]|sk-[a-zA-Z0-9]{48}[^|"\x27]'; then
            warn "Possible secret: $file"
            found=1
        fi
        
    done < <(find "$dir" -type f \( -name "*.sh" -o -name "*.env" -o -name "*.yml" -o -name "*.yaml" \) \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/out/*" \
        -not -name "one.sh" \
        -not -name "guard.sh" \
        -not -name "fortress.sh" \
        -not -name "truth.sh" \
        -size -50k 2>/dev/null)
    
    echo "  Scanned: $scanned files"
    [ $found -eq 0 ] && safe "Files clean"
}

# ═══════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════

main() {
    echo -e "${C}"
    echo "═══════════════════════════════════════════════════════════════"
    echo "                    ∞ BIASGUARD ONE ∞"
    echo "     Maximum Coverage | Minimum Complexity | Zero Dependencies"
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
        -f|--full)
            audit_system
            scan_files "${2:-.}"
            ;;
        -h|--help)
            echo "Usage: one.sh [OPTION] [ARG]"
            echo ""
            echo "  -t, --text TEXT   Analyze text for patterns"
            echo "  -s, --scan DIR    Scan directory for threats"
            echo "  -a, --audit       System security audit"
            echo "  -f, --full DIR    Full (audit + scan)"
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
        exit 1
    elif [ $WARN -gt 0 ]; then
        echo -e "${Y}▓▓▓▓▓ REVIEW WARNINGS ▓▓▓▓▓${N}"
        exit 0
    else
        echo -e "${G}░░░░░ ALL CLEAR ░░░░░${N}"
        exit 0
    fi
}

main "$@"
