import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockBlueprints } from '../services/mockBlueprints';
import { Search, Filter, CheckCircle, Copy, ArrowRight, ExternalLink } from 'lucide-react';

export default function BlueprintRegistry() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  const filteredBlueprints = mockBlueprints.filter((bp) => {
    const matchesSearch =
      bp.name.toLowerCase().includes(search.toLowerCase()) ||
      bp.domain.toLowerCase().includes(search.toLowerCase()) ||
      bp.subdomain.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'all' || (filter === 'verified' && bp.verified) || (filter === 'unverified' && !bp.verified);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blueprint Registry</h1>
          <p className="text-slate-500 text-sm">Select a verified clinical foundation to clone and customize.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search blueprints by name, domain, or subdomain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all">All Blueprints</option>
            <option value="verified">Verified Only</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Blueprint Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Domain / Subdomain</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBlueprints.map((bp) => (
              <tr key={bp.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{bp.name}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{bp.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                      {bp.domain}
                    </span>
                    <span className="text-slate-300">/</span>
                    <span className="text-sm text-slate-600">{bp.subdomain}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {bp.verified ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                      <CheckCircle size={14} /> Verified
                    </div>
                  ) : (
                    <div className="text-slate-400 text-xs font-medium">Community</div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => navigate(`/clinician/studio/canvas?blueprintId=${bp.id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm"
                  >
                    <Copy size={16} /> Clone
                  </button>
                </td>
              </tr>
            ))}
            {filteredBlueprints.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No blueprints found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
