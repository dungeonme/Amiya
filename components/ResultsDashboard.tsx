
import React, { useState, useEffect } from 'react';
import { AssessmentResult, CareerPath, HolisticProfile } from '../types';
import { CheckCircle, Map, DollarSign, Clock, ArrowRight, Brain, AlertCircle, Download, Activity, ExternalLink, MapPin, Fingerprint, Award, Sparkles, FileText, X, ThumbsUp, ThumbsDown, GraduationCap, Coins, BookOpen, ShieldAlert, Target, RefreshCw, Palette, Trophy } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { generateCareerInsight, generateParentReport, AICareerInsight } from '../services/geminiService';
import { LearningEngine } from '../services/learningEngine';
import { RecommendationEngine } from '../services/recommendationEngine';

interface ResultsDashboardProps {
  data: AssessmentResult | null;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data }) => {
  const [holisticProfile, setHolisticProfile] = useState<HolisticProfile | null>(null);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  
  // Set initial selected path if data is provided, otherwise wait for holistic generation or user
  useEffect(() => {
      if (data && data.recommendedPaths.length > 0) {
          setSelectedPath(data.recommendedPaths[0]);
      }
  }, [data]);

  const [aiInsight, setAiInsight] = useState<AICareerInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [parentReport, setParentReport] = useState<any | null>(null);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'up' | 'down'>>({});

  // 1. Generate Holistic Profile on Mount
  useEffect(() => {
    const profile = RecommendationEngine.generateHolisticProfile();
    setHolisticProfile(profile);
    
    if (data) {
        LearningEngine.logInteraction('VIEW_RESULTS', undefined, { summaryLen: data.summary.length });
        LearningEngine.generateFeatureVector(data);
        
        const audit = LearningEngine.auditRecommendations(data.summary, data.cognitiveStrengths);
        if(audit.flagged) {
            console.warn("Bias Audit Flag:", audit.reason);
        }
    }
  }, [data]);

  if (!data && !holisticProfile) return <div className="p-8 text-center text-slate-500">No data generated yet. Please take the Skill, Psychometric, Sports, or Creative assessments first.</div>;

  const handlePrint = () => {
    LearningEngine.logInteraction('DOWNLOAD_REPORT');
    window.print();
  };

  const handleGenerateInsight = async () => {
    if(!selectedPath || !data) return;
    setIsLoadingInsight(true);
    LearningEngine.logInteraction('CLICK_CAREER', selectedPath.id, { type: 'AI_INSIGHT' });
    try {
        const insight = await generateCareerInsight(data.summary, data.cognitiveStrengths, selectedPath);
        setAiInsight(insight);
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoadingInsight(false);
    }
  };

  const handleGenerateParentReport = async () => {
    // If we have AI data use it, otherwise mock basic report for holistic only
    if (!data) {
        alert("Please complete the full Skill Assessment to generate a detailed AI Parent Report.");
        return;
    }
    setIsReportLoading(true);
    setShowReportModal(true);
    LearningEngine.logInteraction('VIEW_RESULTS', 'ParentReport');
    try {
        const report = await generateParentReport(data);
        setParentReport(report);
    } catch (e) {
        console.error(e);
    } finally {
        setIsReportLoading(false);
    }
  };

  const handleFeedback = (pathId: string, type: 'up' | 'down') => {
      setFeedbackGiven(prev => ({...prev, [pathId]: type}));
      LearningEngine.logInteraction(
          type === 'up' ? 'FEEDBACK_THUMBS_UP' : 'FEEDBACK_THUMBS_DOWN', 
          pathId
      );
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 print:p-0 relative">
      
      {/* Header Actions */}
      <div className="flex flex-wrap justify-between items-center gap-4 print:hidden">
        <h1 className="text-2xl font-bold text-slate-900">Your Intelligence Profile</h1>
        <div className="flex gap-2">
            <button 
              onClick={handleGenerateParentReport}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md"
            >
              <FileText size={16} /> Parent Report
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Download size={16} /> Save PDF
            </button>
        </div>
      </div>

      {/* 1. Holistic Intelligence Profile Section */}
      {holisticProfile && (
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 bg-white/10 rounded-xl">
                    <Brain className="mx-auto mb-2 text-blue-400" size={24}/>
                    <div className="text-2xl font-bold">{holisticProfile.intelligenceIndex.cognitive}</div>
                    <div className="text-xs text-slate-300 uppercase tracking-wider">Cognitive Index</div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl">
                    <Sparkles className="mx-auto mb-2 text-purple-400" size={24}/>
                    <div className="text-xl font-bold truncate">{holisticProfile.intelligenceIndex.personalityType}</div>
                    <div className="text-xs text-slate-300 uppercase tracking-wider">Personality</div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl">
                    <Activity className="mx-auto mb-2 text-orange-400" size={24}/>
                    <div className="text-2xl font-bold">{holisticProfile.intelligenceIndex.sportsAptitude}</div>
                    <div className="text-xs text-slate-300 uppercase tracking-wider">Sports Aptitude</div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl">
                    <Palette className="mx-auto mb-2 text-pink-400" size={24}/>
                    <div className="text-2xl font-bold">{holisticProfile.intelligenceIndex.creativeIndex}</div>
                    <div className="text-xs text-slate-300 uppercase tracking-wider">Creative Index</div>
                </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
                {/* Academic Stream */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 className="font-bold text-blue-300 mb-3 flex items-center gap-2"><GraduationCap size={16}/> Recommended Streams</h3>
                    <ul className="space-y-2 text-sm">
                        {holisticProfile.recommendations.academic.slice(0, 3).map((rec, i) => (
                            <li key={i} className="flex justify-between">
                                <span>{rec.stream}</span>
                                <span className="font-bold text-green-400">{Math.round(rec.score)}%</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Career Domains */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 className="font-bold text-purple-300 mb-3 flex items-center gap-2"><Target size={16}/> Top Career Domains</h3>
                    <ul className="space-y-2 text-sm">
                        {holisticProfile.recommendations.careers.slice(0, 3).map((rec, i) => (
                            <li key={i} className="flex justify-between">
                                <span className="truncate">{rec.domain}</span>
                                <span className="font-bold text-green-400">{Math.round(rec.score)}%</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sports & Creative */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 className="font-bold text-orange-300 mb-3 flex items-center gap-2"><Trophy size={16}/> Extra-Curriculars</h3>
                    <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-slate-300">Best Sport:</span>
                            <span className="font-bold">{holisticProfile.recommendations.sports[0]?.sport || 'General Fitness'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-300">Creative Field:</span>
                            <span className="font-bold">{holisticProfile.recommendations.creative[0]?.field || 'General Arts'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* Parent Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50 rounded-t-2xl">
                    <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2"><FileText size={20}/> Parent Summary Report</h3>
                    <button onClick={() => setShowReportModal(false)} className="text-slate-500 hover:text-slate-700"><X size={24}/></button>
                </div>
                <div className="p-6 space-y-6">
                    {isReportLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-3"></div>
                            <p className="text-indigo-600 font-medium">Generating simplified report for parents...</p>
                        </div>
                    ) : parentReport ? (
                        <>
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                <h4 className="font-bold text-green-800 mb-2">Child's Core Strengths</h4>
                                <p className="text-slate-700">{parentReport.childStrengths}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">Recommended Career Path</h4>
                                <p className="text-slate-600 leading-relaxed">{parentReport.recommendedPath}</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                    <h4 className="font-bold text-orange-800 mb-2">Things to Watch Out For (Risks)</h4>
                                    <p className="text-sm text-slate-700">{parentReport.risks}</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-800 mb-2">Financial & Scholarship Plan</h4>
                                    <p className="text-sm text-slate-700">{parentReport.scholarshipPlan}</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <h4 className="font-bold text-slate-700 mb-1">Suggested Schooling Type</h4>
                                <p className="text-slate-600">{parentReport.suggestedSchoolType}</p>
                            </div>
                            <button onClick={() => window.print()} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold mt-4">Print for Parents</button>
                        </>
                    ) : <p>Error generating report.</p>}
                </div>
            </div>
        </div>
      )}

      {/* Summary Section with optional Radar Chart (from Skill Assessment) */}
      {data && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Assessment Report</h2>
          <p className="text-slate-600 leading-relaxed">{data.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.cognitiveStrengths.map((s, i) => (
              <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Brain size={14} /> {s}
              </span>
            ))}
          </div>
        </section>

        {/* Radar Chart for Test Results */}
        {data.radarData && (
          <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[250px]">
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Skill Profile</h3>
             <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.5}
                    />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
          </section>
        )}
      </div>
      )}
      
      {/* Skill India Digital Pathways Integration */}
      {data && data.sidhRecommendations && data.sidhRecommendations.length > 0 && (
        <section className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 opacity-20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
               <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                 <img src="https://www.skillindiadigital.gov.in/assets/images/sid-logo.svg" alt="SIDH" className="h-8 w-auto" onError={(e) => e.currentTarget.style.display = 'none'} />
                 <span className="text-orange-600">Skill India Digital Pathways</span>
               </h2>
               <p className="text-sm text-slate-600 mt-1">Government-certified courses bridging your skill gap.</p>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://www.skillindiadigital.gov.in/home" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white hover:bg-orange-50 text-slate-800 border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Fingerprint size={16} className="text-orange-500" />
                Register with Aadhaar
              </a>
              <a 
                href="https://www.skillindiadigital.gov.in/locate-center" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
              >
                <MapPin size={16} />
                Find PMKK Center
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {data.sidhRecommendations.map((course, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow relative group">
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                      course.type === 'PMKVY' ? 'bg-green-100 text-green-700' :
                      course.type === 'NAPS' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {course.type}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{course.sector}</p>
                    <h4 className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">{course.title}</h4>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-600 mb-4">
                    <span className="flex items-center gap-1"><Clock size={12}/> {course.duration}</span>
                    <span className="flex items-center gap-1"><Award size={12}/> {course.provider}</span>
                  </div>
                  
                  <a 
                    href={course.link || "https://www.skillindiadigital.gov.in/courses"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-700 font-bold py-2 rounded-lg text-xs border border-slate-200 hover:border-orange-200 transition-all"
                  >
                    Quick Apply
                  </a>
                </div>
             ))}
          </div>
        </section>
      )}

      {/* Detailed Roadmap */}
      {data && selectedPath && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career Options List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 px-1">Recommended Paths</h3>
          {data.recommendedPaths.map((path) => (
            <div 
              key={path.id}
              onClick={() => { setSelectedPath(path); setAiInsight(null); LearningEngine.logInteraction('CLICK_CAREER', path.id); }}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                selectedPath?.id === path.id 
                ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-[1.02]' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">{path.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                   selectedPath?.id === path.id ? 'bg-orange-500 text-white' : 'bg-green-100 text-green-800'
                }`}>
                  {path.matchScore}% Match
                </span>
              </div>
              <p className={`text-sm mb-3 ${selectedPath?.id === path.id ? 'text-slate-300' : 'text-slate-500'}`}>
                {path.description.substring(0, 80)}...
              </p>
              
              {/* Feedback Loop Integration */}
              {selectedPath?.id === path.id && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/30">
                   <span className="text-[10px] text-slate-400">Is this relevant?</span>
                   <button 
                     onClick={(e) => { e.stopPropagation(); handleFeedback(path.id, 'up'); }}
                     className={`p-1.5 rounded hover:bg-white/10 ${feedbackGiven[path.id] === 'up' ? 'text-green-400' : 'text-slate-400'}`}
                   >
                     <ThumbsUp size={14}/>
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); handleFeedback(path.id, 'down'); }}
                     className={`p-1.5 rounded hover:bg-white/10 ${feedbackGiven[path.id] === 'down' ? 'text-red-400' : 'text-slate-400'}`}
                   >
                     <ThumbsDown size={14}/>
                   </button>
                </div>
              )}

              <div className="flex items-center gap-3 text-xs opacity-90 mt-2">
                <div className="flex items-center gap-1">
                  <Clock size={12} /> {path.timeToComplete}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign size={12} /> {path.salaryRange}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Roadmap Visual */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:shadow-none print:border-none">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center print:bg-white print:border-b-2 print:border-black">
             <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Map className="text-orange-500" /> 
                  Roadmap: {selectedPath.title}
                </h3>
                <p className="text-slate-500 text-sm mt-1">Required Exams: {selectedPath.requiredExams.join(", ")}</p>
             </div>
             
             <div className="flex gap-3 items-center">
                {!aiInsight && (
                    <button 
                        onClick={handleGenerateInsight}
                        disabled={isLoadingInsight}
                        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {isLoadingInsight ? 'Analyzing...' : <><Sparkles size={12}/> AI Deep Dive</>}
                    </button>
                )}
             </div>
          </div>
          
          <div className="p-6">
            
            {/* New: Personalized Socio-Economic Roadmap */}
            {selectedPath.personalizedRoadmap && (
               <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center justify-between">
                     <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <Target size={18} className="text-blue-600"/> Your Customized Path
                     </h4>
                     <div className="flex gap-2 text-[10px]">
                        <span className={`px-2 py-1 rounded font-bold ${selectedPath.personalizedRoadmap.meta.riskLevel === 'Low' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                           Risk: {selectedPath.personalizedRoadmap.meta.riskLevel}
                        </span>
                        <span className="px-2 py-1 rounded font-bold bg-blue-100 text-blue-700">
                           {selectedPath.personalizedRoadmap.meta.estimatedCost}
                        </span>
                     </div>
                  </div>
                  
                  {/* Expandable Sections */}
                  <details className="group border-b border-slate-100" open>
                     <summary className="flex items-center justify-between p-3 cursor-pointer bg-white hover:bg-slate-50">
                        <span className="font-bold text-sm text-slate-700 flex items-center gap-2"><GraduationCap size={16} className="text-blue-500"/> Education Path</span>
                        <ArrowRight size={14} className="text-slate-400 group-open:rotate-90 transition-transform"/>
                     </summary>
                     <div className="p-3 bg-slate-50 text-sm text-slate-600 pl-8 space-y-1">
                        {selectedPath.personalizedRoadmap.educationPath.map((item, i) => (
                           <div key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                              <span>{item}</span>
                           </div>
                        ))}
                     </div>
                  </details>

                  <details className="group border-b border-slate-100">
                     <summary className="flex items-center justify-between p-3 cursor-pointer bg-white hover:bg-slate-50">
                        <span className="font-bold text-sm text-slate-700 flex items-center gap-2"><Coins size={16} className="text-green-500"/> Financial Support</span>
                        <ArrowRight size={14} className="text-slate-400 group-open:rotate-90 transition-transform"/>
                     </summary>
                     <div className="p-3 bg-slate-50 text-sm text-slate-600 pl-8 space-y-1">
                        {selectedPath.personalizedRoadmap.financialSupport.map((item, i) => (
                           <div key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
                              <span>{item}</span>
                           </div>
                        ))}
                     </div>
                  </details>

                  <details className="group border-b border-slate-100">
                     <summary className="flex items-center justify-between p-3 cursor-pointer bg-white hover:bg-slate-50">
                        <span className="font-bold text-sm text-slate-700 flex items-center gap-2"><BookOpen size={16} className="text-orange-500"/> Skill Development</span>
                        <ArrowRight size={14} className="text-slate-400 group-open:rotate-90 transition-transform"/>
                     </summary>
                     <div className="p-3 bg-slate-50 text-sm text-slate-600 pl-8 space-y-1">
                        {selectedPath.personalizedRoadmap.skillDev.map((item, i) => (
                           <div key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                              <span>{item}</span>
                           </div>
                        ))}
                     </div>
                  </details>

                  <details className="group border-b border-slate-100">
                     <summary className="flex items-center justify-between p-3 cursor-pointer bg-white hover:bg-slate-50">
                        <span className="font-bold text-sm text-slate-700 flex items-center gap-2"><ShieldAlert size={16} className="text-red-500"/> Backup Plan & Alternatives</span>
                        <ArrowRight size={14} className="text-slate-400 group-open:rotate-90 transition-transform"/>
                     </summary>
                     <div className="p-3 bg-slate-50 text-sm text-slate-600 pl-8 space-y-1">
                        <p className="font-semibold text-slate-800 mb-1">Backup: {selectedPath.personalizedRoadmap.meta.backupPlan}</p>
                        {selectedPath.personalizedRoadmap.alternatives.map((item, i) => (
                           <div key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                              <span>{item}</span>
                           </div>
                        ))}
                     </div>
                  </details>
               </div>
            )}

            {/* AI Insight Section */}
            {aiInsight && (
                <div className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100 animate-fadeIn">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-indigo-900 flex items-center gap-2"><Sparkles size={16} className="text-purple-600"/> AI Strategic Analysis</h4>
                        <button onClick={() => setAiInsight(null)} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
                    </div>
                    
                    <div className="space-y-4 text-sm text-slate-700">
                        <div className="bg-white/60 p-3 rounded-lg">
                            <strong className="text-indigo-800">Why this fits you:</strong> {aiInsight.summary}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <strong className="text-green-700 block mb-1">Your Edge:</strong>
                                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                                    {aiInsight.strengths.map((s,i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                            <div>
                                <strong className="text-orange-700 block mb-1">Risk Factors:</strong>
                                <p className="text-xs text-slate-600">{aiInsight.riskAnalysis}</p>
                            </div>
                        </div>

                        {aiInsight.skillGap && (
                            <div className="border-t border-indigo-100 pt-3 mt-2">
                                <strong className="text-slate-800 block mb-2">Skill Gap Analysis & Plan (6-12 Months)</strong>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {aiInsight.skillGap.missingSkills.map((s,i) => <span key={i} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100">{s}</span>)}
                                </div>
                                <p className="text-xs italic text-slate-600 bg-white p-2 rounded border border-slate-100">{aiInsight.skillGap.plan}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Existing Linear Roadmap for visual continuity */}
            <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-8 my-4 print:border-l-4 print:border-black">
              {selectedPath.roadmap.map((step, index) => (
                <div key={index} className="relative pl-6 md:pl-8 break-inside-avoid">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-sm print:bg-black print:border-black"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                    <span className="font-bold text-orange-600 text-sm uppercase tracking-wider print:text-black">{step.year}</span>
                    <h4 className="font-semibold text-slate-900 text-lg">{step.milestone}</h4>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-3 print:text-black">{step.description}</p>
                  
                  <div className="flex flex-wrap gap-2 print:hidden">
                    {step.exams && step.exams.map(e => (
                      <span key={e} className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-100">
                        <AlertCircle size={10} /> {e}
                      </span>
                    ))}
                    {step.skills && step.skills.map(s => (
                      <span key={s} className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded border border-emerald-100">
                        <CheckCircle size={10} /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-3 print:hidden">
               <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mt-1">
                 <Brain size={18} />
               </div>
               <div>
                 <h4 className="font-semibold text-indigo-900 text-sm">Why this fits you?</h4>
                 <p className="text-indigo-700 text-xs mt-1">
                   Based on your interests, this path leverages your strengths in {data.cognitiveStrengths.slice(0,2).join(" & ")}. 
                   It offers a balanced mix of stability and growth potential given your preferences.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ResultsDashboard;
