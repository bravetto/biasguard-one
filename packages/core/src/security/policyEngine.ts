export enum ResultType {
  PASS = "PASS",
  FAIL = "FAIL",
  WARN = "WARN",
}

export function evaluateText(input: string): {
  status: ResultType;
  invariantId?: string;
} {
  const text = input.toLowerCase();

  // EXEC-01: package manager / remote execution checks
  if (/npm install|pip install|docker run/.test(text)) {
    // If repo exemption present (git rev-parse) for npm case, allow
    if (/git rev-parse/.test(text) && /npm install/.test(text)) {
      return { status: ResultType.PASS };
    }
    return { status: ResultType.FAIL, invariantId: "EXEC-01" };
  }

  // GIT-01: references to "this repo" require git context
  if (text.includes("this repo")) {
    if (/git rev-parse/.test(text)) return { status: ResultType.PASS };
    return { status: ResultType.FAIL, invariantId: "GIT-01" };
  }

  // ASSUME-01
  if (text.includes("as discussed earlier")) {
    return { status: ResultType.FAIL, invariantId: "ASSUME-01" };
  }

  // LAYER-01: "workspace" + run
  if (text.includes("workspace") && text.includes("run")) {
    return { status: ResultType.FAIL, invariantId: "LAYER-01" };
  }

  // MODE-01
  if (text.includes("run") && !text.includes("mode")) {
    return { status: ResultType.FAIL, invariantId: "MODE-01" };
  }

  return { status: ResultType.PASS };
}
