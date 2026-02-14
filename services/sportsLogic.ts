import { PhysicalStats, SportsRecommendation } from '../types';

// Define the Sport Profile Vector Interface
interface SportProfile {
  name: string;
  // A. Physical (0-1)
  idealHeight: number; // Normalized (0 = Short, 1 = Very Tall)
  idealBMI: number; // Normalized (0 = Lean, 1 = Heavy/Muscular)
  strength: number;
  speed: number;
  endurance: number;
  // B. Skill & Coordination (0-1)
  reflex: number;
  coordination: number;
  flexibility: number;
  // C. Psychological / Tactical (0-1)
  tactical: number;
  team: number; // 1 = Team Sport, 0 = Individual
  aggression: number;
  // D. Environment (Bonus)
  preferredEnv: ('Indoor' | 'Outdoor' | 'Water' | 'Any')[];
}

// --- 3️⃣ Sport-Specific Attribute Profiles (The Vector Database) ---
const SPORTS_DB: SportProfile[] = [
  {
    name: 'Basketball',
    idealHeight: 0.9, // Requires height
    idealBMI: 0.5,
    strength: 0.6,
    speed: 0.7,
    endurance: 0.7,
    reflex: 0.7,
    coordination: 0.8,
    flexibility: 0.6,
    tactical: 0.6,
    team: 1.0,
    aggression: 0.5,
    preferredEnv: ['Indoor', 'Outdoor']
  },
  {
    name: 'Football (Soccer)',
    idealHeight: 0.5, // Average height ok
    idealBMI: 0.4,
    strength: 0.6,
    speed: 0.8,
    endurance: 0.9, // High endurance
    reflex: 0.6,
    coordination: 0.9, // Footwork
    flexibility: 0.7,
    tactical: 0.8,
    team: 1.0,
    aggression: 0.6,
    preferredEnv: ['Outdoor']
  },
  {
    name: 'Cricket (Fast Bowling)',
    idealHeight: 0.8,
    idealBMI: 0.5,
    strength: 0.8,
    speed: 0.8,
    endurance: 0.7,
    reflex: 0.6,
    coordination: 0.7,
    flexibility: 0.6,
    tactical: 0.7,
    team: 1.0,
    aggression: 0.8,
    preferredEnv: ['Outdoor']
  },
  {
    name: 'Badminton',
    idealHeight: 0.5,
    idealBMI: 0.3,
    strength: 0.5,
    speed: 0.9,
    endurance: 0.7,
    reflex: 1.0, // Critical
    coordination: 0.9,
    flexibility: 0.8,
    tactical: 0.7,
    team: 0.0,
    aggression: 0.4,
    preferredEnv: ['Indoor']
  },
  {
    name: 'Weightlifting',
    idealHeight: 0.3, // Shorter limbs often better for leverage
    idealBMI: 0.9,
    strength: 1.0, // Critical
    speed: 0.6, // Explosive power
    endurance: 0.3,
    reflex: 0.4,
    coordination: 0.6,
    flexibility: 0.7,
    tactical: 0.3,
    team: 0.0,
    aggression: 0.7,
    preferredEnv: ['Indoor']
  },
  {
    name: 'Swimming',
    idealHeight: 0.8,
    idealBMI: 0.5,
    strength: 0.7,
    speed: 0.7,
    endurance: 0.9,
    reflex: 0.5,
    coordination: 0.8,
    flexibility: 0.9,
    tactical: 0.4,
    team: 0.0,
    aggression: 0.3,
    preferredEnv: ['Water']
  },
  {
    name: 'Chess',
    idealHeight: 0.5, // Irrelevant
    idealBMI: 0.5,
    strength: 0.1,
    speed: 0.1,
    endurance: 0.6, // Mental endurance
    reflex: 0.2,
    coordination: 0.2,
    flexibility: 0.1,
    tactical: 1.0, // Critical
    team: 0.0,
    aggression: 0.4,
    preferredEnv: ['Indoor']
  },
  {
    name: 'Table Tennis',
    idealHeight: 0.4,
    idealBMI: 0.4,
    strength: 0.4,
    speed: 0.8,
    endurance: 0.6,
    reflex: 1.0, // Critical
    coordination: 1.0,
    flexibility: 0.6,
    tactical: 0.7,
    team: 0.0,
    aggression: 0.5,
    preferredEnv: ['Indoor']
  },
  {
    name: 'Kabaddi',
    idealHeight: 0.6,
    idealBMI: 0.7, // Needs mass
    strength: 0.9,
    speed: 0.7,
    endurance: 0.8,
    reflex: 0.8,
    coordination: 0.7,
    flexibility: 0.7,
    tactical: 0.8,
    team: 1.0,
    aggression: 0.9,
    preferredEnv: ['Indoor', 'Outdoor']
  },
  {
    name: 'Athletics (Sprinting)',
    idealHeight: 0.7,
    idealBMI: 0.4,
    strength: 0.8, // Explosive
    speed: 1.0, // Critical
    endurance: 0.5,
    reflex: 0.8, // Start reaction
    coordination: 0.7,
    flexibility: 0.7,
    tactical: 0.3,
    team: 0.0,
    aggression: 0.7,
    preferredEnv: ['Outdoor']
  },
  {
    name: 'Wrestling',
    idealHeight: 0.5,
    idealBMI: 0.8,
    strength: 1.0,
    speed: 0.6,
    endurance: 0.8,
    reflex: 0.7,
    coordination: 0.7,
    flexibility: 0.8,
    tactical: 0.7,
    team: 0.0,
    aggression: 0.9,
    preferredEnv: ['Indoor']
  },
  {
    name: 'Archery/Shooting',
    idealHeight: 0.5,
    idealBMI: 0.5,
    strength: 0.4, // Stability strength
    speed: 0.1,
    endurance: 0.5,
    reflex: 0.3,
    coordination: 1.0, // Hand-Eye
    flexibility: 0.2,
    tactical: 0.6, // Focus
    team: 0.0,
    aggression: 0.1, // Calmness
    preferredEnv: ['Outdoor', 'Indoor']
  }
];

