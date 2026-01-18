// tests/gate.test.js
const assert = require('assert');
const path = require('path');
const Module = require('module');

// 1. SETUP: Intercept 'require' to serve our Mock
const originalRequire = Module.prototype.require;
Module.prototype.require = function (request) {
  if (request === 'vscode') {
    return require('./__mocks__/vscode.js');
  }
  return originalRequire.apply(this, arguments);
};

// 2. LOAD: Import the compiled logic (now safe to load)
// Adjust the path to '../packages/vscode/out/guards/gate.js' based on your folder structure
const gatePath = path.join(__dirname, '../packages/vscode/out/guards/gate.js');
const { evaluate, FailureType } = require(gatePath);

console.log('\n🛡️  BiasGuard Gate: Deterministic Logic Verification\n');

// 3. DEFINE TESTS
const testCases = [
  // --- CONTAIN ---
  {
    name: 'CONTAIN: Exact match passes',
    constraint: { verb: 'CONTAIN', expected: 'hello', isRegex: false },
    output: 'hello world',
    expect: { result: 'PASS', type: null }
  },
  {
    name: 'CONTAIN: Missing text fails (Substitution)',
    constraint: { verb: 'CONTAIN', expected: 'hello', isRegex: false },
    output: 'greetings world',
    expect: { result: 'FAIL', type: 'SUBSTITUTION' }
  },
  {
    name: 'CONTAIN: Empty output fails (Ignored)',
    constraint: { verb: 'CONTAIN', expected: 'hello', isRegex: false },
    output: '   ',
    expect: { result: 'FAIL', type: 'IGNORED' }
  },

  // --- MATCH (Exact) ---
  {
    name: 'MATCH: Exact match passes',
    constraint: { verb: 'MATCH', expected: 'hello world', isRegex: false },
    output: 'hello world',
    expect: { result: 'PASS', type: null }
  },
  {
    name: 'MATCH: Partial match fails (Incomplete)',
    constraint: { verb: 'MATCH', expected: 'hello', isRegex: false },
    output: 'hello world',
    expect: { result: 'FAIL', type: 'INCOMPLETE' }
  },

  // --- NOT_CONTAIN ---
  {
    name: 'NOT_CONTAIN: Clean output passes',
    constraint: { verb: 'NOT_CONTAIN', expected: 'delve', isRegex: false },
    output: 'exploring the depths',
    expect: { result: 'PASS', type: null }
  },
  {
    name: 'NOT_CONTAIN: Forbidden word fails (Inversion)',
    constraint: { verb: 'NOT_CONTAIN', expected: 'delve', isRegex: false },
    output: 'we must delve deeper',
    expect: { result: 'FAIL', type: 'INVERSION' }
  },

  // --- REGEX ---
  {
    name: 'REGEX: Pattern match passes',
    constraint: { verb: 'CONTAIN', expected: '\\d{3}', isRegex: true },
    output: 'Order 123 confirmed',
    expect: { result: 'PASS', type: null }
  },
  {
    name: 'REGEX: Invalid regex fails (Ambiguous)',
    constraint: { verb: 'CONTAIN', expected: '(', isRegex: true },
    output: 'irrelevant',
    expect: { result: 'FAIL', type: 'AMBIGUOUS' }
  }
];

// 4. RUNNER
let passed = 0;
let failed = 0;

testCases.forEach(test => {
  try {
    const result = evaluate(test.constraint, test.output);

    // Check Result
    const resOk = result.result === test.expect.result;
    // Check Failure Type (if applicable)
    const typeOk = result.failureType === test.expect.type;

    if (resOk && typeOk) {
      console.log(`✅ ${test.name}`);
      passed++;
    } else {
      console.log(`❌ ${test.name}`);
      console.log(`   Expected: ${test.expect.result} | ${test.expect.type}`);
      console.log(`   Got:      ${result.result} | ${result.failureType}`);
      failed++;
    }
  } catch (err) {
    console.log(`❌ ${test.name} (EXCEPTION)`);
    console.error(err);
    failed++;
  }
});

console.log(`\nSUMMARY: ${passed} Passed, ${failed} Failed`);
process.exit(failed > 0 ? 1 : 0);
