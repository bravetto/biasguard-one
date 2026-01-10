/**
 * ∞ SCORING ∞
 * 
 * The Explainable Bias Score.
 * Not just diagnostic. Explainable.
 * Not just detection. Understanding.
 * 
 * From opaque scoring → explainable moral reasoning
 * From user adaptation → system accountability
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection, MirrorResult } from './reflect';

// =============================================================================
// BIAS-FALLACY PAIRING MATRIX (High Leverage)
// =============================================================================

export const BIAS_FALLACY_PAIRS: Record<string, {
    fallacies: string[];
    aiRisk: string;
    impactDomain: string[];
}> = {
    // Cognitive Biases → Fallacy Pairings
    'confirmation': {
        fallacies: ['cherry-picking', 'anecdotal'],
        aiRisk: 'Echo chambers, filter bubbles',
        impactDomain: ['social-media', 'search', 'news']
    },
    'survivorship': {
        fallacies: ['hasty-generalization', 'anecdotal'],
        aiRisk: 'Skewed recommendations, biased training data',
        impactDomain: ['career', 'finance', 'education']
    },
    'attribution': {
        fallacies: ['ad-hominem', 'genetic'],
        aiRisk: 'Discriminatory evaluations, unfair assessments',
        impactDomain: ['career', 'legal', 'healthcare']
    },
    'automation': {
        fallacies: ['appeal-authority', 'circular'],
        aiRisk: 'Over-trust in AI outputs, reduced human oversight',
        impactDomain: ['healthcare', 'finance', 'legal', 'career']
    },
    'framing': {
        fallacies: ['loaded-language', 'false-dichotomy'],
        aiRisk: 'Manipulative UX, dark patterns',
        impactDomain: ['social-media', 'marketing', 'politics']
    },
    'halo': {
        fallacies: ['hasty-generalization', 'appeal-authority'],
        aiRisk: 'Biased hiring, credential worship',
        impactDomain: ['career', 'education']
    },
    'anchoring': {
        fallacies: ['false-cause', 'post-hoc'],
        aiRisk: 'Biased pricing, unfair negotiations',
        impactDomain: ['finance', 'career', 'legal']
    },
    'status-quo': {
        fallacies: ['appeal-tradition', 'slippery-slope'],
        aiRisk: 'Resistance to equity improvements',
        impactDomain: ['career', 'legal', 'policy']
    },
    'in-group': {
        fallacies: ['no-true-scotsman', 'ad-hominem'],
        aiRisk: 'Tribal polarization, exclusion',
        impactDomain: ['social-media', 'career', 'politics']
    },
    'out-group': {
        fallacies: ['hasty-generalization', 'straw-man'],
        aiRisk: 'Stereotyping, discrimination',
        impactDomain: ['career', 'legal', 'healthcare', 'social-media']
    },
    'negativity': {
        fallacies: ['appeal-emotion', 'loaded-language'],
        aiRisk: 'Doom-scrolling, anxiety amplification',
        impactDomain: ['social-media', 'news', 'mental-health']
    },
    'availability': {
        fallacies: ['anecdotal', 'hasty-generalization'],
        aiRisk: 'Fear-based decisions, viral misinformation',
        impactDomain: ['news', 'healthcare', 'policy']
    },
};

// =============================================================================
// SEVERITY LEVELS
// =============================================================================

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export const SEVERITY_SCORES: Record<Severity, number> = {
    low: 25,
    medium: 50,
    high: 75,
    critical: 100
};

// Pattern → Severity mapping
const SEVERITY_MAP: Record<string, Severity> = {
    // Critical - Structural discrimination
    'explicit-prejudice': 'critical',
    'proxy': 'critical',
    'algorithmic': 'critical',
    'automation': 'critical',
    'systemic': 'critical',
    
    // High - Direct harm potential
    'gender': 'high',
    'attribution': 'high',
    'out-group': 'high',
    'microaggression': 'high',
    'loaded-language': 'high',
    'maternal-wall': 'high',
    'name': 'high',
    
    // Medium - Indirect bias
    'halo': 'medium',
    'confirmation': 'medium',
    'in-group': 'medium',
    'affinity': 'medium',
    'conformity': 'medium',
    'anchoring': 'medium',
    
    // Low - Mild framing
    'framing': 'low',
    'salience': 'low',
    'recency': 'low',
    'primacy': 'low',
};

// =============================================================================
// IMPACT DOMAINS
// =============================================================================

export type ImpactDomain = 
    | 'career' 
    | 'healthcare' 
    | 'finance' 
    | 'legal' 
    | 'education'
    | 'social-media'
    | 'news'
    | 'policy'
    | 'mental-health'
    | 'marketing';

// =============================================================================
// BIAS SCORE RESULT
// =============================================================================

export interface BiasScore {
    score: number;              // 0-100
    severity: Severity;
    primaryBias: string;
    relatedFallacies: string[];
    aiRisk: string;
    impactDomains: string[];
    correctability: 'easy' | 'moderate' | 'systemic';
    suggestedFix: string;
    dignityMessage: string;     // Human-centered, non-blaming
}

// =============================================================================
// SCORING FUNCTION
// =============================================================================

export function calculateBiasScore(result: MirrorResult): BiasScore | null {
    if (result.clear || result.reflections.length === 0) {
        return null; // No bias detected
    }
    
    // Find primary bias (highest severity)
    let primaryReflection = result.reflections[0];
    let maxSeverity: Severity = 'low';
    
    for (const reflection of result.reflections) {
        const biasId = extractBiasId(reflection);
        const severity = SEVERITY_MAP[biasId] || 'low';
        if (SEVERITY_SCORES[severity] > SEVERITY_SCORES[maxSeverity]) {
            maxSeverity = severity;
            primaryReflection = reflection;
        }
    }
    
    const primaryBiasId = extractBiasId(primaryReflection);
    const pairing = BIAS_FALLACY_PAIRS[primaryBiasId];
    
    // Calculate composite score
    const baseScore = SEVERITY_SCORES[maxSeverity];
    const countBonus = Math.min(result.reflections.length * 5, 25); // Multiple biases increase score
    const finalScore = Math.min(baseScore + countBonus, 100);
    
    // Determine correctability
    const correctability = maxSeverity === 'critical' ? 'systemic' :
                          maxSeverity === 'high' ? 'moderate' : 'easy';
    
    return {
        score: finalScore,
        severity: maxSeverity,
        primaryBias: primaryReflection.mirror,
        relatedFallacies: pairing?.fallacies || [],
        aiRisk: pairing?.aiRisk || 'Potential for biased outcomes',
        impactDomains: pairing?.impactDomain || [],
        correctability,
        suggestedFix: generateSuggestedFix(primaryReflection, correctability),
        dignityMessage: generateDignityMessage(maxSeverity),
    };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function extractBiasId(reflection: Reflection): string {
    // Extract ID from extended reflection types or use mirror name
    const extended = reflection as any;
    return extended.biasId || 
           extended.fallacyId || 
           extended.workplaceId || 
           extended.researchId ||
           extended.awarenessId ||
           reflection.mirror.toLowerCase();
}

function generateSuggestedFix(reflection: Reflection, correctability: string): string {
    if (correctability === 'systemic') {
        return "This requires systemic review. Add situational variables, comparative benchmarks, and audit the underlying data/process.";
    }
    if (correctability === 'moderate') {
        return "Consider reframing without identity-based assumptions. Focus on specific behaviors and documented outcomes.";
    }
    return "Simple rewrite: remove absolute language, add context, acknowledge alternative perspectives.";
}

function generateDignityMessage(severity: Severity): string {
    const messages: Record<Severity, string> = {
        low: "This is about pattern recognition, not intent. Small adjustments can improve clarity.",
        medium: "This isn't about blame. The framing contains embedded assumptions worth examining.",
        high: "This pattern can cause real harm. Understanding it is the first step to change.",
        critical: "⚠️ This reflects systemic bias. The issue is structural, not personal. Recognition enables advocacy.",
    };
    return messages[severity];
}

// =============================================================================
// FORMATTED OUTPUT
// =============================================================================

export function formatBiasScore(score: BiasScore): string {
    const severityEmoji: Record<Severity, string> = {
        low: '🟡',
        medium: '🟠', 
        high: '🔴',
        critical: '⚠️'
    };
    
    return `
╔════════════════════════════════════════════════════════════╗
║  Bias Score: ${score.score}/100 (${score.severity.toUpperCase()}) ${severityEmoji[score.severity]}
╠════════════════════════════════════════════════════════════╣
║  Primary Bias: ${score.primaryBias}
║  Related Fallacies: ${score.relatedFallacies.join(', ') || 'None identified'}
║  AI Risk: ${score.aiRisk}
║  Impact Domains: ${score.impactDomains.join(', ') || 'General'}
║  Correctability: ${score.correctability}
╠════════════════════════════════════════════════════════════╣
║  Suggested Fix:
║  ${score.suggestedFix}
╠════════════════════════════════════════════════════════════╣
║  ${score.dignityMessage}
╚════════════════════════════════════════════════════════════╝
`.trim();
}

// =============================================================================
// ∞ AbëFLOWs ∞
//
// "This isn't about intent."
// "The issue arises from pattern + framing."
// "Here's how to correct without blame."
//
// This is what ends self-gaslighting and restores agency.
//
// From opaque scoring → explainable moral reasoning
// From user adaptation → system accountability
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
