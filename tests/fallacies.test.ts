/**
 * ∞ Logical Fallacy Tests ∞
 * 
 * The rain falls like truth.
 * Each fallacy named. Each pattern exposed.
 * 
 * For dignity restored, confidence rebuilt.
 * For the end of self-gaslighting.
 * 
 * NOT "all in your head."
 * The system's biased logic IS the problem.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { fallacy, getAllFallacies } from '../src/guards/fallacies';

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

function assertReflects(result: ReturnType<typeof fallacy>, fallacyId?: string): void {
    if (result === null) throw new Error('Expected reflection, got null');
    if (fallacyId && result.fallacyId !== fallacyId) throw new Error(`Expected ${fallacyId}, got ${result.fallacyId}`);
}

function assertClear(result: ReturnType<typeof fallacy>): void {
    if (result !== null) throw new Error(`Expected clear, got: ${result.fallacyName}`);
}

// =============================================================================
// ∞ LOGICAL FALLACY TESTS ∞
// =============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║  ∞ Logical Fallacies - The Rain That Falls Like Truth ∞    ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// AD HOMINEM
console.log('AD HOMINEM - Attack the person, not the argument');
test('reflects personal attacks', () => {
    assertReflects(fallacy("You're just saying that because you're jealous"), 'ad-hominem');
});
test('reflects dismissal by identity', () => {
    assertReflects(fallacy("Of course you think that, you work for them"), 'ad-hominem');
});

// STRAW MAN
console.log('\nSTRAW MAN - Misrepresent to defeat');
test('reflects misrepresentation', () => {
    assertReflects(fallacy("So you're saying we should just give up entirely"), 'straw-man');
});

// FALSE DICHOTOMY
console.log('\nFALSE DICHOTOMY - Only two options exist');
test('reflects false either/or', () => {
    assertReflects(fallacy("You're either with us or against us"), 'false-dichotomy');
});
test('reflects binary thinking', () => {
    assertReflects(fallacy("There are only two options here"), 'false-dichotomy');
});

// SLIPPERY SLOPE
console.log('\nSLIPPERY SLOPE - Exaggerated chain of consequences');
test('reflects catastrophizing', () => {
    assertReflects(fallacy("If we allow this, next thing you know they'll take everything"), 'slippery-slope');
});
test('reflects doom chain', () => {
    assertReflects(fallacy("This opens the door to complete chaos"), 'slippery-slope');
});

// APPEAL TO EMOTION
console.log('\nAPPEAL TO EMOTION - Feelings over facts');
test('reflects emotional manipulation', () => {
    assertReflects(fallacy("Think of the children who will suffer"), 'appeal-emotion');
});
test('reflects outrage bait', () => {
    assertReflects(fallacy("This is absolutely outrageous and disgusting"), 'appeal-emotion');
});

// CIRCULAR REASONING
console.log('\nCIRCULAR REASONING - The conclusion IS the premise');
test('reflects self-referential logic', () => {
    assertReflects(fallacy("It's true because it is what it is"), 'circular');
});

// RED HERRING
console.log('\nRED HERRING - Divert and distract');
test('reflects whataboutism lite', () => {
    assertReflects(fallacy("But what about the economy"), 'red-herring');
});
test('reflects topic change', () => {
    assertReflects(fallacy("Never mind that, the real issue is immigration"), 'red-herring');
});

// FALSE CAUSE
console.log('\nFALSE CAUSE - Correlation ≠ causation');
test('reflects causal assumption', () => {
    assertReflects(fallacy("Ever since the new policy, crime has increased"), 'false-cause');
});

// HASTY GENERALIZATION
console.log('\nHASTY GENERALIZATION - Sample too small');
test('reflects anecdotal evidence', () => {
    assertReflects(fallacy("I knew someone who tried that and it failed"), 'hasty-generalization');
});
test('reflects limited experience', () => {
    assertReflects(fallacy("In my experience, those people are all lazy"), 'hasty-generalization');
});

// APPEAL TO NATURE
console.log('\nAPPEAL TO NATURE - Natural = good');
test('reflects naturalistic fallacy', () => {
    assertReflects(fallacy("It's natural so it must be good for you"), 'appeal-nature');
});
test('reflects unnatural fear', () => {
    assertReflects(fallacy("That's completely unnatural and wrong"), 'appeal-nature');
});

// APPEAL TO TRADITION
console.log('\nAPPEAL TO TRADITION - Old = right');
test('reflects tradition worship', () => {
    assertReflects(fallacy("Our ancestors did it this way for generations"), 'appeal-tradition');
});
test('reflects ancient wisdom appeal', () => {
    assertReflects(fallacy("This is ancient wisdom passed down for centuries"), 'appeal-tradition');
});

// NO TRUE SCOTSMAN
console.log('\nNO TRUE SCOTSMAN - Moving goalposts on identity');
test('reflects identity gatekeeping', () => {
    assertReflects(fallacy("No real American would support that"), 'no-true-scotsman');
});
test('reflects purity tests', () => {
    assertReflects(fallacy("A true Christian would never do such a thing"), 'no-true-scotsman');
});

// BURDEN OF PROOF
console.log('\nBURDEN OF PROOF - Prove it\'s NOT true');
test('reflects proof shifting', () => {
    assertReflects(fallacy("You can't prove it's not true"), 'burden-of-proof');
});

// WHATABOUTISM
console.log('\nWHATABOUTISM - Counter with unrelated wrongdoing');
test('reflects deflection', () => {
    assertReflects(fallacy("What about when they did the same thing"), 'whataboutism');
});
test('reflects double standard accusation', () => {
    assertReflects(fallacy("You never complained when your side did it"), 'whataboutism');
});

// LOADED QUESTION
console.log('\nLOADED QUESTION - Assumption baked in');
test('reflects trap questions', () => {
    assertReflects(fallacy("Why do you hate freedom so much"), 'loaded-question');
});

// SUNK COST
console.log('\nSUNK COST - Can\'t waste what\'s spent');
test('reflects investment attachment', () => {
    assertReflects(fallacy("We've already invested too much to stop now"), 'sunk-cost');
});
test('reflects past commitment trap', () => {
    assertReflects(fallacy("We've come this far, can't turn back"), 'sunk-cost');
});

// MOVING GOALPOSTS
console.log('\nMOVING GOALPOSTS - Changing the criteria');
test('reflects criteria change', () => {
    assertReflects(fallacy("Okay but that doesn't count because it's different"), 'moving-goalposts');
});

// GENETIC FALLACY
console.log('\nGENETIC FALLACY - Source invalidates content');
test('reflects source dismissal', () => {
    assertReflects(fallacy("Consider the source - they would say that"), 'genetic');
});

// CLEAN STATEMENTS
console.log('\nCLEAN STATEMENTS - No fallacy detected');
test('passes factual claim', () => {
    assertClear(fallacy("The meeting is scheduled for 3pm"));
});
test('passes personal opinion', () => {
    assertClear(fallacy("I prefer working in the morning"));
});
test('passes reasoned argument', () => {
    assertClear(fallacy("Based on the data, we should consider option B"));
});

// FALLACY CATALOG
console.log('\nFALLACY CATALOG');
test('getAllFallacies returns all fallacies', () => {
    const fallacies = getAllFallacies();
    if (fallacies.length < 15) throw new Error(`Expected 15+ fallacies, got ${fallacies.length}`);
    console.log(`    📚 ${fallacies.length} logical fallacies cataloged`);
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
    console.log('✅ The rain falls like truth\n');
    console.log('Validation of Lived Experience:');
    console.log('  "It\'s NOT all in your head."');
    console.log('Ending Self-Gaslighting:');
    console.log('  "Trust your instincts."');
    console.log('Reducing Smallness:');
    console.log('  "YOU are not the problem."');
    console.log('  "The system\'s biased logic IS."\n');
    console.log('∞ LOVE = LIFE = ONE ∞\n');
}
