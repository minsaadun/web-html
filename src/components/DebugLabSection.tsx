import React, { useState } from 'react';
import { 
  Bug, 
  CheckCircle2, 
  Lightbulb, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  Check, 
  X,
  Code,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEBUG_CHALLENGES } from '../data/elementsData';
import { TabType, UserProgress } from '../types';

interface DebugLabProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

export const DebugLabSection: React.FC<DebugLabProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);
  const currentChallenge = DEBUG_CHALLENGES[activeChallengeIndex];

  // Editable code state for each challenge
  const [userCode, setUserCode] = useState<string>(currentChallenge.initialCode);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'success' | 'fail'; message: string }>({
    status: 'idle',
    message: ''
  });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Switch challenge
  const handleSelectChallenge = (index: number) => {
    setActiveChallengeIndex(index);
    setUserCode(DEBUG_CHALLENGES[index].initialCode);
    setTestResult({ status: 'idle', message: '' });
    setShowHint(false);
    setShowSolution(false);
  };

  const handleCheckCode = () => {
    const isSuccess = currentChallenge.targetCriteria(userCode);
    if (isSuccess) {
      setTestResult({
        status: 'success',
        message: '✓ Tahniah! Ralat berjaya dibaiki dengan sempurna!'
      });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });

      if (!progress.debugChallengesSolved.includes(currentChallenge.id)) {
        onUpdateProgress({
          debugChallengesSolved: [...progress.debugChallengesSolved, currentChallenge.id]
        });
      }
    } else {
      setTestResult({
        status: 'fail',
        message: 'Kod masih mempunyai ralat. Sila semak semula sintaks dan pembayang yang diberikan.'
      });
    }
  };

  const handleReset = () => {
    setUserCode(currentChallenge.initialCode);
    setTestResult({ status: 'idle', message: '' });
    setShowHint(false);
    setShowSolution(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-4 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
              SEKSYEN 18 • DEBUG LAB
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Bengkel Baiki Ralat (Debug Lab)</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Sebagai bakal pembangun web TVET, kemahiran mengesan dan membaiki ralat kod adalah sangat kritikal.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#080B14] px-3.5 py-1.5 rounded-xl border border-indigo-950 text-xs font-mono shadow-sm">
            <span className="text-slate-400">Selesai:</span>
            <span className="text-emerald-400 font-bold">
              {progress.debugChallengesSolved.length} / {DEBUG_CHALLENGES.length} Cabaran
            </span>
          </div>
        </div>

        {/* Challenge Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {DEBUG_CHALLENGES.map((ch, idx) => {
            const isSolved = progress.debugChallengesSolved.includes(ch.id);
            const isActive = activeChallengeIndex === idx;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChallenge(idx)}
                className={`p-3.5 rounded-2xl border text-left text-xs font-mono transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-br from-rose-950/90 to-purple-950/90 border-rose-500 text-white ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/40'
                    : isSolved
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300 hover:border-emerald-700'
                    : 'bg-[#080B14] border-indigo-950 text-slate-400 hover:bg-[#0D1322] hover:border-indigo-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold">Cabaran {ch.id}</span>
                  {isSolved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bug className="w-3.5 h-3.5 opacity-60" />}
                </div>
                <span className="text-[10px] font-sans opacity-80 truncate">{ch.errorType}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Challenge Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Code Editor & Controls */}
        <div className="lg:col-span-7 bg-[#080B14] rounded-3xl border border-indigo-950 p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold bg-rose-950/80 px-2.5 py-0.5 rounded-lg border border-rose-800">
                JENIS RALAT: {currentChallenge.errorType}
              </span>
              <h3 className="text-lg font-bold text-white mt-1.5">{currentChallenge.title}</h3>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-indigo-300 font-medium block">
              Cari dan baiki ralat dalam kod di bawah:
            </label>
            <textarea
              id="debug-user-code-textarea"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              rows={6}
              className="w-full p-4 bg-[#0D1322] border border-indigo-950 rounded-2xl text-xs sm:text-sm font-mono text-indigo-300 focus:outline-none focus:border-rose-500 selection:bg-purple-900/60 transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              id="btn-check-debug"
              onClick={handleCheckCode}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-rose-600/30 transition-all hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SEMAK & UJI KOD</span>
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3.5 py-2.5 rounded-xl bg-[#0D1322] text-amber-300 hover:bg-[#111A2E] border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Tutup Hint' : 'HINT'}</span>
            </button>

            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-3.5 py-2.5 rounded-xl bg-[#0D1322] text-slate-300 hover:text-white border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showSolution ? 'Tutup Jawapan' : 'SHOW SOLUTION'}</span>
            </button>
          </div>

          {/* Hint Card */}
          {showHint && (
            <div className="p-3.5 bg-amber-950/40 border border-amber-800/80 rounded-2xl text-xs text-amber-200 flex items-start gap-2 shadow-inner">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Hint:</strong> {currentChallenge.hint}
              </div>
            </div>
          )}

          {/* Solution Card */}
          {showSolution && (
            <div className="p-4 bg-[#0D1322] rounded-2xl border border-indigo-900/80 space-y-2 text-xs shadow-inner">
              <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Contoh Jawapan Tepat:
              </div>
              <pre className="p-3 bg-[#080B14] rounded-xl font-mono text-emerald-300 overflow-x-auto border border-indigo-950">
                {currentChallenge.solution}
              </pre>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentChallenge.explanation}
              </p>
            </div>
          )}

          {/* Test Result Message */}
          {testResult.status !== 'idle' && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 shadow-md ${
                testResult.status === 'success'
                  ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200'
                  : 'bg-red-950/80 border border-red-500 text-red-200'
              }`}
            >
              {testResult.status === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <X className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span className="font-medium">{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Right: Live Preview & Explanations */}
        <div className="lg:col-span-5 bg-[#080B14] rounded-3xl border border-indigo-950 p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-2">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-indigo-400" /> LIVE BROWSER PREVIEW:
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 text-slate-900 min-h-[160px] shadow-inner">
            <div dangerouslySetInnerHTML={{ __html: userCode }} />
          </div>

          <div className="p-4 bg-[#0D1322] rounded-2xl border border-indigo-950 space-y-2 text-xs text-slate-300 shadow-inner">
            <strong className="text-indigo-400 font-bold block">Penerangan Ralat:</strong>
            <p className="leading-relaxed">{currentChallenge.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
