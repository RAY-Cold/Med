import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

export default function WorksheetGeneratorPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center">
        <Construction size={40} />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Worksheet Generator</h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Our AI-assisted worksheet generation system is currently under development. Stay tuned for updates!
        </p>
      </div>
      <Link
        to="/studio"
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all"
      >
        <ArrowLeft size={18} /> Back to Studio
      </Link>
    </div>
  );
}
