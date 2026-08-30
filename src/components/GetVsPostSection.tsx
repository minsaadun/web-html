import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Send, 
  Globe, 
  Lock, 
  Unlock, 
  CheckCircle, 
  Server, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowDown, 
  Sparkles,
  Info
} from 'lucide-react';
import { TabType, UserProgress } from '../types';

interface GetVsPostProps {
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  setActiveTab: (tab: TabType) => void;
}

export const GetVsPostSection: React.FC<GetVsPostProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  // Simulator State
  const [simName, setSimName] = useState('Ali');
  const [simProgram, setSimProgram] = useState('STM');
  const [simMethod, setSimMethod] = useState<'GET' | 'POST'>('GET');
  const [simSubmitted, setSimSubmitted] = useState(false);
  const [simHistory, setSimHistory] = useState<{ method: 'GET' | 'POST'; url: string; body?: string } | null>(null);

  const handleSubmitSimulator = (e: React.FormEvent) => {
    e.preventDefault();
    setSimSubmitted(true);

    const cleanName = encodeURIComponent(simName || 'Ali');
    const cleanProgram = encodeURIComponent(simProgram || 'STM');

    if (simMethod === 'GET') {
      setSimHistory({
        method: 'GET',
        url: `https://kolejkomuniti.edu.my/student.php?nama=${cleanName}&program=${cleanProgram}`,
      });
    } else {
      setSimHistory({
        method: 'POST',
        url: `https://kolejkomuniti.edu.my/student.php`,
        body: `nama=${cleanName}&program=${cleanProgram}`
      });
    }

    onUpdateProgress({ getPostSimulated: true });
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Section 15: Konsep GET vs POST */}
      <section className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">SEKSYEN 2.2.2</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">GET vs POST Methods</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Dua kaedah utama untuk menghantar data borang HTML ke pelayan (server).
            </p>
          </div>

          <span className="text-xs bg-[#080B14] text-indigo-300 px-3.5 py-1.5 rounded-full border border-indigo-900/80 font-medium">
            HTTP Transmission
          </span>
        </div>

        {/* Visual Pipeline Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GET Pipeline Card */}
          <div className="bg-[#080B14] rounded-2xl p-5 border border-amber-900/40 space-y-4 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
                METHOD="GET"
              </span>
              <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5" /> Terbuka pada URL
              </span>
            </div>

            {/* Pipeline Flow */}
            <div className="bg-[#0D1322] p-3 rounded-xl border border-indigo-950 space-y-2 text-center text-xs font-mono">
              <div className="p-1.5 rounded-lg bg-[#080B14] text-slate-300 border border-indigo-950/80">FORM DATA (Nama=Ali)</div>
              <ArrowDown className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="p-1.5 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800">
                URL ADDRESS BAR
              </div>
              <ArrowDown className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="p-1.5 rounded-lg bg-[#080B14] text-amber-300 border border-indigo-950/80">
                data kelihatan pada URL!
              </div>
            </div>

            <div className="bg-[#0D1322] p-3 rounded-xl text-xs font-mono text-amber-300 break-all border border-indigo-950">
              <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Contoh URL yang terhasil:</span>
              register.php?<strong className="text-amber-400 underline">nama=Ali&program=STM</strong>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Data boleh kelihatan dalam URL browser.</li>
              <li>Sesuai untuk fungsi carian (search) atau filter.</li>
              <li className="text-amber-400 font-semibold">TIDAK sesuai untuk kata laluan atau data sensitif.</li>
            </ul>
          </div>

          {/* POST Pipeline Card */}
          <div className="bg-[#080B14] rounded-2xl p-5 border border-emerald-900/40 space-y-4 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                METHOD="POST"
              </span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Selamat dalam Payload Body
              </span>
            </div>

            {/* Pipeline Flow */}
            <div className="bg-[#0D1322] p-3 rounded-xl border border-indigo-950 space-y-2 text-center text-xs font-mono">
              <div className="p-1.5 rounded-lg bg-[#080B14] text-slate-300 border border-indigo-950/80">FORM DATA (Nama=Ali)</div>
              <ArrowDown className="w-4 h-4 text-emerald-400 mx-auto" />
              <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                HTTP REQUEST BODY
              </div>
              <ArrowDown className="w-4 h-4 text-emerald-400 mx-auto" />
              <div className="p-1.5 rounded-lg bg-[#080B14] text-emerald-300 border border-indigo-950/80">
                URL kekal bersih & data tersembunyi
              </div>
            </div>

            <div className="bg-[#0D1322] p-3 rounded-xl text-xs font-mono text-emerald-300 break-all border border-indigo-950">
              <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Contoh URL Browser:</span>
              register.php <span className="text-slate-400 font-sans text-[11px]">(bersih tanpa parameter)</span>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Data dihantar melalui HTTP Request Body.</li>
              <li>Data tidak dipaparkan pada ruangan URL browser.</li>
              <li className="text-emerald-400 font-semibold">Sesuai untuk pendaftaran, login, dan transaksi.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 16: Interactive GET vs POST Simulator */}
      <section className="bg-[#0F172A]/90 rounded-3xl border border-indigo-950/80 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              SIMULATOR INTERAKTIF
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">GET vs POST Simulator</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Masukkan nama & program, pilih method, dan tekan submit untuk melihat perbezaan penghantaran data secara langsung.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Input Form */}
          <div className="lg:col-span-5 bg-[#080B14] p-5 rounded-2xl border border-indigo-950 space-y-4 shadow-inner">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-400" /> Borang Ujian Pelajar
            </h4>

            <form onSubmit={handleSubmitSimulator} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Nama:</label>
                <input
                  type="text"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0D1322] border border-indigo-900/80 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-400"
                  placeholder="Ali"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Program:</label>
                <input
                  type="text"
                  value={simProgram}
                  onChange={(e) => setSimProgram(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0D1322] border border-indigo-900/80 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-400"
                  placeholder="STM"
                  required
                />
              </div>

              {/* Method Selector */}
              <div>
                <label className="block font-bold text-slate-300 mb-2">Pilih HTTP Method:</label>
                <div className="grid grid-cols-2 gap-3">
                  <label 
                    className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                      simMethod === 'GET'
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-[#0D1322] border-indigo-950 text-slate-400 hover:bg-[#111A2E]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sim_method"
                      value="GET"
                      checked={simMethod === 'GET'}
                      onChange={() => setSimMethod('GET')}
                    />
                    <span className="font-bold font-mono">METHOD="GET"</span>
                  </label>

                  <label 
                    className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                      simMethod === 'POST'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-[#0D1322] border-indigo-950 text-slate-400 hover:bg-[#111A2E]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sim_method"
                      value="POST"
                      checked={simMethod === 'POST'}
                      onChange={() => setSimMethod('POST')}
                    />
                    <span className="font-bold font-mono">METHOD="POST"</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-get-post-sim"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-[1.02]"
              >
                SUBMIT (HANTAR DATA)
              </button>
            </form>
          </div>

          {/* Right: Simulated Browser & Network Inspector */}
          <div className="lg:col-span-7 space-y-4">
            {/* Simulated Browser Address Bar */}
            <div className="bg-[#080B14] rounded-2xl border border-indigo-950 p-4 space-y-2 shadow-inner">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" /> BROWSER ADDRESS BAR:
                </span>
                <span className="text-[10px] text-slate-500">Ruangan URL Pengguna</span>
              </div>

              <div className="p-3 bg-[#0D1322] rounded-xl border border-indigo-900/80 font-mono text-xs text-slate-300 break-all flex items-center gap-2">
                <span className="text-slate-500">🔒</span>
                {simHistory ? (
                  simHistory.method === 'GET' ? (
                    <div>
                      <span>https://kolejkomuniti.edu.my/student.php?</span>
                      <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold border border-amber-500/40">
                        nama={encodeURIComponent(simName)}&program={encodeURIComponent(simProgram)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>https://kolejkomuniti.edu.my/student.php</span>
                      <span className="text-emerald-400 text-[11px] ml-2 font-sans font-medium">(URL kekal bersih & selamat)</span>
                    </div>
                  )
                ) : (
                  <span className="text-slate-500 italic">Tekan SUBMIT untuk melihat URL...</span>
                )}
              </div>
            </div>

            {/* Simulated HTTP Request Packet Inspector */}
            <div className="bg-[#080B14] rounded-2xl border border-indigo-950 p-4 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-emerald-400" /> HTTP REQUEST PACKET:
                </span>
                <span className="text-xs font-bold text-indigo-400">{simMethod} REQUEST</span>
              </div>

              {simHistory ? (
                <div className="bg-[#0D1322] rounded-xl p-4 font-mono text-xs space-y-3 border border-indigo-950">
                  <div className="text-indigo-300">
                    <span className="text-emerald-400 font-bold">{simHistory.method}</span> /student.php HTTP/1.1
                  </div>
                  <div className="text-slate-400 text-[11px] space-y-0.5">
                    <div>Host: kolejkomuniti.edu.my</div>
                    <div>User-Agent: Mozilla/5.0 (TVET-Student-Lab)</div>
                    <div>Content-Type: application/x-www-form-urlencoded</div>
                  </div>

                  {/* Body display */}
                  <div className="pt-2 border-t border-indigo-950">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                      REQUEST BODY (PAYLOAD):
                    </span>
                    {simHistory.method === 'POST' ? (
                      <div className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-500/50 text-emerald-300 font-bold">
                        {simHistory.body}
                      </div>
                    ) : (
                      <div className="text-slate-500 italic text-[11px]">
                        [Body Kosong - Semua parameter dihantar melalui URL]
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-500 italic bg-[#0D1322] rounded-xl border border-indigo-950">
                  Tekan butang SUBMIT untuk menjalankan simulasi HTTP Request.
                </div>
              )}
            </div>

            {/* Key Takeaway box */}
            <div className="p-3.5 bg-indigo-950/40 border border-indigo-900/60 rounded-2xl text-xs text-slate-300 flex items-start gap-2.5 shadow-sm">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong>Kesimpulan TVET:</strong> Gunakan <code>GET</code> untuk carian awam atau penapisan data, dan sentiasa gunakan <code>POST</code> apabila memproses borang pendaftaran, kata laluan, atau data sensitif.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
