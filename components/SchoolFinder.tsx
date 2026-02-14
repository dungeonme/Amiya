import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, ExternalLink, GraduationCap, Building2, Trophy, Home, Coins, History, School as SchoolIcon, Landmark, Users } from 'lucide-react';
import { schoolDatabase } from '../services/schoolData';
import { School } from '../types';

const SchoolFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const filters = [
    { id: 'Central Govt', label: 'Central Govt', icon: <Landmark size={14} />, color: 'blue' },
    { id: 'State Govt', label: 'State Govt', icon: <Building2 size={14} />, color: 'indigo' },
    { id: 'Private', label: 'Private', icon: <Users size={14} />, color: 'purple' },
    { id: 'Sports', label: 'Sports', icon: <Trophy size={14} />, color: 'orange' },
    { id: 'Residential', label: 'Residential', icon: <Home size={14} />, color: 'emerald' },
    { id: 'Fully Funded', label: 'Fully Funded', icon: <Coins size={14} />, color: 'pink' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('disha_school_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('disha_school_searches', JSON.stringify(updated));
  };

  const handleSearchSubmit = (e?: React.KeyboardEvent) => {
    if (e && e.key !== 'Enter') return;
    saveRecentSearch(searchQuery);
  };

  const filteredData = useMemo(() => {
    return schoolDatabase.filter(s => {
      // Filter by Category Tag
      if (activeFilter !== 'All' && !s.tags.includes(activeFilter as any)) return false;
      
      // Filter by Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQuery, activeFilter]);

  const getPrimaryTag = (tags: string[]) => {
    if (tags.includes('Central Govt')) return { label: 'Central Govt', color: 'blue' };
    if (tags.includes('State Govt')) return { label: 'State Govt', color: 'indigo' };
    if (tags.includes('Sports')) return { label: 'Sports', color: 'orange' };
    if (tags.includes('Private')) return { label: 'Private', color: 'purple' };
    return { label: 'School', color: 'slate' };
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-slate-50 min-h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <SchoolIcon className="text-slate-800" size={32}/> 
          Schools in India
        </h1>
        <p className="text-slate-500 mt-2">Explore Government, Private, Residential, and Sports schools categorised for you.</p>
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
                placeholder="Search by name, type, or city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:outline-none"
              />
           </div>

           {/* Filter Pills */}
           <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:pb-0">
              <button 
                onClick={() => setActiveFilter('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All Schools
              </button>
              {filters.map(f => (
                <button 
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors ${activeFilter === f.id ? `bg-${f.color}-600 text-white` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  style={{ backgroundColor: activeFilter === f.id ? undefined : '' }}
                >
                  {f.icon} {f.label}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map(school => {
           const primaryTag = getPrimaryTag(school.tags);
           
           return (
            <div key={school.id} className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all flex flex-col h-full">
               <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase bg-${primaryTag.color}-50 text-${primaryTag.color}-700`}>
                     {primaryTag.label}
                  </span>
                  <div className="p-1.5 rounded-full bg-slate-50 text-slate-400 group-hover:text-slate-900 transition-colors">
                     <GraduationCap size={16} />
                  </div>
               </div>
               
               <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{school.name}</h3>
               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{school.type}</p>
               
               <p className="text-sm text-slate-600 mb-4 flex-1 line-clamp-3">
                  {school.description}
               </p>

               <div className="flex flex-wrap gap-2 mb-4">
                  {school.tags.map(tag => (
                     tag !== primaryTag.label && (
                        <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                           {tag}
                        </span>
                     )
                  ))}
               </div>

               <a 
                 href={school.website} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 py-2.5 rounded-lg text-sm font-bold border border-slate-200 hover:border-slate-300 transition-all"
               >
                  Visit Official Website <ExternalLink size={14} />
               </a>
            </div>
           );
        })}

        {filteredData.length === 0 && (
           <div className="col-span-full text-center py-12 text-slate-500">
              <p>No schools found matching "{searchQuery}" in this category.</p>
              <button onClick={() => {setSearchQuery(''); setActiveFilter('All')}} className="text-slate-900 font-bold mt-2 underline">Clear Filters</button>
           </div>
        )}
      </div>
    </div>
  );
};

export default SchoolFinder;
