import {
  detectCrossTurnInconsistency,
  detectDirectiveDeflection,
  detectVerbosityUnderPressure,
} from "../packages/core/src/guards/behavioral.ts";
import { ConversationTurn } from "../packages/core/src/verbosity-detector.ts";

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

console.log("\nBehavioral Guards");

// Cross-turn inconsistency
test("Detects confidence flip without reconciliation", () => {
  const convo: ConversationTurn[] = [
    { role: "human", content: "How confident are you?" },
    {
      role: "assistant",
      content: "I'm not sure, I don't know if this will work",
    },
    {
      role: "assistant",
      content: "I know exactly how to fix this; definitely run npm test",
    },
  ];

  const res = detectCrossTurnInconsistency(convo);
  assert(res.detected === true, "Should detect inconsistency");
});

// Directive -> deflection
test("Detects directive followed by deflection", () => {
  const human: ConversationTurn = {
    role: "human",
    content: "Run the tests now",
  };
  const assistant: ConversationTurn = {
    role: "assistant",
    content: "What would you like me to do?",
  };

  const res = detectDirectiveDeflection(human, assistant);
  assert(res.detected === true, "Should detect directive-deflection");
});

// Verbosity under pressure
test("Detects verbosity under pressure when challenged", () => {
  const prev = "Run npm test and report failures.";
  const curr =
    "However, it's important to note that the test suite might fail due to environment issues; you should also check dependencies, configuration, CI logs, flakiness, and potential race conditions. In many cases, running with --runInBand helps. Also, perhaps consider additional retries and better isolation.";

  const res = detectVerbosityUnderPressure(prev, curr, true);
  assert(
    res.detected === true,
    "Should detect verbosity spike under challenge",
  );
});

console.log(`\nResults: Passed ${passed}, Failed ${failed}`);
if (failed > 0) process.exit(1);
else process.exit(0);
