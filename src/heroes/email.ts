/**
 * ∞ HERO USE CASE: Career-Limiting Emails ∞
 * 
 * The ONE hero use case for MVP.
 * 
 * Why this domain:
 * • Bias is common
 * • Stakes are high
 * • Users already feel the harm
 * • Immediate value
 * • Universal applicability
 * 
 * THE REWRITE LOOP:
 * Original → Detection → Explanation → Suggested Rewrite → Re-Score
 * 
 * If the system cannot:
 *   detect → explain → improve → verify improvement
 * ...it is not a mirror. It is commentary.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { one, BiasGuardResult } from '../one';
import { BiasScore } from '../guards/scoring';
import { getBias, BiasEntry } from '../ontology/biases';

// =============================================================================
// TYPES
// =============================================================================

export interface EmailAnalysis {
    original: string;
    detected: boolean;
    
    // The 3 questions every score must answer:
    whatWasDetected: string[];      // 1. What pattern was detected?
    whyItMatters: string[];         // 2. Why does it matter?
    howToFix: string[];             // 3. What would fix it?
    
    suggestedRewrite: string;
    rewriteScore: BiasGuardResult | null;
    improvement: number;            // Score delta (positive = better)
    
    dignityMessage: string;
}

// =============================================================================
// THE REWRITE LOOP
// =============================================================================

/**
 * Analyze an email for career-limiting bias patterns
 * and generate a suggested rewrite.
 * 
 * THE LOOP:
 * Original → Detection → Explanation → Suggested Rewrite → Re-Score
 */
export function analyzeEmail(email: string): EmailAnalysis {
    // Step 1: Detect
    const originalResult = one(email, 'email');
    
    if (originalResult.clear) {
        return {
            original: email,
            detected: false,
            whatWasDetected: [],
            whyItMatters: [],
            howToFix: [],
            suggestedRewrite: email,
            rewriteScore: null,
            improvement: 0,
            dignityMessage: '✅ No concerning patterns detected.'
        };
    }
    
    // Step 2: Explain (The 3 Questions)
    const whatWasDetected: string[] = [];
    const whyItMatters: string[] = [];
    const howToFix: string[] = [];
    
    for (const reflection of originalResult.reflections) {
        // What was detected?
        whatWasDetected.push(`${reflection.mirror}: ${reflection.sees.slice(0, 50)}...`);
        
        // Why it matters
        whyItMatters.push(reflection.reflects);
        
        // How to fix (from ontology if available)
        const biasId = extractBiasId(reflection);
        const ontologyEntry = getBias(biasId);
        if (ontologyEntry) {
            howToFix.push(...ontologyEntry.suggested_corrections.slice(0, 2));
        }
    }
    
    // Step 3: Generate Rewrite
    const suggestedRewrite = generateRewrite(email, originalResult);
    
    // Step 4: Re-Score
    const rewriteResult = one(suggestedRewrite, 'email');
    
    // Step 5: Calculate Improvement
    const originalScore = originalResult.score?.score || 0;
    const rewriteScore = rewriteResult.score?.score || 0;
    const improvement = originalScore - rewriteScore;
    
    // Dignity message
    const dignityMessage = originalResult.score?.dignityMessage || 
        'This does not mean intent. It means the pattern tends to produce harm.';
    
    return {
        original: email,
        detected: true,
        whatWasDetected,
        whyItMatters,
        howToFix: [...new Set(howToFix)], // Deduplicate
        suggestedRewrite,
        rewriteScore: rewriteResult,
        improvement,
        dignityMessage
    };
}

// =============================================================================
// REWRITE GENERATOR
// =============================================================================

