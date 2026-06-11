import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutGrid, Users, Settings, Map, Database, Cpu, BarChart3, Globe, ShieldCheck, Palette, Languages, Activity } from 'lucide-react';

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutGrid },
  { name: 'Platform Analytics', href: '/admin/platform-analytics', icon: BarChart3 },
  { name: 'Member Directory', href: '/admin/member-directory', icon: Users },
  { name: 'Clinic Config', href: '/admin/clinic-configuration', icon: Settings },
  { name: 'System Sitemap', href: '/admin/system-sitemap', icon: Map },
  { name: 'Blueprint Master', href: '/admin/blueprint-master', icon: Database },
  { name: 'Curriculum Engine', href: '/admin/curriculum-engine', icon: Cpu },
  { name: 'AI Strategy Lab', href: '/admin/ai-strategy-lab', icon: ShieldCheck },
  { name: 'Marketplace Ops', href: '/admin/marketplace-operations', icon: Globe },
  { name: 'Gamification', href: '/admin/gamification', icon: Palette },
  { name: 'Localization', href: '/admin/localization', icon: Languages },
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-tighter">VC ADMIN</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
          {adminNav.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="text-sm font-medium text-slate-500">System Configuration</div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200" />
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
