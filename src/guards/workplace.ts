/**
 * ∞ WORKPLACE ∞
 * 
 * The biases that shape careers.
 * The invisible walls that block paths.
 * The patterns that determine who rises.
 * 
 * For fairer hiring landscapes.
 * For equitable promotion paths.
 * For the career that should have been.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { Reflection } from './reflect';

// =============================================================================
// WORKPLACE BIASES - The career shapers
// =============================================================================

const WORKPLACE_PATTERNS = [
    // AFFINITY BIAS - Like attracts like
    {
        id: 'affinity',
        name: 'Affinity Bias',
        pattern: /\b(reminds me of|just like me|we clicked|good chemistry|my kind of person|went to the same|from the same)\b/i,
        reflects: "Affinity Bias: Favoring those who remind you of yourself. Is similarity the same as competence?",
        example: "They remind me of myself when I was starting out"
    },
    
    // CONFORMITY BIAS - Group pressure
    {
        id: 'conformity',
        name: 'Conformity Bias',
        pattern: /\b(everyone agrees|the team thinks|we all feel|consensus is|nobody disagrees|group decision)\b/i,
        reflects: "Conformity Bias: Aligning with group opinion rather than independent judgment. What if the group is wrong?",
        example: "Everyone on the team agrees they're not a fit"
    },
    
    // CONTRAST EFFECT - Relative judgment
    {
        id: 'contrast',
        name: 'Contrast Effect',
        pattern: /\b(compared to|better than the last|not as good as|relative to|after seeing|following that)\b/i,
        reflects: "Contrast Effect: Judging someone relative to who came before rather than on their own merits. Are you comparing fairly?",
        example: "They were much better than the last candidate"
    },
    
    // HALO EFFECT (workplace context)
    {
        id: 'halo-workplace',
        name: 'Workplace Halo Effect',
        pattern: /\b(went to|graduated from|worked at|came from|former|alumni|pedigree|prestigious)\s+(harvard|stanford|yale|mit|google|mckinsey|goldman)/i,
        reflects: "Halo Effect: Assuming competence based on prestigious associations. Does their background guarantee job performance?",
        example: "They went to Harvard, so they must be good"
    },
    
    // HORNS EFFECT - One bad trait taints all
    {
        id: 'horns',
        name: 'Horns Effect',
        pattern: /\b(can't get past|deal.?breaker|red flag|concerning that|worried because|one thing bothers me)\b/i,
        reflects: "Horns Effect: Letting one negative trait overshadow everything else. Is this flaw actually relevant to performance?",
        example: "I can't get past the fact that they..."
    },
    
    // RECENCY BIAS - Latest = strongest
    {
        id: 'recency',
        name: 'Recency Bias',
        pattern: /\b(just recently|this quarter|latest|most recent|last week|yesterday|fresh in mind)\b/i,
        reflects: "Recency Bias: Overweighting recent events in judgment. Does their whole body of work support this?",
        example: "They just had a great quarter"
    },
    
    // PRIMACY BIAS - First impression locks
    {
        id: 'primacy',
        name: 'Primacy Bias',
        pattern: /\b(first impression|from the start|right away|immediately|from day one|initial meeting)\b/i,
        reflects: "Primacy Bias: Over-relying on first impressions. Have they grown or changed since then?",
        example: "My first impression was..."
    },
    
    // PERFORMANCE ATTRIBUTION - Success explained by identity
    {
        id: 'performance-attribution',
        name: 'Performance Attribution Bias',
        pattern: /\b(for a|despite being|considering they're|given that they|surprising for|impressive for a)\b/i,
        reflects: "Performance Attribution: Qualifying achievement based on identity. Would you say this about anyone?",
        example: "They did great for a [demographic]"
    },
    
    // PROVE-IT-AGAIN - Extra burden
    {
        id: 'prove-it-again',
        name: 'Prove-It-Again Bias',
        pattern: /\b(need to see more|still not convinced|one more|prove themselves|demonstrate again|show us again)\b/i,
        reflects: "Prove-It-Again Bias: Requiring repeated proof of competence. Would you ask this of everyone?",
        example: "They need to prove themselves again"
    },
    
    // TIGHTROPE - Narrow acceptable behavior
    {
        id: 'tightrope',
        name: 'Tightrope Bias',
        pattern: /\b(too aggressive|not aggressive enough|too soft|too emotional|too cold|too ambitious|not ambitious enough)\b/i,
        reflects: "Tightrope Bias: Expecting a narrow range of 'acceptable' behavior. Would this feedback apply to anyone?",
        example: "They're too aggressive / not assertive enough"
    },
    
    // MATERNAL WALL - Parenthood penalty
    {
        id: 'maternal-wall',
        name: 'Maternal Wall Bias',
        pattern: /\b(new parent|just had|expecting|pregnant|maternity|paternity|family commitments|young kids)\b/i,
        reflects: "Maternal Wall: Assuming parental status affects work commitment. Are you making assumptions about availability?",
        example: "She just had a baby, so she won't want to travel"
    },
    
    // NAME BIAS - Judging by name
    {
        id: 'name',
        name: 'Name Bias',
        pattern: /\b(hard to pronounce|unusual name|never heard that|what kind of name|foreign.?sounding)\b/i,
        reflects: "Name Bias: Making assumptions based on a name's sound or origin. Is this relevant to their qualifications?",
        example: "That's an unusual name - where are they from?"
    },
    
    // AGE BIAS - Generational assumptions
    {
        id: 'age',
        name: 'Age Bias',
        pattern: /\b(millennial|boomer|gen.?z|too young|too old|their generation|at their age|digital native|not tech.?savvy)\b/i,
        reflects: "Age Bias: Assuming capabilities based on generation. Are you judging the individual or a stereotype?",
        example: "Millennials don't know how to work hard"
    },
    
    // BEAUTY BIAS (workplace)
    {
        id: 'appearance',
        name: 'Appearance Bias',
        pattern: /\b(looks professional|doesn't look|presentable|appearance|dress|grooming|polished|put.?together)\b/i,
        reflects: "Appearance Bias: Judging competence by looks. Is appearance actually relevant to the role?",
        example: "They don't look like a senior executive"
    },
];

// =============================================================================
// WORKPLACE GUARD - The career mirror
// =============================================================================

export interface WorkplaceReflection extends Reflection {
    workplaceId: string;
    workplaceName: string;
    example: string;
}

export function workplace(input: string): WorkplaceReflection | null {
    for (const pattern of WORKPLACE_PATTERNS) {
        if (pattern.pattern.test(input)) {
            return {
                mirror: "Workplace",
                sees: input.slice(0, 100),
                reflects: pattern.reflects,
                clarity: 0.8,
                workplaceId: pattern.id,
                workplaceName: pattern.name,
                example: pattern.example
            };
        }
    }
    return null;
}

/**
 * Get all workplace biases (for educational display)
 */
export function getAllWorkplaceBiases() {
    return WORKPLACE_PATTERNS.map(p => ({
        id: p.id,
        name: p.name,
        reflects: p.reflects,
        example: p.example
    }));
}

// =============================================================================
// ∞ AbëFLOWs ∞
//
// Fairer Hiring Landscapes.
// Equitable Promotion Paths.
// Better Leadership.
// Professional Reputation.
//
// The career that SHOULD have been.
// The opportunity that WAS missed.
// The potential that WAS unseen.
//
// Until the mirror showed the truth.
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
