import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import ChatInterface from './components/ChatInterface';
import ResultsDashboard from './components/ResultsDashboard';
import AssessmentModule from './components/AssessmentModule';
import ScholarshipFinder from './components/ScholarshipFinder';
import CreativeAssessment from './components/CreativeAssessment';
import PsychometricAssessment from './components/PsychometricAssessment';
import SportsAssessment from './components/SportsAssessment';
import TopColleges from './components/TopColleges';
import SchoolFinder from './components/SchoolFinder';
import ArchitectureDocs from './components/ArchitectureDocs';
import ProfessionalInsightForm from './components/ProfessionalInsight';
import { AssessmentResult } from './types';
import { LearningEngine } from './services/learningEngine';
import { Shield, Check } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if consent has already been granted
    if (!LearningEngine.hasConsent()) {
      setShowConsent(true);
    }
  }, []);

  const handleConsent = () => {
    LearningEngine.setConsent(true);
    setShowConsent(false);
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            startAssessment={() => setActiveTab('test')}
            goToSchemes={() => setActiveTab('schemes')}
            goToProfessional={() => setActiveTab('professional')}
          />
        );
      case 'chat':
        return (
          <ChatInterface 
            onAssessmentComplete={handleAssessmentComplete} 
            moveToResults={() => setActiveTab('results')}
          />
        );
      case 'test':
        return (
          <AssessmentModule
            onComplete={handleAssessmentComplete}
            moveToResults={() => setActiveTab('results')}
          />
        );
      case 'creative':
        return <CreativeAssessment />;
      case 'psychometric':
        return <PsychometricAssessment />;
      case 'sports':
        return <SportsAssessment />;
      case 'colleges':
        return <TopColleges />;
      case 'schools':
        return <SchoolFinder />;
      case 'results':
        return <ResultsDashboard data={assessmentResult} />;
      case 'schemes':
        return <ScholarshipFinder />;
      case 'tech':
        return <ArchitectureDocs />;
      case 'professional':
        return <ProfessionalInsightForm />;
      default:
        return <Home 
            startAssessment={() => setActiveTab('test')}
            goToSchemes={() => setActiveTab('schemes')}
            goToProfessional={() => setActiveTab('professional')}
          />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      showMobileMenu={showMobileMenu}
      setShowMobileMenu={setShowMobileMenu}
    >
      {renderContent()}
      
      {/* Footer link to tech docs */}
      {activeTab !== 'tech' && activeTab !== 'home' && (
        <div className="hidden md:block absolute bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity">
           <button 
             onClick={() => setActiveTab('tech')}
             className="text-xs text-slate-500 hover:text-orange-600 underline flex items-center gap-1"
           >
             System Architecture (Viksit Bharat Specs)
           </button>
        </div>
      )}

      {/* Privacy Consent Banner */}
      {showConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl p-4 z-50 animate-slideUp">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-start gap-3">
                <Shield className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Your Data Privacy Matters</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                    We use anonymous interaction data to improve our AI models and provide better career recommendations. 
                    This helps us align with the National Skill Framework. No personally identifiable information (PII) is shared.
                  </p>
                </div>
             </div>
             <button 
               onClick={handleConsent}
               className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors"
             >
               <Check size={16} /> I Agree
             </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
