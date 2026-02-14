
import { Question } from '../types';

// Large Bank of Questions (Min 60)
export const assessmentQuestions: Question[] = [
  
  // --- A. COGNITIVE (20 Questions) ---
  // Sub: Logical
  {
    id: 'cog_1',
    category: 'Cognitive',
    subCategory: 'Logical',
    question: { en: "Look at this series: 2, 6, 12, 20, 30, ... What number comes next?", hi: "2, 6, 12, 20, 30... अगला नंबर क्या होगा?" },
    options: [
      { text: { en: "40", hi: "40" }, value: "wrong" },
      { text: { en: "42", hi: "42" }, value: "correct", scoreImpact: { category: 'Logical', value: 10 } },
      { text: { en: "38", hi: "38" }, value: "wrong" },
      { text: { en: "44", hi: "44" }, value: "wrong" }
    ]
  },
  {
    id: 'cog_logic_2',
    category: 'Cognitive',
    subCategory: 'Logical',
    question: { en: "If 'PENCIL' is written as 'LICNEP', how is 'PAPER' written?", hi: "यदि 'PENCIL' को 'LICNEP' लिखा जाता है, तो 'PAPER' को कैसे लिखा जाएगा?" },
    options: [
      { text: { en: "REPAP", hi: "REPAP" }, value: "correct", scoreImpact: { category: 'Logical', value: 10 } },
      { text: { en: "PEPAR", hi: "PEPAR" }, value: "wrong" },
      { text: { en: "PAPRE", hi: "PAPRE" }, value: "wrong" },
      { text: { en: "REPPA", hi: "REPPA" }, value: "wrong" }
    ]
  },
  {
    id: 'cog_logic_3',
    category: 'Cognitive',
    subCategory: 'Logical',
    question: { en: "Bird is to Fly as Fish is to...?", hi: "पक्षी : उड़ना :: मछली : ...?" },
    options: [
      { text: { en: "Water", hi: "पानी" }, value: "wrong" },
      { text: { en: "Swim", hi: "तैरना" }, value: "correct", scoreImpact: { category: 'Logical', value: 10 } },
      { text: { en: "Gill", hi: "गलफड़ा" }, value: "wrong" },
      { text: { en: "River", hi: "नदी" }, value: "wrong" }
    ]
  },
  {
    id: 'cog_logic_4',
    category: 'Cognitive',
    subCategory: 'Logical',
    question: { en: "Which number is the odd one out: 3, 5, 7, 9, 11?", hi: "विषम संख्या कौन सी है: 3, 5, 7, 9, 11?" },
    options: [
      { text: { en: "9", hi: "9" }, value: "correct", scoreImpact: { category: 'Logical', value: 10 } },
      { text: { en: "7", hi: "7" }, value: "wrong" },
      { text: { en: "11", hi: "11" }, value: "wrong" },
      { text: { en: "3", hi: "3" }, value: "wrong" }
    ]
  },
  
  // Sub: Numerical
  {
    id: 'cog_2',
    category: 'Cognitive',
    subCategory: 'Numerical',
    question: { en: "If 3 pencils cost ₹15, how much will 12 pencils cost?", hi: "3 पेंसिल ₹15 की हैं, तो 12 कितने की होंगी?" },
    options: [
      { text: { en: "₹45", hi: "₹45" }, value: "wrong" },
      { text: { en: "₹60", hi: "₹60" }, value: "correct", scoreImpact: { category: 'Numerical', value: 10 } },
      { text: { en: "₹50", hi: "₹50" }, value: "wrong" },
      { text: { en: "₹75", hi: "₹75" }, value: "wrong" }
    ]
  },
  {
    id: 'cog_num_2',
    category: 'Cognitive',
    subCategory: 'Numerical',
    question: { en: "What is 15% of 200?", hi: "200 का 15% क्या है?" },
    options: [
      { text: { en: "30", hi: "30" }, value: "correct", scoreImpact: { category: 'Numerical', value: 10 } },
      { text: { en: "25", hi: "25" }, value: "wrong" },
      { text: { en: "20", hi: "20" }, value: "wrong" },
      { text: { en: "35", hi: "35" }, value: "wrong" }
    ]
  },
  {
    id: 'cog_num_3',
    category: 'Cognitive',
    subCategory: 'Numerical',
    question: { en: "A train travels 60km in 1 hour. How far does it go in 30 mins?", hi: "ट्रेन 1 घंटे में 60 किमी चलती है। 30 मिनट में कितनी दूर जाएगी?" },
    options: [
      { text: { en: "20 km", hi: "20 किमी" }, value: "wrong" },
      { text: { en: "40 km", hi: "40 किमी" }, value: "wrong" },
      { text: { en: "30 km", hi: "30 किमी" }, value: "correct", scoreImpact: { category: 'Numerical', value: 10 } },
      { text: { en: "15 km", hi: "15 किमी" }, value: "wrong" }
    ]
  },

  // Sub: Spatial
  {
    id: 'cog_5',
    category: 'Cognitive',
    subCategory: 'Spatial',
    question: { en: "Which shape can be made by folding a piece of paper with 6 squares (like a cross)?", hi: "6 वर्गों वाले कागज को मोड़कर क्या बनेगा?" },
    options: [
      { text: { en: "Triangle", hi: "त्रिकोण" }, value: "wrong" },
      { text: { en: "Cube", hi: "घन" }, value: "correct", scoreImpact: { category: 'Spatial', value: 10 } },
      { text: { en: "Sphere", hi: "गोला" }, value: "wrong" },
      { text: { en: "Cone", hi: "शंकु" }, value: "wrong" }
    ]
  },
  {
    id: 'cog_spatial_2',
    category: 'Cognitive',
    subCategory: 'Spatial',
    question: { en: "If you rotate the letter 'b' 180 degrees clockwise, what does it look like?", hi: "अक्षर 'b' को 180 डिग्री घुमाने पर क्या दिखेगा?" },
    options: [
      { text: { en: "d", hi: "d" }, value: "wrong" },
      { text: { en: "p", hi: "p" }, value: "wrong" },
      { text: { en: "q", hi: "q" }, value: "correct", scoreImpact: { category: 'Spatial', value: 10 } },
      { text: { en: "g", hi: "g" }, value: "wrong" }
    ]
  },

  // Sub: Verbal
  {
    id: 'cog_3',
    category: 'Cognitive',
    subCategory: 'Verbal',
    question: { en: "Doctor : Hospital :: Teacher : ?", hi: "डॉक्टर : अस्पताल :: शिक्षक : ?" },
    options: [
      { text: { en: "Book", hi: "किताब" }, value: "wrong" },
      { text: { en: "School", hi: "विद्यालय" }, value: "correct", scoreImpact: { category: 'Verbal', value: 10 } },
      { text: { en: "Student", hi: "छात्र" }, value: "wrong" },
      { text: { en: "Class", hi: "कक्षा" }, value: "partial" }
    ]
  },
  {
    id: 'cog_verb_2',
    category: 'Cognitive',
    subCategory: 'Verbal',
    question: { en: "Choose the synonym for 'Huge'.", hi: "'Huge' का पर्यायवाची चुनें।" },
    options: [
      { text: { en: "Tiny", hi: "छोटा" }, value: "wrong" },
      { text: { en: "Enormous", hi: "विशाल" }, value: "correct", scoreImpact: { category: 'Verbal', value: 10 } },
      { text: { en: "Soft", hi: "मुलायम" }, value: "wrong" },
      { text: { en: "Cold", hi: "ठंडा" }, value: "wrong" }
    ]
  },

  // Sub: Ethics/Decision
  {
    id: 'cog_4',
    category: 'Cognitive',
    subCategory: 'Decision Making',
    question: { en: "You find a wallet on the road. What do you do?", hi: "सड़क पर बटुआ मिलने पर आप क्या करेंगे?" },
    options: [
      { text: { en: "Keep it", hi: "रख लेंगे" }, value: "wrong" },
      { text: { en: "Ignore it", hi: "छोड़ देंगे" }, value: "neutral" },
      { text: { en: "Give to Police", hi: "पुलिस को देंगे" }, value: "correct", scoreImpact: { category: 'Ethics', value: 10 } }
    ]
  },

  // More Cognitive filler
  { id: 'cog_fill_1', category: 'Cognitive', subCategory: 'Logical', question: { en: "A is the father of B. B is the sister of C. How is A related to C?", hi: "A, B का पिता है। B, C की बहन है। A, C का कौन है?" }, options: [{ text: { en: "Father", hi: "पिता" }, value: "correct", scoreImpact: { category: 'Logical', value: 10 } }, { text: { en: "Uncle", hi: "चाचा" }, value: "wrong" }] },
  { id: 'cog_fill_2', category: 'Cognitive', subCategory: 'Numerical', question: { en: "Next prime number after 7?", hi: "7 के बाद अगली अभाज्य संख्या?" }, options: [{ text: { en: "11", hi: "11" }, value: "correct", scoreImpact: { category: 'Numerical', value: 10 } }, { text: { en: "9", hi: "9" }, value: "wrong" }] },
  { id: 'cog_fill_3', category: 'Cognitive', subCategory: 'Spatial', question: { en: "How many corners does a cube have?", hi: "घन के कितने कोने होते हैं?" }, options: [{ text: { en: "8", hi: "8" }, value: "correct", scoreImpact: { category: 'Spatial', value: 10 } }, { text: { en: "6", hi: "6" }, value: "wrong" }] },
  { id: 'cog_fill_4', category: 'Cognitive', subCategory: 'Verbal', question: { en: "Antonym of 'Brave'?", hi: "'Brave' का विलोम?" }, options: [{ text: { en: "Cowardly", hi: "कायर" }, value: "correct", scoreImpact: { category: 'Verbal', value: 10 } }, { text: { en: "Strong", hi: "मजबूत" }, value: "wrong" }] },
  { id: 'cog_fill_5', category: 'Cognitive', subCategory: 'Logical', question: { en: "Sun : Day :: Moon : ?", hi: "सूर्य : दिन :: चंद्रमा : ?" }, options: [{ text: { en: "Night", hi: "रात" }, value: "correct", scoreImpact: { category: 'Logical', value: 10 } }, { text: { en: "Star", hi: "तारा" }, value: "wrong" }] },
  { id: 'cog_fill_6', category: 'Cognitive', subCategory: 'Numerical', question: { en: "100 divided by 0.5 is?", hi: "100 को 0.5 से भाग देने पर?" }, options: [{ text: { en: "200", hi: "200" }, value: "correct", scoreImpact: { category: 'Numerical', value: 10 } }, { text: { en: "50", hi: "50" }, value: "wrong" }] },
  { id: 'cog_fill_7', category: 'Cognitive', subCategory: 'Spatial', question: { en: "Which is a 2D shape?", hi: "2D आकार कौन सा है?" }, options: [{ text: { en: "Square", hi: "वर्ग" }, value: "correct", scoreImpact: { category: 'Spatial', value: 10 } }, { text: { en: "Ball", hi: "गेंद" }, value: "wrong" }] },
  { id: 'cog_fill_8', category: 'Cognitive', subCategory: 'Verbal', question: { en: "Find the odd one out: Apple, Banana, Carrot, Grape", hi: "अलग चुनें: सेब, केला, गाजर, अंगूर" }, options: [{ text: { en: "Carrot", hi: "गाजर" }, value: "correct", scoreImpact: { category: 'Verbal', value: 10 } }, { text: { en: "Apple", hi: "सेब" }, value: "wrong" }] },

  // --- B. ACADEMIC (20 Questions - Preference Likert) ---
  // Scale: 10 (Strongly Agree) -> 0 (Disagree)
  
  {
    id: 'acad_1',
    category: 'Academic',
    subCategory: 'Math',
    question: { en: "I enjoy solving complex math problems.", hi: "मुझे गणित के जटिल सवाल हल करना पसंद है।" },
    options: [
      { text: { en: "Yes!", hi: "हाँ!" }, value: "High", scoreImpact: { category: 'Math', value: 10 } },
      { text: { en: "Neutral", hi: "ठीक है" }, value: "Med", scoreImpact: { category: 'Math', value: 5 } },
      { text: { en: "No", hi: "नहीं" }, value: "Low", scoreImpact: { category: 'Math', value: 0 } }
    ]
  },
  {
    id: 'acad_2',
    category: 'Academic',
    subCategory: 'Theory',
    question: { en: "I prefer reading history or stories over doing experiments.", hi: "मुझे प्रयोग करने से ज्यादा इतिहास या कहानियाँ पढ़ना पसंद है।" },
    options: [
      { text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Theory', value: 10 } },
      { text: { en: "No", hi: "नहीं" }, value: "Low", scoreImpact: { category: 'Practical', value: 10 } }
    ]
  },
  {
    id: 'acad_3',
    category: 'Academic',
    subCategory: 'Tech',
    question: { en: "I am curious about how machines and robots work.", hi: "मुझे मशीनों और रोबोट के काम करने के तरीके में दिलचस्पी है।" },
    options: [
      { text: { en: "Very much", hi: "बहुत ज्यादा" }, value: "High", scoreImpact: { category: 'Technical', value: 10 } },
      { text: { en: "Not really", hi: "खास नहीं" }, value: "Low", scoreImpact: { category: 'Technical', value: 0 } }
    ]
  },
  {
    id: 'acad_4',
    category: 'Academic',
    subCategory: 'Biology',
    question: { en: "I enjoy learning about plants, animals, and human body.", hi: "मुझे पौधों, जानवरों और मानव शरीर के बारे में सीखना पसंद है।" },
    options: [
      { text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Biology', value: 10 } },
      { text: { en: "No", hi: "नहीं" }, value: "Low" }
    ]
  },
  {
    id: 'acad_5',
    category: 'Academic',
    subCategory: 'Arts',
    question: { en: "I would rather draw a diagram than write an essay.", hi: "मैं निबंध लिखने के बजाय चित्र बनाना पसंद करूँगा।" },
    options: [
      { text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Arts', value: 10 } },
      { text: { en: "No", hi: "नहीं" }, value: "Low" }
    ]
  },
  { id: 'acad_6', category: 'Academic', subCategory: 'Finance', question: { en: "I like managing money and calculating savings.", hi: "मुझे पैसे का प्रबंधन और बचत की गणना करना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Commerce', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_7', category: 'Academic', subCategory: 'Law', question: { en: "I enjoy debating and proving my point.", hi: "मुझे बहस करना और अपनी बात साबित करना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Law', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_8', category: 'Academic', subCategory: 'CompSci', question: { en: "I want to learn how to create apps or websites.", hi: "मैं ऐप्स या वेबसाइट बनाना सीखना चाहता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Technical', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_9', category: 'Academic', subCategory: 'Social', question: { en: "I like helping people solve their personal problems.", hi: "मुझे लोगों की निजी समस्याएं सुलझाने में मदद करना अच्छा लगता है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Social', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_10', category: 'Academic', subCategory: 'Practical', question: { en: "I prefer working outdoors rather than in an office.", hi: "मुझे ऑफिस के बजाय बाहर काम करना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Field', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_11', category: 'Academic', subCategory: 'Physics', question: { en: "I wonder why stars shine or how planes fly.", hi: "मैं सोचता हूँ कि तारे क्यों चमकते हैं या विमान कैसे उड़ते हैं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Science', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_12', category: 'Academic', subCategory: 'Literature', question: { en: "I love reading novels and writing stories.", hi: "मुझे उपन्यास पढ़ना और कहानियाँ लिखना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Arts', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_13', category: 'Academic', subCategory: 'Chem', question: { en: "Mixing chemicals to see reactions sounds fun.", hi: "रसायनों को मिलाकर प्रतिक्रिया देखना मजेदार लगता है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Science', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_14', category: 'Academic', subCategory: 'Biz', question: { en: "I dream of starting my own business one day.", hi: "मेरा सपना है कि मैं एक दिन अपना खुद का व्यवसाय शुरू करूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Business', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_15', category: 'Academic', subCategory: 'Env', question: { en: "I care deeply about climate change and nature.", hi: "मैं जलवायु परिवर्तन और प्रकृति की बहुत परवाह करता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Environment', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_16', category: 'Academic', subCategory: 'Arch', question: { en: "I like looking at building designs and structures.", hi: "मुझे इमारतों के डिजाइन और ढांचे देखना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Architecture', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_17', category: 'Academic', subCategory: 'Teaching', question: { en: "I enjoy explaining things to others.", hi: "मुझे दूसरों को चीजें समझाना अच्छा लगता है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Education', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_18', category: 'Academic', subCategory: 'Govt', question: { en: "I am interested in how the government works.", hi: "मुझे इसमें दिलचस्पी है कि सरकार कैसे काम करती है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'PolSci', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_19', category: 'Academic', subCategory: 'Psych', question: { en: "I want to understand why people behave the way they do.", hi: "मैं समझना चाहता हूँ कि लोग ऐसा व्यवहार क्यों करते हैं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Psychology', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'acad_20', category: 'Academic', subCategory: 'Lang', question: { en: "I find learning new languages easy.", hi: "मुझे नई भाषाएँ सीखना आसान लगता है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Linguistics', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },

  // --- C. SPORTS (20 Questions - Aptitude Likert) ---
  
  {
    id: 'sport_1',
    category: 'Sports',
    subCategory: 'Interest',
    question: { en: "Do you want to pursue sports seriously?", hi: "क्या आप खेलों में करियर बनाना चाहते हैं?" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "Yes" }, { text: { en: "No", hi: "नहीं" }, value: "No" }]
  },
  {
    id: 'sport_2',
    category: 'Sports',
    subCategory: 'Team',
    question: { en: "I prefer team sports (Cricket/Football) over solo.", hi: "मुझे टीम खेल (क्रिकेट/फुटबॉल) पसंद हैं।" },
    options: [{ text: { en: "Agree", hi: "सहमत" }, value: "Team" }, { text: { en: "Disagree", hi: "असहमत" }, value: "Solo" }]
  },
  {
    id: 'sport_3',
    category: 'Sports',
    subCategory: 'Strength',
    question: { en: "I can throw a ball very far.", hi: "मैं गेंद को बहुत दूर फेंक सकता हूँ।" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Strength', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }]
  },
  {
    id: 'sport_4',
    category: 'Sports',
    subCategory: 'Stamina',
    question: { en: "I can run for 20 minutes without stopping.", hi: "मैं बिना रुके 20 मिनट दौड़ सकता हूँ।" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Stamina', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }]
  },
  {
    id: 'sport_5',
    category: 'Sports',
    subCategory: 'Reflex',
    question: { en: "I react quickly to catch falling objects.", hi: "मैं गिरती हुई चीजों को पकड़ने के लिए तेजी से प्रतिक्रिया करता हूँ।" },
    options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Reflex', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }]
  },
  { id: 'sport_6', category: 'Sports', subCategory: 'Strategy', question: { en: "I enjoy planning game tactics.", hi: "मुझे खेल की रणनीति बनाना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Tactical', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_7', category: 'Sports', subCategory: 'Agility', question: { en: "I can change direction quickly while running.", hi: "मैं दौड़ते समय दिशा तेजी से बदल सकता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Agility', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_8', category: 'Sports', subCategory: 'Coordination', question: { en: "I am good at aiming (shooting/archery).", hi: "मेरा निशाना अच्छा है (शूटिंग/तीरंदाजी)।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Coordination', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_9', category: 'Sports', subCategory: 'Resilience', question: { en: "I keep playing even if I am slightly hurt.", hi: "हल्की चोट लगने पर भी मैं खेलता रहता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Grit', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_10', category: 'Sports', subCategory: 'Leadership', question: { en: "I like being the captain of the team.", hi: "मुझे टीम का कप्तान बनना पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High", scoreImpact: { category: 'Leadership', value: 10 } }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  // Adding 10 more generic sport fillers to reach 20
  { id: 'sport_11', category: 'Sports', subCategory: 'Flexibility', question: { en: "I can touch my toes easily.", hi: "मैं आसानी से अपने पैर के अंगूठे छू सकता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_12', category: 'Sports', subCategory: 'Balance', question: { en: "I can stand on one leg for a long time.", hi: "मैं एक पैर पर लंबे समय तक खड़ा रह सकता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_13', category: 'Sports', subCategory: 'Water', question: { en: "I am comfortable swimming in deep water.", hi: "मैं गहरे पानी में तैरने में सहज हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_14', category: 'Sports', subCategory: 'Focus', question: { en: "I don't get distracted by the crowd when playing.", hi: "खेलते समय मैं भीड़ से विचलित नहीं होता।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_15', category: 'Sports', subCategory: 'Speed', question: { en: "I am usually the fastest runner in my class.", hi: "मैं आमतौर पर अपनी कक्षा में सबसे तेज धावक हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_16', category: 'Sports', subCategory: 'Combat', question: { en: "I enjoy martial arts or wrestling.", hi: "मुझे मार्शल आर्ट या कुश्ती पसंद है।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_17', category: 'Sports', subCategory: 'Routine', question: { en: "I follow a strict exercise routine.", hi: "मैं सख्त व्यायाम दिनचर्या का पालन करता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_18', category: 'Sports', subCategory: 'Diet', question: { en: "I am careful about what I eat for fitness.", hi: "मैं फिटनेस के लिए अपने खान-पान को लेकर सावधान रहता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_19', category: 'Sports', subCategory: 'Risk', question: { en: "I enjoy adventure sports.", hi: "मुझे साहसिक खेल पसंद हैं।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },
  { id: 'sport_20', category: 'Sports', subCategory: 'Analytic', question: { en: "I watch sports to analyze player techniques.", hi: "मैं खिलाड़ी की तकनीक का विश्लेषण करने के लिए खेल देखता हूँ।" }, options: [{ text: { en: "Yes", hi: "हाँ" }, value: "High" }, { text: { en: "No", hi: "नहीं" }, value: "Low" }] },

  // --- D. INCOME (Keep as is) ---
  {
    id: 'demo_1',
    category: 'Demographic',
    subCategory: 'Income Context',
    question: { en: "To find the best scholarships & colleges for you, what is your annual family income range?", hi: "आपकी वार्षिक पारिवारिक आय सीमा क्या है?" },
    options: [
      { text: { en: "Below ₹2.5 Lakhs (EWS)", hi: "₹2.5 लाख से कम" }, value: "EWS (< ₹2.5L)" },
      { text: { en: "₹2.5 - ₹6 Lakhs", hi: "₹2.5 - ₹6 लाख" }, value: "Lower-Middle (₹2.5-6L)" },
      { text: { en: "₹6 - ₹12 Lakhs", hi: "₹6 - ₹12 लाख" }, value: "Middle (₹6-12L)" },
      { text: { en: "Above ₹12 Lakhs", hi: "₹12 लाख से अधिक" }, value: "Upper-Middle (> ₹12L)" }
    ]
  }
];
