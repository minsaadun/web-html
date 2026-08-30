import React, { useState } from 'react';
import { 
  FormInput, 
  Layers, 
  CheckCircle, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  ArrowRight,
  Eye,
  Lock,
  ListFilter,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FormComponentItem, TabType, UserProgress } from '../types';

interface HtmlFormsProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

export const HtmlFormsSection: React.FC<HtmlFormsProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'demo' | 'explorer' | 'builder'>('demo');
  const [copied, setCopied] = useState(false);

  // Explorer active tool
  const [explorerTool, setExplorerTool] = useState<string>('text');

  // Form Builder state
  const [builderItems, setBuilderItems] = useState<FormComponentItem[]>([
    { id: '1', type: 'text', label: 'Nama Penuh', name: 'nama', placeholder: 'Masukkan nama pelajar' }
  ]);
  const [copiedBuilderCode, setCopiedBuilderCode] = useState(false);

  // Form Element definitions
  const FORM_TOOLS = [
    {
      id: 'text',
      name: 'Text Box (Kotak Teks)',
      tag: '<input type="text">',
      desc: 'Menerima input teks satu baris seperti nama, emel, atau no kad pengenalan.',
      code: '<label for="nama">Nama:</label>\n<input type="text" id="nama" name="nama" placeholder="Cth: Ali Bin Ahmad">',
      preview: '<div style="font-family: sans-serif;"><label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #1e293b;">Nama:</label><input type="text" placeholder="Cth: Ali Bin Ahmad" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px;"></div>'
    },
    {
      id: 'password',
      name: 'Password Field (Kata Laluan)',
      tag: '<input type="password">',
      desc: 'Menerima kata laluan dan menyembunyikan aksara secara automatik dengan bintik bulat keselamatan.',
      code: '<label for="katalaluan">Password:</label>\n<input type="password" id="katalaluan" name="katalaluan" placeholder="••••••••">',
      preview: '<div style="font-family: sans-serif;"><label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #1e293b;">Password:</label><input type="password" placeholder="••••••••" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px;"></div>'
    },
    {
      id: 'radio',
      name: 'Radio Button (Butang Pilihan Tunggal)',
      tag: '<input type="radio">',
      desc: 'Membolehkan pengguna memilih HANYA SATU pilihan daripada kumpulan dengan attribute name yang sama.',
      code: '<label>Jantina:</label><br>\n<input type="radio" id="lelaki" name="jantina" value="L">\n<label for="lelaki">Lelaki</label>\n<input type="radio" id="perempuan" name="jantina" value="P">\n<label for="perempuan">Perempuan</label>',
      preview: '<div style="font-family: sans-serif; font-size: 14px; color: #1e293b;"><label style="display: block; font-weight: 600; margin-bottom: 6px;">Jantina:</label><label style="margin-right: 16px; display: inline-flex; align-items: center; gap: 4px;"><input type="radio" name="preview_jantina" checked> Lelaki</label><label style="display: inline-flex; align-items: center; gap: 4px;"><input type="radio" name="preview_jantina"> Perempuan</label></div>'
    },
    {
      id: 'select',
      name: 'Combo Box / Dropdown (Menu Pilihan)',
      tag: '<select> & <option>',
      desc: 'Menghasilkan menu tarik-turun (drop-down) untuk memilih satu daripada senarai pilihan panjang.',
      code: '<label for="program">Pilih Program:</label>\n<select id="program" name="program">\n  <option value="STM">Sijil Teknologi Maklumat (STM)</option>\n  <option value="STK">Sijil Teknologi Komputer (STK)</option>\n  <option value="STS">Sijil Sistem Siber (STS)</option>\n</select>',
      preview: '<div style="font-family: sans-serif;"><label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #1e293b;">Pilih Program:</label><select style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; background: white;"><option>Sijil Teknologi Maklumat (STM)</option><option>Sijil Teknologi Komputer (STK)</option><option>Sijil Sistem Siber (STS)</option></select></div>'
    },
    {
      id: 'textarea',
      name: 'Text Area (Ruangan Teks Pelbagai Baris)',
      tag: '<textarea>',
      desc: 'Menerima teks panjang beberapa baris seperti alamat kediaman, komen atau catatan.',
      code: '<label for="alamat">Alamat Rumah:</label>\n<textarea id="alamat" name="alamat" rows="3" placeholder="Masukkan alamat lengkap..."></textarea>',
      preview: '<div style="font-family: sans-serif;"><label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #1e293b;">Alamat Rumah:</label><textarea placeholder="Masukkan alamat lengkap..." rows="2" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px;"></textarea></div>'
    },
    {
      id: 'button',
      name: 'Button / Submit (Butang Hantar)',
      tag: '<button> / <input type="submit">',
      desc: 'Memicu penghantaran keseluruhan data borang ke pelayan atau menjalankan skrip.',
      code: '<button type="submit" style="background: #0284c7; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer;">\n  HANTAR BORANG\n</button>',
      preview: '<div><button style="background: #0284c7; color: white; padding: 8px 18px; border: none; border-radius: 6px; font-weight: bold; font-size: 14px; cursor: pointer;">HANTAR BORANG</button></div>'
    }
  ];

  // Requirements for student registration form
  const hasText = builderItems.some(i => i.type === 'text' && (i.name.includes('nama') || i.name.includes('matrik')));
  const hasMatrix = builderItems.some(i => i.type === 'text' && (i.name.includes('matrik') || i.name.includes('pelajar') || i.label.toLowerCase().includes('matrik')));
  const hasRadio = builderItems.some(i => i.type === 'radio');
  const hasSelect = builderItems.some(i => i.type === 'select');
  const hasPassword = builderItems.some(i => i.type === 'password');
  const hasButton = builderItems.some(i => i.type === 'button');

  const completedCount = [hasText, hasMatrix, hasRadio, hasSelect, hasPassword, hasButton].filter(Boolean).length;

  const handleAddComponent = (type: FormComponentItem['type']) => {
    let newItem: FormComponentItem;
    if (type === 'text') {
      newItem = { id: Date.now().toString(), type: 'text', label: 'No. Pelajar', name: 'no_matrik', placeholder: 'Cth: STM2026-001' };
    } else if (type === 'radio') {
      newItem = { id: Date.now().toString(), type: 'radio', label: 'Jantina', name: 'jantina', options: ['Lelaki', 'Perempuan'] };
    } else if (type === 'select') {
      newItem = { id: Date.now().toString(), type: 'select', label: 'Program Pengajian', name: 'program', options: ['STM - Sijil Teknologi Maklumat', 'STK - Sijil Komputer', 'STS - Sijil Siber'] };
    } else if (type === 'textarea') {
      newItem = { id: Date.now().toString(), type: 'textarea', label: 'Alamat Rumah', name: 'alamat', placeholder: 'Alamat surat menyurat...' };
    } else if (type === 'password') {
      newItem = { id: Date.now().toString(), type: 'password', label: 'Kata Laluan Portal', name: 'password', placeholder: 'Minima 6 aksara' };
    } else {
      newItem = { id: Date.now().toString(), type: 'button', label: 'Daftar Sekarang', name: 'submit_btn' };
    }

    setBuilderItems([...builderItems, newItem]);

    if (completedCount >= 5) {
      onUpdateProgress({ formBuilderCompleted: true });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleRemoveBuilderItem = (id: string) => {
    setBuilderItems(builderItems.filter(item => item.id !== id));
  };

  const generateBuilderHtml = () => {
    let html = `<form action="register.php" method="POST">\n`;
    builderItems.forEach(item => {
      if (item.type === 'text') {
        html += `  <div>\n    <label for="${item.name}">${item.label}:</label>\n    <input type="text" id="${item.name}" name="${item.name}" placeholder="${item.placeholder || ''}">\n  </div>\n\n`;
      } else if (item.type === 'password') {
        html += `  <div>\n    <label for="${item.name}">${item.label}:</label>\n    <input type="password" id="${item.name}" name="${item.name}" placeholder="${item.placeholder || ''}">\n  </div>\n\n`;
      } else if (item.type === 'radio') {
        html += `  <div>\n    <label>${item.label}:</label><br>\n`;
        item.options?.forEach((opt, idx) => {
          html += `    <input type="radio" id="${item.name}_${idx}" name="${item.name}" value="${opt}">\n    <label for="${item.name}_${idx}">${opt}</label>\n`;
        });
        html += `  </div>\n\n`;
      } else if (item.type === 'select') {
        html += `  <div>\n    <label for="${item.name}">${item.label}:</label>\n    <select id="${item.name}" name="${item.name}">\n`;
        item.options?.forEach(opt => {
          html += `      <option value="${opt.split(' ')[0]}">${opt}</option>\n`;
        });
        html += `    </select>\n  </div>\n\n`;
      } else if (item.type === 'textarea') {
        html += `  <div>\n    <label for="${item.name}">${item.label}:</label>\n    <textarea id="${item.name}" name="${item.name}" rows="3" placeholder="${item.placeholder || ''}"></textarea>\n  </div>\n\n`;
      } else if (item.type === 'button') {
        html += `  <div>\n    <button type="submit">${item.label}</button>\n  </div>\n\n`;
      }
    });
    html += `</form>`;
    return html;
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Section Header */}
      <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">SEKSYEN 2.2</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Borang Web (HTML Forms)</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              HTML Form digunakan untuk mengumpulkan maklumat dan input pengguna sebelum dihantar ke server.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('demo')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'demo' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'bg-[#080B14] text-slate-300 border border-indigo-950 hover:bg-[#0D1322]'
              }`}
            >
              1. Demo Lengkap
            </button>
            <button
              onClick={() => setActiveSubTab('explorer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'explorer' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'bg-[#080B14] text-slate-300 border border-indigo-950 hover:bg-[#0D1322]'
              }`}
            >
              2. Form Tools
            </button>
            <button
              onClick={() => setActiveSubTab('builder')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'builder' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-md shadow-emerald-600/30' : 'bg-[#080B14] text-slate-300 border border-indigo-950 hover:bg-[#0D1322]'
              }`}
            >
              3. Form Builder 🛠️
            </button>
          </div>
        </div>
      </div>

      {/* 1. DEMO: BORANG PENDAFTARAN PELAJAR */}
      {activeSubTab === 'demo' && (
        <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-6 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
            <div>
              <h3 className="font-bold text-white text-lg">Contoh: Borang Pendaftaran Pelajar Kolej Komuniti</h3>
              <p className="text-xs text-slate-400">Lihat perbandingan antara borang visual dan kod HTML di sebelahnya.</p>
            </div>
            <button
              onClick={() => setActiveTab('get-post')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold underline cursor-pointer"
            >
              Fahami GET vs POST <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Rendered Visual Form */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 text-slate-900 shadow-xl space-y-4">
              <div className="border-b pb-3">
                <span className="text-[10px] font-mono uppercase bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded font-bold">
                  CONTOH VISUAL BROWSER
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">BORANG PENDAFTARAN PELAJAR</h4>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Penuh Pelajar:</label>
                  <input
                    type="text"
                    defaultValue="Ali Bin Ahmad"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jantina:</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="demo_jantina" defaultChecked /> Lelaki
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="demo_jantina" /> Perempuan
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Program Pengajian:</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900">
                    <option>Sijil Teknologi Maklumat (STM)</option>
                    <option>Sijil Teknologi Komputer (STK)</option>
                    <option>Sijil Sistem Siber (STS)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alamat Kediaman:</label>
                  <textarea
                    rows={2}
                    defaultValue="No. 12, Jalan Komuniti 3, 13200 Kepala Batas"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Password Portal:</label>
                  <input
                    type="password"
                    defaultValue="rahsia123"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  SUBMIT BORANG
                </button>
              </form>
            </div>

            {/* Right: Equivalent HTML Code */}
            <div className="lg:col-span-6 bg-[#080B14] rounded-2xl p-5 border border-indigo-950 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
                  KOD HTML BORANG:
                </span>
                <span className="text-[11px] font-mono text-slate-500">&lt;form&gt; tag</span>
              </div>

              <pre className="text-xs font-mono text-indigo-300 bg-[#0D1322] p-4 rounded-xl border border-indigo-950 overflow-x-auto leading-relaxed max-h-[380px]">
{`<form action="daftar.php" method="POST">

  <!-- Text Box -->
  <label for="nama">Nama Penuh:</label>
  <input type="text" id="nama" name="nama">

  <!-- Radio Button -->
  <label>Jantina:</label>
  <input type="radio" id="lelaki" name="jantina" value="L">
  <label for="lelaki">Lelaki</label>
  <input type="radio" id="perempuan" name="jantina" value="P">
  <label for="perempuan">Perempuan</label>

  <!-- Combo Box (Select) -->
  <label for="program">Program:</label>
  <select id="program" name="program">
    <option value="STM">STM</option>
    <option value="STK">STK</option>
  </select>

  <!-- Text Area -->
  <label for="alamat">Alamat:</label>
  <textarea id="alamat" name="alamat"></textarea>

  <!-- Password Field -->
  <label for="pwd">Password:</label>
  <input type="password" id="pwd" name="pwd">

  <!-- Button Submit -->
  <button type="submit">SUBMIT</button>

</form>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 2. FORM ELEMENT EXPLORER */}
      {activeSubTab === 'explorer' && (
        <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-6 shadow-xl shadow-black/20">
          <div className="border-b border-indigo-950 pb-3">
            <h3 className="font-bold text-white text-lg">Form Element Explorer (6 Tools Wajib)</h3>
            <p className="text-xs text-slate-400">Klik komponen untuk melihat fungsi, kod dan output interaktif.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left tool picker */}
            <div className="lg:col-span-4 space-y-2 bg-[#080B14] p-3 rounded-2xl border border-indigo-950 shadow-inner">
              <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold px-2 block">
                PILIH FORM TOOL:
              </span>
              {FORM_TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setExplorerTool(tool.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all text-left cursor-pointer ${
                    explorerTool === tool.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-[#0D1322]'
                  }`}
                >
                  <span>{tool.name.split(' ')[0]} {tool.name.split(' ')[1]}</span>
                  <span className="text-[10px] opacity-75">{tool.tag.slice(0, 10)}...</span>
                </button>
              ))}
            </div>

            {/* Right tool detailed card */}
            {(() => {
              const current = FORM_TOOLS.find(t => t.id === explorerTool) || FORM_TOOLS[0];
              return (
                <div className="lg:col-span-8 bg-[#080B14] p-6 rounded-2xl border border-indigo-950 space-y-5 shadow-inner">
                  <div className="border-b border-indigo-950 pb-3">
                    <span className="text-[10px] font-mono text-indigo-300 uppercase bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-800 font-bold shadow-sm">
                      TOOL DETAILS
                    </span>
                    <h4 className="text-xl font-bold text-white mt-1">{current.name}</h4>
                    <p className="text-xs text-indigo-300 font-mono mt-0.5">{current.tag}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">FUNGSI:</span>
                    <p className="text-xs text-slate-200 bg-[#0D1322] p-3 rounded-xl border border-indigo-950">
                      {current.desc}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">KOD HTML:</span>
                    <pre className="text-xs font-mono text-emerald-300 bg-[#0D1322] p-3 rounded-xl border border-indigo-950 overflow-x-auto">
                      {current.code}
                    </pre>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">LIVE OUTPUT:</span>
                    <div className="bg-white p-4 rounded-xl shadow-inner">
                      <div dangerouslySetInnerHTML={{ __html: current.preview }} />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 3. BUILD YOUR FORM (INTERACTIVE FORM BUILDER) */}
      {activeSubTab === 'builder' && (
        <div className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 space-y-6 shadow-xl shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-3">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                AKTIVITI INTERAKTIF
              </span>
              <h3 className="text-2xl font-extrabold text-white">Build Your Form: Student Registration Form</h3>
              <p className="text-xs text-slate-400 mt-1">
                Klik butang komponen di bawah untuk membina borang pendaftaran pelajar yang lengkap.
              </p>
            </div>

            {/* Progress pill */}
            <div className="flex items-center gap-2 bg-[#080B14] px-4 py-2 rounded-xl border border-indigo-950 shadow-sm">
              <span className="text-xs text-slate-400 font-mono">Keperluan Borang:</span>
              <span className="text-emerald-400 font-bold font-mono">{completedCount} / 6 Keperluan</span>
            </div>
          </div>

          {/* Checklist of Requirements */}
          <div className="bg-[#080B14] rounded-2xl p-4 border border-indigo-950 shadow-inner">
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block mb-2">
              KRITERIA WAJIB BORANG PENDAFTARAN PELAJAR:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border flex items-center gap-1.5 font-medium ${hasText ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-[#0D1322] border-indigo-950 text-slate-500'}`}>
                {hasText ? '✓' : '○'} Nama
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center gap-1.5 font-medium ${hasMatrix ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-[#0D1322] border-indigo-950 text-slate-500'}`}>
                {hasMatrix ? '✓' : '○'} No. Pelajar
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center gap-1.5 font-medium ${hasRadio ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-[#0D1322] border-indigo-950 text-slate-500'}`}>
                {hasRadio ? '✓' : '○'} Jantina
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center gap-1.5 font-medium ${hasSelect ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-[#0D1322] border-indigo-950 text-slate-500'}`}>
                {hasSelect ? '✓' : '○'} Program
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center gap-1.5 font-medium ${hasPassword ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-[#0D1322] border-indigo-950 text-slate-500'}`}>
                {hasPassword ? '✓' : '○'} Password
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center gap-1.5 font-medium ${hasButton ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-[#0D1322] border-indigo-950 text-slate-500'}`}>
                {hasButton ? '✓' : '○'} Submit Button
              </div>
            </div>
          </div>

          {/* Builder Action Toolbar */}
          <div className="bg-[#080B14] rounded-2xl p-4 border border-indigo-950 space-y-2 shadow-inner">
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">
              TAMBAH KOMPONEN BORANG:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAddComponent('text')}
                className="px-3.5 py-2 rounded-xl bg-[#0D1322] hover:bg-indigo-950 hover:border-indigo-500 border border-indigo-900/80 text-indigo-300 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" /> + Text Box (No. Pelajar)
              </button>
              <button
                onClick={() => handleAddComponent('radio')}
                className="px-3.5 py-2 rounded-xl bg-[#0D1322] hover:bg-indigo-950 hover:border-indigo-500 border border-indigo-900/80 text-indigo-300 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" /> + Radio Button (Jantina)
              </button>
              <button
                onClick={() => handleAddComponent('select')}
                className="px-3.5 py-2 rounded-xl bg-[#0D1322] hover:bg-indigo-950 hover:border-indigo-500 border border-indigo-900/80 text-indigo-300 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" /> + Combo Box (Program)
              </button>
              <button
                onClick={() => handleAddComponent('textarea')}
                className="px-3.5 py-2 rounded-xl bg-[#0D1322] hover:bg-indigo-950 hover:border-indigo-500 border border-indigo-900/80 text-indigo-300 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" /> + Text Area (Alamat)
              </button>
              <button
                onClick={() => handleAddComponent('password')}
                className="px-3.5 py-2 rounded-xl bg-[#0D1322] hover:bg-indigo-950 hover:border-indigo-500 border border-indigo-900/80 text-indigo-300 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" /> + Password
              </button>
              <button
                onClick={() => handleAddComponent('button')}
                className="px-3.5 py-2 rounded-xl bg-[#0D1322] hover:bg-emerald-950 hover:border-emerald-500 border border-emerald-900/80 text-emerald-300 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" /> + Submit Button
              </button>
            </div>
          </div>

          {/* Builder Workspace: Live Form Preview & Generated Code */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Live Form Canvas */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-5 text-slate-900 shadow-xl space-y-4 min-h-[350px]">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                  LIVE FORM PREVIEW:
                </span>
                <span className="text-xs font-bold text-indigo-700">Borang Pendaftaran</span>
              </div>

              {builderItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 italic">
                  Borang kosong. Klik butang komponen di atas untuk membina borang.
                </div>
              ) : (
                <div className="space-y-3">
                  {builderItems.map((item) => (
                    <div key={item.id} className="group relative p-3 rounded-xl border border-slate-200 hover:border-indigo-500 transition-colors shadow-sm">
                      <button
                        onClick={() => handleRemoveBuilderItem(item.id)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Buang elemen ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {item.type === 'text' && (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">{item.label}:</label>
                          <input
                            type="text"
                            placeholder={item.placeholder}
                            disabled
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-700"
                          />
                        </div>
                      )}

                      {item.type === 'password' && (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">{item.label}:</label>
                          <input
                            type="password"
                            placeholder={item.placeholder}
                            disabled
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-700"
                          />
                        </div>
                      )}

                      {item.type === 'radio' && (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">{item.label}:</label>
                          <div className="flex items-center gap-3">
                            {item.options?.map((opt, i) => (
                              <label key={i} className="text-xs flex items-center gap-1 text-slate-700">
                                <input type="radio" name={item.name} defaultChecked={i === 0} /> {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.type === 'select' && (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">{item.label}:</label>
                          <select className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700">
                            {item.options?.map((opt, i) => (
                              <option key={i}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {item.type === 'textarea' && (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">{item.label}:</label>
                          <textarea
                            rows={2}
                            placeholder={item.placeholder}
                            disabled
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-700"
                          />
                        </div>
                      )}

                      {item.type === 'button' && (
                        <div>
                          <button className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/30">
                            {item.label}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Clean Generated HTML Code */}
            <div className="lg:col-span-6 bg-[#080B14] rounded-2xl p-5 border border-indigo-950 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                  GENERATED HTML CODE:
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateBuilderHtml());
                    setCopiedBuilderCode(true);
                    setTimeout(() => setCopiedBuilderCode(false), 2000);
                  }}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono cursor-pointer"
                >
                  {copiedBuilderCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBuilderCode ? 'Disalin!' : 'Salin Kod'}</span>
                </button>
              </div>

              <pre className="text-xs font-mono text-indigo-300 bg-[#0D1322] p-4 rounded-xl border border-indigo-950 overflow-x-auto leading-relaxed max-h-[350px]">
                {generateBuilderHtml()}
              </pre>

              {completedCount === 6 && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-xs text-emerald-200 flex items-center justify-between shadow-md">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <strong>Hebat!</strong> Anda telah memenuhi semua 6 keperluan borang pendaftaran!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
