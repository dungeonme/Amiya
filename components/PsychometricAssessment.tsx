
import React, { useState, useEffect } from 'react';
import { BrainCircuit, ArrowRight, Check, Activity, BarChart2, RotateCcw } from 'lucide-react';
import { psychometricQuestions } from '../services/psychometricData';
import { Question } from '../types';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

const PsychometricAssessment = () => {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Randomly select 20 questions (4 per category ideally, but random for now)
    const shuffled = [...psychometricQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));
  }, []);

  const handleStart = () => setStarted(true);

  const handleAnswer = (val: string, impact?: { category: string, value: number }) => {
    const qId = questions[currentIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: val }));
    
    if (impact) {
      setScores(prev => ({
        ...prev,
        [impact.category]: (prev[impact.category] || 0) + impact.value
      }));
    }

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
      // Save for Holistic Engine
      localStorage.setItem('disha_psych_scores', JSON.stringify(scores));
      setCompleted(true);
  };

  const getProfileSummary = () => {
    // Determine dominant traits
    const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topTrait = sortedTraits[0] ? sortedTraits[0][0] : 'Balanced';
    
    switch(topTrait) {
        case 'Extraversion': return "You are a natural leader who thrives in social settings.";
        case 'Conscientiousness': return "You are highly organized, disciplined, and goal-oriented.";
        case 'Openness': return "You are creative, curious, and open to new experiences.";
        case 'Agreeableness': return "You are empathetic, cooperative, and a great team player.";
        case 'EmotionalStability': return "You are calm, resilient, and handle stress exceptionally well.";
        case 'RiskTaking': return "You have an entrepreneurial spirit and are comfortable with uncertainty.";
        default: return "You have a well-balanced personality adaptable to various roles.";
    }
  };

  const getChartData = () => {
    return Object.entries(scores).map(([trait, value]) => ({
        trait,
        value,
        fullMark: 20 // Approx max per session
    }));
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center mt-10">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
           <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
              <BrainCircuit size={40} />
           </div>
           <h1 className="text-3xl font-bold text-slate-900 mb-3">Psychometric Profile</h1>
           <p className="text-slate-500 mb-8 max-w-lg mx-auto">
             Discover your personality traits, work style, and decision-making patterns. 
             This scientific assessment helps identify careers where you will truly thrive.
           </p>
           <button onClick={handleStart} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-xl transition-transform active:scale-95 shadow-md">
             Start Assessment
           </button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-8 animate-fadeIn">
         <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Activity size={24} className="text-purple-600"/> Analysis Complete
         </h1>
         
         <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Personality Radar</h2>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getChartData()}>
                            <PolarGrid stroke="#e2e8f0"/>
                            <PolarAngleAxis dataKey="trait" tick={{ fill: '#64748b', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false}/>
                            <Radar name="Score" dataKey="value" stroke="#9333ea" fill="#9333ea" fillOpacity={0.6} />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Your Profile Summary</h2>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 mb-4">
                    <p className="text-purple-900 font-medium leading-relaxed">{getProfileSummary()}</p>
                </div>
                
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-2">Dominant Traits</h3>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(scores)
                        .sort((a,b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([trait, val]) => (
                            <span key={trait} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                                {trait}
                            </span>
                        ))
                    }
                </div>
            </div>
         </div>

         <div className="mt-8 text-center">
            <button onClick={() => window.location.reload()} className="text-purple-600 font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
                <RotateCcw size={16}/> Retake Test
            </button>
         </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8">
       <div className="mb-8">
          <div className="flex justify-between items-center mb-2 text-sm text-slate-500 font-medium">
             <span>Question {currentIndex + 1} of {questions.length}</span>
             <span>{currentQ.subCategory}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
       </div>

       <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">
             {currentQ.question.en}
          </h2>
          <div className="space-y-3">
             {currentQ.options.map((opt, idx) => (
                <button
                   key={idx}
                   onClick={() => handleAnswer(opt.value, opt.scoreImpact)}
                   className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all flex justify-between items-center group"
                >
                   <span className="font-medium text-slate-700 group-hover:text-purple-900">{opt.text.en}</span>
                   {answers[currentQ.id] === opt.value && <Check size={20} className="text-purple-600"/>}
                </button>
             ))}
          </div>
       </div>
    </div>
  );
};

export default PsychometricAssessment;
