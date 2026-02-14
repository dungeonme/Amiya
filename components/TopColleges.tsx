import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, ExternalLink, GraduationCap, Stethoscope, Palette, Dumbbell, Music, Wrench, ChevronDown, ChevronUp, History, Building, Sparkles, X, Bot } from 'lucide-react';
import { collegeDatabase } from '../services/collegeData';
import { College } from '../types';
import { generateCollegeFit } from '../services/geminiService';

const TopColleges = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [expandedDomains, setExpandedDomains] = useState<string[]>(['Engineering', 'Medical', 'Arts', 'Sports', 'Music', 'Vocational']);
  
  // AI State
  const [activeCollegeId, setActiveCollegeId] = useState<string | null>(null);
  const [fitData, setFitData] = useState<any>(null);
  const [isLoadingFit, setIsLoadingFit] = useState(false);
  const [userProfile] = useState("Student with 85% in Grade 12, interested in Computer Science, JEE Score 92 percentile"); // Mock profile for demo

  const domains = [
    { id: 'Engineering', label: 'Engineering', icon: <GraduationCap size={16} />, color: 'blue' },
    { id: 'Medical', label: 'Medical', icon: <Stethoscope size={16} />, color: 'red' },
    { id: 'Arts', label: 'Arts & Commerce', icon: <Palette size={16} />, color: 'pink' },
    { id: 'Sports', label: 'Sports', icon: <Dumbbell size={16} />, color: 'orange' },
    { id: 'Music', label: 'Music & Arts', icon: <Music size={16} />, color: 'purple' },
    { id: 'Vocational', label: 'Vocational', icon: <Wrench size={16} />, color: 'green' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('disha_college_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('disha_college_searches', JSON.stringify(updated));
  };

  const handleSearchSubmit = (e?: React.KeyboardEvent) => {
    if (e && e.key !== 'Enter') return;
    saveRecentSearch(searchQuery);
  };

  const toggleDomain = (domain: string) => {
    if (expandedDomains.includes(domain)) {
      setExpandedDomains(expandedDomains.filter(d => d !== domain));
    } else {
      setExpandedDomains([...expandedDomains, domain]);
    }
  };

  const checkAdmissionChances = async (college: College) => {
    setActiveCollegeId(college.id);
    setIsLoadingFit(true);
    setFitData(null);
    try {
        const data = await generateCollegeFit(userProfile, college);
        setFitData(data);
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoadingFit(false);
    }
  };

  const filteredData = useMemo(() => {
    return collegeDatabase.filter(c => {
      // Filter by Category
      if (activeFilter !== 'All' && c.domain !== activeFilter) return false;
      
      // Filter by Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.domain.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQuery, activeFilter]);

  // Group filtered data by domain for display
  const groupedData = useMemo(() => {
    const groups: Record<string, College[]> = {};
    domains.forEach(d => groups[d.id] = []);
    filteredData.forEach(c => {
        if(groups[c.domain]) groups[c.domain].push(c);
    });
    return groups;
  }, [filteredData]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-slate-50 min-h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Building className="text-slate-800" size={32}/> 
          Top Colleges in India
        </h1>
        <p className="text-slate-500 mt-2">Explore premier institutions by domain, entrance exams, and location.</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 sticky top-0 z-10">
         <div className="flex flex-col md:flex-row gap-4 mb-4">
           {/* Search */}
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                placeholder="Search college, city, or exam..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:outline-none"
              />
           </div>

           {/* Filter Pills */}
           <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:pb-0">
              <button 
                onClick={() => setActiveFilter('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All Domains
              </button>
              {domains.map(d => (
                <button 
                  key={d.id}
                  onClick={() => setActiveFilter(d.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors ${activeFilter === d.id ? `bg-${d.color}-600 text-white` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  style={{ backgroundColor: activeFilter === d.id ? undefined : '' }} // Tailwind dynamic class limitation fallback
                >
                  {d.icon} {d.label}
                </button>
              ))}
           </div>
         </div>

         {/* Recent Searches */}
         {recentSearches.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
               <History size={12} className="text-slate-400"/>
               <span className="text-slate-400 font-semibold uppercase">Recent:</span>
               {recentSearches.map((term, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSearchQuery(term)}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 transition-colors"
                  >
                    {term}
                  </button>
               ))}
            </div>
         )}
      </div>

      {/* Content Grid */}
      <div className="space-y-6">
        {domains.map(domain => {
          // If filter is active and not matching, or no data for this domain, skip
          if ((activeFilter !== 'All' && activeFilter !== domain.id) || groupedData[domain.id]?.length === 0) return null;

          const isExpanded = expandedDomains.includes(domain.id);

          return (
            <div key={domain.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
               {/* Section Header */}
               <button 
                 onClick={() => toggleDomain(domain.id)}
                 className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100"
               >
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-lg bg-${domain.color}-100 text-${domain.color}-700`}>
                        {domain.icon}
                     </div>
                     <h2 className="text-lg font-bold text-slate-900">{domain.label} Institutions</h2>
                     <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                       {groupedData[domain.id].length}
                     </span>
                  </div>
                  {isExpanded ? <ChevronUp size={20} className="text-slate-400"/> : <ChevronDown size={20} className="text-slate-400"/>}
               </button>

               {/* College Grid */}
               {isExpanded && (
                 <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedData[domain.id].map(college => {
                       const isFitting = activeCollegeId === college.id;
                       
                       return (
                       <div key={college.id} className="group relative bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-slate-300 transition-all">
                          <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase bg-${domain.color}-50 text-${domain.color}-700`}>
                                {college.entranceExam}
                             </span>
                             <div className="p-1.5 rounded-full bg-slate-50 text-slate-400 group-hover:text-slate-900 transition-colors">
                                <Building size={14} />
                             </div>
                          </div>
                          
                          <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{college.name}</h3>
                          
                          <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                             <MapPin size={14} />
                             {college.location}
                          </div>

                          <div className="space-y-2">
                              <a 
                                href={college.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-lg text-sm font-medium opacity-90 hover:opacity-100 transition-opacity"
                              >
                                Visit Official Website <ExternalLink size={14} />
                              </a>
                              <button 
                                onClick={() => checkAdmissionChances(college)}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors"
                              >
                                <Sparkles size={14} /> AI Predict Chance
                              </button>
                          </div>

                          {/* AI Fit Result Overlay */}
                          {isFitting && (
                             <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-xs text-slate-700 animate-fadeIn">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-indigo-900 flex items-center gap-1"><Bot size={12}/> Analysis</h4>
                                    <button onClick={() => setActiveCollegeId(null)} className="text-slate-400 hover:text-slate-600"><X size={12}/></button>
                                </div>
                                {isLoadingFit ? (
                                    <div className="flex items-center gap-2 text-indigo-600">
                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-600"></div> Estimating...
                                    </div>
                                ) : fitData ? (
                                    <div className="space-y-1">
                                        <p><strong>Chance:</strong> {fitData.admissionProbability}</p>
                                        <p><strong>Notes:</strong> {fitData.comparison}</p>
                                        <p className="text-[10px] text-slate-500 italic mt-1">{fitData.disclaimer}</p>
                                    </div>
                                ) : <p className="text-red-500">Error.</p>}
                             </div>
                          )}
                       </div>
                    )})}
                 </div>
               )}
            </div>
          );
        })}

        {filteredData.length === 0 && (
           <div className="text-center py-12 text-slate-500">
              <p>No colleges found matching "{searchQuery}" in this category.</p>
              <button onClick={() => {setSearchQuery(''); setActiveFilter('All')}} className="text-slate-900 font-bold mt-2 underline">Clear Filters</button>
           </div>
        )}
      </div>
    </div>
  );
};

export default TopColleges;
