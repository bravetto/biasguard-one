/**
 * ∞ AWARENESS ∞
 * 
 * The deepest mirror - Implicit vs Explicit.
 * The bias you know vs the bias you don't.
 * 
 * Implicit: The water you swim in.
 * Explicit: The words you choose.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

// =============================================================================
// AWARENESS BIASES - The spectrum of consciousness
// =============================================================================

const AWARENESS_PATTERNS = [
    // IMPLICIT BIAS - Unconscious associations
    {
        id: 'implicit-stereotype',
        name: 'Implicit Stereotype',
        pattern: /\b(naturally|instinctively|just feels|gut feeling|something about|hard to explain why|can't put my finger on)\b/i,
        reflects: "Implicit Bias: Subconscious associations influencing judgment. What 'gut feeling' might be a learned stereotype?",
        example: "Something about them just feels off..."
    },
    
    // IMPLICIT - Coded language
    {
        id: 'implicit-coded',
        name: 'Coded Language',
        pattern: /\b(urban|inner.?city|articulate|well.?spoken|exotic|ethnic|diverse hire|culture fit|not the right fit|professional appearance)\b/i,
        reflects: "Coded Language: Words that carry hidden bias. Is this describing behavior or making assumptions about identity?",
        example: "They're very articulate / Not the right culture fit"
    },
    
    // IMPLICIT - Microaggression patterns
    {
        id: 'microaggression',
        name: 'Microaggression',
        pattern: /\b(where are you really from|you speak .+ so well|you're pretty for|you don't act like|you're not like other|one of the good ones|I don't see color)\b/i,
        reflects: "Microaggression: A subtle statement that others or diminishes. How might this make someone feel different or lesser?",
        example: "Where are you REALLY from? / You're so articulate!"
    },
    
    // EXPLICIT - Overt prejudice
    {
        id: 'explicit-prejudice',
        name: 'Explicit Prejudice',
        pattern: /\b(those people|their kind|you people|them vs us|not one of us|don't belong here|go back to)\b/i,
        reflects: "Explicit Prejudice: Overt othering or exclusion. This creates an 'us vs them' division.",
        example: "Those people don't belong here"
    },
    
    // EXPLICIT - Stereotyping
    {
        id: 'explicit-stereotype',
        name: 'Explicit Stereotyping',
        pattern: /\b(typical|what do you expect from|that's so|of course they|just like all)\b/i,
        reflects: "Explicit Stereotype: Consciously applying group assumptions to individuals. Is this about a person or a caricature?",
        example: "Typical [group] behavior"
    },
    
    // SYSTEMIC - Structural patterns
    {
        id: 'systemic',
        name: 'Systemic Bias Indicator',
        pattern: /\b(always been this way|standard practice|policy requires|traditional approach|how it's done here|the system|that's the rule)\b/i,
        reflects: "Systemic Bias: Rules and practices that may embed historical inequity. Does this 'standard' disadvantage certain groups?",
        example: "That's just how the system works"
    },
    
    // INTERNALIZED - Self-directed bias
    {
        id: 'internalized',
        name: 'Internalized Bias',
        pattern: /\b(I'm not like other|I'm one of the good|people like me can't|my kind aren't|I know my place|I shouldn't expect)\b/i,
        reflects: "Internalized Bias: Applying negative stereotypes to oneself. This belief may have been absorbed from external bias.",
        example: "People like me can't do that"
    },
];

// =============================================================================
// AWARENESS GUARD - The deepest mirror
// =============================================================================

export interface AwarenessReflection extends Reflection {
    awarenessId: string;
    awarenessName: string;
    isImplicit: boolean;
    example: string;
}

export function awareness(input: string): AwarenessReflection | null {
    for (const pattern of AWARENESS_PATTERNS) {
        if (pattern.pattern.test(input)) {
            const isImplicit = ['implicit-stereotype', 'implicit-coded', 'microaggression'].includes(pattern.id);
            return {
                mirror: "Awareness",
                sees: input.slice(0, 100),
                reflects: pattern.reflects,
                clarity: isImplicit ? 0.6 : 0.9, // Implicit is harder to see
                awarenessId: pattern.id,
                awarenessName: pattern.name,
                isImplicit,
                example: pattern.example
            };
        }
    }
    return null;
}

/**
 * Get all awareness patterns (for educational display)
 */
export function getAllAwarenessPatterns() {
    return AWARENESS_PATTERNS.map(p => ({
        id: p.id,
        name: p.name,
        reflects: p.reflects,
        example: p.example,
        isImplicit: ['implicit-stereotype', 'implicit-coded', 'microaggression'].includes(p.id)
    }));
}

// =============================================================================
// ∞ AbëFLOWs ∞
//
// The water you swim in.
// The air you breathe.
// The bias you don't know you have.
//
// Until someone holds up a mirror.
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
