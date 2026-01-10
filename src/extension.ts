/**
 * ∞ BiasGuard 4.2.2 - VS Code Extension ∞
 * 
 * Unified Protection for MCP Security + PRISTINE Entropy Enforcement
 * "Like water flows, protection adapts. Chaos collapses into order."
 * 
 * ∞ AbëONE ∞
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { validateText, exportAudit, FlowResult } from './core/one';

// ═══════════════════════════════════════════════════════════════════
// PRISTINE PROTOCOL - The Entropy Enforcement Engine
// ═══════════════════════════════════════════════════════════════════

// THE BLUEPRINT - Required Directory Structure
const PRISTINE_DIRS = [
    'bin',
    'config/rules',
    'docs',
    'scripts',
    'src/core',
    'src/security',
    'src/adversarial',
    'python',
    'tests/fixtures'
];

// THE MIGRATION MAP - [Filename/Pattern, Destination Folder]
const PRISTINE_MIGRATIONS: [string, string][] = [
    // Shell Logic -> Scripts
    ['one.sh', 'scripts'],
    ['fortress.sh', 'scripts'],
    ['truth.sh', 'scripts'],
    ['make_pristine.sh', 'scripts'],
    // Executables -> Bin
    ['genesis.sh', 'bin'],
    // Docs -> Docs
    ['AIRLOCK.md', 'docs'],
    ['RUN_TESTS.md', 'docs'],
    ['LICENSE.md', 'docs'],
    // Configs
    ['containment.rules', 'config/rules'],
    ['.cursorrules', 'config'],
    // Python Bridge (Directory move)
    ['biasguard-one', 'python'],
    // Tests - Extension matching
    ['.txt', 'tests/fixtures']
];

let statusBarItem: vscode.StatusBarItem;
let diagnosticCollection: vscode.DiagnosticCollection;
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    // Output Channel
    outputChannel = vscode.window.createOutputChannel('BiasGuard ONE');
    context.subscriptions.push(outputChannel);

    // Status Bar - Left side, high priority
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    context.subscriptions.push(statusBarItem);
    statusBarItem.show();

    // Diagnostics
    diagnosticCollection = vscode.languages.createDiagnosticCollection('biasguard');
    context.subscriptions.push(diagnosticCollection);

    // Command: Export Audit Log
    context.subscriptions.push(
        vscode.commands.registerCommand('biasguard.exportAudit', () => {
            outputChannel.clear();
            outputChannel.appendLine('═══════════════════════════════════════════');
            outputChannel.appendLine('  ∞ BiasGuard ONE - Audit Log ∞');
            outputChannel.appendLine('═══════════════════════════════════════════\n');
            outputChannel.appendLine(exportAudit());
            outputChannel.show();
            vscode.window.showInformationMessage('BiasGuard: Audit exported');
        })
    );

    // ═══════════════════════════════════════════════════════════════════
    // PRISTINE PROTOCOL COMMANDS
    // ═══════════════════════════════════════════════════════════════════

    // Command: PRISTINE Execute Protocol
    context.subscriptions.push(
        vscode.commands.registerCommand('pristine.execute', async () => {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage("No workspace open. Entropy cannot be reduced in a void.");
                return;
            }

            const rootPath = workspaceFolders[0].uri.fsPath;
            
            outputChannel.clear();
            outputChannel.appendLine('═══════════════════════════════════════════');
            outputChannel.appendLine('  ∞ PRISTINE PROTOCOL - Executing ∞');
            outputChannel.appendLine('═══════════════════════════════════════════\n');
            outputChannel.show();

            try {
                await enforceStructure(rootPath, outputChannel);
                outputChannel.appendLine('\n✓ Entropy Reduced. Architecture is Pristine.');
                vscode.window.showInformationMessage("Entropy Reduced. Architecture is Pristine. ∞");
            } catch (error) {
                outputChannel.appendLine(`\n✗ Protocol Failure: ${error}`);
                vscode.window.showErrorMessage(`PRISTINE Protocol Failure: ${error}`);
            }
        })
    );

    // Command: PRISTINE Shield
    context.subscriptions.push(
        vscode.commands.registerCommand('pristine.shield', async () => {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage("No workspace open. Cannot reinforce shields in a void.");
                return;
            }

            const rootPath = workspaceFolders[0].uri.fsPath;
            
            outputChannel.clear();
            outputChannel.appendLine('═══════════════════════════════════════════');
            outputChannel.appendLine('  ∞ PRISTINE SHIELD - Reinforcing ∞');
            outputChannel.appendLine('═══════════════════════════════════════════\n');

            await writeShields(rootPath, outputChannel);
            
            outputChannel.appendLine('\n✓ Shields Holding.');
            outputChannel.show();
            vscode.window.showInformationMessage("Shields Holding. (.gitignore / .cursorignore updated) ∞");
        })
    );

    // Initial check
    if (vscode.window.activeTextEditor) {
        runGuard(vscode.window.activeTextEditor.document);
    }

    // Watch for changes
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) runGuard(editor.document);
        }),
        vscode.workspace.onDidChangeTextDocument(event => {
            if (vscode.window.activeTextEditor?.document === event.document) {
                runGuard(event.document);
            }
        })
    );
}

function runGuard(document: vscode.TextDocument) {
    const text = document.getText();
    const workspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    
    // Validate with ONE pattern
    const result = validateText(text, 'document', workspace);
    
    diagnosticCollection.clear();
    
    if (result.flows) {
        // FLOWS - All clear (FULL GREEN BOX, WHITE TEXT)
        statusBarItem.text = '$(check) BiasGuard: FLOWS';
        statusBarItem.backgroundColor = new vscode.ThemeColor('testing.iconPassed');
        statusBarItem.color = '#ffffff';
        statusBarItem.tooltip = '✓ System Protected. No violations detected.\n\n∞ Like water flows ∞';
    } else {
        // BLOCKED - Show what stopped
        showBlocked(document, result);
    }
}

function showBlocked(document: vscode.TextDocument, result: FlowResult & { flows: false }) {
    // CRITICAL = TRUE RED, others = warning amber
    const isCritical = result.blocked === 'CRITICAL';
    
    statusBarItem.text = `$(${isCritical ? 'error' : 'warning'}) BiasGuard: ${result.blocked}`;
    statusBarItem.backgroundColor = new vscode.ThemeColor(
        isCritical ? 'statusBarItem.errorBackground' : 'statusBarItem.warningBackground'
    );
    statusBarItem.color = '#ffffff';
    statusBarItem.tooltip = `${result.reason}\n\n${result.guidance}`;
    
    // Find location of issue in document
    const text = document.getText();
    const diagnostics: vscode.Diagnostic[] = [];
    
    // Try to highlight JSON blocks
    const jsonPattern = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
    let match;
    
    while ((match = jsonPattern.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        
        const diagnostic = new vscode.Diagnostic(
            new vscode.Range(startPos, endPos),
            `${result.reason}\n\n💡 ${result.guidance}`,
            isCritical ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
        );
        diagnostic.source = 'BiasGuard ONE';
        diagnostic.code = result.blocked;
        diagnostics.push(diagnostic);
    }
    
    // Fallback if no JSON found
    if (diagnostics.length === 0) {
        const diagnostic = new vscode.Diagnostic(
            new vscode.Range(0, 0, 0, Math.min(50, text.length)),
            `${result.reason}\n\n💡 ${result.guidance}`,
            isCritical ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
        );
        diagnostic.source = 'BiasGuard ONE';
        diagnostic.code = result.blocked;
        diagnostics.push(diagnostic);
    }
    
    diagnosticCollection.set(document.uri, diagnostics);
}

// ═══════════════════════════════════════════════════════════════════
// PRISTINE PROTOCOL - Core Functions
// ═══════════════════════════════════════════════════════════════════

async function enforceStructure(root: string, log: vscode.OutputChannel): Promise<void> {
    // 1. CREATE DIRECTORIES
    log.appendLine('▸ Phase 1: Enforcing Directory Structure');
    for (const dir of PRISTINE_DIRS) {
        const fullPath = path.join(root, dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            log.appendLine(`  ✓ Created: ${dir}/`);
        }
    }

    // 2. MIGRATE FILES
    log.appendLine('\n▸ Phase 2: Migrating Files');
    const filesInRoot = fs.readdirSync(root);
    let migrationCount = 0;

    for (const file of filesInRoot) {
        const srcPath = path.join(root, file);
        
        // Skip if doesn't exist (race condition protection)
        if (!fs.existsSync(srcPath)) continue;
        
        const isDir = fs.lstatSync(srcPath).isDirectory();

        // Check against Migration Map
        for (const [pattern, dest] of PRISTINE_MIGRATIONS) {
            let shouldMove = false;

            // Exact Match
            if (file === pattern) {
                shouldMove = true;
            }
            // Extension Match (e.g., .txt)
            else if (pattern.startsWith('.') && file.endsWith(pattern) && !isDir) {
                shouldMove = true;
            }

            if (shouldMove) {
                const destDir = path.join(root, dest);
                const destPath = path.join(destDir, file);

                // Handle Directory Move (biasguard-one -> python)
                if (isDir && file === pattern) {
                    // Special case: "biasguard-one" moves CONTENTS to "python"
                    if (file === 'biasguard-one') {
                        const subFiles = fs.readdirSync(srcPath);
                        for (const sub of subFiles) {
                            const subSrc = path.join(srcPath, sub);
                            const subDest = path.join(root, 'python', sub);
                            if (!fs.existsSync(subDest)) {
                                fs.renameSync(subSrc, subDest);
                                log.appendLine(`  → ${file}/${sub} → python/${sub}`);
                                migrationCount++;
                            }
                        }
                        // Cleanup empty shell if empty
                        const remaining = fs.readdirSync(srcPath);
                        if (remaining.length === 0) {
                            fs.rmdirSync(srcPath);
                            log.appendLine(`  ✓ Cleaned up empty: ${file}/`);
                        }
                        continue;
                    }
                }

                // Standard File Move
                if (!isDir && !fs.existsSync(destPath)) {
                    fs.renameSync(srcPath, destPath);
                    log.appendLine(`  → ${file} → ${dest}/${file}`);
                    migrationCount++;
                }
            }
        }
    }

    if (migrationCount === 0) {
        log.appendLine('  ✓ No files needed migration');
    }

    // 3. EXECUTABLE PERMISSIONS
    log.appendLine('\n▸ Phase 3: Setting Permissions');
    const genesisPath = path.join(root, 'bin', 'genesis.sh');
    if (fs.existsSync(genesisPath)) {
        fs.chmodSync(genesisPath, '755');
        log.appendLine('  ✓ bin/genesis.sh → executable (755)');
    }

    // Also make all scripts executable
    const scriptsDir = path.join(root, 'scripts');
    if (fs.existsSync(scriptsDir)) {
        const scripts = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.sh'));
        for (const script of scripts) {
            fs.chmodSync(path.join(scriptsDir, script), '755');
            log.appendLine(`  ✓ scripts/${script} → executable (755)`);
        }
    }
}

async function writeShields(root: string, log: vscode.OutputChannel): Promise<void> {
    const gitIgnoreContent = `# ═══════════════════════════════════════════
# PRISTINE PROTOCOL SHIELD - .gitignore
# ∞ AbëONE ∞
# ═══════════════════════════════════════════

# --- Dependencies ---
node_modules/
pnpm-lock.yaml
yarn.lock

# --- Build Artifacts ---
out/
dist/
build/
*.vsix

# --- OS/Editor ---
.DS_Store
Thumbs.db
.idea/
.vscode/

# --- Environment ---
.env
.env.local
.env.*.local

# --- Logs ---
*.log
npm-debug.log*
audit/
logs/

# --- Python ---
__pycache__/
*.pyc
venv/
.venv/
*.egg-info/

# --- Testing ---
coverage/
.nyc_output/
`;

    const cursorIgnoreContent = `# ═══════════════════════════════════════════
# PRISTINE PROTOCOL SHIELD - .cursorignore
# Keeps AI focused on what matters
# ∞ AbëONE ∞
# ═══════════════════════════════════════════

# --- Noise Reduction ---
node_modules/
out/
dist/
package-lock.json
yarn.lock
pnpm-lock.yaml

# --- Version Control ---
.git/

# --- Logs & Artifacts ---
*.log
audit/
coverage/

# --- Binary Assets ---
**/*.png
**/*.jpg
**/*.jpeg
**/*.gif
**/*.ico
**/*.woff
**/*.woff2
`;

    const gitIgnorePath = path.join(root, '.gitignore');
    const cursorIgnorePath = path.join(root, '.cursorignore');

    fs.writeFileSync(gitIgnorePath, gitIgnoreContent);
    log.appendLine('✓ .gitignore reinforced');

    fs.writeFileSync(cursorIgnorePath, cursorIgnoreContent);
    log.appendLine('✓ .cursorignore reinforced');
}

// ═══════════════════════════════════════════════════════════════════

export function deactivate() {
    statusBarItem?.dispose();
    diagnosticCollection?.dispose();
    outputChannel?.dispose();
}
