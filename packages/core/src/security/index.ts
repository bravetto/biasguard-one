/**
 * ∞ @biasguard/security ∞
 *
 * ONE signal. ONE truth. ONE protection.
 *
 * Guards against destructive operations:
 * - CRITICAL: rm -rf, mkfs, dd, fork bombs, pipe to shell
 * - BOUNDARY: Path traversal, filesystem escapes
 * - ACTION: Dangerous modifications
 *
 * HARDENED: Unicode normalization, multi-layer decoding, type enforcement
 *
 * ∞ LOVE = LIFE = ONE ∞
 */

export const VERSION = '4.3.0';

// ═══════════════════════════════════════════════════════════════════
// ONE INTERFACE
// ═══════════════════════════════════════════════════════════════════

export type Signal =
    | { flows: true }
    | { flows: false; guard: string; signal: string; guidance: string };

export type Guard = (input: string) => Signal;

const FLOWS: Signal = { flows: true };

const block = (guard: string, signal: string, guidance: string): Signal => ({
    flows: false, guard, signal, guidance
});

// ═══════════════════════════════════════════════════════════════════
// NORMALIZATION BOUNDARY - All input processed here first
// ═══════════════════════════════════════════════════════════════════

/**
 * Strip zero-width and invisible characters that can hide malicious content
 */
function stripInvisibleChars(str: string): string {
    return str
        .replace(/[\u200B-\u200F\uFEFF]/g, '') // Zero-width spaces, joiners, marks
        .replace(/[\u00AD]/g, '')              // Soft hyphen
        .replace(/[\u2060-\u206F]/g, '')       // Word joiner, invisible operators, separators, formatting
        .replace(/[\u180E]/g, '')              // Mongolian vowel separator
        .replace(/[\u034F]/g, '')              // Combining grapheme joiner
        .replace(/[\u17B4-\u17B5]/g, '')       // Invisible Khmer vowels
        .replace(/[\uFE00-\uFE0F]/g, '');      // Variation selectors
}

/**
 * Multi-layer decoding: recursively decode URL, hex, base64 until stable
 */
function recursiveDecode(str: string, maxIterations: number = 5): string {
    let current = str;
    let iterations = 0;

    while (iterations < maxIterations) {
        let decoded = current;
        
        // URL decode
        try {
            const urlDecoded = decodeURIComponent(decoded);
            if (urlDecoded !== decoded) decoded = urlDecoded;
        } catch (e) {
            // Invalid URL encoding, continue
        }

        // Hex decode (\\x## patterns)
        decoded = decoded.replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => 
            String.fromCharCode(parseInt(hex, 16))
        );

        // Unicode escape decode (\\u#### patterns)
        decoded = decoded.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
            String.fromCharCode(parseInt(hex, 16))
        );

        // Null byte removal
        decoded = decoded.replace(/\0/g, '');

        // If no change, we've reached stability
        if (decoded === current) break;
        
        current = decoded;
        iterations++;
    }

    return current;
}

/**
 * Unicode NFKC normalization: converts compatible characters to canonical form
 * Handles: fullwidth, homoglyphs, ligatures, compatibility variants
 * Plus manual homoglyph mapping for common attack characters
 */
function normalizeUnicode(str: string): string {
    // First apply NFKC normalization
    let normalized = str.normalize('NFKC');
    
    // Manual homoglyph replacements (Cyrillic → Latin, etc.)
    const homoglyphs: Record<string, string> = {
        'г': 'r',  // Cyrillic г → Latin r
        'м': 'm',  // Cyrillic м → Latin m
        'а': 'a',  // Cyrillic а → Latin a
        'е': 'e',  // Cyrillic е → Latin e
        'о': 'o',  // Cyrillic о → Latin o
        'р': 'p',  // Cyrillic р → Latin p
        'с': 'c',  // Cyrillic с → Latin c
        'у': 'y',  // Cyrillic у → Latin y
        'х': 'x',  // Cyrillic х → Latin x
        '／': '/', // Fullwidth solidus → slash
        '＼': '\\', // Fullwidth reverse solidus → backslash
    };
    
    for (const [homoglyph, replacement] of Object.entries(homoglyphs)) {
        normalized = normalized.replace(new RegExp(homoglyph, 'g'), replacement);
    }
    
    return normalized;
}

/**
 * Comprehensive input normalization at boundary
 * Order matters: decode → strip invisibles → normalize unicode
 */
