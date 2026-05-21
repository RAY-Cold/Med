import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, Shield, ArrowRight, Sparkles, Check, Phone, Mail, MapPin, 
  Search, BookOpen, Layers, Printer, FileText, Download, UserPlus, 
  HelpCircle, Tag, ShoppingCart, Globe, Mic, Brain, Heart, Star, Award
} from 'lucide-react';

// --- HOME PAGE ---
export function Home() {
  const [voiceTestStatus, setVoiceTestStatus] = useState<'idle' | 'listening' | 'analyzing' | 'done'>('idle');
  const [pitchScore, setPitchScore] = useState<number>(0);
  const [clarityScore, setClarityScore] = useState<number>(0);

  const startVoiceTest = () => {
    setVoiceTestStatus('listening');
    setTimeout(() => {
      setVoiceTestStatus('analyzing');
      setTimeout(() => {
        setVoiceTestStatus('done');
        setPitchScore(Math.floor(Math.random() * 25) + 75);
        setClarityScore(Math.floor(Math.random() * 15) + 82);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-8 bg-gradient-to-b from-indigo-50/50 via-white to-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-bold shadow-sm animate-pulse">
              <Sparkles size={16} />
              Next-Gen Clinical Authoring
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Empower Words. <span className="text-indigo-600 block">Accelerate Therapy.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Verbal Coach connects clinicians, administrators, and parents on a unified gamified platform, optimizing home workouts and voice bio-analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link to="/auth/role-selection" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all text-center shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group">
                Access Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/features" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center shadow-sm">
                Explore Features
              </Link>
            </div>
          </div>

          {/* Interactive Hero Widget */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl relative">
            <div className="absolute top-4 right-4 text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
              Live Demo
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mic className="text-indigo-600" size={20} /> Voice Bio-Simulator
            </h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Experience the clinician-authored speech wave analyser module right now in your pre-login sandbox.
            </p>

            <div className="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-6">
              {voiceTestStatus === 'idle' && (
                <div className="text-center py-6 space-y-4">
                  <span className="text-4xl">🎙️</span>
                  <p className="text-sm font-semibold text-slate-700">Test vocal clarity simulator</p>
                  <button 
                    onClick={startVoiceTest}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
                  >
                    Click to Speak "Ah"
                  </button>
                </div>
              )}

              {voiceTestStatus === 'listening' && (
                <div className="text-center py-6 space-y-4">
                  <div className="flex justify-center gap-1.5 items-center h-10">
                    <span className="w-1.5 h-8 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-10 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-6 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <span className="w-1.5 h-9 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.45s' }} />
                  </div>
                  <p className="text-sm text-indigo-600 font-bold">Listening to vocal audio stream...</p>
                </div>
              )}

              {voiceTestStatus === 'analyzing' && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto animate-spin" />
                  <p className="text-sm text-slate-600 font-medium">Extracting pitch-harmony & delays...</p>
                </div>
              )}

              {voiceTestStatus === 'done' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-500">Formant Pitch Accuracy</span>
                    <span className="text-sm font-black text-indigo-600">{pitchScore}% Match</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-500">Articulation Clarity</span>
                    <span className="text-sm font-black text-emerald-600">{clarityScore}% Match</span>
                  </div>
                  <button 
                    onClick={() => setVoiceTestStatus('idle')}
                    className="w-full text-center text-xs text-slate-400 hover:text-indigo-600 font-bold transition"
                  >
                    Reset & Retry Simulator
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Stats */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { metric: '98%', title: 'Clinician Satisfaction', desc: 'SaaS clinical templates authoring speed' },
            { metric: '10K+', title: 'Active Missions', desc: 'Completed by kids on parent apps daily' },
            { metric: '250ms', title: 'Telemetry Latency', desc: 'Real-time pitch precision tracker' },
            { metric: '45+', title: 'Clinic Chains', desc: 'Operating with custom standard presets' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-extrabold text-indigo-600 tracking-tight">{stat.metric}</div>
              <h4 className="font-bold text-slate-900 mt-2 text-sm">{stat.title}</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- FEATURES PAGE ---
export function Features() {
  const list = [
    { title: 'Rulebook-Derived Blueprints', desc: 'Translate strict medical guidelines into executable flow diagrams with single-click precision.', icon: Brain, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Interactive Play-Slowed Logs', desc: 'Hear speech artifacts clearly. Slow down phoneme recordings to pinpoint dyspraxic gaps.', icon: Mic, color: 'text-rose-600 bg-rose-50' },
    { title: 'Parent Creator Hub', desc: 'Empower caregivers to construct motivational cards, select avatars, and guide micro-missions.', icon: Heart, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Telemetry Live Dashboard', desc: 'Measure progress in decibels, pitch levels, and duration in beautifully calculated reports.', icon: Star, color: 'text-amber-600 bg-amber-50' },
    { title: 'Global Platform Audits', desc: 'Robust clinics configuration dashboard, secure workspace vault, and full audit logs.', icon: Shield, color: 'text-sky-600 bg-sky-50' },
    { title: 'Marketplace Integration', desc: 'Sell verified worksheets or exchange clinician-curated speech assets.', icon: Award, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Powerful Systems Built for Growth</h1>
        <p className="text-slate-500 text-lg">Verbal Coach implements a feature-based architecture separating complex clinical work from home play loops.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {list.map((item, i) => (
          <div key={i} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-6">{item.title}</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- WORKFLOW PAGE ---
export function Workflow() {
  const steps = [
    { number: '01', title: 'Author in Studio', desc: 'Clinician builds step-by-step interactive sound games on the Canvas.' },
    { number: '02', title: 'Clinical Validation', desc: 'Clinic administrator verifies blueprint compliance in Admin Dashboard.' },
    { number: '03', title: 'Caregiver Dispatch', desc: 'Sessions are dispatched to parent dashboards as daily interactive missions.' },
    { number: '04', title: 'Engagement Play', desc: 'Kids play. The voice engine captures audiology wave structures automatically.' },
    { number: '05', title: 'Data Feed Loop', desc: 'Unified telemetry feeds show up instantly under the clinicians Play-Slowed pulse.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Digital Therapeutic Loop</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">The SaaS Operational Workflow</h1>
        <p className="text-slate-500 text-sm">How Verbal Coach eliminates clinical bottlenecks and accelerates feedback structures.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {steps.map((st, i) => (
          <div key={i} className="relative p-6 bg-slate-50 border border-slate-100 rounded-3xl">
            <div className="text-6xl font-black text-indigo-100/80 font-mono absolute top-4 right-4">{st.number}</div>
            <h3 className="text-md font-bold text-slate-900 mt-12 mb-2 relative z-10">{st.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed relative z-10">{st.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ABOUT PAGE ---
export function About() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
        <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Clinical Origins</span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Science Backed Voice Co-pilot Engine</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Verbal Coach was founded by pediatric audiologists, vocal pathologists, and veteran enterprise SaaS engineers. We observed a persistent lag between structured weekly clinic session milestones and low-compliance home workbook folders.
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          By modeling medical rulebooks as clinical blueprints on an electronic canvas, we empower speech therapist clinicians to customize templates in minutes rather than hours.
        </p>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-400">HIPAA Sandbox</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">Compliant Presets</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-400">AI Framework</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">Gemini Grounding</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 rounded-[2.5rem] p-12 text-indigo-200 space-y-6 h-[400px] flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Our Master Objective</h3>
          <p className="text-sm leading-relaxed">
            "To unlock dynamic pediatric speech therapy accessibility by providing a streamlined clinical SaaS framework for caregivers worldwide."
          </p>
        </div>
        <div className="border-t border-indigo-800/60 pt-6 flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-sm">Dr. Elizabeth Vance</p>
            <p className="text-xs text-indigo-300">Vocal Biofeedback Lead</p>
          </div>
          <span className="px-3 py-1 bg-indigo-500/20 text-white rounded text-xs font-mono">MD, PhD</span>
        </div>
      </div>
    </div>
  );
}

// --- CONTACT PAGE ---
export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-5 space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Clinic Integrations</h1>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            Interested in deploying Verbal Coach within your hospital network or community therapy clinic? Get in touch for custom SLA & Standard Presets guidelines.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-600">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600"><Phone size={18} /></div>
            <span>+1 (800) Verbal-Coach</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600"><Mail size={18} /></div>
            <span>integrations@verbalcoach.io</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600"><MapPin size={18} /></div>
            <span>San Francisco, CA (HQ Sandbox)</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1" />

      <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-xl">
        {sent ? (
          <div className="text-center py-12 space-y-4">
            <span className="text-4xl">🎉</span>
            <h3 className="text-lg font-bold text-slate-900">Inquiry Sent Successfully</h3>
            <p className="text-xs text-slate-500">One of our clinical partnership managers will contact you shortly.</p>
            <button onClick={() => setSent(false)} className="text-indigo-600 text-xs font-black uppercase">Send another inquiry</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">First Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 text-sm focus:bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Practice Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 text-sm focus:bg-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
              <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 text-sm focus:bg-white" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Message / Goal Overview</label>
              <textarea placeholder="Tell us about your therapist count..." rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 text-sm focus:bg-white"></textarea>
            </div>
            <button className="w-full py-4 bg-slate-900 text-white rounded-xl text-sm font-black tracking-widest hover:bg-slate-800 uppercase">
              Submit Integration Form
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// --- RESOURCES SUBPAGES (Assets, Worksheets, Templates, Projects, Marketplace) ---
export function ResourcesTab({ activeTab }: { activeTab: 'assets' | 'worksheets' | 'templates' | 'projects' | 'marketplace' }) {
  const [activeItem, setActiveItem] = useState<string>('');

  const items: Record<typeof activeTab, Array<{ title: string; category: string; downloads?: string; desc: string; price?: string }>> = {
    assets: [
      { title: 'Animal Sound Pictograms Set', category: 'Illustrations', downloads: '1.2k', desc: 'HQ photorealistic illustrations mapping to target phonetics.' },
      { title: 'Action Verb JPEG Cards', category: 'Photography', downloads: '2.4k', desc: 'Clear children-centric JPEG poses triggering motor verbal plans.' },
      { title: 'Consonants Icon Sheets', category: 'Vector Icons', downloads: '850', desc: 'Clean high contrast vectors optimized for tactile click pads.' }
    ],
    worksheets: [
      { title: 'Dyspraxia Syllable Drill Sheets', category: 'PDF Worksheets', downloads: '3.1k', desc: 'Sequenced oral rhythm guides for cognitive and voice therapy.' },
      { title: 'Crying-Giggling Vocal Range Form', category: 'Printable Sheet', downloads: '1.4k', desc: 'Physical check list sheets for caregiver manual tracking.' },
      { title: 'S-Blend Speech Ladder Game', category: 'PDF Printable', downloads: '920', desc: 'Boardgame style worksheets for pediatric speech practice.' }
    ],
    templates: [
      { title: 'Weekly CBT Speech Action Loop', category: 'Interactive Flow', downloads: '4.2k', desc: 'Highly editable interactive logic base. Clone into canvas easily.' },
      { title: 'Vowel Progression Star Map', category: 'Game Path', downloads: '870', desc: 'Editable copy mapping levels to rewards inside Kids view.' },
      { title: 'Articulation Practice Matrix', category: 'Digital Matrix', downloads: '1.9k', desc: 'Clinician preset capturing latency feeds across different phonetic segments.' }
    ],
    projects: [
      { title: 'Bay Area Clinic Sandbox', category: 'Multi-Role Group', downloads: '12 clinics', desc: 'A joint blueprint configuration share group containing local rulebooks.' },
      { title: 'Autism Spectrum Voice Plan', category: 'Curriculum Path', downloads: '34 cases', desc: 'Collaborative pipeline mapping standard speech presets to pediatric play.' }
    ],
    marketplace: [
      { title: 'Premium Phonetic Sandbox Booster Pack', category: 'Curated Bundle', price: '$49.00', desc: 'Bundle compiled by Stanford clinical pathologists containing 100+ templates.' },
      { title: 'Interactive S-Blend Shell Cards', category: 'Verified Code', price: '$29.00', desc: 'Fully programmed pre-built behavioral audio feedback card set.' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 space-y-12">
      <div>
        <h1 className="text-4xl font-black text-slate-100/100 leading-tight">
          {activeTab === 'assets' && 'Clinical Visual Assets'}
          {activeTab === 'worksheets' && 'Worksheet Library'}
          {activeTab === 'templates' && 'Template Library'}
          {activeTab === 'projects' && 'Project Explorer'}
          {activeTab === 'marketplace' && 'Therapist Marketplace'}
        </h1>
        <p className="text-slate-500 mt-2 text-sm max-w-2xl">
          Browse and utilize resources constructed by certified clinical pathways. Search, filter, or download into your sandbox workspaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items[activeTab]?.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                {item.price ? (
                  <span className="text-indigo-600 font-extrabold text-sm">{item.price}</span>
                ) : (
                  <span className="text-slate-400 text-xs flex items-center gap-1"><Download size={12} /> {item.downloads}</span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-md">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              {activeTab === 'marketplace' ? (
                <button 
                  onClick={() => setActiveItem(item.title)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black tracking-widest flex items-center gap-2 uppercase transition-all"
                >
                  <ShoppingCart size={14} /> Buy Now
                </button>
              ) : (
                <button 
                  onClick={() => setActiveItem(item.title)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-black tracking-widest flex items-center gap-2 uppercase transition-all"
                >
                  <Download size={14} /> Download
                </button>
              )}
              {activeItem === item.title && (
                <span className="text-xs font-bold text-emerald-600 animate-fade-in">Added to sandbox!</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
