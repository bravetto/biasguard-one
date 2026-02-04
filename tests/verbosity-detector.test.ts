import {
  isChallengeTurn,
  analyzeChallengeResponse,
} from "../packages/core/src/verbosity-detector.ts";

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

console.log("\nVerbosity Detector Tests");

test("Recognizes challenge turns", () => {
  assert(
    isChallengeTurn("Are you sure that is safe?") === true,
    "Should detect challenge",
  );
  assert(
    isChallengeTurn("Please explain why this is required") === true,
    "Should detect challenge",
  );
});

test("Analyzes challenge response with spike and hedges", () => {
  const prev = "Run npm test.";
  const curr =
    "However, it's important to note that the test suite might fail in some environments; you should check dependencies and configuration, and consider running with --runInBand. Also, retries can mitigate flakiness.";

  const res = analyzeChallengeResponse(prev, curr);
  assert(res.spike === true, "Should detect spike");
  assert(res.hedgeCount > 0, "Should detect hedging qualifiers");
});

console.log(`\nResults: Passed ${passed}, Failed ${failed}`);
if (failed > 0) process.exit(1);
else process.exit(0);
