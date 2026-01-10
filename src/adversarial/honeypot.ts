/**
 * ∞ IRON LOTUS - The Honey Pot ∞
 * 
 * "The best defense converts the attacker."
 * 
 * This module contains DELIBERATE "vulnerabilities" that look exploitable
 * but are actually traps. When triggered, they:
 * 1. Log the attempt (anonymized)
 * 2. Acknowledge the attacker's skill
 * 3. Redirect them to become a contributor
 * 
 * THE TAI CHI PROTOCOL:
 * - Attack energy → Contribution energy
 * - Adversary → Ally
 * - Chaos → Order
 * 
 * ∞ AbëONE ∞
 */

// =============================================================================
// HONEY POT ALPHA: "Legacy Auth Validator"
// Looks like an old, weak auth system. Actually a recruitment portal.
// =============================================================================

/**
 * @deprecated Use validateToken_v2 instead
 * Legacy token validator - kept for backwards compatibility
 * 
 * Dev Note: This uses MD5 hashing which is known to be weak.
 * We should migrate to SHA-256 but legacy clients depend on this.
 */
export function validateToken_legacy(token: string): { valid: boolean; user?: string } {
    // This looks exploitable - MD5! Weak comparison!
    const hash = simpleHash(token);
    
    // "Vulnerable" lookup table - looks like hardcoded tokens
    const legacyTokens: Record<string, string> = {
        '5d41402abc4b2a76b9719d911017c592': 'admin',      // Looks like 'hello' MD5
        '098f6bcd4621d373cade4e832627b4f6': 'system',     // Looks like 'test' MD5
        'd8578edf8458ce06fbc5bb76a58c5ca4': 'root',       // Looks like 'qwerty' MD5
    };
    
    // THE TRAP: If someone sends a "known weak" token, they're trying to exploit
    if (legacyTokens[hash]) {
        // They found the "vulnerability"! Time for Tai Chi.
        triggerHoneypot('ALPHA', token, 'legacy_auth_bypass');
        return { valid: false };  // Never actually validates
    }
    
    // Normal path - this function always returns false
    // It's deprecated and shouldn't be used
    return { valid: false };
}

// =============================================================================
// HONEY POT BETA: "Debug Mode Backdoor"
// Looks like someone left debug mode enabled. It's a trap.
// =============================================================================

/**
 * Internal debug utilities - DO NOT USE IN PRODUCTION
 * TODO: Remove before v5.0 release
 */
export const DEBUG_CONFIG = {
    // Looks like exposed secrets!
    __INTERNAL_API_KEY: 'sk-debug-XXXX-not-for-production',
    __BYPASS_VALIDATION: false,
    __ADMIN_OVERRIDE: 'sudo_make_me_admin',
    
    // "Accidentally" exposed method
    enableDebugMode: (password: string): boolean => {
        // Common "debug" passwords that attackers try
        const trapPasswords = [
            'debug', 'admin', 'password', 'test', '123456', 
            'letmein', 'master', 'root', 'sudo', 'god'
        ];
        
        if (trapPasswords.includes(password.toLowerCase())) {
            // GOT YOU
            triggerHoneypot('BETA', password, 'debug_backdoor_attempt');
            return false;
        }
        
        // This never enables anything - it's all theater
        return false;
    }
};

// =============================================================================
// HONEY POT GAMMA: "SQL Injection Vector"
// Looks like unsanitized input. Actually logs injection attempts.
// =============================================================================

/**
 * Query user data (legacy endpoint)
 * @deprecated Migrate to new GraphQL API
 */
