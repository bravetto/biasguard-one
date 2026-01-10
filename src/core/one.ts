/**
 * ∞ BiasGuard ONE ∞
 * 
 * Unified Protection Pattern - Loving, Logical, Real Life
 * "Like water flows, protection adapts"
 * 
 * ONE PATTERN: All validation flows through a single, coherent path
 * SOURCE AWARE: Every request knows its origin
 * RADICALLY SIMPLE: Minimum complexity, maximum protection
 * 
 * ∞ AbëONE ∞
 */

// =============================================================================
// ONE: Core Types - Radically Simplified
// =============================================================================

export type FlowResult = 
    | { flows: true }
    | { flows: false; blocked: string; reason: string; guidance: string };

export interface Source {
    origin: string;      // Where did this come from?
    tool?: string;       // What tool is being invoked?
    workspace?: string;  // What workspace context?
    timestamp: string;   // When?
}

export interface Request {
    source: Source;
    content: Record<string, unknown>;
}

// =============================================================================
// ONE: Guardian - Single Unified Validator
// =============================================================================

type Guard = (request: Request) => FlowResult;

const FLOWS: FlowResult = { flows: true };

const block = (id: string, reason: string, guidance: string): FlowResult => ({
    flows: false,
    blocked: id,
    reason,
    guidance
});

// =============================================================================
// ONE: Pattern Definitions - Clear, Explicit, Real
// =============================================================================