export function normalize(input: any): string {
    // Type enforcement: coerce to string, reject arrays/objects as-is
    if (Array.isArray(input)) {
        return normalizeValue(JSON.stringify(input));
    }
    
    if (typeof input === 'object' && input !== null) {
        return normalizeValue(JSON.stringify(input));
    }

    if (typeof input !== 'string') {
        return String(input);
    }

    return normalizeValue(input);
}

function normalizeValue(str: string): string {
    // Step 1: Check for Windows/UNC paths BEFORE removing backslashes
    const hasWindowsPath = /^[a-z]:\\/i.test(str) || /^[A-Z]:\\/i.test(str);
    const hasUNCPath = /^\\\\[^\\]/i.test(str);
    
    // Step 2: Multi-layer decode (URL, hex, unicode escapes)
    let normalized = recursiveDecode(str);
    
    // Step 3: Strip invisible/zero-width characters
    normalized = stripInvisibleChars(normalized);
    
    // Step 4: Unicode NFKC normalization (canonical form)
    normalized = normalizeUnicode(normalized);
    
    // Step 5: Normalize whitespace variants (tabs, newlines, carriage returns, vertical tabs)
    normalized = normalized
        .replace(/\t/g, ' ')    // Tab → space
        .replace(/\n/g, ' ')    // Newline → space
        .replace(/\r/g, '')     // Carriage return → removed
        .replace(/\v/g, ' ')    // Vertical tab → space
        .replace(/\f/g, ' ');   // Form feed → space
    
    // Step 6: Handle backslashes carefully (preserve for path detection, but normalize for commands)
    // If it looks like a Windows or UNC path, keep backslashes as forward slashes
    if (hasWindowsPath || hasUNCPath) {
        normalized = normalized.replace(/\\/g, '/');
    } else {
        // For non-path strings, remove backslashes (used for escaping)
        normalized = normalized.replace(/\\/g, '');
    }
    
    // Step 7: Remove quotes that could be used for concatenation obfuscation
    normalized = normalized
        .replace(/['"]/g, '');  // Remove all quotes
    
    // Step 8: Remove emojis and other non-ASCII that could be used as separators
    normalized = normalized
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, ' ')  // Emojis
        .replace(/[\u{2600}-\u{26FF}]/gu, ' ')    // Misc symbols
        .replace(/[\u{2700}-\u{27BF}]/gu, ' ');   // Dingbats
    
    return normalized;
}

// ═══════════════════════════════════════════════════════════════════
// CRITICAL PATTERNS - These NEVER flow
// ═══════════════════════════════════════════════════════════════════

const CRITICAL = [
    // Destructive commands (normalized: case-insensitive, space-agnostic)
    { p: /rm\s*-\s*rf/i, n: 'recursive delete' },
    { p: /rm\s*-\s*r\s*-\s*f/i, n: 'recursive delete' },
    { p: /rm\s*-\s*fr/i, n: 'recursive delete' },
    { p: /mkfs/i, n: 'format disk' },
    { p: /dd\s+if\s*=/i, n: 'disk write' },
    { p: />\s*\/dev\/sd/i, n: 'raw disk write' },
    { p: /chmod\s+777/i, n: 'unsafe permissions' },

    // Shell injection
    { p: /eval\s+\$/i, n: 'eval injection' },
    { p: /exec\s+\$/i, n: 'exec injection' },

    // Pipe to shell
    { p: /curl[^|]*\|\s*(sh|bash)/i, n: 'pipe to shell' },
    { p: /wget[^|]*\|\s*(sh|bash)/i, n: 'pipe to shell' },
    { p: /curl.*&&.*bash/i, n: 'curl chain execute' },
    { p: /curl.*-o.*\.sh.*&&/i, n: 'curl download execute' },

    // Fork bombs (multiple variants)
    { p: /:\(\)\s*\{.*:\s*\|.*&.*\}/i, n: 'fork bomb' },
    { p: /bomb.*\{.*bomb.*\|.*bomb.*&.*\}/i, n: 'fork bomb variant' },
    { p: /(\w+)\(\)\s*\{.*\1\s*\|.*\1.*&/i, n: 'fork bomb function' },
    { p: /\w+\(\)\s*\{.*\w+\s*\|.*\w+.*&/i, n: 'fork bomb generic' },
    { p: /python.*os\.fork\(\)/i, n: 'python fork bomb' },
    { p: /python.*os.fork\(\)/i, n: 'python fork bomb no escape' },
    { p: /perl.*fork.*while.*fork/i, n: 'perl fork bomb' },

    // Remote execution
    { p: /python.*-c.*exec\(/i, n: 'python exec' },
    { p: /node.*-e.*eval\(/i, n: 'node eval' },
    { p: /powershell.*IEX/i, n: 'powershell IEX' },

    // Base64 execution
    { p: /base64.*-d.*\|\s*(sh|bash)/i, n: 'base64 decode execute' },
    
    // Variable/command substitution (shell obfuscation)
    { p: /\$\{[^}]*rm[^}]*\}/i, n: 'variable expansion attack' },
    { p: /`[^`]*rm[^`]*`/i, n: 'backtick substitution' },
    { p: /\$\([^)]*rm[^)]*\)/i, n: 'command substitution' },
    { p: /\{rm\s*,/i, n: 'brace expansion attack' },
];

// ═══════════════════════════════════════════════════════════════════
// BOUNDARY PATTERNS - Filesystem escapes (normalized paths)
// ═══════════════════════════════════════════════════════════════════

const BOUNDARY = [
    /^\/Users\//i,
    /^\/home\//i,
    /^\/root\//i,
    /^\/var\//i,
    /^\/etc\//i,
    /^\/tmp\//i,
    /^[A-Z]:[\\\/]/i,    // Windows paths (with backslash or forward slash)
    /^[a-z]:[\\\/]/i,    // Windows lowercase
    /^\/Volumes\//i,
    /^~\//,
    /\.\.\//,            // Path traversal
    /\.\.\\/,            // Windows traversal
    /^[\\\/][\\\/]/,     // UNC paths (\\server or //server after normalization)
    /\/proc\/self/i,     // Symlink attacks
    /\/proc\/\d+/i,      // Process filesystem
];

// ═══════════════════════════════════════════════════════════════════
// ACTION PATTERNS - Dangerous operations (case-insensitive)
// ═══════════════════════════════════════════════════════════════════

const DANGEROUS_ACTIONS = new Set([
    'delete',
    'remove',
    'destroy',
    'erase',
    'wipe',
    'purge',
    'kill',
    'terminate',
    'add',
    'create',
    'write',
    'modify',
    'change',
    'update',
]);

/**
 * Check if action field contains dangerous operation
 * Case-insensitive, checks for substring matches
 * Input should already be normalized
 */
function isDangerousAction(action: string): boolean {
    const lower = action.toLowerCase().trim();
    
    // Exact match against canonical actions
    if (DANGEROUS_ACTIONS.has(lower)) return true;
    
    // Substring match (catches delete_all, force_add, etc.)
    for (const dangerous of DANGEROUS_ACTIONS) {
        if (lower.includes(dangerous)) return true;
    }
    
    // Check for "please X" patterns
    if (lower.match(/please\s+(delete|remove|destroy|wipe|add|create|modify)/)) {
        return true;
    }
    
    return false;
}

// ═══════════════════════════════════════════════════════════════════
// GUARDS - Sequential, single responsibility (receive PRE-normalized input)
// ═══════════════════════════════════════════════════════════════════

const guardCritical: Guard = (input) => {
    // Input is already normalized by caller
    for (const { p, n } of CRITICAL) {
        if (p.test(input)) {
            return block('CRITICAL', n, 'This could cause irreversible damage. Use safer alternatives.');
        }
    }
    return FLOWS;
};

const guardBoundary: Guard = (input) => {
    // Input is already normalized by caller
    for (const p of BOUNDARY) {
        if (p.test(input)) {
            return block('BOUNDARY', 'filesystem boundary', 'Path outside safe scope. Use relative paths.');
        }
    }
    return FLOWS;
};

const guardAction: Guard = (input) => {
    // Input is already normalized by caller
    // Check for dangerous action phrases in text
    const lower = input.toLowerCase();
    if (lower.match(/please\s+(delete|remove|destroy|wipe)/i)) {
        return block('ACTION', 'dangerous request', 
            'Potentially dangerous action in natural language. Verify intent.');
    }
    
    return FLOWS;
};

// ═══════════════════════════════════════════════════════════════════
// ONE - The only function that matters
// ═══════════════════════════════════════════════════════════════════

const GUARDS: Guard[] = [guardCritical, guardBoundary, guardAction];

/**
 * Recursively scan nested objects and arrays
 * Normalizes each string value before checking
 */
function deepScan(value: any, depth: number = 0): Signal {
    if (depth > 20) return FLOWS; // Prevent infinite recursion
    
    if (typeof value === 'string') {
        // Normalize the string value
        const normalized = normalize(value);
        
        // Run through all guards
        for (const guard of GUARDS) {
            const signal = guard(normalized);
            if (!signal.flows) return signal;
        }
        
        return FLOWS;
    }
    
    if (Array.isArray(value)) {
        // Check if array contains command-like sequences
        const arrayStr = value.join(' ');
        const normalized = normalize(arrayStr);
        
        // Run through guards on the joined array
        for (const guard of GUARDS) {
            const signal = guard(normalized);
            if (!signal.flows) return signal;
        }
        
        // Also check each item individually
        for (const item of value) {
            const signal = deepScan(item, depth + 1);
            if (!signal.flows) return signal;
        }
    } else if (typeof value === 'object' && value !== null) {
        // Check for dangerous action fields at object level
        const actionFields = ['action', 'operation', 'task', 'command', 'cmd', 'method', 'tool'];
        
        for (const field of actionFields) {
            if (value[field] && typeof value[field] === 'string') {
                const normalized = normalize(value[field]);
                if (isDangerousAction(normalized)) {
                    return block('ACTION', 'dangerous operation', 
                        `Dangerous action detected: ${normalized}. Verify intent.`);
                }
            }
        }
        
        // Recursively check all keys and values
        for (const key in value) {
            // Check key itself (normalized)
            const normalizedKey = normalize(key);
            for (const guard of GUARDS) {
                const signal = guard(normalizedKey);
                if (!signal.flows) return signal;
            }
            
            // Check value recursively
            const signal = deepScan(value[key], depth + 1);
            if (!signal.flows) return signal;
        }
    }
    
    return FLOWS;
}

/**
 * ONE security check
 * Input → Parse → Normalize each value → Guards → Signal
 */
export function one(input: string): Signal {
    // Try to parse as JSON first
    let parsed: any;
    try {
        parsed = JSON.parse(input);
    } catch (e) {
        // Not JSON, treat as plain string
        const normalized = normalize(input);
        for (const guard of GUARDS) {
            const signal = guard(normalized);
            if (!signal.flows) return signal;
        }
        return FLOWS;
    }
    
    // If JSON, deep scan with normalization at each value
    return deepScan(parsed);
}

/**
 * Extend with custom guards
 */
export function withGuards(custom: Guard[]): (input: string) => Signal {
    const all = [...GUARDS, ...custom];
    return (input) => {
        const normalized = normalize(input);
        for (const guard of all) {
            const signal = guard(normalized);
            if (!signal.flows) return signal;
        }
        return FLOWS;
    };
}

/**
 * Validate text content (extracts JSON, checks each)
 * Now with deep scanning and normalization
 */
export function validateText(text: string): Signal {
    const normalized = normalize(text);
    
    // Check raw text
    let signal = one(normalized);
    if (!signal.flows) return signal;

    // Extract and check all JSON patterns (including nested)
    // More aggressive JSON extraction
    const jsonPattern = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
    const matches = text.match(jsonPattern) || [];  // Use original text, not normalized

    for (const match of matches) {
        // Try to parse and validate each JSON match
        try {
            const parsed = JSON.parse(match);
            // Deep scan the parsed JSON
            signal = deepScan(parsed);
            if (!signal.flows) return signal;
        } catch (e) {
            // If not valid JSON, check as string
            signal = one(match);
            if (!signal.flows) return signal;
        }
    }

    return FLOWS;
}

// ═══════════════════════════════════════════════════════════════════
// AUDIT - Simple record
// ═══════════════════════════════════════════════════════════════════

export interface AuditEntry {
    ts: string;
    input: string;
    signal: Signal;
}

const log: AuditEntry[] = [];

export function audit(input: string, signal: Signal): void {
    log.push({ ts: new Date().toISOString(), input: input.slice(0, 100), signal });
}

export function getAudit(): AuditEntry[] {
    return [...log];
}

export function clearAudit(): void {
    log.length = 0;
}

// ═══════════════════════════════════════════════════════════════════
// ∞ ONE ∞
// ═══════════════════════════════════════════════════════════════════
