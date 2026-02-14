
export interface Message {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type IncomeBracket = 'EWS (< ₹2.5L)' | 'Lower-Middle (₹2.5-6L)' | 'Middle (₹6-12L)' | 'Upper-Middle (> ₹12L)';

export interface RoadmapStep {
  year: string;
  milestone: string;
  description: string;
  exams?: string[];
  skills?: string[];
}

export interface PersonalizedRoadmap {
  educationPath: string[]; // Affordable institutions, Govt colleges, etc.
  examStrategy: string[]; // Required exams, low-cost prep
  skillDev: string[]; // Free platforms, Govt programs
  financialSupport: string[]; // Scholarships, loans, stipends
  alternatives: string[]; // Diploma, Lateral entry, etc.
  meta: {
    estimatedCost: string;
    duration: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    employmentProbability: string;
    backupPlan: string;
  };
}

export interface CareerPath {
  id: string;
  title: string;
  matchScore: number;
  description: string;
  salaryRange: string;
  timeToComplete: string;
  roadmap: RoadmapStep[];
  requiredExams: string[];
  personalizedRoadmap?: PersonalizedRoadmap; // New field for demographic-based roadmap
}

export interface Scheme {
  name: string;
  type: 'Central' | 'State' | 'Scholarship' | 'Vocational' | 'Digital Skilling' | 'Training';
  eligibility: string;
  benefits: string;
  link: string;
}

export interface SidhCourse {
  title: string;
  sector: string;
  type: 'PMKVY' | 'NAPS' | 'ITI' | 'Certification';
  provider: string;
  duration: string;
  link: string;
}

export interface MentorshipProfile {
  name: string;
  role: string;
  company: string;
  experience: string;
  languages: string[];
  imageUrl?: string;
}

export interface UserProfile {
  name?: string;
  grade?: string;
  stream?: string;
  interests?: string[];
  location?: string;
  economicContext?: 'Low' | 'Mid' | 'High';
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: 'Merit' | 'Means' | 'Sports' | 'Research' | 'Minority' | 'Vocational' | 'Arts';
  providerType?: 'Government' | 'PSU' | 'Private' | 'University' | 'Foundation' | 'Academy';
  level?: 'National' | 'State' | 'International' | 'University';
  artField?: 'Music' | 'Dance' | 'Visual Arts' | 'Performing Arts' | 'Film' | 'Creative' | 'Theatre';
  incomeLimit?: number; // Income ceiling in Lakhs per annum (undefined means no limit)
  socialGroup: string[]; // ['General', 'SC', 'ST', 'OBC', 'Minority', 'All']
  careerGoal: string[]; // ['Engineering', 'Medical', 'MBA', 'Sports', 'Research', 'Vocational', 'STEM', 'General', 'Arts']
  benefits: string;
  
  // Dynamic Date Fields
  startDate?: string; // YYYY-MM-DD
  deadline: string;   // Acts as the End Date (YYYY-MM-DD)
  isRecurring?: boolean; // If true, logic projects dates to current academic year
  lastVerified?: string; // ISO Date String
  
  applyLink: string;
}

export interface AssessmentResult {
  recommendedPaths: CareerPath[];
  relevantSchemes: Scheme[];
  sidhRecommendations?: SidhCourse[];
  summary: string;
  cognitiveStrengths: string[];
  sportsRecommendations?: string[];
  radarData?: { subject: string; score: number; fullMark: number }[];
}

export interface QuestionOption {
  text: { en: string; hi: string };
  value: string;
  scoreImpact?: { category: string; value: number };
}

export interface Question {
  id: string;
  category: 'Cognitive' | 'Academic' | 'Sports' | 'Demographic' | 'Psychometric';
  subCategory?: string;
  question: { en: string; hi: string };
  options: QuestionOption[];
}

export interface College {
  id: string;
  name: string;
  location: string;
  domain: 'Engineering' | 'Medical' | 'Arts' | 'Sports' | 'Music' | 'Vocational';
  website: string;
  entranceExam: string;
}

export interface School {
  id: string;
  name: string;
  type: string;
  tags: ('Central Govt' | 'State Govt' | 'Private' | 'Sports' | 'Residential' | 'Fully Funded')[];
  website: string;
  description: string;
}

// --- Machine Learning & Analytics Types ---

export interface MLFeatureVector {
  vectorId: string;
  timestamp: string;
  dimensions: {
    logical: number;
    verbal: number;
    numerical: number;
    technical: number;
    creative: number;
    sports: number;
    economicScore?: number;
  };
  rawVector: number[]; // Array of floats for model input
}

export interface InteractionLog {
  sessionId: string;
  action: 'VIEW_RESULTS' | 'CLICK_CAREER' | 'FEEDBACK_THUMBS_UP' | 'FEEDBACK_THUMBS_DOWN' | 'DOWNLOAD_REPORT' | 'TIME_ON_PAGE' | 'SUBMIT_PROFESSIONAL_DATA';
  targetId?: string;
  metadata?: any;
  timestamp: number;
}

// --- Professional Insights ---

export interface ProfessionalInsight {
  id: string;
  basicInfo: {
    age: string;
    gender?: string;
    city: string;
    education: string;
    socioEconomic?: string;
  };
  careerPath: {
    currentJob: string;
    sector: string;
    experienceYears: string;
    firstJob: string;
    wasPlanned: string; // 'Yes' | 'No'
    changeReason?: string;
  };
  skills: {
    logical: number;
    numerical: number;
    communication: number;
    leadership: number;
    physical: number;
    creative: number;
  };
  education: {
    degree: string;
    entranceExams: string;
    preparationMode: string;
    scholarships: string;
  };
  outcomes: {
    salaryRange: string;
    satisfaction: number;
    recommend: string; // 'Yes' | 'No'
    keySkills: string;
  };
  advice: {
    studentAdvice: string;
    mistakesToAvoid: string;
  };
  consent: boolean;
  timestamp: string;
}

// --- Sports & Psychometric Extensions ---

export interface PhysicalStats {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  heightCm: number;
  weightKg: number;
  dominantHand: 'Right' | 'Left' | 'Ambidextrous';
  locationType: 'Urban' | 'Rural' | 'Coastal' | 'Mountain';
  hasPlayground: boolean;
  hasCoaching: boolean;
}

export interface SportsRecommendation {
  sport: string;
  suitabilityScore: number; // 0-100
  matchReason: string;
  developmentPath: string[]; // Can act as "Trainable Factors"
  improvementAreas: string[]; // Specific areas to improve
}

// --- Holistic Recommendation Engine Types ---

export interface HolisticProfile {
  intelligenceIndex: {
    cognitive: number;
    personalityType: string;
    sportsAptitude: number;
    creativeIndex: number;
  };
  recommendations: {
    academic: { stream: string; score: number; reason: string }[];
    careers: { domain: string; score: number; reason: string; steps: string[] }[];
    sports: { sport: string; score: number }[];
    creative: { field: string; score: number }[];
  };
}
