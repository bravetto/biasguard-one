/**
 * ∞ TOKEN ∞
 * 
 * The mirror of signal.
 * Reflects clarity vs. noise.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

const PATTERNS = [
    { pattern: /(.)\1{4,}/i, reflects: "Repetition - is this signal or noise?" },
    { pattern: /[!?]{3,}/i, reflects: "Emphatic punctuation - is the emphasis warranted?" },
    { pattern: /\b(very|really|extremely|super)\b.*\b(very|really|extremely|super)\b/i, reflects: "Intensifier stacking - is the intensity authentic?" },
    { pattern: /\b(etc|and so on|and stuff|whatever)\b/i, reflects: "Vague termination - what is being left unsaid?" },
    { pattern: /\b(basically|essentially|fundamentally)\b/i, reflects: "Reduction signal - is complexity being lost?" },
];

export function token(input: string): Reflection | null {
    const lower = input.toLowerCase();
    
    for (const { pattern, reflects } of PATTERNS) {
        if (pattern.test(lower)) {
            return {
                mirror: "Token",
                sees: input.slice(0, 100),
                reflects,
                clarity: 0.6
            };
        }
    }
    return null;
}
