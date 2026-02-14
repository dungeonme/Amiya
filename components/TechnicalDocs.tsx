import React from 'react';
import { Database, Server, Cpu, Layers } from 'lucide-react';

const TechnicalDocs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg my-8 border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b pb-4">Platform Architecture & Tech Specs</h2>
      
      <div className="space-y-8">
        
        {/* System Architecture */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Layers className="text-blue-600" />
            <h3 className="text-xl font-semibold text-slate-800">1. System Architecture (Low-Data Optimized)</h3>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
            <p className="text-sm text-slate-600">
              The platform utilizes a <strong>Client-Heavy, Serverless Architecture</strong> to minimize latency and data usage for rural users.
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
              <li><strong>Frontend:</strong> React 18 + TypeScript + Tailwind CSS (Single Page App). PWA-ready for offline capability.</li>
              <li><strong>AI Engine:</strong> Google Gemini 1.5 Flash (via proxy/serverless function) for low-latency assessment.</li>
              <li><strong>Data Layer:</strong> Client-side caching for Schemas and Roadmap data to reduce repeated API calls.</li>
              <li><strong>CDN:</strong> Assets served via global edge locations.</li>
            </ul>
          </div>
        </section>

        {/* ML/AI Design */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-purple-600" />
            <h3 className="text-xl font-semibold text-slate-800">2. AI & Recommendation Logic</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">Input Processing (NLP)</h4>
              <p className="text-xs text-purple-800">
                Uses LLM (Gemini) to extract key entities from chat: 
                <em>Academic Grade, Interests (e.g., Mechanics, Biology), Financial Constraints (BPL/EWS), Location.</em>
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">Mapping Logic</h4>
              <p className="text-xs text-purple-800">
                Context-aware mapping: If <code>Finance == Low</code> AND <code>Interest == Tech</code> -> Suggest <strong>ITI/Diploma</strong> over B.Tech.
                Cross-referenced with a JSON database of Government Schemes (PMKVY).
              </p>
            </div>
          </div>
        </section>

        {/* Database Schema */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-green-600" />
            <h3 className="text-xl font-semibold text-slate-800">3. Data Model (TypeScript Interfaces)</h3>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl overflow-x-auto">
<pre className="text-xs text-green-400 font-mono">
{`interface UserProfile {
  id: string;
  demographics: { state: string; economicGroup: 'BPL' | 'APL'; };
  academics: { grade: number; stream?: string; marks?: number; };
  aptitude: { verbal: number; logical: number; technical: number; };
}

interface CareerPath {
  id: string;
  name: string; // e.g., "Solar Technician"
  type: 'Vocational' | 'Degree' | 'Diploma';
  roadmap: Step[];
  schemes: SchemeId[]; // FK to Schemes
}

interface Scheme {
  id: string;
  name: string; // e.g., "PMKVY 4.0"
  ministry: string;
  funding: number; // Max benefit amount
}`}
</pre>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TechnicalDocs;
