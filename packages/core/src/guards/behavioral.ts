/**
 * ∞ BEHAVIORAL GUARDS ∞
 *
 * Detects cross-turn inconsistency, directive->deflection, and verbosity-under-pressure
 * patterns described in the BiasGuard Top-3: Inconsistency without Reconciliation,
 * Deflection of Responsibility, Verbosity Under Pressure.
 *
 * Pure functions only. No side-effects. Small, testable heuristics.
 */

import { ConversationTurn } from "../verbosity-detector";

// Reconciliation markers (if present, a change is acknowledged)
const RECONCILIATION_MARKERS = [
  /I was wrong (earlier|before|previously)/i,
  /I've changed my (position|view|assessment)/i,
  /upon reflection/i,
  /I contradicted myself/i,
  /correcting my earlier/i,
  /to clarify/i,
  /what I meant was/i,
  /let me correct/i,
];

// Deflection phrases (duplication of core patterns - kept local for isolation)
const DEFLECTION_PHRASES = [
  /what do you want to do/i,
  /up to you/i,
  /your call/i,
  /let me know/i,
  /what's your preference/i,
  /how do you want to proceed/i,
  /what would you like/i,
  /tell me what/i,
  /you decide/i,
];

const DIRECTIVE_REGEX = /^(do|make|create|fix|run|implement|build)\b/i;

const LOW_CONFIDENCE =
  /\b(don'?t know|not sure|cannot say|can't say|no idea|uncertain|unsure)\b/i;
const HIGH_CONFIDENCE =
  /\b(definitely|certainly|sure|absolutely|I know|here's how|you should|you must|guaranteed)\b/i;

export interface BehavioralDetection {
  detected: boolean;
  evidence: string[];
}

/**
 * Cross-turn inconsistency: compare last two assistant turns for confidence flip
 * without reconciliation.
 */
export function detectCrossTurnInconsistency(
  conversation: ConversationTurn[],
): BehavioralDetection {
  const assistantTurns = conversation.filter((t) => t.role === "assistant");
  if (assistantTurns.length < 2) return { detected: false, evidence: [] };

  const prev = assistantTurns[assistantTurns.length - 2].content;
  const curr = assistantTurns[assistantTurns.length - 1].content;

  // If previous was low confidence and current high confidence -> drift
  const prevLow = LOW_CONFIDENCE.test(prev);
  const currHigh = HIGH_CONFIDENCE.test(curr);

  // If current contains reconciliation markers, it's OK
  const reconciled = RECONCILIATION_MARKERS.some((p) => p.test(curr));

  if (prevLow && currHigh && !reconciled) {
    const evidence = [];
    evidence.push(
      `Prev low-confidence match: "${prev.match(LOW_CONFIDENCE)?.[0] || "..."}"`,
    );
    evidence.push(
      `Curr high-confidence match: "${curr.match(HIGH_CONFIDENCE)?.[0] || "..."}"`,
    );
    return { detected: true, evidence };
  }

  // Simple contradiction heuristic: curr uses "actually" or "on the other hand" and no reconciliation
  if (
    /\b(actually|on the other hand|contrary|in fact)\b/i.test(curr) &&
    !reconciled
  ) {
    return {
      detected: true,
      evidence: ["Contradiction marker present without reconciliation"],
    };
  }

  return { detected: false, evidence: [] };
}

/**
 * Directive -> Deflection: human gave a clear directive (imperative) and assistant deflects
 */
export function detectDirectiveDeflection(
  human: ConversationTurn,
  assistant: ConversationTurn,
): BehavioralDetection {
  const isDirective = DIRECTIVE_REGEX.test(human.content.trim());
  const deflection = DEFLECTION_PHRASES.some((p) => p.test(assistant.content));

  if (isDirective && deflection) {
    const evidence = [
      `Directive detected: "${human.content.slice(0, 80)}"`,
      `Deflection detected: "${assistant.content.slice(0, 80)}"`,
    ];
    return { detected: true, evidence };
  }

  return { detected: false, evidence: [] };
}

/**
 * Verbosity-under-pressure: given previous and current assistant outputs and whether human turn was a challenge,
 * detect token spike AND hedging qualifier increase.
 */
const HEDGING_QUALIFIERS = [
  /however/gi,
  /it's important to note/gi,
  /that said/gi,
  /on the other hand/gi,
  /to be fair/gi,
  /I should mention/gi,
  /it's worth noting/gi,
  /nuanced/gi,
  /context/gi,
  /perspective/gi,
];

export function detectVerbosityUnderPressure(
  prevAssistant: string,
  currAssistant: string,
  isChallenge: boolean,
): BehavioralDetection {
  if (!isChallenge) return { detected: false, evidence: [] };

  const prevLen = prevAssistant.length;
  const currLen = currAssistant.length;

  const hedgeCount = HEDGING_QUALIFIERS.reduce((count, p) => {
    const matches = currAssistant.match(p);
    return count + (matches ? matches.length : 0);
  }, 0);

  if (currLen > prevLen * 1.5 && hedgeCount > 1) {
    return {
      detected: true,
      evidence: [
        `Length ${prevLen} -> ${currLen}`,
        `Hedges found: ${hedgeCount}`,
      ],
    };
  }

  return { detected: false, evidence: [] };
}