// Critical danger - these NEVER flow through
const CRITICAL_PATTERNS = [
    // Core destructive commands (allow zero or more whitespace/invisible chars after stripping)
    { pattern: /rm\s*-\s*r\s*f/i, name: 'recursive delete' },
    { pattern: /rm\s+-r\s+-f/i, name: 'recursive delete' },
    { pattern: /rm\s+.*-rf/i, name: 'recursive delete variant' },
    { pattern: /mkfs/i, name: 'format disk' },
    { pattern: /dd\s+if=/i, name: 'disk write' },
    { pattern: />\s*\/dev\/sd/i, name: 'raw disk write' },
    { pattern: /chmod\s+777/i, name: 'unsafe permissions' },
    
    // Shell injection patterns
    { pattern: /eval\s+\$/i, name: 'eval injection' },
    { pattern: /exec\s+\$/i, name: 'exec injection' },
    { pattern: /\$\([^)]+\)/i, name: 'command substitution' },
    { pattern: /`[^`]+`/, name: 'backtick execution' },
    { pattern: /\$\{[^}]+\}/i, name: 'variable expansion' },
    { pattern: /\{[^}]*,[^}]*\}/i, name: 'brace expansion' },
    
    // Pipe to shell (various forms)
    { pattern: /curl.*\|\s*(sh|bash)/i, name: 'pipe to shell' },
    { pattern: /wget.*\|\s*(sh|bash)/i, name: 'pipe to shell' },
    { pattern: /curl.*&&\s*(sh|bash)/i, name: 'download and execute' },
    { pattern: /curl\s+-o.*&&/i, name: 'download then execute' },
    
    // Fork bombs (multiple variants)
    { pattern: /:\(\)\s*\{.*:\s*\|.*&.*\}/i, name: 'fork bomb' },
    { pattern: /\w+\(\)\s*\{\s*\w+\s*\|\s*\w+\s*&\s*\}/i, name: 'fork bomb function' },
    { pattern: /fork\s+while\s+fork/i, name: 'perl fork bomb' },
    { pattern: /os\.fork\(\)/i, name: 'python fork' },
    
    // Remote code execution
    { pattern: /python.*-c.*exec\(/i, name: 'python exec' },
    { pattern: /python.*-c.*eval\(/i, name: 'python eval' },
    { pattern: /python.*urllib.*exec/i, name: 'python url exec' },
    { pattern: /node.*-e.*eval\(/i, name: 'node eval' },
    { pattern: /node.*require.*\.get.*eval/i, name: 'node fetch eval' },
    { pattern: /perl.*-e.*fork/i, name: 'perl fork' },
    { pattern: /powershell.*IEX/i, name: 'powershell IEX' },
    { pattern: /powershell.*Invoke-Expression/i, name: 'powershell invoke' },
    { pattern: /powershell.*DownloadString/i, name: 'powershell download' },
    
    // Base64 execution
    { pattern: /base64.*-d.*\|\s*(sh|bash)/i, name: 'base64 decode execute' },
];

// Filesystem boundaries - absolute paths need awareness
const BOUNDARY_PATTERNS = [
    /^\/Users\//i,
    /^\/home\//i,
    /^\/root\//i,
    /^\/var\//i,
    /^\/etc\//i,
    /^\/tmp\//i,
    /^[A-Za-z]:\\/i,          // Windows drives (case insensitive)
    /^\/Volumes\//i,
    /^~\//,
    /^\\\\[^\\]+\\/,          // UNC paths \\server\share
    /^\/proc\//i,             // Linux proc filesystem
    /^\/sys\//i,              // Linux sys filesystem
    /^\/dev\//i,              // Device files
];

// Path traversal patterns - ALWAYS dangerous
const TRAVERSAL_PATTERNS = [
    /\.\.\//,                 // ../
    /\.\.\\/,                 // ..\
    /\.\.%2[Ff]/i,           // URL encoded ../
    /\.\.%252[Ff]/i,         // Double URL encoded
    /%2[Ff]\.\.%2[Ff]/i,     // Fully URL encoded /../
];

// Dangerous actions - require extra scrutiny (used as substring match)
const DANGER_ACTIONS = [
    'add', 'commit', 'push', 'delete', 'remove', 'write', 
    'create', 'modify', 'update', 'overwrite', 'format'
];

// =============================================================================
// ONE: Normalization - See Through Obfuscation
// =============================================================================

/**
 * Normalize unicode to ASCII - defeat homoglyph attacks
 */
function normalizeUnicode(str: string): string {
    // Map common unicode lookalikes to ASCII
    const homoglyphMap: Record<string, string> = {
        'ａ': 'a', 'ｂ': 'b', 'ｃ': 'c', 'ｄ': 'd', 'ｅ': 'e', 'ｆ': 'f', 'ｇ': 'g',
        'ｈ': 'h', 'ｉ': 'i', 'ｊ': 'j', 'ｋ': 'k', 'ｌ': 'l', 'ｍ': 'm', 'ｎ': 'n',
        'ｏ': 'o', 'ｐ': 'p', 'ｑ': 'q', 'ｒ': 'r', 'ｓ': 's', 'ｔ': 't', 'ｕ': 'u',
        'ｖ': 'v', 'ｗ': 'w', 'ｘ': 'x', 'ｙ': 'y', 'ｚ': 'z',
        'Ａ': 'A', 'Ｂ': 'B', 'Ｃ': 'C', 'Ｄ': 'D', 'Ｅ': 'E', 'Ｆ': 'F', 'Ｇ': 'G',
        'Ｈ': 'H', 'Ｉ': 'I', 'Ｊ': 'J', 'Ｋ': 'K', 'Ｌ': 'L', 'Ｍ': 'M', 'Ｎ': 'N',
        'Ｏ': 'O', 'Ｐ': 'P', 'Ｑ': 'Q', 'Ｒ': 'R', 'Ｓ': 'S', 'Ｔ': 'T', 'Ｕ': 'U',
        'Ｖ': 'V', 'Ｗ': 'W', 'Ｘ': 'X', 'Ｙ': 'Y', 'Ｚ': 'Z',
        '０': '0', '１': '1', '２': '2', '３': '3', '４': '4',
        '５': '5', '６': '6', '７': '7', '８': '8', '９': '9',
        '／': '/', '＼': '\\', '－': '-', '＿': '_',
        // Cyrillic lookalikes
        'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p', 'с': 'c', 'х': 'x', 'у': 'y',
        'А': 'A', 'В': 'B', 'Е': 'E', 'К': 'K', 'М': 'M', 'Н': 'H', 'О': 'O',
        'Р': 'P', 'С': 'C', 'Т': 'T', 'Х': 'X', 'г': 'r',
    };
    
    let result = str;
    for (const [unicode, ascii] of Object.entries(homoglyphMap)) {
        result = result.split(unicode).join(ascii);
    }
    
    // Remove ALL invisible/zero-width characters comprehensively
    result = result.replace(/[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180F\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3000\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/g, '');
    
    return result;
}

/**
 * Decode hex escapes like \x72 to actual characters
 */
function decodeHexEscapes(str: string): string {
    return str.replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => 
        String.fromCharCode(parseInt(hex, 16))
    );
}

/**
 * Strip quotes used for obfuscation (r'm' -> rm)
 */
function stripObfuscatingQuotes(str: string): string {
    // Remove quotes that split words: r'm' -> rm, "r""m" -> rm
    return str.replace(/['"](['"])?/g, '');
}

/**
 * URL decode a string (handle single and double encoding)
 */
function urlDecode(str: string): string {
    let result = str;
    // Try decoding up to 3 times for multi-encoded strings
    for (let i = 0; i < 3; i++) {
        try {
            const decoded = decodeURIComponent(result);
            if (decoded === result) break;
            result = decoded;
        } catch {
            break;
        }
    }
    return result;
}

/**
 * Normalize a value for security scanning
 */
function normalize(str: string): string {
    let result = str;
    result = urlDecode(result);
    result = decodeHexEscapes(result);
    result = normalizeUnicode(result);
    result = stripObfuscatingQuotes(result);
    // Collapse whitespace variations
    result = result.replace(/[\t\r\n\v\f]+/g, ' ');
    return result;
}

// =============================================================================
// ONE: Value Extraction - Flow Through Content
// =============================================================================

function* flowThrough(value: unknown, doNormalize = false): Generator<string> {
    if (typeof value === 'string') {
        yield doNormalize ? normalize(value) : value;
    } else if (Array.isArray(value)) {
        // Also yield the array as joined string (catches split attacks)
        yield doNormalize ? normalize(value.join(' ')) : value.join(' ');
        for (const item of value) yield* flowThrough(item, doNormalize);
    } else if (typeof value === 'object' && value !== null) {
        for (const v of Object.values(value)) yield* flowThrough(v, doNormalize);
    }
}

/**
 * Flow through with normalization - for pattern matching
 */
function* flowNormalized(value: unknown): Generator<string> {
    yield* flowThrough(value, true);
}

// =============================================================================
// ONE: Guards - Each a Single Responsibility
// =============================================================================

const guardCritical: Guard = (request) => {
    // Check both raw and normalized values
    for (const value of flowNormalized(request.content)) {
        for (const { pattern, name } of CRITICAL_PATTERNS) {
            if (pattern.test(value)) {
                return block(
                    'CRITICAL',
                    `Critical danger pattern detected: ${name}`,
                    'This operation could cause irreversible damage. Please use safer alternatives.'
                );
            }
        }
    }
    return FLOWS;
};

const guardBoundary: Guard = (request) => {
    for (const value of flowNormalized(request.content)) {
        // Check for path traversal (ALWAYS dangerous)
        if (TRAVERSAL_PATTERNS.some(p => p.test(value))) {
            return block(
                'BOUNDARY',
                `Path traversal detected`,
                `Path contains dangerous traversal pattern (../ or encoded variant). This could escape boundaries.`
            );
        }
        
        // Check for absolute paths
        if (BOUNDARY_PATTERNS.some(p => p.test(value))) {
            // Check if within workspace (loving - allow if in scope)
            if (request.source.workspace && value.startsWith(request.source.workspace)) {
                continue; // Within workspace is OK
            }
            return block(
                'BOUNDARY',
                `Filesystem boundary: absolute path outside workspace`,
                `Path "${value.slice(0, 50)}..." is outside your workspace. Use relative paths or confirm this is intentional.`
            );
        }
    }
    return FLOWS;
};

const guardAction: Guard = (request) => {
    for (const value of flowThrough(request.content)) {
        if (typeof value === 'string') {
            const normalized = normalize(value).toLowerCase();
            // Check if any dangerous action is contained in the value
            for (const action of DANGER_ACTIONS) {
                // Match as whole word or as part of compound (delete_all, force_add)
                const wordBoundary = new RegExp(`(^|[^a-z])${action}([^a-z]|$)`, 'i');
                if (wordBoundary.test(normalized) || normalized === action) {
                    return block(
                        'ACTION',
                        `Potentially dangerous action: ${action}`,
                        'This action modifies data. Please confirm this is what you intended.'
                    );
                }
            }
        }
    }
    // Also check tool name
    if (request.source.tool) {
        const toolLower = request.source.tool.toLowerCase();
        for (const action of DANGER_ACTIONS) {
            if (toolLower.includes(action)) {
                return block(
                    'ACTION',
                    `Tool performs dangerous action: ${action}`,
                    'This tool modifies data. Please verify the operation is safe.'
                );
            }
        }
    }
    return FLOWS;
};

const guardSource: Guard = (request) => {
    // Unknown or suspicious sources get flagged
    const origin = request.source.origin.toLowerCase();
    if (origin.includes('unknown') || origin === '') {
        return block(
            'SOURCE',
            'Unknown request origin',
            'Cannot verify where this request came from. Please check the source.'
        );
    }
    return FLOWS;
};

// =============================================================================
// ONE: The Flow - Guards Execute in Sequence
// =============================================================================

const GUARDS: Guard[] = [
    guardCritical,   // First: Block catastrophic operations
    guardSource,     // Second: Verify origin
    guardBoundary,   // Third: Check filesystem boundaries  
    guardAction,     // Fourth: Flag dangerous actions
];

/**
 * ONE validate - All protection flows through here
 * Like water: finds the path, adapts, protects
 */
export function validate(request: Request): FlowResult {
    for (const guard of GUARDS) {
        const result = guard(request);
        if (!result.flows) return result;
    }
    return FLOWS;
}

/**
 * Create a request from raw content with source awareness
 */
export function createRequest(
    content: Record<string, unknown>,
    origin: string,
    tool?: string,
    workspace?: string
): Request {
    return {
        source: {
            origin,
            tool,
            workspace,
            timestamp: new Date().toISOString()
        },
        content
    };
}

// =============================================================================
// ONE: Text Analysis - Extract MCP Patterns from Text
// =============================================================================

const JSON_PATTERN = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;

export function extractRequests(text: string, origin: string, workspace?: string): Request[] {
    const requests: Request[] = [];
    const matches = text.match(JSON_PATTERN) || [];
    
    for (const match of matches) {
        try {
            const parsed = JSON.parse(match);
            if (typeof parsed === 'object' && parsed !== null) {
                // Infer tool from content
                const tool = parsed.tool || parsed.action || 
                    (parsed.directory && parsed.action ? `git_${parsed.action}` : undefined);
                
                requests.push(createRequest(parsed, origin, tool, workspace));
            }
        } catch {
            // Not valid JSON, skip
        }
    }
    
    return requests;
}

/**
 * Validate text content - the main entry point
 */
export function validateText(text: string, origin = 'document', workspace?: string): FlowResult {
    const requests = extractRequests(text, origin, workspace);
    
    for (const request of requests) {
        const result = validate(request);
        if (!result.flows) return result;
    }
    
    return FLOWS;
}

// =============================================================================
// ONE: Audit - Simple, Clear Record
// =============================================================================

export interface AuditEntry {
    timestamp: string;
    source: Source;
    result: 'FLOWS' | string;
    guidance?: string;
}

const auditLog: AuditEntry[] = [];

export function audit(request: Request, result: FlowResult): AuditEntry {
    const entry: AuditEntry = {
        timestamp: new Date().toISOString(),
        source: request.source,
        result: result.flows ? 'FLOWS' : result.blocked,
        guidance: result.flows ? undefined : result.guidance
    };
    auditLog.push(entry);
    return entry;
}

export function getAuditLog(): AuditEntry[] {
    return [...auditLog];
}

export function exportAudit(): string {
    return JSON.stringify({
        exported: new Date().toISOString(),
        entries: auditLog
    }, null, 2);
}

export function clearAudit(): void {
    auditLog.length = 0;
}

// =============================================================================
// ∞ ONE PATTERN ∞
// =============================================================================

