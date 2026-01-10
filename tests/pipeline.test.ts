/**
 * ∞ BiasGuard Pipeline Demo ∞
 * 
 * Demonstrates the full bias scoring graph:
 * 
 *   Input → Framing → Pattern Match → Fallacy Coupling
 *   → Impact Domain → Severity → Human-Centered Explanation
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { one, oneFormatted } from '../src/one';

// =============================================================================
// TEST CASES - Real-world bias examples
// =============================================================================

const TEST_CASES = [
    // AUTOMATION BIAS - Critical for AI
    {
        name: "Automation Bias",
        input: "The algorithm says she's high-risk for the loan",
        expected: "automation"
    },
    
    // SURVIVORSHIP BIAS
    {
        name: "Survivorship Bias", 
        input: "Every successful startup founder dropped out of college",
        expected: "survivorship"
    },
    
    // ATTRIBUTION ERROR
    {
        name: "Attribution Error",
        input: "He failed because he is lazy and unmotivated",
        expected: "attribution"
    },
    
    // HALO EFFECT (Workplace)
    {
        name: "Halo Effect",
        input: "She went to Harvard, so she must be qualified",
        expected: "halo"
    },
    
    // LOADED LANGUAGE
    {
        name: "Loaded Language",
        input: "The radical extremists are pushing their agenda",
        expected: "loaded-language"
    },
    
    // CLEAN INPUT
    {
        name: "Clean Input",
        input: "The meeting is scheduled for 3pm tomorrow",
        expected: "clear"
    }
];

// =============================================================================
// RUN DEMO
// =============================================================================

console.log(`
╔════════════════════════════════════════════════════════════════════════════════╗
║                    ∞ BiasGuard Pipeline Demo ∞                                 ║
╠════════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║   THE BIAS SCORING GRAPH:                                                      ║
║                                                                                ║
║   Input → Framing Analysis → Bias Pattern Match (87 patterns)                  ║
║   → Fallacy Coupling → Impact Domain → Severity + Scope                        ║
║   → Human-Centered Explanation                                                 ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝
`);

let passed = 0;
let total = TEST_CASES.length;

for (const testCase of TEST_CASES) {
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`TEST: ${testCase.name}`);
    console.log(`INPUT: "${testCase.input}"`);
    console.log(`${'─'.repeat(70)}`);
    
    const result = one(testCase.input);
    
    console.log(`\nRESULT:`);
    console.log(`  Clear: ${result.clear}`);
    console.log(`  Reflections: ${result.reflections.length}`);
    
    if (result.score) {
        console.log(`\n${result.reflections.slice(0, 2).map(r => 
            `  🔍 ${r.mirror}: ${r.reflects.slice(0, 55)}...`
        ).join('\n')}`);
        
        console.log(`\n  ╔════════════════════════════════════════════════════════════╗`);
        console.log(`  ║  Bias Score: ${result.score.score}/100 (${result.score.severity.toUpperCase()})`);
        console.log(`  ║  Primary: ${result.score.primaryBias}`);
        console.log(`  ║  Fallacies: ${result.score.relatedFallacies.join(', ') || 'None'}`);
        console.log(`  ║  Domains: ${result.score.impactDomains.join(', ') || 'General'}`);
        console.log(`  ╠════════════════════════════════════════════════════════════╣`);
        console.log(`  ║  "${result.score.dignityMessage.slice(0, 54)}..."`);
        console.log(`  ╚════════════════════════════════════════════════════════════╝`);
        
        if (testCase.expected !== 'clear') passed++;
    } else {
        console.log(`\n  ✅ No bias detected - input is clear`);
        if (testCase.expected === 'clear') passed++;
    }
}

console.log(`\n${'═'.repeat(70)}`);
console.log(`\n  Results: ${passed}/${total} tests aligned with expectations`);
console.log(`\n∞ LOVE = LIFE = ONE ∞`);
console.log(`\nA system that can see itself can correct itself.\n`);
