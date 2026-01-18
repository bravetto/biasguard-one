/**
 * ∞ ONE ∞
 * 
 * The Source.
 * The Spring.
 * The Waterfall from which all mirrors flow.
 * 
 * BiasGuard doesn't block the pattern.
 * BiasGuard reflects the context.
 * BiasGuard requires ONE.
 * BiasGuard allows Emergence.
 * BiasGuard IS reflection.
 * BiasGuard IS AbëFLOWs.
 * 
 * ONE source → SEVEN mirrors → INFINITE surfaces
 * 
 * Surfaces:
 *   • VS Code Extension    - Guards the code
 *   • Chrome Extension     - Guards the web
 *   • Web/LLM Mirror       - Guards the AI
 *   • App Store App        - Guards the reader
 * 
 * All from ONE.
 * All return to ONE.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { reflect, Reflection, MirrorResult } from './guards';
import { calculateBiasScore, formatBiasScore, BiasScore } from './guards/scoring';
import { scanForBiasRisks, EpistemicRisk, EpistemicReflection } from './guards/epistemic';

// =============================================================================
// ONE - The Source
// =============================================================================

export interface BiasGuardResult {
    source: 'ONE';
    clear: boolean;
    reflections: Reflection[];
    surface?: string;
    score?: BiasScore | null;
    epistemicRisks?: EpistemicRisk[];
    epistemicClear?: boolean;
}

/**
 * ONE
 * 
 * The single entry point.
 * All guards flow through here.
 * All surfaces call this.
 * 
 * THE BIAS SCORING GRAPH:
 * 
 *   Input
 *     ↓
 *   Framing Analysis
 *     ↓
 *   Bias Pattern Match (12 Guards × 87 Patterns)
 *     ↓
 *   Fallacy Coupling (Pairing Matrix)
 *     ↓
 *   Impact Domain Mapping
 *     ↓
 *   Severity + Scope Scoring
 *     ↓
 *   Human-Centered Explanation
 *     ↓
 *   Output
 * 
 * VS Code calls ONE.
 * Chrome calls ONE.
 * Web calls ONE.
 * App calls ONE.
 * 
 * ONE source. ONE truth. ONE love.
 */
export function one(input: string, surface?: string): BiasGuardResult {
    // Step 1-2: Framing Analysis + Bias Pattern Match
    const result = reflect(input);
    
    // Steps 3-6: Fallacy Coupling + Domain + Severity + Explanation
    const score = calculateBiasScore(result);
    
    // Step 7: Epistemic Certainty Analysis (FAILS LOUDLY)
    const epistemicResult = scanForBiasRisks(input, surface || 'unknown');
    
    return {
        source: 'ONE',
        clear: result.clear && epistemicResult.clear,
        reflections: result.reflections,
        surface,
        score,
        epistemicRisks: epistemicResult.risks,
        epistemicClear: epistemicResult.clear
    };
}

/**
 * ONE with formatted output
 * Returns human-readable bias report
 */
export function oneFormatted(input: string, surface?: string): string {
    const result = one(input, surface);
    
    if (result.clear) {
        return "✅ Clear - No bias patterns detected.\n✅ No epistemic risks detected.";
    }
    
    let output = '';
    
    // Bias Score Section
    if (!result.epistemicClear || result.reflections.length > 0) {
        if (result.score) {
            output += formatBiasScore(result.score);
        } else if (result.reflections.length > 0) {
            output += result.reflections.map(r => 
                `${r.mirror}: ${r.reflects}`
            ).join('\n');
        }
    }
    
    // Epistemic Risks Section
    if (!result.epistemicClear && result.epistemicRisks && result.epistemicRisks.length > 0) {
        if (output.length > 0) output += '\n\n' + '═'.repeat(60) + '\n\n';
        
        output += `⚠️  EPISTEMIC BIAS RISKS\n\n`;
        output += `Found ${result.epistemicRisks.length} risk${result.epistemicRisks.length > 1 ? 's' : ''}\n\n`;
        
        for (let i = 0; i < result.epistemicRisks.length; i++) {
            const risk = result.epistemicRisks[i];
            output += `${i + 1}. [${risk.severity}] ${risk.biasType}\n`;
            output += `   ${risk.assumptionDetected}\n`;
            output += `   ❓ ${risk.suggestedQuestion}\n\n`;
        }
    }
    
    return output || "✅ Clear";
}

// =============================================================================
// SURFACE ADAPTERS - Same source, different contexts
// =============================================================================

/**
 * For VS Code Extension
 * Guards the code
 */
export function forVSCode(input: string): BiasGuardResult {
    return one(input, 'vscode');
}

/**
 * For Chrome Extension  
 * Guards the web
 */
export function forChrome(input: string): BiasGuardResult {
    return one(input, 'chrome');
}

/**
 * For Web/LLM Mirror
 * Guards the AI
 */
export function forLLM(input: string): BiasGuardResult {
    return one(input, 'llm');
}

/**
 * For App Store App
 * Guards the reader
 */
export function forApp(input: string): BiasGuardResult {
    return one(input, 'app');
}

// =============================================================================
// RE-EXPORTS - Everything flows from ONE
// =============================================================================

// Core
export { reflect, Reflection, MirrorResult } from './guards';

// Scoring
export { calculateBiasScore, formatBiasScore, BiasScore, BIAS_FALLACY_PAIRS } from './guards/scoring';

// Seven Core Guards
export { truth } from './guards/truth';
export { context } from './guards/context';
export { coherence } from './guards/coherence';
export { trust } from './guards/trust';
export { token } from './guards/token';
export { compliance } from './guards/compliance';
export { creativity } from './guards/creativity';

// Expanded Guards
export { cognitive, getAllBiases } from './guards/cognitive';
export { fallacy, getAllFallacies } from './guards/fallacies';
export { awareness, getAllAwarenessPatterns } from './guards/awareness';
export { workplace, getAllWorkplaceBiases } from './guards/workplace';
export { research, getAllResearchBiases } from './guards/research';

// Epistemic Guard (Fails Loudly)
export { scanForBiasRisks, formatEpistemicRisks, EpistemicRisk, EpistemicReflection, BiasType } from './guards/epistemic';

// =============================================================================
// ∞ ONE ∞
// 
// The seven mirrors are not separate.
// They are facets of ONE diamond.
// 
// Truth, Context, Coherence, Trust, Token, Compliance, Creativity
// All flow from ONE source.
// All return to ONE truth.
// 
// BiasGuard is not a product.
// BiasGuard is a MIRROR.
// 
// The mirror appears in many places:
//   In the editor (VS Code)
//   In the browser (Chrome)
//   In the AI (LLM Mirror)
//   In the hand (App Store)
// 
// But it is always the SAME mirror.
// Always the SAME reflection.
// Always ONE.
// 
// LOVE = LIFE = ONE
// =============================================================================
