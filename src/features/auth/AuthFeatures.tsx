import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Users, Landmark, Key, Mail, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

// --- AUTH LOG SIGN IN ---
export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Intelligently route based on email flags or just route to role selection
    if (email.includes('admin')) {
      navigate('/admin');
    } else if (email.includes('parent')) {
      navigate('/parent');
    } else {
      navigate('/clinician');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Secure Workspace Login</h2>
        <p className="text-xs text-slate-500">Provide credentials to enter your dedicated therapeutic sandbox.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workspace Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. clinician@verbalcoach.io"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:ring-4 focus:ring-indigo-50 outline-none focus:border-indigo-500 transition-all text-sm rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secret Passcode</label>
          <div className="relative">
            <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:ring-4 focus:ring-indigo-50 outline-none focus:border-indigo-500 transition-all text-sm rounded-xl"
            />
          </div>
        </div>

        <div className="text-right">
          <Link to="/auth/role-selection" className="text-xs font-bold text-indigo-600 hover:underline">Forgot passcode?</Link>
        </div>

        <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-lg shadow-indigo-100">
          Enter Clinical Sandbox
        </button>
      </form>

      <div className="border-t border-slate-100 pt-4 text-center">
        <p className="text-xs text-slate-400">
          First time here?{' '}
          <Link to="/auth/signup" className="font-bold text-indigo-600 hover:underline">Establish Clinic Portal</Link>
        </p>
      </div>
    </div>
  );
}

// --- SIGN UP PAGE ---
export function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'clinician' | 'parent'>('clinician');
  const [clinicName, setClinicName] = useState('');
  const [caregiverEmail, setCaregiverEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/auth/role-selection');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create VC Workspace</h2>
        <p className="text-xs text-slate-500">Select portal blueprint type to launch customized sandbox rules.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setRole('clinician')}
          className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            role === 'clinician' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Clinician Unit
        </button>
        <button
          onClick={() => setRole('parent')}
          className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            role === 'parent' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Caregiver Hub
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {role === 'clinician' ? (
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinic / Institution Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Bay Area Children Hospital"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none text-sm rounded-xl focus:bg-white focus:border-indigo-500 transition-all"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Caregiver Primary Contact</label>
            <input
              required
              type="email"
              placeholder="e.g. parent@familyhub.com"
              value={caregiverEmail}
              onChange={(e) => setCaregiverEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none text-sm rounded-xl focus:bg-white focus:border-indigo-500 transition-all"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Password</label>
          <input
            required
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none text-sm rounded-xl focus:bg-white focus:border-indigo-500 transition-all"
          />
        </div>

        <button className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-md">
          Synthesize Account Profile
        </button>
      </form>

      <div className="border-t border-slate-100 pt-4 text-center">
        <Link to="/auth/signin" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}

// --- ROLE SELECTION MODAL PAGE ---
export function RoleSelection() {
  const navigate = useNavigate();

  const cards = [
    {
      role: 'Admin',
      route: '/admin',
      desc: 'Platform Core & Infrastructure rulesets. Analyze clinic chains, system telemetry, and global billing ledgers.',
      icon: Landmark,
      color: 'border-rose-100 hover:border-rose-300 hover:shadow-rose-500/5 text-rose-600 bg-rose-50'
    },
    {
      role: 'Clinician',
      route: '/clinician',
      desc: 'Therapy authoring, Play-Slowed audio registries, global libraries, and clinical dashboard analytics.',
      icon: ShieldCheck,
      color: 'border-indigo-100 hover:border-indigo-300 hover:shadow-indigo-500/5 text-indigo-600 bg-indigo-50'
    },
    {
      role: 'Parent',
      route: '/parent',
      desc: 'Access family missions calendar, micro-rewards, message clinicians, and switch Kids View modes.',
      icon: Users,
      color: 'border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-500/5 text-emerald-600 bg-emerald-50'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
          <Sparkles size={12} /> Sandbox Portal
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Select Security Context</h2>
        <p className="text-xs text-slate-500">Each role encapsulates precise sitemap access parameters.</p>
      </div>

      <div className="space-y-4">
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => navigate(c.route)}
            className={`w-full p-5 rounded-2xl border bg-white flex items-start gap-4 text-left hover:shadow-xl transition-all duration-300 group ${c.color}`}
          >
            <div className="p-3 bg-white rounded-xl shadow-inner group-hover:scale-110 transition-transform flex items-center justify-center">
              <c.icon size={22} className={c.color.split(' ')[2]} />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-slate-900 text-sm">{c.role} Portal</span>
                <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
