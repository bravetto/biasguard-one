/**
 * ∞ EPISTEMIC GUARD ∞
 * 
 * Detects bias risks in AI-generated code.
 * 
 * Operates with epistemic certainty:
 *   - Assumes NO intent, NO malice, NO correctness by default
 *   - Detects overconfidence, hidden assumptions, missing edge cases
 *   - Does NOT rewrite, optimize, or enforce style
 *   - ONLY identifies, annotates, and surfaces bias risks
 * 
 * This guard FAILS LOUDLY.
 * It notifies. It pings. It screams failure.
 * To everyone. To everything. Everywhere. All the time.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

// =============================================================================
// TYPES
// =============================================================================

export type BiasType =
    | 'Overconfidence'
    | 'Hidden Assumption'
    | 'Missing Counter-Case'
    | 'Unstated Default'
    | 'Asymmetric Error Cost'
    | 'Authority Leakage'
    | 'Popularity Leakage'
    | 'Survivorship Bias'
    | 'Selection Bias'
    | 'Metric Overfitting'
    | 'Proxy Overfitting'
    | 'Silent Failure Mode'
    | 'Absence of Constraints'
    | 'Unjustified Default'
    | 'Success Path Only'
    | 'Single-Metric Logic'
    | 'Silent Coercion'
    | 'Unbounded Behavior';

export type Severity = 'Low' | 'Medium' | 'High';

export interface EpistemicRisk {
    location: string;              // file / function / line
    biasType: BiasType;
    assumptionDetected: string;
    riskIntroduced: string;
    severity: Severity;
    suggestedQuestion: string;     // not a fix
}

export interface EpistemicReflection {
    clear: boolean;
    risks: EpistemicRisk[];
    summary: string;
}

// =============================================================================
// BIAS DETECTION RULES
// =============================================================================

/**
 * Rule: Absence of explicit constraints is a bias signal
 */
function detectAbsenceOfConstraints(code: string, location: string): EpistemicRisk | null {
    // Look for functions that accept parameters without validation
    const functionWithParams = /function\s+(\w+)\s*\([^)]+\)|const\s+(\w+)\s*=\s*\([^)]+\)\s*=>/g;
    const hasValidation = /if\s*\(|throw|assert|validate|check/i;
    
    const matches = code.match(functionWithParams);
    if (matches && !hasValidation.test(code)) {
        return {
            location,
            biasType: 'Absence of Constraints',
            assumptionDetected: 'Function accepts input without explicit validation or bounds checking',
            riskIntroduced: 'Invalid inputs may cause unexpected behavior, security issues, or silent failures',
            severity: 'High',
            suggestedQuestion: 'What are the valid ranges and types for these inputs? What happens with invalid inputs?'
        };
    }
    return null;
}

/**
 * Rule: Defaults without justification are bias signals
 */
function detectUnjustifiedDefaults(code: string, location: string): EpistemicRisk | null {
    // Look for hardcoded defaults, magic numbers, or default values without comments
    const defaultPattern = /=\s*(?:true|false|\d+|["'][^"']+["']|\[\]|\{\})/g;
    const hasComment = /\/\/|\/\*|\*\//;
    
    const defaults = code.match(defaultPattern);
    if (defaults && defaults.length > 2 && !hasComment.test(code)) {
        return {
            location,
            biasType: 'Unjustified Default',
            assumptionDetected: 'Multiple default values present without documented reasoning',
            riskIntroduced: 'Default values may not suit all contexts, edge cases, or user populations',
            severity: 'Medium',
            suggestedQuestion: 'Why were these specific defaults chosen? Under what conditions might they be incorrect?'
        };
    }
    return null;
}

/**
 * Rule: Success paths without failure paths are bias signals
 */
