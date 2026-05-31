import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, Shield, Zap, Trees, Car, School, ShoppingBag,
  Clock, CheckCircle, Phone, ChevronDown, AlertTriangle,
} from 'lucide-react';
import { LeadCaptureForm } from '../components/leads/LeadCaptureForm';
import { WhatsAppButton } from '../components/leads/WhatsAppButton';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const PROPERTY_FEATURES = [
  { icon: <Shield className="w-5 h-5" />, label: 'Secured Estate', desc: '24/7 manned gate & CCTV coverage' },
  { icon: <Zap className="w-5 h-5" />, label: 'Constant Power', desc: 'Estate generator + pre-paid meter' },
  { icon: <Trees className="w-5 h-5" />, label: 'Green Environment', desc: 'Landscaped compound, serene setting' },
  { icon: <Car className="w-5 h-5" />, label: 'Ample Parking', desc: 'Private garage + visitor parking' },
];

const LOCATION_BENEFITS = [
  { icon: <School className="w-5 h-5" />, label: 'Schools Nearby', detail: 'Top private & international schools within 10 min' },
  { icon: <ShoppingBag className="w-5 h-5" />, label: 'Retail & Dining', detail: 'Ikeja City Mall, Shoprite, local markets close by' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Airport Access', detail: '15 min drive to Murtala Muhammed International Airport' },
  { icon: <Car className="w-5 h-5" />, label: 'Road Network', detail: 'Ojota, Maryland, Lagos-Ibadan Expressway all accessible' },
];

const INCLUSIONS = [
  'Fully tiled floors (ground floor & bedrooms)',
  'Modern fitted kitchen with cabinet and counter top',
  'All bathrooms en-suite with quality fittings',
  'POP ceiling with recessed lighting',
  'Pre-installed air conditioning points',
  'Perimeter fence with electric gate',
  'Borehole + overhead tank water supply',
  'C of O — Title document available',
];

const URGENCY_SLOTS = [
  { date: 'Sat 28 Jun', status: 'available' },
  { date: 'Sun 29 Jun', status: 'available' },
  { date: 'Mon 30 Jun', status: 'booked' },
  { date: 'Tue 1 Jul', status: 'available' },
  { date: 'Wed 2 Jul', status: 'few_left' },
];

export default function IkejaLanding() {
  function scrollToForm() {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div className="min-h-screen bg-[#07120d] text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* ── URGENCY BANNER ─────────────────────────────────────────── */}
      <div className="bg-[#c9a84c] text-[#07120d] text-center py-2.5 px-4">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          Ileya Special — Limited Viewing Slots Available · Book Before They Fill
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
        </p>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)`, backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3c2e]/80 via-[#07120d]/60 to-[#07120d]" />
        <div className="absolute inset-0">
          <img
            src="/images/ikeja-property-hero.jpg"
            alt="Premium property in Ikeja Lagos"
            className="w-full h-full object-cover opacity-25"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left — copy */}
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em]">Ikeja, Lagos · Premium Property</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Secure Your<br /><span className="text-[#c9a84c]">Family Home</span><br />This Ileya
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-[#9db8a8] text-base sm:text-lg leading-relaxed max-w-md mb-8">
              A family-friendly property in the heart of Ikeja — fully finished, gated estate, with title documentation. The perfect home to grow into.
            </motion.p>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="inline-flex flex-col mb-8 bg-[#0e2318] border border-[#2a4a35] rounded-xl px-6 py-4">
              <span className="text-[#5a7a65] text-xs uppercase tracking-widest mb-1">Asking Price</span>
              <span className="text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>₦ — Contact for Price</span>
              <span className="text-[#5a7a65] text-xs mt-1">Flexible payment plans available · C of O</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-3">
              <button onClick={scrollToForm} className="bg-[#c9a84c] hover:bg-[#d4b560] text-[#07120d] font-bold px-7 py-3.5 rounded-lg text-sm uppercase tracking-widest transition-colors duration-200 flex items-center gap-2">
                Book Inspection<ChevronDown className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '2348000000000'}?text=${encodeURIComponent("Hi, I saw the Ikeja property listing. I'd like more details.")}`}
                target="_blank" rel="noopener noreferrer"
                className="border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold px-7 py-3.5 rounded-lg text-sm uppercase tracking-widest transition-all duration-200 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />WhatsApp Us
              </a>
            </motion.div>
          </div>

          {/* Right — form card */}
          <motion.div id="inquiry-form" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.3 }} className="bg-[#0a1a0f]/90 backdrop-blur-md border border-[#2a4a35] rounded-2xl p-7 shadow-2xl">
            <div className="mb-5">
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-1">Free Property Consultation</p>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Request Property Details</h2>
              <p className="text-[#5a7a65] text-xs mt-1.5">Fill the form — our team responds within 2 hours.</p>
            </div>
            <LeadCaptureForm source="landing_page" ctaLabel="Book Inspection" />
          </motion.div>
        </div>
      </section>

      {/* ── INSPECTION SLOTS ───────────────────────────────────────── */}
      <section className="py-12 bg-[#0e2318] border-y border-[#2a4a35]">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between mb-6">
              <div>
                <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-1">Viewing Schedule</p>
                <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Limited Viewing Slots Available</h3>
              </div>
              <div className="flex items-center gap-2 bg-red-900/30 border border-red-700/40 rounded-lg px-4 py-2">
                <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-300 text-xs font-semibold">Slots filling fast this Ileya season</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {URGENCY_SLOTS.map((slot) => (
                <div key={slot.date} className={`rounded-xl px-4 py-3 text-center border text-sm font-semibold ${slot.status === 'booked' ? 'bg-[#1a0a0a] border-red-900/40 text-red-500 line-through opacity-60' : slot.status === 'few_left' ? 'bg-[#1a1500] border-yellow-700/50 text-yellow-400' : 'bg-[#071a0f] border-[#2a4a35] text-[#8aab96] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors cursor-pointer'}`}>
                  <div>{slot.date}</div>
                  <div className="text-xs font-normal mt-0.5 opacity-70">{slot.status === 'booked' ? 'Fully Booked' : slot.status === 'few_left' ? 'Last Slot' : 'Available'}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROPERTY FEATURES ──────────────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-2">Why This Property</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Built for Comfortable Family Living</h2>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROPERTY_FEATURES.map((f, i) => (
            <FadeIn key={f.label} delay={i * 0.08}>
              <div className="bg-[#0e2318] border border-[#2a4a35] rounded-2xl p-6 hover:border-[#c9a84c]/50 transition-colors duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] mb-4 group-hover:bg-[#c9a84c]/20 transition-colors">{f.icon}</div>
                <h4 className="font-bold text-white mb-1.5">{f.label}</h4>
                <p className="text-[#5a7a65] text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <div className="mt-12 bg-[#0e2318] border border-[#2a4a35] rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>What's Included</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {INCLUSIONS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                  <span className="text-[#9db8a8] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── LOCATION BENEFITS ──────────────────────────────────────── */}
      <section className="py-20 bg-[#0e2318] border-y border-[#2a4a35]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-2">Prime Location</p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Ikeja — Lagos' Administrative Hub</h2>
              <p className="text-[#5a7a65] text-sm mt-3 max-w-lg mx-auto">Everything your family needs is within reach — schools, hospitals, malls, and major road networks.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {LOCATION_BENEFITS.map((b, i) => (
              <FadeIn key={b.label} delay={i * 0.1}>
                <div className="flex items-start gap-4 bg-[#071a0f] border border-[#1a3c2e] rounded-xl p-5">
                  <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] flex-shrink-0">{b.icon}</div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{b.label}</h4>
                    <p className="text-[#5a7a65] text-sm leading-relaxed">{b.detail}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-8 rounded-2xl overflow-hidden border border-[#2a4a35] bg-[#071a0f] h-56 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-[#c9a84c] mx-auto mb-2" />
                <p className="text-[#5a7a65] text-sm">Ikeja, Lagos State, Nigeria</p>
                <a href="https://maps.google.com/?q=Ikeja,Lagos" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] text-xs underline underline-offset-2 mt-1 block hover:text-[#d4b560] transition-colors">
                  View on Google Maps →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BOTTOM CTA / FORM ──────────────────────────────────────── */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-3">Don't Miss This</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Ready to Schedule a Viewing?</h2>
            <p className="text-[#5a7a65] text-sm max-w-md mx-auto">Fill the form below or send us a WhatsApp message — our team will confirm your inspection slot within 2 hours.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="bg-[#0e2318] border border-[#2a4a35] rounded-2xl p-8 shadow-2xl max-w-lg mx-auto">
            <LeadCaptureForm source="landing_page" ctaLabel="Book My Inspection" />
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#2a4a35] py-10 text-center px-6">
        <p className="text-xl font-bold text-[#c9a84c] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Afodams Property Management</p>
        <p className="text-[#3d5e49] text-xs">Licensed Property Consultants · Lagos, Nigeria</p>
        <p className="text-[#3d5e49] text-xs mt-3">© {new Date().getFullYear()} Afodams Property Management. All rights reserved.</p>
      </footer>

      <WhatsAppButton
        phoneNumber={import.meta.env.VITE_WHATSAPP_NUMBER}
        prefilledMessage="Hello Afodams, I'm interested in the Ikeja property listing. Please send me more details."
      />
    </div>
  );
}
