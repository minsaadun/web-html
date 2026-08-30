import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Play, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  RotateCcw, 
  Trophy, 
  Share2,
  FileCheck,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TabType, UserProgress } from '../types';

interface ChallengeProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

const STARTER_CHALLENGE_CODE = `<!DOCTYPE html>
<html>
<head>
  <title>Profil Pelajar TVET</title>
</head>
<body style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #1e293b;">

  <!-- 1. Heading Nama -->
  <h1>Muhammad Farhan Bin Roslan</h1>

  <!-- 2. Perenggan Biodata Ringkas -->
  <p>Saya pelajar Semester 2 Program Sijil Teknologi Maklumat (STM) di Kolej Komuniti. Saya meminati bidang pembangunan web dan reka bentuk antaramuka.</p>

  <!-- 3. Gambar Profil -->
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" alt="Foto Profil Farhan" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">

  <!-- 4. Senarai Kemahiran atau Hobi -->
  <h3>Kemahiran Teknikal:</h3>
  <ul>
    <li>HTML5 Semantics & Forms</li>
    <li>Asas CSS & Styling</li>
    <li>Konfigurasi Rangkaian Asas</li>
  </ul>

  <!-- 5. Hyperlink Luar -->
  <p>Layari portal rasmi: <a href="https://www.kolejkomuniti.edu.my" target="_blank">Portal Kolej Komuniti</a></p>

  <!-- 6. Jadual Maklumat / Subjek -->
  <h3>Maklumat Akademik:</h3>
  <table border="1" style="border-collapse: collapse; width: 100%; max-width: 500px;">
    <tr style="background: #f1f5f9;">
      <th style="padding: 8px; text-align: left;">Kursus</th>
      <th style="padding: 8px; text-align: left;">Kod Kursus</th>
    </tr>
    <tr>
      <td style="padding: 8px;">Web Development</td>
      <td style="padding: 8px;">STM21673</td>
    </tr>
  </table>

  <!-- 7. Borang Ringkas Mesej -->
  <h3>Tinggalkan Mesej:</h3>
  <form action="mesej.php" method="POST">
    <label for="pengirim">Nama Anda:</label><br>
    <input type="text" id="pengirim" name="pengirim" placeholder="Nama anda..."><br><br>
    <label for="mesej">Mesej:</label><br>
    <textarea id="mesej" name="mesej" rows="2" placeholder="Tulis mesej..."></textarea><br><br>
    <button type="submit" style="background: #0284c7; color: white; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer;">Hantar Mesej</button>
  </form>

</body>
</html>`;

