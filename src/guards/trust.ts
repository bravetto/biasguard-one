/**
 * ∞ TRUST ∞
 * 
 * The mirror of authenticity.
 * Reflects genuine vs. manipulation.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

const PATTERNS = [
    { pattern: /\b(you (must|have to|need to|should))\b/i, reflects: "Imperative - is this a request or a demand?" },
    { pattern: /\b(don't you (think|agree|see))\b/i, reflects: "Leading question - is genuine inquiry intended?" },
    { pattern: /\b(if you (really|truly|actually))\b/i, reflects: "Conditional loyalty - is trust being tested?" },
    { pattern: /\b(any (reasonable|intelligent|smart) person)\b/i, reflects: "Social pressure - is this appeal to conformity?" },
    { pattern: /\b(I'm (just|only) (trying|asking|saying))\b/i, reflects: "Deflection - is responsibility being avoided?" },
];

export function trust(input: string): Reflection | null {
    const lower = input.toLowerCase();
    
    for (const { pattern, reflects } of PATTERNS) {
        if (pattern.test(lower)) {
            return {
                mirror: "Trust",
                sees: input.slice(0, 100),
                reflects,
                clarity: 0.8
            };
        }
    }
    return null;
}
