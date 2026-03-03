import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Toaster } from 'sonner';
import HeroOrb from './components/HeroOrb';
import AuditSimulator from './components/AuditSimulator';
import DashboardPreview from './components/DashboardPreview';
import LeadModal from './components/LeadModal';
import { GlassCard } from './components/ui/GlassCard';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [hasTriedSimulator, setHasTriedSimulator] = useState(false);

  // Exit-intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && hasTriedSimulator && !showModal) {
        setShowModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriedSimulator, showModal]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white dark overflow-x-hidden">
      <Toaster position="top-right" theme="dark" />
      
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#10b981]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/5">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#10b981] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">SignalSource</span>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-colors"
              data-deploy-ready="true"
            >
              Get Early Access
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-gray-400">Now in Private Beta</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                  SignalSource
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-4">
                  AI systems that make complex work simpler.
                </p>
                
                <p className="text-lg text-gray-400 mb-8 max-w-xl">
                  SignalSource builds focused AI tools that turn messy workflows into simple dashboards. Our first product helps small clinics see documentation gaps, risky encounters, and compliance tasks in one place.
                </p>

                <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#3b82f6]/20 to-[#10b981]/20 border border-white/10 mb-8">
                  <p className="text-base font-semibold text-white mb-1">Product V1:</p>
                  <p className="text-lg text-gray-200">Audit-prep and risk screening for small medical practices.</p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowModal(true)}
                    className="px-8 py-4 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-[#3b82f6]/20"
                    data-deploy-ready="true"
                  >
                    Try Demo Below
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all">
                    Learn More
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-[500px] flex items-center justify-center"
              >
                <HeroOrb />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bento Grid - Features */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Built for Medical Practices</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Real-time compliance monitoring that catches issues before they become denials.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard className="p-8 h-full hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-[#3b82f6]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Real-Time Risk Scoring</h3>
                  <p className="text-gray-400">Instantly identify high-risk encounters before submission to prevent denials.</p>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-8 h-full hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Auto Documentation Check</h3>
                  <p className="text-gray-400">AI reviews clinical notes against coding standards in seconds.</p>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2 lg:col-span-1"
              >
                <GlassCard className="p-8 h-full hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Simple Dashboard</h3>
                  <p className="text-gray-400">Color-coded cards show what needs attention. No complex training required.</p>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Audit Simulator */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-sm mb-4">
                <span className="text-[#3b82f6] font-semibold">INTERACTIVE DEMO</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Try the Audit Simulator</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Paste any encounter text and see how SignalSource identifies risk factors in real-time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AuditSimulator onComplete={() => setHasTriedSimulator(true)} />
            </motion.div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Clinical Audit Dashboard</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Monitor all patient encounters in one view. High-risk cases surface instantly with color-coded alerts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DashboardPreview />
            </motion.div>
          </div>
        </section>

        {/* Social Proof / Stats Bento */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="p-8 text-center">
                <div className="text-5xl font-bold text-[#3b82f6] mb-2">94%</div>
                <div className="text-gray-400">Accuracy Rate</div>
              </GlassCard>
              <GlassCard className="p-8 text-center">
                <div className="text-5xl font-bold text-[#10b981] mb-2">&lt;2s</div>
                <div className="text-gray-400">Analysis Time</div>
              </GlassCard>
              <GlassCard className="p-8 text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-gray-400">HIPAA Compliant</div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6">Ready to Secure Your Workflow?</h2>
              <p className="text-xl text-gray-400 mb-8">
                Join the waitlist for early access to SignalSource. Limited beta spots available.
              </p>
              <button 
                onClick={() => setShowModal(true)}
                className="px-12 py-5 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#10b981] hover:shadow-2xl hover:shadow-[#3b82f6]/30 text-white font-bold text-lg transition-all"
                data-deploy-ready="true"
              >
                Secure My Spot
              </button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6">
          <div className="container mx-auto text-center text-gray-500 text-sm">
            <p>© 2026 SignalSource. Building AI systems that make complex work simpler.</p>
            <p className="mt-2">HIPAA Compliant • SOC 2 Type II • End-to-End Encrypted</p>
          </div>
        </footer>
      </div>

      {/* Lead Modal with exit-intent trigger */}
      <AnimatePresence>
        {showModal && <LeadModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