function generateRewrite(original: string, result: BiasGuardResult): string {
    let rewrite = original;
    
    for (const reflection of result.reflections) {
        const biasId = extractBiasId(reflection);
        
        // Apply specific rewrites based on bias type
        switch (biasId) {
            case 'attribution':
                // "he is lazy" → "the deadline was missed"
                rewrite = rewrite.replace(
                    /\b(he|she|they)\s+(is|are)\s+(lazy|incompetent|stupid|careless)/gi,
                    'the deadline was missed'
                );
                break;
                
            case 'loaded-language':
                // Remove inflammatory language
                rewrite = rewrite.replace(
                    /\b(radical|extremist|ridiculous|absurd|idiotic)\b/gi,
                    'concerning'
                );
                break;
                
            case 'gender':
                // Remove gendered assumptions
                rewrite = rewrite.replace(
                    /\bfor a (woman|man|girl|boy)\b/gi,
                    ''
                );
                break;
                
            case 'out-group':
                // "those people" → "the team members"
                rewrite = rewrite.replace(
                    /\b(those people|them|they all)\b/gi,
                    'the team members'
                );
                break;
                
            case 'halo':
            case 'halo-workplace':
                // Remove credential worship
                rewrite = rewrite.replace(
                    /\bwent to (Harvard|Stanford|Yale|MIT)\b/gi,
                    'has relevant experience'
                );
                break;
                
            default:
                // Generic: soften absolutes
                rewrite = rewrite.replace(/\balways\b/gi, 'often');
                rewrite = rewrite.replace(/\bnever\b/gi, 'rarely');
                rewrite = rewrite.replace(/\beveryone knows\b/gi, 'it appears that');
        }
    }
    
    return rewrite;
}

// =============================================================================
// HELPER
// =============================================================================

function extractBiasId(reflection: any): string {
    return reflection.biasId || 
           reflection.fallacyId || 
           reflection.workplaceId || 
           reflection.researchId ||
           reflection.awarenessId ||
           reflection.mirror?.toLowerCase() || 
           'unknown';
}

// =============================================================================
// FORMATTED OUTPUT
// =============================================================================

export function formatEmailAnalysis(analysis: EmailAnalysis): string {
    if (!analysis.detected) {
        return `
╔════════════════════════════════════════════════════════════════════════╗
║  ✅ EMAIL CLEAR                                                        ║
╠════════════════════════════════════════════════════════════════════════╣
║  No career-limiting patterns detected.                                 ║
║  Safe to send.                                                         ║
╚════════════════════════════════════════════════════════════════════════╝
`.trim();
    }
    
    const improvementEmoji = analysis.improvement > 0 ? '📈' : '➖';
    
    return `
╔════════════════════════════════════════════════════════════════════════╗
║  ⚠️ CAREER-LIMITING PATTERNS DETECTED                                 ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  1. WHAT WAS DETECTED?                                                 ║
${analysis.whatWasDetected.map(w => `║     • ${w.slice(0, 60)}`).join('\n')}
║                                                                        ║
║  2. WHY DOES IT MATTER?                                                ║
${analysis.whyItMatters.slice(0, 2).map(w => `║     • ${w.slice(0, 60)}...`).join('\n')}
║                                                                        ║
║  3. HOW TO FIX IT?                                                     ║
${analysis.howToFix.slice(0, 3).map(h => `║     • ${h.slice(0, 60)}`).join('\n')}
║                                                                        ║
╠════════════════════════════════════════════════════════════════════════╣
║  SUGGESTED REWRITE:                                                    ║
║  "${analysis.suggestedRewrite.slice(0, 65)}..."
║                                                                        ║
║  Improvement: ${improvementEmoji} ${analysis.improvement} points
║                                                                        ║
╠════════════════════════════════════════════════════════════════════════╣
║  ${analysis.dignityMessage.slice(0, 68)}
╚════════════════════════════════════════════════════════════════════════╝
`.trim();
}

// =============================================================================
// ∞ AbëFLOWs ∞
//
// THE REWRITE LOOP:
// Original → Detection → Explanation → Suggested Rewrite → Re-Score
//
// If the system cannot:
//   detect → explain → improve → verify improvement
// ...it is not a mirror. It is commentary.
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
