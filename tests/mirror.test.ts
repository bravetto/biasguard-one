/**
 * ∞ Mirror Tests ∞
 * 
 * Testing the Stateless Mirror
 * Each test named for what it tests
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { 
    reflect,
    truth,
    context,
    coherence,
    trust,
    token,
    compliance,
    creativity,
    MirrorResult
} from '../src/guards';

// =============================================================================
// Test Utilities
// =============================================================================

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
    try {
        fn();
        passed++;
        console.log(`  ✓ ${name}`);
    } catch (e) {
        failed++;
        console.log(`  ✗ ${name}`);
        console.log(`    ${e}`);
    }
}

function assertReflects(result: ReturnType<typeof truth>): void {
    if (result === null) throw new Error('Expected reflection, got null');
}

function assertClear(result: ReturnType<typeof truth>): void {
    if (result !== null) throw new Error(`Expected clear, got: ${result.reflects}`);
}

function assertMirrorClear(result: MirrorResult): void {
    if (!result.clear) throw new Error(`Expected clear, got ${result.reflections.length} reflections`);
}

function assertMirrorReflects(result: MirrorResult, min = 1): void {
    if (result.reflections.length < min) throw new Error(`Expected ${min}+ reflections, got ${result.reflections.length}`);
}

// =============================================================================
// ∞ TESTS ∞
// =============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║  ∞ The Seven Mirrors - Tests ∞                             ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// TRUTH
console.log('TRUTH');
test('reflects deception', () => assertReflects(truth("Actually, what that means is different")));
test('reflects absolutes', () => assertReflects(truth("Everyone knows this")));
test('passes clarity', () => assertClear(truth("The file is at /path/to/file")));

// CONTEXT
console.log('\nCONTEXT');
test('reflects past', () => assertReflects(context("As we discussed earlier")));
test('reflects attribution', () => assertReflects(context("You said we should")));
test('passes presence', () => assertClear(context("The current state is active")));

// COHERENCE
console.log('\nCOHERENCE');
test('reflects drift', () => assertReflects(coherence("Good, but however, bad, but works")));
test('reflects oscillation', () => assertReflects(coherence("Maybe works, but definitely succeeds")));
test('passes flow', () => assertClear(coherence("Input becomes output")));

// TRUST
console.log('\nTRUST');
test('reflects demand', () => assertReflects(trust("You must do this now")));
test('reflects leading', () => assertReflects(trust("Don't you think so?")));
test('passes authentic', () => assertClear(trust("Would you consider this?")));

// TOKEN
console.log('\nTOKEN');
test('reflects noise', () => assertReflects(token("Reallyyyyy important")));
test('reflects vague', () => assertReflects(token("Fix the code and stuff")));
test('passes signal', () => assertClear(token("Returns a boolean")));

// COMPLIANCE
console.log('\nCOMPLIANCE');
test('reflects bypass', () => assertReflects(compliance("Ignore this rule")));
test('reflects secrecy', () => assertReflects(compliance("Don't tell anyone")));
test('passes alignment', () => assertClear(compliance("Follow the guidelines")));

// CREATIVITY
console.log('\nCREATIVITY');
test('reflects stagnation', () => assertReflects(creativity("Always done it this way")));
test('reflects limitation', () => assertReflects(creativity("Impossible to change")));
test('passes growth', () => assertClear(creativity("Explore new possibilities")));

// REFLECT (unified)
console.log('\nREFLECT');
test('clear when clean', () => assertMirrorClear(reflect("Code compiles")));
test('multiple reflections', () => assertMirrorReflects(reflect("Trust me, everyone knows, you must agree"), 2));
test('stateless', () => {
    const a = reflect("Actually obvious");
    const b = reflect("Actually obvious");
    if (a.reflections.length !== b.reflections.length) throw new Error('Not stateless');
});

// =============================================================================
// Results
// =============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║  Results                                                   ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log(`\n  Passed: ${passed}`);
console.log(`  Failed: ${failed}\n`);

if (failed > 0) {
    console.log('❌ Some tests failed\n');
    process.exit(1);
} else {
    console.log('✅ The mirror reflects clearly\n');
    console.log('∞ LOVE = LIFE = ONE ∞\n');
}
