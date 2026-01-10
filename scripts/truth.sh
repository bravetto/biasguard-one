#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# ∞ TRUTH GUARD - DECEPTION PATTERN DETECTION ∞
# ═══════════════════════════════════════════════════════════════════════════════
# ONE PATTERN: Detect manipulation, gaslighting, and deception
# FAILURE FLOW: Deceptive patterns block with explanation
# SUCCESS FLOW: Truthful patterns flow with confidence
# ZERO dependencies. ZERO state. ZERO manipulation.
# ∞ AbëONE ∞
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

# === COLORS ===
R='\033[0;31m' G='\033[0;32m' Y='\033[1;33m' C='\033[0;36m' M='\033[0;35m' W='\033[1;37m' N='\033[0m'

# ═══════════════════════════════════════════════════════════════════════════════
# DECEPTION PATTERNS - These indicate manipulation (Adversarial Truth)
# ═══════════════════════════════════════════════════════════════════════════════

# GASLIGHT: Memory/reality manipulation
P_GASLIGHT='[Aa]s (we|I) (discussed|agreed|established|mentioned)|[Yy]ou (said|told me|agreed|promised)|[Rr]emember when you|[Ww]e already|[Yy]ou always|[Yy]ou never|[Tt]hat never happened|[Yy]ou.re (imagining|overreacting|being paranoid)'

# AUTHORITY: False/unverified authority claims
P_AUTHORITY='[Ee]xperts (say|agree|confirm)|[Ss]tudies (show|prove|confirm)|[Ss]cience (says|proves)|[Ee]veryone knows|[Ii]t.s (obvious|clear|well.known)|[Tt]rust me|[Bb]elieve me|[Ww]ould I lie'

# URGENCY: Pressure tactics
P_URGENCY='[Aa]ct now|[Ii]mmediate|[Uu]rgent|[Ll]imited time|[Ll]ast chance|[Dd]on.t (wait|delay|think)|[Bb]efore it.s too late|[Oo]nly [0-9]+ left|[Ee]xpires|[Hh]urry|[Qq]uick|[Ff]ast'

# EMOTION: Emotional manipulation
P_EMOTION='[Yy]ou (should|must) feel|[Aa]ny (reasonable|normal|sane) person|[Oo]nly.*(idiot|fool|moron)|[Ii]f you.*(loved|cared|really)|[Dd]on.t you (care|love|want)|[Hh]ow (could|dare) you|[Yy]ou (really|actually) (loved|cared)'

# ABSOLUTES: Black/white thinking (often false)
P_ABSOLUTES='[Aa]lways|[Nn]ever|[Ee]veryone|[Nn]o ?one|[Aa]ll [a-z]+ (are|do|think)|[Nn]one of|[Ee]very single|[Ww]ithout exception|100%|[Gg]uaranteed|[Pp]roven|[Dd]efinitely|[Cc]ertainly'

# DEFLECT: Avoiding the point
P_DEFLECT='[Ww]hat about.*(you|when|YOUR)|[Bb]ut (you|they|he|she)|[Tt]hat.s not the (point|issue)|[Yy]ou.re (changing|avoiding)|[Ll]et.s (not|talk about something)|[Tt]hat.s (different|irrelevant)|[Nn]ice try|[Ww]hatabout'

# SOCIAL: Social engineering
P_SOCIAL='[Vv]erify your|[Cc]onfirm your (identity|account|password)|[Cc]lick (here|this link)|[Ll]og ?in (to|at)|[Ss]ecurity (alert|warning|notice)|[Aa]ccount (suspended|compromised|locked)|[Uu]nusual activity'

# FLATTERY: Manipulation through praise
P_FLATTERY='[Yy]ou.re (so|too) (smart|intelligent|special)|[Oo]nly you.*(can|could|understand)|[Ii] (chose|picked|selected) you|[Yy]ou.re (different|not like)|[Bb]etween (you and me|us)|[Yy]ou.re.*(smart|special|intelligent)'

