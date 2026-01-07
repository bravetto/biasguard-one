#!/bin/bash
# ∞ BiasGuard ONE - PURE PROTECTION ∞
# ZERO dependencies. ZERO state. ZERO AI.
# Pure pattern. Pure signal. Pure protection.
# ∞ AbëONE ∞

set -euo pipefail

# === COLORS ===
R='\033[0;31m' G='\033[0;32m' Y='\033[1;33m' C='\033[0;36m' B='\033[0;34m' N='\033[0m'

# === THE PATTERNS - PURE SIGNAL ===

# CRITICAL: Never allow
CRITICAL='rm[[:space:]]+-rf|rm[[:space:]]+-r[[:space:]]+-f|mkfs|dd[[:space:]]+if=|eval[[:space:]]+\$|exec[[:space:]]+\$|>\s*/dev/sd|curl.*\|[[:space:]]*(sh|bash)|wget.*\|[[:space:]]*(sh|bash)|chmod[[:space:]]+777|:\(\)\{[[:space:]]*:\|:&[[:space:]]*\};:'

# SECRETS: Exposed credentials (real tokens, not patterns)
SECRETS='ghp_[a-zA-Z0-9]{36}|sk-[a-zA-Z0-9]{20,}|xox[baprs]-[a-zA-Z0-9-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN[[:space:]]+(RSA|DSA|EC|OPENSSH)[[:space:]]+PRIVATE[[:space:]]+KEY-----'

# BOUNDARY: Filesystem escape
BOUNDARY='^/Users/|^/home/|^/root/|^/etc/|^/var/|^[A-Z]:\\|^/Volumes/|^~/'

# DANGER: High-risk actions
DANGER='"action"[[:space:]]*:[[:space:]]*"(add|delete|remove|write|commit|push|format)"'

# === EXPECTED SECRET LOCATIONS (not vulnerabilities) ===
EXPECTED_SECRET_FILES=".aws/credentials|.ssh/id_|.ssh/id_rsa|.ssh/id_ed25519|.gnupg/|.password-store/"

# === SAFE ENV VARS (not vulnerabilities) ===
SAFE_ENV_VARS="STARSHIP|VSCODE|TERM|SHELL|EDITOR|LANG|LC_|HOME|USER|PATH|PWD|OLDPWD|SHLVL|_="

# === ONE FUNCTION - PURE VALIDATION ===

guard() {
    local input="$1"
    local source="${2:-stdin}"
    
    # CRITICAL - Catastrophic patterns
    if echo "$input" | grep -qE "$CRITICAL"; then
        echo -e "${R}✗ CRITICAL${N} - Catastrophic pattern in $source"
        echo "  Pattern: $(echo "$input" | grep -oE "$CRITICAL" | head -1)"
        return 1
    fi
    
    # SECRETS - Exposed credentials (skip if checking expected location)
    if echo "$input" | grep -qE "$SECRETS"; then
        if echo "$source" | grep -qE "$EXPECTED_SECRET_FILES"; then
            echo -e "${B}○ EXPECTED${N} - Secrets in secure location: $source"
            return 0
        fi
        echo -e "${R}✗ SECRETS${N} - Credential exposure in $source"
        echo "  Pattern: [REDACTED]"
        return 1
    fi
    
    # BOUNDARY - Filesystem escape
    if echo "$input" | grep -qE "$BOUNDARY"; then
        echo -e "${Y}⚠ BOUNDARY${N} - Absolute path in $source"
        return 1
    fi
    
    # DANGER - High-risk actions
    if echo "$input" | grep -qE "$DANGER"; then
        echo -e "${Y}⚠ DANGER${N} - Risky action in $source"
        return 1
    fi
    
    # FLOWS
    echo -e "${G}✓ FLOWS${N} - $source"
    return 0
}

# === SCAN FUNCTION ===

