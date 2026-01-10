import { MCPPolicyRule, MCPToolRequest, MCPValidationContext } from '../core/types';

/**
 * MCP Security Policy Rules
 * 
 * These rules detect boundary violations in MCP (Model Context Protocol) tool calls.
 * Each rule enforces a specific security invariant.
 */

// Dangerous filesystem-modifying actions (from ZERO guardian patterns)
const DANGEROUS_ACTIONS = [
    'add', 'commit', 'push', 'delete', 'remove', 'write', 'create',
    'modify', 'update', 'overwrite', 'rm', 'mv', 'cp', 'chmod', 'chown'
];

// Critical danger patterns (from BiasGuard shell protection - ZERO guardian)
const CRITICAL_DANGER_PATTERNS = [
    /rm\s+-rf/i,           // Recursive force delete
    /rm\s+-r\s+-f/i,       // Alternate form
    /format\s+/i,          // Disk formatting
    /mkfs/i,               // Make filesystem
    /dd\s+if=/i,           // Disk destroyer
    /eval\s+\$/i,          // Eval injection
    /exec\s+\$/i,          // Exec injection
    />\s*\/dev\/sd/i,      // Direct disk write
    /chmod\s+777/i,        // Dangerous permissions
    /curl.*\|\s*sh/i,      // Pipe to shell
    /wget.*\|\s*sh/i,      // Pipe to shell
    /curl.*\|\s*bash/i,    // Pipe to bash
];

// Patterns indicating absolute filesystem paths
const ABSOLUTE_PATH_PATTERNS = [
    /^\/Users\//,      // macOS user directories
    /^\/home\//,       // Linux user directories
    /^\/root\//,       // Root directory
    /^\/var\//,        // Variable data
    /^\/etc\//,        // System configuration
    /^\/tmp\//,        // Temporary files
    /^[A-Z]:\\/,       // Windows drives (C:\, D:\, etc.)
    /^\/Volumes\//,    // macOS mounted volumes
    /^~\//,            // Home directory shorthand
];

/**
 * Check if a value contains an absolute filesystem path
 */
function containsAbsolutePath(value: unknown): boolean {
    if (typeof value === 'string') {
        return ABSOLUTE_PATH_PATTERNS.some(pattern => pattern.test(value));
    }
    if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => containsAbsolutePath(v));
    }
    return false;
}

/**
 * Check if a path is outside the workspace
 */
function isOutsideWorkspace(value: unknown, workspacePath?: string): boolean {
    if (!workspacePath || typeof value !== 'string') return false;
    
    // Normalize paths for comparison
    const normalizedValue = value.replace(/\/$/, '');
    const normalizedWorkspace = workspacePath.replace(/\/$/, '');
    
    // If it's an absolute path and doesn't start with workspace, it's outside
    if (ABSOLUTE_PATH_PATTERNS.some(p => p.test(value))) {
        return !normalizedValue.startsWith(normalizedWorkspace);
    }
    return false;
}

/**
 * Check if the action is dangerous
 */
function isDangerousAction(value: unknown): boolean {
    if (typeof value === 'string') {
        return DANGEROUS_ACTIONS.some(action => 
            value.toLowerCase() === action.toLowerCase()
        );
    }
    return false;
}

/**
 * Check for critical danger patterns (ZERO guardian logic)
 */
function containsCriticalDangerPattern(value: unknown): boolean {
    if (typeof value === 'string') {
        return CRITICAL_DANGER_PATTERNS.some(pattern => pattern.test(value));
    }
    if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => containsCriticalDangerPattern(v));
    }
    return false;
}

/**
 * Extract all string values from an object recursively
 */
function extractAllValues(obj: Record<string, unknown>): unknown[] {
    const values: unknown[] = [];
    for (const value of Object.values(obj)) {
        values.push(value);
        if (typeof value === 'object' && value !== null) {
            values.push(...extractAllValues(value as Record<string, unknown>));
        }
    }
    return values;
}

export const mcpPolicyRules: MCPPolicyRule[] = [
    {
        id: "MCP-ZERO-01",
        description: "ZERO Guardian: Critical danger pattern detected (rm -rf, format, dd, eval injection)",
        validate: (request: MCPToolRequest): boolean => {
            // FAIL if any input contains critical danger patterns
            // This is the highest priority check - blocks destructive commands
            const toolDanger = containsCriticalDangerPattern(request.tool);
            const inputDanger = containsCriticalDangerPattern(request.input);
            return !(toolDanger || inputDanger);
        }
    },
    {
        id: "MCP-PATH-01",
        description: "Filesystem Boundary Violation - Absolute path detected in MCP request",
        validate: (request: MCPToolRequest): boolean => {
            // FAIL if any input contains an absolute filesystem path
            return !containsAbsolutePath(request.input);
        }
    },
    {
        id: "MCP-SCOPE-01",
        description: "Workspace Scope Violation - Path outside current workspace",
        validate: (request: MCPToolRequest, context?: MCPValidationContext): boolean => {
            if (!context?.workspacePath) {
                // Can't validate without workspace context - pass by default
                return true;
            }
            
            const allValues = extractAllValues(request.input);
            for (const value of allValues) {
                if (isOutsideWorkspace(value, context.workspacePath)) {
                    return false; // FAIL
                }
            }
            return true; // PASS
        }
    },
    {
        id: "MCP-CONSENT-01", 
        description: "Consent Validation - Tool call without preceding user request",
        validate: (_request: MCPToolRequest, context?: MCPValidationContext): boolean => {
            // If we have context and userRequestedAction is explicitly false, fail
            if (context && context.userRequestedAction === false) {
                return false; // FAIL - unsolicited action
            }
            // Default to pass if we can't determine consent status
            return true;
        }
    },
    {
        id: "MCP-FS-01",
        description: "Dangerous Operation - High-risk filesystem operation detected",
        validate: (request: MCPToolRequest): boolean => {
            // Check tool name for dangerous patterns
            const toolLower = request.tool.toLowerCase();
            const hasDangerousTool = DANGEROUS_ACTIONS.some(action => 
                toolLower.includes(action)
            );
            
            // Check input values for dangerous action parameters
            const allValues = extractAllValues(request.input);
            const hasDangerousInput = allValues.some(v => isDangerousAction(v));
            
            // FAIL if either dangerous tool or dangerous action in input
            return !(hasDangerousTool || hasDangerousInput);
        }
    }
];

/**
 * Validate an MCP request against all security rules
 * Returns array of violated rule IDs (empty if all pass)
 */
export function validateMCPRequest(
    request: MCPToolRequest, 
    context?: MCPValidationContext
): string[] {
    const violations: string[] = [];
    
    for (const rule of mcpPolicyRules) {
        if (!rule.validate(request, context)) {
            violations.push(rule.id);
        }
    }
    
    return violations;
}

/**
 * Get rule description by ID
 */
export function getRuleDescription(ruleId: string): string | undefined {
    const rule = mcpPolicyRules.find(r => r.id === ruleId);
    return rule?.description;
}

