import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, Bell, LayoutGrid, FileText, Database, Archive, BookOpen, Map, Settings, HelpCircle } from 'lucide-react';

const globalNavItems = [
  { name: 'Workflow', icon: LayoutGrid, href: '/studio/workflow' },
  { name: 'Resources', icon: BookOpen, href: '/studio/resources' },
  { name: 'Worksheets', icon: FileText, href: '/studio/worksheets' },
  { name: 'Assets', icon: Archive, href: '/studio/assets' },
  { name: 'Templates', icon: Database, href: '/studio/templates' },
  { name: 'Vault', icon: Archive, href: '/studio/vault' },
  { name: 'Library', icon: BookOpen, href: '/studio/library' },
];

const studioSubNav = [
  { name: 'Workflow', href: '/studio/workflow' },
  { name: 'Resources', href: '/studio/resources' },
  { name: 'Worksheets', href: '/studio/worksheets' },
  { name: 'Assets', href: '/studio/assets' },
  { name: 'Templates', href: '/studio/templates' },
  { name: 'Blueprint Registry', href: '/studio/blueprint-registry' },
  { name: 'Vault', href: '/studio/vault' },
];

export default function StudioLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link to="/studio" className="text-xl font-bold tracking-tighter text-indigo-600">
            TLM STUDIO
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {globalNavItems.map((item) => (
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
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <HelpCircle size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm border border-indigo-200">
            JD
          </div>
        </div>
      </header>

      {/* Search Bar Area */}
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
          
          {/* Studio Navigation Menus (Below Search) */}
          <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-1">
            {studioSubNav.map((item) => (
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
