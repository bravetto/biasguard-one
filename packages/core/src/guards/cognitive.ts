/**
 * ∞ COGNITIVE ∞
 * 
 * The mirror of the mind's blind spots.
 * Reflects the biases we don't know we have.
 * 
 * For the teenager who wakes up.
 * For the elder who discovers.
 * For the third grader whose mind is blown.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

// =============================================================================
// COGNITIVE BIASES - The mirrors of the mind
// =============================================================================

const BIASES = [
    // HALO EFFECT - Positive bias is still bias
    {
        id: 'halo',
        name: 'Halo Effect',
        pattern: /\b(all|every)\s+\w+(\s+\w+)?\s+(are|is)\s+(so\s+)?(good|great|wonderful|amazing|beautiful|smart|kind|talented|hardworking)/i,
        reflects: "Halo Effect: A positive statement about an entire group is also bias. Good stereotypes are still stereotypes.",
        example: "All [group] are so smart/kind/beautiful"
    },
    
    // STATUS QUO BIAS - Resistance to change
    {
        id: 'status-quo',
        name: 'Status Quo Bias',
        pattern: /\b(always been|tradition|why change|worked before|if it ain't broke|never needed|always done)/i,
        reflects: "Status Quo Bias: Preferring things to stay the same, even when change might be better. Is this wisdom or fear of change?",
        example: "We've always done it this way"
    },
    
    // BEAUTY BIAS - Appearance-based judgment
    {
        id: 'beauty',
        name: 'Beauty Bias',
        pattern: /\b(attractive|good.?looking|pretty|handsome|ugly|unattractive)\s+(people|person|ones?)\s+(are|get|have|seem)/i,
        reflects: "Beauty Bias: Judging capability or character by physical appearance. Is appearance relevant here?",
        example: "Attractive people are more successful"
    },
    
    // GENDER BIAS - Gender-based assumptions
    {
        id: 'gender',
        name: 'Gender Bias',
        pattern: /\b(women|men|girls|boys|females?|males?)\s+(always|never|can't|don't|are better|are worse|should|shouldn't)/i,
        reflects: "Gender Bias: Assumptions based on gender rather than individual capability. Is gender relevant to this judgment?",
        example: "Men are better at... / Women should..."
    },
    
    // OBSERVER BIAS - Seeing what we expect
    {
        id: 'observer',
        name: 'Observer Bias',
        pattern: /\b(proves?|confirms?|shows?|demonstrates?)\s+(that\s+)?(I|we|my|our)\s+(theory|belief|point|hypothesis)/i,
        reflects: "Observer Bias: Finding evidence for what we already believe. Are you seeing truth or seeking confirmation?",
        example: "This proves my point that..."
    },
    
    // CONFIRMATION BIAS - Cherry-picking evidence
    {
        id: 'confirmation',
        name: 'Confirmation Bias',
        pattern: /\b(see|told you|knew it|exactly|proof that|evidence that|shows that)\s+.{0,20}\s+(right|correct|true|wrong)/i,
        reflects: "Confirmation Bias: Noticing evidence that supports existing beliefs while ignoring contradictions. What evidence are you NOT seeing?",
        example: "See? This proves I was right!"
    },
    
    // ANCHORING BIAS - First impression lock
    {
        id: 'anchoring',
        name: 'Anchoring Bias',
        pattern: /\b(first impression|initially|at first|originally|started at|began with)\s+.{0,30}\s+(still|remains|hasn't changed)/i,
        reflects: "Anchoring Bias: Over-relying on the first piece of information. Has anything changed since your first impression?",
        example: "My first impression was... and it hasn't changed"
    },
    
    // BANDWAGON EFFECT - Following the crowd
    {
        id: 'bandwagon',
        name: 'Bandwagon Effect',
        pattern: /\b(everyone|everybody|most people|majority|popular|trending|viral)\s+(thinks?|believes?|says?|does?|knows?)/i,
        reflects: "Bandwagon Effect: Believing something because many others do. Is popularity the same as truth?",
        example: "Everyone knows that... / Most people think..."
    },
    
    // AUTHORITY BIAS - Trusting titles over evidence
    {
        id: 'authority',
        name: 'Authority Bias',
        pattern: /\b(expert|doctor|professor|scientist|study|research)\s+(says?|shows?|proves?|claims?|found)/i,
        reflects: "Authority Bias: Accepting claims because of who says them rather than the evidence. Is the authority relevant to this specific claim?",
        example: "A study says... / Experts claim..."
    },
    
    // IN-GROUP BIAS - Favoring our tribe
    {
        id: 'in-group',
        name: 'In-Group Bias',
        pattern: /\b(we|us|our\s+people|our\s+kind|our\s+group)\s+(are|know|understand|get it|always)/i,
        reflects: "In-Group Bias: Favoring those we identify with. Are you judging based on belonging or behavior?",
        example: "Our people understand... / We always..."
    },
    
    // OUT-GROUP HOMOGENEITY - "They're all the same"
    {
        id: 'out-group',
        name: 'Out-Group Homogeneity',
        pattern: /\b(they|them|those\s+people|that\s+group)\s+(all|always|never|are\s+all)\s+/i,
        reflects: "Out-Group Homogeneity: Seeing 'them' as all the same while 'we' are individuals. Is this person representing a group or being themselves?",
        example: "They're all the same... / Those people always..."
    },
    
    // FUNDAMENTAL ATTRIBUTION ERROR - Character vs. circumstance
    {
        id: 'attribution',
        name: 'Fundamental Attribution Error',
        pattern: /\b(because\s+(they|he|she)\s+(is|are))\s+(lazy|stupid|bad|evil|incompetent|careless)/i,
        reflects: "Fundamental Attribution Error: Blaming character when circumstances might explain behavior. What situation might cause this?",
        example: "They did that because they're lazy/stupid"
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // JUDGMENT & REASONING BIASES (ChatGPT Expansion)
    // ═══════════════════════════════════════════════════════════════════
    
    // OUTCOME BIAS - Judging by result, not process
    {
        id: 'outcome',
        name: 'Outcome Bias',
        pattern: /\b(worked out|turned out|in hindsight|lucky|unlucky|good decision because|bad decision because)\b/i,
        reflects: "Outcome Bias: Judging a decision by its result rather than the quality of reasoning. Was the process sound regardless of outcome?",
        example: "It was a good decision because it worked out"
    },
    
    // ILLUSION OF EXPLANATORY DEPTH - Thinking you understand more than you do
    {
        id: 'explanatory-depth',
        name: 'Illusion of Explanatory Depth',
        pattern: /\b(it's simple|basically just|all you need|anyone can|not that complicated|easy to understand|obviously works by)\b/i,
        reflects: "Illusion of Explanatory Depth: Believing you understand a complex topic better than you do. Could you actually explain the mechanism?",
        example: "It's simple, basically just..."
    },
    
    // NAÏVE REALISM - "I see reality, you're biased"
    {
        id: 'naive-realism',
        name: 'Naïve Realism',
        pattern: /\b(objectively|clearly|obviously|any reasonable person|anyone can see|it's just fact|common sense|plain to see)\b/i,
        reflects: "Naïve Realism: Assuming your perception is objective while others are biased. Is this truly objective or your perspective?",
        example: "Any reasonable person can see that..."
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // INFORMATION PROCESSING BIASES
    // ═══════════════════════════════════════════════════════════════════
    
    // NEGATIVITY BIAS - Bad outweighs good
    {
        id: 'negativity',
        name: 'Negativity Bias',
        pattern: /\b(ruined|destroyed|terrible|awful|worst|disaster|catastrophe|never recover|can't forget)\b/i,
        reflects: "Negativity Bias: Giving more weight to negative information than positive. Is this truly catastrophic or are positives being ignored?",
        example: "One bad review ruined everything"
    },
    
    // SALIENCE BIAS - Vivid details dominate
    {
        id: 'salience',
        name: 'Salience Bias',
        pattern: /\b(striking|memorable|stood out|can't stop thinking|vivid|dramatic|shocking|unforgettable)\b/i,
        reflects: "Salience Bias: Overfocusing on vivid or emotionally striking details. Is this representative or just memorable?",
        example: "That one shocking case stood out"
    },
    
    // OMISSION BIAS - Inaction feels safer
    {
        id: 'omission',
        name: 'Omission Bias',
        pattern: /\b(didn't do anything|chose not to|decided against|let it happen|stayed out|didn't intervene|not my place)\b/i,
        reflects: "Omission Bias: Preferring inaction over action even when harm is equivalent. Is not acting actually more ethical here?",
        example: "I didn't do anything, so I'm not responsible"
    },
    
    // AUTOMATION BIAS - Over-trusting machines (CRITICAL FOR AI)
    {
        id: 'automation',
        name: 'Automation Bias',
        pattern: /\b(the (system|algorithm|AI|computer|model) (says|shows|indicates|recommends|suggests)|according to the (data|system|model)|the numbers say)\b/i,
        reflects: "⚠️ Automation Bias: Over-trusting automated systems even when they may be wrong. Should human judgment override here?",
        example: "The algorithm says they're high-risk"
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // TEMPORAL BIASES
    // ═══════════════════════════════════════════════════════════════════
    
    // PRESENT BIAS - Now trumps later
    {
        id: 'present',
        name: 'Present Bias',
        pattern: /\b(right now|immediately|can't wait|need it today|short.?term|instant|asap|urgent)\b/i,
        reflects: "Present Bias: Overvaluing immediate outcomes over long-term consequences. What's the long-term impact?",
        example: "We need results right now"
    },
    
    // PROJECTION BIAS - Others think like me
    {
        id: 'projection',
        name: 'Projection Bias',
        pattern: /\b(everyone (thinks|feels|knows|wants)|who wouldn't|anyone would|nobody would|normal people)\b/i,
        reflects: "Projection Bias: Assuming others share your current beliefs or values. Do they actually feel this way?",
        example: "Everyone thinks this is a good idea"
    },
];

// =============================================================================
// COGNITIVE GUARD - The mind's mirror
// =============================================================================

export interface CognitiveReflection extends Reflection {
    biasId: string;
    biasName: string;
    example: string;
}

export function cognitive(input: string): CognitiveReflection | null {
    const lower = input.toLowerCase();
    
    for (const bias of BIASES) {
        if (bias.pattern.test(input)) {
            return {
                mirror: "Cognitive",
                sees: input.slice(0, 100),
                reflects: bias.reflects,
                clarity: 0.8,
                biasId: bias.id,
                biasName: bias.name,
                example: bias.example
            };
        }
    }
    return null;
}

/**
 * Get all cognitive biases (for educational display)
 */
export function getAllBiases() {
    return BIASES.map(b => ({
        id: b.id,
        name: b.name,
        reflects: b.reflects,
        example: b.example
    }));
}

// =============================================================================
// ∞ AbëFLOWs ∞
//
// The teenager sees HALO EFFECT → Mind blown
// The elder sees STATUS QUO BIAS → Discovers
// The third grader sees BEAUTY BIAS → Seeds planted
//
// Not blocking. Reflecting.
// Not judging. Teaching.
// Not punishing. Freeing.
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
