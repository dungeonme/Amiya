import { Question } from '../types';

export const psychometricQuestions: Question[] = [
  // --- A. Personality Traits (Big Five) ---
  {
    id: 'psy_p_1',
    category: 'Psychometric',
    subCategory: 'Personality',
    question: { en: "I enjoy being the center of attention in a group.", hi: "मुझे समूह में ध्यान का केंद्र बनना पसंद है।" },
    options: [
      { text: { en: "Strongly Agree", hi: "पूर्णतः सहमत" }, value: "High", scoreImpact: { category: 'Extraversion', value: 10 } },
      { text: { en: "Agree", hi: "सहमत" }, value: "Med", scoreImpact: { category: 'Extraversion', value: 5 } },
      { text: { en: "Disagree", hi: "असहमत" }, value: "Low", scoreImpact: { category: 'Extraversion', value: 0 } }
    ]
  },
  {
    id: 'psy_p_2',
    category: 'Psychometric',
    subCategory: 'Personality',
    question: { en: "I prefer planning everything in detail rather than being spontaneous.", hi: "मैं सहज होने के बजाय हर चीज की विस्तार से योजना बनाना पसंद करता हूं।" },
    options: [
      { text: { en: "Strongly Agree", hi: "पूर्णतः सहमत" }, value: "High", scoreImpact: { category: 'Conscientiousness', value: 10 } },
      { text: { en: "Disagree", hi: "असहमत" }, value: "Low", scoreImpact: { category: 'Conscientiousness', value: 0 } }
    ]
  },
  {
    id: 'psy_p_3',
    category: 'Psychometric',
    subCategory: 'Personality',
    question: { en: "I stay calm even in stressful situations.", hi: "तनावपूर्ण स्थितियों में भी मैं शांत रहता हूं।" },
    options: [
      { text: { en: "Always", hi: "हमेशा" }, value: "High", scoreImpact: { category: 'EmotionalStability', value: 10 } },
      { text: { en: "Rarely", hi: "शायद ही कभी" }, value: "Low", scoreImpact: { category: 'EmotionalStability', value: 0 } }
    ]
  },
  { id: 'psy_p_4', category: 'Psychometric', subCategory: 'Personality', question: { en: "I enjoy trying new foods, hobbies, or ideas.", hi: "मुझे नए भोजन, शौक या विचारों को आजमाना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Openness', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_p_5', category: 'Psychometric', subCategory: 'Personality', question: { en: "I put others' needs before my own.", hi: "मैं अपनी जरूरतों से पहले दूसरों की जरूरतों को रखता हूं।" }, options: [{ text: { en: "Often", hi: "अक्सर" }, value: "High", scoreImpact: { category: 'Agreeableness', value: 10 } }, { text: { en: "Sometimes", hi: "कभी-कभी" }, value: "Med" }] },
  // ... (Add more to reach 10 per category implicitly via rotation logic in engine) ...
  { id: 'psy_p_6', category: 'Psychometric', subCategory: 'Personality', question: { en: "I feel energized after meeting new people.", hi: "नए लोगों से मिलने के बाद मैं ऊर्जावान महसूस करता हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Extraversion', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_p_7', category: 'Psychometric', subCategory: 'Personality', question: { en: "I always finish my work before the deadline.", hi: "मैं हमेशा समय सीमा से पहले अपना काम पूरा करता हूं।" }, options: [{ text: { en: "Always", hi: "हमेशा" }, value: "High", scoreImpact: { category: 'Conscientiousness', value: 10 } }, { text: { en: "Sometimes", hi: "कभी-कभी" }, value: "Med" }] },
  { id: 'psy_p_8', category: 'Psychometric', subCategory: 'Personality', question: { en: "I rarely worry about things.", hi: "मैं शायद ही कभी चीजों के बारे में चिंता करता हूं।" }, options: [{ text: { en: "True", hi: "सच" }, value: "High", scoreImpact: { category: 'EmotionalStability', value: 10 } }, { text: { en: "False", hi: "गलत" }, value: "Low" }] },
  { id: 'psy_p_9', category: 'Psychometric', subCategory: 'Personality', question: { en: "I like philosophical discussions.", hi: "मुझे दार्शनिक चर्चाएँ पसंद हैं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Openness', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_p_10', category: 'Psychometric', subCategory: 'Personality', question: { en: "I trust people easily.", hi: "मैं लोगों पर आसानी से भरोसा करता हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Agreeableness', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },

  // --- B. Work Preference Style ---
  {
    id: 'psy_w_1',
    category: 'Psychometric',
    subCategory: 'WorkStyle',
    question: { en: "I prefer tasks with clear instructions over open-ended ones.", hi: "मैं स्पष्ट निर्देशों वाले कार्यों को पसंद करता हूं।" },
    options: [
      { text: { en: "Prefer Structured", hi: "संरचित पसंद" }, value: "Struct", scoreImpact: { category: 'Structure', value: 10 } },
      { text: { en: "Prefer Open", hi: "खुला पसंद" }, value: "Open", scoreImpact: { category: 'Creativity', value: 10 } }
    ]
  },
  { id: 'psy_w_2', category: 'Psychometric', subCategory: 'WorkStyle', question: { en: "I like fixing broken things with my hands.", hi: "मुझे अपने हाथों से टूटी हुई चीजों को ठीक करना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'HandsOn', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_w_3', category: 'Psychometric', subCategory: 'WorkStyle', question: { en: "I prefer working alone to focus better.", hi: "मैं बेहतर ध्यान केंद्रित करने के लिए अकेले काम करना पसंद करता हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "Solo", scoreImpact: { category: 'Solo', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Team", scoreImpact: { category: 'Team', value: 10 } }] },
  { id: 'psy_w_4', category: 'Psychometric', subCategory: 'WorkStyle', question: { en: "I enjoy analyzing data and graphs.", hi: "मुझे डेटा और ग्राफ़ का विश्लेषण करना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Analytical', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_w_5', category: 'Psychometric', subCategory: 'WorkStyle', question: { en: "I like coming up with new ideas more than executing them.", hi: "मुझे उन्हें क्रियान्वित करने से अधिक नए विचारों के साथ आना पसंद है।" }, options: [{ text: { en: "Ideation", hi: "विचारणा" }, value: "Idea", scoreImpact: { category: 'Creativity', value: 10 } }, { text: { en: "Execution", hi: "निष्पादन" }, value: "Exec", scoreImpact: { category: 'Structure', value: 10 } }] },
  
  // --- C. Decision Making ---
  {
    id: 'psy_d_1',
    category: 'Psychometric',
    subCategory: 'DecisionMaking',
    question: { en: "I rely on my gut feeling (intuition) when making choices.", hi: "निर्णय लेते समय मैं अपनी अंतर्ज्ञान पर भरोसा करता हूं।" },
    options: [
      { text: { en: "Mostly", hi: "अधिकतर" }, value: "Intuition", scoreImpact: { category: 'Intuitive', value: 10 } },
      { text: { en: "Rarely (I use data)", hi: "शायद ही कभी (डेटा का उपयोग)" }, value: "Data", scoreImpact: { category: 'DataDriven', value: 10 } }
    ]
  },
  { id: 'psy_d_2', category: 'Psychometric', subCategory: 'DecisionMaking', question: { en: "I take risks if the reward is high.", hi: "अगर इनाम बड़ा हो तो मैं जोखिम उठाता हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'RiskTaking', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_d_3', category: 'Psychometric', subCategory: 'DecisionMaking', question: { en: "I need everyone's approval before deciding.", hi: "निर्णय लेने से पहले मुझे सबकी मंजूरी चाहिए।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "Consensus", scoreImpact: { category: 'Consensus', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Independent", scoreImpact: { category: 'Independent', value: 10 } }] },
  
  // --- D. Emotional Intelligence ---
  {
    id: 'psy_e_1',
    category: 'Psychometric',
    subCategory: 'EQ',
    question: { en: "I can easily tell when someone is upset even if they don't say it.", hi: "मैं आसानी से बता सकता हूं कि कोई कब परेशान है, भले ही वे कहें नहीं।" },
    options: [
      { text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Empathy', value: 10 } },
      { text: { en: "No", hi: "नहीं" }, value: "Low" }
    ]
  },
  { id: 'psy_e_2', category: 'Psychometric', subCategory: 'EQ', question: { en: "I stay calm when someone yells at me.", hi: "जब कोई मुझ पर चिल्लाता है तो मैं शांत रहता हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'SelfControl', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_e_3', category: 'Psychometric', subCategory: 'EQ', question: { en: "I am good at resolving fights between friends.", hi: "मैं दोस्तों के बीच झगड़े सुलझाने में अच्छा हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'ConflictRes', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },

  // --- E. Career Orientation ---
  {
    id: 'psy_c_1',
    category: 'Psychometric',
    subCategory: 'CareerValues',
    question: { en: "Job security is more important to me than high income.", hi: "मेरे लिए उच्च आय से अधिक नौकरी की सुरक्षा महत्वपूर्ण है।" },
    options: [
      { text: { en: "Agree", hi: "सहमत" }, value: "Security", scoreImpact: { category: 'Stability', value: 10 } },
      { text: { en: "Disagree", hi: "असहमत" }, value: "Growth", scoreImpact: { category: 'Money', value: 10 } }
    ]
  },
  { id: 'psy_c_2', category: 'Psychometric', subCategory: 'CareerValues', question: { en: "I want a career that makes me famous.", hi: "मैं ऐसा करियर चाहता हूं जो मुझे प्रसिद्ध बनाए।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Fame', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_c_3', category: 'Psychometric', subCategory: 'CareerValues', question: { en: "I want to help society even if paid less.", hi: "मैं कम वेतन मिलने पर भी समाज की मदद करना चाहता हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'SocialImpact', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'psy_c_4', category: 'Psychometric', subCategory: 'CareerValues', question: { en: "I want to start my own company.", hi: "मैं अपनी खुद की कंपनी शुरू करना चाहता हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Entrepreneurship', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] }
];