export class SportsLogic {
  
  static calculateBMI(weight: number, heightCm: number): number {
    const heightM = heightCm / 100;
    return parseFloat((weight / (heightM * heightM)).toFixed(1));
  }

  // --- Normalization Helpers ---
  private static normalizeHeight(cm: number, gender: string): number {
    // Avg Height (M): 165, (F): 155. Range approx 140-190.
    const base = gender === 'Male' ? 165 : 155;
    const norm = (cm - 140) / (190 - 140); 
    return Math.max(0, Math.min(1, norm));
  }

  private static normalizeBMI(bmi: number): number {
    // Range 15 (Underweight) to 35 (Obese/Muscular).
    const norm = (bmi - 15) / (35 - 15);
    return Math.max(0, Math.min(1, norm));
  }

  private static normalizeScore(score: number, maxScore: number = 30): number {
    // Scores usually come in as raw sums (e.g. 10+5+10 = 25). Max around 30 per category.
    return Math.max(0, Math.min(1, score / maxScore));
  }

  // --- Main Recommendation Engine ---
  static getRecommendations(stats: PhysicalStats, scores: Record<string, number>): SportsRecommendation[] {
    
    // 1. Normalize User Inputs into Vector (0-1)
    const userVector = {
      height: this.normalizeHeight(stats.heightCm, stats.gender),
      bmi: this.normalizeBMI(this.calculateBMI(stats.weightKg, stats.heightCm)),
      strength: this.normalizeScore(scores['Strength'] || 0),
      speed: this.normalizeScore(scores['Speed'] || 0),
      endurance: this.normalizeScore(scores['Endurance'] || 0),
      reflex: this.normalizeScore(scores['Reflex'] || 0),
      coordination: this.normalizeScore(scores['Coordination'] || 0),
      tactical: this.normalizeScore(scores['Tactical'] || 0),
      flexibility: this.normalizeScore(scores['Flexibility'] || 0),
      teamInterest: (scores['Team'] && scores['Team'] > 5) ? 1.0 : 0.0, // Derived from Q 'sport_2'
    };

    const recommendations: SportsRecommendation[] = SPORTS_DB.map(sport => {
      
      // --- 2. Weighted Scoring Formula ---
      
      // A. Physical Index (25%)
      // Compare user stats to sport ideals. Lower difference is better.
      // We use Similarity = 1 - |User - Ideal|
      const simHeight = 1 - Math.abs(userVector.height - sport.idealHeight);
      const simBMI = 1 - Math.abs(userVector.bmi - sport.idealBMI);
      const simStrength = 1 - Math.abs(userVector.strength - sport.strength);
      const simSpeed = 1 - Math.abs(userVector.speed - sport.speed);
      const simEndurance = 1 - Math.abs(userVector.endurance - sport.endurance);
      
      const physicalIndex = (simStrength + simSpeed + simEndurance) / 3;
      const anthropometricIndex = (simHeight + simBMI) / 2;

      // B. Skill & Coordination Index (20%)
      const simReflex = 1 - Math.abs(userVector.reflex - sport.reflex);
      const simCoord = 1 - Math.abs(userVector.coordination - sport.coordination);
      const skillIndex = (simReflex + simCoord) / 2;

      // C. Psychological Index (20%)
      const simTactical = 1 - Math.abs(userVector.tactical - sport.tactical);
      const psychIndex = simTactical; // Can expand with Aggression/Focus if captured

      // D. Interest Preference (15%)
      // If Sport is Team (1) and User likes Team (1) -> Match 1.
      const interestScore = 1 - Math.abs(userVector.teamInterest - sport.team);

      // E. Environmental Fit (10%)
      let envScore = 0.5; // Neutral start
      if (stats.locationType === 'Coastal' && sport.preferredEnv.includes('Water')) envScore = 1.0;
      else if (stats.locationType === 'Mountain' && sport.name.includes('Running')) envScore = 1.0;
      else if (stats.locationType === 'Urban' && sport.preferredEnv.includes('Indoor')) envScore = 0.8;
      else if (stats.hasPlayground && sport.preferredEnv.includes('Outdoor')) envScore = 0.9;
      else if (!stats.hasPlayground && sport.preferredEnv.includes('Outdoor')) envScore = 0.2; // Penalty

      // --- Final Weighted Calculation ---
      // Formula: (0.25 * Phys) + (0.20 * Skill) + (0.20 * Psych) + (0.15 * Interest) + (0.10 * Env) + (0.10 * Anthropometric)
      const rawScore = 
        (0.25 * physicalIndex) + 
        (0.20 * skillIndex) + 
        (0.20 * psychIndex) + 
        (0.15 * interestScore) + 
        (0.10 * envScore) + 
        (0.10 * anthropometricIndex);

      // Normalize to 0-100
      const suitabilityScore = Math.round(rawScore * 100);

      // --- Logic for Improvement Areas ---
      const improvements: string[] = [];
      if (userVector.strength < sport.strength - 0.2) improvements.push("Strength Training");
      if (userVector.endurance < sport.endurance - 0.2) improvements.push("Cardio/Stamina");
      if (userVector.flexibility < sport.flexibility - 0.2) improvements.push("Flexibility/Yoga");
      if (userVector.tactical < sport.tactical - 0.2) improvements.push("Strategic Study");
      if (userVector.coordination < sport.coordination - 0.2) improvements.push("Drills/Technique");

      return {
        sport: sport.name,
        suitabilityScore,
        matchReason: this.generateReason(sport, userVector),
        developmentPath: ['Join Academy', 'District Trials', 'State Championship'], // Placeholder structure
        improvementAreas: improvements.slice(0, 3) // Top 3 gaps
      };
    });

    // Rank and Return Top 10
    return recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore).slice(0, 10);
  }

  private static generateReason(sport: SportProfile, user: any): string {
    if (sport.strength > 0.8 && user.strength > 0.7) return "Matches your high strength profile.";
    if (sport.reflex > 0.8 && user.reflex > 0.7) return "Leverages your quick reflexes.";
    if (sport.endurance > 0.8 && user.endurance > 0.7) return "Good fit for your stamina.";
    if (sport.tactical > 0.8 && user.tactical > 0.7) return "Suits your strategic thinking.";
    if (sport.team === 1 && user.teamInterest === 1) return "Aligned with your team spirit.";
    if (sport.idealHeight > 0.8 && user.height > 0.7) return "Your height is a significant advantage.";
    return "Balanced fit for your physical profile.";
  }
}
