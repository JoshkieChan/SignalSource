import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function HeroOrb() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Core Orb */}
      <motion.div
        animate={{
          scale: isHovered ? 1.5 : [1, 1.05, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 0.5 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#10b981] opacity-80 blur-xl absolute z-10"
      />
      
      {/* Defined Orb Structure */}
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
        className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 bg-white/5 backdrop-blur-md relative z-20 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.5)]"
      >
        {/* Internal Data Visualizations (Abstract) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-[1px] border-dashed border-white/30 rounded-full scale-75" 
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-[1px] border-dotted border-white/30 rounded-full scale-50 absolute" 
          />
        </div>
        
        {/* Center Logo/Icon */}
        <div className="relative z-30 font-bold text-2xl tracking-tighter text-white mix-blend-overlay">
          DATA
        </div>
      </motion.div>

      {/* Expanded Dashboard Preview (On Hover) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
          y: isHovered ? 0 : 50
        }}
        transition={{ duration: 0.4 }}
        className="absolute z-30 w-[300px] h-[200px] md:w-[400px] md:h-[260px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl origin-center pointer-events-none"
        style={{ display: isHovered ? 'block' : 'none' }} // Performance optimization
      >
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
          <div className="text-xs font-semibold text-gray-400">LIVE PREVIEW</div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse" />
          <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse" />
          <div className="h-24 w-full bg-[#3b82f6]/10 rounded-lg border border-[#3b82f6]/20 mt-4 flex items-center justify-center">
            <div className="text-[#3b82f6] text-xs font-mono">Analyzing Workflow...</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
