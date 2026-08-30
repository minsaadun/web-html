import React, { useState } from 'react';
import { 
  Code2, 
  Home, 
  BookOpen, 
  Layers, 
  FormInput, 
  ArrowLeftRight, 
  Terminal, 
  Bug, 
  CheckCircle2, 
  Award, 
  Users, 
  AlertTriangle, 
  BarChart3,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { TabType, UserProgress } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  progress: UserProgress;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, progress }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'basics', label: 'HTML Basics', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'elements', label: 'HTML Elements', icon: <Layers className="w-4 h-4" /> },
    { id: 'forms', label: 'HTML Form', icon: <FormInput className="w-4 h-4" /> },
    { id: 'get-post', label: 'GET vs POST', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { id: 'playground', label: 'Playground', icon: <Terminal className="w-4 h-4" />, badge: 'Utama' },
    { id: 'predict', label: 'Predict Output', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'debug', label: 'Debug Lab', icon: <Bug className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'challenge', label: 'Mini Challenge', icon: <Award className="w-4 h-4" /> },
    { id: 'group-activity', label: 'Class Activity', icon: <Users className="w-4 h-4" /> },
    { id: 'mistakes-tips', label: 'Tips & Mistakes', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  // Calculate overall percentage
  const totalTasks = 8;
  let completed = 0;
  if (progress.basicsCompleted) completed++;
  if (progress.structurePuzzleSolved) completed++;
  if (progress.elementsExplored.length >= 5) completed++;
  if (progress.formBuilderCompleted) completed++;
  if (progress.getPostSimulated) completed++;
  if (progress.debugChallengesSolved.length >= 3) completed++;
  if (progress.quizScore !== null) completed++;
  if (progress.challengeCompleted) completed++;
  const percentage = Math.round((completed / totalTasks) * 100);

  return (
    <header className="sticky top-0 z-50 bg-[#0D1322]/95 backdrop-blur-md border-b border-indigo-900/40 shadow-lg shadow-indigo-950/40">
      {/* Top Banner Progress Indicator */}
      <div className="bg-[#080B14]/90 border-b border-indigo-950/80 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
          <div className="flex items-center gap-2 font-medium text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></span>
            <span className="text-emerald-400 font-semibold tracking-wide">STM21673</span>
            <span className="text-indigo-800">•</span>
            <span className="text-slate-300">Kolej Komuniti Malaysia</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className={`flex items-center gap-1 transition-colors ${progress.basicsCompleted ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
              HTML Basics {progress.basicsCompleted ? '✓' : '○'}
            </span>
            <span className="text-slate-700">|</span>
            <span className={`flex items-center gap-1 transition-colors ${progress.elementsExplored.length >= 5 ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
              Elements {progress.elementsExplored.length >= 5 ? '✓' : `(${progress.elementsExplored.length}/11)`}
            </span>
            <span className="text-slate-700">|</span>
            <span className={`flex items-center gap-1 transition-colors ${progress.formBuilderCompleted ? 'text-amber-400 font-semibold' : 'text-slate-500'}`}>
              Forms {progress.formBuilderCompleted ? '✓' : '●'}
            </span>
            <span className="text-slate-700">|</span>
            <span className={`flex items-center gap-1 transition-colors ${progress.quizScore !== null ? 'text-purple-400 font-semibold' : 'text-slate-500'}`}>
              Quiz {progress.quizScore !== null ? `${progress.quizScore}/10` : '○'}
            </span>
            <span className="text-slate-700">|</span>
            <span className={`flex items-center gap-1 transition-colors ${progress.challengeCompleted ? 'text-rose-400 font-semibold' : 'text-slate-500'}`}>
              Challenge {progress.challengeCompleted ? '✓' : '○'}
            </span>

            <div className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-indigo-900/60">
              <div className="w-20 bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 ring-1 ring-indigo-500/20">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="font-mono text-emerald-400 font-bold">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-brand"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
                HTML LAB
              </span>
              <span className="text-[10px] uppercase tracking-widest bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-1.5 py-0.5 rounded-md font-mono shadow-sm">
                TVET
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Learn • Code • See the Result</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all relative whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 border border-indigo-500/50 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-indigo-950/40 hover:border-indigo-800/40 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono shadow-sm">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-indigo-950/60 text-slate-300 hover:text-white border border-indigo-800/60"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1322] border-b border-indigo-900/60 px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-indigo-950/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
