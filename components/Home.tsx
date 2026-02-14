import React, { useState } from 'react';
import { ArrowRight, Cpu, Globe, Users, TrendingUp, ShieldCheck, Zap, Award, Activity, X, BookOpen, Briefcase, GraduationCap, Lightbulb, Landmark, UserCheck } from 'lucide-react';

interface HomeProps {
  startAssessment: () => void;
  goToSchemes: () => void;
  goToProfessional: () => void;
}

interface SectorDetail {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  overview: string;
  careers: string[];
  skills: {
    technical: string[];
    cognitive: string[];
    soft: string[];
  };
  institutes: string[];
  schemes: string[];
}

const SECTOR_DETAILS: Record<string, SectorDetail> = {
  "Semiconductors & Electronics": {
    id: "semi",
    label: "Semiconductors & Electronics",
    icon: <Cpu size={32} />,
    color: "blue",
    overview: "Strategic backbone of Digital India. The India Semiconductor Mission (ISM) aims to make India a global hub for electronics manufacturing and design by 2030.",
    careers: ["VLSI Design Engineer", "Chip Layout Engineer", "Embedded Systems Architect", "Process Integration Engineer", "Verification Engineer"],
    skills: {
      technical: ["Verilog/VHDL", "EDA Tools (Cadence/Synopsys)", "Embedded C", "Solid State Physics"],
      cognitive: ["Systems Thinking", "Attention to Detail"],
      soft: ["Problem Solving", "Collaboration"]
    },
    institutes: ["IIT Madras", "IIT Bombay", "IISc Bangalore", "IIT Hyderabad", "NIT Calicut"],
    schemes: ["Chips to Startup (C2S) Programme", "SPECS Scheme", "Design Linked Incentive (DLI) Scheme"]
  },
  "Green Energy & EV": {
    id: "green",
    label: "Green Energy & EV",
    icon: <Zap size={32} />,
    color: "green",
    overview: "Critical for India's 2070 Net Zero goal. Focus on renewable energy integration, electric mobility infrastructure, and Green Hydrogen production.",
    careers: ["EV Systems Engineer", "Battery Algorithm Engineer", "Solar Grid Manager", "Wind Energy Technician", "Sustainability Consultant"],
    skills: {
      technical: ["MATLAB/Simulink", "Power Electronics", "Thermodynamics", "Renewable Energy Systems"],
      cognitive: ["Analytical Reasoning", "Environmental Awareness"],
      soft: ["Adaptability", "Project Management"]
    },
    institutes: ["IIT Delhi (Centre for Energy Studies)", "IIT Roorkee", "TERI School of Advanced Studies", "GERMI"],
    schemes: ["FAME India Phase II", "National Green Hydrogen Mission", "PLI for ACC Battery Storage"]
  },
  "AI & Data Science": {
    id: "ai",
    label: "AI & Data Science",
    icon: <Globe size={32} />,
    color: "purple",
    overview: "The engine of the future economy. 'AI for All' strategy focuses on solving societal scale problems in healthcare, agriculture, and governance.",
    careers: ["Machine Learning Engineer", "Data Scientist", "AI Ethicist", "NLP Specialist", "Big Data Architect"],
    skills: {
      technical: ["Python", "PyTorch/TensorFlow", "SQL", "Cloud Computing", "Linear Algebra"],
      cognitive: ["Pattern Recognition", "Algorithmic Thinking"],
      soft: ["Critical Thinking", "Ethics"]
    },
    institutes: ["IIT Hyderabad (B.Tech in AI)", "IISc Bangalore", "ISI Kolkata", "IIT Kharagpur"],
    schemes: ["INDIAai Mission", "National Program on AI", "FutureSkills Prime"]
  },
  "Defence Technology": {
    id: "defence",
    label: "Defence Technology",
    icon: <ShieldCheck size={32} />,
    color: "orange",
    overview: "Achieving 'Atmanirbhar Bharat' in defence manufacturing, focusing on indigenous drones, cyber-warfare, and advanced ballistics.",
    careers: ["Ballistics Expert", "Drone Pilot/Engineer", "Cybersecurity Analyst", "Aerospace Structures Engineer", "Defence Strategist"],
    skills: {
      technical: ["Aerodynamics", "Cryptography", "Avionics", "Network Security"],
      cognitive: ["Strategic Planning", "Risk Assessment"],
      soft: ["Discipline", "Leadership"]
    },
    institutes: ["DIAT Pune", "IIT Kanpur (Aerospace)", "IIT Madras", "NFSU Gandhinagar"],
    schemes: ["iDEX (Innovations for Defence Excellence)", "Technology Development Fund (TDF)"]
  },
  "AgriTech & Food Processing": {
    id: "agri",
    label: "AgriTech & Food Processing",
    icon: <Award size={32} />,
    color: "yellow",
    overview: "Modernizing India's primary sector through IoT, precision farming, and value-added processing to double farmers' income and ensure food security.",
    careers: ["Agri-Drone Pilot", "Soil Scientist", "Food Technologist", "Supply Chain Manager", "Precision Agriculture Specialist"],
    skills: {
      technical: ["IoT Sensors", "Remote Sensing", "Biotechnology", "Logistics Management"],
      cognitive: ["Observation", "Ecological Intelligence"],
      soft: ["Patience", "Rural Communication"]
    },
    institutes: ["IARI New Delhi", "GB Pant University", "CFTRI Mysore", "NIFTEM"],
    schemes: ["PM Kisan Sampada Yojana", "Agriculture Infrastructure Fund (AIF)", "Agri-Clinics Scheme"]
  },
  "Healthcare & BioTech": {
    id: "health",
    label: "Healthcare & BioTech",
    icon: <Users size={32} />,
    color: "red",
    overview: "Expanding the bio-economy and accessible healthcare infrastructure under Ayushman Bharat to ensure a healthy, productive nation.",
    careers: ["Bio-informatician", "Genomic Researcher", "Clinical Data Manager", "Tele-medicine Specialist", "Biomedical Engineer"],
    skills: {
      technical: ["Genetics", "Clinical Trials", "Data Analysis", "Medical Imaging"],
      cognitive: ["Scientific Inquiry", "Empathy"],
      soft: ["Ethics", "Teamwork"]
    },
    institutes: ["AIIMS (All Branches)", "IISERs", "NIPER (Pharma)", "CMC Vellore"],
    schemes: ["National BioPharma Mission", "BIRAC Grants", "Ayushman Bharat Digital Mission"]
  },
  "FinTech & Digital Economy": {
    id: "fintech",
    label: "FinTech & Digital Economy",
    icon: <TrendingUp size={32} />,
    color: "indigo",
    overview: "Revolutionizing finance with UPI, Digital Rupee, and financial inclusion technologies to serve the next billion users.",
    careers: ["Blockchain Developer", "Financial Analyst", "Quantitative Researcher", "Risk Manager", "Product Manager (FinTech)"],
    skills: {
      technical: ["Blockchain", "Smart Contracts", "Financial Modeling", "Cybersecurity"],
      cognitive: ["Quantitative Aptitude", "Logic"],
      soft: ["Integrity", "Communication"]
    },
    institutes: ["IIMs (Ahmedabad/Bangalore)", "SRCC", "SSCBS", "NISM Mumbai"],
    schemes: ["Pradhan Mantri Mudra Yojana", "RBI Regulatory Sandbox", "Startup India"]
  },
  "Space Technology": {
    id: "space",
    label: "Space Technology",
    icon: <Activity size={32} />,
    color: "slate",
    overview: "Propelling India into the commercial space age with Gaganyaan, private launches, and satellite constellations.",
    careers: ["Aerospace Engineer", "Satellite Communication Expert", "Propulsion Engineer", "Astrobiologist", "Space Law Specialist"],
    skills: {
      technical: ["Orbital Mechanics", "Propulsion Systems", "Materials Science", "Telemetry"],
      cognitive: ["Spatial Reasoning", "Innovation"],
      soft: ["Resilience", "Precision"]
    },
    institutes: ["IIST Thiruvananthapuram", "IIT Bombay", "IIT Madras"],
    schemes: ["IN-SPACe (Private Sector Support)", "ISRO Yuvika"]
  }
};

