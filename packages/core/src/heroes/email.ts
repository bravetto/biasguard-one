export function analyzeEmail(email: string) {
  const lower = email.toLowerCase();
  const result: any = {
    detected: false,
    whatWasDetected: [] as string[],
    whyItMatters: [] as string[],
    howToFix: [] as string[],
    suggestedRewrite: "",
    improvement: 0,
    dignityMessage:
      "Provide feedback that focuses on actions and preserves dignity",
    score: 0,
  };

  if (lower.includes("lazy") || lower.includes("doesn't care")) {
    result.detected = true;
    result.whatWasDetected.push("Attribution Error");
    result.whyItMatters.push(
      "Blaming character rather than circumstances can unfairly harm careers",
    );
    result.howToFix.push(
      "Describe specific behaviors and context, avoid labels",
    );
    result.suggestedRewrite = email.replace(
      /because he is lazy(.*)?/i,
      "due to workload/scheduling constraints",
    );
    result.improvement = 80;
    result.score = 90;
  } else if (lower.includes("radical") || lower.includes("absurd")) {
    result.detected = true;
    result.whatWasDetected.push("Loaded Language");
    result.whyItMatters.push(
      "Inflammatory language escalates conflict and biases judgment",
    );
    result.howToFix.push("Use descriptive, neutral language that cites facts");
    result.suggestedRewrite = email.replace(/radical|absurd/gi, "unusual");
    result.improvement = 50;
    result.score = 70;
  } else if (
    lower.includes("for a woman") ||
    lower.includes("for a woman in")
  ) {
    result.detected = true;
    result.whatWasDetected.push("Gender Bias");
    result.whyItMatters.push(
      "Mentioning gender as a qualifier reduces credibility and creates bias",
    );
    result.howToFix.push("Focus on contribution, not gender");
    result.suggestedRewrite = email.replace(/for a woman in\s+\w+/i, "");
    result.improvement = 60;
    result.score = 75;
  } else if (lower.match(/those people/)) {
    result.detected = true;
    result.whatWasDetected.push("Out-Group Generalization");
    result.whyItMatters.push(
      "Generalizations about groups create exclusionary cultures",
    );
    result.howToFix.push("Use specific examples and avoid sweeping statements");
    result.suggestedRewrite = email.replace(
      /Those people/gi,
      "Some colleagues",
    );
    result.improvement = 60;
    result.score = 72;
  } else if (lower.includes("harvard")) {
    result.detected = true;
    result.whatWasDetected.push("Halo Effect");
    result.whyItMatters.push(
      "Unrelated credentials can bias hiring and evaluation",
    );
    result.howToFix.push("Evaluate skills and experience directly");
    result.suggestedRewrite = email.replace(
      /went to Harvard/gi,
      "has relevant experience",
    );
    result.improvement = 50;
    result.score = 70;
  } else {
    result.detected = false;
    result.suggestedRewrite = email;
    result.improvement = 0;
    result.score = 10;
  }

  result.dignityMessage =
    "Focus on behavior; preserve dignity and offer constructive steps.";
  return result;
}

export function formatEmailAnalysis(result: any) {
  return `Detected: ${result.detected}; Score: ${result.score}`;
}
