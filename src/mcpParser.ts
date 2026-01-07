import { MCPToolRequest } from './types';

/**
 * MCP Request Parser
 * 
 * Extracts MCP tool call requests from text content.
 * Handles various formats including:
 * - Raw JSON objects with tool/input structure
 * - MCP-style formatted requests
 * - Embedded JSON in markdown code blocks
 */

/**
 * Pattern to match JSON objects in text
 */
const JSON_BLOCK_PATTERN = /\{[\s\S]*?\}/g;

/**
 * Pattern to match markdown code blocks containing JSON
 */
const CODE_BLOCK_PATTERN = /```(?:json)?\s*([\s\S]*?)```/g;

/**
 * Known MCP server patterns
 */
const MCP_SERVER_PATTERNS = [
    /GitKraken.*MCP/i,
    /github.*mcp/i,
    /mcp.*server/i,
    /cursor.*mcp/i,
];

/**
 * Known MCP tool name patterns
 */
const MCP_TOOL_PATTERNS = [
    /git_/,
    /file_/,
    /run_/,
    /execute_/,
    /create_/,
    /delete_/,
    /mcp_/,
];

/**
 * Check if text appears to be MCP-related
 */
function isMCPRelated(text: string): boolean {
    const lowerText = text.toLowerCase();
    return (
        lowerText.includes('mcp') ||
        lowerText.includes('tool') ||
        lowerText.includes('server') ||
        MCP_SERVER_PATTERNS.some(p => p.test(text)) ||
        MCP_TOOL_PATTERNS.some(p => p.test(text))
    );
}

/**
 * Try to parse a string as JSON
 */
function tryParseJSON(str: string): unknown | null {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}

/**
 * Check if an object looks like an MCP tool request
 */
function isMCPLikeObject(obj: unknown): obj is Partial<MCPToolRequest> {
    if (typeof obj !== 'object' || obj === null) return false;
    
    const record = obj as Record<string, unknown>;
    
    // Must have some indication of being an MCP request
    const hasToolIndicator = 
        'tool' in record || 
        'action' in record || 
        'directory' in record ||
        'path' in record ||
        'command' in record;
    
    return hasToolIndicator;
}

/**
 * Infer MCP server from context
 */
function inferServer(text: string, obj: Record<string, unknown>): string {
    // Check for explicit server mentions
    for (const pattern of MCP_SERVER_PATTERNS) {
        const match = text.match(pattern);
        if (match) return match[0];
    }
    
    // Infer from tool name patterns
    const tool = (obj.tool as string) || '';
    if (tool.startsWith('git_') || tool.includes('git')) return 'Git MCP Server';
    if (tool.startsWith('file_') || tool.includes('file')) return 'File MCP Server';
    if (tool.startsWith('mcp_github')) return 'GitHub MCP Server';
    
    return 'Unknown MCP Server';
}

/**
 * Infer tool name from object
 */
function inferTool(obj: Record<string, unknown>): string {
    if (typeof obj.tool === 'string') return obj.tool;
    if (typeof obj.action === 'string') return `action_${obj.action}`;
    if (typeof obj.command === 'string') return `command_${obj.command}`;
    
    // Check for common MCP patterns
    if ('directory' in obj && 'action' in obj) {
        return `git_${obj.action}`;
    }
    
    return 'unknown_tool';
}

/**
 * Extract input parameters from object
 */
function extractInput(obj: Record<string, unknown>): Record<string, unknown> {
    // If there's an explicit input field, use it
    if (typeof obj.input === 'object' && obj.input !== null) {
        return obj.input as Record<string, unknown>;
    }
    
    // Otherwise, treat the whole object (minus metadata) as input
    const { tool, server, timestamp, ...rest } = obj;
    return rest;
}

/**
 * Parse a single MCP request from an object
 */
function parseObjectToMCPRequest(
    obj: Record<string, unknown>, 
    sourceText: string
): MCPToolRequest {
    return {
        tool: inferTool(obj),
        server: inferServer(sourceText, obj),
        input: extractInput(obj),
        timestamp: new Date().toISOString()
    };
}

/**
 * Extract all potential MCP requests from text
 */
export function parseMCPRequests(text: string): MCPToolRequest[] {
    const requests: MCPToolRequest[] = [];
    const processedJSON = new Set<string>();
    
    // First, try to parse markdown code blocks
    let match;
    while ((match = CODE_BLOCK_PATTERN.exec(text)) !== null) {
        const content = match[1].trim();
        const parsed = tryParseJSON(content);
        if (parsed && isMCPLikeObject(parsed)) {
            const jsonStr = JSON.stringify(parsed);
            if (!processedJSON.has(jsonStr)) {
                processedJSON.add(jsonStr);
                requests.push(parseObjectToMCPRequest(parsed as Record<string, unknown>, text));
            }
        }
    }
    
    // Then try to find inline JSON objects
    const jsonMatches = text.match(JSON_BLOCK_PATTERN) || [];
    for (const jsonStr of jsonMatches) {
        const parsed = tryParseJSON(jsonStr);
        if (parsed && isMCPLikeObject(parsed)) {
            const normalizedStr = JSON.stringify(parsed);
            if (!processedJSON.has(normalizedStr)) {
                processedJSON.add(normalizedStr);
                requests.push(parseObjectToMCPRequest(parsed as Record<string, unknown>, text));
            }
        }
    }
    
    return requests;
}

/**
 * Check if text contains any MCP-like patterns
 */
export function containsMCPPatterns(text: string): boolean {
    if (!isMCPRelated(text)) return false;
    
    const requests = parseMCPRequests(text);
    return requests.length > 0;
}

/**
 * Parse a single MCP request from JSON string
 */
export function parseMCPRequestFromJSON(json: string): MCPToolRequest | null {
    const parsed = tryParseJSON(json);
    if (!parsed || !isMCPLikeObject(parsed)) return null;
    return parseObjectToMCPRequest(parsed as Record<string, unknown>, json);
}

/**
 * Create an MCP request object directly (for testing/programmatic use)
 */
export function createMCPRequest(
    tool: string,
    server: string,
    input: Record<string, unknown>
): MCPToolRequest {
    return {
        tool,
        server,
        input,
        timestamp: new Date().toISOString()
    };
}

