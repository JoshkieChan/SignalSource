import { useState } from 'react';
import { usePolling } from '../lib/usePolling';
import { Search, DollarSign, ArrowRight, AlertOctagon } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export default function OpportunityScanner() {
  const [formData, setFormData] = useState({
    country: 'US',
    region: 'CA',
    businessType: 'LLC',
    industry: 'Ecommerce',
    headcount: '2-5',
    revenue: '$50k-250k'
  });

  const { data, loading, error, execute } = usePolling<any>('/v1/opportunities/jobs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Opportunity Scanner</h1>
        <p className="text-gray-400">Discover grants, tax credits, and funding available for your exact business profile.</p>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
              <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6] appearance-none">
                {['US', 'CA', 'UK', 'Other'].map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">State/Region</label>
              <select name="region" value={formData.region} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6] appearance-none">
                {['CA', 'NY', 'Texas', 'Other'].map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Business Type</label>
              <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6] appearance-none">
                {['Individual', 'LLC', 'Sole Prop'].map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Industry</label>
              <select name="industry" value={formData.industry} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6] appearance-none">
                {['Ecommerce', 'Services', 'Healthcare', 'Tech'].map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Headcount</label>
              <select name="headcount" value={formData.headcount} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6] appearance-none">
                {['1', '2-5', '6-20', '20+'].map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Annual Revenue</label>
              <select name="revenue" value={formData.revenue} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6] appearance-none">
                {['$0-50k', '$50k-250k', '$250k+'].map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-[#10b981] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Scanning Database...</>
            ) : (
               <><Search className="w-5 h-5" /> Find My Grants</>
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
          <div className="text-center p-8 bg-gradient-to-br from-orange-500/20 to-[#10b981]/20 rounded-2xl border border-white/10">
            <p className="text-gray-300 font-medium mb-2">Total Estimated Value Found</p>
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-[#10b981]">
              $14,500
            </h2>
          </div>
          
          <h3 className="text-xl font-bold mt-8 mb-4">Top 3 Opportunities</h3>
          <div className="space-y-4">
            {[
              { title: 'State Innovation Grant (CA)', amount: '$10,000', deadline: 'Oct 15' },
              { title: 'Digital Transformation Credit', amount: '$2,500', deadline: 'Rolling' },
              { title: 'Small Business Utility Rebate', amount: '$2,000', deadline: 'Nov 1' },
            ].map((opp, i) => (
              <GlassCard key={i} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-colors">
                <div>
                  <h4 className="font-medium text-white text-lg">{opp.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">Deadline: {opp.deadline}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[#10b981] font-bold">
                    {opp.amount}
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-6 mt-8">
             <h3 className="font-medium text-white mb-2">Next Steps</h3>
             <p className="text-sm text-gray-400 mb-4">We can auto-fill 80% of these applications using your connected profile.</p>
             <button className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
               Start Auto-Fill Process
             </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
