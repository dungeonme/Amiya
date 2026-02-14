
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, ArrowLeft, Globe, Zap, Brain, Activity } from 'lucide-react';
import { assessmentQuestions } from '../services/assessmentData';
import { QuestionEngine } from '../services/questionEngine';
import { AssessmentResult, Question } from '../types';
import { generateReportFromStructuredData } from '../services/geminiService';

interface AssessmentModuleProps {
  onComplete: (result: AssessmentResult) => void;
  moveToResults: () => void;
}

const AssessmentModule: React.FC<AssessmentModuleProps> = ({ onComplete, moveToResults }) => {
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 is Intro screen
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Session on Load
  useEffect(() => {
    // Generate a session with 15 Mixed Questions (Rotation Logic)
    // Plus the Income Question which is mandatory
    const mixed = QuestionEngine.generateMixedSession();
    
    // Always append demographic questions
    const demo = assessmentQuestions.filter(q => q.category === 'Demographic');
    
    setSessionQuestions([...mixed, ...demo]);
  }, []);

  const progress = ((currentQuestionIndex + 1) / sessionQuestions.length) * 100;
  const currentQuestion = sessionQuestions[currentQuestionIndex];

  const handleStart = () => setCurrentQuestionIndex(0);

  const handleAnswer = (questionId: string, value: string, scoreImpact?: { category: string, value: number }) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (scoreImpact) {
      setScores(prev => ({
        ...prev,
        [scoreImpact.category]: (prev[scoreImpact.category] || 0) + scoreImpact.value
      }));
      // Save attempt to history for rotation logic (score is arbitrary here for preference Qs)
      QuestionEngine.saveAttempt(questionId, scoreImpact.value);
    } else {
      QuestionEngine.saveAttempt(questionId, 0);
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Submit
      setIsSubmitting(true);
      
      // SAVE SCORES FOR HOLISTIC ENGINE
      localStorage.setItem('disha_skill_scores', JSON.stringify(scores));
      localStorage.setItem('disha_skill_answers', JSON.stringify(answers));

      try {
        const result = await generateReportFromStructuredData(
          { lang }, // Simple profile for now
          scores,
          answers
        );
        onComplete(result);
        moveToResults();
      } catch (error) {
        alert("Error generating report. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (currentQuestionIndex === -1) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <Zap size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Career & Skill Test</h2>
            <p className="text-slate-500 mt-2">
              Discover your hidden strengths with our dynamic assessment.
              Questions change every time you take it!
            </p>
          </div>
          
          <div className="space-y-3 text-left bg-slate-50 p-4 rounded-xl text-sm text-slate-700">
             <div className="flex items-center gap-2"><Brain size={16} className="text-blue-500"/> Cognitive Skills (5 Qs)</div>
             <div className="flex items-center gap-2"><BookOpenIcon size={16} className="text-green-500"/> Academic Interests (5 Qs)</div>
             <div className="flex items-center gap-2"><Activity size={16} className="text-red-500"/> Sports Aptitude (5 Qs)</div>
          </div>

          <div className="flex justify-center gap-4 py-2">
            <button 
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${lang === 'en' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('hi')}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${lang === 'hi' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              हिंदी (Hindi)
            </button>
          </div>

          <button 
            onClick={handleStart}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            Start Assessment <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-50">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
         <h3 className="text-xl font-semibold text-slate-800">Generating Your Career Profile...</h3>
         <p className="text-slate-500 mt-2">Analyzing your cognitive scores and interests.</p>
      </div>
    );
  }

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col max-w-2xl mx-auto p-4 md:p-8">
      {/* Header / Progress */}
      <div className="mb-8">
         <div className="flex justify-between items-center mb-4">
           <button onClick={handlePrev} className="p-2 hover:bg-slate-200 rounded-full text-slate-500" disabled={currentQuestionIndex === 0}>
             <ArrowLeft size={20} />
           </button>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
             Q {currentQuestionIndex + 1} of {sessionQuestions.length} • {currentQuestion.category}
           </span>
           <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 flex items-center gap-1">
             <Globe size={18} /> <span className="text-xs font-bold">{lang.toUpperCase()}</span>
           </button>
         </div>
         <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
         </div>
      </div>

      {/* Question Card */}
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 leading-relaxed">
          {currentQuestion.question[lang]}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = answers[currentQuestion.id] === opt.value;
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion.id, opt.value, opt.scoreImpact)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                  isSelected 
                    ? 'border-orange-500 bg-orange-50 text-orange-900' 
                    : 'border-slate-200 bg-white text-slate-700 hover:border-orange-200'
                }`}
              >
                <span className="font-medium text-lg">{opt.text[lang]}</span>
                {isSelected && <Check size={20} className="text-orange-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {currentQuestionIndex === sessionQuestions.length - 1 ? 'Finish & View Results' : 'Next Question'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const BookOpenIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

export default AssessmentModule;
