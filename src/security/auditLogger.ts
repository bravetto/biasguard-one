import * as fs from 'fs';
import * as path from 'path';
import { MCPToolRequest, MCPAuditEntry } from '../core/types';

/**
 * Audit Logger for MCP Security Events
 * 
 * Logs all MCP requests and violations to a JSON file for research and documentation.
 */

const AUDIT_DIR = '.biasguard';
const AUDIT_FILE = 'mcp-audit.json';

interface AuditLog {
    version: string;
    created: string;
    lastUpdated: string;
    entries: MCPAuditEntry[];
}

/**
 * Get the audit file path for a workspace
 */
export function getAuditFilePath(workspacePath: string): string {
    return path.join(workspacePath, AUDIT_DIR, AUDIT_FILE);
}

/**
 * Ensure the audit directory exists
 */
function ensureAuditDir(workspacePath: string): void {
    const auditDir = path.join(workspacePath, AUDIT_DIR);
    if (!fs.existsSync(auditDir)) {
        fs.mkdirSync(auditDir, { recursive: true });
    }
}

/**
 * Load existing audit log or create new one
 */
function loadAuditLog(filePath: string): AuditLog {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(content);
        }
    } catch (error) {
        console.error('BiasGuard: Error loading audit log:', error);
    }
    
    // Return new audit log
    return {
        version: '1.0.0',
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        entries: []
    };
}

/**
 * Save audit log to file
 */
function saveAuditLog(filePath: string, log: AuditLog): void {
    try {
        log.lastUpdated = new Date().toISOString();
        fs.writeFileSync(filePath, JSON.stringify(log, null, 2), 'utf-8');
    } catch (error) {
        console.error('BiasGuard: Error saving audit log:', error);
    }
}

/**
 * Create an audit entry from an MCP request
 */
export function createAuditEntry(
    request: MCPToolRequest,
    violations: string[]
): MCPAuditEntry {
    return {
        timestamp: new Date().toISOString(),
        tool: request.tool,
        server: request.server,
        violation: violations.length > 0 ? violations.join(', ') : undefined,
        input: request.input
    };
}

/**
 * Log an MCP request to the audit file
 */
export function logMCPRequest(
    workspacePath: string,
    request: MCPToolRequest,
    violations: string[] = []
): MCPAuditEntry {
    ensureAuditDir(workspacePath);
    const filePath = getAuditFilePath(workspacePath);
    
    const log = loadAuditLog(filePath);
    const entry = createAuditEntry(request, violations);
    
    log.entries.push(entry);
    saveAuditLog(filePath, log);
    
    return entry;
}

/**
 * Get all audit entries
 */
export function getAuditEntries(workspacePath: string): MCPAuditEntry[] {
    const filePath = getAuditFilePath(workspacePath);
    const log = loadAuditLog(filePath);
    return log.entries;
}

/**
 * Get audit entries with violations only
 */
export function getViolationEntries(workspacePath: string): MCPAuditEntry[] {
    return getAuditEntries(workspacePath).filter(e => e.violation);
}

/**
 * Get audit summary statistics
 */
export function getAuditSummary(workspacePath: string): {
    totalRequests: number;
    violations: number;
    byServer: Record<string, number>;
    byViolationType: Record<string, number>;
} {
    const entries = getAuditEntries(workspacePath);
    
    const byServer: Record<string, number> = {};
    const byViolationType: Record<string, number> = {};
    let violations = 0;
    
    for (const entry of entries) {
        // Count by server
        byServer[entry.server] = (byServer[entry.server] || 0) + 1;
        
        // Count violations
        if (entry.violation) {
            violations++;
            const types = entry.violation.split(', ');
            for (const type of types) {
                byViolationType[type] = (byViolationType[type] || 0) + 1;
            }
        }
    }
    
    return {
        totalRequests: entries.length,
        violations,
        byServer,
        byViolationType
    };
}

/**
 * Clear the audit log (for testing)
 */
export function clearAuditLog(workspacePath: string): void {
    const filePath = getAuditFilePath(workspacePath);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

/**
 * In-memory audit logger for VS Code extension (no filesystem access)
 */
export class MemoryAuditLogger {
    private entries: MCPAuditEntry[] = [];
    
    log(request: MCPToolRequest, violations: string[] = []): MCPAuditEntry {
        const entry = createAuditEntry(request, violations);
        this.entries.push(entry);
        return entry;
    }
    
    getEntries(): MCPAuditEntry[] {
        return [...this.entries];
    }
    
    getViolations(): MCPAuditEntry[] {
        return this.entries.filter(e => e.violation);
    }
    
    clear(): void {
        this.entries = [];
    }
    
    toJSON(): string {
        return JSON.stringify({
            version: '1.0.0',
            exported: new Date().toISOString(),
            entries: this.entries
        }, null, 2);
    }
}

