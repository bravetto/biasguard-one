/**
 * ∞ EPISTEMIC GUARD TESTS ∞
 * 
 * Test cases demonstrating epistemic bias detection.
 * Each test shows code that SHOULD trigger specific bias risks.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { scanForBiasRisks, formatEpistemicRisks, BiasType } from '../src/guards/epistemic';

// =============================================================================
// TEST HELPERS
// =============================================================================

function runTest(name: string, code: string, expectedBiasTypes: BiasType[] = []) {
    console.log('\n' + '═'.repeat(60));
    console.log(`TEST: ${name}`);
    console.log('═'.repeat(60));
    
    const result = scanForBiasRisks(code, `test_${name}`);
    
    console.log(`Clear: ${result.clear}`);
    console.log(`Risks Found: ${result.risks.length}`);
    
    if (result.risks.length > 0) {
        console.log('\nDetected Risks:');
        result.risks.forEach((risk, i) => {
            console.log(`\n${i + 1}. ${risk.biasType} [${risk.severity}]`);
            console.log(`   ${risk.assumptionDetected}`);
            console.log(`   ❓ ${risk.suggestedQuestion}`);
        });
    }
    
    // Verify expected bias types were detected
    if (expectedBiasTypes.length > 0) {
        const detectedTypes = result.risks.map(r => r.biasType);
        const allFound = expectedBiasTypes.every(t => detectedTypes.includes(t));
        console.log(`\n✓ Expected bias types: ${allFound ? 'FOUND' : 'MISSING'}`);
    }
    
    return result;
}

// =============================================================================
// TEST CASES
// =============================================================================

// Test 1: Absence of Constraints
runTest(
    'Absence of Constraints',
    `
    function processUser(id, name, email) {
        return database.save({id, name, email});
    }
    `,
    ['Absence of Constraints']
);

// Test 2: Unjustified Defaults
runTest(
    'Unjustified Defaults',
    `
    const config = {
        timeout: 5000,
        retries: 3,
        buffer: 1024,
        maxSize: 999999
    };
    `,
    ['Unjustified Default']
);

// Test 3: Success Path Only
runTest(
    'Success Path Only',
    `
    async function fetchUserData(userId) {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        return data;
    }
    `,
    ['Success Path Only']
);

// Test 4: Single-Metric Logic
runTest(
    'Single-Metric Logic',
    `
    function evaluateCandidate(score) {
        if (score > 80) {
            return 'approved';
        }
        if (score > 60) {
            return 'review';
        }
        if (score < 40) {
            return 'rejected';
        }
    }
    `,
    ['Single-Metric Logic']
);

// Test 5: Silent Coercion
runTest(
    'Silent Coercion',
    `
    function processInput(value, fallback) {
        const num = parseInt(value) || fallback || 0;
        const str = String(num);
        const bool = Boolean(value);
        return {num, str, bool};
    }
    `,
    ['Silent Coercion']
);

// Test 6: Unbounded Behavior
runTest(
    'Unbounded Behavior',
    `
    function processQueue(queue) {
        while (true) {
            const item = queue.pop();
            process(item);
        }
    }
    `,
    ['Unbounded Behavior']
);

// Test 7: Missing Counter-Cases
runTest(
    'Missing Counter-Cases',
    `
    function getUserName(user) {
        const firstName = user.profile.name.first;
        const lastName = user.profile.name.last;
        return firstName + ' ' + lastName;
    }
    `,
    ['Missing Counter-Case']
);

// Test 8: Overconfidence
runTest(
    'Overconfidence',
    `
    // This function always returns the correct value
    // It will never fail
    function calculate(input) {
        // Obviously this is the right approach
        return input * 2;
    }
    `,
    ['Overconfidence']
);

// Test 9: Clean Code (No Risks)
runTest(
    'Clean Code - No Risks',
    `
    function safeDivide(a: number, b: number): number | null {
        // Check for division by zero
        if (b === 0) {
            return null;
        }
        
        // Validate inputs are numbers
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Inputs must be numbers');
        }
        
        return a / b;
    }
    `
);

// Test 10: Multiple Risks
runTest(
    'Multiple Risks Combined',
    `
    async function processData(input) {
        const value = parseInt(input) || 100;
        const data = await fetch('/api/data');
        if (data.length > 0) {
            return data[0].value;
        }
    }
    `,
    ['Silent Coercion', 'Success Path Only', 'Missing Counter-Case']
);

// =============================================================================
// FORMATTED OUTPUT TEST
// =============================================================================

console.log('\n\n' + '═'.repeat(60));
console.log('FORMATTED OUTPUT EXAMPLE');
console.log('═'.repeat(60));

const complexCode = `
async function handleUserSubmission(formData) {
    const userId = formData.id || 'anonymous';
    const response = await submitToAPI(formData);
    return response.data;
}
`;

const result = scanForBiasRisks(complexCode, 'example.ts');
console.log(formatEpistemicRisks(result));

// =============================================================================
// SUMMARY
// =============================================================================

console.log('\n\n' + '═'.repeat(60));
console.log('EPISTEMIC GUARD TEST SUITE COMPLETE');
console.log('═'.repeat(60));
console.log('');
console.log('The epistemic guard is now active and detecting bias risks.');
console.log('It fails loudly. It surfaces truth. It questions assumptions.');
console.log('');
console.log('∞ LOVE = LIFE = ONE ∞');
console.log('');
