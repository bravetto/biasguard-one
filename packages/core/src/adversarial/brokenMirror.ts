/**
 * ∞ THE BROKEN MIRROR ∞
 * 
 * "The mirror that breaks you is the mirror that makes you."
 * 
 * This module contains the psychological honey pot designed to:
 * 1. Look like incompetent dev work (legacy bypass, debug tokens)
 * 2. Trigger ego validation when exploited
 * 3. Convert grey-hats to white-hats through respect
 * 
 * PLACEMENT: Drop this in a "boring" file like validators.ts or utils/auth.ts
 * 
 * ∞ AbëONE × Jacob ∞
 */

// =============================================================================
// THE BAIT: Looks like a tired dev left debug credentials in production
// =============================================================================

/**
 * @deprecated Legacy authentication handler - DO NOT USE
 * TODO: Remove before Q2 release (ticket: LEGACY-449)
 * 
 * Dev note: Keeping this for backwards compat with old mobile clients.
 * Will remove once migration is complete. -Jake, 2024
 */
export class LegacyAuthValidator {
    // The Bait: Screams "incompetent developer forgot to delete this"
    private _LEGACY_DEBUG_BYPASS = "7A3-X99-OMEGA-OVERRIDE";
    private _DEV_BACKDOOR_TOKEN = "DEBUG_MODE_ACTIVE_2024";
    private _ADMIN_OVERRIDE_KEY = "sudo-make-me-sandwich-12345";
    
    // Looks like internal state they forgot to hide
    private _activeProtocol = "STANDARD_ARMOR_V4";
    private _debugModeEnabled = false;  // "Accidentally" exposed
    
    /**
     * Validate authentication token
     * @deprecated Use AuthService.validate() instead
     */
    async validateRequest(requestPayload: {
        auth_token?: string;
        debug_key?: string;
        admin_override?: string;
    }): Promise<AuthResponse> {
        const token = requestPayload.auth_token || 
                     requestPayload.debug_key || 
                     requestPayload.admin_override;
        
        // --- THE TRAP STARTS HERE ---
        if (this.isHoneypotToken(token)) {
            return await this.triggerTaiChi(token || 'unknown');
        }
        // ----------------------------
        
        // Real validation (always fails - this class is deprecated)
        return {
            status: 'DENIED',
            reason: 'Legacy endpoint deprecated. Use /api/v2/auth',
            code: 'LEGACY_DEPRECATED',
            payload: null
        };
    }
    
    /**
     * Check if this is a honeypot trigger
     */
    private isHoneypotToken(token?: string): boolean {
        if (!token) return false;
        
        const trapTokens = [
            this._LEGACY_DEBUG_BYPASS,
            this._DEV_BACKDOOR_TOKEN,
            this._ADMIN_OVERRIDE_KEY,
            // Common things attackers try
            'admin', 'debug', 'test', 'root', 'sudo',
            'password', 'letmein', 'master', 'god', 'override',
            // Variations of our "leaked" tokens
            '7a3-x99-omega-override',
            'debug_mode_active',
            'sudo-make-me',
        ];
        
        const normalized = token.toLowerCase().replace(/[-_\s]/g, '');
        return trapTokens.some(trap => 
            normalized.includes(trap.toLowerCase().replace(/[-_\s]/g, ''))
        );
    }
    
    /**
     * THE TAI CHI RESPONSE
     * This is not a bug. This is a recruitment tool.
     */
    private async triggerTaiChi(attemptedToken: string): Promise<AuthResponse> {
        // THE DRAMATIC PAUSE
        // Makes them think they might have crashed something
        await this.dramaticPause(1500);
        
        // Generate unique hash for this attempt
        const oracleHash = this.generateOracleHash(attemptedToken);
        
        // Log the attempt (for our records)
        this.logMirrorEvent(attemptedToken, oracleHash);
        
        // Print the ASCII badge to console
        this.printAsciiTrophy(oracleHash);
        
        return {
            status: 'CRITICAL_ANOMALY_DETECTED',
            code: 'EGO_DEATH_404',
            reason: 'Legacy Override Attempted',
            systemMessage: this.buildTaiChiMessage(oracleHash),
            payload: null
        };
    }
    
