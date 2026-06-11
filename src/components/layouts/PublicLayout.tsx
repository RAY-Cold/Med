import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="h-20 border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-600">VERBAL COACH</Link>
        <nav className="flex items-center gap-8">
          <Link to="/features" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">Features</Link>
          <Link to="/workflow" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">Workflow</Link>
          <Link to="/about" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">About</Link>
          <Link to="/contact" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">Contact</Link>
          <Link to="/signin" className="px-5 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-all">Sign In</Link>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-12 border-t border-slate-100 px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm text-slate-400">© 2026 Verbal Coach. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/resources/assets" className="text-xs font-bold text-slate-400 hover:text-slate-600">Asset Library</Link>
            <Link to="/resources/marketplace" className="text-xs font-bold text-slate-400 hover:text-slate-600">Marketplace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
