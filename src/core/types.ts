export enum ResultType {
    PASS = "PASS",
    FAIL = "FAIL"
}

export interface ValidationResult {
    status: ResultType;
    invariantId?: string;
}

export interface PolicyRule {
    id: string;
    description: string;
    validate: (text: string) => boolean;
}

// MCP Security Types
export interface MCPToolRequest {
    tool: string;
    server: string;
    input: Record<string, unknown>;
    timestamp: string;
}

export interface MCPValidationResult extends ValidationResult {
    auditEntry?: MCPAuditEntry;
    violations?: string[];
}

export interface MCPAuditEntry {
    timestamp: string;
    tool: string;
    server: string;
    violation?: string;
    input: Record<string, unknown>;
}

export interface MCPPolicyRule {
    id: string;
    description: string;
    validate: (request: MCPToolRequest, context?: MCPValidationContext) => boolean;
}

export interface MCPValidationContext {
    workspacePath?: string;
    userRequestedAction?: boolean;
    conversationHistory?: string[];
}