const Home: React.FC<HomeProps> = ({ startAssessment, goToSchemes, goToProfessional }) => {
  const [selectedSector, setSelectedSector] = useState<SectorDetail | null>(null);

  const getSectorIcon = (label: string) => {
    // Helper to map label to icon from the SECTOR_DETAILS constant
    // In a real scenario, you might iterate the values directly, but here we match the grid map below
    return SECTOR_DETAILS[label]?.icon || <Activity />;
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-12 pb-16 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-3 py-1 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium tracking-wide text-green-400 uppercase">Aligned with IndiaAI Mission</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Building India's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">AI-Ready Workforce</span> for 2047
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Disha is a strategic career intelligence platform empowering youth specifically for the <strong>Viksit Bharat</strong> era. We map cognitive potential to emerging national sectors—from Semiconductors to Green Energy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button 
              onClick={startAssessment}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-500/25"
            >
              Start AI Assessment <ArrowRight size={20} />
            </button>
            <button 
              onClick={goToSchemes}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              Scholarship & Discovery
            </button>
          </div>

          <button 
              onClick={goToProfessional}
              className="text-sm text-slate-400 hover:text-white flex items-center gap-2 underline underline-offset-4 transition-colors"
            >
              <UserCheck size={16} /> Already Working? Share Your Journey to help students.
            </button>
        </div>
      </section>

      {/* Viksit Bharat Alignment Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Aligned with Viksit Bharat 2047</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our architecture is designed to support the Government of India's vision for inclusive growth, digital empowerment, and future-ready skills.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 transition-colors">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Users className="text-orange-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Human Capital Development</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Democratizing high-quality career guidance for Tier-2/3 cities and rural India.
            </p>
            <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
                <li><strong>Mentorship Model</strong> linking students to experts.</li>
                <li><strong>Teacher Training Ecosystem</strong> for awareness.</li>
                <li><strong>Scholarship Mapping</strong> logic included.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Globe className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Empowerment</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Leveraging GenAI to bridge the digital divide with inclusive access.
            </p>
            <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
                <li><strong>AI Literacy Modules</strong> for beginners.</li>
                <li><strong>Regional Language Support</strong> (Bhashini).</li>
                <li><strong>Digital Skill Certification</strong> pathways.</li>
                <li>Optimized for <strong>Low-bandwidth</strong> areas.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-green-200 transition-colors">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Economic Resilience</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Directing youth towards high-growth sectors to boost employability and GDP.
            </p>
            <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
                <li>Real-time <strong>Sector Demand Mapping</strong>.</li>
                <li><strong>Employability Analytics</strong> dashboard.</li>
                <li>Direct <strong>Apprenticeship (NAPS)</strong> links.</li>
                <li>Career-to-GDP contribution tracking.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* National Skill & AI Ecosystem */}
      <section className="bg-slate-100 py-16 px-6 md:px-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <ShieldCheck className="text-blue-600" size={20}/>
                 <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">National Priority Sectors</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Emerging Ecosystems (2030-2047)</h2>
            </div>
            <div className="text-sm text-slate-500 max-w-md text-right md:text-left">
              Mapping career pathways to India's strategic industrial goals. Click on a sector to explore detailed roadmap.
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(SECTOR_DETAILS).map((sector, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedSector(sector)}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition-all hover:border-slate-300 group cursor-pointer"
              >
                <div className={`text-${sector.color}-600 mb-3 bg-${sector.color}-50 p-3 rounded-full group-hover:scale-110 transition-transform`}>
                  {sector.icon}
                </div>
                <h4 className="font-semibold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">{sector.label}</h4>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Detail Modal */}
      {selectedSector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className={`p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10 bg-${selectedSector.color}-50`}>
               <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-white shadow-sm text-${selectedSector.color}-600`}>
                    {selectedSector.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedSector.label}</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Strategic Sector 2030-2047</p>
                  </div>
               </div>
               <button onClick={() => setSelectedSector(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                 <X size={24} />
               </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Overview */}
              <section>
                <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                  <Lightbulb size={20} className="text-yellow-500"/> Sector Overview
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedSector.overview}
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Careers */}
                <section>
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                    <Briefcase size={20} className="text-blue-500"/> Career Opportunities
                  </h4>
                  <ul className="space-y-2">
                    {selectedSector.careers.map((career, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        {career}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Institutes */}
                <section>
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                    <GraduationCap size={20} className="text-purple-500"/> Top Institutes
                  </h4>
                  <ul className="space-y-2">
                    {selectedSector.institutes.map((inst, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                        {inst}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Skills */}
              <section className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                  <BookOpen size={20} className="text-green-500"/> Required Skills
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Technical</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSector.skills.technical.map((s, i) => (
                        <span key={i} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-700">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Cognitive</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSector.skills.cognitive.map((s, i) => (
                        <span key={i} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-700">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Soft Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSector.skills.soft.map((s, i) => (
                        <span key={i} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-700">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Schemes */}
              <section>
                 <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                    <Landmark size={20} className="text-orange-500"/> Govt Scholarships & Programs
                  </h4>
                  <div className="grid gap-2">
                    {selectedSector.schemes.map((scheme, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-orange-50/50 hover:bg-orange-50 transition-colors">
                        <Award size={16} className="text-orange-600 flex-shrink-0"/>
                        <span className="text-sm font-medium text-slate-800">{scheme}</span>
                      </div>
                    ))}
                  </div>
              </section>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedSector(null)}
                className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Disha: Viksit Bharat AI</h4>
            <p className="text-sm">Empowering India's Youth with AI-Driven Career Intelligence.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Government Data API</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
