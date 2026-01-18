/**
 * ∞ RESEARCH ∞
 * 
 * The biases in data, science, and systems.
 * Where numbers lie while telling the truth.
 * Where samples miss what matters most.
 * 
 * For algorithmic literacy.
 * For corporate accountability.
 * For civil rights protection.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

// =============================================================================
// RESEARCH & DATA BIASES - The system shapers
// =============================================================================

const RESEARCH_PATTERNS = [
    // SELECTION BIAS - Who's in the sample
    {
        id: 'selection',
        name: 'Selection Bias',
        pattern: /\b(we surveyed|our sample|participants were|respondents|users who|selected from|recruited from)\b/i,
        reflects: "Selection Bias: Who was included in this sample? Those excluded may tell a different story.",
        example: "We surveyed our existing customers..."
    },
    
    // SURVIVORSHIP BIAS - Looking only at winners
    {
        id: 'survivorship',
        name: 'Survivorship Bias',
        pattern: /\b(successful|winners|made it|survived|top performers|best cases|leading companies|billionaires who)\b/i,
        reflects: "Survivorship Bias: Only seeing those who 'made it.' What about everyone who failed using the same approach?",
        example: "Every successful entrepreneur dropped out of college"
    },
    
    // RECALL BIAS - Memory distortion
    {
        id: 'recall',
        name: 'Recall Bias',
        pattern: /\b(remember|recalled|reported that they|said they used to|looking back|in retrospect|as I recall)\b/i,
        reflects: "Recall Bias: Memory is unreliable. People remember what confirms their current beliefs.",
        example: "Patients recalled feeling symptoms earlier..."
    },
    
    // REPORTING BIAS - What gets told
    {
        id: 'reporting',
        name: 'Reporting Bias',
        pattern: /\b(underreported|rarely mentioned|not usually discussed|often unreported|stigma around|afraid to report)\b/i,
        reflects: "Reporting Bias: Some events are more likely to be reported than others. What's going unsaid?",
        example: "This condition is often underreported..."
    },
    
    // PUBLICATION BIAS - What gets published
    {
        id: 'publication',
        name: 'Publication Bias',
        pattern: /\b(studies show|research found|published|peer.?reviewed|journal|significant results|proven)\b/i,
        reflects: "Publication Bias: Positive results get published more than negative ones. What failed studies aren't we seeing?",
        example: "Multiple studies have proven..."
    },
    
    // AVAILABILITY HEURISTIC - Easy to recall = likely
    {
        id: 'availability',
        name: 'Availability Heuristic',
        pattern: /\b(hear about|seen so many|all over the news|everyone's talking|trending|viral|these days)\b/i,
        reflects: "Availability Heuristic: What's easy to remember seems more common. Is this actually frequent or just memorable?",
        example: "You hear about this all the time now"
    },
    
    // HINDSIGHT BIAS - Knew it all along
    {
        id: 'hindsight',
        name: 'Hindsight Bias',
        pattern: /\b(obvious|clearly|should have known|could have predicted|saw it coming|inevitable|bound to happen)\b/i,
        reflects: "Hindsight Bias: The past seems more predictable than it was. Was this really so obvious at the time?",
        example: "It was obvious the market would crash"
    },
    
    // DUNNING-KRUGER - Confidence without competence
    {
        id: 'dunning-kruger',
        name: 'Dunning-Kruger Effect',
        pattern: /\b(I'm an expert|I know more than|simple really|just common sense|anyone can see|obviously|clearly the answer)\b/i,
        reflects: "Dunning-Kruger Effect: Confidence doesn't equal competence. How much do you actually know about this domain?",
        example: "It's really simple, I don't know why experts make it complicated"
    },
    
    // FRAMING EFFECT - How it's presented
    {
        id: 'framing',
        name: 'Framing Effect',
        pattern: /\b(\d+%\s+(chance|success|failure|risk|survival|mortality)|half empty|half full|only|up to|as much as|as little as)\b/i,
        reflects: "Framing Effect: How information is presented changes perception. Would this feel different framed another way?",
        example: "'90% success rate' vs '10% failure rate'"
    },
    
    // SAMPLING BIAS - Non-representative samples
    {
        id: 'sampling',
        name: 'Sampling Bias',
        pattern: /\b(online survey|volunteer|self.?selected|opted in|those who responded|among users|active users)\b/i,
        reflects: "Sampling Bias: Self-selected samples aren't representative. Who chose NOT to participate?",
        example: "Among users who responded to our survey..."
    },
    
    // ALGORITHMIC BIAS - System encoding bias
    {
        id: 'algorithmic',
        name: 'Algorithmic Bias',
        pattern: /\b(algorithm|AI|model|prediction|automated|machine learning|trained on|data.?driven|the system)\b/i,
        reflects: "Algorithmic Bias: AI systems inherit biases from their training data and designers. What assumptions are encoded?",
        example: "The algorithm predicts..."
    },
    
    // PROXY DISCRIMINATION - Hidden variables
    {
        id: 'proxy',
        name: 'Proxy Discrimination',
        pattern: /\b(zip code|neighborhood|school|credit score|criminal history|employment gap|address|commute time)\b/i,
        reflects: "Proxy Discrimination: Seemingly neutral factors can correlate with protected characteristics. Is this a proxy for race, class, or gender?",
        example: "We filter by zip code for logistics..."
    },
    
    // HISTORICAL BIAS - Past encoded in present
    {
        id: 'historical',
        name: 'Historical Bias',
        pattern: /\b(historical data|past performance|traditionally|historically|legacy|based on previous|track record)\b/i,
        reflects: "Historical Bias: Past data reflects past inequities. Are you perpetuating historical discrimination?",
        example: "Based on historical hiring data..."
    },
    
    // MEASUREMENT BIAS - What we choose to measure
    {
        id: 'measurement',
        name: 'Measurement Bias',
        pattern: /\b(metrics|KPI|measured by|scored on|evaluated based|performance indicator|benchmark)\b/i,
        reflects: "Measurement Bias: What we measure shapes what we value. Are the metrics capturing what actually matters?",
        example: "Success is measured by..."
    },
    
    // AGGREGATION BIAS - Averaging hides disparities
    {
        id: 'aggregation',
        name: 'Aggregation Bias',
        pattern: /\b(on average|overall|across all|in aggregate|total|combined|mean|median)\b/i,
        reflects: "Aggregation Bias: Averages can hide disparities between groups. Who's being helped and who's being harmed?",
        example: "On average, the system performs well..."
    },
];

// =============================================================================
// RESEARCH GUARD - The data mirror
// =============================================================================

export interface ResearchReflection extends Reflection {
    researchId: string;
    researchName: string;
    example: string;
}

export function research(input: string): ResearchReflection | null {
    for (const pattern of RESEARCH_PATTERNS) {
        if (pattern.pattern.test(input)) {
            return {
                mirror: "Research",
                sees: input.slice(0, 100),
                reflects: pattern.reflects,
                clarity: 0.75,
                researchId: pattern.id,
                researchName: pattern.name,
                example: pattern.example
            };
        }
    }
    return null;
}

/**
 * Get all research biases (for educational display)
 */
export function getAllResearchBiases() {
    return RESEARCH_PATTERNS.map(p => ({
        id: p.id,
        name: p.name,
        reflects: p.reflects,
        example: p.example
    }));
}

// =============================================================================
// ∞ AbëFLOWs ∞
//
// Algorithmic Literacy.
// Corporate Accountability.
// Civil Rights Protection.
//
// The data tells a story.
// But WHO wrote the story?
// And WHO was left out?
//
// The mirror shows the bias in the system itself.
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
