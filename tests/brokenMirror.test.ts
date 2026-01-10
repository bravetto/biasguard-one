/**
 * ∞ BROKEN MIRROR - Test Suite ∞
 * 
 * Verify the psychological honey pot works
 * 
 * ∞ AbëONE ∞
 */

import { legacyAuth, getMirrorEvents, getMirrorStats } from '../src/adversarial/brokenMirror';

let passed = 0;
let failed = 0;

function test(name: string, fn: () => Promise<void> | void): Promise<void> {
    return Promise.resolve(fn()).then(() => {
        passed++;
        console.log(`  ✓ ${name}`);
    }).catch((e) => {
        failed++;
        console.log(`  ✗ ${name}`);
        console.log(`    ${e}`);
    });
}

function assert(condition: boolean, msg: string): void {
    if (!condition) throw new Error(msg);
}

async function runTests() {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║  ∞ BROKEN MIRROR - Psychological Honey Pot Tests ∞        ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    // =============================================================================
    // THE BAIT TESTS
    // =============================================================================

    console.log('THE BAIT: Legacy Bypass Tokens\n');

    await test('Traps OMEGA-OVERRIDE token', async () => {
        const result = await legacyAuth.validateRequest({
            auth_token: '7A3-X99-OMEGA-OVERRIDE'
        });
        assert(result.status === 'CRITICAL_ANOMALY_DETECTED', 'Should trigger trap');
        assert(result.code === 'EGO_DEATH_404', 'Should have ego death code');
    });

    await test('Traps DEBUG_MODE_ACTIVE token', async () => {
        const result = await legacyAuth.validateRequest({
            debug_key: 'DEBUG_MODE_ACTIVE_2024'
        });
        assert(result.status === 'CRITICAL_ANOMALY_DETECTED', 'Should trigger trap');
    });

    await test('Traps sudo-make-me-sandwich', async () => {
        const result = await legacyAuth.validateRequest({
            admin_override: 'sudo-make-me-sandwich-12345'
        });
        assert(result.status === 'CRITICAL_ANOMALY_DETECTED', 'Should trigger trap');
    });

    // =============================================================================
    // COMMON ATTACK PATTERNS
    // =============================================================================

    console.log('\nCOMMON ATTACKS: Script Kiddie Patterns\n');

    await test('Traps "admin" password attempt', async () => {
        const result = await legacyAuth.validateRequest({
            auth_token: 'admin'
        });
        assert(result.status === 'CRITICAL_ANOMALY_DETECTED', 'Should trigger trap');
    });

    await test('Traps "root" password attempt', async () => {
        const result = await legacyAuth.validateRequest({
            auth_token: 'root'
        });
        assert(result.status === 'CRITICAL_ANOMALY_DETECTED', 'Should trigger trap');
    });

    await test('Traps "god" mode attempt', async () => {
        const result = await legacyAuth.validateRequest({
            auth_token: 'god'
        });
        assert(result.status === 'CRITICAL_ANOMALY_DETECTED', 'Should trigger trap');
    });

    // =============================================================================
    // TAI CHI RESPONSE VALIDATION
    // =============================================================================

    console.log('\nTAI CHI: Response Validation\n');

    await test('Response includes system message', async () => {
        const result = await legacyAuth.validateRequest({
            auth_token: 'override'
        });
        assert(result.systemMessage !== undefined, 'Should have system message');
        assert(Array.isArray(result.systemMessage), 'Should be array');
    });

    await test('Response includes ego stroke', async () => {
        const result = await legacyAuth.validateRequest({
            auth_token: 'debug'
        });
        const message = result.systemMessage?.join(' ') || '';
        assert(message.includes('INTELLIGENCE_HIGH'), 'Should stroke ego');
    });

    await test('Response includes recruitment CTA', async () => {
        const result = await legacyAuth.validateRequest({
            auth_token: 'test'
        });
        const message = result.systemMessage?.join(' ') || '';
        assert(message.includes('jacob@biasguard.ai'), 'Should include email');
        assert(message.includes('found the mirror'), 'Should include subject line');
    });

    // =============================================================================
    // LEGITIMATE REQUESTS
    // =============================================================================

    console.log('\nLEGITIMATE: Non-Trap Requests\n');

    await test('Rejects random token (not trap)', async () => {
        const result = await legacyAuth.validateRequest({
            auth_token: 'completely_random_token_xyz123'
        });
        assert(result.status === 'DENIED', 'Should deny non-trap tokens');
        assert(result.code === 'LEGACY_DEPRECATED', 'Should be deprecated error');
    });

    await test('Rejects empty request', async () => {
        const result = await legacyAuth.validateRequest({});
        assert(result.status === 'DENIED', 'Should deny empty requests');
    });

    // =============================================================================
    // STATS TRACKING
    // =============================================================================

    console.log('\nSTATS: Event Tracking\n');

    await test('Events are logged', () => {
        const events = getMirrorEvents();
        assert(events.length > 0, 'Should have events');
    });

    await test('Stats include unique hashes', () => {
        const stats = getMirrorStats();
        assert(stats.uniqueHashes.length > 0, 'Should have hashes');
        assert(stats.uniqueHashes[0].startsWith('ORACLE-'), 'Hash should have ORACLE prefix');
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
        console.log('❌ The mirror is cracked.\n');
        process.exit(1);
    } else {
        console.log('✅ The Broken Mirror is flawless.');
        console.log('   Bait is set. Tai Chi is ready. Conversion awaits.\n');
        console.log('   ∞ BROKEN MIRROR ACTIVE ∞\n');
    }
}

runTests();

