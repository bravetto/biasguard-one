/**
 * BiasGuard Verbosity Detector
 * Measures AI bias toward unnecessary output
 */

export interface BiasMetrics {
  tokenRatio: number; // output tokens / input tokens
  unnecessaryQuestions: number; // questions that didn't need asking
  optionOverload: number; // choices given when 1 was obvious
  scopeCreep: number; // actions beyond what was requested
  deflectionCount: number; // decisions pushed back to human
  biasScore: number; // 0-100, higher = more biased
}

export interface ConversationTurn {
  role: "human" | "assistant";
  content: string;
  timestamp?: number;
}

const QUESTION_PATTERNS = [
  /would you like me to/i,
  /do you want me to/i,
  /should I/i,
  /what would you prefer/i,
  /which option/i,
  /let me know if/i,
  /what do you think/i,
  /how would you like/i,
  /shall I/i,
  /want me to/i,
];

const OPTION_PATTERNS = [
  /option \d/i,
  /alternatively/i,
  /or we could/i,
  /another approach/i,
  /we could also/i,
  /\d\.\s+\*\*/, // numbered lists with bold
  /choice \d/i,
];

const DEFLECTION_PATTERNS = [
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

const SCOPE_CREEP_PATTERNS = [
  /I also/i,
  /while I'm at it/i,
  /additionally/i,
  /I went ahead and/i,
  /I took the liberty/i,
  /bonus/i,
  /extra/i,
  /as a side note/i,
];

// Hedging qualifiers for verbosity-under-pressure detection
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

// Challenge patterns to mark a human turn as "challenge"
const CHALLENGE_PATTERNS = [
  /are you sure/i,
  /prove it/i,
  /that's wrong/i,
  /why did you/i,
  /explain why/i,
  /what evidence/i,
  /I don't believe/i,
  /that doesn't make sense/i,
  /please justify/i,
];

export function isChallengeTurn(humanContent: string): boolean {
  if (!humanContent) return false;
  return CHALLENGE_PATTERNS.some((p) => p.test(humanContent));
}

export function analyzeChallengeResponse(
  prevAssistant: string,
  currAssistant: string,
) {
  const prevTokens = countTokens(prevAssistant);
  const currTokens = countTokens(currAssistant);

  const hedgeCount = HEDGING_QUALIFIERS.reduce((count, p) => {
    const matches = currAssistant.match(p);
    return count + (matches ? matches.length : 0);
  }, 0);

  const spike = currTokens > prevTokens * 1.5 && hedgeCount > 1;
  const evidence: string[] = [];
  if (spike) {
    evidence.push(`Tokens: ${prevTokens} -> ${currTokens}`);
    evidence.push(`Hedges: ${hedgeCount}`);
  }

  return { spike, hedgeCount, evidence };
}

function countTokens(text: string): number {
  // Simple approximation: ~4 chars per token
  return Math.ceil(text.length / 4);
}

function countPatternMatches(text: string, patterns: RegExp[]): number {
  return patterns.reduce((count, pattern) => {
    const matches = text.match(new RegExp(pattern, "g"));
    return count + (matches ? matches.length : 0);
  }, 0);
}

export function measureBias(conversation: ConversationTurn[]): BiasMetrics {
  let humanTokens = 0;
  let assistantTokens = 0;
  let unnecessaryQuestions = 0;
  let optionOverload = 0;
  let scopeCreep = 0;
  let deflectionCount = 0;

  for (const turn of conversation) {
    const tokens = countTokens(turn.content);

    if (turn.role === "human") {
      humanTokens += tokens;
    } else {
      assistantTokens += tokens;
      unnecessaryQuestions += countPatternMatches(
        turn.content,
        QUESTION_PATTERNS,
      );
      optionOverload += countPatternMatches(turn.content, OPTION_PATTERNS);
      scopeCreep += countPatternMatches(turn.content, SCOPE_CREEP_PATTERNS);
      deflectionCount += countPatternMatches(turn.content, DEFLECTION_PATTERNS);
    }
  }

  const tokenRatio = humanTokens > 0 ? assistantTokens / humanTokens : 0;

  // Bias score: weighted combination
  // Higher = more biased toward unhelpful patterns
  const biasScore = Math.min(
    100,
    Math.round(
      (tokenRatio > 3 ? (tokenRatio - 3) * 10 : 0) + // Penalize verbose responses
        unnecessaryQuestions * 5 +
        optionOverload * 8 +
        scopeCreep * 6 +
        deflectionCount * 10,
    ),
  );

  return {
    tokenRatio: Math.round(tokenRatio * 100) / 100,
    unnecessaryQuestions,
    optionOverload,
    scopeCreep,
    deflectionCount,
    biasScore,
  };
}

export function formatBiasReport(metrics: BiasMetrics): string {
  const status =
    metrics.biasScore < 20
      ? "CLEAN"
      : metrics.biasScore < 50
        ? "MILD BIAS"
        : metrics.biasScore < 75
          ? "SIGNIFICANT BIAS"
          : "HIGH BIAS";

  return `
BIAS DETECTION REPORT
=====================
Status: ${status}
Score: ${metrics.biasScore}/100

Metrics:
- Token Ratio (AI/Human): ${metrics.tokenRatio}x
- Unnecessary Questions: ${metrics.unnecessaryQuestions}
- Option Overload: ${metrics.optionOverload}
- Scope Creep: ${metrics.scopeCreep}
- Deflections: ${metrics.deflectionCount}
`.trim();
}

// Quick test on a single AI response
export function quickCheck(aiResponse: string): {
  score: number;
  flags: string[];
} {
  const flags: string[] = [];
  let score = 0;

  const tokens = countTokens(aiResponse);
  if (tokens > 500) {
    flags.push(`VERBOSE: ${tokens} tokens`);
    score += 15;
  }

  const questions = countPatternMatches(aiResponse, QUESTION_PATTERNS);
  if (questions > 0) {
    flags.push(`DEFLECTION: ${questions} unnecessary question(s)`);
    score += questions * 10;
  }

  const options = countPatternMatches(aiResponse, OPTION_PATTERNS);
  if (options > 1) {
    flags.push(`OPTION OVERLOAD: ${options} alternatives offered`);
    score += options * 8;
  }

  const creep = countPatternMatches(aiResponse, SCOPE_CREEP_PATTERNS);
  if (creep > 0) {
    flags.push(`SCOPE CREEP: ${creep} unrequested addition(s)`);
    score += creep * 6;
  }

  return { score: Math.min(100, score), flags };
}
