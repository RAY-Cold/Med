import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutGrid, Target, Calendar, MessageSquare, Wallet, Settings, User } from 'lucide-react';

const parentNav = [
  { name: 'Dashboard', href: '/parent', icon: LayoutGrid },
  { name: 'Missions', href: '/parent/missions', icon: Target },
  { name: 'Calendar', href: '/parent/calendar', icon: Calendar },
  { name: 'Messages', href: '/parent/messages', icon: MessageSquare },
  { name: 'Finances', href: '/parent/finances', icon: Wallet },
  { name: 'Preferences', href: '/parent/preferences', icon: Settings },
];

export default function ParentLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-emerald-950 text-emerald-200 flex flex-col">
        <div className="p-6 border-b border-emerald-900">
          <h1 className="text-xl font-bold text-white tracking-tighter">PARENT HUB</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
          {parentNav.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-900 hover:text-white transition-colors text-sm font-medium"
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="text-sm font-medium text-slate-500">Parent Dashboard</div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs">PA</div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
