import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Lightbulb, 
  Download, 
  Copy, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Maximize2,
  FileCode,
  Layers,
  Code
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TabType, UserProgress } from '../types';

interface PlaygroundProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

const DEFAULT_CODE = `<!DOCTYPE html>
<html>

<head>
  <title>Website Pertama Saya</title>
</head>

<body>

  <h1>Nama Saya</h1>

  <p>Saya pelajar Kolej Komuniti.</p>

</body>
</html>`;

export const PlaygroundSection: React.FC<PlaygroundProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [previewSrcDoc, setPreviewSrcDoc] = useState<string>(DEFAULT_CODE);
  const [copied, setCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  // Task verification checks
  const task1Done = !code.includes('<h1>Nama Saya</h1>') && /<h1[^>]*>.+<\/h1>/i.test(code);
  const paragraphMatches = code.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  const task2Done = paragraphMatches.length >= 2;
  const task3Done = /<a\s+[^>]*href=["'][^"']+["'][^>]*>[\s\S]*?<\/a>/i.test(code);
  const task4Done = /<img\s+[^>]*src=["'][^"']+["'][^>]*>/i.test(code);

  const completedTasksList: number[] = [];
  if (task1Done) completedTasksList.push(1);
  if (task2Done) completedTasksList.push(2);
  if (task3Done) completedTasksList.push(3);
  if (task4Done) completedTasksList.push(4);

  // Sync tasks to progress
  useEffect(() => {
    if (completedTasksList.length > progress.playgroundTasksCompleted.length) {
      onUpdateProgress({ playgroundTasksCompleted: completedTasksList });
      if (completedTasksList.length === 4) {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      }
    }
  }, [completedTasksList.length]);

  const handleRunCode = () => {
    setPreviewSrcDoc(code);
  };

  const handleResetCode = () => {
    setCode(DEFAULT_CODE);
    setPreviewSrcDoc(DEFAULT_CODE);
    setSelectedTemplate('default');
  };

  const handleApplyTemplate = (type: string) => {
    setSelectedTemplate(type);
    let templateCode = DEFAULT_CODE;
    if (type === 'profile') {
      templateCode = `<!DOCTYPE html>
<html>
<head>
  <title>Profil Pelajar STM</title>
</head>
<body style="font-family: sans-serif; padding: 20px; color: #1e293b;">
  <header style="background: #0284c7; color: white; padding: 15px; border-radius: 8px;">
    <h1>Profil Pelajar TVET</h1>
    <p>Sijil Teknologi Maklumat (STM) - Semester 2</p>
  </header>

  <main style="margin-top: 20px;">
    <h2>Tentang Saya</h2>
    <p>Nama saya Muhammad Farhan, pelajar Kolej Komuniti yang meminati bidang Web Development.</p>
    
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Foto Profil" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover;">
    
    <h3>Kemahiran Saya:</h3>
    <ul>
      <li>HTML5 Semantic Markup</li>
      <li>CSS3 Layouts</li>
      <li>Troubleshooting Komputer</li>
    </ul>

    <p>Layari <a href="https://www.kolejkomuniti.edu.my" target="_blank" style="color: #0284c7;">Portal Rasmi Kolej Komuniti</a></p>
  </main>

  <footer style="margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 10px; font-size: 12px; color: #64748b;">
    <p>&copy; 2026 Muhammad Farhan. Hak Cipta Terpelihara.</p>
  </footer>
</body>
</html>`;
    } else if (type === 'table') {
      templateCode = `<!DOCTYPE html>
<html>
<head>
  <title>Jadual Waktu Kelas STM</title>
</head>
<body style="font-family: sans-serif; padding: 20px;">
  <h1 style="color: #0369a1;">Jadual Kuliah Semester 2</h1>
  <p>Program: Sijil Teknologi Maklumat (STM)</p>

  <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
    <tr style="background: #e0f2fe; color: #0369a1;">
      <th style="padding: 10px;">Hari</th>
      <th style="padding: 10px;">Masa</th>
      <th style="padding: 10px;">Kod & Nama Kursus</th>
      <th style="padding: 10px;">Lokasi</th>
    </tr>
    <tr>
      <td style="padding: 8px;">Isnin</td>
      <td style="padding: 8px;">08:00 - 10:00</td>
      <td style="padding: 8px;">STM21673 Web Development</td>
      <td style="padding: 8px;">Makmal Komputer 1</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Rabu</td>
      <td style="padding: 8px;">10:00 - 12:00</td>
      <td style="padding: 8px;">STM21563 Database System</td>
      <td style="padding: 8px;">Makmal Multimedia</td>
    </tr>
  </table>
</body>
</html>`;
    } else if (type === 'form') {
      templateCode = `<!DOCTYPE html>
<html>
<head>
  <title>Borang Maklum Balas Pelajar</title>
</head>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>Borang Pendaftaran Kelab Komputer</h2>
  
  <form action="daftar.php" method="POST" style="max-width: 400px; display: flex; flex-direction: column; gap: 12px;">
    <div>
      <label>Nama Penuh:</label><br>
      <input type="text" name="nama" style="width: 100%; padding: 6px;" placeholder="Ali Bin Ahmad">
    </div>

    <div>
      <label>Jantina:</label><br>
      <input type="radio" name="jantina" value="L"> Lelaki
      <input type="radio" name="jantina" value="P"> Perempuan
    </div>

    <div>
      <label>Program:</label><br>
      <select name="program" style="width: 100%; padding: 6px;">
        <option>Sijil Teknologi Maklumat (STM)</option>
        <option>Sijil Teknologi Komputer (STK)</option>
      </select>
    </div>

    <div>
      <label>Kata Laluan:</label><br>
      <input type="password" name="katalaluan" style="width: 100%; padding: 6px;">
    </div>

    <button type="submit" style="background: #0284c7; color: white; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
      HANTAR MAKLUMAT
    </button>
  </form>
</body>
</html>`;
    }
    setCode(templateCode);
    setPreviewSrcDoc(templateCode);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Playground Header & Top Controls */}
      <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-4 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-0.5 flex items-center justify-center shadow-md shadow-indigo-600/30">
              <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                BAHAGIAN UTAMA • HANDS-ON LAB
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">HTML Playground</h2>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-run-code"
              onClick={handleRunCode}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>RUN CODE</span>
            </button>

            <button
              onClick={handleResetCode}
              className="px-3 py-2 rounded-xl bg-[#080B14] text-slate-300 hover:text-white border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-[#0D1322] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-2 rounded-xl bg-[#080B14] text-amber-300 hover:bg-[#0D1322] border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>HINT</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="px-3 py-2 rounded-xl bg-[#080B14] text-slate-300 hover:text-white border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-[#0D1322] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Disalin!' : 'Salin'}</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="px-3 py-2 rounded-xl bg-[#080B14] text-indigo-300 hover:bg-[#0D1322] border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Muat turun fail index.html"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Muat Turun .html</span>
            </button>
          </div>
        </div>

        {/* Template Quick Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-950 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span>Pilih Templat Contoh:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleApplyTemplate('default')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] cursor-pointer transition-all ${selectedTemplate === 'default' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'bg-[#080B14] text-slate-300 border border-indigo-950 hover:bg-[#0D1322]'}`}
            >
              Default Asas
            </button>
            <button
              onClick={() => handleApplyTemplate('profile')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] cursor-pointer transition-all ${selectedTemplate === 'profile' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'bg-[#080B14] text-slate-300 border border-indigo-950 hover:bg-[#0D1322]'}`}
            >
              Contoh 1: Profil Pelajar
            </button>
            <button
              onClick={() => handleApplyTemplate('table')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] cursor-pointer transition-all ${selectedTemplate === 'table' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'bg-[#080B14] text-slate-300 border border-indigo-950 hover:bg-[#0D1322]'}`}
            >
              Contoh 2: Jadual Kelas
            </button>
            <button
              onClick={() => handleApplyTemplate('form')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] cursor-pointer transition-all ${selectedTemplate === 'form' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'bg-[#080B14] text-slate-300 border border-indigo-950 hover:bg-[#0D1322]'}`}
            >
              Contoh 3: Borang Pendaftaran
            </button>
          </div>
        </div>

        {/* Hint Accordion */}
        {showHint && (
          <div className="p-4 bg-amber-950/40 border border-amber-800/80 rounded-2xl text-xs text-amber-200 space-y-2 shadow-inner">
            <div className="font-bold flex items-center gap-1.5 text-amber-400">
              <Lightbulb className="w-4 h-4" /> Panduan & Tip Playground:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>TASK 1:</strong> Gantikan teks <code>Nama Saya</code> dalam <code>&lt;h1&gt;</code> dengan nama sebenar anda.</li>
              <li><strong>TASK 2:</strong> Tambah tag <code>&lt;p&gt;Saya mengambil kursus STM semester 2.&lt;/p&gt;</code>.</li>
              <li><strong>TASK 3:</strong> Tambah <code>&lt;a href="https://google.com"&gt;Google&lt;/a&gt;</code>.</li>
              <li><strong>TASK 4:</strong> Tambah <code>&lt;img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150" alt="Komputer"&gt;</code>.</li>
              <li>Selepas selesai membuat perubahan kod, tekan butang <strong>RUN CODE</strong> untuk melihat perubahan pada Live Preview.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Guided Tasks Checklist Banner */}
      <div className="bg-[#0F172A]/90 border border-indigo-950/80 rounded-3xl p-5 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-xs font-mono text-indigo-400 font-bold uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" /> TUGASAN PRAKTIKAL (GUIDED TASKS):
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {completedTasksList.length} / 4 Tugasan Selesai
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          <div className={`p-3 rounded-2xl border flex items-center gap-2 font-medium ${task1Done ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-[#080B14] border-indigo-950 text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${task1Done ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span><strong>TASK 1:</strong> Tukar heading kepada nama anda</span>
          </div>

          <div className={`p-3 rounded-2xl border flex items-center gap-2 font-medium ${task2Done ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-[#080B14] border-indigo-950 text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${task2Done ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span><strong>TASK 2:</strong> Tambah paragraph kursus anda</span>
          </div>

          <div className={`p-3 rounded-2xl border flex items-center gap-2 font-medium ${task3Done ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-[#080B14] border-indigo-950 text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${task3Done ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span><strong>TASK 3:</strong> Tambah hyperlink (&lt;a&gt;)</span>
          </div>

          <div className={`p-3 rounded-2xl border flex items-center gap-2 font-medium ${task4Done ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 shadow-sm' : 'bg-[#080B14] border-indigo-950 text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${task4Done ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span><strong>TASK 4:</strong> Tambah satu image (&lt;img&gt;)</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Code Editor & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left: Code Editor */}
        <div className="bg-[#080B14] rounded-3xl border border-indigo-950 shadow-2xl overflow-hidden flex flex-col">
          {/* Editor Topbar */}
          <div className="bg-[#0D1322] px-4 py-3 border-b border-indigo-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-slate-200 font-medium">index.html (HTML CODE)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">UTF-8 • HTML5</span>
          </div>

          {/* Textarea Code Editor */}
          <div className="flex-1 relative bg-[#080B14]">
            <textarea
              id="playground-code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-[450px] p-5 bg-transparent font-mono text-xs sm:text-sm text-indigo-300 leading-relaxed focus:outline-none resize-none selection:bg-purple-900/60 selection:text-white"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              placeholder="Tulis kod HTML di sini..."
            />
          </div>
        </div>

        {/* Right: Live Preview Iframe */}
        <div className="bg-[#080B14] rounded-3xl border border-indigo-950 shadow-2xl overflow-hidden flex flex-col">
          {/* Browser Window Header */}
          <div className="bg-[#0D1322] px-4 py-3 border-b border-indigo-950 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>

            <div className="bg-[#080B14] px-3.5 py-1 rounded-lg text-[11px] text-slate-400 font-mono flex items-center gap-1.5 border border-indigo-950 w-3/5 justify-center">
              <span>🔒</span>
              <span className="truncate">http://localhost:3000/preview</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono font-medium">
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </div>
          </div>

          {/* Rendered Iframe Window */}
          <div className="flex-1 bg-white min-h-[450px]">
            <iframe
              id="playground-live-iframe"
              title="HTML Live Preview"
              srcDoc={previewSrcDoc}
              className="w-full h-full min-h-[450px] border-none bg-white"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
