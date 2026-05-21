import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Save, Send, Eye, Plus, Settings, History, Layers, MousePointer2, Zap, Database, FileCode } from 'lucide-react';

export default function CanvasShell() {
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('new') === '1';
  const blueprintId = searchParams.get('blueprintId');
  const templateId = searchParams.get('templateId');

  return (
    <div className="h-[calc(100vh-240px)] flex flex-col bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-2xl">
      <div className="h-16 bg-slate-900 text-white flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
            <MousePointer2 size={18} className="text-indigo-400" />
            <span className="text-xs font-black uppercase tracking-[0.15em]">Select Mode</span>
          </div>
          <div className="h-8 w-px bg-slate-700 mx-2" />
          <div className="flex gap-2">
            {[Plus, Layers, Settings].map((Icon, i) => (
              <button key={i} className="p-2.5 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white">
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
            <Save size={18} /> Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
            <Eye size={18} /> Preview
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 uppercase tracking-widest">
            <Send size={18} /> Publish
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-72 border-r border-slate-100 flex flex-col bg-slate-50/50">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Nodes</h3>
          </div>
          <div className="flex-1 p-6 space-y-3 overflow-auto no-scrollbar">
            {['Input Field', 'Text Area', 'Scale 1-10', 'Multiple Choice', 'Image Upload', 'Signature'].map((node) => (
              <div
                key={node}
                className="p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 cursor-grab hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex items-center gap-4"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                {node}
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-slate-100 space-y-4">
            <button className="w-full flex items-center justify-between text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
              <span className="flex items-center gap-3"><Settings size={16} /> Properties</span>
            </button>
            <button className="w-full flex items-center justify-between text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
              <span className="flex items-center gap-3"><History size={16} /> History</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 relative bg-slate-50 overflow-hidden">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex flex-col gap-3">
            {isNew && (
              <div className="px-5 py-2.5 bg-white border border-indigo-100 rounded-full shadow-2xl flex items-center gap-3 text-indigo-600 text-xs font-black uppercase tracking-widest">
                <Zap size={16} /> Creating a new tool (Direct Build)
              </div>
            )}
            {blueprintId && (
              <div className="px-5 py-2.5 bg-white border border-emerald-100 rounded-full shadow-2xl flex items-center gap-3 text-emerald-600 text-xs font-black uppercase tracking-widest">
                <Database size={16} /> Cloned from Blueprint: {blueprintId}
              </div>
            )}
            {templateId && (
              <div className="px-5 py-2.5 bg-white border border-purple-100 rounded-full shadow-2xl flex items-center gap-3 text-purple-600 text-xs font-black uppercase tracking-widest">
                <FileCode size={16} /> Using Template: {templateId}
              </div>
            )}
          </div>

          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] mx-auto flex items-center justify-center text-slate-200">
                <Plus size={40} />
              </div>
              <div className="space-y-2">
                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm">Canvas Placeholder</p>
                <p className="text-slate-300 text-xs max-w-xs mx-auto leading-relaxed">
                  Drag nodes from the left sidebar to start building your therapeutic tool.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
