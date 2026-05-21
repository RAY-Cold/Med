import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutGrid, Activity, Calendar, ClipboardList, Send, BarChart3, MessageSquare, Archive, BookOpen, PenTool } from 'lucide-react';

const clinicianNav = [
  { name: 'Dashboard', href: '/clinician', icon: LayoutGrid },
  { name: 'Clinical Pulse', href: '/clinician/clinical-pulse', icon: Activity },
  { name: 'Scheduler', href: '/clinician/scheduler', icon: Calendar },
  { name: 'Logs', href: '/clinician/logs', icon: ClipboardList },
  { name: 'Task Deployments', href: '/clinician/task-deployments', icon: Send },
  { name: 'Performance', href: '/clinician/performance', icon: BarChart3 },
  { name: 'Messenger', href: '/clinician/messenger', icon: MessageSquare },
  { name: 'Vault', href: '/clinician/vault', icon: Archive },
  { name: 'Library', href: '/clinician/library', icon: BookOpen },
  { name: 'Clinical Studio', href: '/clinician/studio', icon: PenTool },
];

export default function ClinicianLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-indigo-950 text-indigo-200 flex flex-col">
        <div className="p-6 border-b border-indigo-900">
          <h1 className="text-xl font-bold text-white tracking-tighter">VERBAL COACH</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
          {clinicianNav.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-900 hover:text-white transition-colors text-sm font-medium"
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="text-sm font-medium text-slate-500">Therapy Operations</div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">CL</div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
