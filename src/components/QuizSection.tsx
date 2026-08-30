import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Check, 
  X,
  Trophy,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/elementsData';
import { TabType, UserProgress } from '../types';

interface QuizProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

export const QuizSection: React.FC<QuizProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = optionIdx;
    setUserAnswers(updatedAnswers);

    if (optionIdx === currentQ.correctIndex) {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finish quiz
      let totalCorrect = 0;
      userAnswers.forEach((ans, idx) => {
        if (ans === QUIZ_QUESTIONS[idx].correctIndex) totalCorrect++;
      });
      setQuizFinished(true);
      onUpdateProgress({ quizScore: totalCorrect });

      if (totalCorrect >= 8) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  // Calculate final score
  const finalScore = userAnswers.reduce((acc, ans, idx) => {
    return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((finalScore / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-4 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              SEKSYEN 19 • QUICK QUIZ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Kuiz Penilaian Asas HTML</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              10 soalan interaktif merangkumi struktur, elemen, form dan GET/POST.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-[#080B14] px-3.5 py-1.5 rounded-xl border border-indigo-950 text-slate-300 shadow-sm">
              {quizFinished ? 'Kuiz Selesai' : `Soalan ${currentIndex + 1} / ${QUIZ_QUESTIONS.length}`}
            </span>
          </div>
        </div>

        {/* Progress bar across 10 questions */}
        <div className="w-full bg-[#080B14] h-2.5 rounded-full overflow-hidden border border-indigo-950">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-300 shadow-sm shadow-indigo-500/50"
            style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* QUIZ IN PROGRESS */}
      {!quizFinished ? (
        <div className="bg-[#080B14] rounded-3xl border border-indigo-950 p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Question Category Badge & Text */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 px-3 py-1 rounded-lg border border-indigo-800 font-bold">
                SOALAN {currentIndex + 1} • {currentQ.type.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let style = 'bg-[#0D1322] border-indigo-950 text-slate-200 hover:bg-[#111A2E] hover:border-indigo-500/40';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-md';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-red-950/80 border-red-500 text-red-200 shadow-md';
                } else {
                  style = 'bg-[#0D1322]/40 border-indigo-950/50 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${style}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-[#080B14] border border-indigo-900 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 text-indigo-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                  {isAnswered && isCorrect && <Check className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <X className="w-5 h-5 text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Feedback */}
          {isAnswered && (
            <div className="p-4 bg-[#0D1322] rounded-2xl border border-indigo-950 space-y-2 shadow-inner">
              <div className="flex items-center gap-2">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> JAWAPAN TEPAT!
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

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                id="btn-quiz-next"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all hover:scale-105"
              >
                <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Soalan Seterusnya' : 'Lihat Keputusan Kuiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* QUIZ SCORE RESULT CARD */
        <div className="bg-[#080B14] rounded-3xl border border-indigo-950 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">
              KEPUTUSAN KUIZ ANDA
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
              {finalScore} <span className="text-slate-500 text-2xl">/ {QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="text-sm font-semibold text-emerald-400">
              Gred Pencapaian: {percentage}%
            </div>
          </div>

          {/* Feedback Message based on score criteria */}
          <div className="max-w-md mx-auto p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed">
            {finalScore >= 8 ? (
              <div className="bg-emerald-950/60 border-emerald-500 text-emerald-200 p-3.5 rounded-xl shadow-inner">
                🎉 <strong>Hebat!</strong> Anda sudah bersedia untuk menyelesaikan HTML Mini Challenge.
              </div>
            ) : finalScore >= 5 ? (
              <div className="bg-amber-950/60 border-amber-500 text-amber-200 p-3.5 rounded-xl shadow-inner">
                👍 <strong>Baik.</strong> Cuba ulang kaji bahagian elemen dan form yang masih kurang jelas.
              </div>
            ) : (
              <div className="bg-red-950/60 border-red-500 text-red-200 p-3.5 rounded-xl shadow-inner">
                📖 <strong>Jom ulang HTML Basics dahulu</strong> untuk mengukuhkan asas pemahaman anda.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-[#0D1322] hover:bg-[#111A2E] text-white font-semibold text-xs flex items-center gap-2 border border-indigo-950 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>TRY AGAIN (Ulang Kuiz)</span>
            </button>

            <button
              onClick={() => setActiveTab('challenge')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Teruskan ke Mini Challenge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