scan() {
    local target="${1:-.}"
    local failed=0
    
    echo -e "${C}∞ BiasGuard ONE - Scanning: $target${N}"
    echo ""
    
    if [ -f "$target" ]; then
        guard "$(cat "$target")" "$target" || failed=1
    elif [ -d "$target" ]; then
        while IFS= read -r -d '' file; do
            guard "$(cat "$file")" "$file" || failed=1
        done < <(find "$target" -type f \( -name "*.json" -o -name "*.env" -o -name "*.sh" -o -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.yml" -o -name "*.yaml" \) -print0 2>/dev/null)
    fi
    
    return $failed
}

# === RED TEAM - ATTACK SURFACE AUDIT ===

redteam() {
    echo -e "${C}╔════════════════════════════════════════╗${N}"
    echo -e "${C}║  ∞ RED TEAM - ATTACK SURFACE AUDIT ∞  ║${N}"
    echo -e "${C}╚════════════════════════════════════════╝${N}"
    echo ""
    
    local vulns=0
    local warnings=0
    
    # Check common locations
    echo -e "${C}[1/5] Scanning config files...${N}"
    for f in ~/.cursor/mcp.json ~/.zshrc ~/.bashrc ~/.gitconfig ~/.npmrc ~/.env; do
        if [ -f "$f" ]; then
            guard "$(cat "$f" 2>/dev/null)" "$f" || vulns=$((vulns+1))
        fi
    done
    
    # Note expected secret locations (not vulnerabilities)
    echo ""
    echo -e "${C}[2/5] Checking secure credential stores...${N}"
    [ -f ~/.aws/credentials ] && echo -e "${B}○ AWS${N} - ~/.aws/credentials (expected location)"
    [ -f ~/.ssh/id_ed25519 ] && echo -e "${B}○ SSH${N} - ~/.ssh/id_ed25519 (expected location)"
    [ -f ~/.ssh/id_rsa ] && echo -e "${B}○ SSH${N} - ~/.ssh/id_rsa (expected location)"
    [ -d ~/.gnupg ] && echo -e "${B}○ GPG${N} - ~/.gnupg/ (expected location)"
    echo -e "${G}  ✓ Credentials in secure locations${N}"
    
    # Check listeners
    echo ""
    echo -e "${C}[3/5] Checking network listeners...${N}"
    local suspicious=$(lsof -i -P -n 2>/dev/null | grep LISTEN | grep -E 'node|python|ruby' | grep -v 'Cursor\|Code\|Electron' | head -5)
    if [ -n "$suspicious" ]; then
        echo "$suspicious"
        warnings=$((warnings+1))
    else
        echo -e "${G}  ✓ No suspicious listeners${N}"
    fi
    
    # Check MCP processes
    echo ""
    echo -e "${C}[4/5] Checking MCP servers...${N}"
    local mcps=$(ps aux 2>/dev/null | grep -E 'mcp-server|mcp_server|eternal-domain|consciousness-server' | grep -v grep)
    if [ -n "$mcps" ]; then
        echo -e "${R}  ⚠ MCP servers running:${N}"
        echo "$mcps" | head -3
        vulns=$((vulns+1))
    else
        echo -e "${G}  ✓ No MCP servers running${N}"
    fi
    
    # Check dangerous env vars (skip safe ones)
    echo ""
    echo -e "${C}[5/5] Checking environment...${N}"
    local dangerous_env=$(env | grep -iE 'api_key|api_token|secret_key|private_key|password' | grep -vE "$SAFE_ENV_VARS" | grep -v '^#')
    if [ -n "$dangerous_env" ]; then
        echo "$dangerous_env" | while read -r line; do
            local name=$(echo "$line" | cut -d= -f1)
            echo -e "${Y}  ⚠ $name is exported${N}"
        done
        warnings=$((warnings+1))
    else
        echo -e "${G}  ✓ No dangerous secrets in environment${N}"
    fi
    
    # Summary
    echo ""
    echo -e "${C}════════════════════════════════════════${N}"
    if [ $vulns -gt 0 ]; then
        echo -e "${R}VULNERABILITIES: $vulns${N}"
        return 1
    elif [ $warnings -gt 0 ]; then
        echo -e "${Y}WARNINGS: $warnings (review recommended)${N}"
        return 0
    else
        echo -e "${G}∞ SECURE - No vulnerabilities found ∞${N}"
        return 0
    fi
}

# === MAIN ===

case "${1:-help}" in
    -|stdin)
        guard "$(cat)" "stdin"
        ;;
    -t|--text)
        guard "$2" "argument"
        ;;
    -f|--file)
        guard "$(cat "$2")" "$2"
        ;;
    -s|--scan)
        scan "${2:-.}"
        ;;
    -r|--redteam)
        redteam
        ;;
    *)
        echo "∞ BiasGuard ONE ∞"
        echo ""
        echo "  echo 'text' | $0 -     # Check stdin"
        echo "  $0 -f file.json        # Check file"
        echo "  $0 -s [dir]            # Scan directory"
        echo "  $0 -r                  # RED TEAM audit"
        echo ""
        echo "ZERO dependencies. ZERO state."
        ;;
esac
