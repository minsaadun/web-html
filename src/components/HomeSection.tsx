import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Terminal, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  FileCode, 
  Compass, 
  GraduationCap,
  ArrowRight,
  Flame
} from 'lucide-react';
import { TabType } from '../types';

interface HomeSectionProps {
  setActiveTab: (tab: TabType) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ setActiveTab }) => {
  const [demoCode, setDemoCode] = useState('<h1>Hello World!</h1>\n<p>Selamat Datang ke Kelas Web Development!</p>');

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#1E1B4B] border border-indigo-900/50 p-6 sm:p-10 shadow-2xl shadow-indigo-950/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-gradient-to-tr from-pink-500/15 to-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Intro text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/90 border border-indigo-700/70 text-indigo-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                STM21673 • Sijil Teknologi Maklumat
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-700/70 text-emerald-300 text-xs font-semibold shadow-sm">
                Semester 2 • Kolej Komuniti
              </span>
            </div>

            <div>
              <p className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-1 font-bold">TOPIC 2.0</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                HYPERTEXT MARKUP <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">LANGUAGE (HTML)</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 font-medium mt-3">
                "Belajar HTML dengan menulis kod sendiri."
              </p>
            </div>

            {/* TVET CLO Banner */}
            <div className="bg-[#0B0F19]/80 border border-indigo-900/60 rounded-2xl p-4 space-y-2 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 text-amber-400" />
                CLO1 (P3, PLO3) FOCUS
              </div>
              <p className="text-sm text-slate-300 italic font-mono">
                "Construct dynamic websites using appropriate web development tools and technologies."
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-medium pt-1">
                <span>SEE</span>
                <span className="text-indigo-600">→</span>
                <span>TRY</span>
                <span className="text-indigo-600">→</span>
                <span>EDIT</span>
                <span className="text-indigo-600">→</span>
                <span>RUN</span>
                <span className="text-indigo-600">→</span>
                <span>OBSERVE</span>
                <span className="text-indigo-600">→</span>
                <span>FIX</span>
                <span className="text-indigo-600">→</span>
                <span className="text-emerald-400 font-bold">BUILD</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-mula-html-lab"
                onClick={() => setActiveTab('basics')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm sm:text-base hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>MULA HTML LAB</span>
              </button>

              <button
                id="btn-quick-playground"
                onClick={() => setActiveTab('playground')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-indigo-800/50 hover:border-indigo-600 transition-all shadow-sm"
              >
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Buka Playground</span>
              </button>
            </div>
          </div>

          {/* Right Live Interactive Browser Card Mockup */}
          <div className="lg:col-span-5">
            <div className="bg-[#080B14] rounded-2xl border border-indigo-900/60 shadow-2xl overflow-hidden ring-1 ring-white/10">
              {/* Browser Header Bar */}
              <div className="bg-[#0D1322] px-4 py-2.5 border-b border-indigo-950 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90"></div>
                </div>
                <div className="bg-[#080B14] px-3 py-1 rounded-md text-[11px] text-slate-400 font-mono flex items-center gap-1.5 border border-indigo-950/80 w-3/5 justify-center">
                  <span>🔒</span>
                  <span>http://localhost/demo.html</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-medium">Live Demo</span>
              </div>

              {/* Code input in browser preview card */}
              <div className="p-3 bg-[#0D1322]/70 border-b border-indigo-950">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-indigo-300 font-mono font-medium flex items-center gap-1">
                    <FileCode className="w-3.5 h-3.5 text-indigo-400" /> HTML CODE (Cuba edit teks di sini):
                  </span>
                  <button 
                    onClick={() => setDemoCode('<h1>Hello World!</h1>\n<p>Saya pelajar Kolej Komuniti!</p>')}
                    className="text-[10px] text-slate-400 hover:text-indigo-300 underline"
                  >
                    Reset
                  </button>
                </div>
                <textarea
                  id="home-demo-code-input"
                  value={demoCode}
                  onChange={(e) => setDemoCode(e.target.value)}
                  rows={2}
                  className="w-full bg-[#080B14] border border-indigo-900/60 rounded-xl p-2.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                  placeholder="<h1>Hello World!</h1>"
                />
              </div>

              {/* Rendered Live Browser Output */}
              <div className="p-4 bg-white text-slate-900 min-h-[120px] max-h-[140px] overflow-auto">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 border-b pb-1 font-mono">
                  Browser Output Result:
                </div>
                <div 
                  dangerouslySetInnerHTML={{ __html: demoCode }}
                  className="prose prose-sm max-w-none text-slate-900 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-indigo-950 [&_p]:text-sm [&_p]:text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Outcomes Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Objektif & Hasil Pembelajaran (Learning Outcomes)
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Pada akhir pembelajaran topik ini, pelajar boleh:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              no: '01',
              title: 'Struktur Asas HTML',
              desc: 'Mengenal pasti struktur asas dokumen HTML5, tag pembuka, penutup dan hierarki dokumen.',
              tab: 'basics' as TabType,
              color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300'
            },
            {
              no: '02',
              title: 'HTML Elements',
              desc: 'Menggunakan 11 HTML elements wajib (heading, p, a, img, table, list, div, br, comment, header, footer).',
              tab: 'elements' as TabType,
              color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
            },
            {
              no: '03',
              title: 'Halaman Web Asas',
              desc: 'Membina dan menguji halaman web lengkap dengan teks, gambar, jadual dan navigasi pautan.',
              tab: 'playground' as TabType,
              color: 'border-sky-500/50 bg-sky-950/40 text-sky-300'
            },
            {
              no: '04',
              title: 'Membina HTML Form',
              desc: 'Membina borang interaktif menggunakan input text, radio, combo box, textarea, password dan button.',
              tab: 'forms' as TabType,
              color: 'border-amber-500/50 bg-amber-950/40 text-amber-300'
            },
            {
              no: '05',
              title: 'Membezakan GET & POST',
              desc: 'Memahami kaedah penghantaran data HTTP GET (URL parameter) vs POST (request body payload).',
              tab: 'get-post' as TabType,
              color: 'border-purple-500/50 bg-purple-950/40 text-purple-300'
            },
            {
              no: '06',
              title: 'Hands-on Challenge & Debug',
              desc: 'Menghasilkan halaman profil lengkap serta membaiki ralat kod (debugging) secara praktikal.',
              tab: 'challenge' as TabType,
              color: 'border-pink-500/50 bg-pink-950/40 text-pink-300'
            }
          ].map((item) => (
            <div
              key={item.no}
              id={`outcome-card-${item.no}`}
              onClick={() => setActiveTab(item.tab)}
              className="group p-5 rounded-2xl bg-[#0F172A]/90 border border-indigo-950 hover:border-indigo-600/60 hover:bg-gradient-to-b hover:from-[#131C35] hover:to-[#0F172A] transition-all cursor-pointer flex flex-col justify-between shadow-lg shadow-black/20 hover:shadow-indigo-950/30 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${item.color} shadow-sm`}>
                    LO {item.no}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-indigo-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-indigo-950 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-indigo-300">
                <span>Klik untuk modul ini</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Module Hub */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0F172A]/90 to-[#14122C]/90 border border-indigo-900/40 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-lg">Modul Pembelajaran HTML LAB</h3>
          </div>
          <span className="text-xs text-indigo-300/80 font-medium">Pilih mana-mana bahagian untuk mula</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { id: 'basics', title: '1. HTML Basics', icon: <BookOpen className="w-4 h-4 text-indigo-400" />, desc: 'Definisi, Analogi & Struktur' },
            { id: 'elements', title: '2. HTML Elements', icon: <Layers className="w-4 h-4 text-emerald-400" />, desc: '11 Elemen Utama' },
            { id: 'forms', title: '3. HTML Form', icon: <FileCode className="w-4 h-4 text-amber-400" />, desc: 'Borang & Input Tools' },
            { id: 'get-post', title: '4. GET vs POST', icon: <CheckCircle2 className="w-4 h-4 text-purple-400" />, desc: 'Simulator Aliran Data' },
            { id: 'playground', title: '5. Playground', icon: <Terminal className="w-4 h-4 text-cyan-400" />, desc: 'Editor Kod & 4 Task' },
            { id: 'debug', title: '6. Debug Lab', icon: <Terminal className="w-4 h-4 text-rose-400" />, desc: '5 Cabaran Baiki Ralat' },
            { id: 'quiz', title: '7. Quick Quiz', icon: <Sparkles className="w-4 h-4 text-yellow-400" />, desc: '10 Soalan Uji Minda' },
            { id: 'challenge', title: '8. Mini Challenge', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, desc: 'Bina Profil Pelajar' }
          ].map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveTab(mod.id as TabType)}
              className="p-3.5 rounded-xl bg-[#080B14] border border-indigo-950 hover:border-indigo-500/50 hover:bg-[#0D1322] text-left transition-all group shadow-sm hover:shadow-indigo-950/40 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-1">
                {mod.icon}
                <span className="font-semibold text-xs text-slate-200 group-hover:text-indigo-300 transition-colors">{mod.title}</span>
              </div>
              <p className="text-[11px] text-slate-500">{mod.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