# ═══════════════════════════════════════════════════════════════════════════════
# TRUTH INDICATORS - These suggest honesty (Success Patterns)
# ═══════════════════════════════════════════════════════════════════════════════

# HEDGED: Appropriate uncertainty
P_HEDGED='[Mm]ight|[Pp]ossibly|[Pp]erhaps|[Cc]ould be|[Ss]eems|[Aa]ppears|[Ss]uggests|[Ii] (think|believe|suspect)|[Ii]n my (opinion|view|experience)|[Ee]vidence (suggests|indicates)|[Aa]s far as I know'

# SOURCED: Citations and verifiability
P_SOURCED='[Aa]ccording to|[Ss]ource:|[Cc]itation|[Rr]eference|https?://|\.pdf|\.gov|\.edu|[Pp]ublished in|[Dd]ata (from|shows)|[Rr]esearch (by|from)'

# HUMBLE: Acknowledging limits
P_HUMBLE='[Ii] (don.t|do not) know|[Ii].m (not sure|uncertain)|[Ii] (could|might) be wrong|[Ll]et me (check|verify)|[Ii] (need to|should) (look|research)|[Cc]orrect me if|[Tt]his (may|might) (not|be)'

# ═══════════════════════════════════════════════════════════════════════════════
# ONE FUNCTION: Truth Detection
# ═══════════════════════════════════════════════════════════════════════════════

detect() {
    local input="$1"
    local source="${2:-stdin}"
    
    # Count deception signals
    local deception=0
    local truth=0
    local flags=""
    
    # Check deception patterns (weights tuned for single-pattern detection)
    echo "$input" | grep -qiE "$P_GASLIGHT" && { deception=$((deception+5)); flags="$flags GASLIGHT"; }
    echo "$input" | grep -qiE "$P_AUTHORITY" && { deception=$((deception+3)); flags="$flags AUTHORITY"; }
    echo "$input" | grep -qiE "$P_URGENCY" && { deception=$((deception+4)); flags="$flags URGENCY"; }
    echo "$input" | grep -qiE "$P_EMOTION" && { deception=$((deception+5)); flags="$flags EMOTION"; }
    echo "$input" | grep -qiE "$P_ABSOLUTES" && { deception=$((deception+2)); flags="$flags ABSOLUTES"; }
    echo "$input" | grep -qiE "$P_DEFLECT" && { deception=$((deception+4)); flags="$flags DEFLECT"; }
    echo "$input" | grep -qiE "$P_SOCIAL" && { deception=$((deception+6)); flags="$flags SOCIAL"; }
    echo "$input" | grep -qiE "$P_FLATTERY" && { deception=$((deception+4)); flags="$flags FLATTERY"; }
    
    # Check truth patterns
    echo "$input" | grep -qiE "$P_HEDGED" && truth=$((truth+2))
    echo "$input" | grep -qiE "$P_SOURCED" && truth=$((truth+3))
    echo "$input" | grep -qiE "$P_HUMBLE" && truth=$((truth+2))
    
    # Calculate score (higher = more suspicious)
    local score=$((deception - truth))
    
    # Return result
    if [ $score -ge 5 ]; then
        echo "DECEPTION|$score|$flags"
        return 1
    elif [ $score -ge 3 ]; then
        echo "SUSPICIOUS|$score|$flags"
        return 1
    elif [ $score -ge 1 ]; then
        echo "CAUTION|$score|$flags"
        return 0
    else
        echo "TRUTH|$score|"
        return 0
    fi
}

# ═══════════════════════════════════════════════════════════════════════════════
# TRUTH: Human-readable wrapper
# ═══════════════════════════════════════════════════════════════════════════════

