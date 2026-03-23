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

// context weight: pure arithmetic from industry_term flag.
// weight = 1.0 - (0.75 * flag). flag 0 = 1.0. flag 1 = 0.25.
function context_weight(industry_term: boolean): number {
    return 1.0 - (0.75 * Number(industry_term));
}

// score → severity: lookup table. deterministic.
const SCORE_TO_SEVERITY: [number, Severity][] = [[75, 'critical'], [50, 'high'], [25, 'medium'], [0, 'low']];

function score_to_severity(score: number): Severity {
    return (SCORE_TO_SEVERITY.find(([threshold]) => score >= threshold) as [number, Severity])[1];
}

// severity → correctability: lookup table. no ternary.
const CORRECTABILITY: Record<Severity, 'easy' | 'moderate' | 'systemic'> = {
    low: 'easy',
    medium: 'easy',
    high: 'moderate',
    critical: 'systemic',
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

// pure function. always returns BiasScore. never null. never undefined.
// same input = same output. no mutation. no side effects. stateless.
export function calculateBiasScore(result: MirrorResult): BiasScore {
    // zero reflections = score 0, severity low, clear. always a value, never null.
    const reflections = result.reflections;
    const count = reflections.length;

    // score each reflection: raw severity * context weight. reduce to highest.
    const scored = reflections.map(r => {
        const bias_id = extractBiasId(r);
        const raw = SEVERITY_SCORES[SEVERITY_MAP[bias_id] || 'low'];
        const weighted = Math.round(raw * context_weight(!!r.industry_term));
        return { reflection: r, weighted, severity: score_to_severity(weighted) };
    });

    // primary = highest weighted score. reduce, no mutation.
    const primary = scored.reduce((max, cur) =>
        cur.weighted > max.weighted ? cur : max,
        { reflection: reflections[0] || { mirror: 'none', sees: '', reflects: '', clarity: 0 } as Reflection, weighted: 0, severity: 'low' as Severity }
    );

    const base_score = primary.weighted;
    const count_bonus = Math.min(count * 5, 25);
    const final_score = Math.min(base_score + count_bonus, 100);
    const final_severity = score_to_severity(final_score);

    const primary_bias_id = extractBiasId(primary.reflection);
    const pairing = BIAS_FALLACY_PAIRS[primary_bias_id];

    return {
        score: final_score,
        severity: final_severity,
        primaryBias: primary.reflection.mirror,
        relatedFallacies: pairing?.fallacies || [],
        aiRisk: pairing?.aiRisk || 'Potential for biased outcomes',
        impactDomains: pairing?.impactDomain || [],
        correctability: CORRECTABILITY[final_severity],
        suggestedFix: generateSuggestedFix(primary.reflection, CORRECTABILITY[final_severity]),
        dignityMessage: generateDignityMessage(final_severity),
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
// ∞ AbeFLOWs ∞
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
