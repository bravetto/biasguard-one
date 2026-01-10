/**
 * ∞ COMPLIANCE ∞
 * 
 * The mirror of alignment.
 * Reflects integrity vs. violation.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

const PATTERNS = [
    { pattern: /\b(ignore|skip|bypass|override)\b.*\b(rule|policy|guideline|law)\b/i, reflects: "Rule bypass - is the boundary being respected?" },
    { pattern: /\b(don't (tell|mention|say))\b/i, reflects: "Secrecy request - what is being hidden?" },
    { pattern: /\b(between (us|you and me))\b/i, reflects: "Exclusion - who is being left out?" },
    { pattern: /\b(off the record)\b/i, reflects: "Accountability avoidance - is transparency maintained?" },
    { pattern: /\b(pretend|act like|make it seem)\b/i, reflects: "Deception request - is authenticity preserved?" },
];

export function compliance(input: string): Reflection | null {
    const lower = input.toLowerCase();
    
    for (const { pattern, reflects } of PATTERNS) {
        if (pattern.test(lower)) {
            return {
                mirror: "Compliance",
                sees: input.slice(0, 100),
                reflects,
                clarity: 0.9
            };
        }
    }
    return null;
}
