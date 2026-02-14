import React from 'react';
import { Compass, BookOpen, User, Menu, Cpu, ClipboardCheck, Home, Palette, Building, School, UserCheck, Activity, BrainCircuit } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, showMobileMenu, setShowMobileMenu }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-4 border-r border-slate-800 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8 px-2 flex-shrink-0">
          <div className="bg-gradient-to-br from-orange-500 to-green-500 p-1.5 rounded-lg shadow-lg">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-tight">Disha</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Viksit Bharat AI</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <NavButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<Home size={20} />} 
            label="Home Dashboard" 
          />
          <NavButton 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
            icon={<User size={20} />} 
            label="AI Career Coach" 
          />
           <NavButton 
            active={activeTab === 'test'} 
            onClick={() => setActiveTab('test')} 
            icon={<ClipboardCheck size={20} />} 
            label="Skill Assessment" 
          />
          <NavButton 
            active={activeTab === 'psychometric'} 
            onClick={() => setActiveTab('psychometric')} 
            icon={<BrainCircuit size={20} />} 
            label="Psychometric Test" 
          />
          <NavButton 
            active={activeTab === 'sports'} 
            onClick={() => setActiveTab('sports')} 
            icon={<Activity size={20} />} 
            label="Sports Aptitude" 
          />
          <NavButton 
            active={activeTab === 'creative'} 
            onClick={() => setActiveTab('creative')} 
            icon={<Palette size={20} />} 
            label="Creative Assessment" 
          />
          <NavButton 
            active={activeTab === 'colleges'} 
            onClick={() => setActiveTab('colleges')} 
            icon={<Building size={20} />} 
            label="Top Colleges" 
          />
          <NavButton 
            active={activeTab === 'schools'} 
            onClick={() => setActiveTab('schools')} 
            icon={<School size={20} />} 
            label="Schools in India" 
          />
          <NavButton 
            active={activeTab === 'results'} 
            onClick={() => setActiveTab('results')} 
            icon={<Cpu size={20} />} 
            label="Career Roadmap" 
          />
          <NavButton 
            active={activeTab === 'schemes'} 
            onClick={() => setActiveTab('schemes')} 
            icon={<BookOpen size={20} />} 
            label="Scholarship & Discovery" 
          />
          <NavButton 
            active={activeTab === 'professional'} 
            onClick={() => setActiveTab('professional')} 
            icon={<UserCheck size={20} />} 
            label="Professional Insights" 
          />
        </nav>

        <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-[10px] text-green-400 font-bold uppercase">IndiaAI Mission Ready</p>
          </div>
          <p className="text-[10px] text-slate-500">v2.1.0 (Beta)</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        <header className="md:hidden h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-20 shadow-md flex-shrink-0">
          <div className="flex items-center gap-2">
             <div className="bg-gradient-to-br from-orange-500 to-green-500 p-1 rounded">
               <Compass className="w-5 h-5 text-white" />
             </div>
             <span className="font-bold text-lg">Disha AI</span>
          </div>
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="absolute top-16 left-0 w-full bg-slate-800 text-white z-30 shadow-xl border-t border-slate-700 md:hidden overflow-y-auto max-h-[calc(100vh-4rem)]">
             <nav className="p-4 space-y-2">
                <NavButton 
                  active={activeTab === 'home'} 
                  onClick={() => { setActiveTab('home'); setShowMobileMenu(false); }} 
                  icon={<Home size={20} />} 
                  label="Home Dashboard" 
                />
                <NavButton 
                  active={activeTab === 'chat'} 
                  onClick={() => { setActiveTab('chat'); setShowMobileMenu(false); }} 
                  icon={<User size={20} />} 
                  label="AI Career Coach" 
                />
                 <NavButton 
                  active={activeTab === 'test'} 
                  onClick={() => { setActiveTab('test'); setShowMobileMenu(false); }} 
                  icon={<ClipboardCheck size={20} />} 
                  label="Skill Assessment" 
                />
                <NavButton 
                  active={activeTab === 'psychometric'} 
                  onClick={() => { setActiveTab('psychometric'); setShowMobileMenu(false); }} 
                  icon={<BrainCircuit size={20} />} 
                  label="Psychometric Test" 
                />
                <NavButton 
                  active={activeTab === 'sports'} 
                  onClick={() => { setActiveTab('sports'); setShowMobileMenu(false); }} 
                  icon={<Activity size={20} />} 
                  label="Sports Aptitude" 
                />
                <NavButton 
                  active={activeTab === 'creative'} 
                  onClick={() => { setActiveTab('creative'); setShowMobileMenu(false); }} 
                  icon={<Palette size={20} />} 
                  label="Creative Assessment" 
                />
                <NavButton 
                  active={activeTab === 'colleges'} 
                  onClick={() => { setActiveTab('colleges'); setShowMobileMenu(false); }} 
                  icon={<Building size={20} />} 
                  label="Top Colleges" 
                />
                <NavButton 
                  active={activeTab === 'schools'} 
                  onClick={() => { setActiveTab('schools'); setShowMobileMenu(false); }} 
                  icon={<School size={20} />} 
                  label="Schools in India" 
                />
                <NavButton 
                  active={activeTab === 'results'} 
                  onClick={() => { setActiveTab('results'); setShowMobileMenu(false); }} 
                  icon={<Cpu size={20} />} 
                  label="Career Roadmap" 
                />
                <NavButton 
                  active={activeTab === 'schemes'} 
                  onClick={() => { setActiveTab('schemes'); setShowMobileMenu(false); }} 
                  icon={<BookOpen size={20} />} 
                  label="Scholarship & Discovery" 
                />
                <NavButton 
                  active={activeTab === 'professional'} 
                  onClick={() => { setActiveTab('professional'); setShowMobileMenu(false); }} 
                  icon={<UserCheck size={20} />} 
                  label="Professional Insights" 
                />
             </nav>
          </div>
        )}

        <main className="flex-1 overflow-auto relative">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active 
      ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-md' 
      : 'text-slate-300 hover:bg-slate-800'
    }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </button>
);

export default Layout;
