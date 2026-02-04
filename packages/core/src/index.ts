/**
 * @biasguard/core
 *
 * Platform-agnostic bias detection and epistemic validation.
 * Use in VS Code, CLI, API servers, browsers, or anywhere JavaScript runs.
 */

// Guards - Epistemic validation modules
export * from './guards';

// Adversarial - Testing and attack simulation
export * as adversarial from './adversarial';

// Ontology - Bias taxonomy and definitions (excluding Severity to avoid conflict with guards)
export {
    BIAS_ONTOLOGY,
    getBias,
    getBiasesByCategory,
    getBiasesBySeverity,
    getBiasesByDomain,
    getAllBiasIds,
    ONTOLOGY_STATS,
    BiasEntry,
    BiasCategory,
    ImpactDomain,
    Correctability
} from './ontology';

// Security - MCP protection engine
export * from './security';

// ONE - Core unified logic (named exports to avoid conflict with security.one)
export {
    BiasGuardResult,
    oneFormatted,
    forVSCode,
    forChrome,
    forLLM,
    forApp
} from './one';
export * from './verbosity-detector';
