import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { HtmlBasicsSection } from './components/HtmlBasicsSection';
import { HtmlElementsSection } from './components/HtmlElementsSection';
import { HtmlFormsSection } from './components/HtmlFormsSection';
import { GetVsPostSection } from './components/GetVsPostSection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { PredictOutputSection } from './components/PredictOutputSection';
import { DebugLabSection } from './components/DebugLabSection';
import { QuizSection } from './components/QuizSection';
import { ChallengeSection } from './components/ChallengeSection';
import { ClassActivitySection } from './components/ClassActivitySection';
import { TabType, UserProgress } from './types';
import { loadProgress, saveProgress, resetProgress } from './utils/storage';
import { BookOpen, GraduationCap, RotateCcw, ShieldCheck, Heart } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // Sync progress updates to local storage
  const handleUpdateProgress = (updates: Partial<UserProgress>) => {
    setProgress((prev) => {
      const updated = { ...prev, ...updates };
      saveProgress(updated);
      return updated;
    });
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Adakah anda pasti untuk menetapkan semula (reset) semua kemajuan pembelajaran?')) {
      const clean = resetProgress();
      setProgress(clean);
    }
  };

  // Scroll to top upon tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomeSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'basics' && (
          <HtmlBasicsSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'elements' && (
          <HtmlElementsSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'forms' && (
          <HtmlFormsSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'get-post' && (
          <GetVsPostSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'playground' && (
          <PlaygroundSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'predict' && (
          <PredictOutputSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'debug' && (
          <DebugLabSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'challenge' && (
          <ChallengeSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'group-work' && (
          <ClassActivitySection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono">
              &lt;/&gt;
            </div>
            <span>
              <strong>STM21673 Web Development</strong> • Sijil Teknologi Maklumat (STM) Semester 2 • Kolej Komuniti Malaysia
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetAllProgress}
              className="text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
              title="Reset data kemajuan tempatan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Kemajuan</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              Dibina untuk TVET Malaysia dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
