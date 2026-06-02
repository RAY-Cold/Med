import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInitializeStore } from '../state/useInitializeStore';
import { Monitor, Layers, Printer, Database, Zap, Check, ChevronRight, ChevronLeft, Info, FileCode, Sparkles } from 'lucide-react';

export default function InitializeWizard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  const {
    step,
    medium,
    foundation,
    nodeHierarchy,
    identity,
    setMedium,
    setFoundation,
    setNodeHierarchy,
    setIdentityField,
    nextStep,
    prevStep,
    reset,
  } = useInitializeStore();

  useEffect(() => {
    if (mode === 'shell') setMedium('interactive');
    if (mode === 'print') setMedium('print');
  }, [mode, setMedium]);

  const isStep1Valid = !!medium;
  const isStep2Valid = !!foundation;
  const isStep3Valid = foundation === 'blueprint' 
    ? (!!identity.name && !!identity.label && !!identity.domain && !!identity.subdomain)
    : (!!nodeHierarchy && !!identity.name && !!identity.domain && !!identity.subdomain);

  const handleComplete = () => {
    if (foundation === 'blueprint') {
      navigate('/clinician/studio/blueprint-registry');
    } else {
      const templateParam = nodeHierarchy === 'reusable-template' ? '&templateId=default' : '';
      navigate(`/clinician/studio/canvas?new=1${templateParam}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="h-1.5 bg-slate-100">
          <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        <div className="p-10">
          <div className="mb-10">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Step {step} of 3</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {step === 1 && 'Select Medium'}
              {step === 2 && 'Choose Foundation'}
              {step === 3 && (foundation === 'direct' ? 'Node Initialize' : 'Identity Configuration')}
            </h2>
          </div>

          <div className="min-h-[320px]">
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { id: 'interactive', label: 'Interactive', icon: Monitor, desc: 'Digital behavioral logic' },
                  { id: 'hybrid', label: 'Hybrid', icon: Layers, desc: 'Integrated experience' },
                  { id: 'print', label: 'Print', icon: Printer, desc: 'Static clinical forms' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMedium(item.id as any)}
                    className={`p-8 rounded-2xl border-2 text-left transition-all ${
                      medium === item.id ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <item.icon className={medium === item.id ? 'text-indigo-600' : 'text-slate-400'} size={40} />
                    <h3 className="font-bold text-slate-900 mt-6 text-lg">{item.label}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: 'blueprint', label: 'Blueprint Base', icon: Database, desc: 'Standard path via Registry' },
                  { id: 'direct', label: 'Direct Build', icon: Zap, desc: 'Direct authoring canvas' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFoundation(item.id as any)}
                    className={`p-8 rounded-2xl border-2 text-left transition-all ${
                      foundation === item.id ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <item.icon className={foundation === item.id ? 'text-indigo-600' : 'text-slate-400'} size={40} />
                    <h3 className="font-bold text-slate-900 mt-6 text-lg">{item.label}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                {foundation === 'direct' && (
                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Node Hierarchy</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'reusable-template', label: 'Reusable Template', icon: FileCode },
                        { id: 'fresh-tool', label: 'Fresh Tool', icon: Sparkles },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setNodeHierarchy(item.id as any)}
                          className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                            nodeHierarchy === item.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <item.icon size={24} className={nodeHierarchy === item.id ? 'text-indigo-600' : 'text-slate-400'} />
                          <span className="font-bold text-slate-700">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      {foundation === 'direct' ? 'Registry Label' : 'Tool Name'}
                    </label>
                    <input
                      type="text"
                      value={identity.name}
                      onChange={(e) => setIdentityField('name', e.target.value)}
                      placeholder="e.g. CBT Anxiety Tracker"
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  {foundation === 'blueprint' && (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Label</label>
                      <input
                        type="text"
                        value={identity.label}
                        onChange={(e) => setIdentityField('label', e.target.value)}
                        placeholder="e.g. Clinical Tool"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Domain</label>
                    <input
                      type="text"
                      value={identity.domain}
                      onChange={(e) => setIdentityField('domain', e.target.value)}
                      placeholder="e.g. Psychology"
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Subdomain</label>
                    <input
                      type="text"
                      value={identity.subdomain}
                      onChange={(e) => setIdentityField('subdomain', e.target.value)}
                      placeholder="e.g. CBT"
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 disabled:opacity-20 transition-colors"
            >
              <ChevronLeft size={20} /> Back
            </button>

            {step < 3 ? (
              <button
                onClick={nextStep}
                disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
              >
                Next <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!isStep3Valid}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
              >
                Complete Setup <Check size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
