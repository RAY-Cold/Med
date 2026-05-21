import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Terminal, Printer, FileEdit, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useInitializeStore } from '../state/useInitializeStore';

const entryCards = [
  {
    id: 'initialize',
    title: 'Initialize – Blank',
    description: 'Start a new clinical tool from scratch or blueprint. Launch Now.',
    icon: PlusCircle,
    href: '/clinician/studio/initialize',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'hover:border-blue-400',
    shadowColor: 'hover:shadow-blue-500/10',
  },
  {
    id: 'shell',
    title: 'Interactive Shell',
    description: 'Pre-built behavioral logic. Skips medium selection.',
    icon: Terminal,
    href: '/clinician/studio/initialize?mode=shell',
    color: 'bg-purple-50 text-purple-600',
    borderColor: 'hover:border-purple-400',
    shadowColor: 'hover:shadow-purple-500/10',
  },
  {
    id: 'print',
    title: 'Printable Forms',
    description: 'Design static clinical forms. Skips medium selection.',
    icon: Printer,
    href: '/clinician/studio/initialize?mode=print',
    color: 'bg-emerald-50 text-emerald-600',
    borderColor: 'hover:border-emerald-400',
    shadowColor: 'hover:shadow-emerald-500/10',
  },
  {
    id: 'worksheet',
    title: 'Worksheet Generator',
    description: 'AI-assisted worksheet creation for therapeutic use.',
    icon: FileEdit,
    href: '/clinician/studio/worksheet-generator',
    color: 'bg-orange-50 text-orange-600',
    borderColor: 'hover:border-orange-400',
    shadowColor: 'hover:shadow-orange-500/10',
  },
];

export default function StudioDashboard() {
  const { reset, setMedium, nextStep } = useInitializeStore();
  const navigate = useNavigate();

  const handleCardClick = (card: typeof entryCards[0]) => {
    reset();
    if (card.id === 'shell') {
      setMedium('interactive');
      nextStep();
    } else if (card.id === 'print') {
      setMedium('print');
      nextStep();
    }
    navigate(card.href);
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Clinical Studio</h1>
        <p className="text-slate-500 mt-2 text-lg">Create and manage therapy tools with precision.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {entryCards.map((card) => (
          <motion.button
            key={card.title}
            onClick={() => handleCardClick(card)}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl ${card.shadowColor} ${card.borderColor} transition-all duration-500 flex flex-col justify-between text-left w-full`}
          >
            <div>
              <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <card.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">{card.description}</p>
            </div>
            <div className="mt-8 flex items-center text-sm font-black text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
              Get Started <ArrowRight size={18} className="ml-2" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-16 p-10 bg-indigo-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-indigo-200">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl font-black tracking-tight">New to Clinical Studio?</h2>
          <p className="text-indigo-100 mt-4 text-lg leading-relaxed">
            Learn how to build effective therapeutic tools using our blueprint system and interactive canvas.
          </p>
        </div>
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all whitespace-nowrap shadow-xl">
          View Documentation
        </button>
      </div>
    </div>
  );
}