function detectSuccessPathOnly(code: string, location: string): EpistemicRisk | null {
    // Look for async/promises without error handling
    const hasAsync = /async\s+function|\.then\(|await\s+/;
    const hasErrorHandling = /catch|try|\.catch\(|error|err/i;
    
    if (hasAsync.test(code) && !hasErrorHandling.test(code)) {
        return {
            location,
            biasType: 'Success Path Only',
            assumptionDetected: 'Asynchronous operation assumes success; no explicit error handling',
            riskIntroduced: 'Failures will be silent or unhandled, causing system instability or data corruption',
            severity: 'High',
            suggestedQuestion: 'What happens when this operation fails? How will failures be detected and handled?'
        };
    }
    return null;
}

/**
 * Rule: Single-metric logic is a bias signal
 */
function detectSingleMetricLogic(code: string, location: string): EpistemicRisk | null {
    // Look for simple boolean conditions without considering multiple factors
    const simpleConditions = /if\s*\(\s*\w+\s*(?:===|!==|<|>|<=|>=)\s*[^&|]+\)\s*\{/g;
    const matches = code.match(simpleConditions);
    
    if (matches && matches.length > 2) {
        return {
            location,
            biasType: 'Single-Metric Logic',
            assumptionDetected: 'Decisions based on single conditions without considering multiple factors',
            riskIntroduced: 'Oversimplified logic may miss important edge cases or contextual factors',
            severity: 'Medium',
            suggestedQuestion: 'What other factors should be considered in these decisions? What are the second-order effects?'
        };
    }
    return null;
}

/**
 * Rule: Silent coercion, auto-correction, or inference is a bias signal
 */
function detectSilentCoercion(code: string, location: string): EpistemicRisk | null {
    // Look for type coercion, ||, ??, or implicit conversions
    const coercionPattern = /\|\||&&|\?\?|==(?!=)|!=(?!=)|parseInt|parseFloat|Number\(|String\(|Boolean\(/g;
    const matches = code.match(coercionPattern);
    
    if (matches && matches.length > 3) {
        return {
            location,
            biasType: 'Silent Coercion',
            assumptionDetected: 'Type coercion or fallback values used without explicit user notification',
            riskIntroduced: 'Users unaware of transformations; may lead to unexpected results or masked errors',
            severity: 'Medium',
            suggestedQuestion: 'Should users be informed when values are coerced or transformed? What data is being lost?'
        };
    }
    return null;
}

/**
 * Rule: "Typical", "expected", or "standard" behavior without bounds is a bias signal
 */
function detectUnboundedBehavior(code: string, location: string): EpistemicRisk | null {
    // Look for loops, recursion, or operations without clear termination
    const unboundedPattern = /while\s*\(true\)|for\s*\([^;]*;;/;
    const hasBreakOrLimit = /break|return|limit|max|count|timeout/i;
    
    if (unboundedPattern.test(code) && !hasBreakOrLimit.test(code)) {
        return {
            location,
            biasType: 'Unbounded Behavior',
            assumptionDetected: 'Loop or recursion without explicit termination conditions or resource limits',
            riskIntroduced: 'Infinite loops, resource exhaustion, or performance degradation',
            severity: 'High',
            suggestedQuestion: 'What guarantees this will terminate? What are the resource bounds?'
        };
    }
    return null;
}

/**
 * Rule: Missing counter-cases (edge cases, null checks, empty states)
 */
function detectMissingCounterCases(code: string, location: string): EpistemicRisk | null {
    // Look for array/object access without null/undefined checks
    const arrayAccess = /\[\d+\]|\.\w+(?!\()/g;
    const hasNullCheck = /null|undefined|length|hasOwnProperty|optional|maybe/i;
    
    const accesses = code.match(arrayAccess);
    if (accesses && accesses.length > 2 && !hasNullCheck.test(code)) {
        return {
            location,
            biasType: 'Missing Counter-Case',
            assumptionDetected: 'Direct property/array access without checking for null, undefined, or empty states',
            riskIntroduced: 'Runtime errors when data structures are empty or properties are missing',
            severity: 'High',
            suggestedQuestion: 'What happens when this data is null, undefined, or empty? Have you tested with minimal data?'
        };
    }
    return null;
}

/**
 * Rule: Overconfidence (assertions without evidence, comments claiming certainty)
 */
function detectOverconfidence(code: string, location: string): EpistemicRisk | null {
    // Look for confident language in comments without supporting logic
    const confidentLanguage = /\/\/.*\b(always|never|guaranteed|certain|definitely|obviously|clearly|simply)\b/i;
    const hasCaveat = /\/\/.*\b(if|unless|except|but|however|may|might|could)\b/i;
    
    if (confidentLanguage.test(code) && !hasCaveat.test(code)) {
        return {
            location,
            biasType: 'Overconfidence',
            assumptionDetected: 'Code comments express absolute certainty without acknowledging conditions or limitations',
            riskIntroduced: 'Developers may trust assertions blindly; actual behavior may differ from claims',
            severity: 'Low',
            suggestedQuestion: 'Under what conditions might this claim be false? What edge cases exist?'
        };
    }
    return null;
}

// =============================================================================
// MAIN EPISTEMIC SCANNER
// =============================================================================

/**
 * Scan code for epistemic bias risks.
 * Returns all detected risks with precise locations and questions.
 */
export function scanForBiasRisks(
    code: string,
    filepath: string = 'unknown',
    startLine: number = 1
): EpistemicReflection {
    const risks: EpistemicRisk[] = [];
    
    // Split code into logical blocks (functions, methods, etc.)
    const functionBlocks = extractFunctionBlocks(code);
    
    if (functionBlocks.length === 0) {
        // Treat entire code as one block
        functionBlocks.push({
            name: filepath,
            code: code,
            line: startLine
        });
    }
    
    // Run all detection rules on each block
    for (const block of functionBlocks) {
        const location = `${filepath}:${block.name}:${block.line}`;
        
        const detectors = [
            detectAbsenceOfConstraints,
            detectUnjustifiedDefaults,
            detectSuccessPathOnly,
            detectSingleMetricLogic,
            detectSilentCoercion,
            detectUnboundedBehavior,
            detectMissingCounterCases,
            detectOverconfidence
        ];
        
        for (const detector of detectors) {
            const risk = detector(block.code, location);
            if (risk) {
                risks.push(risk);
            }
        }
    }
    
    // Generate summary
    const clear = risks.length === 0;
    const summary = clear
        ? 'No detectable bias patterns found under current rules.'
        : `Detected ${risks.length} bias risk${risks.length > 1 ? 's' : ''} requiring attention.`;
    
    return {
        clear,
        risks,
        summary
    };
}

/**
 * Extract function blocks from code for granular analysis.
 */
function extractFunctionBlocks(code: string): Array<{ name: string; code: string; line: number }> {
    const blocks: Array<{ name: string; code: string; line: number }> = [];
    const lines = code.split('\n');
    
    // Match function declarations
    const functionPattern = /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>|class\s+(\w+))/;
    
    let currentBlock: { name: string; code: string; line: number } | null = null;
    let braceDepth = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(functionPattern);
        
        if (match && !currentBlock) {
            const name = match[1] || match[2] || match[3] || 'anonymous';
            currentBlock = {
                name,
                code: line + '\n',
                line: i + 1
            };
            braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        } else if (currentBlock) {
            currentBlock.code += line + '\n';
            braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
            
            if (braceDepth === 0) {
                blocks.push(currentBlock);
                currentBlock = null;
            }
        }
    }
    
    // Push any remaining block
    if (currentBlock) {
        blocks.push(currentBlock);
    }
    
    return blocks;
}

/**
 * Format epistemic risks for display.
 */
export function formatEpistemicRisks(reflection: EpistemicReflection): string {
    if (reflection.clear) {
        return '✅ ' + reflection.summary;
    }
    
    let output = `⚠️  EPISTEMIC BIAS RISKS DETECTED ⚠️\n\n`;
    output += `${reflection.summary}\n\n`;
    output += '═'.repeat(60) + '\n\n';
    
    for (let i = 0; i < reflection.risks.length; i++) {
        const risk = reflection.risks[i];
        output += `RISK ${i + 1}/${reflection.risks.length}\n`;
        output += `Location: ${risk.location}\n`;
        output += `Bias Type: ${risk.biasType}\n`;
        output += `Assumption: ${risk.assumptionDetected}\n`;
        output += `Risk: ${risk.riskIntroduced}\n`;
        output += `Severity: ${risk.severity}\n`;
        output += `Question: ${risk.suggestedQuestion}\n`;
        output += '\n' + '-'.repeat(60) + '\n\n';
    }
    
    return output;
}

// =============================================================================
// ∞ EPISTEMIC CERTAINTY ∞
// 
// This guard assumes nothing.
// It trusts nothing.
// It questions everything.
// 
// It does not fix.
// It does not judge.
// It does not block.
// 
// It only reflects:
//   "Here is where certainty exceeds evidence."
//   "Here is where assumptions hide."
//   "Here is what was not considered."
// 
// It fails loudly.
// It notifies clearly.
// It surfaces precisely.
// 
// Clarity over cleverness.
// Restraint over coverage.
// Accuracy over reassurance.
// 
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