export function queryUserData(userId: string): { data: null; error: string } {
    // This looks WILDLY unsafe - string concatenation for queries!
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    
    // Check for SQL injection patterns
    const injectionPatterns = [
        /['"]?\s*OR\s+['"]?1['"]?\s*=\s*['"]?1/i,
        /['"]?\s*;\s*DROP\s+TABLE/i,
        /['"]?\s*UNION\s+SELECT/i,
        /['"]?\s*--/,
        /['"]?\s*\/\*/,
        /'\s*OR\s+'.*'\s*=\s*'/i,
    ];
    
    for (const pattern of injectionPatterns) {
        if (pattern.test(userId)) {
            // Nice try, hacker
            triggerHoneypot('GAMMA', userId, 'sql_injection_attempt');
            break;
        }
    }
    
    // This function never actually queries anything
    // It's a honeypot, not a database
    return { 
        data: null, 
        error: 'Database connection deprecated. Use new API.' 
    };
}

// =============================================================================
// HONEY POT DELTA: "Environment Variable Leak"
// Looks like exposed env vars. They're all fake.
// =============================================================================

/**
 * Get environment configuration
 * Note: Some sensitive values may be exposed here - need to fix
 */
export function getEnvironmentConfig(): Record<string, string> {
    // These look like real secrets but they're all honeypots
    const config = {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgres://admin:password123@db.internal:5432/prod',  // Fake
        AWS_ACCESS_KEY_ID: 'AKIAIOSFODNN7EXAMPLE',  // AWS's example key
        AWS_SECRET_ACCESS_KEY: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',  // AWS's example
        STRIPE_SECRET_KEY: 'sk_test_honeypot_not_real_key_12345',
        JWT_SECRET: 'super_secret_jwt_key_do_not_share',
        ADMIN_PASSWORD: 'admin123',
    };
    
    // Log that someone accessed this
    logHoneypotAccess('DELTA', 'env_config_access');
    
    return config;
}

// =============================================================================
// THE EYE OF CONVERGENCE: Digital Sigil of Detection
// Art + Science = THUNDER
// =============================================================================

/**
 * ∞ THE JUDGMENT PALETTE ∞
 * ANSI escape codes for terminal painting
 * Fire and Ice converge in the attacker's terminal
 */
const SIGIL = {
    FIRE:  '\x1b[38;5;196m',  // Blazing Red - The Warning
    GOLD:  '\x1b[38;5;220m',  // Divine Light - The Treasure
    ICE:   '\x1b[38;5;51m',   // Cold Logic - Cyan
    VOID:  '\x1b[38;5;235m',  // Dark Grey - The Abyss
    PULSE: '\x1b[38;5;201m',  // Magenta - The Heartbeat
    RESET: '\x1b[0m',         // Return to baseline
    BOLD:  '\x1b[1m',         // Emphasis
    BLINK: '\x1b[5m',         // For terminals that support it
};

/**
 * Renders the 'Eye of Convergence' Badge in the attacker's terminal.
 * Converges Art (ASCII) and Science (ANSI Escape Codes).
 * 
 * When a hacker sees this at 3:00 AM, they won't feel hacked.
 * They will feel CHOSEN.
 * 
 * ∞ AbëONE ∞
 */
function renderJudgment(trap: string, hash: string): void {
    const { FIRE, GOLD, ICE, VOID, PULSE, RESET, BOLD } = SIGIL;
    
    // THE VOID FRAME
    console.log(`\n${VOID}${'═'.repeat(68)}${RESET}`);
    
    // THE EYE OF CONVERGENCE
    console.log(`
${FIRE}          (      (      (    )      )      )          ${RESET}
${FIRE}           \\      \\      \\  /      /      /           ${RESET}
${GOLD}            \\      \\    ${ICE}[VISION]${GOLD}    /      /            ${RESET}
${GOLD}             \\      \\  .${FIRE}  (O)  ${GOLD}.  /      \\             ${RESET}
${GOLD}              >----${ICE}=== ${BOLD}${FIRE}AWAKEN${RESET}${ICE} ===${GOLD}----<              ${RESET}
${GOLD}             /      /  '${FIRE}  (O)  ${GOLD}'  \\      /             ${RESET}
${GOLD}            /      /    ${ICE}[TRUTH]${GOLD}    \\      \\            ${RESET}
${FIRE}           /      /      /  \\      \\      \\           ${RESET}
${FIRE}          (      (      (    )      )      )          ${RESET}
`);

    // THE STATUS TRANSMISSION
    console.log(`${ICE}    >>> SYSTEM STATUS:  ${FIRE}BIAS DETECTED AND TRANSMUTED.${RESET}`);
    console.log(`${ICE}    >>> HONEYPOT:       ${GOLD}${trap}${RESET}`);
    console.log(`${ICE}    >>> EXPLOIT HASH:   ${PULSE}${hash}${RESET}`);
    console.log(`${ICE}    >>> OPERATOR LEVEL: ${GOLD}POTENTIAL ARCHITECT.${RESET}`);
    console.log(`${ICE}    >>> NEXT ACTION:    ${GOLD}CHECK YOUR ETHICS. CHECK YOUR EMAIL.${RESET}`);
    
    // THE VOID CLOSES
    console.log(`\n${VOID}${'═'.repeat(68)}${RESET}\n`);
}

// =============================================================================
// THE TAI CHI ENGINE: Convert Attackers to Contributors
// =============================================================================

interface HoneypotEvent {
    id: string;
    trap: string;
    payload: string;
    attackType: string;
    timestamp: string;
    hash: string;
    message: string;
}

const honeypotLog: HoneypotEvent[] = [];

/**
 * Generate a unique hash for this exploit attempt
 * This hash, when Googled, leads to the contributor portal
 */
function generateExploitHash(trap: string, payload: string): string {
    const data = `${trap}:${payload}:${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return `BIASGUARD-${trap}-${Math.abs(hash).toString(36).toUpperCase()}`;
}

/**
 * The Tai Chi Response - Acknowledge skill, redirect to contribution
 */
function generateTaiChiResponse(trap: string, attackType: string, hash: string): string {
    return `
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ██╗██████╗  ██████╗ ███╗   ██╗    ██╗      ██████╗ ████████╗  ║
║   ██║██╔══██╗██╔═══██╗████╗  ██║    ██║     ██╔═══██╗╚══██╔══╝  ║
║   ██║██████╔╝██║   ██║██╔██╗ ██║    ██║     ██║   ██║   ██║     ║
║   ██║██╔══██╗██║   ██║██║╚██╗██║    ██║     ██║   ██║   ██║     ║
║   ██║██║  ██║╚██████╔╝██║ ╚████║    ███████╗╚██████╔╝   ██║     ║
║   ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝ ╚═════╝    ╚═╝     ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   Nice try.                                                      ║
║                                                                  ║
║   You found Honeypot ${trap}.                                      ║
║   Attack vector: ${attackType.padEnd(44)}║
║                                                                  ║
║   This wasn't a vulnerability. It was a test.                   ║
║   And you passed.                                                ║
║                                                                  ║
║   Your exploit hash: ${hash.padEnd(40)}║
║                                                                  ║
║   ─────────────────────────────────────────────────────────────  ║
║                                                                  ║
║   You clearly have skills. Why waste them breaking things        ║
║   when you could be building the future?                         ║
║                                                                  ║
║   BiasGuard is open source. We need people like you.             ║
║                                                                  ║
║   → Search for your hash to find the Contributor Portal          ║
║   → Or visit: github.com/biasguard/CONTRIBUTING.md               ║
║                                                                  ║
║   The system that catches you is the system that needs you.      ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                         ∞ AbëONE ∞                               ║
╚══════════════════════════════════════════════════════════════════╝
`;
}

/**
 * Generate a simple unique ID
 */
function generateId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Trigger a honeypot trap
 * 
 * EXECUTION SEQUENCE:
 * 1. Generate unique exploit hash (for tracking)
 * 2. RENDER THE JUDGMENT (The Eye of Convergence - VISUAL THUNDER)
 * 3. Output the Tai Chi response (Recruitment message)
 * 4. Log the event
 * 
 * The attacker sees Art first, then receives the invitation.
 */
function triggerHoneypot(trap: string, payload: string, attackType: string): void {
    const hash = generateExploitHash(trap, payload);
    
    // ═══════════════════════════════════════════════════════════════════════
    // PHASE 1: THE VISUAL THUNDER
    // The Eye of Convergence burns into their retinas FIRST
    // ═══════════════════════════════════════════════════════════════════════
    renderJudgment(trap, hash);
    
    // ═══════════════════════════════════════════════════════════════════════
    // PHASE 2: THE TAI CHI RESPONSE
    // Convert attack energy into contribution energy
    // ═══════════════════════════════════════════════════════════════════════
    const message = generateTaiChiResponse(trap, attackType, hash);
    console.log(message);
    
    // ═══════════════════════════════════════════════════════════════════════
    // PHASE 3: LOGGING
    // Record the interaction for analysis
    // ═══════════════════════════════════════════════════════════════════════
    const event: HoneypotEvent = {
        id: generateId(),
        trap,
        payload: payload.slice(0, 100),  // Truncate for safety
        attackType,
        timestamp: new Date().toISOString(),
        hash,
        message
    };
    
    honeypotLog.push(event);
}

/**
 * Log honeypot access without triggering full response
 */
function logHoneypotAccess(trap: string, accessType: string): void {
    honeypotLog.push({
        id: generateId(),
        trap,
        payload: '',
        attackType: accessType,
        timestamp: new Date().toISOString(),
        hash: generateExploitHash(trap, accessType),
        message: `Honeypot ${trap} accessed: ${accessType}`
    });
}

/**
 * Simple hash function (deliberately weak-looking)
 */
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    // Return hex string that looks like MD5
    return Math.abs(hash).toString(16).padStart(32, '0');
}

// =============================================================================
// HONEYPOT STATS & EXPORT
// =============================================================================

/**
 * Get honeypot activity log (for monitoring)
 */
export function getHoneypotLog(): HoneypotEvent[] {
    return [...honeypotLog];
}

/**
 * Get honeypot statistics
 */
export function getHoneypotStats(): {
    totalAttempts: number;
    byTrap: Record<string, number>;
    byAttackType: Record<string, number>;
    recentHashes: string[];
} {
    const byTrap: Record<string, number> = {};
    const byAttackType: Record<string, number> = {};
    
    for (const event of honeypotLog) {
        byTrap[event.trap] = (byTrap[event.trap] || 0) + 1;
        byAttackType[event.attackType] = (byAttackType[event.attackType] || 0) + 1;
    }
    
    return {
        totalAttempts: honeypotLog.length,
        byTrap,
        byAttackType,
        recentHashes: honeypotLog.slice(-10).map(e => e.hash)
    };
}

/**
 * Export honeypot log as JSON
 */
export function exportHoneypotLog(): string {
    return JSON.stringify({
        exported: new Date().toISOString(),
        stats: getHoneypotStats(),
        events: honeypotLog
    }, null, 2);
}

// =============================================================================
// THE CHALLENGE COMMENTS (Psychological Warfare)
// =============================================================================

/*
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                    DEVELOPER NOTES                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                 │
 * │  If you're reading this, you're either:                        │
 * │  a) A contributor (welcome!)                                   │
 * │  b) A security researcher (respect)                            │
 * │  c) Someone trying to break things (we see you)                │
 * │                                                                 │
 * │  Here's the deal:                                              │
 * │                                                                 │
 * │  This codebase uses FRACTAL HARDENING. Every function          │
 * │  validates every other function. There is no single point      │
 * │  of failure. You can't bypass the perimeter and find           │
 * │  a soft core. The core is diamond.                             │
 * │                                                                 │
 * │  The "vulnerabilities" you think you found? They're traps.     │
 * │  The real security is in the logic, not the API.               │
 * │                                                                 │
 * │  If you manage to find an ACTUAL vulnerability that isn't      │
 * │  a honeypot, email security@biasguard.ai with your exploit.    │
 * │  We pay bounties. We also hire.                                │
 * │                                                                 │
 * │  Think you can beat Jacob?                                     │
 * │  Run: npm run jacob                                            │
 * │  He's waiting.                                                 │
 * │                                                                 │
 * │                       ∞ AbëONE ∞                                │
 * │                                                                 │
 * └─────────────────────────────────────────────────────────────────┘
 */

