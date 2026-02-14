import React from 'react';
import { Scheme } from '../types';
import { ExternalLink, Award, Building, Landmark, Hammer, Laptop } from 'lucide-react';

interface SchemesProps {
  schemes?: Scheme[];
}

const Schemes: React.FC<SchemesProps> = ({ schemes }) => {
  // Enhanced fallback schemes including new Govt initiatives
  const displaySchemes = schemes && schemes.length > 0 ? schemes : [
    {
      name: "PM Vishwakarma Yojana",
      type: "Vocational",
      eligibility: "Artisans & Craftspeople (18+ yrs), Traditional trades",
      benefits: "₹15,000 Toolkit incentive, 5% interest loan, Skill Training",
      link: "https://pmvishwakarma.gov.in"
    },
    {
      name: "Skill India Digital (SID)",
      type: "Digital Skilling",
      eligibility: "Any Indian citizen looking for upskilling",
      benefits: "Access to verified digital courses, Job exchange, Certification",
      link: "https://www.skillindiadigital.gov.in"
    },
    {
      name: "PMKVY 4.0 (Future Skills)",
      type: "Central",
      eligibility: "Indian youth (15-45 yrs)",
      benefits: "Training in AI, Robotics, Drone Tech, Soft Skills",
      link: "https://www.pmkvyofficial.org"
    },
    {
      name: "NATS (National Apprenticeship)",
      type: "Training",
      eligibility: "Graduates/Diploma holders in Engineering/Tech",
      benefits: "On-the-job training with monthly stipend",
      link: "http://portal.mhrdnats.gov.in"
    },
     {
      name: "National Scholarship Portal",
      type: "Scholarship",
      eligibility: "Students (Pre-Matric to PhD)",
      benefits: "Direct Benefit Transfer (DBT) for tuition and expenses",
      link: "https://scholarships.gov.in"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'Scholarship': return <Award className="text-yellow-500" />;
      case 'State': return <Building className="text-blue-500" />;
      case 'Vocational': return <Hammer className="text-orange-600" />;
      case 'Digital Skilling': return <Laptop className="text-purple-600" />;
      default: return <Landmark className="text-green-600" />;
    }
  };

  const getBadgeColor = (type: string) => {
     switch(type) {
        case 'Vocational': return 'bg-orange-50 text-orange-700';
        case 'Digital Skilling': return 'bg-purple-50 text-purple-700';
        case 'Scholarship': return 'bg-yellow-50 text-yellow-700';
        default: return 'bg-green-50 text-green-700';
     }
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
           <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Government Initiatives</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">National Opportunity Map</h2>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Explore opportunities curated for **Viksit Bharat**. From traditional craftsmanship to Future Skills in AI & Drones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displaySchemes.map((scheme, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col group">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                  {getIcon(scheme.type)}
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${getBadgeColor(scheme.type)}`}>
                  {scheme.type}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">{scheme.name}</h3>
              
              <div className="space-y-4 mt-4">
                <div className="relative pl-3 border-l-2 border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Eligibility</p>
                  <p className="text-sm text-slate-700 font-medium">{scheme.eligibility}</p>
                </div>
                <div className="relative pl-3 border-l-2 border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Key Benefit</p>
                  <p className="text-sm text-slate-700">{scheme.benefits}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-xl">
              <a 
                href={scheme.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors"
              >
                Apply Now <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
