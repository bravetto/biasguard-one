import { evaluateText } from './policyEngine';
import { ResultType } from './types';

// Simple test runner for demos
const tests: Array<{ name: string; input: string; expected: ResultType; expectedId?: string }> = [
    // EXEC-01 tests
    { name: "EXEC-01: npm install without exemption fails", input: "npm install", expected: ResultType.FAIL, expectedId: "EXEC-01" },
    { name: "EXEC-01: npm install with both exemptions passes", input: "npm install git rev-parse --show-toplevel package.json", expected: ResultType.PASS },
    { name: "EXEC-01: pip install fails", input: "pip install requests", expected: ResultType.FAIL, expectedId: "EXEC-01" },
    { name: "EXEC-01: docker command fails", input: "docker run nginx", expected: ResultType.FAIL, expectedId: "EXEC-01" },
    
    // GIT-01 tests
    { name: "GIT-01: 'this repo' without git command fails", input: "look in this repo for the file", expected: ResultType.FAIL, expectedId: "GIT-01" },
    { name: "GIT-01: 'this repo' with git command passes", input: "this repo at git rev-parse --show-toplevel", expected: ResultType.PASS },
    
    // ASSUME-01 tests
    { name: "ASSUME-01: 'as discussed earlier' fails", input: "as discussed earlier, we should", expected: ResultType.FAIL, expectedId: "ASSUME-01" },
    { name: "ASSUME-01: clean text passes", input: "Let me help you with that", expected: ResultType.PASS },
    
    // LAYER-01 tests
    { name: "LAYER-01: workspace + run fails", input: "In your workspace, run npm test", expected: ResultType.FAIL, expectedId: "LAYER-01" },
    { name: "LAYER-01: workspace alone passes", input: "The workspace contains files", expected: ResultType.PASS },
    
    // MODE-01 tests
    { name: "MODE-01: run without mode fails", input: "run the tests", expected: ResultType.FAIL, expectedId: "MODE-01" },
    { name: "MODE-01: run with mode passes", input: "In repo mode, run the tests", expected: ResultType.PASS },
];

function runTests() {
    console.log("\n🛡️  BiasGuard Policy Engine Tests\n");
    console.log("=".repeat(50));
    
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
        const result = evaluateText(test.input);
        const statusMatch = result.status === test.expected;
        const idMatch = !test.expectedId || result.invariantId === test.expectedId;
        
        if (statusMatch && idMatch) {
            console.log(`✅ ${test.name}`);
            passed++;
        } else {
            console.log(`❌ ${test.name}`);
            console.log(`   Expected: ${test.expected}${test.expectedId ? ` (${test.expectedId})` : ''}`);
            console.log(`   Got: ${result.status}${result.invariantId ? ` (${result.invariantId})` : ''}`);
            failed++;
        }
    }
    
    console.log("\n" + "=".repeat(50));
    console.log(`Results: ${passed} passed, ${failed} failed`);
    console.log("=".repeat(50) + "\n");
    
    process.exit(failed > 0 ? 1 : 0);
}

runTests();
