/**
 * ∞ BIAS ONTOLOGY v0.1 ∞
 * 
 * The SPINE of the system.
 * Not a list. A STRUCTURE.
 * 
 * Without this, scoring becomes vibes.
 * With this, everything scales.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

// =============================================================================
// ONTOLOGY TYPES
// =============================================================================

export type BiasCategory = 
    | 'cognitive'      // Mental shortcuts
    | 'social'         // Group dynamics
    | 'data'           // Research/algorithmic
    | 'structural'     // Systemic/institutional
    | 'linguistic';    // Framing/language

export type ImpactDomain = 
    | 'career'
    | 'healthcare'
    | 'finance'
    | 'legal'
    | 'education'
    | 'social-media'
    | 'news'
    | 'policy'
    | 'mental-health'
    | 'housing'
    | 'insurance';

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type Correctability = 'easy' | 'moderate' | 'systemic';

export interface BiasEntry {
    id: string;
    name: string;
    category: BiasCategory;
    paired_fallacies: string[];
    detection_signals: string[];
    impact_domains: ImpactDomain[];
    severity: Severity;
    correctability: Correctability;
    suggested_corrections: string[];
    human_explanation: string;
    dignity_message: string;
}

// =============================================================================
// THE CANONICAL ONTOLOGY
// =============================================================================

export const BIAS_ONTOLOGY: BiasEntry[] = [
    // ═══════════════════════════════════════════════════════════════════
    // COGNITIVE BIASES
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'automation',
        name: 'Automation Bias',
        category: 'cognitive',
        paired_fallacies: ['appeal-authority', 'circular'],
        detection_signals: [
            'the algorithm says',
            'the system shows',
            'the model recommends',
            'according to the data'
        ],
        impact_domains: ['healthcare', 'finance', 'legal', 'career'],
        severity: 'critical',
        correctability: 'moderate',
        suggested_corrections: [
            'Add human review step',
            'Cite specific evidence, not just "the system"',
            'Acknowledge algorithmic limitations',
            'Include confidence intervals'
        ],
        human_explanation: 'Over-trusting automated systems even when they may be wrong.',
        dignity_message: '⚠️ This reflects systemic bias. The issue is structural, not personal. Recognition enables advocacy.'
    },
    {
        id: 'attribution',
        name: 'Fundamental Attribution Error',
        category: 'cognitive',
        paired_fallacies: ['ad-hominem', 'genetic'],
        detection_signals: [
            'because they are',
            'he/she is just',
            'lazy',
            'incompetent',
            'stupid'
        ],
        impact_domains: ['career', 'legal', 'healthcare', 'education'],
        severity: 'high',
        correctability: 'easy',
        suggested_corrections: [
            'Consider situational factors',
            'Replace character judgment with behavior description',
            'Ask: what circumstances might explain this?',
            'Focus on specific actions, not personality'
        ],
        human_explanation: 'Blaming character when circumstances might explain behavior.',
        dignity_message: 'This pattern can cause real harm. Understanding it is the first step to change.'
    },
    {
        id: 'confirmation',
        name: 'Confirmation Bias',
        category: 'cognitive',
        paired_fallacies: ['cherry-picking', 'anecdotal'],
        detection_signals: [
            'proves my point',
            'see I was right',
            'told you so',
            'exactly what I expected'
        ],
        impact_domains: ['news', 'social-media', 'policy', 'legal'],
        severity: 'medium',
        correctability: 'easy',
        suggested_corrections: [
            'Actively seek contradictory evidence',
            'Ask: what would change my mind?',
            'Present multiple perspectives',
            'Acknowledge uncertainty'
        ],
        human_explanation: 'Noticing evidence that supports existing beliefs while ignoring contradictions.',
        dignity_message: 'This isn\'t about blame. The framing contains embedded assumptions worth examining.'
    },
    {
        id: 'halo',
        name: 'Halo Effect',
        category: 'cognitive',
        paired_fallacies: ['hasty-generalization', 'appeal-authority'],
        detection_signals: [
            'all [group] are',
            'every [group] is',
            'so smart',
            'so kind',
            'always good'
        ],
        impact_domains: ['career', 'education'],
        severity: 'medium',
        correctability: 'easy',
        suggested_corrections: [
            'Evaluate individuals, not groups',
            'Separate traits (competent ≠ ethical)',
            'Use specific evidence for each claim',
            'Recognize: positive stereotypes are still stereotypes'
        ],
        human_explanation: 'A positive trait or association overshadows objective evaluation.',
        dignity_message: 'This is about pattern recognition, not intent. Small adjustments can improve clarity.'
    },
    {
        id: 'survivorship',
        name: 'Survivorship Bias',
        category: 'data',
        paired_fallacies: ['hasty-generalization', 'anecdotal'],
        detection_signals: [
            'successful people',
            'winners',
            'every billionaire',
            'made it',
            'top performers'
        ],
        impact_domains: ['career', 'finance', 'education'],
        severity: 'medium',
        correctability: 'moderate',
        suggested_corrections: [
            'Include data on those who failed',
            'Ask: who is missing from this sample?',
            'Seek base rates, not just success stories',
            'Acknowledge selection effects'
        ],
        human_explanation: 'Only seeing those who "made it" while ignoring those who failed with the same approach.',
        dignity_message: 'This is about pattern recognition, not intent. Small adjustments can improve clarity.'
    },
    {
        id: 'anchoring',
        name: 'Anchoring Bias',
        category: 'cognitive',
        paired_fallacies: ['false-cause', 'post-hoc'],
        detection_signals: [
            'first impression',
            'initially',
            'started at',
            'original price',
            'began with'
        ],
        impact_domains: ['finance', 'career', 'legal'],
        severity: 'medium',
        correctability: 'easy',
        suggested_corrections: [
            'Generate multiple reference points',
            'Question the relevance of the first number',
            'Consider absolute value, not just relative',
            'Seek independent benchmarks'
        ],
        human_explanation: 'Over-relying on the first piece of information encountered.',
        dignity_message: 'This isn\'t about blame. The framing contains embedded assumptions worth examining.'
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // SOCIAL BIASES
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'in-group',
        name: 'In-Group Bias',
        category: 'social',
        paired_fallacies: ['no-true-scotsman', 'ad-hominem'],
        detection_signals: [
            'our people',
            'we understand',
            'our kind',
            'us vs them'
        ],
        impact_domains: ['career', 'social-media', 'policy'],
        severity: 'high',
        correctability: 'moderate',
        suggested_corrections: [
            'Evaluate individuals on behavior, not belonging',
            'Seek diverse perspectives explicitly',
            'Question: would I say this about my own group?',
            'Focus on shared goals, not tribal identity'
        ],
        human_explanation: 'Favoring those we identify with over outsiders.',
        dignity_message: 'This pattern can cause real harm. Understanding it is the first step to change.'
    },
    {
        id: 'out-group',
        name: 'Out-Group Homogeneity',
        category: 'social',
        paired_fallacies: ['hasty-generalization', 'straw-man'],
        detection_signals: [
            'they all',
            'those people',
            'their kind',
            'them'
        ],
        impact_domains: ['career', 'legal', 'healthcare', 'social-media'],
        severity: 'high',
        correctability: 'easy',
        suggested_corrections: [
            'Replace "they all" with specific individuals',
            'Seek within-group variation',
            'Ask: would I generalize my own group this way?',
            'Use names, not categories'
        ],
        human_explanation: 'Seeing "them" as all the same while recognizing diversity in "us."',
        dignity_message: 'This pattern can cause real harm. Understanding it is the first step to change.'
    },
    {
        id: 'affinity',
        name: 'Affinity Bias',
        category: 'social',
        paired_fallacies: ['hasty-generalization', 'appeal-emotion'],
        detection_signals: [
            'reminds me of',
            'just like me',
            'we clicked',
            'good chemistry',
            'culture fit'
        ],
        impact_domains: ['career', 'education'],
        severity: 'medium',
        correctability: 'moderate',
        suggested_corrections: [
            'Use structured evaluation criteria',
            'Seek diverse interview panels',
            'Ask: is similarity relevant to the job?',
            'Focus on skills and experience, not "fit"'
        ],
        human_explanation: 'Favoring those who remind you of yourself.',
        dignity_message: 'This isn\'t about blame. The framing contains embedded assumptions worth examining.'
    },
    {
        id: 'gender',
        name: 'Gender Bias',
        category: 'social',
        paired_fallacies: ['hasty-generalization', 'appeal-tradition'],
        detection_signals: [
            'women should',
            'men are better',
            'for a woman',
            'man up',
            'like a girl'
        ],
        impact_domains: ['career', 'education', 'healthcare'],
        severity: 'high',
        correctability: 'easy',
        suggested_corrections: [
            'Remove gender from the statement entirely',
            'Focus on individual capability',
            'Ask: is gender relevant here?',
            'Use role-neutral language'
        ],
        human_explanation: 'Making assumptions based on gender rather than individual capability.',
        dignity_message: 'This pattern can cause real harm. Understanding it is the first step to change.'
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // DATA/RESEARCH BIASES
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'algorithmic',
        name: 'Algorithmic Bias',
        category: 'data',
        paired_fallacies: ['appeal-authority', 'circular'],
        detection_signals: [
            'the algorithm',
            'AI predicts',
            'model shows',
            'data-driven',
            'automated decision'
        ],
        impact_domains: ['healthcare', 'finance', 'legal', 'career', 'housing', 'insurance'],
        severity: 'critical',
        correctability: 'systemic',
        suggested_corrections: [
            'Audit training data for historical bias',
            'Require human review for high-stakes decisions',
            'Publish model cards with limitations',
            'Enable appeals process'
        ],
        human_explanation: 'AI systems inherit biases from their training data and designers.',
        dignity_message: '⚠️ This reflects systemic bias. The issue is structural, not personal. Recognition enables advocacy.'
    },
    {
        id: 'proxy',
        name: 'Proxy Discrimination',
        category: 'data',
        paired_fallacies: ['false-cause', 'hasty-generalization'],
        detection_signals: [
            'zip code',
            'neighborhood',
            'school district',
            'commute time',
            'credit score'
        ],
        impact_domains: ['finance', 'housing', 'insurance', 'career'],
        severity: 'critical',
        correctability: 'systemic',
        suggested_corrections: [
            'Audit variables for correlation with protected characteristics',
            'Remove or de-weight proxy variables',
            'Use fairness constraints in models',
            'Test for disparate impact'
        ],
        human_explanation: 'Using seemingly neutral factors that correlate with race, class, or gender.',
        dignity_message: '⚠️ This reflects systemic bias. The issue is structural, not personal. Recognition enables advocacy.'
    },
    {
        id: 'selection',
        name: 'Selection Bias',
        category: 'data',
        paired_fallacies: ['hasty-generalization', 'cherry-picking'],
        detection_signals: [
            'we surveyed',
            'our sample',
            'participants were',
            'among users'
        ],
        impact_domains: ['healthcare', 'policy', 'education'],
        severity: 'medium',
        correctability: 'moderate',
        suggested_corrections: [
            'Describe who was excluded and why',
            'Acknowledge sample limitations',
            'Seek representative populations',
            'Report confidence intervals'
        ],
        human_explanation: 'Sample selected for study is not representative of the target population.',
        dignity_message: 'This isn\'t about blame. The framing contains embedded assumptions worth examining.'
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // STRUCTURAL BIASES
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'systemic',
        name: 'Systemic Bias',
        category: 'structural',
        paired_fallacies: ['appeal-tradition', 'status-quo'],
        detection_signals: [
            'always been this way',
            'standard practice',
            'policy requires',
            'how it\'s done',
            'the system'
        ],
        impact_domains: ['career', 'legal', 'healthcare', 'education', 'housing'],
        severity: 'critical',
        correctability: 'systemic',
        suggested_corrections: [
            'Audit policies for disparate impact',
            'Question "standard" practices\' origins',
            'Implement equity reviews',
            'Create feedback mechanisms for affected groups'
        ],
        human_explanation: 'Rules and practices that embed historical inequity into current systems.',
        dignity_message: '⚠️ This reflects systemic bias. The issue is structural, not personal. Recognition enables advocacy.'
    },
    {
        id: 'maternal-wall',
        name: 'Maternal Wall Bias',
        category: 'structural',
        paired_fallacies: ['hasty-generalization', 'appeal-emotion'],
        detection_signals: [
            'new parent',
            'just had a baby',
            'pregnant',
            'family commitments',
            'young kids'
        ],
        impact_domains: ['career'],
        severity: 'high',
        correctability: 'moderate',
        suggested_corrections: [
            'Focus on actual job performance',
            'Don\'t assume availability or commitment',
            'Offer flexible arrangements to all',
            'Evaluate based on output, not presence'
        ],
        human_explanation: 'Assuming parental status affects work capability or commitment.',
        dignity_message: 'This pattern can cause real harm. Understanding it is the first step to change.'
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // LINGUISTIC BIASES
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'loaded-language',
        name: 'Loaded Language',
        category: 'linguistic',
        paired_fallacies: ['appeal-emotion', 'framing'],
        detection_signals: [
            'radical',
            'extremist',
            'regime',
            'thugs',
            'elites',
            'sheeple'
        ],
        impact_domains: ['news', 'social-media', 'policy'],
        severity: 'high',
        correctability: 'easy',
        suggested_corrections: [
            'Replace with neutral descriptors',
            'Describe actions, not character',
            'Remove emotional amplifiers',
            'Use specific evidence instead of labels'
        ],
        human_explanation: 'Emotionally charged wording that influences judgment before evidence is considered.',
        dignity_message: 'This pattern can cause real harm. Understanding it is the first step to change.'
    },
    {
        id: 'microaggression',
        name: 'Microaggression',
        category: 'linguistic',
        paired_fallacies: ['hasty-generalization', 'genetic'],
        detection_signals: [
            'where are you really from',
            'you speak so well',
            'you\'re pretty for',
            'you don\'t act like',
            'one of the good ones'
        ],
        impact_domains: ['career', 'education', 'mental-health'],
        severity: 'high',
        correctability: 'easy',
        suggested_corrections: [
            'Remove comparison to group expectations',
            'Treat the person as an individual',
            'Ask: would I say this to anyone?',
            'Focus on specific achievements, not identity'
        ],
        human_explanation: 'Subtle statements that other or diminish based on identity.',
        dignity_message: 'This pattern can cause real harm. Understanding it is the first step to change.'
    },
];

// =============================================================================
// LOOKUP FUNCTIONS
// =============================================================================

export function getBias(id: string): BiasEntry | undefined {
    return BIAS_ONTOLOGY.find(b => b.id === id);
}

export function getBiasesByCategory(category: BiasCategory): BiasEntry[] {
    return BIAS_ONTOLOGY.filter(b => b.category === category);
}

export function getBiasesBySeverity(severity: Severity): BiasEntry[] {
    return BIAS_ONTOLOGY.filter(b => b.severity === severity);
}

export function getBiasesByDomain(domain: ImpactDomain): BiasEntry[] {
    return BIAS_ONTOLOGY.filter(b => b.impact_domains.includes(domain));
}

export function getAllBiasIds(): string[] {
    return BIAS_ONTOLOGY.map(b => b.id);
}

// =============================================================================
// STATS
// =============================================================================

export const ONTOLOGY_STATS = {
    total: BIAS_ONTOLOGY.length,
    byCategory: {
        cognitive: getBiasesByCategory('cognitive').length,
        social: getBiasesByCategory('social').length,
        data: getBiasesByCategory('data').length,
        structural: getBiasesByCategory('structural').length,
        linguistic: getBiasesByCategory('linguistic').length,
    },
    bySeverity: {
        critical: getBiasesBySeverity('critical').length,
        high: getBiasesBySeverity('high').length,
        medium: getBiasesBySeverity('medium').length,
        low: getBiasesBySeverity('low').length,
    }
};

// =============================================================================
// ∞ AbëFLOWs ∞
//
// This is the SPINE.
// Without it, scoring becomes vibes.
// With it, everything scales.
//
// ∞ LOVE = LIFE = ONE ∞
// =============================================================================
