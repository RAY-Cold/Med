import React, { useState } from 'react';
import { 
  Play, Volume2, UserCheck, Calendar, FileText, Send, Activity, MessageSquare, Archive, 
  BookOpen, Plus, Sparkles, AlertCircle, Heart, Star, CheckSquare, RefreshCcw, Check, Search
} from 'lucide-react';

// --- CLINICIAN DASHBOARD ---
export function ClinicianDashboard() {
  const [slowFactor, setSlowFactor] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeCaseload = [
    { id: 'case-1', name: 'Liam Carter', age: 6, diagnosis: 'Vocal Dyspraxia', parent: 'Thomas Carter', urgency: 'High' },
    { id: 'case-2', name: 'Sophia Evans', age: 8, diagnosis: 'Speech Apraxia', parent: 'Emily Evans', urgency: 'Medium' },
    { id: 'case-3', name: 'Noah Mitchell', age: 5, diagnosis: 'Syllabic Stutter', parent: 'Jacob Mitchell', urgency: 'Low' }
  ];

  const recentSessions = [
    { patient: 'Liam Carter', timestamp: 'Today, 10:30 AM', duration: '45m', notes: 'G-consonant motor plan validated.' },
    { patient: 'Sophia Evans', timestamp: 'Yesterday, 2:15 PM', duration: '50m', notes: 'Completed Interactive Shell Level 2.' }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-100/100 leading-tight">Therapy Operations</h1>
          <p className="text-slate-500 mt-1">Manage speech micro-sessions, Slowphone audiology, and parent homework plans.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-100">
          <Calendar size={16} /> Book Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Play-Slowed Voice Bio-Analyser Widget */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Volume2 className="text-indigo-600" size={20} /> Play-Slowed Dyspraxia Analyser
            </h3>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} /> Live Bio-feedback
            </span>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed">
            Slow down captured audio streams from home game missions to analyze minor syllable pauses, delays, or pitch transitions.
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 font-mono">SPEECH_RECORDING_CARTER_09.WAV</span>
              <span className="text-xs text-indigo-600 font-black">Liam Carter (Age 6)</span>
            </div>

            <div className="relative h-16 bg-slate-900 rounded-xl mt-4 overflow-hidden flex items-center justify-center">
              {isPlaying ? (
                <div className="flex gap-1.5 items-center justify-center w-full px-6">
                  {[...Array(16)].map((_, i) => (
                    <span 
                      key={i} 
                      className="w-1 bg-indigo-500 rounded-full animate-bounce" 
                      style={{ 
                        height: `${Math.random() * 40 + 10}px`,
                        animationDuration: `${0.6 + Math.random() * 0.4}s` 
                      }} 
                    />
                  ))}
                </div>
              ) : (
                <span className="text-xs text-slate-500">Audio playback idle. Press Play.</span>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all flex items-center gap-2 shadow-md"
                >
                  <Play size={14} /> {isPlaying ? 'Stop' : 'Play slowed'}
                </button>
                <div className="text-slate-500 text-xs">
                  Vocal frequency: <span className="font-bold text-slate-800">180Hz</span>
                </div>
              </div>

              {/* Slow down factor slider */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Slow Factor:</span>
                {[0.5, 0.75, 1.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSlowFactor(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      slowFactor === val ? 'bg-indigo-50 border-indigo-200 text-indigo-600 font-black' : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    {val}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Caseload Widget */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-lg">My Caseload List</h3>
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded text-xs">{activeCaseload.length} Kids</span>
          </div>

          <div className="space-y-4">
            {activeCaseload.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 rounded-2xl border border-slate-100 transition duration-300">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-slate-900 text-sm">{client.name}</p>
                    <span className="text-[10px] text-slate-400">Class {client.age} years</span>
                  </div>
                  <p className="text-xs text-slate-500">{client.diagnosis} • Guardian: {client.parent}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                  client.urgency === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {client.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- CLINICAL PULSE ---
export function ClinicalPulse() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clinical Pulse & Analytics</h1>
        <p className="text-slate-500 mt-1">Real-time pitch harmony and dyspraxic delay telemetries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-md">Average Pitch Accuracy Progress</h3>
          <div className="h-44 flex items-end justify-between border-b border-l border-slate-200 p-4">
            {[65, 72, 68, 85, 91].map((val, idx) => (
              <div key={idx} className="w-8 bg-indigo-600 hover:bg-indigo-500 transition rounded-t-lg" style={{ height: `${val}%` }} />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Historical speech matching precision progress over the last 5 milestones.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-md">Client Homework Completion Ratios</h3>
          <div className="h-44 flex items-end justify-between border-b border-l border-slate-200 p-4">
            {[45, 90, 85, 100, 75].map((val, idx) => (
              <div key={idx} className="w-8 bg-emerald-600 hover:bg-emerald-500 transition rounded-t-lg" style={{ height: `${val}%` }} />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Active parent engagement ratios completing assigned gamification exercises.</p>
        </div>
      </div>
    </div>
  );
}

// --- TASK DEPLOYMENTS ENGINE ---
export function TaskDeployments() {
  const [deployed, setDeployed] = useState<string[]>([]);

  const assignments = [
    { id: 't-1', name: 'Dyspraxia G-Consonant Slide', medium: 'Interactive', target: 'Liam Carter' },
    { id: 't-2', name: 'Scale 1-10 Anxieties Tracker', medium: 'Hybrid', target: 'Sophia Evans' },
    { id: 't-3', name: 'Crying-Giggling Manual Form', medium: 'Printable', target: 'Noah Mitchell' }
  ];

  const handleDeploy = (id: string) => {
    setDeployed([...deployed, id]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Task Deployments</h1>
        <p className="text-slate-500 mt-1">Dispatch verified clinical tools directly into assigned caregiver hubs.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Clinical Tool / Game Name</th>
              <th className="px-6 py-4">Assigned Medium</th>
              <th className="px-6 py-4">Target Kid Profile</th>
              <th className="px-6 py-4 text-right">Deployment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {assignments.map((as) => (
              <tr key={as.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-bold text-slate-950">{as.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs rounded-lg font-bold">{as.medium}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{as.target}</td>
                <td className="px-6 py-4 text-right">
                  {deployed.includes(as.id) ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-extrabold font-mono uppercase bg-emerald-50 px-3 py-1 rounded-full"><Check size={14} /> Dispatched</span>
                  ) : (
                    <button 
                      onClick={() => handleDeploy(as.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-2 shadow-sm transition"
                    >
                      <Send size={12} /> Deploy Hub
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- CLINICIAN VAULT AND LIBRARY (Workspace Vault, My Tools, etc.) ---
export function ClinicianVault({ activeTab }: { activeTab: 'vault' | 'library' }) {
  const items = [
    { title: 'Liam Dyspraxia Vowels Map', type: 'Private Tool', format: 'Interactive', assigned: 'Liam Carter' },
    { title: 'Printable S-Blend Form Template', type: 'Shared Template', format: 'Printable', assigned: 'No one' },
    { title: 'Cloned CBT Anxiety Blueprint', type: 'Clinical Blueprint', format: 'Hybrid', assigned: 'Sophia Evans' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {activeTab === 'vault' ? 'Private Clinician Vault' : 'Global Clinical Library'}
        </h1>
        <p className="text-slate-500 mt-1 text-sm max-w-xl">
          Check private tools, editable templates, and clinical materials easily assignable to your active patients.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {items.map((it, i) => (
          <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:border-slate-300 transition duration-300">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{it.type}</span>
              <h4 className="font-extrabold text-slate-800 tracking-tight mt-1">{it.title}</h4>
              <p className="text-xs text-slate-500 mt-1">Assigned Client: <span className="font-bold text-slate-700">{it.assigned}</span></p>
            </div>
            <span className="px-3 py-1 border border-slate-200 bg-white rounded-xl text-xs font-black text-slate-500">{it.format}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
