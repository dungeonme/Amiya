import { Question } from '../types';

export const sportsQuestions: Question[] = [
  // --- A. Strength ---
  {
    id: 'spt_str_1',
    category: 'Sports',
    subCategory: 'Strength',
    question: { en: "I can lift heavy objects easily compared to my peers.", hi: "मैं अपने साथियों की तुलना में आसानी से भारी चीजें उठा सकता हूं।" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Strength', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }]
  },
  {
    id: 'spt_str_2',
    category: 'Sports',
    subCategory: 'Strength',
    question: { en: "I enjoy push-ups and pull-ups.", hi: "मुझे पुश-अप्स और पुल-अप्स पसंद हैं।" },
    options: [{ text: { en: "Love them", hi: "बहुत पसंद है" }, value: "High", scoreImpact: { category: 'Strength', value: 10 } }, { text: { en: "Hate them", hi: "नापसंद" }, value: "Low" }]
  },
  { id: 'spt_str_3', category: 'Sports', subCategory: 'Strength', question: { en: "My throwing arm is very strong.", hi: "मेरी फेंकने वाली भुजा बहुत मजबूत है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Strength', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  
  // --- B. Speed ---
  {
    id: 'spt_spd_1',
    category: 'Sports',
    subCategory: 'Speed',
    question: { en: "I am usually the first to reach the finish line in a 100m race.", hi: "मैं आमतौर पर 100 मीटर की दौड़ में सबसे पहले फिनिश लाइन पर पहुंचता हूं।" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Speed', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }]
  },
  {
    id: 'spt_spd_2',
    category: 'Sports',
    subCategory: 'Speed',
    question: { en: "I can change direction instantly while running.", hi: "मैं दौड़ते समय तुरंत दिशा बदल सकता हूं।" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Speed', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }]
  },

  // --- C. Endurance ---
  {
    id: 'spt_end_1',
    category: 'Sports',
    subCategory: 'Endurance',
    question: { en: "I can play for hours without getting tired.", hi: "मैं बिना थके घंटों खेल सकता हूं।" },
    options: [{ text: { en: "True", hi: "सच" }, value: "High", scoreImpact: { category: 'Endurance', value: 10 } }, { text: { en: "False", hi: "गलत" }, value: "Low" }]
  },
  {
    id: 'spt_end_2',
    category: 'Sports',
    subCategory: 'Endurance',
    question: { en: "I recover my breath quickly after running.", hi: "दौड़ने के बाद मेरी सांस जल्दी सामान्य हो जाती है।" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Endurance', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }]
  },

  // --- D. Coordination ---
  {
    id: 'spt_crd_1',
    category: 'Sports',
    subCategory: 'Coordination',
    question: { en: "I can catch a ball thrown from any direction.", hi: "मैं किसी भी दिशा से फेंकी गई गेंद को पकड़ सकता हूं।" },
    options: [{ text: { en: "Easily", hi: "आसानी से" }, value: "High", scoreImpact: { category: 'Coordination', value: 10 } }, { text: { en: "Struggle", hi: "मुश्किल से" }, value: "Low" }]
  },
  { id: 'spt_crd_2', category: 'Sports', subCategory: 'Coordination', question: { en: "I am good at hitting a target (aiming).", hi: "मैं निशाना लगाने में अच्छा हूं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Coordination', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },

  // --- E. Tactical ---
  {
    id: 'spt_tac_1',
    category: 'Sports',
    subCategory: 'Tactical',
    question: { en: "I can guess what the opponent will do next.", hi: "मैं अनुमान लगा सकता हूं कि प्रतिद्वंद्वी आगे क्या करेगा।" },
    options: [{ text: { en: "Often", hi: "अक्सर" }, value: "High", scoreImpact: { category: 'Tactical', value: 10 } }, { text: { en: "Rarely", hi: "शायद ही कभी" }, value: "Low" }]
  },
  {
    id: 'spt_tac_2',
    category: 'Sports',
    subCategory: 'Tactical',
    question: { en: "I stay calm in the last minute of a match.", hi: "मैं मैच के आखिरी मिनट में शांत रहता हूं।" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Tactical', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }]
  },

  // --- F. Flexibility ---
  {
    id: 'spt_flx_1',
    category: 'Sports',
    subCategory: 'Flexibility',
    question: { en: "I can touch my toes without bending my knees.", hi: "मैं घुटने मोड़े बिना अपने पैर के अंगूठे छू सकता हूं।" },
    options: [{ text: { en: "Easily", hi: "आसानी से" }, value: "High", scoreImpact: { category: 'Flexibility', value: 10 } }, { text: { en: "Hardly", hi: "मुश्किल से" }, value: "Low" }]
  },
  {
    id: 'spt_flx_2',
    category: 'Sports',
    subCategory: 'Flexibility',
    question: { en: "My body feels stiff when I try to stretch.", hi: "स्ट्रेचिंग करते समय मेरा शरीर अकड़ा हुआ महसूस होता है।" },
    options: [{ text: { en: "False", hi: "गलत" }, value: "High", scoreImpact: { category: 'Flexibility', value: 10 } }, { text: { en: "True", hi: "सच" }, value: "Low" }]
  }
];
