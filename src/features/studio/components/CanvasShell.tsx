import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Save, Send, Eye, Plus, Settings, History, Layers, 
  MousePointer2, Zap, Database, FileCode, Play, Terminal, 
  RotateCcw, Sparkles, Printer, Sliders, Layout, RefreshCw, 
  QrCode, Smartphone, ZoomIn, ZoomOut, Check, ArrowLeft, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CanvasShell() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isNew = searchParams.get('new') === '1';
  const blueprintId = searchParams.get('blueprintId');
  const templateId = searchParams.get('templateId');
  const toolName = searchParams.get('name') || 'Clinical Protocol';
  const toolDomain = searchParams.get('domain') || 'Behavioral Therapy';
  const medium = (searchParams.get('medium') || 'interactive') as 'interactive' | 'hybrid' | 'print';

  // State configurations for the dynamic canvas modes
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'Canvas shell initialized.',
    `Domain recognized: ${toolDomain}`,
    `Ready for custom nodes additions.`
  ]);
  const [selectedPaperSize, setSelectedPaperSize] = useState<'letter' | 'a4'>('letter');
  const [paperMargins, setPaperMargins] = useState<number>(0.5);
  const [showRulers, setShowRulers] = useState(true);
  const [isSynced, setIsSynced] = useState(true);
  const [dualViewRatio, setDualViewRatio] = useState<number>(50); // 50/50 split for hybrid

  // Mock added nodes lists based on medium
  const [canvasNodes, setCanvasNodes] = useState<{ id: string; name: string; x: number; y: number; type: string }[]>([]);

  // Simulate logs tick when running
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      const simulatedLogs = [
        'Patient response triggered.',
        'Analyzing vocal phonetics coefficient...',
        'Restructuring schema callback updated.',
        'Session metrics auto-calculated (Confidence rating: 94.2%).',
        'State persisted successfully.'
      ];
      const randomLog = simulatedLogs[Math.floor(Math.random() * simulatedLogs.length)];
      setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${randomLog}`, ...prev]);
    }, 2500);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleAddNode = (typeName: string) => {
    const newNode = {
      id: `node-${Date.now()}`,
      name: typeName,
      x: Math.floor(Math.random() * 200) + 100,
      y: Math.floor(Math.random() * 200) + 100,
      type: typeName
    };
    setCanvasNodes((prev) => [...prev, newNode]);
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] Added node: ${typeName}`, ...prev]);
  };

  const handleClearNodes = () => {
    setCanvasNodes([]);
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] Cleared canvas nodes.`, ...prev]);
  };

  // Select node toolkit options based on selected medium
  const getSidebarNodes = () => {
    switch (medium) {
      case 'print':
        return [
          { name: 'CBT Restructuring Table', icon: Layout },
          { name: 'Multiple Choice Checkbox Group', icon: Sliders },
          { name: 'Structured Daily Journal Line', icon: FileCode },
          { name: 'Signature Authorization Block', icon: Plus },
          { name: 'Clinical Assessment Rating', icon: Play },
          { name: 'Standard Instruction Block', icon: Info }
        ];
      case 'hybrid':
        return [
          { name: 'QR Code Synchronization Link', icon: QrCode },
          { name: 'Patient Companion SMS Prompt', icon: Smartphone },
          { name: 'Real-time Synchronized Timer', icon: RefreshCw },
          { name: 'Manual Offline Entry Proxy', icon: Database },
          { name: 'Audio Phonetic Record Sync', icon: Zap }
        ];
      case 'interactive':
      default:
        return [
          { name: 'Live Speech-to-Text Input', icon: Zap },
          { name: 'Dynamic Sound Feedback Node', icon: Play },
          { name: 'Interactive Subjective Scale 1-10', icon: Sliders },
          { name: 'Sequential Decision Logic Trigger', icon: Database },
          { name: 'Clinical Alarm Callback', icon: Terminal }
        ];
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col bg-slate-900 border border-slate-705 rounded-[2.5rem] overflow-hidden shadow-2xl text-slate-100 font-sans">
      
      {/* 1. HEADER BAR */}
      <div className="h-16 bg-slate-950 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/clinician/studio/templates')}
            className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-white"
            title="Back to Templates"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                medium === 'interactive' 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : medium === 'hybrid' 
                  ? 'bg-blue-500/20 text-blue-300' 
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {medium === 'interactive' ? 'Interactive Digital' : medium === 'hybrid' ? 'Hybrid Integrated' : 'Printable Static'} Canvas
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-slate-400 font-mono">{toolName}</span>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-xl text-xs font-black text-slate-300 hover:text-white transition-all uppercase tracking-widest border border-white/5">
            <Save size={14} /> Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-xl text-xs font-black text-slate-300 hover:text-white transition-all uppercase tracking-widest border border-white/5">
            <Eye size={14} /> Preview
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-indigo-600/30 uppercase tracking-widest">
            <Send size={14} /> Publish Schema
          </button>
        </div>
      </div>

      {/* 2. SUB-CONTEXT HUD BAR */}
      <div className="h-12 bg-slate-900 border-b border-white/5 px-6 flex items-center justify-between text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-indigo-400" />
            <span className="font-bold">Schema Origin:</span>
            <span className="text-slate-300 font-mono">
              {blueprintId ? `Blueprint ID: ${blueprintId}` : templateId ? `Template ID: ${templateId}` : 'Direct Authoring Custom'}
            </span>
          </div>
          {medium === 'hybrid' && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Smartphone size={12} /> Smartphone Companion App Sync Link Live
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="font-bold text-[10px] bg-slate-850 px-2 py-1 rounded border border-white/5 uppercase">
            Total nodes added: {canvasNodes.length}
          </span>
          {canvasNodes.length > 0 && (
            <button 
              onClick={handleClearNodes}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              Clear Canvas
            </button>
          )}
        </div>
      </div>

      {/* 3. WORKING GRID SEGMENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR: NODE PALETTE */}
        <aside className="w-72 border-r border-white/5 flex flex-col bg-slate-950 shrink-0 select-none">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center justify-between">
              <span>Node Toolbox Palette</span>
              <Sparkles size={12} className="text-indigo-400" />
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">Click nodes to place them into the editor grid workspace.</p>
          </div>

          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto custom-scrollbar">
            {getSidebarNodes().map((item) => (
              <div
                key={item.name}
                onClick={() => handleAddNode(item.name)}
                className="p-3 bg-slate-900 border border-white/5 hover:border-indigo-500 rounded-xl text-xs font-bold text-slate-300 cursor-pointer hover:bg-slate-850 hover:text-white hover:shadow-xl transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600/20 group-hover:text-indigo-400 transition-colors">
                  <item.icon size={16} />
                </div>
                <span className="line-clamp-1">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/5 space-y-2 bg-slate-900/30 text-xs">
            <div className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Workspace Tools</div>
            <button className="w-full py-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-left flex items-center gap-2.5 px-2">
              <Settings size={14} /> Configure Properties
            </button>
            <button className="w-full py-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-left flex items-center gap-2.5 px-2">
              <History size={14} /> Activity Blueprint History
            </button>
          </div>
        </aside>

        {/* MAIN DESIGN PANEL (DYNAMIC STYLING) */}
        <main className="flex-1 relative bg-slate-950 overflow-hidden flex flex-col">
          
          {/* A. PREVIEW & CONTROLS FOR INTERACTIVE DIGITAL MEDIUM */}
          {medium === 'interactive' && (
            <div className="flex-1 relative flex flex-col">
              {/* Simulator Action overlay */}
              <div className="absolute top-4 right-4 z-20 bg-slate-900 p-2 rounded-xl border border-white/10 flex items-center gap-2">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                    isSimulating 
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg animate-pulse' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw size={14} /> Stop Simulation
                    </>
                  ) : (
                    <>
                      <Play size={14} /> Run Clinical Simulator
                    </>
                  )}
                </button>
              </div>

              {/* Graphical nodes mapping viewport */}
              <div className="flex-1 relative border-b border-white/5 px-8 pt-16 flex items-center justify-center" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                <AnimatePresence>
                  {canvasNodes.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-4 max-w-xs"
                    >
                      <div className="w-16 h-16 bg-slate-900 border-2 border-dashed border-slate-700 rounded-2xl mx-auto flex items-center justify-center text-slate-500">
                        <Plus size={28} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-300">Empty Digital Canvas</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Place behavioral logic or speech measurement nodes from the toolkit to model digital therapist responses.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full relative p-6">
                      {canvasNodes.map((node) => (
                        <motion.div
                          key={node.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute bg-slate-900/90 border-2 border-indigo-500 p-4 rounded-xl min-w-[200px] shadow-2xl"
                          style={{ left: `${node.x}px`, top: `${node.y}px` }}
                        >
                          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                            <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Logic Node</span>
                            <Zap size={12} className="text-yellow-400" />
                          </div>
                          <div className="text-xs font-bold text-slate-100">{node.name}</div>
                          <div className="text-[9px] text-slate-500 font-mono mt-1">Event: onClick / triggerOutput</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simulated Real-time callbacks status console */}
              <div className="h-44 bg-slate-950 border-t border-white/5 flex flex-col">
                <div className="px-4 py-2 bg-slate-900 text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-white/5 justify-between">
                  <span className="flex items-center gap-2">
                    <Terminal size={14} className="text-purple-400" /> Live Simulation Event Loop Output Console
                  </span>
                  {isSimulating && (
                    <span className="text-[10px] text-green-400 animate-pulse font-mono">● LIVE INTEGRATION ACTIVE</span>
                  )}
                </div>
                <div className="flex-1 p-4 font-mono text-xs text-slate-400 space-y-1.5 overflow-y-auto custom-scrollbar bg-slate-950">
                  {logs.map((log, i) => (
                    <div key={i} className="leading-relaxed whitespace-pre-wrap">
                      <span className="text-slate-600">[{i}]</span> {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* B. PREVIEW & CONTROLS FOR HYBRID INTEGRATED MEDIUM */}
          {medium === 'hybrid' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Slider ratio selector layout */}
              <div className="p-3 bg-slate-900 border-b border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold flex items-center gap-1.5">
                  <Layers size={14} /> Dual-pane layout mode
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-mono">Offline Form Schema {dualViewRatio}%</span>
                  <input 
                    type="range" 
                    min={20} 
                    max={80} 
                    value={dualViewRatio}
                    onChange={(e) => setDualViewRatio(Number(e.target.value))}
                    className="w-32 accent-blue-500 cursor-pointer h-1" 
                  />
                  <span className="text-[11px] font-mono">Digital Action Hub {100 - dualViewRatio}%</span>
                </div>
              </div>

              {/* Dual-view visual space */}
              <div className="flex-1 flex">
                {/* 1. Offline checklist representation */}
                <div 
                  className="border-r border-white/5 p-6 flex flex-col justify-between"
                  style={{ width: `${dualViewRatio}%` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Printer size={12} /> Physical Printed Paper Form Schema
                      </span>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 border border-white/5 space-y-4 shadow-xl">
                      <div className="h-6 w-1/3 bg-slate-800 rounded animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-slate-850 rounded" />
                        <div className="h-4 w-3/4 bg-slate-850 rounded" />
                      </div>
                      <div className="border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center text-xs text-slate-500">
                        Physical Checklist Grid Boundaries
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Info size={12} /> Physical form items will display automated sync markers.
                  </div>
                </div>

                {/* 2. Client mobile-synchronized representation */}
                <div 
                  className="bg-slate-950/50 p-6 flex flex-col"
                  style={{ width: `${100 - dualViewRatio}%` }}
                >
                  <div className="space-y-4 flex-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Smartphone size={12} /> Smartphone Companion Trigger App Preview
                    </span>

                    <div className="mx-auto w-48 h-80 border-4 border-slate-800 rounded-[2rem] p-3 flex flex-col justify-between bg-slate-950 shadow-2xl relative">
                      <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto" />
                      
                      <div className="flex-1 py-4 flex flex-col justify-center items-center text-center space-y-2">
                        <RefreshCw size={24} className="text-blue-400 animate-spin" />
                        <div className="text-[10px] font-bold text-slate-300">Awaiting Form Entry</div>
                        <div className="text-[8px] text-slate-500 max-w-[120px]">
                          Once clinician scans physical QR code page, triggers prompt instantly on device.
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full border border-slate-800 bg-slate-900 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* C. PREVIEW & CONTROLS FOR PRINT MEDIUM */}
          {medium === 'print' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* Toolkit settings */}
              <div className="p-3 bg-slate-900 border-b border-white/5 flex items-center justify-between text-xs text-slate-450">
                <div className="flex items-center gap-6">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                    <Printer size={14} /> Printable Layout Standard Toolset
                  </span>
                  <div className="flex items-center gap-2">
                    <span>Page Size:</span>
                    <button 
                      onClick={() => setSelectedPaperSize('letter')}
                      className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold ${selectedPaperSize === 'letter' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Letter (ANSI A)
                    </button>
                    <button 
                      onClick={() => setSelectedPaperSize('a4')}
                      className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold ${selectedPaperSize === 'a4' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      A4 (ISO)
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Margins (inches):</span>
                    <select 
                      value={paperMargins}
                      onChange={(e) => setPaperMargins(parseFloat(e.target.value))}
                      className="bg-slate-850 px-2 py-0.5 rounded focus:outline-none"
                    >
                      <option value={0.25}>0.25" Narrow</option>
                      <option value={0.5}>0.5" Balanced</option>
                      <option value={1.0}>1.0" Generous</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showRulers}
                      onChange={(e) => setShowRulers(e.target.checked)}
                      className="rounded accent-indigo-600"
                    />
                    <span>Show Rulers</span>
                  </label>
                </div>
              </div>

              {/* Clean ruler guided paper visualizer */}
              <div className="flex-1 p-8 overflow-auto flex justify-center bg-slate-900/60 custom-scrollbar relative">
                
                {showRulers && (
                  <>
                    {/* Horizontal ruler */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-slate-950 border-b border-white/5 font-mono text-[8px] text-slate-600 flex items-center justify-between px-16 select-none leading-none z-10">
                      {['0"', '1"', '2"', '3"', '4"', '5"', '6"', '7"', '8"', '8.5"'].map((v) => (
                        <span key={v}>{v}</span>
                      ))}
                    </div>
                    {/* Vertical ruler */}
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-slate-950 border-r border-white/5 font-mono text-[8px] text-slate-600 flex flex-col justify-between py-16 select-none z-10">
                      {['0"', '2"', '4"', '6"', '8"', '10"', '11"'].map((v) => (
                        <div key={v} className="rotate-90 origin-left mt-1 text-center">{v}</div>
                      ))}
                    </div>
                  </>
                )}

                {/* White paper layout card */}
                <div 
                  className={`bg-white rounded-md shadow-2xl border border-slate-350 p-12 text-slate-900 transition-all ${
                    selectedPaperSize === 'letter' ? 'w-[540px] h-[698px]' : 'w-[520px] h-[735px]'
                  }`}
                  style={{ padding: `${paperMargins * 96}px` }}
                >
                  <div className="h-full border border-slate-100 flex flex-col justify-between p-4 relative">
                    
                    {/* Page outline guides */}
                    <div className="absolute inset-0 border border-dashed border-slate-200 pointer-events-none" />

                    <div>
                      {/* Document template structure */}
                      <div className="flex justify-between items-start border-b border-slate-300 pb-3 mb-6">
                        <div>
                          <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-mono">
                            {toolDomain}
                          </div>
                          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none mt-1">
                            {toolName}
                          </h1>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 text-right uppercase">
                          Page 1 of 1
                        </div>
                      </div>

                      {/* Render custom nodes as rows or checklist items inside print layout */}
                      <div className="space-y-4">
                        {canvasNodes.length === 0 ? (
                          <div className="py-12 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                            Drag-and-drop structural elements from sidebar node list into print template.
                          </div>
                        ) : (
                          canvasNodes.map((node, index) => (
                            <div key={node.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Element {index + 1}: {node.type}</div>
                              <div className="text-xs font-bold text-slate-800 mt-1">{node.name}</div>
                              <div className="h-8 border-b border-dashed border-slate-200 mt-2" />
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-[10px] text-slate-450">
                      <div>Clinical Protocol Form • Author Session</div>
                      <div className="font-mono">TLM Studio Printable Hub</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
