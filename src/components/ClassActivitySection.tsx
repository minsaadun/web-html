import React, { useState } from 'react';
import { 
  Users, 
  Layers, 
  FileCode, 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  FolderArchive
} from 'lucide-react';
import { TabType, UserProgress } from '../types';

interface ClassActivityProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

const PAGE_INDEX = `<!DOCTYPE html>
<html>
<head>
  <title>Kolej Komuniti - Laman Utama</title>
</head>
<body style="font-family: sans-serif; margin: 0; padding: 20px; color: #1e293b;">

  <!-- Navigasi Menu -->
  <nav style="background: #0f172a; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px;">
    <a href="index.html" style="color: #38bdf8; text-decoration: none; font-weight: bold; margin-right: 15px;">Utama</a>
    <a href="program.html" style="color: #cbd5e1; text-decoration: none; margin-right: 15px;">Program Pengajian</a>
    <a href="daftar.html" style="color: #cbd5e1; text-decoration: none;">Pendaftaran</a>
  </nav>

  <!-- Header & Banner -->
  <header style="background: #e0f2fe; padding: 25px; border-radius: 8px; border-left: 5px solid #0284c7;">
    <h1 style="color: #0369a1; margin: 0 0 8px 0;">Selamat Datang ke Kolej Komuniti</h1>
    <p style="margin: 0; color: #334155;">Peneraju Pendidikan Teknikal dan Latihan Vokasional (TVET) Terunggul.</p>
  </header>

  <!-- Kandungan Utama -->
  <main style="margin-top: 25px;">
    <h2>Mengenai Institusi Kami</h2>
    <p>Kolej Komuniti menawarkan pelbagai kursus berkualiti tinggi bagi melahirkan tenaga kerja mahir dan separa mahir dalam sektor teknologi digital dan industri moden.</p>
    
    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80" alt="Suasana Pembelajaran Kampus" style="width: 100%; max-width: 500px; border-radius: 8px; margin-top: 10px;">
  </main>

  <!-- Footer -->
  <footer style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 13px; color: #64748b;">
    <p>&copy; 2026 Kolej Komuniti Malaysia. Hak Cipta Terpelihara.</p>
  </footer>

</body>
</html>`;

const PAGE_PROGRAM = `<!DOCTYPE html>
<html>
<head>
  <title>Kolej Komuniti - Program Pengajian</title>
</head>
<body style="font-family: sans-serif; margin: 0; padding: 20px; color: #1e293b;">

  <!-- Navigasi Menu -->
  <nav style="background: #0f172a; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px;">
    <a href="index.html" style="color: #cbd5e1; text-decoration: none; margin-right: 15px;">Utama</a>
    <a href="program.html" style="color: #38bdf8; text-decoration: none; font-weight: bold; margin-right: 15px;">Program Pengajian</a>
    <a href="daftar.html" style="color: #cbd5e1; text-decoration: none;">Pendaftaran</a>
  </nav>

  <h1>Senarai Program Pengajian Ditawarkan</h1>
  <p>Berikut adalah program Sijil sepenuh masa yang ditawarkan bagi kemasukan sesi ini:</p>

  <!-- Senarai Program -->
  <ul>
    <li><strong>STM</strong> - Sijil Teknologi Maklumat (Pembangunan Web & Pengaturcaraan)</li>
    <li><strong>STK</strong> - Sijil Teknologi Komputer & Rangkaian</li>
    <li><strong>STS</strong> - Sijil Sistem Siber & Keselamatan Data</li>
  </ul>

  <!-- Jadual Tempoh Pengajian -->
  <h3>Jadual Tempoh & Yuran Pengajian</h3>
  <table border="1" style="border-collapse: collapse; width: 100%; max-width: 600px; text-align: left;">
    <tr style="background: #f1f5f9; color: #0f172a;">
      <th style="padding: 10px;">Program</th>
      <th style="padding: 10px;">Tempoh Pengajian</th>
      <th style="padding: 10px;">Syarat Kelayakan</th>
    </tr>
    <tr>
      <td style="padding: 8px;">Sijil Teknologi Maklumat</td>
      <td style="padding: 8px;">2 Tahun (4 Semester)</td>
      <td style="padding: 8px;">Lulus SPM dengan 1 Kredit</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Sijil Teknologi Komputer</td>
      <td style="padding: 8px;">2 Tahun (4 Semester)</td>
      <td style="padding: 8px;">Lulus SPM dengan 1 Kredit</td>
    </tr>
  </table>

</body>
</html>`;

const PAGE_DAFTAR = `<!DOCTYPE html>
<html>
<head>
  <title>Kolej Komuniti - Pendaftaran Pelajar</title>
</head>
<body style="font-family: sans-serif; margin: 0; padding: 20px; color: #1e293b;">

  <!-- Navigasi Menu -->
  <nav style="background: #0f172a; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px;">
    <a href="index.html" style="color: #cbd5e1; text-decoration: none; margin-right: 15px;">Utama</a>
    <a href="program.html" style="color: #cbd5e1; text-decoration: none; margin-right: 15px;">Program Pengajian</a>
    <a href="daftar.html" style="color: #38bdf8; text-decoration: none; font-weight: bold;">Pendaftaran</a>
  </nav>

  <h1>Borang Permohonan Kemasukan Pelajar</h1>
  <p>Sila lengkapkan butiran di bawah untuk mendaftar sebagai pelajar baharu.</p>

  <form action="proses_daftar.php" method="POST" style="max-width: 500px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
    <div style="margin-bottom: 12px;">
      <label for="nama">Nama Penuh:</label><br>
      <input type="text" id="nama" name="nama" placeholder="Seperti dalam MyKad" style="width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box;">
    </div>

    <div style="margin-bottom: 12px;">
      <label>Jantina:</label><br>
      <input type="radio" id="lelaki" name="jantina" value="L"> <label for="lelaki">Lelaki</label> &nbsp;
      <input type="radio" id="perempuan" name="jantina" value="P"> <label for="perempuan">Perempuan</label>
    </div>

    <div style="margin-bottom: 12px;">
      <label for="program">Pilihan Program:</label><br>
      <select id="program" name="program" style="width: 100%; padding: 8px; margin-top: 4px;">
        <option value="STM">Sijil Teknologi Maklumat (STM)</option>
        <option value="STK">Sijil Teknologi Komputer (STK)</option>
      </select>
    </div>

    <div style="margin-bottom: 15px;">
      <label for="alamat">Alamat Surat Menyurat:</label><br>
      <textarea id="alamat" name="alamat" rows="3" style="width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box;"></textarea>
    </div>

    <button type="submit" style="background: #0284c7; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 6px; cursor: pointer;">
      HANTAR PERMOHONAN
    </button>
  </form>

</body>
</html>`;

