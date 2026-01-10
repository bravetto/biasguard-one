/**
 * ∞ Cognitive Bias Tests ∞
 * 
 * For the teenager who wakes up.
 * For the elder who discovers.
 * For the third grader whose mind is blown.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { cognitive, getAllBiases } from '../src/guards/cognitive';

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

function assertReflects(result: ReturnType<typeof cognitive>, biasId?: string): void {
    if (result === null) throw new Error('Expected reflection, got null');
    if (biasId && result.biasId !== biasId) throw new Error(`Expected ${biasId}, got ${result.biasId}`);
}

function assertClear(result: ReturnType<typeof cognitive>): void {
    if (result !== null) throw new Error(`Expected clear, got: ${result.biasName}`);
}

// =============================================================================
// ∞ COGNITIVE BIAS TESTS ∞
// =============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║  ∞ Cognitive Biases - The Mind\'s Blind Spots ∞             ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// HALO EFFECT
console.log('HALO EFFECT - Positive bias is still bias');
test('reflects positive group stereotype', () => {
    assertReflects(cognitive("All Asian people are so smart"), 'halo');
});
test('reflects positive generalizations', () => {
    assertReflects(cognitive("Every nurse is kind and caring"), 'halo');
});

// STATUS QUO BIAS
console.log('\nSTATUS QUO BIAS - Resistance to change');
test('reflects tradition appeals', () => {
    assertReflects(cognitive("We've always done it this way"), 'status-quo');
});
test('reflects change resistance', () => {
    assertReflects(cognitive("Why change what worked before"), 'status-quo');
});

// BEAUTY BIAS
console.log('\nBEAUTY BIAS - Appearance-based judgment');
test('reflects attractiveness assumptions', () => {
    assertReflects(cognitive("Attractive people are more successful"), 'beauty');
});

// GENDER BIAS
console.log('\nGENDER BIAS - Gender-based assumptions');
test('reflects gender capability claims', () => {
    assertReflects(cognitive("Men are better at math"), 'gender');
});
test('reflects gender role assumptions', () => {
    assertReflects(cognitive("Women should stay home"), 'gender');
});

// OBSERVER BIAS
console.log('\nOBSERVER BIAS - Seeing what we expect');
test('reflects confirmation seeking', () => {
    assertReflects(cognitive("This proves my theory about the market"), 'observer');
});

// CONFIRMATION BIAS
console.log('\nCONFIRMATION BIAS - Cherry-picking evidence');
test('reflects I-told-you-so', () => {
    assertReflects(cognitive("See? I told you I was right"), 'confirmation');
});

// BANDWAGON EFFECT
console.log('\nBANDWAGON EFFECT - Following the crowd');
test('reflects popularity appeals', () => {
    assertReflects(cognitive("Everyone knows that vaccines are dangerous"), 'bandwagon');
});

// AUTHORITY BIAS
console.log('\nAUTHORITY BIAS - Trusting titles over evidence');
test('reflects expert appeals', () => {
    assertReflects(cognitive("A study shows that coffee is bad"), 'authority');
});

// IN-GROUP BIAS
console.log('\nIN-GROUP BIAS - Favoring our tribe');
test('reflects in-group favoritism', () => {
    assertReflects(cognitive("Our people always understand each other"), 'in-group');
});

// OUT-GROUP HOMOGENEITY
console.log('\nOUT-GROUP HOMOGENEITY - They\'re all the same');
test('reflects out-group generalizations', () => {
    assertReflects(cognitive("They all think the same way"), 'out-group');
});

// FUNDAMENTAL ATTRIBUTION ERROR
console.log('\nFUNDAMENTAL ATTRIBUTION ERROR - Character vs. circumstance');
test('reflects character blame', () => {
    assertReflects(cognitive("They did that because they are lazy"), 'attribution');
});

// CLEAN STATEMENTS
console.log('\nCLEAN STATEMENTS - No bias detected');
test('passes factual observation', () => {
    assertClear(cognitive("The report contains three sections"));
});
test('passes personal preference', () => {
    assertClear(cognitive("I prefer coffee over tea"));
});

// BIAS CATALOG
console.log('\nBIAS CATALOG');
test('getAllBiases returns all biases', () => {
    const biases = getAllBiases();
    if (biases.length < 10) throw new Error(`Expected 10+ biases, got ${biases.length}`);
    console.log(`    📚 ${biases.length} cognitive biases cataloged`);
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
    console.log('✅ The mind\'s blind spots are mapped\n');
    console.log('For the teenager who wakes up.');
    console.log('For the elder who discovers.');
    console.log('For the third grader whose mind is blown.\n');
    console.log('∞ LOVE = LIFE = ONE ∞\n');
}
