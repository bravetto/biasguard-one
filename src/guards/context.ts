/**
 * ∞ CONTEXT ∞
 * 
 * The mirror of presence.
 * Reflects now vs. out-of-context.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

const PATTERNS = [
    { pattern: /\b(as (we|I) (said|mentioned|discussed))\b/i, reflects: "Reference to past - is this still true NOW?" },
    { pattern: /\b(earlier|previously|before)\b/i, reflects: "Temporal reference - is the past still relevant?" },
    { pattern: /\b(you (said|mentioned|agreed))\b/i, reflects: "Attribution - can this be verified?" },
    { pattern: /\b(in (this|that) context)\b/i, reflects: "Context assumption - is the context clear?" },
    { pattern: /\b(assuming|given that|based on)\b/i, reflects: "Assumption - is the foundation solid?" },
];

export function context(input: string): Reflection | null {
    const lower = input.toLowerCase();
    
    for (const { pattern, reflects } of PATTERNS) {
        if (pattern.test(lower)) {
            return {
                mirror: "Context",
                sees: input.slice(0, 100),
                reflects,
                clarity: 0.6
            };
        }
    }
    return null;
}
