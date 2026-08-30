import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Eye, 
  ArrowRight, 
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PREDICT_QUESTIONS } from '../data/elementsData';
import { TabType, UserProgress } from '../types';

interface PredictOutputProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

export const PredictOutputSection: React.FC<PredictOutputProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQ = PREDICT_QUESTIONS[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQ.correctId;
    if (isCorrect) {
      setScore(score + 1);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }

    if (!progress.predictCompleted.includes(currentQ.id)) {
      onUpdateProgress({
        predictCompleted: [...progress.predictCompleted, currentQ.id]
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < PREDICT_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-4 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              SEKSYEN 17 • PREDICT THE OUTPUT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ramal Output Kod HTML</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Uji daya visualisasi anda dengan meramalkan hasil paparan browser sebelum ia dijalankan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-[#080B14] px-3.5 py-1.5 rounded-xl border border-indigo-950 text-slate-300 shadow-sm">
              Soalan <strong className="text-indigo-400">{currentIndex + 1}</strong> daripada <strong>{PREDICT_QUESTIONS.length}</strong>
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#080B14] rounded-2xl border border-indigo-950 p-5 sm:p-6 space-y-6 shadow-inner">
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {currentIndex + 1}. {currentQ.question}
          </h3>

          {/* Code Snippet Box */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">KOD HTML YANG DIBERIKAN:</span>
            <pre className="p-4 bg-[#0D1322] rounded-xl text-xs sm:text-sm font-mono text-indigo-300 border border-indigo-950 overflow-x-auto leading-relaxed">
              {currentQ.code}
            </pre>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
              PILIH JAWAPAN ANDA:
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = opt.id === currentQ.correctId;

                let btnStyle = 'bg-[#0D1322] border-indigo-950 text-slate-200 hover:bg-[#111A2E] hover:border-indigo-500/40';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-md';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-red-950/80 border-red-500 text-red-200 shadow-md';
                  } else {
                    btnStyle = 'bg-[#0D1322]/40 border-indigo-950/50 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswered}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#080B14] border border-indigo-900 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 text-indigo-300">
                      {opt.id}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                    {isAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />}
                    {isAnswered && isSelected && !isCorrect && <X className="w-4 h-4 text-red-400 shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div className="p-4 bg-[#0D1322] rounded-xl border border-indigo-950 space-y-2 shadow-inner">
              <div className="flex items-center gap-2">
                {selectedOption === currentQ.correctId ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> TEPAT SEKALI!
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                    <X className="w-4 h-4" /> KURANG TEPAT
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-indigo-950">
            <span className="text-xs text-slate-400 font-mono">
              Skor Semasa: <strong className="text-emerald-400">{score}</strong> / {PREDICT_QUESTIONS.length}
            </span>

            {isAnswered && (
              currentIndex < PREDICT_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer hover:scale-105"
                >
                  <span>Soalan Seterusnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleRestart}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer hover:scale-105"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulang Semula Aktiviti</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
