import { useState } from 'react';
import { usePolling } from '../lib/usePolling';
import { FileDown, FileText, CheckCircle2, AlertOctagon } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export default function EvidencePack() {
  const [encounterIds, setEncounterIds] = useState('');
  const { data, loading, error, execute } = usePolling<any>('/v1/evidence/jobs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({ encounter_ids: encounterIds.split('\\n').map(id => id.trim()).filter(Boolean) });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Evidence Pack</h1>
        <p className="text-gray-400">Generate comprehensive compliance evidence packets for specific encounter IDs.</p>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Encounter IDs (one per line)</label>
            <textarea 
              value={encounterIds}
              onChange={e => setEncounterIds(e.target.value)}
              className="w-full h-32 bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#3b82f6] font-mono text-sm"
              placeholder="ENC-2023-001&#10;ENC-2023-002&#10;ENC-2023-003"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !encounterIds.trim()}
            className="w-full py-3 px-4 bg-[#3b82f6] text-white font-medium rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating Pack...</>
            ) : (
               <><FileText className="w-5 h-5" /> Generate Evidence Pack</>
            )}
          </button>
        </form>
      </GlassCard>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {(data || error) && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
              Pack Ready
            </h2>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
              <FileDown className="w-4 h-4" />
              Download PDF
            </button>
          </div>
          
          <GlassCard className="p-0 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Encounter ID</th>
                  <th className="px-6 py-4 font-medium">Documents Found</th>
                  <th className="px-6 py-4 font-medium">Signatures Valid</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {['ENC-2023-001', 'ENC-2023-002', 'ENC-2023-003'].map((id, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-300">{id}</td>
                    <td className="px-6 py-4 text-gray-300">4/4</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Yes
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                        Complete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
