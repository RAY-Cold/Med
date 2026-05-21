import React from 'react';
import { Sparkles, Layers, BookOpen, Download, Search, Tag, Cpu, Bookmark } from 'lucide-react';

export function ContentStudio() {
  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-10 max-w-4xl mx-auto shadow-2xl space-y-8 animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black text-indigo-600 tracking-wider">Shared Sandbox System</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Content Studio Core</h1>
        </div>
        <span className="px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold text-xs rounded-xl flex items-center gap-1.5"><Sparkles size={14} className="animate-spin-slow" /> Level Adaptive</span>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
        This is the shared environment where clinicians work together with system-defined guidelines or curriculum engines. Adaptations made here deploy to the Library instantly.
      </p>

      <div className="grid grid-cols-2 gap-6 pt-4">
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
          <h4 className="font-extrabold text-slate-800 text-sm">Adaptive Phonics Engine</h4>
          <p className="text-slate-400 text-xs">Synchronise target phonetic elements securely with home sandboxes automatically.</p>
        </div>
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
          <h4 className="font-extrabold text-slate-800 text-sm">Prosody & Speed parameters</h4>
          <p className="text-slate-400 text-xs">Verify sound waves pitch match parameters to ensure optimal gamified results.</p>
        </div>
      </div>
    </div>
  );
}

export function ContentLibrary() {
  const libraryItems = [
    { title: 'The G-Consonant Adventure Slide', goal: 'Dyspraxia voice match guidance', age: 'Ages 4-7' },
    { title: 'Syllabic Stutter Ladder Worksheets', goal: 'Timed rhythmic breathing grids', age: 'Ages 5-10' },
    { title: 'Action Pose Visual JPEGs Set', category: 'Therapy Core assets pack', age: 'Ages 3-6' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vocal Content Library</h1>
        <p className="text-slate-500 mt-1">Browse, view, or dispatch voice bio-assets across participant accounts.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-md space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search interactive vocal files, templates, worksheets, and blueprints..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
        </div>

        <div className="space-y-4 pt-4">
          {libraryItems.map((it, i) => (
            <div key={i} className="p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-300 rounded-2xl flex items-center justify-between transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{it.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{it.goal} • <span className="font-semibold text-slate-700">{it.age}</span></p>
                </div>
              </div>
              <button className="px-4 py-2 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 hover:text-indigo-600 rounded-xl text-xs font-black tracking-widest uppercase transition-all">Assign</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