export const ClassActivitySection: React.FC<ClassActivityProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [selectedFile, setSelectedFile] = useState<'index' | 'program' | 'daftar'>('index');
  const [copied, setCopied] = useState(false);

  const fileMap = {
    index: { name: 'index.html', title: 'Halaman 1: Utama (index.html)', code: PAGE_INDEX },
    program: { name: 'program.html', title: 'Halaman 2: Program Pengajian (program.html)', code: PAGE_PROGRAM },
    daftar: { name: 'daftar.html', title: 'Halaman 3: Pendaftaran (daftar.html)', code: PAGE_DAFTAR },
  };

  const currentFileData = fileMap[selectedFile];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFileData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCurrent = () => {
    const blob = new Blob([currentFileData.code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileData.name;
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                SEKSYEN 21 • AKTIVITI BERKUMPULAN / CLASS ACTIVITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Bina Laman Web Mini Kolej Komuniti (3 Halaman)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-3.5 py-2.5 rounded-xl bg-[#080B14] text-slate-300 hover:text-white border border-indigo-950 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-[#0D1322] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Disalin' : 'Salin Fail Ini'}</span>
            </button>

            <button
              onClick={handleDownloadCurrent}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Muat Turun {currentFileData.name}</span>
            </button>
          </div>
        </div>

        {/* Group Roles Definition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#080B14] p-4 rounded-2xl border border-indigo-950 space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">PELAJAR 1: Lead Layout</span>
              <span className="text-[10px] font-mono text-slate-500">index.html</span>
            </div>
            <p className="text-xs text-slate-300">
              Bertanggungjawab membina struktur utama, navigasi menu, banner, teks pengenalan dan gambar kampus.
            </p>
          </div>

          <div className="bg-[#080B14] p-4 rounded-2xl border border-indigo-950 space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">PELAJAR 2: Data Specialist</span>
              <span className="text-[10px] font-mono text-slate-500">program.html</span>
            </div>
            <p className="text-xs text-slate-300">
              Bertanggungjawab membina senarai teratur program pengajian dan jadual tempoh/yuran pengajian.
            </p>
          </div>

          <div className="bg-[#080B14] p-4 rounded-2xl border border-indigo-950 space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-400">PELAJAR 3: Form Architect</span>
              <span className="text-[10px] font-mono text-slate-500">daftar.html</span>
            </div>
            <p className="text-xs text-slate-300">
              Bertanggungjawab membina borang permohonan kemasukan lengkap dengan text box, radio button, select dan textarea.
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Page Tab Navigator */}
      <div className="flex items-center gap-2 border-b border-indigo-950 pb-2">
        <span className="text-xs font-mono text-slate-500 uppercase mr-2 font-bold">PILIH HALAMAN:</span>
        <button
          onClick={() => setSelectedFile('index')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            selectedFile === 'index'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-[#080B14] border border-indigo-950 text-slate-300 hover:bg-[#0D1322]'
          }`}
        >
          <FileCode className="w-4 h-4" /> index.html (Utama)
        </button>

        <button
          onClick={() => setSelectedFile('program')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            selectedFile === 'program'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-[#080B14] border border-indigo-950 text-slate-300 hover:bg-[#0D1322]'
          }`}
        >
          <FileCode className="w-4 h-4" /> program.html (Program)
        </button>

        <button
          onClick={() => setSelectedFile('daftar')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            selectedFile === 'daftar'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30'
              : 'bg-[#080B14] border border-indigo-950 text-slate-300 hover:bg-[#0D1322]'
          }`}
        >
          <FileCode className="w-4 h-4" /> daftar.html (Borang)
        </button>
      </div>

      {/* Workspace: Code & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Code viewer */}
        <div className="bg-[#080B14] rounded-3xl border border-indigo-950 shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#0D1322] px-4 py-3 border-b border-indigo-950 flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-300 font-bold">{currentFileData.title}</span>
            <span className="text-[11px] font-mono text-slate-500">Read-Only Sample Code</span>
          </div>

          <pre className="p-4 bg-[#080B14] font-mono text-xs text-indigo-300 leading-relaxed overflow-x-auto overflow-y-auto max-h-[480px]">
            {currentFileData.code}
          </pre>
        </div>

        {/* Live Preview */}
        <div className="bg-[#080B14] rounded-3xl border border-indigo-950 shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#0D1322] px-4 py-3 border-b border-indigo-950 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium">Live Website Preview ({currentFileData.name})</span>
          </div>

          <div className="flex-1 bg-white min-h-[480px]">
            <iframe
              title={`Preview of ${currentFileData.name}`}
              srcDoc={currentFileData.code}
              className="w-full h-full min-h-[480px] border-none bg-white"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
