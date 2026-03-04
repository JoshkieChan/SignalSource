import { useState } from 'react';
import { usePolling } from '../lib/usePolling';
import { Video, Star, CheckCircle2, AlertOctagon, TrendingUp } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export default function CreatorFeed() {
  const [videoCsv, setVideoCsv] = useState('');
  const [emailCsv, setEmailCsv] = useState('');
  const [salesCsv, setSalesCsv] = useState('');
  const [platforms, setPlatforms] = useState({
    youtube: false,
    tiktok: false,
    email: false,
    gumroad: false
  });

  const { data, loading, error, execute } = usePolling<any>('/v1/creator/jobs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({
      video_analytics_csv_url: videoCsv,
      email_analytics_csv_url: emailCsv,
      sales_csv_url: salesCsv,
      platforms: Object.entries(platforms).filter(([_, v]) => v).map(([k]) => k)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Creator Feed</h1>
        <p className="text-gray-400">Analyze cross-platform content performance to generate your unified action plan.</p>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Video Analytics CSV URL (Optional)</label>
              <input 
                type="text" 
                value={videoCsv}
                onChange={e => setVideoCsv(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6]"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Analytics CSV URL (Optional)</label>
              <input 
                type="text" 
                value={emailCsv}
                onChange={e => setEmailCsv(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6]"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Sales CSV URL (Optional)</label>
              <input 
                type="text" 
                value={salesCsv}
                onChange={e => setSalesCsv(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3b82f6]"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Platforms</label>
            <div className="flex flex-wrap gap-4">
              {['YouTube', 'TikTok', 'Email', 'Gumroad'].map(platform => (
                <label key={platform} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={platforms[platform.toLowerCase() as keyof typeof platforms]}
                    onChange={e => setPlatforms({...platforms, [platform.toLowerCase()]: e.target.checked})}
                    className="rounded bg-black/50 border-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-black"
                  />
                  <span className="text-sm text-gray-300">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-[#3b82f6] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing Content...</>
            ) : (
               <><TrendingUp className="w-5 h-5" /> Get Action Plan</>
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
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Performance Insights
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6 space-y-4">
              <h3 className="font-medium inline-flex items-center gap-2 text-white">
                <Star className="w-4 h-4 text-purple-400" />
                Top Performing Content
              </h3>
              <div className="space-y-3">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex gap-4 items-center">
                  <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">"5 Productivity Hacks"</p>
                    <p className="text-xs text-green-400">+24% CTR vs average</p>
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex gap-4 items-center">
                   <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">"Setup Tour 2024"</p>
                    <p className="text-xs text-green-400">High retention rate (68%)</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
             <h3 className="font-medium text-white mb-4">Action Plan</h3>
             <ul className="space-y-3">
               {[
                 'Double down on "Productivity" topic for next 3 YouTube shorts', 
                 'Repurpose "Setup Tour 2024" into a detailed newsletter breakdown', 
                 'Link your Gumroad Notion template in the top 5 highest traffic videos',
                 'A/B test thumbnails for videos under 3% CTR'
               ].map((action, i) => (
                 <li key={i} className="flex gap-3 text-sm text-gray-300">
                   <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                   {action}
                 </li>
               ))}
             </ul>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
