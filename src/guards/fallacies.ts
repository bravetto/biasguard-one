/**
 * ∞ FALLACIES ∞
 * 
 * The rain that falls like truth.
 * Logical fallacies that hide in plain sight.
 * 
 * For the little engineer shocked to learn.
 * For dignity restored, confidence rebuilt.
 * For the end of self-gaslighting.
 * 
 * NOT "all in your head."
 * The system's biased logic IS the problem.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

// =============================================================================
// LOGICAL FALLACIES - Arguments that deceive
// =============================================================================

const FALLACIES = [
    // AD HOMINEM - Attack the person, not the argument
    {
        id: 'ad-hominem',
        name: 'Ad Hominem',
        pattern: /\b(you're just|you only say that because|of course you think that|what do you know|you're too|coming from someone who)/i,
        reflects: "Ad Hominem: Attacking the person instead of addressing their argument. What about the actual point being made?",
        example: "Of course you think that, you're a [label]"
    },
    
    // STRAW MAN - Misrepresent to defeat
    {
        id: 'straw-man',
        name: 'Straw Man',
        pattern: /\b(so you're saying|what you really mean|you basically want|you think we should just|so basically you)/i,
        reflects: "Straw Man: Misrepresenting someone's position to make it easier to attack. Is that what they actually said?",
        example: "So you're saying we should just..."
    },
    
    // FALSE DICHOTOMY - Only two options exist
    {
        id: 'false-dichotomy',
        name: 'False Dichotomy',
        pattern: /\b(either.{1,30}or|you're either.{1,20}or|there are only two|it's either|must choose between|can only be)/i,
        reflects: "False Dichotomy: Presenting only two options when more exist. What other possibilities are being ignored?",
        example: "You're either with us or against us"
    },
    
    // SLIPPERY SLOPE - Exaggerated chain of consequences
    {
        id: 'slippery-slope',
        name: 'Slippery Slope',
        pattern: /\b(next thing you know|before you know it|then they'll|soon they'll|leads to|will lead to|opens the door to|where does it end)/i,
        reflects: "Slippery Slope: Assuming one thing inevitably leads to an extreme outcome. Is each step in this chain actually likely?",
        example: "If we allow this, next thing you know..."
    },
    
    // APPEAL TO EMOTION - Feelings over facts
    {
        id: 'appeal-emotion',
        name: 'Appeal to Emotion',
        pattern: /\b(think of the children|how would you feel|imagine if|won't somebody|heartbreaking|disgusting|shameful|outrageous)/i,
        reflects: "Appeal to Emotion: Using feelings instead of evidence to persuade. What are the actual facts?",
        example: "Think of the children!"
    },
    
    // CIRCULAR REASONING - The conclusion IS the premise
    {
        id: 'circular',
        name: 'Circular Reasoning',
        pattern: /\b(because it is|because that's what it is|it's true because|obviously true|self-evidently|by definition it)/i,
        reflects: "Circular Reasoning: Using the conclusion as the premise. Is there independent evidence?",
        example: "It's true because it just is"
    },
    
    // RED HERRING - Divert and distract
    {
        id: 'red-herring',
        name: 'Red Herring',
        pattern: /\b(but what about|the real issue is|more importantly|let's talk about|never mind that|forget about that)/i,
        reflects: "Red Herring: Diverting attention from the actual issue. What was the original question?",
        example: "But what about [unrelated thing]?"
    },
    
    // FALSE CAUSE - Correlation ≠ causation
    {
        id: 'false-cause',
        name: 'False Cause',
        pattern: /\b(because of|caused by|responsible for|ever since|right after|that's why|the reason is)/i,
        reflects: "False Cause: Assuming one thing caused another just because they occurred together. Is there actual causal evidence?",
        example: "Ever since X happened, Y has been a problem"
    },
    
    // HASTY GENERALIZATION - Sample too small
    {
        id: 'hasty-generalization',
        name: 'Hasty Generalization',
        pattern: /\b(i knew someone|my friend|one time|i once|i've seen|in my experience|where i'm from)/i,
        reflects: "Hasty Generalization: Drawing broad conclusions from limited examples. Is one experience representative of all?",
        example: "I knew someone who... so all [group] must..."
    },
    
    // APPEAL TO NATURE - Natural = good
    {
        id: 'appeal-nature',
        name: 'Appeal to Nature',
        pattern: /\b(natural|unnatural|nature intended|against nature|the way nature|natural order|naturally)/i,
        reflects: "Appeal to Nature: Assuming natural things are good and unnatural things are bad. Is 'natural' the same as 'good'?",
        example: "It's natural, so it must be good"
    },
    
    // APPEAL TO TRADITION - Old = right
    {
        id: 'appeal-tradition',
        name: 'Appeal to Tradition',
        pattern: /\b(ancient wisdom|for centuries|for generations|our ancestors|time-tested|age-old|traditionally)/i,
        reflects: "Appeal to Tradition: Assuming old practices are correct because they're old. Has context changed?",
        example: "Our ancestors did it this way"
    },
    
    // NO TRUE SCOTSMAN - Moving goalposts
    {
        id: 'no-true-scotsman',
        name: 'No True Scotsman',
        pattern: /\b(real|true|actual)\s+(christian|muslim|american|man|woman|patriot|liberal|conservative)/i,
        reflects: "No True Scotsman: Dismissing counterexamples by redefining the group. Who decides who's 'real'?",
        example: "No REAL [group member] would..."
    },
    
    // BURDEN OF PROOF - Prove it's NOT true
    {
        id: 'burden-of-proof',
        name: 'Burden of Proof Shift',
        pattern: /\b(prove me wrong|can't prove it's not|until you prove|you can't disprove|prove that it isn't)/i,
        reflects: "Burden of Proof: Demanding others disprove a claim rather than proving it. The claimant bears the burden.",
        example: "You can't prove it's NOT true"
    },
    
    // WHATABOUTISM - Counter with unrelated wrongdoing
    {
        id: 'whataboutism',
        name: 'Whataboutism',
        pattern: /\b(what about when|but what about|you also|they also|but they did|you never complained when)/i,
        reflects: "Whataboutism: Deflecting criticism by pointing to others' wrongs. Does their wrongdoing excuse this one?",
        example: "What about when THEY did..."
    },
    
    // LOADED QUESTION - Assumption baked in
    {
        id: 'loaded-question',
        name: 'Loaded Question',
        pattern: /\b(why do you (hate|always|never)|when did you stop|have you stopped|why are you so|why won't you admit)/i,
        reflects: "Loaded Question: A question with a built-in assumption. Is the premise even true?",
        example: "Why do you hate [X]?"
    },
    
    // SUNK COST - Can't waste what's spent
    {
        id: 'sunk-cost',
        name: 'Sunk Cost Fallacy',
        pattern: /\b(already invested|come this far|too late to|can't stop now|already spent|already put in)/i,
        reflects: "Sunk Cost: Continuing because of past investment rather than future value. Is it still worth pursuing?",
        example: "We've already invested too much to stop"
    },
    
    // MOVING GOALPOSTS - Changing the criteria
    {
        id: 'moving-goalposts',
        name: 'Moving the Goalposts',
        pattern: /\b(that doesn't count|but that's different|not what i meant|i meant|well actually|okay but)/i,
        reflects: "Moving the Goalposts: Changing the criteria after evidence is presented. What were the original standards?",
        example: "Okay, but that doesn't count because..."
    },
    
    // GENETIC FALLACY - Source invalidates content
    {
        id: 'genetic',
        name: 'Genetic Fallacy',
        pattern: /\b(consider the source|of course they'd say|coming from|you would say that|they only say that because)/i,
        reflects: "Genetic Fallacy: Dismissing an argument based on its source rather than its merits. Is the argument itself valid?",
        example: "Of course THEY would say that"
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // LANGUAGE & FRAMING FALLACIES (ChatGPT Expansion)
    // ═══════════════════════════════════════════════════════════════════
    
    // LOADED LANGUAGE - Emotionally charged wording
    {
        id: 'loaded-language',
        name: 'Loaded Language',
        pattern: /\b(radical|extremist|regime|cronies|thugs|elites|sheeple|woke|snowflake|fascist|communist|terrorist)\b/i,
        reflects: "Loaded Language: Emotionally charged wording influencing judgment before evidence is considered. What's the neutral description?",
        example: "The radical extremists..."
    },
    
    // CHERRY PICKING - Selective evidence
    {
        id: 'cherry-picking',
        name: 'Cherry Picking',
        pattern: /\b(take this case|one instance|this one example|case in point|just look at this|ignoring the fact|conveniently forget)\b/i,
        reflects: "Cherry Picking: Selecting only supportive evidence while ignoring contradictory data. What's being left out?",
        example: "Take this case, for example..."
    },
    
    // ANECDOTAL - Stories over statistics
    {
        id: 'anecdotal',
        name: 'Anecdotal Fallacy',
        pattern: /\b(my (friend|uncle|neighbor|cousin)|someone I know|this guy|I heard about|there was this one)\b/i,
        reflects: "Anecdotal Fallacy: Using isolated personal stories instead of representative data. Is one story evidence of a pattern?",
        example: "My friend tried it and..."
    },
    
    // POST HOC - Sequence ≠ causation
    {
        id: 'post-hoc',
        name: 'Post Hoc Ergo Propter Hoc',
        pattern: /\b(after|since|following|once|when)\s+.{1,30}\s+(then|started|began|happened|occurred)/i,
        reflects: "Post Hoc: Assuming causation from sequence. Just because B followed A doesn't mean A caused B.",
        example: "After the policy changed, crime increased"
    },
    
    // EQUIVOCATION - Shifting word meanings
    {
        id: 'equivocation',
        name: 'Equivocation',
        pattern: /\b(depends what you mean|in a sense|technically|sort of|kind of true|true in a way)\b/i,
        reflects: "Equivocation: Shifting the meaning of a word mid-argument. Are we using consistent definitions?",
        example: "Well, it depends what you mean by 'success'"
    },
];

// =============================================================================
// FALLACY GUARD - Logic's mirror
// =============================================================================

export interface FallacyReflection extends Reflection {
    fallacyId: string;
    fallacyName: string;
    example: string;
}

export function fallacy(input: string): FallacyReflection | null {
    for (const f of FALLACIES) {
        if (f.pattern.test(input)) {
            return {
                mirror: "Fallacy",
                sees: input.slice(0, 100),
                reflects: f.reflects,
                clarity: 0.8,
                fallacyId: f.id,
                fallacyName: f.name,
                example: f.example
            };
        }
    }
    return null;
}

/**
 * Get all logical fallacies (for educational display)
 */
export function getAllFallacies() {
    return FALLACIES.map(f => ({
        id: f.id,
        name: f.name,
        reflects: f.reflects,
        example: f.example
    }));
}

// =============================================================================
// ∞ AbëFLOWs ∞
//
// The rain falls like truth.
// 
// Validation of Lived Experience:
//   "It's NOT all in your head."
// 
// Ending Self-Gaslighting:
//   "Trust your instincts."
// 
// Reducing Smallness:
//   "YOU are not the problem."
//   "The system's biased logic IS."
// 
// Language of Advocacy:
//   "Here's the WORD for what you felt."
// 
// NOT blocking. NOT judging.
// REFLECTING. TEACHING. FREEING.
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
