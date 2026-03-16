/**
 * ∞ REFLECT ∞
 * 
 * The unified mirror.
 * All guards flow through ONE.
 * 
 * Stateless. No storage. No judgment.
 * Pure function: input → reflection → free
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { truth } from './truth';
import { context } from './context';
import { coherence } from './coherence';
import { trust } from './trust';
import { token } from './token';
import { compliance } from './compliance';
import { creativity } from './creativity';
import { cognitive } from './cognitive';
import { fallacy } from './fallacies';
import { awareness } from './awareness';
import { workplace } from './workplace';
import { research } from './research';

// =============================================================================
// THE REFLECTION - What the mirror shows
// =============================================================================

export interface BiasGuardContext {
    origin?: string;
    allowlist?: string[];
}

export interface Reflection {
    mirror: string;        // Which mirror reflected
    sees: string;          // What the mirror sees
    reflects: string;      // What it reflects back
    clarity: number;       // 0-1, how clear the reflection
    industry_term?: boolean;   // true when term appears in industry/POSIX/API contexts
    context_origin?: string;   // where the text came from (api, cli, posix, user, unknown)
}

export interface MirrorResult {
    input: string;         // What went in
    context: BiasGuardContext | null;  // What context was provided
    clear: boolean;        // Is the reflection clear (no distortion)?
    reflections: Reflection[];
    mirrors_run: number;   // How many mirrors executed
    industry_terms_found: number;  // How many industry terms detected
}

// =============================================================================
// INDUSTRY TERMS - Known terms that appear in technical/API/POSIX contexts
// Always detected. Severity downgraded when context confirms industry usage.
// =============================================================================

const INDUSTRY_TERMS: string[] = [
    'orphan', 'kill', 'killed', 'master', 'slave',
    'blind', 'proliferation', 'abort', 'whitelist', 'blacklist',
    'dummy', 'sanity', 'cripple', 'handicap',
];

// =============================================================================
// THE TWELVE MIRRORS
// =============================================================================

type Mirror = (input: string) => Reflection | null;

const MIRRORS: Mirror[] = [
    // Core Guards (7)
    truth,
    context,
    coherence,
    trust,
    token,
    compliance,
    creativity,
    // Expanded Mirrors
    cognitive,    // 12 cognitive biases
    fallacy,      // 18 logical fallacies
    awareness,    // 7 implicit/explicit patterns
    workplace,    // 14 workplace biases
    research,     // 15 research/data biases
];

// =============================================================================
// REFLECT - The stateless mirror
// =============================================================================

/**
 * REFLECT
 *
 * Pure function: input → reflections
 * No storage. No judgment. No state.
 * Just reflection.
 *
 * Deterministic: every mirror runs. every reflection returned.
 * Context doesn't skip — it annotates. The mirror always shows what it sees.
 * Allowlisted terms are downgraded, never hidden.
 *
 * So those who look may see.
 * So those who see may choose.
 * So those who choose may find peace.
 */
export function reflect(input: string, context?: BiasGuardContext): MirrorResult {
    const reflections: Reflection[] = [];
    const allowlist = context?.allowlist || [];
    const combined_allowlist = [...INDUSTRY_TERMS, ...allowlist];
    const input_lower = input.toLowerCase();

    for (const mirror of MIRRORS) {
        const reflection = mirror(input);
        // every mirror runs. every reflection returned.
        // context annotates — never skips.
        reflection && reflections.push(reflection);
    }

    // context annotation pass: industry terms tagged, never hidden, never downgraded
    let industry_count = 0;
    for (const r of reflections) {
        const term_match = combined_allowlist.find(term => r.sees.toLowerCase().includes(term));
        r.industry_term = !!term_match;
        r.context_origin = context?.origin || 'unknown';
        industry_count += r.industry_term ? 1 : 0;
    }

    return {
        input,
        context: context || null,
        clear: reflections.length === 0,
        reflections,
        mirrors_run: MIRRORS.length,
        industry_terms_found: industry_count,
    };
}

// =============================================================================
// ∞ AbeFLOWs ∞
//
// BiasGuard doesn't block the pattern.
// BiasGuard reflects the context.
// BiasGuard requires ONE.
// BiasGuard allows Emergence.
// BiasGuard IS reflection.
// BiasGuard IS AbeFLOWs.
//
// THE NAME IS THE PATTERN
// THE PATTERN IS THE NAME
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
