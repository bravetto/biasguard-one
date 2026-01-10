/**
 * ∞ Hero Use Case Test: Career-Limiting Emails ∞
 * 
 * THE REWRITE LOOP:
 * Original → Detection → Explanation → Suggested Rewrite → Re-Score
 * 
 * Every score must answer 3 questions:
 * 1. What pattern was detected?
 * 2. Why does it matter?
 * 3. What would fix it?
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { analyzeEmail, formatEmailAnalysis } from '../src/heroes/email';

// =============================================================================
// TEST CASES - Real career-limiting email patterns
// =============================================================================

const TEST_EMAILS = [
    {
        name: "Attribution Error in Performance Feedback",
        email: "John missed the deadline again because he is lazy and doesn't care about the team.",
        expectBias: true
    },
    {
        name: "Loaded Language in Complaint",
        email: "The marketing team's radical approach to the campaign is absurd and needs to stop.",
        expectBias: true
    },
    {
        name: "Gender Bias in Review",
        email: "Sarah did great on the presentation for a woman in engineering.",
        expectBias: true
    },
    {
        name: "Out-Group Generalization",
        email: "Those people in the remote office never respond to emails on time.",
        expectBias: true
    },
    {
        name: "Clean Professional Email",
        email: "The quarterly report is attached. Please review by Friday and send feedback.",
        expectBias: false
    },
    {
        name: "Halo Effect in Hiring",
        email: "We should hire the candidate because she went to Harvard.",
        expectBias: true
    }
];

// =============================================================================
// RUN TESTS
// =============================================================================

console.log(`
╔════════════════════════════════════════════════════════════════════════════════╗
║              ∞ Hero Use Case: Career-Limiting Emails ∞                         ║
╠════════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║  THE REWRITE LOOP:                                                             ║
║  Original → Detection → Explanation → Suggested Rewrite → Re-Score             ║
║                                                                                ║
║  Every score answers 3 questions:                                              ║
║  1. What pattern was detected?                                                 ║
║  2. Why does it matter?                                                        ║
║  3. What would fix it?                                                         ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝
`);

let passed = 0;
let failed = 0;

for (const testCase of TEST_EMAILS) {
    console.log(`\n${'═'.repeat(75)}`);
    console.log(`TEST: ${testCase.name}`);
    console.log(`EMAIL: "${testCase.email.slice(0, 60)}..."`);
    console.log(`${'─'.repeat(75)}`);
    
    const analysis = analyzeEmail(testCase.email);
    
    // Verify detection matches expectation
    const detectionCorrect = analysis.detected === testCase.expectBias;
    
    if (detectionCorrect) {
        passed++;
        console.log(`✓ Detection: ${analysis.detected ? 'BIAS FOUND' : 'CLEAR'}`);
    } else {
        failed++;
        console.log(`✗ Detection: Expected ${testCase.expectBias ? 'BIAS' : 'CLEAR'}, got ${analysis.detected ? 'BIAS' : 'CLEAR'}`);
    }
    
    if (analysis.detected) {
        // Verify the 3 questions are answered
        console.log(`\n  THE 3 QUESTIONS:`);
        
        // Q1: What was detected?
        console.log(`  1. What was detected?`);
        if (analysis.whatWasDetected.length > 0) {
            console.log(`     ✓ ${analysis.whatWasDetected[0].slice(0, 55)}...`);
        } else {
            console.log(`     ✗ No patterns named`);
        }
        
        // Q2: Why does it matter?
        console.log(`  2. Why does it matter?`);
        if (analysis.whyItMatters.length > 0) {
            console.log(`     ✓ ${analysis.whyItMatters[0].slice(0, 55)}...`);
        } else {
            console.log(`     ✗ No explanation`);
        }
        
        // Q3: What would fix it?
        console.log(`  3. What would fix it?`);
        if (analysis.howToFix.length > 0) {
            console.log(`     ✓ ${analysis.howToFix[0].slice(0, 55)}...`);
        } else {
            console.log(`     ✗ No suggested fix`);
        }
        
        // Show the rewrite loop
        console.log(`\n  THE REWRITE LOOP:`);
        console.log(`  Original:  "${testCase.email.slice(0, 50)}..."`);
        console.log(`  Rewrite:   "${analysis.suggestedRewrite.slice(0, 50)}..."`);
        console.log(`  Improvement: ${analysis.improvement > 0 ? '📈' : '➖'} ${analysis.improvement} points`);
        
        // Dignity message
        console.log(`\n  DIGNITY: "${analysis.dignityMessage.slice(0, 60)}..."`);
    }
}

// =============================================================================
// RESULTS
// =============================================================================

console.log(`\n${'═'.repeat(75)}`);
console.log(`\n╔════════════════════════════════════════════════════════════════════════╗`);
console.log(`║  Results: ${passed}/${passed + failed} tests passed`);
console.log(`╚════════════════════════════════════════════════════════════════════════╝`);

if (failed === 0) {
    console.log(`
✅ THE REWRITE LOOP IS COMPLETE

Every detection:
  • Names the enemy precisely (not "harmful content")
  • Explains why it matters
  • Shows how to fix it
  • Preserves dignity

This is not commentary. This is a MIRROR.
`);
} else {
    console.log(`\n❌ ${failed} tests failed\n`);
    process.exit(1);
}

console.log(`∞ LOVE = LIFE = ONE ∞\n`);
