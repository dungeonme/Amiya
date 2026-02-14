
import React, { useState } from 'react';
import { Palette, Music, Clapperboard, Video, Lightbulb, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { scholarshipDatabase } from '../services/scholarshipData';
import { creativeQuestionBank } from '../services/creativeData';
import { Scholarship } from '../types';

const ActivityIcon = ({size}: {size:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const CATEGORIES = [
  { id: 'Music', label: 'Music & Singing', icon: <Music size={24} />, desc: 'Pitch, rhythm, and vocal control' },
  { id: 'Dance', label: 'Dance & Rhythm', icon: <ActivityIcon size={24} />, desc: 'Movement, coordination, and stamina' },
  { id: 'Visual Arts', label: 'Visual Arts', icon: <Palette size={24} />, desc: 'Drawing, painting, and design' },
  { id: 'Performing Arts', label: 'Acting & Theatre', icon: <Clapperboard size={24} />, desc: 'Expression, dialogue, and stage presence' },
  { id: 'Creative', label: 'Creative Biz', icon: <Lightbulb size={24} />, desc: 'Entrepreneurship and digital creation' },
];

const CreativeAssessment = () => {
  const [step, setStep] = useState<'select' | 'test' | 'result'>('select');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sessionQuestions, setSessionQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<number[]>([]); // 1 for yes, 0 for no/maybe
  const [score, setScore] = useState(0);

  const startTest = (catId: string) => {
    setSelectedCategory(catId);
    
    // Randomize and Pick 8 Questions from the bank (out of 12)
    const allQuestions = creativeQuestionBank[catId] || [];
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8);
    
    setSessionQuestions(selected);
    setAnswers(new Array(selected.length).fill(-1)); // -1 means unanswered
    setStep('test');
  };

  const handleAnswer = (idx: number, val: number) => {
    const newAns = [...answers];
    newAns[idx] = val;
    setAnswers(newAns);
  };

  const finishTest = () => {
    // Scoring: 12.5 points per question for 8 questions = 100 max
    // Yes = 12.5, No = 0.
    const pointPerQ = 100 / sessionQuestions.length;
    const total = answers.reduce((acc, curr) => acc + (curr === 1 ? pointPerQ : 0), 0);
    setScore(Math.round(total));
    
    // Save for Holistic Engine (Merge with existing if any)
    const existing = JSON.parse(localStorage.getItem('disha_creative_scores') || '{}');
    existing[selectedCategory] = Math.round(total);
    localStorage.setItem('disha_creative_scores', JSON.stringify(existing));

    setStep('result');
  };

  const getRecommendations = (): Scholarship[] => {
    if (!selectedCategory) return [];
    return scholarshipDatabase.filter(s => 
      s.category === 'Arts' && 
      (s.artField === selectedCategory || s.artField === 'Creative' || !s.artField)
    ).slice(0, 3);
  };

  const getCareerPaths = () => {
    switch(selectedCategory) {
      case 'Music': return ['Professional Vocalist', 'Music Producer', 'Sound Engineer', 'Composer'];
      case 'Dance': return ['Choreographer', 'Stage Performer', 'Dance Therapist', 'Cultural Instructor'];
      case 'Visual Arts': return ['Graphic Designer', 'Illustrator', 'UX/UI Designer', 'Art Director'];
      case 'Performing Arts': return ['Actor', 'Voice Over Artist', 'Theatre Director', 'Drama Teacher'];
      case 'Creative': return ['Content Creator', 'Brand Strategist', 'Digital Marketer', 'Art Curator'];
      default: return [];
    }
  };

  const reset = () => {
    setStep('select');
    setSelectedCategory('');
    setAnswers([]);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
           <Palette size={14}/> Creative Wing
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Creative Talent Assessment</h1>
        <p className="text-slate-500 mt-2 max-w-xl mx-auto">Discover your artistic potential in Music, Dance, Arts, or Entrepreneurship.</p>
      </div>

      {step === 'select' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => startTest(cat.id)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">{cat.label}</h3>
              <p className="text-sm text-slate-500">{cat.desc}</p>
            </button>
          ))}
        </div>
      )}

      {step === 'test' && (
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              {CATEGORIES.find(c => c.id === selectedCategory)?.icon}
              {selectedCategory} Assessment
            </h2>
            <span className="text-sm font-medium text-slate-400">{sessionQuestions.length} Questions</span>
          </div>

          <div className="space-y-6">
            {sessionQuestions.map((q, idx) => (
              <div key={idx} className="space-y-2">
                <p className="font-medium text-slate-800">{idx + 1}. {q}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAnswer(idx, 1)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${answers[idx] === 1 ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    Yes / Strongly
                  </button>
                  <button 
                    onClick={() => handleAnswer(idx, 0)} // Using 0 for Somewhat/No for simplicity
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${answers[idx] === 0 ? 'bg-slate-200 text-slate-800 border-slate-300' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    No / Not Sure
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={finishTest}
            disabled={answers.includes(-1)}
            className="w-full mt-8 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Score
          </button>
        </div>
      )}

      {step === 'result' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Score Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
             <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
                <span className="text-4xl font-black text-slate-900">{score}</span>
                <span className="text-slate-400 text-lg">/100</span>
             </div>
             <h2 className="text-2xl font-bold text-slate-900 mb-2">Creative Aptitude Score</h2>
             <p className="text-slate-600 max-w-lg mx-auto">
               {score > 80 ? 'Excellent! You show high potential for a professional career in this field.' : 
                score > 50 ? 'Good potential. With dedicated training and mentorship, you can excel.' : 
                'You have an interest, but may need foundational training to pursue this professionally.'}
             </p>
             <button onClick={reset} className="mt-6 text-sm text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1 mx-auto">
               <RotateCcw size={14} /> Retake Test (New Questions)
             </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             {/* Career Paths */}
             <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Video size={20} className="text-purple-500"/> Suggested Careers
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getCareerPaths().map((path, i) => (
                    <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                      {path}
                    </span>
                  ))}
                </div>
             </div>

             {/* Matching Scholarships */}
             <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Award size={20} className="text-pink-500"/> Funding Opportunities
                </h3>
                <div className="space-y-3">
                  {getRecommendations().map(sch => (
                    <div key={sch.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-pink-200 transition-colors">
                       <div className="flex justify-between items-start">
                         <div>
                            <h4 className="font-bold text-sm text-slate-900">{sch.name}</h4>
                            <p className="text-xs text-slate-500">{sch.provider}</p>
                         </div>
                         <a href={sch.applyLink} target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-700">
                           <ArrowRight size={16}/>
                         </a>
                       </div>
                    </div>
                  ))}
                  {getRecommendations().length === 0 && <p className="text-sm text-slate-400">No specific scholarships found.</p>}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativeAssessment;
