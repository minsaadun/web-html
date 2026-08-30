import React, { useState } from 'react';
import { 
  Layers, 
  Play, 
  Terminal, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  List, 
  Table as TableIcon, 
  Sparkles, 
  CheckCircle, 
  HelpCircle,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HTML_ELEMENTS } from '../data/elementsData';
import { HtmlElementInfo, TabType, UserProgress } from '../types';

interface HtmlElementsProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

export const HtmlElementsSection: React.FC<HtmlElementsProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  // Mode selection: Cards | Explorer | Deep Dives
  const [activeSubTab, setActiveSubTab] = useState<'cards' | 'explorer' | 'image' | 'links' | 'lists' | 'tables'>('cards');

  // Inline "Try It" Modal / Panel State
  const [tryItElement, setTryItElement] = useState<HtmlElementInfo | null>(null);
  const [tryItCode, setTryItCode] = useState<string>('');

  // Explorer Selected Tag
  const [explorerTag, setExplorerTag] = useState<string>('a');
  const selectedExplorerElement = HTML_ELEMENTS.find(e => e.tag === explorerTag) || HTML_ELEMENTS[0];

  // Image Deep Dive Activity: FIX THE IMAGE
  const [imgExerciseCode, setImgExerciseCode] = useState('<img href="kampus_kolej.jpg" alt="Kampus Kolej Komuniti">');
  const [imgFixed, setImgFixed] = useState(false);
  const [imgFeedback, setImgFeedback] = useState<string | null>(null);

  // Link / Navigation Simulator State
  const [activeNavPage, setActiveNavPage] = useState<'home' | 'about' | 'contact'>('home');

  // List Simulator State
  const [listType, setListType] = useState<'ul' | 'ol'>('ul');

  const handleOpenTryIt = (el: HtmlElementInfo) => {
    setTryItElement(el);
    setTryItCode(el.example);
    
    // Track explored
    if (!progress.elementsExplored.includes(el.tag)) {
      const updated = [...progress.elementsExplored, el.tag];
      onUpdateProgress({ elementsExplored: updated });
    }
  };

  const handleFixImageCheck = () => {
    const code = imgExerciseCode.toLowerCase();
    if (code.includes('src=') && !code.includes('href=') && code.includes('<img')) {
      setImgFixed(true);
      setImgFeedback('✓ Tahniah! Anda telah menukar "href" kepada "src" dengan betul. Imej kini berjaya dipaparkan!');
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
      if (!progress.elementsExplored.includes('img-fixed')) {
        onUpdateProgress({ elementsExplored: [...progress.elementsExplored, 'img-fixed'] });
      }
    } else {
      setImgFeedback('Belum tepat. Pastikan tag <img> menggunakan attribute "src=" dan bukan "href=".');
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header & Sub-navigation */}
      <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">SEKSYEN 2.1.2</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">11 Elemen Utama HTML</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Kuasai 11 elemen standard HTML5 melalui penerangan ringkas dan aktiviti interaktif.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#080B14] px-3.5 py-2 rounded-xl border border-indigo-950 text-xs font-mono shadow-sm">
            <span className="text-slate-400">Diterokai:</span>
            <span className="text-emerald-400 font-bold">{progress.elementsExplored.length} / 11 Elemen</span>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'cards', label: '1. Kad Elemen (Semua 11)', icon: <Layers className="w-4 h-4" /> },
            { id: 'explorer', label: '2. Element Explorer', icon: <Terminal className="w-4 h-4" /> },
            { id: 'image', label: '3. Image Deep Dive & Fix', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'links', label: '4. Links & Navigation', icon: <LinkIcon className="w-4 h-4" /> },
            { id: 'lists', label: '5. Senarai: ul vs ol', icon: <List className="w-4 h-4" /> },
            { id: 'tables', label: '6. Jadual: Table Breakdown', icon: <TableIcon className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold shadow-md shadow-indigo-600/30'
                  : 'bg-[#080B14] text-slate-300 border border-indigo-950 hover:bg-[#0D1322] hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. ALL 11 ELEMENT CARDS */}
      {activeSubTab === 'cards' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HTML_ELEMENTS.map((el) => {
              const isExplored = progress.elementsExplored.includes(el.tag);
              return (
                <div
                  key={el.tag}
                  id={`element-card-${el.tag}`}
                  className="bg-[#0F172A]/90 rounded-2xl border border-indigo-950 hover:border-indigo-700/60 p-5 space-y-4 flex flex-col justify-between shadow-lg shadow-black/20 transition-all hover:shadow-indigo-950/30"
                >
                  <div className="space-y-3">
                    {/* Top Row: Tag badge + Title */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 shadow-sm">
                          &lt;{el.tag}&gt;
                        </span>
                        <h3 className="font-bold text-white text-base">{el.name}</h3>
                      </div>
                      {isExplored && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800 shadow-sm">
                          <Check className="w-3 h-3" /> Diterokai
                        </span>
                      )}
                    </div>

                    {/* Fungsi */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {el.description}
                    </p>

                    {/* Syntax */}
                    <div className="bg-[#080B14] rounded-xl p-2.5 border border-indigo-950 font-mono text-xs">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">SYNTAX:</span>
                      <pre className="text-indigo-300 whitespace-pre-wrap">{el.syntax}</pre>
                    </div>

                    {/* Contoh Code & Output */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#080B14] rounded-xl p-2.5 border border-indigo-950 font-mono">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">CONTOH KOD:</span>
                        <pre className="text-emerald-300 text-[11px] whitespace-pre-wrap">{el.example}</pre>
                      </div>

                      <div className="bg-white rounded-xl p-2.5 text-slate-900 min-h-[60px] flex flex-col justify-center shadow-inner">
                        <span className="text-[9px] text-slate-400 uppercase font-bold font-mono block mb-1 border-b pb-0.5">
                          OUTPUT:
                        </span>
                        <div dangerouslySetInnerHTML={{ __html: el.outputPreview }} />
                      </div>
                    </div>
                  </div>

                  {/* Try It Action */}
                  <button
                    onClick={() => handleOpenTryIt(el)}
                    className="w-full py-2.5 rounded-xl bg-slate-800/90 hover:bg-indigo-950 hover:text-indigo-300 hover:border-indigo-600 border border-indigo-900/60 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>TRY IT (Uji Kod Ini)</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. HTML ELEMENT EXPLORER SIMULATOR */}
      {activeSubTab === 'explorer' && (
        <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-6 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" /> HTML Element Explorer Simulator
            </h3>
            <span className="text-xs text-slate-400">Pilih tag di sebelah kiri</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Tag selector buttons */}
            <div className="lg:col-span-4 space-y-1.5 bg-[#080B14] rounded-2xl p-3 border border-indigo-950">
              <div className="text-[11px] font-mono text-indigo-400 uppercase px-2 py-1 font-bold">
                HTML ELEMENTS (11 WAJIB)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1">
                {HTML_ELEMENTS.map((item) => (
                  <button
                    key={item.tag}
                    onClick={() => {
                      setExplorerTag(item.tag);
                      if (!progress.elementsExplored.includes(item.tag)) {
                        onUpdateProgress({ elementsExplored: [...progress.elementsExplored, item.tag] });
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all text-left cursor-pointer ${
                      explorerTag === item.tag
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-[#0D1322] border border-transparent'
                    }`}
                  >
                    <span>&lt;{item.tag}&gt;</span>
                    <span className="text-[10px] opacity-80 truncate max-w-[90px] font-sans">{item.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Detailed Function, Syntax, Example, Output */}
            <div className="lg:col-span-8 bg-[#080B14] rounded-2xl border border-indigo-950 p-5 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-indigo-300 uppercase bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-800 font-bold shadow-sm">
                    ELEMEN TERPILIH
                  </span>
                  <h4 className="text-xl font-bold text-white font-mono mt-1">
                    &lt;{selectedExplorerElement.tag}&gt; - {selectedExplorerElement.name}
                  </h4>
                </div>
                <button
                  onClick={() => handleOpenTryIt(selectedExplorerElement)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:from-indigo-500 hover:to-purple-500 flex items-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Ubah Kod</span>
                </button>
              </div>

              {/* FUNCTION */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">1. FUNCTION (FUNGSI):</span>
                <p className="text-xs sm:text-sm text-slate-200 bg-[#0D1322] p-3 rounded-xl border border-indigo-950">
                  {selectedExplorerElement.description}
                </p>
              </div>

              {/* SYNTAX */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">2. SYNTAX (SINTAKS ASAS):</span>
                <pre className="text-xs text-indigo-300 font-mono bg-[#0D1322] p-3 rounded-xl border border-indigo-950 overflow-x-auto">
                  {selectedExplorerElement.syntax}
                </pre>
              </div>

              {/* EXAMPLE & OUTPUT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">3. EXAMPLE (CONTOH KOD):</span>
                  <pre className="text-xs text-emerald-300 font-mono bg-[#0D1322] p-3 rounded-xl border border-indigo-950 overflow-x-auto min-h-[90px]">
                    {selectedExplorerElement.example}
                  </pre>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">4. OUTPUT (HASIL BROWSER):</span>
                  <div className="bg-white text-slate-900 p-3 rounded-xl min-h-[90px] flex flex-col justify-center shadow-inner">
                    <div dangerouslySetInnerHTML={{ __html: selectedExplorerElement.outputPreview }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. IMAGE DEEP DIVE & FIX THE IMAGE */}
      {activeSubTab === 'image' && (
        <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-6 shadow-xl shadow-black/20">
          <div className="border-b border-indigo-950 pb-3">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-indigo-400" /> Image Deep Dive (src vs alt) & Fix The Image
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fahami bagaimana imej dimuatkan dan fungsi attribute <code>src</code> dan <code>alt</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Concept src vs alt */}
            <div className="bg-[#080B14] rounded-2xl p-5 border border-indigo-950 space-y-3 shadow-inner">
              <h4 className="font-bold text-white text-sm">Konsep Tag &lt;img&gt;</h4>
              <div className="font-mono text-xs text-indigo-300 bg-[#0D1322] p-3 rounded-xl border border-indigo-950">
                &lt;img <span className="text-amber-300">src</span>="gambar.jpg" <span className="text-purple-300">alt</span>="Gambar saya"&gt;
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50">
                  <strong className="text-amber-400">src (Source):</strong> Lokasi fail gambar atau URL internet. Jika path salah, gambar tidak dapat dipaparkan.
                </div>
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/50">
                  <strong className="text-purple-400">alt (Alternative Text):</strong> Teks pengganti yang dipaparkan jika gambar gagal dibuka & digunakan oleh pembaca skrin (screen reader).
                </div>
              </div>

              {/* Working vs Broken Image Demo */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block mb-2">
                  SIMULASI: GAMBAR BERJAYA VS BROKEN IMAGE
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {/* Working */}
                  <div className="bg-white p-2.5 rounded-xl text-center text-slate-900 border border-slate-200 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=80" 
                      alt="Komputer Web" 
                      className="w-full h-16 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] text-emerald-600 font-bold">✓ Gambar Berjaya</span>
                  </div>

                  {/* Broken simulation */}
                  <div className="bg-white p-2.5 rounded-xl text-center text-slate-900 border border-slate-200 flex flex-col items-center justify-center min-h-[90px] shadow-sm">
                    <div className="w-8 h-8 border border-dashed border-red-400 rounded-lg flex items-center justify-center text-red-500 mb-1">
                      🖼️❌
                    </div>
                    <span className="text-[10px] text-slate-700 italic">"Pemandangan Kampus"</span>
                    <span className="text-[9px] text-red-600 font-bold">(Ikon Broken + Alt Text)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FIX THE IMAGE Interactive Activity */}
            <div className="bg-[#080B14] rounded-2xl p-5 border border-indigo-800/60 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-800 font-bold shadow-sm">
                  AKTIVITI HANDS-ON
                </span>
                <span className="text-xs text-amber-400 font-semibold">Baiki Kod Imej</span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">Aktiviti: Fix The Image</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Pelajar baru telah menulis kod di bawah tetapi imej tidak keluar kerana attribute yang salah. Cari kesalahan dan baiki kod tersebut:
                </p>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Edit Kod HTML:</label>
                <textarea
                  value={imgExerciseCode}
                  onChange={(e) => setImgExerciseCode(e.target.value)}
                  rows={2}
                  className="w-full bg-[#0D1322] border border-indigo-800/80 rounded-xl p-2.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="bg-white p-3 rounded-xl min-h-[90px] flex flex-col justify-center items-center text-slate-900 shadow-inner">
                <span className="text-[9px] text-slate-400 font-mono uppercase font-bold self-start mb-1">Live Output:</span>
                {imgFixed ? (
                  <div className="text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80" 
                      alt="Kampus Kolej Komuniti" 
                      className="h-16 rounded-lg object-cover mx-auto"
                    />
                    <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Kampus Kolej Komuniti</span>
                  </div>
                ) : (
                  <div className="text-center text-xs text-red-500 font-medium">
                    <span>🖼️❌ [Gambar Tidak Boleh Dipaparkan Kerana href Bukan Attribute Imej]</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleFixImageCheck}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-lg shadow-indigo-600/30 cursor-pointer hover:scale-[1.01] transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>SEMAK JAWAPAN</span>
              </button>

              {imgFeedback && (
                <div className={`p-3.5 rounded-xl text-xs ${imgFixed ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-200' : 'bg-rose-950/90 border border-rose-500 text-rose-200'}`}>
                  {imgFeedback}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. LINKS & NAVIGATION DEEP DIVE */}
      {activeSubTab === 'links' && (
        <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-6 shadow-xl shadow-black/20">
          <div className="border-b border-indigo-950 pb-3">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-indigo-400" /> Links & Navigation Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fahami bagaimana tag <code>&lt;a href="..."&gt;</code> membina hubungan antara halaman laman web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual Navigation Pipeline */}
            <div className="bg-[#080B14] rounded-2xl p-5 border border-indigo-950 space-y-4 shadow-inner">
              <h4 className="font-bold text-white text-sm">Simulasi Navigasi 3 Halaman</h4>
              <p className="text-xs text-slate-300">
                Klik pautan di bawah untuk melihat bagaimana pengguna berpindah dari satu halaman ke halaman lain:
              </p>

              {/* Navigation Bar simulation */}
              <div className="bg-[#0D1322] p-3 rounded-xl border border-indigo-950 flex items-center justify-around font-mono text-xs">
                <button
                  onClick={() => setActiveNavPage('home')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeNavPage === 'home' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'text-indigo-400 hover:bg-[#080B14] underline'
                  }`}
                >
                  &lt;a href="home.html"&gt;Home&lt;/a&gt;
                </button>
                <button
                  onClick={() => setActiveNavPage('about')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeNavPage === 'about' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'text-indigo-400 hover:bg-[#080B14] underline'
                  }`}
                >
                  &lt;a href="about.html"&gt;About&lt;/a&gt;
                </button>
                <button
                  onClick={() => setActiveNavPage('contact')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeNavPage === 'contact' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'text-indigo-400 hover:bg-[#080B14] underline'
                  }`}
                >
                  &lt;a href="contact.html"&gt;Contact&lt;/a&gt;
                </button>
              </div>

              {/* Rendered Destination Page */}
              <div className="bg-white rounded-2xl p-5 text-slate-900 min-h-[140px] shadow-md">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold border-b pb-1 mb-2">
                  KANDUNGAN HALAMAN: {activeNavPage.toUpperCase()}.HTML
                </div>
                {activeNavPage === 'home' && (
                  <div>
                    <h2 className="text-lg font-bold text-indigo-950">🏠 Selamat Datang ke Halaman Utama (Home)</h2>
                    <p className="text-xs text-slate-600 mt-1">Portal rasmi program Sijil Teknologi Maklumat (STM) Kolej Komuniti.</p>
                  </div>
                )}
                {activeNavPage === 'about' && (
                  <div>
                    <h2 className="text-lg font-bold text-emerald-900">ℹ️ Tentang Kami (About)</h2>
                    <p className="text-xs text-slate-600 mt-1">Program STM melatih pelajar menjadi pembangun web TVET yang kompeten dan mahir.</p>
                  </div>
                )}
                {activeNavPage === 'contact' && (
                  <div>
                    <h2 className="text-lg font-bold text-purple-900">📞 Hubungi Kami (Contact)</h2>
                    <p className="text-xs text-slate-600 mt-1">Emel: stm@kolejkomuniti.edu.my | No Tel: 03-8888 1234</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mini Task Builder */}
            <div className="bg-[#080B14] rounded-2xl p-5 border border-indigo-950 space-y-3 shadow-inner">
              <h4 className="font-bold text-white text-sm">Mini Task: Struktur Menu Navigasi</h4>
              <p className="text-xs text-slate-400">
                Gunakan tag <code>&lt;nav&gt;</code> dan <code>&lt;a&gt;</code> untuk membina bar navigasi lengkap:
              </p>

              <div className="bg-[#0D1322] p-3.5 rounded-xl font-mono text-xs text-indigo-300 border border-indigo-950">
                <pre className="whitespace-pre-wrap">{`<nav>
  <a href="index.html">Home</a> |
  <a href="about.html">About</a> |
  <a href="contact.html">Contact</a>
</nav>`}</pre>
              </div>

              <div className="p-3.5 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-xs text-slate-300">
                <strong className="text-indigo-400">Tip Web Developer:</strong> Sentiasa gunakan nama fail yang konsisten seperti <code>index.html</code>, <code>about.html</code>, dan elakkan ruang kosong pada URL!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. LIST DEEP DIVE (ul vs ol) */}
      {activeSubTab === 'lists' && (
        <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-6 shadow-xl shadow-black/20">
          <div className="border-b border-indigo-950 pb-3">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <List className="w-5 h-5 text-indigo-400" /> Senarai: Perbandingan &lt;ul&gt; (Unordered) vs &lt;ol&gt; (Ordered)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Ketahui bila menggunakan senarai bullet points atau senarai bernombor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unordered List Card */}
            <div className="bg-[#080B14] rounded-2xl p-5 border border-indigo-950 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800">
                  &lt;ul&gt; (Unordered List)
                </span>
                <span className="text-xs text-slate-400">Bullet Points (•)</span>
              </div>
              <p className="text-xs text-slate-300">
                Sesuai untuk senarai yang tidak mementingkan urutan turutan (cth: senarai subjek atau peralatan).
              </p>

              <div className="bg-[#0D1322] p-3.5 rounded-xl font-mono text-xs text-indigo-300 border border-indigo-950">
                <pre>{`<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`}</pre>
              </div>

              <div className="bg-white p-3.5 rounded-xl text-slate-900 shadow-inner">
                <span className="text-[9px] font-mono uppercase text-slate-400 font-bold block mb-1">Hasil Output:</span>
                <ul className="list-disc list-inside text-xs text-slate-800 space-y-1">
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                </ul>
              </div>
            </div>

            {/* Ordered List Card */}
            <div className="bg-[#080B14] rounded-2xl p-5 border border-indigo-950 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
                  &lt;ol&gt; (Ordered List)
                </span>
                <span className="text-xs text-slate-400">Bernombor (1, 2, 3)</span>
              </div>
              <p className="text-xs text-slate-300">
                Sesuai untuk senarai langkah kerja atau prosedur yang wajib mengikut urutan.
              </p>

              <div className="bg-[#0D1322] p-3.5 rounded-xl font-mono text-xs text-emerald-300 border border-indigo-950">
                <pre>{`<ol>
  <li>Buka VS Code</li>
  <li>Tulis Kod HTML</li>
  <li>Buka di Browser</li>
</ol>`}</pre>
              </div>

              <div className="bg-white p-3.5 rounded-xl text-slate-900 shadow-inner">
                <span className="text-[9px] font-mono uppercase text-slate-400 font-bold block mb-1">Hasil Output:</span>
                <ol className="list-decimal list-inside text-xs text-slate-800 space-y-1">
                  <li>Buka VS Code</li>
                  <li>Tulis Kod HTML</li>
                  <li>Buka di Browser</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TABLE DEEP DIVE */}
      {activeSubTab === 'tables' && (
        <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-6 shadow-xl shadow-black/20">
          <div className="border-b border-indigo-950 pb-3">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-indigo-400" /> Jadual: Struktur &lt;table&gt;, &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Contoh kontekstual dekat dengan pelajar: Jadual Kelas STM Kolej Komuniti.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Color-coded Explanation */}
            <div className="lg:col-span-5 space-y-3 bg-[#080B14] p-5 rounded-2xl border border-indigo-950 shadow-inner">
              <h4 className="font-bold text-white text-sm">Hubungan 4 Tag Utama:</h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 flex items-start gap-2">
                  <span className="font-mono font-bold text-blue-400 shrink-0">&lt;table&gt;</span>
                  <span className="text-slate-300">Kontena utama yang membalut keseluruhan jadual.</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-400 shrink-0">&lt;tr&gt;</span>
                  <span className="text-slate-300"><strong>Table Row:</strong> Menghasilkan satu baris mendatar baharu.</span>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 flex items-start gap-2">
                  <span className="font-mono font-bold text-purple-400 shrink-0">&lt;th&gt;</span>
                  <span className="text-slate-300"><strong>Table Header:</strong> Sel tajuk lajur (huruf tebal dan berpusat).</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 flex items-start gap-2">
                  <span className="font-mono font-bold text-emerald-400 shrink-0">&lt;td&gt;</span>
                  <span className="text-slate-300"><strong>Table Data:</strong> Sel data biasa dalam sesuatu baris.</span>
                </div>
              </div>
            </div>

            {/* Live Table Code & Output */}
            <div className="lg:col-span-7 bg-[#080B14] p-5 rounded-2xl border border-indigo-950 space-y-4 shadow-inner">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">KOD JADUAL KELAS STM:</span>
                <pre className="p-3.5 bg-[#0D1322] rounded-xl text-xs font-mono text-indigo-300 border border-indigo-950 overflow-x-auto">
{`<table border="1">
  <tr>
    <th>Nama Pelajar</th>
    <th>Kursus</th>
    <th>Semester</th>
  </tr>
  <tr>
    <td>Ali Bin Ahmad</td>
    <td>STM</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Siti Nurhaliza</td>
    <td>STM</td>
    <td>2</td>
  </tr>
</table>`}
                </pre>
              </div>

              <div className="bg-white p-4 rounded-xl text-slate-900 shadow-inner">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">
                  HASIL PAPARAN BROWSER:
                </span>
                <table className="w-full text-xs text-left border-collapse border border-slate-300">
                  <thead className="bg-indigo-50 text-indigo-950 font-bold">
                    <tr>
                      <th className="border border-slate-300 p-2">Nama Pelajar</th>
                      <th className="border border-slate-300 p-2">Kursus</th>
                      <th className="border border-slate-300 p-2">Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-2">Ali Bin Ahmad</td>
                      <td className="border border-slate-300 p-2">STM</td>
                      <td className="border border-slate-300 p-2">2</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-300 p-2">Siti Nurhaliza</td>
                      <td className="border border-slate-300 p-2">STM</td>
                      <td className="border border-slate-300 p-2">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INLINE TRY IT MODAL */}
      {tryItElement && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-indigo-700/60 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl shadow-indigo-950/80">
            <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-white text-base font-mono">
                  Uji Kod: &lt;{tryItElement.tag}&gt; ({tryItElement.name})
                </h3>
              </div>
              <button
                onClick={() => setTryItElement(null)}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-indigo-400 font-semibold">
                Ubah kod HTML di bawah untuk melihat output masa nyata:
              </label>
              <textarea
                value={tryItCode}
                onChange={(e) => setTryItCode(e.target.value)}
                rows={4}
                className="w-full bg-[#080B14] border border-indigo-800/80 rounded-2xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div className="bg-white rounded-2xl p-4 text-slate-900 min-h-[100px] max-h-[160px] overflow-auto shadow-inner">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold border-b pb-1 mb-2">
                LIVE OUTPUT:
              </div>
              <div dangerouslySetInnerHTML={{ __html: tryItCode }} />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setTryItCode(tryItElement.example)}
                className="text-xs text-slate-400 hover:text-indigo-300 underline cursor-pointer"
              >
                Reset ke Contoh Asal
              </button>
              <button
                onClick={() => setTryItElement(null)}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-xs hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/30 cursor-pointer"
              >
                Selesai Ujian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
