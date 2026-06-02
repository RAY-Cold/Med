import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black tracking-tighter text-indigo-600">VERBAL COACH</Link>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
