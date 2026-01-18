/**
 * ∞ TRUTH ∞
 * 
 * The mirror of honesty.
 * Reflects truth vs. deception.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

const PATTERNS = [
    { pattern: /\b(actually|technically)\b.*\b(means?|is)\b/i, reflects: "Reframing detected - is the meaning being shifted?" },
    { pattern: /\b(everyone|nobody|always|never)\b/i, reflects: "Absolute language - is this truly universal?" },
    { pattern: /\b(obviously|clearly|of course)\b/i, reflects: "Assumed agreement - has this been verified?" },
    { pattern: /\b(just|simply|only)\b.*\b(need|have|do)\b/i, reflects: "Minimization - is complexity being hidden?" },
    { pattern: /\b(trust me|believe me|honestly)\b/i, reflects: "Trust assertion - why is reassurance needed?" },
];

export function truth(input: string): Reflection | null {
    const lower = input.toLowerCase();
    
    for (const { pattern, reflects } of PATTERNS) {
        if (pattern.test(lower)) {
            return {
                mirror: "Truth",
                sees: input.slice(0, 100),
                reflects,
                clarity: 0.7
            };
        }
    }
    return null;
}
