import React, { useState } from 'react';
import { 
  Star, Heart, Trophy, Calendar, Sparkles, MessageSquare, Wallet, Settings, 
  UserCheck, ThumbsUp, Gamepad2, Shield, Activity, RefreshCcw, Smile, Sun
} from 'lucide-react';

export function ParentDashboard() {
  const [viewMode, setViewMode] = useState<'adult' | 'kid'>('adult');
  const [activeChild, setActiveChild] = useState<'Liam' | 'Mia'>('Liam');
  const [starsCount, setStarsCount] = useState<number>(34);

  const missions = [
    { title: 'The G-Consonant Slide', goal: 'Pronounce 10 "G" voice cues correctly', reward: '5 Stars', status: 'In Progress' },
    { title: 'S-Blend Speech Ladder', goal: 'Complete level 3 with pitch accuracy', reward: '10 Stars', status: 'Ready to Play' }
  ];

  if (viewMode === 'kid') {
    return (
      <div className="bg-gradient-to-b from-amber-100 via-orange-100 to-yellow-100 p-8 rounded-[3rem] border-4 border-amber-400 min-h-[500px] space-y-8 text-amber-950 font-sans shadow-2xl relative overflow-hidden animate-fade-in animate-bounce-slow">
        {/* Kid Friendly Theme */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-amber-300 rounded-full blur-2xl opacity-60" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-yellow-300 rounded-full blur-3xl opacity-60" />

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white border-4 border-amber-400 rounded-full flex items-center justify-center text-3xl shadow-lg">🦁</div>
            <div>
              <p className="text-xs font-black uppercase text-amber-600 tracking-wider">Missions Explorer</p>
              <h2 className="text-2xl font-black tracking-tight">{activeChild}'s Play Cave</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-5 py-3 rounded-full border-2 border-amber-300 flex items-center gap-2 text-amber-600 font-black shadow-md">
              <Star className="text-yellow-400 fill-current animate-spin-slow" size={20} /> {starsCount} Stars
            </div>
            <button 
              onClick={() => setViewMode('adult')}
              className="px-6 py-3 bg-slate-900 border-2 border-slate-900 hover:bg-slate-800 text-white rounded-full font-black text-xs uppercase tracking-widest transition shadow-md"
            >
              Exit Kid Zone
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pt-4">
          {missions.map((m, idx) => (
            <div key={idx} className="bg-white border-4 border-amber-300 rounded-[2.5rem] p-8 shadow-xl hover:scale-102 hover:border-amber-400 transition-all duration-300 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-3.5 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-black uppercase tracking-wider">{m.reward} reward</span>
                  <span className="text-[10px] font-black uppercase tracking-wide px-3 py-1 bg-amber-50 rounded text-amber-600">{m.status}</span>
                </div>
                <h3 className="text-xl font-black">{m.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{m.goal}</p>
              </div>

              <button 
                onClick={() => { setStarsCount(starsCount + 5); alert('Great work! Added 5 raw stars to your kid vault profile.'); }}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 border-b-4 border-orange-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg transform active:translate-y-1 active:border-b-0 transition-all"
              >
                <Gamepad2 size={20} className="animate-pulse" /> Play Sound Game
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Family Micro-Task Hub</h1>
          <p className="text-slate-500 mt-1">Check homework play-loops, progress metrics, and clinician logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewMode('kid')}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 border border-amber-300 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-amber-200"
          >
            <Gamepad2 size={16} /> Enter Kids View Play Zone
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-1.5 bg-slate-100 rounded-2xl max-w-sm">
        {['All Kids App', 'Liam', 'Mia'].map((child) => (
          <button
            key={child}
            onClick={() => setActiveChild(child as any)}
            className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeChild === child ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {child}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Current Homework Progress</h3>
            <span className="text-xs text-indigo-600 font-extrabold flex items-center gap-1.5"><Sun size={14} className="animate-spin-slow" /> Active plan</span>
          </div>

          <div className="space-y-4">
            {missions.map((mission, i) => (
              <div key={i} className="p-5 bg-slate-50 border border-slate-100 hover:border-slate-300 rounded-2xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-extrabold text-slate-950 text-sm">{mission.title}</p>
                  <p className="text-xs text-slate-500">Therapist goal: {mission.goal}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-indigo-600 block">{mission.reward}</span>
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 mt-0.5 block">{mission.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">My Family Wallet</h3>
            <p className="text-slate-400 text-xs text-slate-500 leading-relaxed font-medium">Accumulate star points from clinical missions to redeem for digital micro-rewards.</p>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-1">
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Available Points Balance</p>
              <p className="text-4xl font-black text-emerald-600">{starsCount} Stars</p>
            </div>
          </div>
          <button 
            onClick={() => setStarsCount(34)}
            className="w-full text-center text-xs text-slate-400 hover:text-indigo-600 font-bold transition flex items-center justify-center gap-1.5 pt-4"
          >
            <RefreshCcw size={14} /> Clear Ledger Stats
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MISSIONS VIEW ---
export function ParentMissions() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
      <h2 className="text-2xl font-black text-slate-900">Missions & Sandbox Goals</h2>
      <p className="text-slate-500 text-sm">Configure active visual objectives for pediatric exercises. All goals synchronise with the therapists Clinical Logs.</p>
      <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
        <p className="text-sm font-bold text-slate-800">CBT Ladder (Level 1-5)</p>
        <p className="text-xs text-slate-400 mt-1">Currently mapped to Liam's vocal apraxia timeline model.</p>
      </div>
    </div>
  );
}

// --- CALENDAR VIEW ---
export function FamilyCalendar() {
  const events = [
    { title: 'Liam Carter Weekly Assessment Session', date: 'May 28th, 10:30 AM', location: 'St. Mary Specialized Sandbox' },
    { title: 'Mia Carter Pitch Calibration Feed Check', date: 'June 2nd, 2:15 PM', location: 'Home Workspace Sandbox' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Family Calendar</h1>
        <p className="text-slate-500 mt-1">Upcoming clinical assessments and tele-practice workout milestones.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="space-y-4">
          {events.map((ev, i) => (
            <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold font-mono text-center min-w-[50px]">
                <Calendar size={20} className="mx-auto" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm">{ev.title}</h4>
                <p className="text-xs text-slate-500">{ev.date} • {ev.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- FINANCES LEDGERS ---
export function ParentFinances() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
      <h2 className="text-2xl font-black text-slate-900">Therapy Ledgers & Points</h2>
      <p className="text-slate-500 text-sm">Access billings statements, transaction history, and point ledgers configuration.</p>
      <div className="p-6 bg-slate-50 rounded-xl text-center border border-slate-100">
        <p className="text-4xl font-extrabold text-slate-800">$120.00 Due</p>
        <span className="text-slate-400 text-xs block mt-1">Payment schedule compliant with clinic license rules.</span>
      </div>
    </div>
  );
}
