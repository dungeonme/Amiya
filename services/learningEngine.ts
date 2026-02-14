import { AssessmentResult, InteractionLog, MLFeatureVector, ProfessionalInsight } from '../types';

/**
 * LearningEngine Service
 * 
 * Acts as the client-side "Brain" that processes user data for future ML training.
 * Responsibilities:
 * 1. Convert unstructured student profiles into numerical Feature Vectors.
 * 2. Log interaction telemetry (clicks, time spent) for behavioral analysis.
 * 3. Collect Reinforcement Learning (RLHF) signals via feedback.
 * 4. Monitor algorithmic bias (Gender/Economic representation).
 * 5. Ingest and Vectorize Professional Insight Data (Ground Truth).
 */

export class LearningEngine {
  private static sessionId = crypto.randomUUID();
  private static consentGranted = false;

  // Initialize Consent from LocalStorage
  static initialize() {
    this.consentGranted = localStorage.getItem('disha_consent') === 'true';
  }

  static setConsent(granted: boolean) {
    this.consentGranted = granted;
    if(granted) {
      localStorage.setItem('disha_consent', 'true');
    }
  }

  static hasConsent(): boolean {
    return this.consentGranted;
  }

  // --- 1. Feature Engineering (Vectorization) ---
  /**
   * Converts a user's assessment result into a normalized vector.
   * Format: [Logical, Verbal, Numerical, Technical, Creative, Sports]
   * Range: 0.0 to 1.0
   */
  static generateFeatureVector(result: AssessmentResult): MLFeatureVector {
    // Helper to extract and normalize score from Radar Data
    const getScore = (subj: string) => {
      if (!result.radarData) return 0;
      const point = result.radarData.find(r => r.subject === subj);
      // Default fullMark to 100 if not present, assume score is raw
      return point ? (point.score / (point.fullMark || 100)) : 0;
    };

    // Heuristics for non-numerical traits
    const creativeScore = result.cognitiveStrengths.some(s => s.includes('Creativ') || s.includes('Visual')) ? 0.8 : 0.2;
    const sportsScore = (result.sportsRecommendations && result.sportsRecommendations.length > 0) ? 0.9 : 0.1;

    const dimensions = {
      logical: getScore('Logical'),
      verbal: getScore('Verbal'),
      numerical: getScore('Numerical'),
      technical: getScore('Technical'),
      creative: creativeScore,
      sports: sportsScore,
      economicScore: 0.5 // Default placeholder, would come from demographics
    };

    // Create raw array for model input (order matters)
    const rawVector = [
      dimensions.logical,
      dimensions.verbal,
      dimensions.numerical,
      dimensions.technical,
      dimensions.creative,
      dimensions.sports
    ];

    const vectorData: MLFeatureVector = {
      vectorId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      dimensions,
      rawVector
    };

    // In a real backend, this would be: await api.post('/vectors', vectorData);
    console.groupCollapsed('🧠 [ML] Feature Vector Generated (Student)');
    console.log('Vector ID:', vectorData.vectorId);
    console.log('Dimensions:', dimensions);
    console.log('Raw Input:', rawVector);
    console.groupEnd();

    return vectorData;
  }

  /**
   * Ingests data from working professionals to create "Ground Truth" vectors.
   * These vectors help the model learn which skill combinations actually lead to specific careers.
   */
  static ingestProfessionalData(data: ProfessionalInsight): MLFeatureVector | null {
    if (!data.consent) return null;

    // Normalize 1-5 scales to 0-1
    const normalize = (val: number) => (val - 1) / 4;

    const dimensions = {
        logical: normalize(data.skills.logical),
        verbal: normalize(data.skills.communication),
        numerical: normalize(data.skills.numerical),
        // Heuristic: If they are in STEM, boost technical score, otherwise assume neutral or based on leadership?
        // For simplicity, we assume professionals in Engineering/Tech have high technical, else 0.5 default or derived from others
        technical: (data.careerPath.sector.includes('Tech') || data.careerPath.sector.includes('Engineer')) ? 0.9 : 0.5, 
        creative: normalize(data.skills.creative),
        sports: normalize(data.skills.physical),
        economicScore: data.basicInfo.socioEconomic === 'Low' ? 0.2 : (data.basicInfo.socioEconomic === 'Mid' ? 0.5 : 0.8)
    };

    const rawVector = [
        dimensions.logical,
        dimensions.verbal,
        dimensions.numerical,
        dimensions.technical,
        dimensions.creative,
        dimensions.sports
    ];

    const vectorData: MLFeatureVector = {
        vectorId: `prof_${data.id}`,
        timestamp: new Date().toISOString(),
        dimensions,
        rawVector
    };

    this.logInteraction('SUBMIT_PROFESSIONAL_DATA', data.id, { 
        job: data.careerPath.currentJob, 
        satisfaction: data.outcomes.satisfaction 
    });

    console.groupCollapsed('🧠 [ML] Professional Vector Ingested (Ground Truth)');
    console.log('Profile:', data.careerPath.currentJob);
    console.log('Vector:', rawVector);
    console.log('Outcome:', data.outcomes.satisfaction > 3 ? 'SUCCESSFUL' : 'CHURNING');
    console.groupEnd();

    return vectorData;
  }

  // --- 2. Telemetry & Logging ---
  static logInteraction(action: InteractionLog['action'], targetId?: string, metadata?: any) {
    if (!this.hasConsent()) return;

    const log: InteractionLog = {
      sessionId: this.sessionId,
      action,
      targetId,
      metadata,
      timestamp: Date.now()
    };

    // Simulate sending beacon to analytics server
    // navigator.sendBeacon('/api/log', JSON.stringify(log));
    
    // Store in localStorage for demonstration
    const logs = JSON.parse(localStorage.getItem('disha_logs') || '[]');
    logs.push(log);
    localStorage.setItem('disha_logs', JSON.stringify(logs.slice(-50))); // Keep last 50

    console.log(`📊 [Telemetry] ${action}`, log);
  }

  // --- 3. Bias Monitoring & Fairness ---
  /**
   * Checks if the recommendations provided to the student are diverse and fair.
   * Returns a warning if potential bias is detected (e.g., stereotyping).
   */
  static auditRecommendations(summary: string, strengths: string[]): { flagged: boolean; reason?: string } {
    // Simple heuristic: If "Technical" is a strength but summary emphasizes "Arts" heavily without mentioning Tech options.
    const hasTechStrength = strengths.some(s => s.includes('Logic') || s.includes('Math') || s.includes('Tech'));
    const summaryLowTech = !summary.toLowerCase().includes('tech') && !summary.toLowerCase().includes('engineer');
    
    if (hasTechStrength && summaryLowTech) {
        return { 
            flagged: true, 
            reason: "Potential Under-matching: Student has Technical strengths but recommendations lack Technical keywords." 
        };
    }
    return { flagged: false };
  }
}

// Initialize immediately
LearningEngine.initialize();
