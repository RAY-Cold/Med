import React, { useState } from 'react';
import { Sparkles, FileText, Download, Play, CheckCircle, RefreshCcw, Smile } from 'lucide-react';

export default function WorksheetGenerator() {
  const [ageGroup, setAgeGroup] = useState('4-6');
  const [phonicsTarget, setPhonicsTarget] = useState('G-consonants');
  const [theme, setTheme] = useState('Space Adventure');
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');
  const [generatedSheet, setGeneratedSheet] = useState<string | null>(null);

  const handleGenerate = () => {
    setStatus('generating');
    setTimeout(() => {
      setStatus('done');
      setGeneratedSheet(`
        === VERBAL COACH CLINICAL SHEET ===
        PHONICS FOCUS: [${phonicsTarget.toUpperCase()}]
        AGE COGNITION LEVEL: [AGES ${ageGroup}]
        THEME ATMOSPHERE: [${theme.toUpperCase()}]
        
        ACTIVITY 1: Sound Rocket Launches 🚀
        Speak the target sound "${phonicsTarget.slice(0, 1)}" five times to help the rocket launch!
        - [ ] Speak "Guh-Guh-Guh" (Level Match: Perfect)
        - [ ] Speak "Gah-Gah-Gah" (Level Match: Good)
        
        ACTIVITY 2: Space Alien Conversation 👽
        The alien says "${phonicsTarget.split('-')[0]}o-Go". Repeat together with your caregiver!
      `);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-2xl space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Module Engine</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Worksheet Generator Interface</h1>
          <p className="text-slate-500 text-sm mt-1">Construct instant clinical worksheets based on patient phonics targets.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Age Bracket</label>
            <select 
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700"
            >
              <option value="3-5">Toddler (Ages 3-5)</option>
              <option value="4-6">Early Childhood (Ages 4-6)</option>
              <option value="7-10">Primary School (Ages 7-10)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Phonics Cluster</label>
            <select 
              value={phonicsTarget}
              onChange={(e) => setPhonicsTarget(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700"
            >
              <option value="G-consonants">G-consonants (Guh)</option>
              <option value="S-blends">S-blends (Sp, St, Sl)</option>
              <option value="Vowel-transitions">Vowels (Ah, Oh, Ee)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Visual Atmosphere</label>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700"
            >
              <option value="Space Adventure">Space Adventure</option>
              <option value="Jungle Safari">Jungle Safari</option>
              <option value="Undersea Quest">Undersea Quest</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button 
            disabled={status === 'generating'}
            onClick={handleGenerate}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-50 transition-all"
          >
            <Sparkles size={16} className="animate-spin-slow" /> Generate Worksheet
          </button>
        </div>
      </div>

      {status === 'generating' && (
        <div className="bg-white p-12 text-center rounded-[2rem] border border-slate-200 shadow-xl space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto animate-spin" />
          <p className="text-sm font-bold text-slate-700 leading-relaxed">Synthesizing cartoon pictograms & vowel ladders...</p>
        </div>
      )}

      {status === 'done' && generatedSheet && (
        <div className="bg-slate-900 text-slate-300 p-8 rounded-[2rem] border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden animate-fade-in font-mono text-xs">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button 
              onClick={() => { alert('Downloaded worksheet content PDF artifact!'); }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-1.5 hover:bg-indigo-550 transition uppercase tracking-wider text-[10px]"
            >
              <Download size={14} /> Download PDF
            </button>
            <button 
              onClick={() => setStatus('idle')}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition text-slate-400 hover:text-white"
            >
              <RefreshCcw size={14} />
            </button>
          </div>

          <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
            <CheckCircle className="text-emerald-400" size={18} />
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Verified compilation output</span>
          </div>

          <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 select-all p-4 bg-slate-950/80 rounded-xl border border-slate-800/60 max-h-[300px] overflow-auto no-scrollbar shadow-inner">
            {generatedSheet}
          </pre>
        </div>
      )}
    </div>
  );
}
