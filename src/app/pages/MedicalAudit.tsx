import AuditSimulator from "../components/AuditSimulator";
import DashboardPreview from "../components/DashboardPreview";
import { motion } from "motion/react";

export default function MedicalAudit() {
  return (
    <div className="space-y-24">
      <section>
        <div className="mb-12">
          <span className="text-[#3b82f6] font-bold tracking-wider uppercase text-sm mb-2 block">Interactive Demo</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Live Audit Simulator</h2>
          <p className="text-gray-400 max-w-2xl">Paste anonymized encounter text below to see our AI identify risks in real-time.</p>
        </div>
        <AuditSimulator onComplete={() => {}} />
      </section>

      <section>
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Clinical Audit Dashboard</h2>
          <p className="text-gray-400 max-w-xl">A complete view of your practice's health. Monitor risk levels, pending reviews, and revenue impact.</p>
        </div>
        <DashboardPreview />
      </section>
    </div>
  );
}
