import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Home, Wallet, MessageSquare, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '2348000000000';

const BUDGET_OPTIONS = [
  'Under ₦20 million',
  '₦20 million – ₦50 million',
  '₦50 million – ₦100 million',
  '₦100 million – ₦200 million',
  'Above ₦200 million',
  'Open to discussion',
];

const PROPERTY_OPTIONS = [
  '3-Bedroom Detached — Ikeja, Lagos',
  '4-Bedroom Semi-Detached — Ikeja, Lagos',
  'Land (Commercial) — Ikeja',
  'Land (Residential) — Ikeja',
  'Other / Not sure yet',
];

interface LeadCaptureFormProps {
  source?: 'landing_page' | 'contact_form' | 'whatsapp' | 'other';
  ctaLabel?: string;
  compact?: boolean;
}

interface FormData {
  name: string;
  phone: string;
  propertyInterest: string;
  budget: string;
  message: string;
}

const emptyForm: FormData = {
  name: '',
  phone: '',
  propertyInterest: '',
  budget: '',
  message: '',
};

export function LeadCaptureForm({
  source = 'landing_page',
  ctaLabel = 'Book Inspection',
  compact = false,
}: LeadCaptureFormProps) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = 'Please enter your full name';
    if (!form.phone.trim() || !/^[+\d\s\-()]{7,20}$/.test(form.phone.trim())) newErrors.phone = 'Enter a valid phone number';
    if (!form.propertyInterest) newErrors.propertyInterest = 'Please select a property';
    if (!form.budget) newErrors.budget = 'Please select your budget range';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/leads`, { ...form, source });
      setSubmitted(true);
      setTimeout(() => {
        const waText = `Hello Afodams, my name is ${form.name}. I'm interested in: ${form.propertyInterest}. Budget: ${form.budget}. Please contact me to schedule an inspection.`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
      }, 1500);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again or reach us on WhatsApp.';
      toast.error(msg, { duration: 5000 });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  const inputClass = (field: keyof FormData) =>
    `w-full bg-[#0e2318] border rounded-lg px-4 py-3 text-white placeholder-[#5a7a65] text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[field] ? 'border-red-500 focus:ring-red-500/30' : 'border-[#2a4a35] focus:ring-[#c9a84c]/40 focus:border-[#c9a84c]'
    }`;

  const labelClass = 'block text-xs font-semibold uppercase tracking-widest text-[#8aab96] mb-1.5';

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center gap-4 py-10 text-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
          <CheckCircle className="w-16 h-16 text-[#25D366]" />
        </motion.div>
        <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
        <p className="text-[#8aab96] text-sm leading-relaxed max-w-xs">
          Thank you, <span className="text-[#c9a84c] font-semibold">{form.name}</span>. Our team will reach you at <span className="text-white font-semibold">{form.phone}</span> shortly.
          <br /><br />Opening WhatsApp so you can reach us directly too…
        </p>
        <button onClick={() => { setForm(emptyForm); setSubmitted(false); }} className="mt-2 text-xs text-[#5a7a65] underline underline-offset-2 hover:text-[#8aab96] transition-colors">
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label className={labelClass} htmlFor="lead-name"><User className="inline w-3 h-3 mr-1 -mt-0.5" />Full Name</label>
        <input id="lead-name" name="name" type="text" placeholder="e.g. Chukwuemeka Obi" value={form.name} onChange={handleChange} className={inputClass('name')} autoComplete="name" />
        <AnimatePresence>{errors.name && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1">{errors.name}</motion.p>}</AnimatePresence>
      </div>
      <div>
        <label className={labelClass} htmlFor="lead-phone"><Phone className="inline w-3 h-3 mr-1 -mt-0.5" />Phone Number</label>
        <input id="lead-phone" name="phone" type="tel" placeholder="+234 801 234 5678" value={form.phone} onChange={handleChange} className={inputClass('phone')} autoComplete="tel" />
        <AnimatePresence>{errors.phone && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1">{errors.phone}</motion.p>}</AnimatePresence>
      </div>
      <div>
        <label className={labelClass} htmlFor="lead-property"><Home className="inline w-3 h-3 mr-1 -mt-0.5" />Interested Property</label>
        <select id="lead-property" name="propertyInterest" value={form.propertyInterest} onChange={handleChange} className={`${inputClass('propertyInterest')} appearance-none`}>
          <option value="">Select a property…</option>
          {PROPERTY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <AnimatePresence>{errors.propertyInterest && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1">{errors.propertyInterest}</motion.p>}</AnimatePresence>
      </div>
      <div>
        <label className={labelClass} htmlFor="lead-budget"><Wallet className="inline w-3 h-3 mr-1 -mt-0.5" />Budget Range</label>
        <select id="lead-budget" name="budget" value={form.budget} onChange={handleChange} className={`${inputClass('budget')} appearance-none`}>
          <option value="">Select budget range…</option>
          {BUDGET_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <AnimatePresence>{errors.budget && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1">{errors.budget}</motion.p>}</AnimatePresence>
      </div>
      {!compact && (
        <div>
          <label className={labelClass} htmlFor="lead-message"><MessageSquare className="inline w-3 h-3 mr-1 -mt-0.5" />Message <span className="text-[#3d5e49] normal-case tracking-normal">(optional)</span></label>
          <textarea id="lead-message" name="message" placeholder="Any specific questions, preferred viewing times, or additional details…" value={form.message} onChange={handleChange} rows={3} className={`${inputClass('message')} resize-none`} />
        </div>
      )}
      <motion.button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#d4b560] text-[#0a1a0f] font-bold text-sm uppercase tracking-widest rounded-lg py-4 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1" whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</> : <>{ctaLabel}<ArrowRight className="w-4 h-4" /></>}
      </motion.button>
      <p className="text-center text-[#3d5e49] text-xs">No spam. Your details are safe with us.</p>
    </form>
  );
}
