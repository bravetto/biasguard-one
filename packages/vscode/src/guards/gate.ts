/**
 * BiasGuardCode - Modal Quality Gate
 *
 * Deterministic fidelity enforcement with binary user decision.
 * PASS flows silently. FAIL locks the UI until user decides.
 *
 * "Nothing passes without intention."
 */

import * as vscode from 'vscode';

// ═══════════════════════════════════════════════════════════════════
// DOMAIN MODEL
// ═══════════════════════════════════════════════════════════════════

export enum FailureType {
    AMBIGUOUS = 'AMBIGUOUS',         // Constraint itself is malformed
    IGNORED = 'IGNORED',             // Output is empty/whitespace
    INCOMPLETE = 'INCOMPLETE',       // Partial match when exact required
    INVERSION = 'INVERSION',         // Contains what it shouldn't
    SUBSTITUTION = 'SUBSTITUTION',   // Different content than expected
    HALLUCINATION = 'HALLUCINATION'  // Unknown/impossible state
}

export interface Constraint {
    verb: 'CONTAIN' | 'MATCH' | 'NOT_CONTAIN';
    expected: string;
    isRegex?: boolean;
}

export interface GateResult {
    result: 'PASS' | 'FAIL';
    failureType: FailureType | null;
    constraint: Constraint;
    output: string;
}

// ═══════════════════════════════════════════════════════════════════
// PURE EVALUATION LOGIC
// ═══════════════════════════════════════════════════════════════════

export function evaluate(constraint: Constraint, output: string): GateResult {
    const { verb, expected, isRegex } = constraint;
    const base = { constraint, output };

    let pattern: RegExp | null = null;
    if (isRegex) {
        try {
            pattern = new RegExp(expected);
        } catch {
            return { ...base, result: 'FAIL', failureType: FailureType.AMBIGUOUS };
        }
    }

    const matches = isRegex ? pattern!.test(output) : output.includes(expected);

    switch (verb) {
        case 'CONTAIN':
            if (matches) return { ...base, result: 'PASS', failureType: null };
            if (output.trim() === '') return { ...base, result: 'FAIL', failureType: FailureType.IGNORED };
            return { ...base, result: 'FAIL', failureType: FailureType.SUBSTITUTION };

        case 'MATCH':
            const exactMatch = isRegex
                ? pattern!.test(output) && output.match(pattern!)?.[0] === output
                : output === expected;
            if (exactMatch) return { ...base, result: 'PASS', failureType: null };
            if (matches) return { ...base, result: 'FAIL', failureType: FailureType.INCOMPLETE };
            return { ...base, result: 'FAIL', failureType: FailureType.SUBSTITUTION };

        case 'NOT_CONTAIN':
            if (!matches) return { ...base, result: 'PASS', failureType: null };
            return { ...base, result: 'FAIL', failureType: FailureType.INVERSION };

        default:
            return { ...base, result: 'FAIL', failureType: FailureType.HALLUCINATION };
    }
}

// ═══════════════════════════════════════════════════════════════════
// MODAL GATE HANDLER
// ═══════════════════════════════════════════════════════════════════

export interface GateDecision {
    action: 'FIX' | 'OVERRIDE' | 'DISMISSED';
    result: GateResult;
    timestamp: Date;
}

export async function enforceGate(result: GateResult): Promise<GateDecision> {
    const timestamp = new Date();

    // PASS: Silent confirmation
    if (result.result === 'PASS') {
        vscode.window.setStatusBarMessage('$(shield) BiasGuard: VERIFIED', 3000);
        return { action: 'FIX', result, timestamp }; // FIX means "no action needed"
    }

    // FAIL: Modal blocks until decision
    const choice = await vscode.window.showErrorMessage(
        `VERIFICATION FAILED: ${result.failureType}`,
        {
            modal: true,
            detail: [
                'The output did not meet the deterministic fidelity requirement.',
                '',
                `Constraint: ${result.constraint.verb} "${result.constraint.expected}"`,
                `Output length: ${result.output.length} chars`,
                '',
                'Proceeding risks deployment of hallucinated or biased content.'
            ].join('\n')
        },
        'STOP & FIX',
        'PROCEED ANYWAY'
    );

    if (choice === 'STOP & FIX') {
        vscode.window.activeTextEditor?.show();
        return { action: 'FIX', result, timestamp };
    } else if (choice === 'PROCEED ANYWAY') {
        // Log override for audit trail
        console.log(`[BiasGuard] Override: ${result.failureType} at ${timestamp.toISOString()}`);
        return { action: 'OVERRIDE', result, timestamp };
    }

    return { action: 'DISMISSED', result, timestamp };
}

// ═══════════════════════════════════════════════════════════════════
// COMMAND HANDLER
// ═══════════════════════════════════════════════════════════════════

export async function executeGateCommand(): Promise<GateDecision | null> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return null;
    }

    const output = editor.document.getText(editor.selection);
    if (!output || output.trim() === '') {
        const result: GateResult = {
            result: 'FAIL',
            failureType: FailureType.IGNORED,
            constraint: { verb: 'CONTAIN', expected: '' },
            output: ''
        };
        return enforceGate(result);
    }

    // Step 1: Select constraint type
    const verbChoice = await vscode.window.showQuickPick(
        [
            { label: '$(check) Must Contain', description: 'Output includes expected text', verb: 'CONTAIN' as const },
            { label: '$(verified) Must Match Exactly', description: 'Output equals expected text', verb: 'MATCH' as const },
            { label: '$(circle-slash) Must Exclude', description: 'Output must NOT include text', verb: 'NOT_CONTAIN' as const }
        ],
        {
            placeHolder: 'Define the Hard Constraint',
            title: 'BiasGuard Gate'
        }
    );
    if (!verbChoice) return null;

    // Step 2: Define expected value
    const expected = await vscode.window.showInputBox({
        title: `${verbChoice.label}...`,
        prompt: 'Enter the exact text or pattern to verify against.',
        ignoreFocusOut: true,
        placeHolder: verbChoice.verb === 'NOT_CONTAIN' ? 'Text that must NOT appear' : 'Text that must appear'
    });
    if (expected === undefined) return null;

    // Step 3: Regex option for advanced users
    const useRegex = await vscode.window.showQuickPick(
        [
            { label: '$(text-size) Literal Text', description: 'Match exactly as typed', isRegex: false },
            { label: '$(regex) Regular Expression', description: 'Use regex pattern matching', isRegex: true }
        ],
        {
            placeHolder: 'Match type',
            title: 'BiasGuard Gate'
        }
    );
    if (!useRegex) return null;

    // Step 4: Evaluate
    const constraint: Constraint = {
        verb: verbChoice.verb,
        expected,
        isRegex: useRegex.isRegex
    };

    const result = evaluate(constraint, output);

    // Step 5: Enforce gate
    return enforceGate(result);
}

// ═══════════════════════════════════════════════════════════════════
// REGISTRATION
// ═══════════════════════════════════════════════════════════════════

export function registerGateCommand(context: vscode.ExtensionContext): void {
    const command = vscode.commands.registerCommand('biasguard.gate', executeGateCommand);
    context.subscriptions.push(command);
}
