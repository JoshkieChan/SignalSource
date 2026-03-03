import React from 'react';
import { motion } from 'motion/react';
import { X, Lock, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

interface LeadModalProps {
  onClose: () => void;
}

interface FormData {
  fullName: string;
  clinicName: string;
  email: string;
}

export default function LeadModal({ onClose }: LeadModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!supabase) {
      toast.error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }

    const { error } = await supabase.from('leads').insert([
      {
        full_name: data.fullName,
        clinic_name: data.clinicName,
        email: data.email,
      },
    ]);

    if (error) {
      toast.error('Could not submit form. Please try again.');
      return;
    }

    toast.success("Spot secured! We'll be in touch shortly.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
      >
        {/* Decorative background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#3b82f6]/20 rounded-full blur-3xl pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            Limited Beta Access
          </div>
          <h3 className="text-2xl font-bold mb-2">Secure Your Workflow</h3>
          <p className="text-gray-400 text-sm">Join top clinics using SignalSource to automate compliance. Book your 10-minute audit session today.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Full Name</label>
            <input 
              {...register('fullName', { required: true })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
              placeholder="Dr. Jane Doe"
            />
            {errors.fullName && <span className="text-red-500 text-xs">Name is required</span>}
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Clinic Name</label>
            <input 
              {...register('clinicName', { required: true })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
              placeholder="Downtown Medical Group"
            />
            {errors.clinicName && <span className="text-red-500 text-xs">Clinic name is required</span>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email Address</label>
            <input 
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
              placeholder="jane@clinic.com"
              type="email"
            />
            {errors.email && <span className="text-red-500 text-xs">Valid email is required</span>}
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              data-deploy-ready="true"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Securing...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Secure Workflow
                </>
              )}
            </button>
            <button 
              type="button"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
              title="Book Audit"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-600">
          We respect patient data privacy (HIPAA Compliant).
        </div>
      </motion.div>
    </div>
  );
}