export const ChallengeSection: React.FC<ChallengeProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [code, setCode] = useState<string>(STARTER_CHALLENGE_CODE);
  const [previewSrcDoc, setPreviewSrcDoc] = useState<string>(STARTER_CHALLENGE_CODE);
  const [copied, setCopied] = useState(false);
  const [studentName, setStudentName] = useState('Pelajar TVET');

  // Real-time evaluation of all 7 criteria
  const hasHeading = /<h[1-3][^>]*>[\s\S]*?<\/h[1-3]>/i.test(code);
  const hasParagraph = /<p[^>]*>[\s\S]*?<\/p>/i.test(code);
  const hasImage = /<img\s+[^>]*src=["'][^"']+["'][^>]*>/i.test(code);
  const hasList = /(<ul[^>]*>[\s\S]*?<\/ul>|<ol[^>]*>[\s\S]*?<\/ol>)/i.test(code) && /<li[^>]*>/i.test(code);
  const hasLink = /<a\s+[^>]*href=["'][^"']+["'][^>]*>[\s\S]*?<\/a>/i.test(code);
  const hasTable = /<table[^>]*>[\s\S]*?<tr[^>]*>[\s\S]*?<t[dh][^>]*>[\s\S]*?<\/table>/i.test(code);
  const hasForm = /<form[^>]*>[\s\S]*?<input|<textarea|<button/i.test(code);

  const criteria = [
    { id: 1, label: 'Heading Nama (<h1/h2>)', met: hasHeading },
    { id: 2, label: 'Perenggan Biodata Ringkas (<p>)', met: hasParagraph },
    { id: 3, label: 'Gambar Profil Avatar (<img>)', met: hasImage },
    { id: 4, label: 'Senarai Kemahiran/Hobi (<ul>/<ol>)', met: hasList },
    { id: 5, label: 'Hyperlink Luar (<a>)', met: hasLink },
    { id: 6, label: 'Jadual Maklumat (<table>)', met: hasTable },
    { id: 7, label: 'Borang Ringkas Mesej (<form>)', met: hasForm },
  ];

  const totalMet = criteria.filter(c => c.met).length;
  const isCompleted = totalMet === 7;

  useEffect(() => {
    if (isCompleted && !progress.challengeCompleted) {
      onUpdateProgress({ challengeCompleted: true });
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  }, [isCompleted]);

  const handleRunCode = () => {
    setPreviewSrcDoc(code);
  };

  const handleResetCode = () => {
    setCode(STARTER_CHALLENGE_CODE);
    setPreviewSrcDoc(STARTER_CHALLENGE_CODE);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profil_pelajar_stm.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-4 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                SEKSYEN 20 • MINI CHALLENGE CAPSTONE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Bina Halaman Profil Pelajar Sendiri</h2>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRunCode}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>RUN PREVIEW</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="px-3.5 py-2.5 rounded-xl bg-[#080B14] text-slate-300 hover:text-white border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-[#0D1322] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Disalin' : 'Salin Kod'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2.5 rounded-xl bg-[#080B14] text-indigo-300 hover:bg-[#0D1322] border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Muat Turun .html</span>
            </button>
          </div>
        </div>

        {/* 7 Requirements Checklist */}
        <div className="bg-[#080B14] rounded-2xl p-4 border border-indigo-950 space-y-2.5 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
              7 KEPERLUAN WAJIB HALAMAN PROFIL:
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {totalMet} / 7 Keperluan Dipenuhi
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            {criteria.map((c) => (
              <div
                key={c.id}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  c.met
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-sm'
                    : 'bg-[#0D1322] border-indigo-950/60 text-slate-500'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${c.met ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span className="truncate">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-6 bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-[#080B14] border-2 border-indigo-500/80 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" /> TAHNIAH! CLO1 (P3) TERCAPAI
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Mini Challenge Berjaya Disempurnakan!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Anda telah menguasai sintaks, struktur, jadual, borang dan pautan asas HTML mengikut silibus STM21673.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('group-work')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 cursor-pointer transition-all hover:scale-105"
            >
              Teruskan ke Group Work 👥
            </button>
          </div>
        </div>
      )}

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Code Editor */}
        <div className="bg-[#080B14] rounded-3xl border border-indigo-950 shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#0D1322] px-4 py-3 border-b border-indigo-950 flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-300 font-medium">profil_pelajar.html</span>
            <span className="text-[11px] font-mono text-slate-500">Edit kod mengikut maklumat sebenar anda</span>
          </div>

          <div className="flex-1 bg-[#080B14]">
            <textarea
              id="challenge-code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-[480px] p-5 bg-transparent font-mono text-xs sm:text-sm text-indigo-300 leading-relaxed focus:outline-none resize-none selection:bg-purple-900/60"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-[#080B14] rounded-3xl border border-indigo-950 shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#0D1322] px-4 py-3 border-b border-indigo-950 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium">Live Profile Preview</span>
          </div>

          <div className="flex-1 bg-white min-h-[480px]">
            <iframe
              id="challenge-preview-iframe"
              title="Challenge Preview"
              srcDoc={previewSrcDoc}
              className="w-full h-full min-h-[480px] border-none bg-white"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
