import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, Bell, LayoutGrid, FileText, Database, Archive, BookOpen, HelpCircle } from 'lucide-react';

const studioNav = [
  { name: 'Workflow', href: '/clinician/studio/workflow' },
  { name: 'Resources', href: '/clinician/studio/resources' },
  { name: 'Worksheets', href: '/clinician/studio/worksheets' },
  { name: 'Assets', href: '/clinician/studio/assets' },
  { name: 'Templates', href: '/clinician/studio/templates' },
  { name: 'Vault', href: '/clinician/studio/vault' },
  { name: 'Library', href: '/clinician/studio/library' },
];

const secondaryNav = [
  { name: 'Registry', href: '/clinician/studio/blueprint-registry' },
  { name: 'Vault', href: '/clinician/studio/vault' },
  { name: 'Templates', href: '/clinician/studio/templates' },
];

export default function StudioLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link to="/clinician/studio" className="text-xl font-bold tracking-tighter text-indigo-600">
            TLM STUDIO
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {studioNav.map((item) => (
              <Link 
                key={item.name} 
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname.startsWith(item.href) ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Bell size={20} /></button>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><HelpCircle size={20} /></button>
          <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200" />
        </div>
      </header>

      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Global Search (Workflow, Resources, Worksheets, Assets, Templates, Vault)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none shadow-inner"
            />
          </div>
          
          <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-1">
            {secondaryNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                  location.pathname === item.href ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
