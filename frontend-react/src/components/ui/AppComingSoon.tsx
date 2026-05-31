import { motion } from 'framer-motion'
import { Smartphone, Bell, Home, FileCheck, Shield, TrendingUp, Star } from 'lucide-react'
import { useState } from 'react'

const AppComingSoon = () => {
  const [email, setEmail] = useState('')
  const [notified, setNotified] = useState(false)

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setNotified(true)
      setEmail('')
      setTimeout(() => setNotified(false), 4000)
    }
  }

  const features = [
    { icon: <Home className="w-4 h-4" />, text: 'Browse & manage properties on the go' },
    { icon: <FileCheck className="w-4 h-4" />, text: 'Submit documents securely from anywhere' },
    { icon: <Bell className="w-4 h-4" />, text: 'Real-time notifications & updates' },
    { icon: <TrendingUp className="w-4 h-4" />, text: 'Track investments & consultations' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-dark py-20">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-luxury-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-premium-orange/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-premium-orange/20 border border-premium-orange/40 rounded-full px-5 py-2 mb-6">
              <Smartphone className="w-4 h-4 text-premium-orange" />
              <span className="text-premium-orange font-semibold text-sm uppercase tracking-wider">
                Mobile App
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4 leading-tight">
              Afodams{' '}
              <span className="text-gradient-gold">In Your Pocket</span>
            </h2>

            {/* Coming Soon pill */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-premium-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-premium-orange" />
              </span>
              <span className="text-premium-orange font-bold text-lg tracking-wide">Coming Soon</span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              The full Afodams experience — property consultancy, document submission,
              investment tracking, and dashboard management — all from your phone.
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-10">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0 text-premium-black">
                    {f.icon}
                  </div>
                  {f.text}
                </motion.li>
              ))}
            </ul>

            {/* Notify Me Form */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-3">Get notified when we launch:</p>
              {notified ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-luxury-gold font-semibold"
                >
                  <Star className="w-5 h-5" />
                  You're on the list! We'll notify you at launch.
                </motion.div>
              ) : (
                <form onSubmit={handleNotify} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold text-sm"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-gradient-gold text-premium-black font-bold rounded-xl hover:shadow-orange transition-all text-sm whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
              )}
            </div>

            {/* Store Badges */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 opacity-60 cursor-not-allowed select-none">
                <div className="text-white">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.19 1.28-2.17 3.83.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.75M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Download on the</div>
                  <div className="text-white text-sm font-semibold">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 opacity-60 cursor-not-allowed select-none">
                <div className="text-white">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6-2.93-2.93L3.18 23.76zm16.44-10.31L17 12l2.62-1.45L5.18.28C4.83.08 4.44.03 4.06.1l12.59 12.6 2.97.75zM2.75 1.3C2.59 1.64 2.5 2.03 2.5 2.5v19c0 .47.09.87.25 1.2l12.6-12.6L2.75 1.3zm16.45 9.31l-2.24-1.24L14.03 12l2.93 2.93 2.24-1.24c.64-.36.64-1.66 0-2.08z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Get it on</div>
                  <div className="text-white text-sm font-semibold">Google Play</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-end h-[480px]"
          >
            {/* Back Phone */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute left-4 md:left-12 bottom-0 w-44 h-80 rounded-[2.5rem] border-4 border-white/20 bg-premium-brown shadow-2xl overflow-hidden"
              style={{ transform: 'rotate(-8deg)', zIndex: 1 }}
            >
              {/* Back phone screen — Property view */}
              <div className="w-full h-full bg-gradient-to-b from-premium-brown to-premium-brown-dark p-3 flex flex-col gap-2">
                <div className="bg-gradient-gold rounded-xl p-2 text-center">
                  <div className="text-premium-black text-xs font-bold">Featured Listings</div>
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white/10 rounded-xl overflow-hidden flex-1">
                    <div className="h-2/3 bg-gradient-to-br from-premium-orange/30 to-luxury-gold/20" />
                    <div className="px-2 py-1">
                      <div className="h-1.5 bg-white/30 rounded mb-1 w-3/4" />
                      <div className="h-1.5 bg-luxury-gold/50 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/60 rounded-full" />
            </motion.div>

            {/* Front Phone */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-52 h-96 rounded-[2.8rem] border-4 border-luxury-gold/60 bg-premium-brown-dark shadow-orange overflow-hidden"
              style={{ zIndex: 2 }}
            >
              {/* Front phone screen — Dashboard view */}
              <div className="w-full h-full bg-gradient-to-b from-premium-brown-dark to-premium-brown p-3 flex flex-col gap-2.5">
                {/* Status bar */}
                <div className="flex justify-between items-center px-1">
                  <div className="text-white/60 text-xs">9:41</div>
                  <div className="flex gap-1">
                    {[1,2,3].map(i=><div key={i} className="w-1 h-2 bg-white/40 rounded-sm" style={{height: `${i*3+2}px`}}/>)}
                  </div>
                </div>
                {/* Header */}
                <div className="bg-gradient-gold rounded-2xl p-3">
                  <div className="text-premium-black text-xs font-bold mb-0.5">Welcome back</div>
                  <div className="text-premium-black/70 text-xs">Afodams Dashboard</div>
                </div>
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {['Properties','Documents','Consults','Investments'].map((label, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-2 text-center">
                      <div className="text-luxury-gold text-sm font-bold">{['12','8','3','₦4M'][i]}</div>
                      <div className="text-white/50 text-xs">{label}</div>
                    </div>
                  ))}
                </div>
                {/* Activity list */}
                <div className="flex-1 space-y-1.5 overflow-hidden">
                  {['New consultation','Document ready','Property update'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5">
                      <div className="w-2 h-2 rounded-full bg-gradient-gold flex-shrink-0" />
                      <div className="text-white/60 text-xs truncate">{item}</div>
                    </div>
                  ))}
                </div>
                {/* Bottom nav */}
                <div className="flex justify-around bg-white/10 rounded-2xl py-2">
                  {[Home, FileCheck, Bell, Shield].map((Icon, i) => (
                    <div key={i} className={`p-1.5 rounded-lg ${i===0 ? 'bg-gradient-gold' : ''}`}>
                      <Icon className={`w-3.5 h-3.5 ${i===0 ? 'text-premium-black' : 'text-white/50'}`} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-2 bg-black/60 rounded-full" />
            </motion.div>

            {/* Glow effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-luxury-gold/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AppComingSoon
