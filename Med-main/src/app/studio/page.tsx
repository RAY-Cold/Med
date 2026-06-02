import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Terminal, Printer, FileEdit, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useInitializeStore } from '@/features/studio/state/useInitializeStore';

const MotionLink = motion.create(Link);

const entryCards = [
  {
    id: 'initialize',
    title: 'Initialize – Blank',
    description: 'Start a new clinical tool from scratch or blueprint. Launch Now.',
    icon: PlusCircle,
    href: '/studio/initialize',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'hover:border-blue-400',
    shadowColor: 'hover:shadow-blue-500/10',
  },
  {
    id: 'shell',
    title: 'Interactive Shell',
    description: 'Pre-built behavioral logic. Skips medium selection.',
    icon: Terminal,
    href: '/studio/initialize?mode=shell',
    color: 'bg-purple-50 text-purple-600',
    borderColor: 'hover:border-purple-400',
    shadowColor: 'hover:shadow-purple-500/10',
  },
  {
    id: 'print',
    title: 'Printable Forms',
    description: 'Design static clinical forms. Skips medium selection.',
    icon: Printer,
    href: '/studio/initialize?mode=print',
    color: 'bg-emerald-50 text-emerald-600',
    borderColor: 'hover:border-emerald-400',
    shadowColor: 'hover:shadow-emerald-500/10',
  },
  {
    id: 'worksheet',
    title: 'Worksheet Generator',
    description: 'AI-assisted worksheet creation for therapeutic use.',
    icon: FileEdit,
    href: '/studio/worksheet-generator',
    color: 'bg-orange-50 text-orange-600',
    borderColor: 'hover:border-orange-400',
    shadowColor: 'hover:shadow-orange-500/10',
  },
];

export default function StudioLandingPage() {
  const { reset, setMedium, nextStep } = useInitializeStore();
  const navigate = useNavigate();

  const handleCardClick = (card: typeof entryCards[0]) => {
    reset();
    if (card.id === 'shell') {
      setMedium('interactive');
      nextStep(); // Move to Foundation
    } else if (card.id === 'print') {
      setMedium('print');
      nextStep(); // Move to Foundation
    }
    navigate(card.href);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clinical Studio</h1>
        <p className="text-slate-500 mt-1">Create and manage therapy tools with precision.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {entryCards.map((card) => (
          <motion.button
            key={card.title}
            onClick={() => handleCardClick(card)}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl ${card.shadowColor} ${card.borderColor} transition-all duration-300 flex flex-col justify-between text-left w-full`}
          >
            <div>
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{card.description}</p>
            </div>
            <div className="mt-6 flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
              Get Started <ArrowRight size={16} className="ml-1" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-12 p-8 bg-indigo-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-2xl font-bold">New to Clinical Studio?</h2>
          <p className="text-indigo-100 mt-2">
            Learn how to build effective therapeutic tools using our blueprint system and interactive canvas.
          </p>
        </div>
        <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors whitespace-nowrap">
          View Documentation
        </button>
      </div>
    </div>
  );
}
