
import { HolisticProfile } from '../types';

/**
 * RecommendationEngine
 * 
 * Aggregates scores from all modules:
 * 1. Skill Assessment (Logical, Numerical, Verbal, Spatial)
 * 2. Psychometric (Leadership, Risk, Stability, EQ, Innovation)
 * 3. Sports (Strength, Reflex, etc.)
 * 4. Creative (Music, Visual, etc.)
 * 
 * Generates ranked lists for Academic Streams, Career Domains, Sports, and Creative Fields.
 */
export class RecommendationEngine {

  static generateHolisticProfile(): HolisticProfile | null {
    // 1. Fetch Data from Local Storage (Simulating centralized profile DB)
    const skillScores = JSON.parse(localStorage.getItem('disha_skill_scores') || '{}');
    const psychScores = JSON.parse(localStorage.getItem('disha_psych_scores') || '{}');
    const sportsScores = JSON.parse(localStorage.getItem('disha_sports_scores') || '{}');
    const creativeScores = JSON.parse(localStorage.getItem('disha_creative_scores') || '{}');
    
    // If no data at all, return null
    if (Object.keys(skillScores).length === 0 && Object.keys(psychScores).length === 0) {
        return null;
    }

    // 2. Normalize Scores (Helper)
    const normalize = (val: number | undefined, max: number = 30) => val ? Math.min(100, (val / max) * 100) : 0;
    
    // Skill Indices
    const s_logical = normalize(skillScores['Logical']);
    const s_numerical = normalize(skillScores['Numerical']);
    const s_verbal = normalize(skillScores['Verbal']);
    const s_spatial = normalize(skillScores['Spatial']);
    const s_practical = normalize(skillScores['Practical'] || skillScores['Technical']); // Some versions might use Technical

    // Psych Indices
    const p_leadership = normalize(psychScores['Extraversion'], 20); // Psych often has lower max raw score
    const p_risk = normalize(psychScores['RiskTaking'], 20);
    const p_stability = normalize(psychScores['Conscientiousness'], 20) + normalize(psychScores['Stability'], 20);
    const p_eq = normalize(psychScores['Agreeableness'], 20) + normalize(psychScores['Empathy'], 20);
    const p_innovation = normalize(psychScores['Openness'], 20);

    // Sports & Creative Indices (Aggregate for top-level stats)
    const sports_total = Object.values(sportsScores).reduce((a: any, b: any) => a + b, 0) as number;
    const creative_total = Object.values(creativeScores).reduce((a: any, b: any) => a + b, 0) as number;

    // --- 3. Academic Stream Logic ---
    const academicStreams = [
        { 
            stream: 'PCM (Engineering / Phy-Math)', 
            score: (s_numerical * 0.4) + (s_logical * 0.3) + (s_spatial * 0.3),
            reason: 'High affinity for logic, numbers, and spatial reasoning.'
        },
        { 
            stream: 'PCB (Medical / Bio)', 
            score: (s_verbal * 0.3) + (s_logical * 0.3) + (skillScores['Biology'] ? 40 : 20), // Boost if Bio interest known
            reason: 'Balanced analytical skills with potential interest in life sciences.'
        },
        { 
            stream: 'Commerce & Finance', 
            score: (s_numerical * 0.5) + (s_verbal * 0.2) + (p_stability * 0.3),
            reason: 'Strong numerical ability combined with a structured mindset.'
        },
        { 
            stream: 'Arts & Humanities', 
            score: (s_verbal * 0.5) + (p_eq * 0.3) + (p_innovation * 0.2),
            reason: 'Excellent verbal skills and high emotional intelligence.'
        },
        { 
            stream: 'Vocational / Technical', 
            score: (s_practical * 0.5) + (s_spatial * 0.3) + (p_stability * 0.2),
            reason: 'Preference for hands-on, practical application of skills.'
        }
    ].sort((a, b) => b.score - a.score);

    // --- 4. Career Domain Logic (Multi-Factor) ---
    const careerDomains = [
        {
            domain: 'AI, Tech & Data Science',
            score: (s_logical * 0.4) + (s_numerical * 0.3) + (p_innovation * 0.3),
            reason: 'Requires abstract logic and ability to innovate.',
            steps: ['Learn Python', 'Master Statistics', 'Build ML Projects']
        },
        {
            domain: 'Entrepreneurship & Business',
            score: (p_leadership * 0.4) + (p_risk * 0.4) + (s_logical * 0.2),
            reason: 'Matches high leadership drive and risk appetite.',
            steps: ['Start a small project', 'Learn Sales', 'Network']
        },
        {
            domain: 'Civil Services & Governance',
            score: (s_verbal * 0.3) + (p_stability * 0.4) + (s_logical * 0.3),
            reason: 'Ideal for those valuing stability, structure, and verbal command.',
            steps: ['Read Newspapers Daily', 'Understand Constitution', 'Mock Debates']
        },
        {
            domain: 'Healthcare & Social Impact',
            score: (p_eq * 0.5) + (s_verbal * 0.3) + (s_logical * 0.2),
            reason: 'Driven by empathy and ability to understand others.',
            steps: ['Volunteer', 'Study Biology/Psychology', 'Soft Skills Training']
        },
        {
            domain: 'Design & Architecture',
            score: (s_spatial * 0.5) + (p_innovation * 0.3) + (creative_total > 50 ? 20 : 0),
            reason: 'Strong spatial visualization mixed with creativity.',
            steps: ['Sketch Daily', 'Learn CAD', 'Study Design History']
        }
    ].sort((a, b) => b.score - a.score);

    // --- 5. Sports Logic ---
    // (Simplified re-ranking based on saved scores)
    // Note: Detailed Sports Logic is in SportsLogic class, here we just mapping generic high-level
    const sportRecs = [
        { sport: 'Strategic (Chess/Cricket Capt)', score: (sportsScores['Tactical'] || 0) * 3 },
        { sport: 'Power (Wrestling/Throws)', score: (sportsScores['Strength'] || 0) * 3 },
        { sport: 'Reflex (Badminton/TT)', score: (sportsScores['Reflex'] || 0) * 3 },
        { sport: 'Endurance (Running/Football)', score: (sportsScores['Endurance'] || 0) * 3 }
    ].sort((a, b) => b.score - a.score);

    // --- 6. Creative Logic ---
    const creativeRecs = [
        { field: 'Music & Sound', score: (creativeScores['Music'] || 0) * 8 }, // Scale to 100 approx
        { field: 'Visual Arts & Design', score: (creativeScores['Visual Arts'] || 0) * 8 },
        { field: 'Performing Arts', score: (creativeScores['Performing Arts'] || 0) * 8 },
        { field: 'Creative Business', score: (creativeScores['Creative'] || 0) * 8 }
    ].sort((a, b) => b.score - a.score);

    return {
        intelligenceIndex: {
            cognitive: Math.round((s_logical + s_numerical + s_verbal + s_spatial) / 4),
            personalityType: p_leadership > 70 ? 'Commander' : (p_eq > 70 ? 'Empath' : (p_innovation > 70 ? 'Innovator' : 'Analyst')),
            sportsAptitude: Math.round(sports_total / 2), // Rough normalization
            creativeIndex: Math.round(creative_total / 1.5)
        },
        recommendations: {
            academic: academicStreams,
            careers: careerDomains,
            sports: sportRecs.slice(0, 3),
            creative: creativeRecs.slice(0, 3)
        }
    };
  }
}
