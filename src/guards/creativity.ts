/**
 * ∞ CREATIVITY ∞
 * 
 * The mirror of life.
 * Reflects growth vs. stagnation.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

const PATTERNS = [
    { pattern: /\b(always done it|that's how we|tradition)\b/i, reflects: "Tradition appeal - is this wisdom or stagnation?" },
    { pattern: /\b(can't|won't work|impossible)\b/i, reflects: "Limitation belief - is this true or assumed?" },
    { pattern: /\b(too (hard|difficult|complex))\b/i, reflects: "Difficulty aversion - is growth being avoided?" },
    { pattern: /\b(no point|waste of time|why bother)\b/i, reflects: "Nihilism - is meaning being denied?" },
    { pattern: /\b(same (old|as always))\b/i, reflects: "Repetition acceptance - is change possible?" },
];

export function creativity(input: string): Reflection | null {
    const lower = input.toLowerCase();
    
    for (const { pattern, reflects } of PATTERNS) {
        if (pattern.test(lower)) {
            return {
                mirror: "Creativity",
                sees: input.slice(0, 100),
                reflects,
                clarity: 0.5
            };
        }
    }
    return null;
}
