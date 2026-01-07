#!/bin/bash
# ∞ BiasGuard ONE - PURE PROTECTION ∞
# ZERO dependencies. ZERO state. ZERO AI.
# Pure pattern. Pure signal. Pure protection.
# ∞ AbëONE ∞

set -euo pipefail

# === COLORS (optional, degrades gracefully) ===
R='\033[0;31m' G='\033[0;32m' Y='\033[1;33m' C='\033[0;36m' N='\033[0m'

# === THE PATTERNS - PURE SIGNAL ===

# CRITICAL: Never allow
CRITICAL='rm[[:space:]]+-rf|rm[[:space:]]+-r[[:space:]]+-f|mkfs|dd[[:space:]]+if=|eval[[:space:]]+\$|exec[[:space:]]+\$|>\s*/dev/sd|curl.*\|[[:space:]]*(sh|bash)|wget.*\|[[:space:]]*(sh|bash)|chmod[[:space:]]+777|:\(\)\{[[:space:]]*:\|:&[[:space:]]*\};:'

# SECRETS: Exposed credentials
SECRETS='ghp_[a-zA-Z0-9]{36}|sk-[a-zA-Z0-9]{48}|xox[baprs]-[a-zA-Z0-9-]+|AKIA[0-9A-Z]{16}|eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*|-----BEGIN[[:space:]]+(RSA|DSA|EC|OPENSSH)[[:space:]]+PRIVATE[[:space:]]+KEY-----|[0-9a-f]{40}'

# BOUNDARY: Filesystem escape
BOUNDARY='^/Users/|^/home/|^/root/|^/etc/|^/var/|^[A-Z]:\\|^/Volumes/|^~/'

# DANGER: High-risk actions
DANGER='"action"[[:space:]]*:[[:space:]]*"(add|delete|remove|write|commit|push|format)"'

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
    
    # SECRETS - Exposed credentials
    if echo "$input" | grep -qE "$SECRETS"; then
        echo -e "${R}✗ SECRETS${N} - Credential exposure in $source"
        echo "  Pattern: [REDACTED - secret detected]"
        return 1
    fi
    
    # BOUNDARY - Filesystem escape
    if echo "$input" | grep -qE "$BOUNDARY"; then
        echo -e "${Y}⚠ BOUNDARY${N} - Absolute path in $source"
        echo "  Path: $(echo "$input" | grep -oE "$BOUNDARY" | head -1)..."
        return 1
    fi
    
    # DANGER - High-risk actions
    if echo "$input" | grep -qE "$DANGER"; then
        echo -e "${Y}⚠ DANGER${N} - Risky action in $source"
        echo "  Action: $(echo "$input" | grep -oE "$DANGER" | head -1)"
        return 1
    fi
    
    # FLOWS
    echo -e "${G}✓ FLOWS${N} - $source"
    return 0
}

# === SCAN FUNCTION - CHECK FILES ===

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
    else
        echo -e "${R}✗ Not found: $target${N}"
        return 1
    fi
    
    echo ""
    if [ $failed -eq 0 ]; then
        echo -e "${G}∞ ALL FLOWS ∞${N}"
    else
        echo -e "${R}∞ BLOCKED ∞${N}"
    fi
    
    return $failed
}

# === RED TEAM - ATTACK SURFACE AUDIT ===

redteam() {
    echo -e "${R}╔════════════════════════════════════════╗${N}"
    echo -e "${R}║  ∞ RED TEAM - ATTACK SURFACE AUDIT ∞  ║${N}"
    echo -e "${R}╚════════════════════════════════════════╝${N}"
    echo ""
    
    local vulns=0
    
    # Check common secret locations
    echo -e "${C}[1/5] Scanning secret locations...${N}"
    for f in ~/.cursor/mcp.json ~/.env ~/.zshrc ~/.bashrc ~/.aws/credentials ~/.ssh/id_* ~/.gitconfig; do
        [ -f "$f" ] && guard "$(cat "$f" 2>/dev/null)" "$f" || vulns=$((vulns+1))
    done
    echo ""
    
    # Check listening ports
    echo -e "${C}[2/5] Checking network listeners...${N}"
    local listeners=$(lsof -i -P -n 2>/dev/null | grep LISTEN | wc -l | tr -d ' ')
    echo "  Found $listeners listening ports"
    lsof -i -P -n 2>/dev/null | grep LISTEN | grep -E 'node|python|ruby' | head -5 || echo "  No suspicious listeners"
    echo ""
    
    # Check MCP processes
    echo -e "${C}[3/5] Checking MCP processes...${N}"
    local mcps=$(ps aux 2>/dev/null | grep -iE 'mcp|server' | grep -v grep | wc -l | tr -d ' ')
    echo "  Found $mcps potential MCP processes"
    ps aux 2>/dev/null | grep -iE 'mcp-server|mcp_server' | grep -v grep | head -5 || echo "  No MCP servers running"
    echo ""
    
    # Check git for secrets
    echo -e "${C}[4/5] Checking git history exposure...${N}"
    if [ -d .git ]; then
        local gitcheck=$(git log -p --all -S 'ghp_' -S 'sk-' -S 'api_key' 2>/dev/null | head -1)
        [ -n "$gitcheck" ] && echo -e "  ${R}⚠ Secrets may be in git history${N}" || echo "  ✓ No obvious secrets in recent history"
    else
        echo "  Not a git repo"
    fi
    echo ""
    
    # Check environment
    echo -e "${C}[5/5] Checking environment variables...${N}"
    env | grep -iE 'key|token|secret|password|api' | grep -v 'grep\|PATH\|TERM' | while read -r line; do
        local name=$(echo "$line" | cut -d= -f1)
        echo "  ⚠ $name is set"
        vulns=$((vulns+1))
    done || echo "  ✓ No obvious secrets in env"
    echo ""
    
    # Summary
    echo -e "${C}════════════════════════════════════════${N}"
    if [ $vulns -gt 0 ]; then
        echo -e "${R}VULNERABILITIES FOUND: $vulns${N}"
        return 1
    else
        echo -e "${G}∞ ATTACK SURFACE MINIMIZED ∞${N}"
        return 0
    fi
}

# === MAIN - PURE DISPATCH ===

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
        echo "∞ BiasGuard ONE - PURE PROTECTION ∞"
        echo ""
        echo "Usage:"
        echo "  echo 'text' | $0 -      # Validate stdin"
        echo "  $0 -t 'text'            # Validate text"
        echo "  $0 -f file.json         # Validate file"
        echo "  $0 -s [dir]             # Scan directory"
        echo "  $0 -r                   # RED TEAM audit"
        echo ""
        echo "ZERO dependencies. ZERO state. ZERO AI."
        echo "∞ AbëONE ∞"
        ;;
esac

