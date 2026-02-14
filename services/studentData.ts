// Simulated Backend Database for Student Profiles and Learning Data

export interface StudentRecord {
  id: string;
  demographics: {
    state: string;
    grade: string;
  };
  assessmentHistory: any[];
  featureVectors: number[][];
  outcomes: {
    chosenPathId?: string;
    feedbackScore?: number;
  };
}

// Mock database to simulate backend storage structure
export const studentDatabase: StudentRecord[] = [
  {
    id: "stu_001",
    demographics: { state: "Uttar Pradesh", grade: "10" },
    assessmentHistory: [],
    featureVectors: [[0.8, 0.4, 0.6, 0.9, 0.0]],
    outcomes: { chosenPathId: "tech_01" }
  },
  {
    id: "stu_002",
    demographics: { state: "Tamil Nadu", grade: "12" },
    assessmentHistory: [],
    featureVectors: [[0.5, 0.9, 0.4, 0.2, 0.8]],
    outcomes: { chosenPathId: "arts_03" }
  }
];
