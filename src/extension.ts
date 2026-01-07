/**
 * ∞ BiasGuard 4.2 - VS Code Extension ∞
 * 
 * Unified Protection for MCP Security
 * "Like water flows, protection adapts"
 * 
 * ∞ AbëONE ∞
 */

import * as vscode from 'vscode';
import { validateText, exportAudit, FlowResult } from './one';

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
        // FLOWS - All clear
        statusBarItem.text = '$(shield) BiasGuard: FLOWS';
        statusBarItem.backgroundColor = undefined;
        statusBarItem.color = '#66ff66';
        statusBarItem.tooltip = 'No protection violations detected';
    } else {
        // BLOCKED - Show what stopped
        showBlocked(document, result);
    }
}

function showBlocked(document: vscode.TextDocument, result: FlowResult & { flows: false }) {
    statusBarItem.text = `$(warning) BiasGuard: ${result.blocked}`;
    statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
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
            vscode.DiagnosticSeverity.Warning
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
            vscode.DiagnosticSeverity.Warning
        );
        diagnostic.source = 'BiasGuard ONE';
        diagnostic.code = result.blocked;
        diagnostics.push(diagnostic);
    }
    
    diagnosticCollection.set(document.uri, diagnostics);
}

export function deactivate() {
    statusBarItem?.dispose();
    diagnosticCollection?.dispose();
    outputChannel?.dispose();
}
