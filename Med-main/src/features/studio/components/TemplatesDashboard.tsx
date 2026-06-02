import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, Terminal, Printer, FileEdit, ArrowRight,
  Monitor, Layers, Database, Zap, Check, ChevronRight, 
  ChevronLeft, Sparkles, FileCode, Search, Filter, ShieldCheck,
  Tag, Info, HeartHandshake, Eye, Copy, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockBlueprints } from '../services/mockBlueprints';

// Define pre-built clinical reusable templates
const REUSABLE_TEMPLATES = [
  { id: 'cbt-panic', name: 'Panic Attack Cognitive Restructuring Schema', domain: 'Psychology', subdomain: 'CBT / Anxiety', desc: 'Step-by-step cognitive restructuring nodes for panic responses.' },
  { id: 'adhd-executive', name: 'ADHD Executive Function Schema Tool', domain: 'Neuropsychology', subdomain: 'Executive Training', desc: 'Self-monitoring checkpoints to train working memory and attention focus.' },
  { id: 'phono-bingo', name: 'Speech sound bingo & Phonation protocol', domain: 'Speech Therapy', subdomain: 'Articulation', desc: 'Gamified digital phonetic bingo nodes with continuous feedback.' },
  { id: 'acts-acceptance', name: 'ACT Defusion & Acceptance Worksheet Schema', domain: 'Psychology', subdomain: 'ACT / Stress', desc: 'Acceptance and Commitment metrics and defusion exercises.' },
];

