import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface AuditSimulatorProps {
  onComplete: () => void;
}

export default function AuditSimulator({ onComplete }: AuditSimulatorProps) {
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; risk: 'High' | 'Medium' | 'Low'; issues: string[] } | null>(null);

  const handleAnalyze = () => {
    if (!input.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      setAnalyzing(false);
      
      const length = input.length;
      const risk = length < 50 ? 'High' : length < 150 ? 'Medium' : 'Low';
      const score = length < 50 ? 45 : length < 150 ? 72 : 94;
      
      const issues = [];
      if (risk === 'High') issues.push("Insufficient documentation detail");
      if (!input.toLowerCase().includes('patient')) issues.push("Missing patient identifier context");
      if (risk === 'Medium') issues.push("Ambiguous treatment coding potential");
      if (risk === 'Low') issues.push("Minor formatting inconsistencies");

      setResult({ score, risk, issues });
      toast.success("Analysis Complete");
      onComplete();
    }, 2000);
  };

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
      {/* Input Section */}
      <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Encounter Notes</label>
          <button 
            onClick={() => setInput("Patient presented with acute lower back pain following lifting incident. Reported pain level 7/10. Prescribed muscle relaxants and recommended physical therapy.")}
            className="text-xs text-[#3b82f6] hover:text-[#2563eb] cursor-pointer"
          >
            Paste Sample
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste clinical notes here (e.g. 'Patient presented with...')"
          className="w-full h-48 bg-black/20 rounded-xl border border-white/10 p-4 text-gray-300 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 resize-none transition-all font-mono text-sm"
        />
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="px-6 py-3 rounded-xl bg-[#3b82f6] text-white font-medium hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {analyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Run Analysis
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="flex-1 bg-black/20 p-6 md:p-8 relative min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!result && !analyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-4 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 opacity-50" />
              </div>
              <p>Waiting for input...</p>
            </motion.div>
          )}

          {analyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center w-full"
            >
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="h-full bg-[#3b82f6]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
              <p className="text-sm text-[#3b82f6] animate-pulse">Processing clinical entities...</p>
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Risk Score</div>
                  <div className={`text-4xl font-bold ${
                    result.risk === 'High' ? 'text-red-500' : 
                    result.risk === 'Medium' ? 'text-yellow-500' : 'text-[#10b981]'
                  }`}>
                    {result.score}/100
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border ${
                  result.risk === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
                  result.risk === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]'
                } font-bold`}>
                  {result.risk} Risk
                </div>
              </div>

              <div className="space-y-3">
                {result.issues.map((issue, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3"
                  >
                    {result.risk === 'Low' ? (
                      <CheckCircle className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-gray-300">{issue}</span>
                  </motion.div>
                ))}
              </div>

              {result.risk === 'High' && (
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="text-xs text-red-400 font-mono mb-2">POTENTIAL DENIAL REASON:</div>
                  <div className="text-sm text-white bg-red-500/10 p-3 rounded border border-red-500/20">
                    "Documentation does not support level of service coded."
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
