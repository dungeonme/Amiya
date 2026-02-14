import React, { useState, useMemo, useEffect } from 'react';
import { scholarshipDatabase } from '../services/scholarshipData';
import { Scholarship } from '../types';
import { getScholarshipRecommendations, generateScholarshipGuidance } from '../services/geminiService';
import { ScholarshipEngine, ComputedStatus } from '../services/scholarshipEngine';
import { Filter, Search, Sparkles, Clock, ExternalLink, IndianRupee, BookOpen, AlertCircle, X, Trophy, History, Building2, Globe2, Palette, Music, Bot, CheckCircle2, Calendar } from 'lucide-react';

const ScholarshipFinder = () => {
  // Filter States
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedArtFields, setSelectedArtFields] = useState<string[]>([]); 
  const [incomeRange, setIncomeRange] = useState<string>('all'); 
  const [searchQuery, setSearchQuery] = useState('');
  
  // Feature States
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  // AI States
  const [userDesc, setUserDesc] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<{id: string, reason: string}[]>([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  // AI Guidance State
  const [activeGuidance, setActiveGuidance] = useState<string | null>(null);
  const [guidanceData, setGuidanceData] = useState<any>(null);
  const [isGuidanceLoading, setIsGuidanceLoading] = useState(false);

  // Constants for Filters
  const socialGroups = ['General', 'OBC', 'SC', 'ST', 'Minority'];
  const careerGoals = ['Engineering', 'Medical', 'MBA', 'Sports', 'Research', 'Vocational', 'STEM', 'Arts'];
  const levels = ['National', 'State', 'International', 'University'];
  const providerTypes = ['Government', 'PSU', 'Private', 'University', 'Foundation', 'Academy'];
  const artFields = ['Music', 'Dance', 'Visual Arts', 'Performing Arts', 'Film', 'Theatre', 'Creative'];

  // --- Load Recent Searches ---
  useEffect(() => {
    const saved = localStorage.getItem('disha_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // --- Filtering Logic ---
  const filteredScholarships = useMemo(() => {
    return scholarshipDatabase.filter(sch => {
      // 1. Text Search
      if (searchQuery && !sch.name.toLowerCase().includes(searchQuery.toLowerCase()) && !sch.provider.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // 2. Social Group Filter
      if (selectedGroups.length > 0) {
        const matchesGroup = sch.socialGroup.includes('All') || sch.socialGroup.some(g => selectedGroups.includes(g));
        if (!matchesGroup) return false;
      }

      // 3. Career Goal Filter
      if (selectedGoals.length > 0) {
        const matchesGoal = sch.careerGoal.some(g => selectedGoals.includes(g));
        if (!matchesGoal) return false;
      }

      // 4. Level Filter
      if (selectedLevels.length > 0 && sch.level) {
        if (!selectedLevels.includes(sch.level)) return false;
      }

      // 5. Provider Type Filter
      if (selectedProviders.length > 0 && sch.providerType) {
         if (!selectedProviders.includes(sch.providerType)) return false;
      }

      // 6. Art Field Filter
      if (selectedArtFields.length > 0 && sch.category === 'Arts') {
         if (!sch.artField || !selectedArtFields.includes(sch.artField)) return false;
      } else if (selectedArtFields.length > 0 && sch.category !== 'Arts') {
         // If art filters selected but scholarship is not Art, hide it (optional strictness)
         return false;
      }

      // 7. Income Filter
      if (incomeRange !== 'all') {
         if (incomeRange === 'low' && sch.incomeLimit && sch.incomeLimit > 2.5) return false;
         const userIncomeCap = incomeRange === 'low' ? 2.5 : (incomeRange === 'mid' ? 8 : 100);
         if (sch.incomeLimit && userIncomeCap > sch.incomeLimit) return false; 
      }

      return true;
    });
  }, [searchQuery, selectedGroups, selectedGoals, selectedLevels, selectedProviders, selectedArtFields, incomeRange]);

  // --- Sort: AI Recommendations First, then by Name ---
  const sortedScholarships = useMemo(() => {
    let sorted = [...filteredScholarships];
    if (aiRecommendations.length > 0) {
        sorted.sort((a, b) => {
            const aIsRec = aiRecommendations.some(r => r.id === a.id);
            const bIsRec = aiRecommendations.some(r => r.id === b.id);
            if (aIsRec && !bIsRec) return -1;
            if (!aIsRec && bIsRec) return 1;
            return 0;
        });
    }
    return sorted;
  }, [filteredScholarships, aiRecommendations]);

  // --- Handlers ---
  const toggleSelection = (item: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (current.includes(item)) {
      setter(current.filter(i => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('disha_recent_searches', JSON.stringify(updated));
  };

  const handleSearchSubmit = (e?: React.KeyboardEvent) => {
    if (e && e.key !== 'Enter') return;
    saveRecentSearch(searchQuery);
  };

  const handleRecentClick = (query: string) => {
    setSearchQuery(query);
  };

  const handleAiMatch = async () => {
    if (!userDesc.trim()) return;
    setIsAiLoading(true);
    try {
        const recs = await getScholarshipRecommendations(userDesc);
        setAiRecommendations(recs);
    } catch (e) {
        console.error(e);
    } finally {
        setIsAiLoading(false);
    }
  };

  const checkEligibility = async (sch: Scholarship) => {
    setActiveGuidance(sch.id);
    setIsGuidanceLoading(true);
    setGuidanceData(null);
    try {
        const data = await generateScholarshipGuidance(userDesc || "Student from India looking for scholarship", sch);
        setGuidanceData(data);
    } catch (e) {
        console.error(e);
    } finally {
        setIsGuidanceLoading(false);
    }
  };

  const formatDate = (dateStr?: string) => {
      if(!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-50 relative overflow-hidden">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-20">
         <h2 className="font-bold text-slate-800 flex items-center gap-2"><BookOpen size={20} className="text-orange-600"/> Scholarship Finder</h2>
         <button onClick={() => setShowFiltersMobile(!showFiltersMobile)} className="p-2 bg-slate-100 rounded-lg">
            <Filter size={20} className="text-slate-600"/>
         </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out overflow-y-auto
        md:relative md:translate-x-0
        ${showFiltersMobile ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 space-y-8">
            <div className="flex justify-between items-center md:hidden mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setShowFiltersMobile(false)}><X size={24}/></button>
            </div>

            {/* Income Filter */}
            <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Your Family Income</h4>
                <select 
                    value={incomeRange} 
                    onChange={(e) => setIncomeRange(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                >
                    <option value="all">Show All</option>
                    <option value="low">Less than ₹2.5 Lakhs</option>
                    <option value="mid">₹2.5L - ₹8 Lakhs</option>
                    <option value="high">More than ₹8 Lakhs</option>
                </select>
            </div>

            {/* Art Field Filter (Conditional or Always Visible) */}
            <div className="p-3 bg-pink-50 rounded-xl border border-pink-100">
                <h4 className="text-xs font-bold text-pink-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Palette size={14}/> Creative Arts
                </h4>
                <div className="space-y-2">
                   {artFields.map(field => (
                        <label key={field} className="flex items-center gap-3 cursor-pointer group">
                             <input 
                                type="checkbox" 
                                className="w-4 h-4 text-pink-600 rounded border-slate-300 focus:ring-pink-500"
                                checked={selectedArtFields.includes(field)}
                                onChange={() => toggleSelection(field, selectedArtFields, setSelectedArtFields)}
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{field}</span>
                        </label>
                   ))}
                </div>
            </div>

            {/* Level Filter */}
            <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Globe2 size={14}/> Scholarship Level
                </h4>
                <div className="space-y-2">
                   {levels.map(level => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
                                checked={selectedLevels.includes(level)}
                                onChange={() => toggleSelection(level, selectedLevels, setSelectedLevels)}
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{level}</span>
                        </label>
                   ))}
                </div>
            </div>

            {/* Provider Type Filter */}
            <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Building2 size={14}/> Provider Type
                </h4>
                <div className="space-y-2">
                   {providerTypes.map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                             <input 
                                type="checkbox" 
                                className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
                                checked={selectedProviders.includes(type)}
                                onChange={() => toggleSelection(type, selectedProviders, setSelectedProviders)}
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{type}</span>
                        </label>
                   ))}
                </div>
            </div>

            {/* Social Group */}
            <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Social Category</h4>
                <div className="space-y-2">
                    {socialGroups.map(group => (
                        <label key={group} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedGroups.includes(group) ? 'bg-orange-600 border-orange-600' : 'border-slate-300 bg-white'}`}>
                                {selectedGroups.includes(group) && <span className="text-white text-[10px]">✓</span>}
                            </div>
                            <input 
                                type="checkbox" 
                                className="hidden"
                                checked={selectedGroups.includes(group)}
                                onChange={() => toggleSelection(group, selectedGroups, setSelectedGroups)}
                            />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">{group}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Career Goals */}
            <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Career Goal</h4>
                <div className="flex flex-wrap gap-2">
                    {careerGoals.map(goal => (
                        <button
                            key={goal}
                            onClick={() => toggleSelection(goal, selectedGoals, setSelectedGoals)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                selectedGoals.includes(goal) 
                                ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'
                            }`}
                        >
                            {goal}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
         
         {/* Search & AI Header */}
         <div className="max-w-4xl mx-auto mb-8 space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 hidden md:block">Scholarship & Discovery</h1>
            
            {/* Search Bar */}
            <div className="space-y-3">
              <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                      type="text" 
                      placeholder="Search (e.g. Music, Tata, Merit)..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchSubmit}
                      onBlur={() => saveRecentSearch(searchQuery)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                   <span className="text-xs font-bold text-slate-400 uppercase whitespace-nowrap flex items-center gap-1"><History size={12}/> Recent:</span>
                   {recentSearches.map((term, idx) => (
                     <button 
                       key={idx}
                       onClick={() => handleRecentClick(term)}
                       className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
                     >
                       {term}
                     </button>
                   ))}
                </div>
              )}
            </div>

            {/* AI Matcher */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-start gap-3">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white mt-1">
                        <Sparkles size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-indigo-900">AI Smart Match</h3>
                        <p className="text-sm text-indigo-700 mb-3">Describe your profile (e.g., "Violin player looking for conservatory funding") to get top picks.</p>
                        
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                value={userDesc}
                                onChange={(e) => setUserDesc(e.target.value)}
                                placeholder="Type your profile details here..."
                                className="flex-1 px-4 py-2 rounded-lg border border-indigo-200 text-sm focus:outline-none focus:border-indigo-400"
                                onKeyDown={(e) => e.key === 'Enter' && handleAiMatch()}
                            />
                            <button 
                                onClick={handleAiMatch}
                                disabled={isAiLoading || !userDesc.trim()}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                {isAiLoading ? 'Analyzing...' : 'Find Matches'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
         </div>

         {/* Results Grid */}
         <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
             {sortedScholarships.length === 0 ? (
                 <div className="text-center py-12 text-slate-500">
                     <AlertCircle size={48} className="mx-auto mb-4 text-slate-300"/>
                     <p>No scholarships found matching your filters.</p>
                     <button onClick={() => {setSelectedGoals([]); setSelectedGroups([]); setSelectedLevels([]); setSelectedProviders([]); setSelectedArtFields([]); setIncomeRange('all'); setSearchQuery('')}} className="text-orange-600 font-bold mt-2 hover:underline">Clear Filters</button>
                 </div>
             ) : (
                 sortedScholarships.map(sch => {
                     const rec = aiRecommendations.find(r => r.id === sch.id);
                     const isGuideActive = activeGuidance === sch.id;
                     
                     // Use ScholarshipEngine to calculate dynamic status
                     const dynamicStatus = ScholarshipEngine.analyze(sch);

                     return (
                        <div key={sch.id} className={`bg-white rounded-xl p-5 border shadow-sm transition-all hover:shadow-md relative group ${rec ? 'border-indigo-200 ring-1 ring-indigo-100' : 'border-slate-200'}`}>
                            {rec && (
                                <div className="absolute -top-3 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                                    <Sparkles size={10} /> Top Pick
                                </div>
                            )}

                            {/* Auto Verification Badge */}
                            {sch.lastVerified && (
                                <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                   <CheckCircle2 size={10} className="text-green-500"/>
                                   Verified on {new Date(sch.lastVerified).toLocaleDateString('en-IN', {month: 'short', day: 'numeric'})}
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <div className="flex items-center gap-1">
                                           {sch.category === 'Sports' ? <Trophy size={14} className="text-orange-500"/> : 
                                            sch.category === 'Arts' ? <Palette size={14} className="text-pink-500"/> :
                                            <BookOpen size={14} className="text-slate-400"/>}
                                           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{sch.provider}</span>
                                        </div>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        {/* Category Badge */}
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                            sch.category === 'Sports' ? 'bg-orange-100 text-orange-800' : 
                                            sch.category === 'Arts' ? 'bg-pink-100 text-pink-800' :
                                            sch.category === 'Merit' ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {sch.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{sch.name}</h3>
                                    
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                                            <IndianRupee size={14} className="text-slate-400"/>
                                            <span>{sch.benefits}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${dynamicStatus.badgeClass}`}>
                                            <Clock size={14}/>
                                            <span className="font-bold text-xs">{dynamicStatus.label}</span>
                                        </div>
                                        {dynamicStatus.isAutoRenewed && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs">
                                                <Calendar size={14}/>
                                                <span>Auto-Renewed (Est. {dynamicStatus.effectiveDeadline})</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* AI Reason */}
                                    {rec && (
                                        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-sm text-indigo-800 mb-3">
                                            <strong>Why:</strong> {rec.reason}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {sch.socialGroup.map(g => g !== 'All' && <span key={g} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{g}</span>)}
                                        {sch.careerGoal.map(g => <span key={g} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">{g}</span>)}
                                    </div>
                                    
                                    {/* AI Guidance Area */}
                                    {isGuideActive && (
                                        <div className="mt-4 bg-indigo-50 rounded-xl p-4 border border-indigo-100 animate-fadeIn">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-2"><Bot size={14}/> Eligibility Check</h4>
                                                <button onClick={() => setActiveGuidance(null)} className="text-slate-400 hover:text-slate-600"><X size={14}/></button>
                                            </div>
                                            {isGuidanceLoading ? (
                                                <div className="flex items-center gap-2 text-xs text-indigo-600">
                                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-600"></div> Checking criteria...
                                                </div>
                                            ) : guidanceData ? (
                                                <div className="text-xs space-y-2 text-slate-700">
                                                    <p><strong>Eligibility:</strong> {guidanceData.eligibility}</p>
                                                    <p><strong>Missing Docs:</strong> {guidanceData.missingDocs}</p>
                                                    <p><strong>Strategy:</strong> {guidanceData.strategy}</p>
                                                </div>
                                            ) : <p className="text-xs text-red-500">Could not fetch guidance.</p>}
                                        </div>
                                    )}

                                </div>

                                <div className="flex md:flex-col items-center gap-2 mt-2 md:mt-0">
                                    <a 
                                        href={sch.applyLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors whitespace-nowrap"
                                    >
                                        Visit Official Website <ExternalLink size={14} />
                                    </a>
                                    <button
                                        onClick={() => checkEligibility(sch)}
                                        className="w-full md:w-auto bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors whitespace-nowrap"
                                    >
                                        <Sparkles size={14} /> Check Eligibility
                                    </button>
                                </div>
                            </div>
                        </div>
                     )
                 })
             )}
         </div>

      </main>
    </div>
  );
};

export default ScholarshipFinder;
