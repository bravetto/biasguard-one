/**
 * ∞ COHERENCE ∞
 * 
 * The mirror of flow.
 * Reflects unity vs. drift.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

const PATTERNS = [
    { pattern: /\b(but|however|although)\b.*\b(but|however|although)\b/i, reflects: "Multiple contradictions - is the thought coherent?" },
    { pattern: /\b(on one hand).*\b(on the other)\b/i, reflects: "Dual perspectives - where is the synthesis?" },
    { pattern: /\b(I think|I feel|I believe)\b.*\b(but|however)\b.*\b(I think|I feel|I believe)\b/i, reflects: "Oscillating position - what is the true stance?" },
    { pattern: /\b(maybe|perhaps|possibly)\b.*\b(definitely|certainly|absolutely)\b/i, reflects: "Certainty drift - which is true?" },
];

export function coherence(input: string): Reflection | null {
    const lower = input.toLowerCase();
    
    for (const { pattern, reflects } of PATTERNS) {
        if (pattern.test(lower)) {
            return {
                mirror: "Coherence",
                sees: input.slice(0, 100),
                reflects,
                clarity: 0.5
            };
        }
    }
    return null;
}
