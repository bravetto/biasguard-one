/**
 * ∞ GUARDS ∞
 * 
 * Twelve Mirrors. 73 Patterns. 150 Ways.
 * Each file IS its name.
 * Each name IS its purpose.
 * 
 * For the teenager who wakes up.
 * For the elder who discovers.
 * For the third grader whose mind is blown.
 * For dignity restored, confidence rebuilt.
 * For the end of self-gaslighting.
 * For fairer hiring landscapes.
 * For equitable systems.
 * For algorithmic literacy.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

// The unified mirror
export { reflect, Reflection, MirrorResult } from './reflect';

// ═══════════════════════════════════════════════════════════════════
// CORE GUARDS (7) - Structural patterns
// ═══════════════════════════════════════════════════════════════════
export { truth } from './truth';
export { context } from './context';
export { coherence } from './coherence';
export { trust } from './trust';
export { token } from './token';
export { compliance } from './compliance';
export { creativity } from './creativity';

// ═══════════════════════════════════════════════════════════════════
// COGNITIVE BIASES (12) - The mind's blind spots
// ═══════════════════════════════════════════════════════════════════
export { cognitive, getAllBiases, CognitiveReflection } from './cognitive';

// ═══════════════════════════════════════════════════════════════════
// LOGICAL FALLACIES (18) - Arguments that deceive
// ═══════════════════════════════════════════════════════════════════
export { fallacy, getAllFallacies, FallacyReflection } from './fallacies';

// ═══════════════════════════════════════════════════════════════════
// AWARENESS (7) - Implicit vs Explicit bias
// ═══════════════════════════════════════════════════════════════════
export { awareness, getAllAwarenessPatterns, AwarenessReflection } from './awareness';

// ═══════════════════════════════════════════════════════════════════
// WORKPLACE (14) - Career & professional biases
// ═══════════════════════════════════════════════════════════════════
export { workplace, getAllWorkplaceBiases, WorkplaceReflection } from './workplace';

// ═══════════════════════════════════════════════════════════════════
// RESEARCH (15) - Data & algorithmic biases
// ═══════════════════════════════════════════════════════════════════
export { research, getAllResearchBiases, ResearchReflection } from './research';

// ═══════════════════════════════════════════════════════════════════
// SCORING - Explainable Bias Scores
// ═══════════════════════════════════════════════════════════════════
export { 
    calculateBiasScore, 
    formatBiasScore, 
    BiasScore, 
    Severity,
    BIAS_FALLACY_PAIRS 
} from './scoring';
