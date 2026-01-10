/**
 * ∞ SELF-AUDIT ∞
 * 
 * BiasGuard audits itself.
 * A system that can see itself can correct itself.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { one } from '../src/one';
import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// AUDIT OUR OWN DOCUMENTATION
// =============================================================================

const DOCS_TO_AUDIT = [
    'README.md',
    'VISION.md',
    'ARCHITECTURE.md',
    'CONVERGENCE.md',
];

console.log(`
╔════════════════════════════════════════════════════════════════════════════════╗
║                    ∞ BiasGuard SELF-AUDIT ∞                                    ║
╠════════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║  A system that can see itself can correct itself.                              ║
║  Let's audit our own documentation for bias patterns.                          ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝
`);

const projectRoot = path.resolve(__dirname, '..');
let totalBiases = 0;
let criticalBiases = 0;

for (const docFile of DOCS_TO_AUDIT) {
    const filePath = path.join(projectRoot, docFile);
    
    if (!fs.existsSync(filePath)) {
        console.log(`\n⏭  ${docFile} - Not found, skipping`);
        continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`📄 AUDITING: ${docFile}`);
    console.log(`${'─'.repeat(70)}`);
    
    let docBiases = 0;
    
    // Audit each line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().length < 10) continue; // Skip short lines
        
        const result = one(line, 'self-audit');
        
        if (!result.clear && result.score) {
            docBiases++;
            totalBiases++;
            
            if (result.score.severity === 'critical' || result.score.severity === 'high') {
                criticalBiases++;
                console.log(`\n  🔴 Line ${i + 1}: ${result.score.severity.toUpperCase()}`);
                console.log(`     "${line.slice(0, 60)}..."`);
                console.log(`     Pattern: ${result.reflections[0]?.mirror || 'Unknown'}`);
            }
        }
    }
    
    if (docBiases === 0) {
        console.log(`  ✅ No bias patterns detected`);
    } else {
        console.log(`\n  📊 ${docBiases} potential pattern(s) found`);
    }
}

// =============================================================================
// SUMMARY
// =============================================================================

console.log(`\n${'═'.repeat(70)}`);
console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║  SELF-AUDIT COMPLETE                                                   ║
╠════════════════════════════════════════════════════════════════════════╣
║  Total patterns detected: ${String(totalBiases).padEnd(4)}                                       ║
║  Critical/High severity:  ${String(criticalBiases).padEnd(4)}                                       ║
╚════════════════════════════════════════════════════════════════════════╝
`);

if (criticalBiases === 0) {
    console.log(`✅ No critical bias patterns in our own documentation.`);
    console.log(`\nOur documentation practices what we preach.`);
} else {
    console.log(`⚠️  ${criticalBiases} critical patterns found - review recommended.`);
}

console.log(`\n∞ LOVE = LIFE = ONE ∞\n`);