export default function TemplatesDashboard() {
  const navigate = useNavigate();

  // Control whether the wizard is open and what parameters are selected
  const [activeFlow, setActiveFlow] = useState<'initialize' | 'shell' | 'print' | null>(null);

  // Wizard state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedMedium, setSelectedMedium] = useState<'interactive' | 'hybrid' | 'print' | null>(null);
  const [foundationType, setFoundationType] = useState<'blueprint' | 'direct' | null>(null);
  
  // Node Initialize state (Direct Build only)
  const [nodeHierarchy, setNodeHierarchy] = useState<'reusable-template' | 'fresh-tool' | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('cbt-panic');
  
  // Blueprint selection state
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string | null>(null);
  const [blueprintSearch, setBlueprintSearch] = useState('');
  const [blueprintFilter, setBlueprintFilter] = useState<'all' | 'verified'>('all');

  // Identity configuration state
  const [identity, setIdentity] = useState({
    name: '',
    label: 'Standard Tool',
    domain: 'Clinical Psychology',
    subdomain: 'Anxiety Management',
    description: '',
    intendedGoal: '',
    ageRange: 'Adults (18-65)',
    sessionDuration: '45 mins',
  });

  const handleStartFlow = (flowType: 'initialize' | 'shell' | 'print') => {
    setActiveFlow(flowType);
    if (flowType === 'shell') {
      setSelectedMedium('interactive');
      setFoundationType(null);
      setCurrentStep(2); // Skips step 1, goes straight to Foundation
    } else if (flowType === 'print') {
      setSelectedMedium('print');
      setFoundationType(null);
      setCurrentStep(2); // Skips step 1, goes straight to Foundation
    } else {
      setSelectedMedium(null);
      setFoundationType(null);
      setNodeHierarchy(null);
      setCurrentStep(1); // Full flow starting from Medium Selection
    }
  };

  const handleResetFlow = () => {
    setActiveFlow(null);
    setCurrentStep(1);
    setSelectedMedium(null);
    setFoundationType(null);
    setNodeHierarchy(null);
    setSelectedBlueprintId(null);
    setIdentity({
      name: '',
      label: 'Standard Tool',
      domain: 'Clinical Psychology',
      subdomain: 'Anxiety Management',
      description: '',
      intendedGoal: '',
      ageRange: 'Adults (18-65)',
      sessionDuration: '45 mins',
    });
  };

  const selectMediumInStep1 = (medium: 'interactive' | 'hybrid' | 'print') => {
    setSelectedMedium(medium);
    setTimeout(() => {
      setCurrentStep(2);
    }, 250);
  };

  const filteredBlueprints = mockBlueprints.filter((bp) => {
    const matchesSearch =
      bp.name.toLowerCase().includes(blueprintSearch.toLowerCase()) ||
      bp.domain.toLowerCase().includes(blueprintSearch.toLowerCase()) ||
      bp.subdomain.toLowerCase().includes(blueprintSearch.toLowerCase());

    const matchesFilter = blueprintFilter === 'all' || bp.verified;
    return matchesSearch && matchesFilter;
  });

  const isStepValid = () => {
    if (currentStep === 1) return !!selectedMedium;
    if (currentStep === 2) {
      if (!foundationType) return false;
      if (foundationType === 'blueprint') return !!selectedBlueprintId;
      if (foundationType === 'direct') {
        return !!nodeHierarchy && !!identity.name && !!identity.domain && !!identity.subdomain;
      }
    }
    if (currentStep === 3) {
      return !!identity.name && !!identity.domain && !!identity.subdomain;
    }
    return false;
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedMedium) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (activeFlow === 'shell' || activeFlow === 'print') {
        handleResetFlow();
      } else {
        setCurrentStep(1);
      }
    }
  };

  const handleComplete = () => {
    if (foundationType === 'blueprint') {
      // Passes selected blueprint and medium to the Interactive/Hybrid/Print Canvas
      navigate(`/clinician/studio/canvas?blueprintId=${selectedBlueprintId}&medium=${selectedMedium || 'interactive'}`);
    } else {
      const isTemplate = nodeHierarchy === 'reusable-template';
      const templateParam = isTemplate ? `&templateId=${selectedTemplateId}` : '';
      navigate(`/clinician/studio/canvas?new=1&medium=${selectedMedium || 'interactive'}${templateParam}&name=${encodeURIComponent(identity.name)}&domain=${encodeURIComponent(identity.domain)}`);
    }
  };

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        {!activeFlow ? (
          // --- PRIMARY DASHBOARD VIEW ---
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <FileCode className="text-indigo-600" size={36} /> Templates Cockpit
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                Design physical protocol forms, digital behavioral loops, or hybrid patient templates with maximum compliance.
              </p>
            </div>

            {/* Studio Entry Cards (Primary Actions) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 'initialize',
                  title: 'Initialize – Blank',
                  description: 'Select clinical medium (Interactive, Hybrid, or Print) and build from foundation blueprints or a clean direct canvas.',
                  actionText: 'Launch Now',
                  icon: PlusCircle,
                  color: 'bg-indigo-50 border-indigo-100 hover:border-indigo-400',
                  iconColor: 'bg-indigo-600 text-white',
                  shadowColor: 'hover:shadow-indigo-500/10',
                },
                {
                  id: 'shell',
                  title: 'Interactive Shell',
                  description: 'Load pre-built behavioral digital systems directly. Skips manual medium configuration and starts on Foundation Base setup.',
                  actionText: 'Build Digital Shell',
                  icon: Terminal,
                  color: 'bg-purple-50 border-purple-100 hover:border-purple-400',
                  iconColor: 'bg-purple-600 text-white',
                  shadowColor: 'hover:shadow-purple-500/10',
                },
                {
                  id: 'print',
                  title: 'Printable Forms',
                  description: 'Design static, physical session worksheets and protocol checklists. Skips medium setup and skips to print-specific canvas defaults.',
                  actionText: 'Design Printable',
                  icon: Printer,
                  color: 'bg-emerald-50 border-emerald-100 hover:border-emerald-400',
                  iconColor: 'bg-emerald-600 text-white',
                  shadowColor: 'hover:shadow-emerald-500/10',
                },
                {
                  id: 'worksheet',
                  title: 'Worksheet Generator',
                  description: 'AI-assisted, custom clinical therapy sheet auto-generation derived directly from behavioral schemas.',
                  actionText: 'Generate Sheets',
                  icon: FileEdit,
                  color: 'bg-orange-50 border-orange-100 hover:border-orange-400',
                  iconColor: 'bg-orange-600 text-white',
                  shadowColor: 'hover:shadow-orange-500/10',
                  href: '/clinician/studio/worksheet-generator',
                },
              ].map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={{ y: -6 }}
                  className={`relative p-8 rounded-[2rem] border bg-white shadow-sm flex flex-col justify-between transition-all duration-300 group cursor-pointer ${card.color} ${card.shadowColor}`}
                  onClick={() => {
                    if (card.href) {
                      navigate(card.href);
                    } else {
                      handleStartFlow(card.id as any);
                    }
                  }}
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.iconColor} shadow-md`}>
                      <card.icon size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{card.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-100/50 flex items-center justify-between text-xs font-black tracking-widest text-slate-700 group-hover:text-indigo-600 uppercase transition-all">
                    <span>{card.actionText}</span>
                    <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Template Library Overview */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Pre-Built Reusable Templates</h2>
                  <p className="text-slate-400 text-sm">Select schema standards that speed up clinical authoring sessions.</p>
                </div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                  {REUSABLE_TEMPLATES.length} Available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REUSABLE_TEMPLATES.map((tmpl) => (
                  <div key={tmpl.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase rounded">
                          {tmpl.domain}
                        </span>
                        <span className="text-slate-300">/</span>
                        <span className="text-xs text-slate-500 font-semibold">{tmpl.subdomain}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-base">{tmpl.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{tmpl.desc}</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/clinician/studio/canvas?new=1&medium=interactive&templateId=${tmpl.id}`)}
                      className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
                      title="Load this template on canvas"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          // --- TABBED INITIALIZE FLOW VIEW ---
          <motion.div
            key="initialize-flow-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header and Close button */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleResetFlow}
                  className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
                      {activeFlow === 'initialize' ? 'Initialize – Full Flow' : activeFlow === 'shell' ? 'Interactive Shell Builder' : 'Printable Creator'}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs text-slate-400 font-bold uppercase">Medium: {selectedMedium || 'Pending'}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">Configure Clinical Schema</h2>
                </div>
              </div>
              <button
                onClick={handleResetFlow}
                className="text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
              >
                Quit Flow
              </button>
            </div>

            {/* TAB BAR (Interactive flow representation) */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 mb-8">
              {[
                { step: 1 as const, name: '1. Select Medium', desc: 'Interactive / Hybrid / Print', hidden: activeFlow === 'shell' || activeFlow === 'print' },
                { step: 2 as const, name: '2. Choose Foundation', desc: 'Blueprint Registry vs Direct Authoring', hidden: false },
                { step: 3 as const, name: '3. Configure Identity', desc: 'Fine-tune metadata, name, domain', hidden: false },
              ]
                .filter((t) => !t.hidden)
                .map((tab) => {
                  const isActive = currentStep === tab.step;
                  const isCompleted = currentStep > tab.step || (tab.step === 1 && (activeFlow === 'shell' || activeFlow === 'print'));
                  return (
                    <button
                      key={tab.step}
                      disabled={!isCompleted && !isActive}
                      onClick={() => setCurrentStep(tab.step)}
                      className={`flex-1 py-3 px-4 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-md border-b-2 border-indigo-600'
                          : isCompleted
                          ? 'text-indigo-600 hover:bg-slate-200/50'
                          : 'text-slate-400 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest leading-none">
                        {isCompleted ? '✓ Completed' : `Step ${tab.step}`}
                      </div>
                      <div className="text-sm font-bold mt-1 line-clamp-1">{tab.name}</div>
                    </button>
                  );
                })}
            </div>

            {/* MAIN CARD BODY */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px] flex flex-col justify-between">
              {/* Progress Indicator Bar */}
              <div className="h-1 bg-slate-100">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500" 
                  style={{ width: `${(currentStep / 3) * 100}%` }} 
                />
              </div>

              <div className="p-10 flex-1">
                {/* --- TAB 1: MEDIUM --- */}
                {currentStep === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="max-w-xl">
                      <h3 className="text-xl font-bold text-slate-800">Select Clinical Medium</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mt-1">
                        Choose the primary environmental boundary of your therapeutic sandbox application.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { 
                          id: 'interactive', 
                          label: 'Interactive (Digital)', 
                          icon: Monitor, 
                          color: 'border-purple-100 text-purple-600 focus:bg-purple-50',
                          desc: 'Full digital behavioral logic with live trigger callbacks, patient event responses, and client-side testing states.' 
                        },
                        { 
                          id: 'hybrid', 
                          label: 'Hybrid (Integrated)', 
                          icon: Layers, 
                          color: 'border-blue-100 text-blue-600 focus:bg-blue-50',
                          desc: 'Integrated system that links physical structured forms with dynamic companion smartphone companion inputs.' 
                        },
                        { 
                          id: 'print', 
                          label: 'Print (Static)', 
                          icon: Printer, 
                          color: 'border-emerald-100 text-emerald-600 focus:bg-emerald-50',
                          desc: 'Classic print-ready protocols and clinical forms styled exactly around standard letter grids for offline session exercises.' 
                        },
                      ].map((item) => {
                        const isSelected = selectedMedium === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => selectMediumInStep1(item.id as any)}
                            className={`p-6 rounded-2xl border-2 text-left cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                              isSelected 
                                ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100' 
                                : 'border-slate-100 hover:border-slate-200'
                            }`}
                          >
                            <div className="space-y-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                <item.icon size={20} />
                              </div>
                              <h4 className="font-bold text-slate-800 text-base">{item.label}</h4>
                              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold mt-4">
                                <Check size={14} /> Selected Active Medium
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* --- TAB 2: FOUNDATION --- */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="max-w-xl">
                      <h3 className="text-xl font-bold text-slate-800">Choose Tool Foundation</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mt-1">
                        Select whether your clinical tool should be derived standardly from verified blueprints or custom-built directly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Blueprint Base Option */}
                      <div
                        onClick={() => {
                          setFoundationType('blueprint');
                          setNodeHierarchy(null);
                        }}
                        className={`p-6 rounded-2xl border-2 text-left cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[160px] ${
                          foundationType === 'blueprint' 
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-md' 
                            : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${foundationType === 'blueprint' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Database size={22} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-slate-800 text-base">Blueprint Base (Standard Path)</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              Clone and construct standard therapeutic modules directly from verified clinical registries.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Direct Build Option */}
                      <div
                        onClick={() => {
                          setFoundationType('direct');
                          if (!nodeHierarchy) setNodeHierarchy('fresh-tool');
                        }}
                        className={`p-6 rounded-2xl border-2 text-left cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[160px] ${
                          foundationType === 'direct' 
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-md' 
                            : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${foundationType === 'direct' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Zap size={22} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-slate-800 text-base">Direct Build (Direct Authoring)</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              Open canvas directly on an authoring viewport to script triggers, layouts, and forms.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- CHILD EXPANSION: BLUEPRINT REGISTRY PATH --- */}
                    {foundationType === 'blueprint' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                              <ShieldCheck className="text-emerald-600" size={18} /> Select Registry Foundation Blueprint
                            </h4>
                            <p className="text-slate-400 text-xs">Choose a medical/behavioral blueprint structure.</p>
                          </div>
                          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200">
                            <Filter size={14} className="text-slate-400" />
                            <select
                              value={blueprintFilter}
                              onChange={(e) => setBlueprintFilter(e.target.value as any)}
                              className="text-xs font-semibold focus:outline-none bg-transparent"
                            >
                              <option value="all">All Blueprints</option>
                              <option value="verified">Verified Only</option>
                            </select>
                          </div>
                        </div>

                        {/* Search blueprints */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="text"
                            placeholder="Filter blueprints by keywords or clinical domains..."
                            value={blueprintSearch}
                            onChange={(e) => setBlueprintSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>

                        {/* Blueprints selection grid */}
                        <div className="max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                          {filteredBlueprints.map((bp) => {
                            const isChosenBp = selectedBlueprintId === bp.id;
                            return (
                              <div
                                key={bp.id}
                                onClick={() => {
                                  setSelectedBlueprintId(bp.id);
                                  // Pre-fill identity keys automatically using Blueprint metadata!
                                  setIdentity((id) => ({
                                    ...id,
                                    name: bp.name,
                                    domain: bp.domain,
                                    subdomain: bp.subdomain,
                                  }));
                                }}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                  isChosenBp
                                    ? 'bg-emerald-50 border-emerald-500 text-slate-800'
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                                } flex items-center justify-between`}
                              >
                                <div>
                                  <div className="text-xs font-bold font-mono text-indigo-600 uppercase tracking-wider">{bp.id}</div>
                                  <div className="text-sm font-bold text-slate-800 mt-0.5">{bp.name}</div>
                                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                                    <span className="font-semibold text-slate-600">{bp.domain}</span>
                                    <span>•</span>
                                    <span>{bp.subdomain}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  {bp.verified && (
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                                      <ShieldCheck size={10} /> Verified
                                    </span>
                                  )}
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    isChosenBp ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                                  }`}>
                                    {isChosenBp && <Check size={12} />}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {filteredBlueprints.length === 0 && (
                            <div className="p-8 text-center text-slate-400 bg-white rounded-xl border border-dashed text-xs">
                              No clinical blueprints match authorization filters.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* --- CHILD EXPANSION: NODE INITIALIZE (Only for Direct Build) --- */}
                    {foundationType === 'direct' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6"
                      >
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                          <Sparkles className="text-indigo-600" size={18} /> Node Initialize
                        </h4>

                        {/* Select Node Hierarchy */}
                        <div className="space-y-2">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Node Hierarchy</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              { id: 'reusable-template', label: 'Reusable Template', desc: 'Pre-assembled structural nodes', icon: FileCode },
                              { id: 'fresh-tool', label: 'Fresh Tool', desc: 'Completely blank visual canvas', icon: Sparkles },
                            ].map((item) => {
                              const isActive = nodeHierarchy === item.id;
                              return (
                                <div
                                  key={item.id}
                                  onClick={() => setNodeHierarchy(item.id as any)}
                                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                                    isActive ? 'border-indigo-600 bg-white shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'
                                  }`}
                                >
                                  <item.icon size={24} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                                  <div>
                                    <div className="font-bold text-slate-800 text-sm">{item.label}</div>
                                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* IF reusable template selected, select which one */}
                        {nodeHierarchy === 'reusable-template' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-2"
                          >
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Layout Template</label>
                            <select
                              value={selectedTemplateId}
                              onChange={(e) => {
                                setSelectedTemplateId(e.target.value);
                                const found = REUSABLE_TEMPLATES.find((t) => t.id === e.target.value);
                                if (found) {
                                  setIdentity((id) => ({
                                    ...id,
                                    name: found.name,
                                    domain: found.domain,
                                    subdomain: found.subdomain,
                                  }));
                                }
                              }}
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                            >
                              {REUSABLE_TEMPLATES.map((tmpl) => (
                                <option key={tmpl.id} value={tmpl.id}>
                                  {tmpl.domain} / {tmpl.subdomain} — {tmpl.name}
                                </option>
                              ))}
                            </select>
                          </motion.div>
                        )}

                        {/* Rest of Node Initialize metadata schema */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Registry Label (Name)</label>
                            <input
                              type="text"
                              value={identity.name}
                              onChange={(e) => setIdentity({ ...identity, name: e.target.value })}
                              placeholder="e.g. CBT Mood Evaluation"
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Domain Selection</label>
                            <select
                              value={identity.domain}
                              onChange={(e) => setIdentity({ ...identity, domain: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                              <option value="Clinical Psychology">Clinical Psychology</option>
                              <option value="Speech Therapy">Speech Therapy</option>
                              <option value="Occupational Therapy">Occupational Therapy</option>
                              <option value="Neuropsychology">Neuropsychology</option>
                              <option value="Pediatrics">Pediatrics</option>
                            </select>
                          </div>

                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Subdomain Selection</label>
                            <input
                              type="text"
                              value={identity.subdomain}
                              onChange={(e) => setIdentity({ ...identity, subdomain: e.target.value })}
                              placeholder="e.g. Executive Disorganization, Phonation Controls"
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* --- TAB 3: IDENTITY --- */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="max-w-xl">
                      <h3 className="text-xl font-bold text-slate-800">Fine-tune Template Identity</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mt-1">
                        Confirm registry metadata, authorization goals, and target age profiles before canvas generation.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Registry Name ID</label>
                        <input
                          type="text"
                          value={identity.name}
                          onChange={(e) => setIdentity({ ...identity, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">System Category Label</label>
                        <input
                          type="text"
                          value={identity.label}
                          onChange={(e) => setIdentity({ ...identity, label: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Clinical Domain</label>
                        <input
                          type="text"
                          value={identity.domain}
                          onChange={(e) => setIdentity({ ...identity, domain: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Clinical Subdomain</label>
                        <input
                          type="text"
                          value={identity.subdomain}
                          onChange={(e) => setIdentity({ ...identity, subdomain: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Target Patient Age Frame</label>
                        <select
                          value={identity.ageRange}
                          onChange={(e) => setIdentity({ ...identity, ageRange: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          <option>Pediatric (Ages 3-12)</option>
                          <option>Adolescents (Ages 13-17)</option>
                          <option>Adults (18-65)</option>
                          <option>Geriatrics (65+)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Estimated Protocol Session Duration</label>
                        <select
                          value={identity.sessionDuration}
                          onChange={(e) => setIdentity({ ...identity, sessionDuration: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          <option>15 mins Sandbox</option>
                          <option>30 mins Protocol</option>
                          <option>45 mins Session</option>
                          <option>60 mins In-Depth</option>
                        </select>
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Intended Clinical Objectives & Goals</label>
                        <textarea
                          rows={2}
                          value={identity.intendedGoal}
                          onChange={(e) => setIdentity({ ...identity, intendedGoal: e.target.value })}
                          placeholder="What safety, speech, behavioral, or psychiatric objectives must this tool fulfill?"
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* FOOTER ACTIONS */}
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
                >
                  <ChevronLeft size={16} /> Back
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 disabled:opacity-40 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={!isStepValid()}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 disabled:opacity-40 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest"
                  >
                    Compile & Launch Canvas <Check size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
