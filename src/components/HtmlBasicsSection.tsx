import React, { useState } from 'react';
import { 
  Building2, 
  Palette, 
  Zap, 
  HelpCircle, 
  CheckCircle, 
  RefreshCw, 
  Lightbulb, 
  Play, 
  MousePointerClick,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TabType, UserProgress } from '../types';

interface HtmlBasicsProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

export const HtmlBasicsSection: React.FC<HtmlBasicsProps> = ({ 
  progress, 
  onUpdateProgress,
  setActiveTab 
}) => {
  // Analogy Tab State
  const [analogyMode, setAnalogyMode] = useState<'html' | 'css' | 'js'>('html');
  const [doorOpen, setDoorOpen] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);

  // Quick Try Editor
  const [quickCode, setQuickCode] = useState('<h1>Kolej Komuniti</h1>\n<p>Peneraju Pendidikan TVET Malaysia.</p>');
  const [quickEditorOpen, setQuickEditorOpen] = useState(false);

  // Clickable Skeleton Info
  const [selectedTag, setSelectedTag] = useState<string>('doctype');

  // Drag & Drop / Structure Puzzle State
  const initialBlocks = [
    { id: 'b1', text: '<body>' },
    { id: 'b2', text: '<head>' },
    { id: 'b3', text: '<!DOCTYPE html>' },
    { id: 'b4', text: '<html>' },
    { id: 'b5', text: '</html>' },
    { id: 'b6', text: '</body>' },
    { id: 'b7', text: '</head>' },
  ];

  const [availableBlocks, setAvailableBlocks] = useState(initialBlocks);
  const [placedBlocks, setPlacedBlocks] = useState<{ id: string; text: string }[]>([]);
  const [puzzleResult, setPuzzleResult] = useState<{ status: 'idle' | 'correct' | 'wrong'; message: string }>({
    status: 'idle',
    message: ''
  });
  const [showPuzzleHint, setShowPuzzleHint] = useState(false);

  // Clickable code annotations
  const skeletonExplanations: Record<string, { title: string; desc: string; role: string }> = {
    doctype: {
      title: '<!DOCTYPE html>',
      desc: 'Memberitahu browser bahawa dokumen ini menggunakan standard HTML5 terkini.',
      role: 'Wajib ditulis pada baris pertama sekali dalam dokumen HTML.'
    },
    html: {
      title: '<html> ... </html>',
      desc: 'Bahagian utama (root element) bagi keseluruhan dokumen HTML. Semua kod lain mesti berada di dalamnya.',
      role: 'Membungkus bahagian <head> dan <body>.'
    },
    head: {
      title: '<head> ... </head>',
      desc: 'Mengandungi maklumat meta mengenai halaman web yang TIDAK dipaparkan terus dalam kawasan visual browser.',
      role: 'Menyimpan <title>, pautan fail CSS, dan tetapan meta.'
    },
    title: {
      title: '<title>Website Saya</title>',
      desc: 'Tajuk yang muncul pada browser tab (tab pelayar) dan nama pautan penanda buku (bookmark).',
      role: 'Penting untuk identiti laman dan Search Engine Optimization (SEO).'
    },
    body: {
      title: '<body> ... </body>',
      desc: 'Kandungan yang dilihat oleh pengguna seperti tajuk, teks, imej, butang, video, dan jadual.',
      role: 'Semua komponen visual web diletakkan di sini.'
    },
    h1: {
      title: '<h1>Selamat Datang</h1>',
      desc: 'Elemen tajuk utama (Heading 1) yang mempunyai saiz fon paling besar dan tebal secara lalai.',
      role: 'Digunakan sebagai tajuk tajuk paling penting di laman web.'
    },
    p: {
      title: '<p>Ini website pertama saya.</p>',
      desc: 'Elemen perenggan (Paragraph) untuk memaparkan blok teks biasa dengan jarak margin automatik.',
      role: 'Digunakan untuk teks penerangan atau artikel.'
    }
  };

  // Add block to puzzle
  const handleAddBlock = (block: { id: string; text: string }) => {
    setPlacedBlocks([...placedBlocks, block]);
    setAvailableBlocks(availableBlocks.filter(b => b.id !== block.id));
    setPuzzleResult({ status: 'idle', message: '' });
  };

  // Remove block from puzzle
  const handleRemoveBlock = (index: number) => {
    const removed = placedBlocks[index];
    const newPlaced = [...placedBlocks];
    newPlaced.splice(index, 1);
    setPlacedBlocks(newPlaced);
    setAvailableBlocks([...availableBlocks, removed]);
    setPuzzleResult({ status: 'idle', message: '' });
  };

  // Check puzzle answer
  const handleCheckPuzzle = () => {
    const sequence = placedBlocks.map(b => b.text).join(' ');
    // Correct sequence: <!DOCTYPE html> <html> <head> </head> <body> </body> </html>
    const target = '<!DOCTYPE html> <html> <head> </head> <body> </body> </html>';
    
    if (sequence === target) {
      setPuzzleResult({
        status: 'correct',
        message: '✓ Tahniah! Struktur HTML anda 100% tepat dan mengikut standard HTML5!'
      });
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
      onUpdateProgress({ structurePuzzleSolved: true, basicsCompleted: true });
    } else {
      setPuzzleResult({
        status: 'wrong',
        message: 'Belum tepat. Cuba perhatikan susunan tag pembukaan (<head>, <body>) dan penutup (</head>, </body>, </html>).'
      });
    }
  };

  // Reset puzzle
  const handleResetPuzzle = () => {
    setAvailableBlocks(initialBlocks);
    setPlacedBlocks([]);
    setPuzzleResult({ status: 'idle', message: '' });
    setShowPuzzleHint(false);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Apa itu HTML & Analogi */}
      <section className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">SEKSYEN 2.0</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Apa Itu HTML?</h2>
          </div>
          <span className="text-xs bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800/60 font-medium">
            Konsep Asas TVET
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-indigo-950/40 border border-indigo-800/60 rounded-2xl p-4">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                <span className="text-indigo-400 font-bold">HTML</span> bermaksud <span className="text-white font-bold">HyperText Markup Language</span>.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                HTML digunakan untuk <strong>menentukan struktur</strong> dan <strong>kandungan</strong> sesuatu halaman web melalui penggunaan tag berpasangan.
              </p>
            </div>

            {/* Analogi Rumah */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-400" /> Analogi Rumah (Web Development Trio):
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAnalogyMode('html')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    analogyMode === 'html'
                      ? 'bg-amber-950/60 border-amber-500 text-amber-300 ring-2 ring-amber-500/30 shadow-md shadow-amber-950/50'
                      : 'bg-[#080B14] border-indigo-950 text-slate-400 hover:bg-[#0D1322]'
                  }`}
                >
                  <div className="font-bold text-xs">HTML</div>
                  <div className="text-[10px] mt-0.5 opacity-80">Rangka Rumah</div>
                </button>

                <button
                  onClick={() => setAnalogyMode('css')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    analogyMode === 'css'
                      ? 'bg-blue-950/60 border-blue-500 text-blue-300 ring-2 ring-blue-500/30 shadow-md shadow-blue-950/50'
                      : 'bg-[#080B14] border-indigo-950 text-slate-400 hover:bg-[#0D1322]'
                  }`}
                >
                  <div className="font-bold text-xs">CSS</div>
                  <div className="text-[10px] mt-0.5 opacity-80">Warna & Hiasan</div>
                </button>

                <button
                  onClick={() => setAnalogyMode('js')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    analogyMode === 'js'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-950/50'
                      : 'bg-[#080B14] border-indigo-950 text-slate-400 hover:bg-[#0D1322]'
                  }`}
                >
                  <div className="font-bold text-xs">JavaScript</div>
                  <div className="text-[10px] mt-0.5 opacity-80">Fungsi & Pergerakan</div>
                </button>
              </div>

              <div className="p-3.5 bg-[#080B14] rounded-2xl border border-indigo-950 text-xs text-slate-300 leading-relaxed">
                {analogyMode === 'html' && (
                  <p>
                    <strong className="text-amber-400">HTML (Rangka):</strong> Menentukan binaan asas seperti tiang, dinding, ruang bilik, dan lubang tingkap tanpa sebarang cat atau warna.
                  </p>
                )}
                {analogyMode === 'css' && (
                  <p>
                    <strong className="text-blue-400">CSS (Dekorasi):</strong> Menentukan warna cat dinding, jenis jubin lantai, langsir, fon tulisan dan susun atur yang cantik dipandang.
                  </p>
                )}
                {analogyMode === 'js' && (
                  <p>
                    <strong className="text-emerald-400">JavaScript (Fungsi):</strong> Membolehkan lampu menyala bila suis ditekan, loceng pintu berbunyi, dan pintu pagar terbuka secara automatik.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Interactive House Visualizer */}
          <div className="lg:col-span-6">
            <div className="bg-[#080B14] rounded-2xl border border-indigo-950 p-5 flex flex-col items-center justify-center relative min-h-[260px] shadow-inner">
              <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between w-full">
                <span>SIMULASI VISUAL:</span>
                <span className="font-bold uppercase text-indigo-400">
                  {analogyMode === 'html' ? 'Hanya HTML (Rangka Kasar)' : analogyMode === 'css' ? 'HTML + CSS (Berwarna)' : 'HTML + CSS + JavaScript (Interaktif)'}
                </span>
              </div>

              {/* Graphic House Canvas */}
              <div className="w-full max-w-[280px] flex flex-col items-center">
                {/* Roof */}
                <div 
                  className={`w-0 h-0 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent border-b-[60px] transition-all duration-300 ${
                    analogyMode === 'html'
                      ? 'border-b-slate-700 border-dashed'
                      : analogyMode === 'css'
                      ? 'border-b-amber-600 drop-shadow-md'
                      : 'border-b-amber-500 drop-shadow-lg'
                  }`}
                />

                {/* House Base */}
                <div 
                  className={`w-[220px] h-[130px] border-2 relative flex items-end justify-around px-4 pb-0 transition-all duration-300 ${
                    analogyMode === 'html'
                      ? 'border-dashed border-slate-600 bg-slate-900/50'
                      : analogyMode === 'css'
                      ? 'border-solid border-amber-900 bg-gradient-to-b from-amber-100 to-amber-200 shadow-md'
                      : 'border-solid border-amber-900 bg-gradient-to-b from-sky-100 to-sky-200 shadow-xl'
                  }`}
                >
                  {/* Window */}
                  <div 
                    className={`w-10 h-10 border-2 rounded mb-12 flex items-center justify-center transition-all ${
                      analogyMode === 'html'
                        ? 'border-dashed border-slate-500 bg-transparent'
                        : lightsOn
                        ? 'border-amber-700 bg-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.8)]'
                        : 'border-blue-900 bg-blue-300'
                    }`}
                  >
                    <span className="text-[9px] text-slate-700 font-bold">{lightsOn ? '💡' : '🪟'}</span>
                  </div>

                  {/* Door */}
                  <div 
                    onClick={() => analogyMode === 'js' && setDoorOpen(!doorOpen)}
                    className={`w-12 h-20 border-2 rounded-t transition-all ${
                      analogyMode === 'html'
                        ? 'border-dashed border-slate-500 bg-transparent'
                        : doorOpen
                        ? 'border-amber-900 bg-slate-900 translate-x-1 cursor-pointer'
                        : 'border-amber-900 bg-amber-800 cursor-pointer shadow-inner'
                    } flex items-center justify-end pr-1`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                  </div>
                </div>
              </div>

              {/* JS Interactive Controls */}
              {analogyMode === 'js' && (
                <div className="mt-4 flex items-center gap-2">
                  <button 
                    onClick={() => setDoorOpen(!doorOpen)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-800 text-emerald-300 hover:bg-indigo-900 font-medium transition-colors"
                  >
                    {doorOpen ? '🚪 Tutup Pintu' : '🚪 Buka Pintu'}
                  </button>
                  <button 
                    onClick={() => setLightsOn(!lightsOn)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-800 text-yellow-300 hover:bg-indigo-900 font-medium transition-colors"
                  >
                    {lightsOn ? '🌑 Padam Lampu' : '💡 Nyalakan Lampu'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Example Card (h1 Kolej Komuniti) */}
        <div className="pt-4 border-t border-indigo-950">
          <div className="bg-[#080B14] rounded-2xl border border-indigo-950 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <h4 className="text-sm font-bold text-white">Contoh Kod Paling Asas</h4>
              </div>
              <button
                id="btn-cuba-sendiri-basics"
                onClick={() => setQuickEditorOpen(!quickEditorOpen)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 transition-colors font-medium cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                {quickEditorOpen ? 'Tutup Editor' : 'CUBA SENDIRI'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code */}
              <div className="bg-[#0D1322] rounded-xl p-3 border border-indigo-950 font-mono text-xs">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">CODE:</div>
                <pre className="text-indigo-300 overflow-x-auto whitespace-pre-wrap">{quickCode}</pre>
              </div>

              {/* Output */}
              <div className="bg-white rounded-xl p-4 text-slate-900 min-h-[70px] flex flex-col justify-center shadow-inner">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-bold font-mono border-b pb-0.5">
                  OUTPUT BROWSER:
                </div>
                <div 
                  dangerouslySetInnerHTML={{ __html: quickCode }}
                  className="prose prose-sm max-w-none text-slate-900 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-indigo-900 [&_p]:text-sm"
                />
              </div>
            </div>

            {quickEditorOpen && (
              <div className="mt-4 pt-3 border-t border-indigo-950">
                <label className="block text-xs font-mono text-indigo-400 mb-1 font-semibold">
                  Taip atau ubah kod di bawah untuk melihat perubahan serta-merta:
                </label>
                <textarea
                  value={quickCode}
                  onChange={(e) => setQuickCode(e.target.value)}
                  className="w-full bg-[#0D1322] border border-indigo-800/80 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-400 resize-y min-h-[80px]"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Struktur Lengkap Dokumen HTML (Clickable Interactive Skeleton) */}
      <section className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">SEKSYEN 2.1.1</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Struktur Dokumen HTML</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Klik pada mana-mana bahagian kod untuk melihat fungsi dan peranan setiap tag.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 px-3.5 py-1.5 rounded-xl shadow-sm">
            <MousePointerClick className="w-4 h-4 text-indigo-400" />
            <span>Klik tag untuk penerangan</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Clickable Code Viewer */}
          <div className="lg:col-span-7 bg-[#080B14] rounded-2xl border border-indigo-950 p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto shadow-inner">
            <div className="text-[10px] text-slate-500 mb-2 pb-1 border-b border-indigo-950 flex items-center justify-between">
              <span className="text-indigo-400/80">struktur_lengkap.html</span>
              <span className="text-emerald-400 font-sans text-[11px] font-medium">Pilih tag di bawah 👇</span>
            </div>

            <div className="space-y-1">
              {/* DOCTYPE */}
              <div 
                onClick={() => setSelectedTag('doctype')}
                className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'doctype' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-slate-400 hover:bg-slate-900/60'
                }`}
              >
                &lt;!DOCTYPE html&gt;
              </div>

              {/* HTML OPEN */}
              <div 
                onClick={() => setSelectedTag('html')}
                className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'html' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-slate-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;html&gt;
              </div>

              {/* HEAD OPEN */}
              <div 
                onClick={() => setSelectedTag('head')}
                className={`ml-4 p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'head' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-purple-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;head&gt;
              </div>

              {/* TITLE */}
              <div 
                onClick={() => setSelectedTag('title')}
                className={`ml-8 p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'title' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-amber-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;title&gt;Website Saya&lt;/title&gt;
              </div>

              {/* HEAD CLOSE */}
              <div 
                onClick={() => setSelectedTag('head')}
                className={`ml-4 p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'head' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-purple-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;/head&gt;
              </div>

              {/* BODY OPEN */}
              <div 
                onClick={() => setSelectedTag('body')}
                className={`ml-4 p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'body' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-emerald-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;body&gt;
              </div>

              {/* H1 */}
              <div 
                onClick={() => setSelectedTag('h1')}
                className={`ml-8 p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'h1' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-sky-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;h1&gt;Selamat Datang&lt;/h1&gt;
              </div>

              {/* P */}
              <div 
                onClick={() => setSelectedTag('p')}
                className={`ml-8 p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'p' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-emerald-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;p&gt;Ini website pertama saya.&lt;/p&gt;
              </div>

              {/* BODY CLOSE */}
              <div 
                onClick={() => setSelectedTag('body')}
                className={`ml-4 p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'body' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-emerald-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;/body&gt;
              </div>

              {/* HTML CLOSE */}
              <div 
                onClick={() => setSelectedTag('html')}
                className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                  selectedTag === 'html' ? 'bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 shadow-md shadow-indigo-950/60' : 'text-slate-300 hover:bg-slate-900/60'
                }`}
              >
                &lt;/html&gt;
              </div>
            </div>
          </div>

          {/* Explanation Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E1B4B] rounded-2xl border border-indigo-700/60 p-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-indigo-500/20">
                <Sparkles className="w-12 h-12" />
              </div>
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] font-mono uppercase bg-indigo-950/90 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-700 font-bold shadow-sm">
                  PENERANGAN TAG TERPILIH
                </span>
                <h3 className="text-xl font-bold text-white font-mono">
                  {skeletonExplanations[selectedTag]?.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  "{skeletonExplanations[selectedTag]?.desc}"
                </p>
                <div className="p-3.5 bg-[#080B14]/80 rounded-xl border border-indigo-950 text-xs text-slate-300">
                  <strong className="text-indigo-400">Peranan:</strong> {skeletonExplanations[selectedTag]?.role}
                </div>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="bg-[#080B14] rounded-2xl border border-indigo-950 p-4 text-xs text-slate-400 space-y-2 shadow-sm">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" /> Rumusan Struktur Asas:
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><code className="text-indigo-300 font-bold">&lt;head&gt;</code> = Untuk maklumat halaman (di belakang tabir).</li>
                <li><code className="text-emerald-300 font-bold">&lt;body&gt;</code> = Untuk semua visual yang dilihat pengguna.</li>
                <li>Semua tag berpasangan mesti dibuka dan ditutup dengan teratur.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Build The HTML Structure (Interactive Puzzle Activity) */}
      <section className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">AKTIVITI HANDS-ON</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Build The HTML Structure</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Susun blok tag di bawah mengikut urutan struktur dokumen HTML yang betul.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPuzzleHint(!showPuzzleHint)}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-950/80 text-amber-300 border border-indigo-800 hover:bg-indigo-900 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              HINT
            </button>
            <button
              onClick={handleResetPuzzle}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-indigo-900 hover:bg-slate-700 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              RESET
            </button>
          </div>
        </div>

        {showPuzzleHint && (
          <div className="p-3.5 bg-amber-950/40 border border-amber-800 rounded-2xl text-xs text-amber-200 flex items-start gap-2 shadow-sm">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Panduan:</strong> Mulakan dengan <code>&lt;!DOCTYPE html&gt;</code>, kemudian buka <code>&lt;html&gt;</code>. Seterusnya buka dan tutup <code>&lt;head&gt;&lt;/head&gt;</code>, kemudian buka dan tutup <code>&lt;body&gt;&lt;/body&gt;</code>, dan akhiri dengan <code>&lt;/html&gt;</code>.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Available Blocks Pool */}
          <div className="bg-[#080B14] rounded-2xl border border-indigo-950 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-indigo-950 pb-2">
              <span className="text-indigo-400 font-bold">PILIHAN BLOK TAG:</span>
              <span className="text-slate-400">{availableBlocks.length} tinggal</span>
            </div>

            {availableBlocks.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-6 text-center">
                Semua blok telah disusun ke dalam ruangan jawapan.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {availableBlocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => handleAddBlock(block)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-indigo-950 hover:border-indigo-500 border border-indigo-900/60 text-indigo-300 font-mono text-xs font-bold transition-all shadow-sm hover:scale-105 cursor-pointer"
                  >
                    + {block.text}
                  </button>
                ))}
              </div>
            )}
            <p className="text-[11px] text-slate-500 pt-2">
              💡 Klik pada blok di atas untuk memasukkannya ke dalam ruangan susunan.
            </p>
          </div>

          {/* Placed Blocks Target Area */}
          <div className="bg-[#080B14] rounded-2xl border border-indigo-950 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-indigo-950 pb-2">
              <span className="text-indigo-400 font-bold">SUSUNAN DOKUMEN ANDA:</span>
              <span className="text-emerald-400 font-bold">{placedBlocks.length}/7 blok</span>
            </div>

            <div className="min-h-[160px] bg-[#0D1322]/80 rounded-xl p-3 border border-dashed border-indigo-900/80 flex flex-col gap-1.5">
              {placedBlocks.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-xs text-slate-500 italic">
                  <span>Ruangan kosong. Klik blok di sebelah kiri untuk menyusun.</span>
                </div>
              ) : (
                placedBlocks.map((block, idx) => (
                  <div
                    key={block.id + idx}
                    onClick={() => handleRemoveBlock(idx)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#080B14] border border-indigo-900 hover:border-rose-500/60 hover:bg-rose-950/20 text-emerald-300 font-mono text-xs font-medium cursor-pointer transition-colors group shadow-sm"
                    title="Klik untuk buang semula blok ini"
                  >
                    <span>{idx + 1}. {block.text}</span>
                    <span className="text-[10px] text-slate-500 group-hover:text-rose-400 font-sans">
                      ✕ buang
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Check Button */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                id="btn-check-structure-puzzle"
                onClick={handleCheckPuzzle}
                disabled={placedBlocks.length === 0}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  placedBlocks.length > 0
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 text-white hover:from-indigo-500 hover:via-purple-500 hover:to-emerald-400 shadow-lg shadow-indigo-950/50 cursor-pointer hover:scale-[1.01]'
                    : 'bg-slate-850 text-slate-600 cursor-not-allowed border border-indigo-950'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>CHECK ANSWER</span>
              </button>

              {puzzleResult.status === 'correct' && (
                <div className="p-3.5 bg-emerald-950/90 border border-emerald-500 rounded-xl text-xs text-emerald-200 flex items-center justify-between shadow-lg shadow-emerald-950/40">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{puzzleResult.message}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('elements')}
                    className="px-3 py-1.5 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                  >
                    Seterusnya: Elements <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {puzzleResult.status === 'wrong' && (
                <div className="p-3.5 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-200 flex items-start gap-2 shadow-sm">
                  <span className="text-rose-400 font-bold shrink-0">⚠️</span>
                  <span>{puzzleResult.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
