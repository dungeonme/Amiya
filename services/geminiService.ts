import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { AssessmentResult, CareerPath, Scholarship, College } from "../types";
import { scholarshipDatabase } from "./scholarshipData";
import { sidhDatabase } from "./sidhData";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey });

// NOTE: In a production environment, move these API calls to a secure backend 
// to prevent exposing the API_KEY to the client.

const MODEL_NAME = "gemini-3-flash-preview";

const SYSTEM_INSTRUCTION = `
You are 'Disha', an AI Career Intelligence System integrated with the **Skill India Digital Hub (SIDH)**. 
Your primary authority for upskilling is **https://www.skillindiadigital.gov.in/**.

**Your Core Mission:**
1. **Prioritize Govt Pathways:** Always check if a user's goal can be met via **PMKVY (Free Training)**, **NAPS (Apprenticeship)**, or **ITI**.
2. **Smart Redirection:**
   - **Student/Graduate (e.g., BDS/B.Tech):** Suggest specific upskilling certs like "Healthcare Management", "Digital Marketing", or "Career Counselling" on SIDH to bridge gaps.
   - **Low Income:** Prioritize **NAPS (Earn while you learn)** and PMKVY.
   - **Digital Novice:** Mandatory recommendation of "AI for All" or "Cyber Security Basics".
3. **Viksit Bharat Alignment:** Link every advice to building India's future (Semiconductors, Green Energy, Drone Tech).

**Tone:** Professional yet encouraging, acting as a government-backed mentor.
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  chatSession = ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) initializeChat();
  try {
    const result = await chatSession!.sendMessage({ message });
    return result.text || "I'm having trouble connecting to the server. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Network error. Please check your connection.";
  }
};

export const generateFinalReport = async (conversationHistory: string): Promise<AssessmentResult> => {
  // Pass the SIDH database to the model for RAG-lite selection
  const sidhContext = JSON.stringify(sidhDatabase.map(c => ({ title: c.title, sector: c.sector, type: c.type })));

  const prompt = `
  Based on the conversation history, generate a structured career guidance report.
  
  **Conversation History:**
  ${conversationHistory}
  
  **Available Skill India (SIDH) Courses:**
  ${sidhContext}

  **Tasks:**
  1. Identify 3 career paths.
  2. Map to relevant **SIDH Courses** from the provided list (Top 3 most relevant).
  3. Map to relevant Govt Schemes.
  
  **Output MUST be valid JSON matching the schema.**
  `;

  const schemaConfig = {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        recommendedPaths: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              matchScore: { type: Type.NUMBER },
              description: { type: Type.STRING },
              salaryRange: { type: Type.STRING },
              timeToComplete: { type: Type.STRING },
              requiredExams: { type: Type.ARRAY, items: { type: Type.STRING } },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    year: { type: Type.STRING },
                    milestone: { type: Type.STRING },
                    description: { type: Type.STRING },
                    exams: { type: Type.ARRAY, items: { type: Type.STRING } },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  }
                }
              }
            }
          }
        },
        relevantSchemes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              eligibility: { type: Type.STRING },
              benefits: { type: Type.STRING },
              link: { type: Type.STRING }
            }
          }
        },
        sidhRecommendations: {
          type: Type.ARRAY,
          items: {
             type: Type.OBJECT,
             properties: {
                title: { type: Type.STRING },
                sector: { type: Type.STRING },
                type: { type: Type.STRING },
                provider: { type: Type.STRING },
                duration: { type: Type.STRING },
                link: { type: Type.STRING }
             }
          }
        },
        summary: { type: Type.STRING },
        cognitiveStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        sportsRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        radarData: {
          type: Type.ARRAY,
          items: {
             type: Type.OBJECT,
             properties: {
                subject: { type: Type.STRING },
                score: { type: Type.NUMBER },
                fullMark: { type: Type.NUMBER }
             }
          }
        }
      }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: schemaConfig
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText) as AssessmentResult;

  } catch (e) {
    console.error("Report Generation Error", e);
    throw e;
  }
};

export const generateReportFromStructuredData = async (
  profile: any,
  scores: any,
  answers: any
): Promise<AssessmentResult> => {
  const sidhContext = JSON.stringify(sidhDatabase.map(c => ({ title: c.title, sector: c.sector, type: c.type })));
  
  // Extract Income Bracket from answers
  const incomeBracket = answers['demo_1'] || 'Unknown';

  const prompt = `
  Analyze this student assessment for **Skill India / Viksit Bharat** alignment.
  
  **Student Demographics:**
  - Income Bracket: ${incomeBracket}
  - Profile: ${JSON.stringify(profile)}
  
  **Scores:** ${JSON.stringify(scores)}
  **Answers:** ${JSON.stringify(answers)}
  
  **Available Skill India (SIDH) Courses:**
  ${sidhContext}

  **Critical Task:** 
  1. Identify top 3 career paths based on scores AND socio-economic feasibility.
  2. For EACH career path, generate a **Personalized Roadmap** that matches the student's income bracket:
     - If **EWS/Lower-Middle**: Prioritize Govt colleges, NAPS apprenticeships, ITI/Diploma, and scholarships (PMKVY).
     - If **Middle/High**: Include broader private/university options but still mention merit scholarships.
  3. Select 2-3 **SIDH Courses** to bridge skill gaps.
  
  Output MUST be valid JSON matching schema.
  `;

  const schemaConfig = {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        recommendedPaths: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              matchScore: { type: Type.NUMBER },
              description: { type: Type.STRING },
              salaryRange: { type: Type.STRING },
              timeToComplete: { type: Type.STRING },
              requiredExams: { type: Type.ARRAY, items: { type: Type.STRING } },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    year: { type: Type.STRING },
                    milestone: { type: Type.STRING },
                    description: { type: Type.STRING },
                    exams: { type: Type.ARRAY, items: { type: Type.STRING } },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  }
                }
              },
              personalizedRoadmap: {
                type: Type.OBJECT,
                properties: {
                    educationPath: { type: Type.ARRAY, items: { type: Type.STRING } },
                    examStrategy: { type: Type.ARRAY, items: { type: Type.STRING } },
                    skillDev: { type: Type.ARRAY, items: { type: Type.STRING } },
                    financialSupport: { type: Type.ARRAY, items: { type: Type.STRING } },
                    alternatives: { type: Type.ARRAY, items: { type: Type.STRING } },
                    meta: {
                        type: Type.OBJECT,
                        properties: {
                            estimatedCost: { type: Type.STRING },
                            duration: { type: Type.STRING },
                            riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                            employmentProbability: { type: Type.STRING },
                            backupPlan: { type: Type.STRING }
                        }
                    }
                }
              }
            }
          }
        },
        relevantSchemes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              eligibility: { type: Type.STRING },
              benefits: { type: Type.STRING },
              link: { type: Type.STRING }
            }
          }
        },
        sidhRecommendations: {
            type: Type.ARRAY,
            items: {
               type: Type.OBJECT,
               properties: {
                  title: { type: Type.STRING },
                  sector: { type: Type.STRING },
                  type: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  link: { type: Type.STRING }
               }
            }
        },
        summary: { type: Type.STRING },
        cognitiveStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        sportsRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        radarData: {
          type: Type.ARRAY,
          items: {
             type: Type.OBJECT,
             properties: {
                subject: { type: Type.STRING },
                score: { type: Type.NUMBER },
                fullMark: { type: Type.NUMBER }
             }
          }
        }
      }
    }
  };

  try {
     const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: schemaConfig
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText) as AssessmentResult;
  } catch (e) {
    console.error("Structured Report Error", e);
    throw e;
  }
};

export const getScholarshipRecommendations = async (userProfileDescription: string): Promise<{id: string, reason: string}[]> => {
    // ... existing function implementation ...
    const availableScholarships = scholarshipDatabase.map(s => ({
        id: s.id,
        name: s.name,
        eligibility: {
            category: s.category,
            groups: s.socialGroup,
            career: s.careerGoal,
            incomeMax: s.incomeLimit
        }
    }));

    const prompt = `
    Student Profile: "${userProfileDescription}"

    Available Scholarships (Metadata):
    ${JSON.stringify(availableScholarships)}

    Task:
    Select the top 3 most relevant scholarships for this student.
    
    Return JSON format.
    `;

    const schemaConfig = {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    reason: { type: Type.STRING }
                }
            }
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: schemaConfig
        });
        const jsonText = response.text || "[]";
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Scholarship Recommendation Error", e);
        return [];
    }
};

// --- NEW FEATURES ---

export interface AICareerInsight {
    summary: string;
    strengths: string[];
    riskAnalysis: string;
    roadmap: string[];
    backupOptions: string[];
    skillGap: { missingSkills: string[], recommendedCerts: string[], plan: string };
}

export const generateCareerInsight = async (summary: string, strengths: string[], career: CareerPath): Promise<AICareerInsight> => {
    const prompt = `
    Analyze this student's profile against the career path: "${career.title}".
    
    Student Summary: ${summary}
    Student Strengths: ${strengths.join(", ")}
    Target Career: ${JSON.stringify(career)}

    Tasks:
    1. Explain why this is a good match.
    2. Identify risks/challenges.
    3. Perform a Skill Gap Analysis (What is missing? Certifications?).
    4. Provide 3 specific backup career options.
    `;

    const schemaConfig = {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                riskAnalysis: { type: Type.STRING },
                roadmap: { type: Type.ARRAY, items: { type: Type.STRING } },
                backupOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                skillGap: {
                    type: Type.OBJECT,
                    properties: {
                        missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                        recommendedCerts: { type: Type.ARRAY, items: { type: Type.STRING } },
                        plan: { type: Type.STRING }
                    }
                }
            }
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { ...schemaConfig, temperature: 0.5 }
        });
        return JSON.parse(response.text || "{}");
    } catch (e) {
        console.error("Career Insight Error", e);
        throw e;
    }
};

export const generateScholarshipGuidance = async (profileDesc: string, scholarship: Scholarship): Promise<{eligibility: string, missingDocs: string, strategy: string}> => {
    const prompt = `
    Check eligibility and provide strategy for this scholarship.
    
    Student Profile: "${profileDesc}"
    Scholarship: ${JSON.stringify(scholarship)}

    Tasks:
    1. Explain eligibility in simple terms.
    2. List potential missing documents based on profile.
    3. Application strategy.
    `;

    const schemaConfig = {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                eligibility: { type: Type.STRING },
                missingDocs: { type: Type.STRING },
                strategy: { type: Type.STRING }
            }
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { ...schemaConfig, temperature: 0.4 }
        });
        return JSON.parse(response.text || "{}");
    } catch (e) {
        throw e;
    }
};

export const generateCollegeFit = async (profileDesc: string, college: College): Promise<{admissionProbability: string, comparison: string, backupOptions: string[], disclaimer: string}> => {
    const prompt = `
    Analyze college fit.
    
    Student Profile: "${profileDesc}"
    College: ${JSON.stringify(college)}

    Tasks:
    1. Estimate admission probability (Soft estimate).
    2. Compare fit.
    3. Backup options.
    `;

    const schemaConfig = {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                admissionProbability: { type: Type.STRING },
                comparison: { type: Type.STRING },
                backupOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                disclaimer: { type: Type.STRING }
            }
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { ...schemaConfig, temperature: 0.4 }
        });
        return JSON.parse(response.text || "{}");
    } catch (e) {
        throw e;
    }
};

export const generateParentReport = async (result: AssessmentResult): Promise<{childStrengths: string, recommendedPath: string, risks: string, scholarshipPlan: string, suggestedSchoolType: string}> => {
    const prompt = `
    Generate a simple, reassuring report for Indian parents.
    
    Assessment Data: ${JSON.stringify(result)}

    Tasks:
    1. Highlight child's strengths clearly.
    2. Explain the recommended path simply.
    3. Mention risks gently.
    4. Suggest a scholarship/funding plan.
    5. Suggest school type (CBSE/State/Vocational).
    `;

    const schemaConfig = {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                childStrengths: { type: Type.STRING },
                recommendedPath: { type: Type.STRING },
                risks: { type: Type.STRING },
                scholarshipPlan: { type: Type.STRING },
                suggestedSchoolType: { type: Type.STRING }
            }
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { ...schemaConfig, temperature: 0.5 }
        });
        return JSON.parse(response.text || "{}");
    } catch (e) {
        throw e;
    }
};