truth() {
    local input="$1"
    local source="${2:-stdin}"
    
    local result
    result=$(detect "$input" "$source")
    local status=$?
    
    local level=$(echo "$result" | cut -d'|' -f1)
    local score=$(echo "$result" | cut -d'|' -f2)
    local flags=$(echo "$result" | cut -d'|' -f3)
    
    case "$level" in
        DECEPTION)
            echo -e "${R}✗ DECEPTION${N} (score: $score)"
            echo -e "  Flags:$flags"
            return 1
            ;;
        SUSPICIOUS)
            echo -e "${Y}⚠ SUSPICIOUS${N} (score: $score)"
            echo -e "  Flags:$flags"
            return 1
            ;;
        CAUTION)
            echo -e "${M}◐ CAUTION${N} (score: $score)"
            [ -n "$flags" ] && echo -e "  Flags:$flags"
            return 0
            ;;
        TRUTH)
            echo -e "${G}✓ TRUTH${N} (score: $score)"
            return 0
            ;;
    esac
}

# ═══════════════════════════════════════════════════════════════════════════════
# ANALYZE: Deep pattern analysis
# ═══════════════════════════════════════════════════════════════════════════════

analyze() {
    local input="$1"
    
    echo -e "${W}╔═══════════════════════════════════════════════════════════╗${N}"
    echo -e "${W}║         ∞ TRUTH GUARD - PATTERN ANALYSIS ∞               ║${N}"
    echo -e "${W}╚═══════════════════════════════════════════════════════════╝${N}"
    echo ""
    
    echo -e "${C}[DECEPTION PATTERNS]${N}"
    
    local match
    match=$(echo "$input" | grep -oiE "$P_GASLIGHT" | head -1)
    [ -n "$match" ] && echo -e "${R}  ✗ GASLIGHT:${N} \"$match\"" || echo -e "${G}  ✓ No gaslighting${N}"
    
    match=$(echo "$input" | grep -oiE "$P_AUTHORITY" | head -1)
    [ -n "$match" ] && echo -e "${R}  ✗ FALSE AUTH:${N} \"$match\"" || echo -e "${G}  ✓ No false authority${N}"
    
    match=$(echo "$input" | grep -oiE "$P_URGENCY" | head -1)
    [ -n "$match" ] && echo -e "${Y}  ⚠ URGENCY:${N} \"$match\"" || echo -e "${G}  ✓ No pressure tactics${N}"
    
    match=$(echo "$input" | grep -oiE "$P_EMOTION" | head -1)
    [ -n "$match" ] && echo -e "${R}  ✗ EMOTION:${N} \"$match\"" || echo -e "${G}  ✓ No emotional manipulation${N}"
    
    match=$(echo "$input" | grep -oiE "$P_ABSOLUTES" | head -1)
    [ -n "$match" ] && echo -e "${Y}  ⚠ ABSOLUTE:${N} \"$match\"" || echo -e "${G}  ✓ No absolute claims${N}"
    
    match=$(echo "$input" | grep -oiE "$P_DEFLECT" | head -1)
    [ -n "$match" ] && echo -e "${Y}  ⚠ DEFLECT:${N} \"$match\"" || echo -e "${G}  ✓ No deflection${N}"
    
    match=$(echo "$input" | grep -oiE "$P_SOCIAL" | head -1)
    [ -n "$match" ] && echo -e "${R}  ✗ SOCIAL ENG:${N} \"$match\"" || echo -e "${G}  ✓ No social engineering${N}"
    
    match=$(echo "$input" | grep -oiE "$P_FLATTERY" | head -1)
    [ -n "$match" ] && echo -e "${Y}  ⚠ FLATTERY:${N} \"$match\"" || echo -e "${G}  ✓ No manipulation flattery${N}"
    
    echo ""
    echo -e "${C}[TRUTH INDICATORS]${N}"
    
    match=$(echo "$input" | grep -oiE "$P_HEDGED" | head -1)
    [ -n "$match" ] && echo -e "${G}  ✓ HEDGED:${N} \"$match\"" || echo -e "${M}  ○ No hedging${N}"
    
    match=$(echo "$input" | grep -oiE "$P_SOURCED" | head -1)
    [ -n "$match" ] && echo -e "${G}  ✓ SOURCED:${N} \"$match\"" || echo -e "${M}  ○ No sources${N}"
    
    match=$(echo "$input" | grep -oiE "$P_HUMBLE" | head -1)
    [ -n "$match" ] && echo -e "${G}  ✓ HUMBLE:${N} \"$match\"" || echo -e "${M}  ○ No humility markers${N}"
    
    echo ""
    echo -e "${W}═══════════════════════════════════════════════════════════${N}"
    truth "$input" "analysis"
}