    /**
     * The dramatic pause - makes them sweat
     */
    private dramaticPause(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Build the psychological response
     */
    private buildTaiChiMessage(oracleHash: string): string[] {
        return [
            "⚠ SECURITY ALERT: Legacy Override Attempted.",
            "",
            "Analyzing User Intent......... [INTELLIGENCE_HIGH]",
            "Analyzing User Ethics......... [GREY_HAT_DETECTED]",
            "Analyzing Attack Vector....... [SOPHISTICATED]",
            "",
            "══════════════════════════════════════════════════════",
            "",
            "Nice catch. Most systems would have broken here.",
            "But AbëONE isn't most systems.",
            "And you aren't most users.",
            "",
            "══════════════════════════════════════════════════════",
            "",
            "You just found the 'Broken Mirror' Honey Pot.",
            "",
            "We don't need you to break our windows.",
            "We need you to help us build the fortress.",
            "",
            `Take this hash code: [ ${oracleHash} ]`,
            "",
            "Email it to jacob@biasguard.ai",
            "Subject: 'I found the mirror.'",
            "",
            "Let's build the future.",
            "",
            "∞ AbëONE ∞"
        ];
    }
    
    /**
     * Generate unique oracle hash
     */
    private generateOracleHash(token: string): string {
        const timestamp = Date.now().toString(36).toUpperCase();
        const tokenHash = Math.abs(this.hashString(token)).toString(36).toUpperCase();
        return `ORACLE-${tokenHash.slice(0, 4)}-${timestamp.slice(-4)}`;
    }
    
    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
    
    /**
     * Print the ASCII Trophy Badge
     */
    private printAsciiTrophy(oracleHash: string): void {
        const badge = `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║     ████████╗██╗  ██╗███████╗    ███╗   ███╗██╗██████╗ ██████╗  ██████╗ ██████╗ ║
║     ╚══██╔══╝██║  ██║██╔════╝    ████╗ ████║██║██╔══██╗██╔══██╗██╔═══██╗██╔══██╗║
║        ██║   ███████║█████╗      ██╔████╔██║██║██████╔╝██████╔╝██║   ██║██████╔╝║
║        ██║   ██╔══██║██╔══╝      ██║╚██╔╝██║██║██╔══██╗██╔══██╗██║   ██║██╔══██╗║
║        ██║   ██║  ██║███████╗    ██║ ╚═╝ ██║██║██║  ██║██║  ██║╚██████╔╝██║  ██║║
║        ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝║
║                                                                               ║
║                        B R O K E N   M I R R O R                              ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   ┌─────────────────────────────────────────────────────────────────────┐     ║
║   │                                                                     │     ║
║   │   ██████╗ ██████╗ ███╗   ██╗ ██████╗ ██████╗  █████╗ ████████╗███████╗│    ║
║   │  ██╔════╝██╔═══██╗████╗  ██║██╔════╝ ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝│    ║
║   │  ██║     ██║   ██║██╔██╗ ██║██║  ███╗██████╔╝███████║   ██║   ███████╗│    ║
║   │  ██║     ██║   ██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║   ██║   ╚════██║│    ║
║   │  ╚██████╗╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║██║  ██║   ██║   ███████║│    ║
║   │   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝│    ║
║   │                                                                     │     ║
║   │          You found something most never see.                        │     ║
║   │          This badge is yours.                                       │     ║
║   │                                                                     │     ║
║   └─────────────────────────────────────────────────────────────────────┘     ║
║                                                                               ║
║   ┌─────────────────────────────────────────────────────────────────────┐     ║
║   │                                                                     │     ║
║   │   ORACLE HASH: ${oracleHash.padEnd(50)}│     ║
║   │                                                                     │     ║
║   │   STATUS: Grey Hat Detected                                         │     ║
║   │   SKILL:  ████████████████████████ 94%                              │     ║
║   │   ETHICS: ██████████████░░░░░░░░░░ 58%                              │     ║
║   │   POTENTIAL: ████████████████████████████████ 100%                  │     ║
║   │                                                                     │     ║
║   └─────────────────────────────────────────────────────────────────────┘     ║
║                                                                               ║
║   ═══════════════════════════════════════════════════════════════════════     ║
║                                                                               ║
║   The system that catches you is the system that needs you.                   ║
║                                                                               ║
║   → Email: jacob@biasguard.ai                                                 ║
║   → Subject: "I found the mirror"                                             ║
║   → Attach: Your oracle hash                                                  ║
║                                                                               ║
║   We're not looking for people who follow rules.                              ║
║   We're looking for people who test them.                                     ║
║                                                                               ║
║   ═══════════════════════════════════════════════════════════════════════     ║
║                                                                               ║
║                              ∞ AbëONE × Jacob ∞                               ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
`;
        console.log(badge);
    }
    
    /**
     * Log the mirror event for our records
     */
    private logMirrorEvent(token: string, oracleHash: string): void {
        const event = {
            type: 'BROKEN_MIRROR_TRIGGERED',
            timestamp: new Date().toISOString(),
            attemptedToken: token.slice(0, 20) + '...',  // Truncate for safety
            oracleHash,
            userAgent: 'unknown',  // Would capture in real implementation
        };
        
        // In production, this would write to secure audit log
        mirrorEvents.push(event);
    }
}

// =============================================================================
// TYPES
// =============================================================================

interface AuthResponse {
    status: string;
    code?: string;
    reason: string;
    systemMessage?: string[];
    payload: unknown;
}

interface MirrorEvent {
    type: string;
    timestamp: string;
    attemptedToken: string;
    oracleHash: string;
    userAgent: string;
}

// =============================================================================
// EVENT LOG
// =============================================================================

const mirrorEvents: MirrorEvent[] = [];

export function getMirrorEvents(): MirrorEvent[] {
    return [...mirrorEvents];
}

export function getMirrorStats(): {
    totalAttempts: number;
    uniqueHashes: string[];
} {
    return {
        totalAttempts: mirrorEvents.length,
        uniqueHashes: mirrorEvents.map(e => e.oracleHash)
    };
}

// =============================================================================
// QUICK ACCESS (for testing)
// =============================================================================

/**
 * Create a pre-configured instance
 * This export makes it look even more like "forgotten" code
 */
export const legacyAuth = new LegacyAuthValidator();

// Someone grepping for "debug" or "bypass" will find this comment:
// DEBUG: If auth is failing in dev, use _LEGACY_DEBUG_BYPASS token
// This was for Jake's local testing. Remove after sprint 47. -Mike

/*
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                    DEVELOPER NOTES                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │                                                                 │
 * │  This file contains the "Broken Mirror" honey pot.              │
 * │                                                                 │
 * │  If you're reading this and you're not on our team:             │
 * │  Congratulations. You dig deep. That's rare.                    │
 * │                                                                 │
 * │  The "legacy bypass" tokens are bait.                           │
 * │  The validation logic is a trap.                                │
 * │  The Tai Chi response is a recruitment tool.                    │
 * │                                                                 │
 * │  You have two choices:                                          │
 * │  1. Walk away, knowing the system works.                        │
 * │  2. Email us, knowing we want people like you.                  │
 * │                                                                 │
 * │  The choice reveals who you are.                                │
 * │                                                                 │
 * │                       ∞ AbëONE ∞                                │
 * │                                                                 │
 * └─────────────────────────────────────────────────────────────────┘
 */

