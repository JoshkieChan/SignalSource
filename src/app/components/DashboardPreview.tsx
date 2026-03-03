import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface DashboardPreviewProps {
  mini?: boolean;
}

const mockCards = [
  { id: 1, patient: "J. Smith", code: "99213", status: "High Risk", risk: 85, time: "2m ago" },
  { id: 2, patient: "A. Doe", code: "99214", status: "Clean", risk: 12, time: "5m ago" },
  { id: 3, patient: "R. Roe", code: "99203", status: "Medium", risk: 45, time: "12m ago" },
  { id: 4, patient: "B. Guy", code: "99213", status: "High Risk", risk: 92, time: "15m ago" },
  { id: 5, patient: "C. Lee", code: "99212", status: "Clean", risk: 5, time: "22m ago" },
];

export default function DashboardPreview({ mini = false }: DashboardPreviewProps) {
  if (mini) {
    return (
      <div className="w-full space-y-3 p-4">
        {mockCards.slice(0, 3).map((card, i) => (
          <div key={card.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${card.risk > 70 ? 'bg-red-500' : card.risk > 30 ? 'bg-yellow-500' : 'bg-green-500'}`} />
              <div className="text-xs font-mono text-gray-300">{card.patient}</div>
            </div>
            <div className="text-xs text-gray-500">{card.risk}%</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden relative flex flex-col">
      {/* Dashboard Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold">Live Stream</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 text-xs border border-red-500/20">2 Critical</span>
            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs border border-blue-500/20">14 Processed</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Real-time Connection
        </div>
      </div>

      {/* Scrolling Content */}
      <div className="flex-1 overflow-hidden relative p-6">
        <motion.div 
          className="space-y-4"
          animate={{ y: [0, -100] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        >
          {mockCards.concat(mockCards).map((card, i) => (
            <motion.div 
              key={`${card.id}-${i}`}
              className={`p-4 rounded-xl border ${
                card.risk > 70 ? 'bg-red-500/5 border-red-500/20' : 
                card.risk > 30 ? 'bg-yellow-500/5 border-yellow-500/20' : 
                'bg-emerald-500/5 border-emerald-500/20'
              } flex items-center justify-between group hover:bg-white/5 transition-colors cursor-pointer`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  card.risk > 70 ? 'bg-red-500/20 text-red-500' : 
                  card.risk > 30 ? 'bg-yellow-500/20 text-yellow-500' : 
                  'bg-emerald-500/20 text-emerald-500'
                }`}>
                  {card.risk > 70 ? <AlertCircle className="w-5 h-5" /> : 
                   card.risk > 30 ? <TrendingUp className="w-5 h-5" /> : 
                   <CheckCircle className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-200">{card.patient}</div>
                  <div className="text-xs text-gray-500 font-mono">CPT: {card.code}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  card.risk > 70 ? 'text-red-500' : 
                  card.risk > 30 ? 'text-yellow-500' : 
                  'text-emerald-500'
                }`}>
                  {card.risk}%
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3" />
                  {card.time}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Gradient Overlay for Fade Effect */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
