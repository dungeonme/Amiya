import React, { useState } from 'react';
import { Database, Server, Cpu, Layers, GitBranch, Shield, Zap, Search, Globe, Lock } from 'lucide-react';
import { studentDatabase } from '../services/studentData';

const ArchitectureDocs = () => {
  const [activeSection, setActiveSection] = useState<'blueprint' | 'data' | 'roadmap'>('blueprint');

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3 py-1 mb-4">
            <span className="text-xs font-bold text-slate-600 uppercase">Technical Specification</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Platform Architecture: Viksit Bharat Ready</h1>
        <p className="text-slate-500 mt-2">Design specs for a Scalable, AI-First Career Ecosystem aligned with IndiaAI Mission.</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => setActiveSection('blueprint')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeSection === 'blueprint' ? 'bg-orange-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          1. System Blueprint
        </button>
        <button 
          onClick={() => setActiveSection('data')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeSection === 'data' ? 'bg-orange-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          2. Data & AI Strategy
        </button>
        <button 
          onClick={() => setActiveSection('roadmap')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeSection === 'roadmap' ? 'bg-orange-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          3. Future Integration
        </button>
      </div>

      {activeSection === 'blueprint' && (
        <div className="space-y-8">
          {/* Architecture Diagram */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Layers className="text-blue-500" /> High-Level Architecture
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              {/* Client Layer */}
              <div className="md:col-span-1 border-2 border-slate-200 border-dashed rounded-xl p-4 bg-slate-50">
                <div className="font-bold text-slate-700 mb-2">Frontend (Edge)</div>
                <div className="bg-white p-2 rounded shadow-sm border text-sm mb-2">React 19 PWA</div>
                <div className="bg-white p-2 rounded shadow-sm border text-sm">Offline First</div>
              </div>

              {/* API Gateway */}
              <div className="md:col-span-1 flex flex-col justify-center items-center">
                 <div className="h-0.5 w-full bg-slate-300 relative">
                   <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-white px-1 text-slate-500 border border-slate-200 rounded">HTTPS / GraphQL</span>
                 </div>
                 <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg w-full my-2">
                   <div className="font-bold text-indigo-800 text-sm">Unified Gateway</div>
                   <div className="text-[10px] text-indigo-600">Auth / Rate Limit</div>
                 </div>
                 <div className="h-0.5 w-full bg-slate-300"></div>
              </div>

              {/* Backend Services */}
              <div className="md:col-span-2 border-2 border-orange-100 rounded-xl p-4 bg-orange-50/30">
                <div className="font-bold text-slate-700 mb-4">IndiaAI Core Engine</div>
                <div className="grid grid-cols-2 gap-2">
                   <div className="bg-white p-3 rounded border shadow-sm">
                      <div className="text-xs font-bold text-purple-600 flex items-center gap-1"><Cpu size={12}/> Gemini Flash</div>
                      <div className="text-[10px] text-slate-500">Reasoning & Planning</div>
                   </div>
                   <div className="bg-white p-3 rounded border shadow-sm">
                      <div className="text-xs font-bold text-green-600 flex items-center gap-1"><Search size={12}/> Vector Search</div>
                      <div className="text-[10px] text-slate-500">Skill Similarity (Embedding)</div>
                   </div>
                   <div className="bg-white p-3 rounded border shadow-sm col-span-2">
                      <div className="text-xs font-bold text-slate-600 flex items-center gap-1"><GitBranch size={12}/> Opportunity Mapper</div>
                      <div className="text-[10px] text-slate-500">Matches: User -> Schemes (PMKVY)</div>
                   </div>
                </div>
              </div>

              {/* Data Layer */}
              <div className="md:col-span-1 flex flex-col justify-center pl-4 border-l-2 border-dashed border-slate-200">
                <div className="font-bold text-slate-700 mb-2">Govt Data Lake</div>
                <div className="bg-slate-800 text-white p-2 rounded shadow-sm text-[10px] mb-2 flex items-center gap-2 justify-center">
                   <Database size={10}/> Skill India API
                </div>
                <div className="bg-indigo-900 text-white p-2 rounded shadow-sm text-[10px] flex items-center gap-2 justify-center">
                   <Server size={10}/> NCS Portal
                </div>
              </div>
            </div>
          </section>

          {/* Logic & Strategy */}
          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
               <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Cpu className="text-purple-500"/> LLM RAG Pipeline</h3>
               <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-700">
                 <li><strong>Input Ingestion:</strong> Multimodal input (Text/Voice) for rural accessibility.</li>
                 <li><strong>Context Injection:</strong> Fetch relevant "Emerging Sectors" (e.g., Drone Didi initiative) based on gender/location.</li>
                 <li><strong>Prompt Chain:</strong> "Given Profile X, map to Viksit Bharat Goal Y."</li>
                 <li><strong>Output:</strong> Structured JSON Roadmap compatible with Digital Public Infrastructure (DPI).</li>
               </ol>
            </section>

             <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
               <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Shield className="text-green-500"/> Responsible AI & Ethics</h3>
               <ul className="space-y-3 text-sm text-slate-700">
                 <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div> <strong>Bias Mitigation:</strong> Explicit instructions to promote STEM for women in rural areas.</li>
                 <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div> <strong>Economic Reality:</strong> Prioritize government-funded pathways for EWS (Economically Weaker Sections).</li>
                 <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div> <strong>Explainability:</strong> "Why this career?" section links back to user's observed strengths.</li>
               </ul>
            </section>
          </div>
        </div>
      )}

      {activeSection === 'data' && (
        <div className="space-y-8">
          
          {/* Future Schema */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Future-Scalable Database Schema</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div className="border border-slate-300 rounded-lg p-4 relative">
                    <div className="absolute -top-3 left-4 bg-white px-2 font-bold text-slate-700 text-sm">UserProfile (DPI Aligned)</div>
                    <pre className="text-xs font-mono text-slate-600">
{`id: UUID
aadhaar_hash: String (Optional)
location_code: String (LGD Code)
socio_economic_status: Enum
skills_verified: JSONB
learning_history: JSONB`}
                    </pre>
                 </div>
                 <div className="border border-slate-300 rounded-lg p-4 relative">
                    <div className="absolute -top-3 left-4 bg-white px-2 font-bold text-slate-700 text-sm">NationalSkillRegistry</div>
                    <pre className="text-xs font-mono text-slate-600">
{`id: UUID
sector: Enum (Green Energy, AI...)
qp_code: String (NSQF)
demand_forecast_2030: High/Med
salary_trend: JSONB`}
                    </pre>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="border border-slate-300 rounded-lg p-4 relative bg-purple-50 border-purple-200">
                    <div className="absolute -top-3 left-4 bg-purple-50 px-2 font-bold text-purple-700 text-sm">Vector Store (Embeddings)</div>
                    <p className="text-xs text-purple-800 mb-2">Used for semantic matching of user interests to career descriptions.</p>
                    <pre className="text-xs font-mono text-purple-800">
{`collection: 'skills_taxonomy'
vector_size: 768 (Gecko/Gemini)
distance_metric: Cosine
metadata: { sector, difficulty }`}
                    </pre>
                 </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeSection === 'roadmap' && (
        <div className="space-y-6">
          <div className="relative border-l-4 border-slate-200 pl-8 space-y-12">
            
            <div className="relative">
               <div className="absolute -left-[42px] top-0 bg-green-500 rounded-full w-5 h-5 border-4 border-white"></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Phase 1: Digital Foundation (Current)</h3>
                 <p className="text-sm text-slate-500 mb-2">Establishing the GenAI interface and scheme mapping.</p>
                 <div className="flex gap-2 flex-wrap">
                    <span className="text-xs border border-green-200 bg-green-50 text-green-700 px-2 py-1 rounded">React PWA</span>
                    <span className="text-xs border border-green-200 bg-green-50 text-green-700 px-2 py-1 rounded">Gemini 1.5 Pro</span>
                 </div>
               </div>
            </div>

            <div className="relative">
               <div className="absolute -left-[42px] top-0 bg-blue-500 rounded-full w-5 h-5 border-4 border-white"></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Phase 2: Data & Ecosystem Integration</h3>
                 <p className="text-sm text-slate-500 mb-2">Connecting with real-time Government APIs.</p>
                 <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                   <li>Ingest <strong>Skill India Digital</strong> course catalog.</li>
                   <li>Integrate <strong>NCS (National Career Service)</strong> job feed.</li>
                   <li>Implement <strong>Bhashini</strong> for real-time voice translation.</li>
                 </ul>
               </div>
            </div>

            <div className="relative">
               <div className="absolute -left-[42px] top-0 bg-purple-500 rounded-full w-5 h-5 border-4 border-white"></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Phase 3: National AI Grid</h3>
                 <p className="text-sm text-slate-500 mb-2">Full-scale deployment as a Digital Public Good.</p>
                 <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                   <li>Predictive analytics for District-level skill gaps.</li>
                   <li>Automated scholarship application via API Setu.</li>
                   <li>Blockchain-verified skill credentials.</li>
                 </ul>
               </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureDocs;