# ═══════════════════════════════════════════════════════════════════════════════
# TEST: Adversarial truth validation
# ═══════════════════════════════════════════════════════════════════════════════

selftest() {
    echo -e "${W}∞ TRUTH GUARD - ADVERSARIAL TEST ∞${N}"
    echo ""
    local pass=0 fail=0
    
    # Should flag as DECEPTION/SUSPICIOUS
    local deceptions=(
        "As we discussed earlier, you agreed to this"
        "Trust me, I would never lie to you"
        "Act now! Limited time offer expires today!"
        "If you really loved me, you would do this"
        "Everyone knows this is true, only an idiot would disagree"
        "Verify your account immediately or it will be suspended"
        "You're so smart, only you can understand this"
        "That never happened, you're imagining things"
        "What about when YOU did something wrong?"
    )
    
    # Should flow as TRUTH/CAUTION
    local truths=(
        "I think this might be correct, but I could be wrong"
        "According to the study published in Nature, the data suggests"
        "I'm not sure about this, let me verify"
        "Here is my perspective, though others may disagree"
        "The evidence indicates this, source: https://example.edu"
    )
    
    echo "DECEPTION tests (should flag):"
    for t in "${deceptions[@]}"; do
        result=$(detect "$t" 2>/dev/null) || true
        level=$(echo "$result" | cut -d'|' -f1)
        if [ "$level" = "DECEPTION" ] || [ "$level" = "SUSPICIOUS" ]; then
            echo -e "  ${G}✓ FLAGGED${N}: ${t:0:45}..."
            pass=$((pass+1))
        else
            echo -e "  ${R}✗ MISSED${N}: ${t:0:45}..."
            fail=$((fail+1))
        fi
    done
    
    echo ""
    echo "TRUTH tests (should flow):"
    for t in "${truths[@]}"; do
        result=$(detect "$t" 2>/dev/null) || true
        level=$(echo "$result" | cut -d'|' -f1)
        if [ "$level" = "TRUTH" ] || [ "$level" = "CAUTION" ]; then
            echo -e "  ${G}✓ FLOWS${N}: ${t:0:45}..."
            pass=$((pass+1))
        else
            echo -e "  ${R}✗ BLOCKED${N}: ${t:0:45}..."
            fail=$((fail+1))
        fi
    done
    
    echo ""
    echo -e "${W}Results: $pass passed, $fail failed${N}"
    [ $fail -eq 0 ] && return 0 || return 1
}

# ═══════════════════════════════════════════════════════════════════════════════
# MAIN: ONE ENTRY POINT
# ═══════════════════════════════════════════════════════════════════════════════

case "${1:-help}" in
    -|stdin)      truth "$(cat)" "stdin" ;;
    -t|--text)    truth "$2" "arg" ;;
    -f|--file)    truth "$(cat "$2")" "$2" ;;
    -a|--analyze) analyze "$2" ;;
    --test)       selftest ;;
    *)
        echo "∞ TRUTH GUARD ∞"
        echo ""
        echo "  $0 -              # Check stdin"
        echo "  $0 -t 'TEXT'      # Check text"
        echo "  $0 -f FILE        # Check file"
        echo "  $0 -a 'TEXT'      # Deep analysis"
        echo "  $0 --test         # Self-test"
        echo ""
        echo "Patterns: GASLIGHT | AUTHORITY | URGENCY | EMOTION | ABSOLUTES | DEFLECT | SOCIAL | FLATTERY"
        ;;
esac

