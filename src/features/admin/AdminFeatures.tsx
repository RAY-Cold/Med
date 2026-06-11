import React, { useState } from 'react';
import { 
  BarChart3, Activity, Users, Settings, Map, Layers, Code, Bot, Globe, Shield, Laptop, 
  Cpu, Database, Sparkles, Key, CheckCircle, RefreshCcw, Landmark, Play, AlertCircle, Trash2
} from 'lucide-react';

// --- ADMIN OVERVIEW ---
export function AdminOverview() {
  const stats = [
    { label: 'Platform Transactions', value: '$134,810.00', change: '+12%', icon: Landmark, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Active Clinic Licenses', value: '42 Chains', change: 'Online', icon: Cpu, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'System Server Cycles', value: '0.015 ms', change: '99.9% Health', icon: Activity, color: 'bg-rose-50 text-rose-600' },
    { label: 'Clinical Developers', value: '1,420 Users', change: '+34 this week', icon: Users, color: 'bg-sky-50 text-sky-600' }
  ];

  const recentLogs = [
    { event: 'Blueprint Compliancy verified', module: 'Studio Master', time: '14 mins ago', tier: 'Audit' },
    { event: 'Clinic licensed expanded (St. Jude Pediatric)', module: 'License Engine', time: '1 hr ago', tier: 'Billing' },
    { event: 'AI Model latency threshold exceeded', module: 'Telemetry', time: '2 hrs ago', tier: 'Warning' },
    { event: 'Emergency roll-back of template default-2', module: 'Deployment Manager', time: '5 hrs ago', tier: 'System' }
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Configuration Core</h1>
        <p className="text-slate-500 mt-1">Global platform telemetry and clinic authorization ledgers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((st, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed max-w-[150px]">{st.label}</span>
              <div className={`p-3 rounded-2xl ${st.color}`}>
                <st.icon size={20} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-slate-900">{st.value}</span>
              <span className="block text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{st.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-lg">Server Telemetry Load (Cores 1-4)</h3>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Stable</span>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4 h-48 items-end">
            {[72, 85, 45, 91].map((val, idx) => (
              <div key={idx} className="space-y-3 text-center">
                <div className="bg-slate-100 rounded-2xl h-36 relative overflow-hidden flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-600 transition-all rounded-b-2xl duration-500" 
                    style={{ height: `${val}%` }} 
                  />
                </div>
                <span className="block text-xs font-bold text-slate-400">Core #{idx + 1} ({val}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 text-slate-300 rounded-3xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-white text-md">Platform Audit Stream</h3>
            <p className="text-slate-400 text-xs">Real-time system state telemetry logs.</p>
            <div className="space-y-4 pt-2">
              {recentLogs.map((log, i) => (
                <div key={i} className="flex justify-between text-xs border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-slate-200 font-bold">{log.event}</p>
                    <p className="text-[10px] text-slate-500">{log.module} • {log.time}</p>
                  </div>
                  <span className={`h-fit px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    log.tier === 'Warning' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {log.tier}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PLATFORM ANALYTICS ---
export function PlatformAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Logs & Telemetry</h1>
        <p className="text-slate-500 mt-1">Voice pitch analyses latencies and regional API speeds.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
        <h3 className="font-extrabold text-slate-900 text-md">Global Data Center Ping (ms)</h3>
        <div className="space-y-4">
          {[
            { region: 'us-west1 (Silicon Valley)', ping: '12ms', speed: 'Excellent' },
            { region: 'europe-west3 (Frankfurt)', ping: '84ms', speed: 'Good' },
            { region: 'asia-east1 (Taiwan Gateway)', ping: '112ms', speed: 'Average' }
          ].map((r, i) => (
            <div key={i} className="flex bg-slate-50 border border-slate-100 p-4 rounded-2xl items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">{r.region}</p>
                <p className="text-xs text-slate-400">Primary latency feed</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-indigo-600">{r.ping}</p>
                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">{r.speed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MEMBER DIRECTORY ---
export function MemberDirectory() {
  const [members, setMembers] = useState([
    { id: 'usr-902', name: 'Dr. Sarah Jenkins', role: 'Premium Clinician', clinic: 'St. Mary Specialized Pediatric', status: 'Active' },
    { id: 'usr-194', name: 'Thomas Wayne', role: 'Caregiver / Parent', clinic: 'Gotham Care Sandbox', status: 'Active' },
    { id: 'usr-384', name: 'Dr. Alan Grant', role: 'Lead Clinician', clinic: 'Jurassic Speech Center', status: 'Active' },
    { id: 'usr-203', name: 'Administrator Ruth', role: 'System Admin', clinic: 'All Clinic Groups', status: 'Emergency Root' }
  ]);

  const deleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Member Directory</h1>
        <p className="text-slate-500 mt-1">Maintain roles configuration, access profiles, and authorization tokens.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Participant profile</th>
              <th className="px-6 py-4">Assigned Role</th>
              <th className="px-6 py-4">Clinic Sandbox Group</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <p className="font-extrabold text-slate-900">{m.name}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{m.id}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-bold text-xs">{m.role}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{m.clinic}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => deleteMember(m.id)}
                    className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- CLINIC CONFIGURATION ---
export function ClinicConfiguration() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clinic Configuration</h1>
        <p className="text-slate-500 mt-1">Manage global clinic parameters, active license loops, and system boundaries.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <h3 className="font-extrabold text-slate-900 text-md">Platform Environment Security</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">HIPAA Compliancy Audit mode</span>
            <p className="text-sm font-bold text-slate-800">Double Hash Sandboxes</p>
            <p className="text-xs text-slate-400">All local audiology recording feeds slow-play under secure RSA key sets.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Global API Threshold</span>
            <p className="text-sm font-bold text-slate-800">Gemini-2.5 Pro Key Lock</p>
            <p className="text-xs text-slate-400">Workspace authoring parameters use secured server-side credentials only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- INTERACTIVE SYSTEM SITEMAP DIAGRAM ENGINE ---
export function SystemSitemap() {
  const nodes = [
    { id: '1', label: '1. Pre-Login Public Website', desc: 'Home, Features, Workflow, About, Contact, Resources', role: 'All pre-login visitors', color: 'border-slate-300' },
    { id: '2', label: '2. Portal Authentication', desc: 'Secure Sign In / Sign Up, Role selectors module', role: 'Clinic members / Parents', color: 'border-indigo-300 text-indigo-700' },
    { id: '3', label: '3. Administrative core console', desc: 'Member directory, billing ledgers, server telemetry, API configs', role: 'Platform Admin only', color: 'border-rose-300 text-rose-700' },
    { id: '4', label: '4. Therapist Clinical Studio operations', desc: 'TLM Studio, Play-Slowed speech waves, scheduler, logs, task deployer', role: 'Licensed Clinicians', color: 'border-sky-300 text-sky-700' },
    { id: '5', label: '5. Caregiver family hub', desc: 'Missions, Calendar tracker, finances, Kids-Adults View switch', role: 'Authorized Parents / Children', color: 'border-emerald-300 text-emerald-700' }
  ];

  const [activeNode, setActiveNode] = useState<string>('1');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Architecture Sitemap</h1>
        <p className="text-slate-500 mt-1">Explore, verify, and audit sitemap routes configurations in this visual sandbox layout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <h3 className="font-extrabold text-slate-900 text-md">Role Authorization Node Map</h3>
          <p className="text-xs text-slate-400">Click on any core sandbox node to preview route parameters and compliant status.</p>

          <div className="space-y-4 pt-4">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`w-full p-5 border text-left rounded-2xl transition-all duration-300 flex items-start gap-4 ${
                  activeNode === node.id ? 'bg-indigo-50 border-indigo-500 shadow-lg' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="h-6 w-6 rounded-full bg-slate-900 text-white text-xs font-mono font-bold flex items-center justify-center mt-0.5">
                  {node.id}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{node.label}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{node.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 text-slate-300 rounded-[2.5rem] p-8 shadow-2xl space-y-6 min-h-[400px] flex flex-col justify-between border border-slate-800">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400">Active Node Parameters</span>
            <h3 className="font-bold text-white text-lg">
              {activeNode === '1' && 'Public Pre-login Routes'}
              {activeNode === '2' && 'Authentication Security context'}
              {activeNode === '3' && 'System Analytics Administration'}
              {activeNode === '4' && 'Therapeutic Clinical Studio'}
              {activeNode === '5' && 'Parent Micro-Task Hub'}
            </h3>

            <div className="space-y-3 pt-4 text-xs">
              <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl">
                <span className="text-slate-400">Compliancy Tier:</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider">HIPAA Certified</span>
              </div>
              <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl">
                <span className="text-slate-400">Primary Role Target:</span>
                <span className="text-white font-bold uppercase">
                  {activeNode === '1' && 'All public clients'}
                  {activeNode === '2' && 'Unified logins'}
                  {activeNode === '3' && 'System Administrators'}
                  {activeNode === '4' && 'Pediatric path specialists'}
                  {activeNode === '5' && 'Caregivers & Kids'}
                </span>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl space-y-2">
                <span className="text-slate-400 block font-bold">Allowed Sub-paths:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {activeNode === '1' && '/features, /workflow, /about, /contact, /resources/worksheets'}
                  {activeNode === '2' && '/auth/signin, /auth/signup, /auth/role-selection'}
                  {activeNode === '3' && '/admin/platform-analytics, /admin/clinic-configuration, /admin/blueprint-master'}
                  {activeNode === '4' && '/clinician/clinical-pulse, /clinician/studio, /clinician/vault'}
                  {activeNode === '5' && '/parent/dashboard, /parent/missions, /parent/finances, Kids View / Adults View'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ADMIN RECENT FEATURES (Blueprint Master, Curriculum, AI, Marketplace, Gamification, Localization) ---
export function AdminFeatures({ activeKey }: { activeKey: 'blueprint-master' | 'curriculum-engine' | 'ai-strategy-lab' | 'marketplace-operations' | 'gamification' | 'localization' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100/100 leading-tight">
          {activeKey === 'blueprint-master' && 'Blueprint Master Admin Configuration'}
          {activeKey === 'curriculum-engine' && 'Curriculum Engine & Presets'}
          {activeKey === 'ai-strategy-lab' && 'AI Strategy Lab Configuration'}
          {activeKey === 'marketplace-operations' && 'Marketplace Operations Billing'}
          {activeKey === 'gamification' && 'Gamification reward engine settings'}
          {activeKey === 'localization' && 'System Localization & Multi-languages'}
        </h1>
        <p className="text-slate-500 mt-2 text-sm max-w-xl">
          Customize global environment parameters matching your clinic sitemap specification rules. Check health telemetry status frequently.
        </p>
      </div>

      <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-6">
        <Activity className="text-indigo-600 animate-pulse" size={28} />
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Interactive API Connection Live</h4>
          <p className="text-slate-400 text-xs mt-1">System latency check resolved. Server bound port running inside secure sandbox proxy environment.</p>
        </div>
      </div>
    </div>
  );
}
