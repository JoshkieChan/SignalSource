import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Activity, AlertTriangle, ShieldCheck, ArrowRight, CheckCircle, UploadCloud, X } from 'lucide-react';
import { toast } from 'sonner';

// Components (will be extracted later if needed)
import HeroOrb from '../components/HeroOrb';
import AuditSimulator from '../components/AuditSimulator';
import DashboardPreview from '../components/DashboardPreview';
import LeadModal from '../components/LeadModal';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#3b82f6] selection:text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#10b981] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span>SignalSource</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#product" className="hover:text-white transition-colors">Product</a>
            <a href="#audit" className="hover:text-white transition-colors">Audit Simulator</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium transition-all backdrop-blur-sm"
          >
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] text-xs font-semibold uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
              System V1.0 Live
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              AI systems that make <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#10b981]">complex work simpler.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-lg leading-relaxed"
            >
              Audit‑prep and risk screening for small medical practices. SignalSource builds focused AI tools that turn messy workflows into simple dashboards.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button 
                onClick={() => navigate('/dashboard')}
                className="group px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                data-deploy-ready="true"
              >
                Start Free Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-medium backdrop-blur-sm"
              >
                Try Simulator
              </button>
            </motion.div>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            <HeroOrb />
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3b82f6]/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#10b981]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      </section>

      {/* Bento Grid Features */}
      <section id="product" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for precision.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our first product helps small clinics see documentation gaps, risky encounters, and compliance tasks in one place.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Feature 1: Large */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 row-span-1 rounded-3xl bg-white/5 border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-colors"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#3b82f6]/20 flex items-center justify-center mb-4 text-[#3b82f6]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Unified Dashboard</h3>
                  <p className="text-gray-400">All your clinical data normalized into one clean view.</p>
                </div>
              </div>
              <div className="absolute top-1/2 right-0 w-2/3 h-full translate-x-1/4 translate-y-12 md:translate-y-8 opacity-50 group-hover:opacity-80 transition-opacity duration-500">
                <DashboardPreview mini />
              </div>
            </motion.div>

            {/* Feature 2: Compliance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl bg-white/5 border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#10b981]/20 flex items-center justify-center mb-4 text-[#10b981]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Risk Screening</h3>
              <p className="text-gray-400">Automated checks against latest compliance rules.</p>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                 <div className="px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-xs font-bold border border-[#10b981]/30">Passed</div>
                 <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">Flagged</div>
              </div>
            </motion.div>

            {/* Feature 3: Real-time */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl bg-white/5 border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Real-time Analysis</h3>
              <p className="text-gray-400">Instant feedback on encounter notes as you type.</p>
            </motion.div>

            {/* Feature 4: Integration */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col md:flex-row items-center gap-8"
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Seamless Integration</h3>
                <p className="text-gray-400">Connects directly with your existing EHR systems. Placeholder integration ready for Supabase & Airtable.</p>
              </div>
              <div className="flex-1 w-full p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-gray-500">
                <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                  <span>API Status</span>
                  <span className="text-green-400">Connected</span>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <span className="text-blue-400">{`>`}</span>
                    <span>Initializing sync...</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-400">{`>`}</span>
                    <span>Fetching patient records...</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-400">{`>`}</span>
                    <span className="text-white">Analysis complete (0.4s)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Audit Simulator */}
      <section id="audit" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#3b82f6] font-bold tracking-wider uppercase text-sm mb-2 block">Interactive Demo</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Live Audit Simulator</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Paste anonymized encounter text below to see our AI identify risks in real-time.</p>
          </div>
          
          <AuditSimulator onComplete={() => setTimeout(() => setShowModal(true), 2000)} />
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 px-6 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Clinical Audit Dashboard</h2>
              <p className="text-gray-400 max-w-xl">A complete view of your practice's health. Monitor risk levels, pending reviews, and revenue impact.</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-full bg-[#3b82f6] text-white font-medium hover:bg-[#2563eb] transition-colors whitespace-nowrap"
            >
              View Full Demo
            </button>
          </div>
          
          <DashboardPreview />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter opacity-80">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#10b981] flex items-center justify-center">
              <Activity className="w-3 h-3 text-white" />
            </div>
            <span>SignalSource</span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2026 SignalSource AI. All rights reserved.
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showModal && <LeadModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
