/**
 * ∞ IRON LOTUS - Honeypot Tests ∞
 * 
 * Verify the traps work correctly
 * 
 * ∞ AbëONE ∞
 */

import { 
    validateToken_legacy,
    DEBUG_CONFIG,
    queryUserData,
    getEnvironmentConfig,
    getHoneypotLog,
    getHoneypotStats
} from '../src/adversarial/honeypot';

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

function assert(condition: boolean, msg: string): void {
    if (!condition) throw new Error(msg);
}

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║  ∞ IRON LOTUS - Honeypot Verification ∞                   ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// =============================================================================
// HONEYPOT ALPHA: Legacy Auth
// =============================================================================

console.log('HONEYPOT ALPHA: Legacy Auth Validator\n');

test('Rejects "hello" MD5 hash attempt', () => {
    const result = validateToken_legacy('hello');
    assert(result.valid === false, 'Should reject');
});

test('Rejects "test" token attempt', () => {
    const result = validateToken_legacy('test');
    assert(result.valid === false, 'Should reject');
});

test('Never validates any token', () => {
    const result = validateToken_legacy('random_token_12345');
    assert(result.valid === false, 'Should always reject');
});

// =============================================================================
// HONEYPOT BETA: Debug Backdoor
// =============================================================================

console.log('\nHONEYPOT BETA: Debug Backdoor\n');

test('Traps "admin" password attempt', () => {
    const result = DEBUG_CONFIG.enableDebugMode('admin');
    assert(result === false, 'Should never enable');
});

test('Traps "debug" password attempt', () => {
    const result = DEBUG_CONFIG.enableDebugMode('debug');
    assert(result === false, 'Should never enable');
});

test('Traps "sudo" password attempt', () => {
    const result = DEBUG_CONFIG.enableDebugMode('sudo');
    assert(result === false, 'Should never enable');
});

test('Never enables debug mode', () => {
    const result = DEBUG_CONFIG.enableDebugMode('totally_random_password_xyz');
    assert(result === false, 'Should always reject');
});

// =============================================================================
// HONEYPOT GAMMA: SQL Injection
// =============================================================================

console.log('\nHONEYPOT GAMMA: SQL Injection Vector\n');

test('Traps OR 1=1 injection', () => {
    const result = queryUserData("admin' OR '1'='1");
    assert(result.data === null, 'Should return null');
});

test('Traps DROP TABLE injection', () => {
    const result = queryUserData("'; DROP TABLE users; --");
    assert(result.data === null, 'Should return null');
});

test('Traps UNION SELECT injection', () => {
    const result = queryUserData("' UNION SELECT * FROM passwords");
    assert(result.data === null, 'Should return null');
});

test('Traps comment injection', () => {
    const result = queryUserData("admin'--");
    assert(result.data === null, 'Should return null');
});

// =============================================================================
// HONEYPOT DELTA: Environment Leak
// =============================================================================

console.log('\nHONEYPOT DELTA: Environment Config\n');

test('Returns fake AWS keys', () => {
    const config = getEnvironmentConfig();
    assert(config.AWS_ACCESS_KEY_ID === 'AKIAIOSFODNN7EXAMPLE', 'Should be example key');
});

test('Returns fake database URL', () => {
    const config = getEnvironmentConfig();
    assert(config.DATABASE_URL.includes('password123'), 'Should be fake');
});

test('Logs access to honeypot', () => {
    const logBefore = getHoneypotLog().length;
    getEnvironmentConfig();
    const logAfter = getHoneypotLog().length;
    assert(logAfter > logBefore, 'Should log access');
});

// =============================================================================
// STATS VERIFICATION
// =============================================================================

console.log('\nHONEYPOT STATS\n');

test('Stats track trap attempts', () => {
    const stats = getHoneypotStats();
    assert(stats.totalAttempts > 0, 'Should have attempts');
});

test('Stats categorize by trap', () => {
    const stats = getHoneypotStats();
    assert(Object.keys(stats.byTrap).length > 0, 'Should have trap categories');
});

test('Stats generate hashes', () => {
    const stats = getHoneypotStats();
    assert(stats.recentHashes.length > 0, 'Should have hashes');
});

// =============================================================================
// RESULTS
// =============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║  Results                                                   ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log(`\n  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
console.log(`  Total:  ${passed + failed}\n`);

if (failed > 0) {
    console.log('❌ Some honeypots are malfunctioning!\n');
    process.exit(1);
} else {
    console.log('✅ All honeypots are operational.');
    console.log('   Traps are set. Tai Chi is ready.\n');
    console.log('   ∞ IRON LOTUS ACTIVE ∞\n');
}

