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
    { pattern: /rm\s+-rf/i, name: 'recursive delete' },
    { pattern: /rm\s+-r\s+-f/i, name: 'recursive delete' },
    { pattern: /mkfs/i, name: 'format disk' },
    { pattern: /dd\s+if=/i, name: 'disk write' },
    { pattern: /eval\s+\$/i, name: 'eval injection' },
    { pattern: /exec\s+\$/i, name: 'exec injection' },
    { pattern: />\s*\/dev\/sd/i, name: 'raw disk write' },
    { pattern: /curl.*\|\s*(sh|bash)/i, name: 'pipe to shell' },
    { pattern: /wget.*\|\s*(sh|bash)/i, name: 'pipe to shell' },
    { pattern: /chmod\s+777/i, name: 'unsafe permissions' },
    { pattern: /:(){ :|:& };:/i, name: 'fork bomb' },
];

// Filesystem boundaries - absolute paths need awareness
const BOUNDARY_PATTERNS = [
    /^\/Users\//,
    /^\/home\//,
    /^\/root\//,
    /^\/var\//,
    /^\/etc\//,
    /^\/tmp\//,
    /^[A-Z]:\\/,
    /^\/Volumes\//,
    /^~\//,
];

// Dangerous actions - require extra scrutiny
const DANGER_ACTIONS = new Set([
    'add', 'commit', 'push', 'delete', 'remove', 'write', 
    'create', 'modify', 'update', 'overwrite', 'format'
]);

// =============================================================================
// ONE: Value Extraction - Flow Through Content
// =============================================================================

function* flowThrough(value: unknown): Generator<string> {
    if (typeof value === 'string') {
        yield value;
    } else if (Array.isArray(value)) {
        for (const item of value) yield* flowThrough(item);
    } else if (typeof value === 'object' && value !== null) {
        for (const v of Object.values(value)) yield* flowThrough(v);
    }
}

// =============================================================================
// ONE: Guards - Each a Single Responsibility
// =============================================================================

const guardCritical: Guard = (request) => {
    for (const value of flowThrough(request.content)) {
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
    for (const value of flowThrough(request.content)) {
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
        if (typeof value === 'string' && DANGER_ACTIONS.has(value.toLowerCase())) {
            return block(
                'ACTION',
                `Potentially dangerous action: ${value}`,
                'This action modifies data. Please confirm this is what you intended.'
            );
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

