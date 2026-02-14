
import React, { useState, useEffect } from 'react';
import { Activity, Ruler, Weight, MapPin, Dumbbell, Trophy, ArrowRight, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react';
import { sportsQuestions } from '../services/sportsData';
import { SportsLogic } from '../services/sportsLogic';
import { PhysicalStats, Question, SportsRecommendation } from '../types';

const SportsAssessment = () => {
  const [step, setStep] = useState(1); // 1: Physical Form, 2: Quiz, 3: Results
  
  // Physical Stats State
  const [physicalStats, setPhysicalStats] = useState<PhysicalStats>({
    age: 15,
    gender: 'Male',
    heightCm: 165,
    weightKg: 55,
    dominantHand: 'Right',
    locationType: 'Urban',
    hasPlayground: true,
    hasCoaching: false
  });

  // Quiz State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  
  // Result State
  const [recommendations, setRecommendations] = useState<SportsRecommendation[]>([]);

  useEffect(() => {
    // Shuffle and pick 15 sports questions
    const shuffled = [...sportsQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 15));
  }, []);

  const handleStatChange = (field: keyof PhysicalStats, value: any) => {
    setPhysicalStats(prev => ({ ...prev, [field]: value }));
  };

  const submitPhysical = () => setStep(2);

  const handleQuizAnswer = (impact?: { category: string, value: number }, valueStr?: string) => {
    if (impact) {
      setScores(prev => ({
        ...prev,
        [impact.category]: (prev[impact.category] || 0) + impact.value
      }));
    }
    
    // Capture Interest preference directly from specific question values if needed
    if (valueStr === 'Team' || valueStr === 'Solo') {
         setScores(prev => ({ ...prev, 'Team': valueStr === 'Team' ? 10 : 0 }));
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = () => {
    const recs = SportsLogic.getRecommendations(physicalStats, scores);
    setRecommendations(recs);
    
    // Save for Holistic Engine
    localStorage.setItem('disha_sports_scores', JSON.stringify(scores));
    localStorage.setItem('disha_sports_stats', JSON.stringify(physicalStats));
    
    setStep(3);
  };

  // --- UI: Step 1 Physical Form ---
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
           <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
             <Dumbbell className="text-orange-600"/> Physical Profile
           </h1>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                 <div className="flex gap-2">
                    {['Male', 'Female', 'Other'].map(g => (
                        <button key={g} onClick={() => handleStatChange('gender', g)}
                            className={`flex-1 py-2 rounded-lg text-sm border ${physicalStats.gender === g ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-slate-600 border-slate-200'}`}>
                            {g}
                        </button>
                    ))}
                 </div>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                 <input type="number" value={physicalStats.age} onChange={(e) => handleStatChange('age', parseInt(e.target.value))} className="w-full p-2 border rounded-lg"/>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><Ruler size={14}/> Height (cm)</label>
                 <input type="number" value={physicalStats.heightCm} onChange={(e) => handleStatChange('heightCm', parseInt(e.target.value))} className="w-full p-2 border rounded-lg"/>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><Weight size={14}/> Weight (kg)</label>
                 <input type="number" value={physicalStats.weightKg} onChange={(e) => handleStatChange('weightKg', parseInt(e.target.value))} className="w-full p-2 border rounded-lg"/>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><MapPin size={14}/> Environment</label>
                 <select value={physicalStats.locationType} onChange={(e) => handleStatChange('locationType', e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                    <option value="Urban">Urban (City)</option>
                    <option value="Rural">Rural (Village)</option>
                    <option value="Coastal">Coastal (Near Sea)</option>
                    <option value="Mountain">Mountain / Hilly</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Facility Access</label>
                 <div className="flex gap-2">
                    <button onClick={() => handleStatChange('hasPlayground', true)}
                        className={`flex-1 py-2 rounded-lg text-sm border ${physicalStats.hasPlayground ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>
                        Has Playground
                    </button>
                    <button onClick={() => handleStatChange('hasPlayground', false)}
                        className={`flex-1 py-2 rounded-lg text-sm border ${!physicalStats.hasPlayground ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>
                        No Access
                    </button>
                 </div>
              </div>
           </div>
           
           <button onClick={submitPhysical} className="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
              Next: Aptitude Quiz <ArrowRight size={20}/>
           </button>
        </div>
      </div>
    );
  }

  // --- UI: Step 2 Quiz ---
  if (step === 2) {
    const currentQ = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto p-6 mt-8">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-sm text-slate-500 font-medium">
                    <span>Question {currentIndex + 1} of {questions.length}</span>
                    <span className="uppercase tracking-wider text-xs font-bold text-orange-600">Sports IQ</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">{currentQ.question.en}</h2>
                <div className="space-y-3">
                    {currentQ.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleQuizAnswer(opt.scoreImpact, opt.value)}
                        className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all font-medium text-slate-700"
                    >
                        {opt.text.en}
                    </button>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  // --- UI: Step 3 Results ---
  if (step === 3) {
      const bmi = SportsLogic.calculateBMI(physicalStats.weightKg, physicalStats.heightCm);
      
      return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fadeIn">
            <h1 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={32}/> Multi-Factor Sports Analysis
            </h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Physical Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Activity size={18}/> Athletic Profile</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500">BMI Index</span> <span className="font-mono font-bold">{bmi}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Height Class</span> <span className="font-mono font-bold">{physicalStats.heightCm > 175 ? 'Tall' : (physicalStats.heightCm < 160 ? 'Short' : 'Medium')}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Environment</span> <span className="font-bold text-blue-600">{physicalStats.locationType}</span></div>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase">Dominant Attributes</span>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {Object.entries(scores).sort((a,b) => b[1] - a[1]).slice(0,3).map(([k,v]) => (
                                    <span key={k} className="text-[10px] bg-slate-100 px-2 py-1 rounded border border-slate-200">{k}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="md:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-800">Top Recommended Sports (Suitability Ranked)</h3>
                    {recommendations.slice(0, 5).map((rec, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-orange-300 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                        <span className="bg-slate-100 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">{idx + 1}</span>
                                        {rec.sport}
                                    </h4>
                                    <p className="text-sm text-green-700 mt-1">{rec.matchReason}</p>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-black text-orange-600">{rec.suitabilityScore}%</span>
                                    <span className="text-[10px] text-slate-400 uppercase font-bold">Match</span>
                                </div>
                            </div>
                            
                            {/* Improvement Areas */}
                            {rec.improvementAreas && rec.improvementAreas.length > 0 && (
                                <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100">
                                    <h5 className="text-xs font-bold text-red-800 flex items-center gap-1 mb-1">
                                        <TrendingUp size={12}/> Focus Areas to Improve:
                                    </h5>
                                    <div className="flex gap-2 flex-wrap">
                                        {rec.improvementAreas.map((area, i) => (
                                            <span key={i} className="text-[10px] text-red-700 bg-white px-2 py-0.5 rounded border border-red-200">
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-3 flex gap-2 flex-wrap">
                                {rec.developmentPath.map((step, i) => (
                                    <span key={i} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200 uppercase tracking-wide">
                                        {step}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <button onClick={() => window.location.reload()} className="text-orange-600 font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
                    <RotateCcw size={16}/> Start Over
                </button>
            </div>
        </div>
      );
  }

  return null;
};

export default SportsAssessment;
