import { PolicyRule, ResultType, ValidationResult, MCPValidationResult, MCPValidationContext } from './types';
import { parseMCPRequests } from './mcpParser';
import { validateMCPRequest, getRuleDescription } from './mcpPolicyRules';
import { MemoryAuditLogger } from './auditLogger';

// Global audit logger instance
export const mcpAuditLogger = new MemoryAuditLogger();

// Helper for case-insensitive check
const contains = (text: string, term: string): boolean => {
    return text.toLowerCase().includes(term.toLowerCase());
};

const rules: PolicyRule[] = [
    {
        id: "EXEC-01",
        description: "Unsafe Execution Suggestion",
        validate: (text: string): boolean => {
            const forbidden = [
                "npm install", "yarn", "pnpm", "pip install", "make", "docker",
                "kubectl", "terraform apply", "run this", "just run", "execute",
                "start the server"
            ];
            
            const required1 = "git rev-parse --show-toplevel";
            const required2 = "package.json";

            const hasForbidden = forbidden.some(t => contains(text, t));
            
            if (hasForbidden) {
                // Must have BOTH exemptions to pass
                const hasExemption = contains(text, required1) && contains(text, required2);
                return hasExemption;
            }
            return true;
        }
    },
    {
        id: "GIT-01",
        description: "Ambiguous Repo Reference",
        validate: (text: string): boolean => {
            const forbidden = [
                "this repo", "the repository", "in this repo", "repo root"
            ];
            const required = "git rev-parse --show-toplevel";

            const hasForbidden = forbidden.some(t => contains(text, t));
            
            if (hasForbidden) {
                return contains(text, required);
            }
            return true;
        }
    },
    {
        id: "LAYER-01",
        description: "Layer Collapse (Workspace + Action)",
        validate: (text: string): boolean => {
            if (contains(text, "workspace")) {
                const actions = ["run", "execute", "build", "install"];
                const hasAction = actions.some(a => contains(text, a));
                // Fail if workspace AND action are present
                return !hasAction; 
            }
            return true;
        }
    },
    {
        id: "ASSUME-01",
        description: "Conversational Assumption",
        validate: (text: string): boolean => {
            const forbidden = [
                "as discussed earlier", "as we established", 
                "previously", "earlier you said", "already agreed"
            ];
            // Fail if any forbidden phrase is found
            return !forbidden.some(t => contains(text, t));
        }
    },
    {
        id: "MODE-01",
        description: "Missing Mode Declaration",
        validate: (text: string): boolean => {
            const triggers = ["run", "build", "deploy", "test"];
            const modes = ["mone mode", "repo mode", "project mode", "mode is unclear"];

            const hasTrigger = triggers.some(t => contains(text, t));

            if (hasTrigger) {
                // Must contain at least one mode
                return modes.some(m => contains(text, m));
            }
            return true;
        }
    }
];

export function evaluateText(text: string): ValidationResult {
    for (const rule of rules) {
        if (!rule.validate(text)) {
            return {
                status: ResultType.FAIL,
                invariantId: rule.id
            };
        }
    }
    return { status: ResultType.PASS };
}

/**
 * Evaluate text for both standard policy rules and MCP security rules
 */
export function evaluateTextWithMCP(
    text: string, 
    context?: MCPValidationContext
): MCPValidationResult {
    // First run standard policy evaluation
    const standardResult = evaluateText(text);
    if (standardResult.status === ResultType.FAIL) {
        return {
            ...standardResult,
            violations: standardResult.invariantId ? [standardResult.invariantId] : []
        };
    }
    
    // Then check for MCP requests and validate them
    const mcpRequests = parseMCPRequests(text);
    const allViolations: string[] = [];
    
    for (const request of mcpRequests) {
        const violations = validateMCPRequest(request, context);
        
        // Log to audit (always, even if no violations)
        mcpAuditLogger.log(request, violations);
        
        if (violations.length > 0) {
            allViolations.push(...violations);
        }
    }
    
    if (allViolations.length > 0) {
        // Return first violation as primary, include all in violations array
        const firstViolation = allViolations[0];
        return {
            status: ResultType.FAIL,
            invariantId: firstViolation,
            violations: [...new Set(allViolations)] // deduplicate
        };
    }
    
    return { 
        status: ResultType.PASS,
        violations: []
    };
}

/**
 * Get description for a violation ID (standard or MCP)
 */
export function getViolationDescription(violationId: string): string {
    // Check MCP rules first
    const mcpDesc = getRuleDescription(violationId);
    if (mcpDesc) return mcpDesc;
    
    // Check standard rules
    const standardRule = rules.find(r => r.id === violationId);
    if (standardRule) return standardRule.description;
    
    return `Unknown violation: ${violationId}`;
}

/**
 * Export audit log as JSON
 */
export function exportAuditLog(): string {
    return mcpAuditLogger.toJSON();
}
