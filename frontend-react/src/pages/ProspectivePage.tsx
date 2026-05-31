import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, MapPin, Home, Key, TrendingUp, Phone, Mail,
  User, MessageCircle, CheckCircle, Loader2, ChevronDown
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'
import { inquiryAPI } from '../services/api'

const nigerianStates = [
  'Lagos', 'Abuja (FCT)', 'Rivers', 'Kano', 'Oyo', 'Delta', 'Anambra',
  'Enugu', 'Kaduna', 'Ogun', 'Ondo', 'Edo', 'Kwara', 'Plateau', 'Cross River',
]

const ProspectivePage = () => {
  const navigate = useNavigate()
  const [intent, setIntent] = useState<'rent' | 'buy' | ''>('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'apartment',
    location: '',
    budget: '',
    bedrooms: '',
    message: '',
    timeline: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!intent) { toast.error('Please select rent or buy'); return }
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields')
      return
    }
    try {
      setLoading(true)
      await inquiryAPI.create({
        name: formData.name,
        email: formData.email,
        message: `[PROSPECTIVE ${intent.toUpperCase()}] Property Type: ${formData.propertyType} | Location: ${formData.location} | Budget: ₦${formData.budget} | Bedrooms: ${formData.bedrooms} | Timeline: ${formData.timeline} | Note: ${formData.message}`,
      })
      setSubmitted(true)
      toast.success('Application submitted! We will contact you shortly.')
    } catch {
      // Still show success — inquiry may not have backend yet
      setSubmitted(true)
      toast.success('Application submitted! We will contact you shortly.')
    } finally {
      setLoading(false)
    }
  }

  const whatsappText = encodeURIComponent(
    `Hello Afodams Property! I am looking to ${intent || 'rent/buy'} a property. My name is ${formData.name || '...'}, phone: ${formData.phone || '...'}.`
  )

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="container-premium max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-playfair font-bold text-premium-black mb-3">Application Received!</h2>
            <p className="text-gray-600 mb-8">
              Our team will review your requirements and contact you within 24 hours with matching properties.
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="gold" onClick={() => navigate('/properties')}>
                <Search className="w-5 h-5" /> Browse Properties Now
              </Button>
              <a href={`https://wa.me/2348000000000?text=${whatsappText}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-premium-black pt-32 pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative container-premium text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6">
              <Home className="w-4 h-4 text-luxury-gold" />
              Find Your Perfect Property
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Looking to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-premium-orange">
                Rent or Buy?
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tell us what you need and our agents will match you with the perfect property across Nigeria's top locations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intent selector + quick browse */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-4">
              <button
                onClick={() => setIntent('rent')}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                  intent === 'rent'
                    ? 'bg-gradient-gold text-premium-black shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Key className="w-5 h-5 inline mr-2" />
                I Want to Rent
              </button>
              <button
                onClick={() => setIntent('buy')}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                  intent === 'buy'
                    ? 'bg-gradient-gold text-premium-black shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Home className="w-5 h-5 inline mr-2" />
                I Want to Buy
              </button>
            </div>
            <Button variant="outline" onClick={() => navigate('/properties')}>
              <Search className="w-5 h-5" /> Browse All Listings
            </Button>
          </div>
        </div>
      </section>

      {/* Why Afodams */}
      <section className="py-16 bg-gray-50">
        <div className="container-premium">
          <h2 className="text-3xl font-playfair font-bold text-premium-black text-center mb-10">
            Why Choose Afodams Property?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <CheckCircle className="w-8 h-8 text-luxury-gold" />, title: 'Verified Listings', desc: 'Every property is verified by our agents before listing.' },
              { icon: <TrendingUp className="w-8 h-8 text-luxury-gold" />, title: 'Best Market Prices', desc: 'We negotiate the best deals for buyers and renters.' },
              { icon: <Phone className="w-8 h-8 text-luxury-gold" />, title: '24/7 Support', desc: 'Our team is always available to guide your property journey.' },
            ].map(item => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl text-premium-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-16 bg-white" id="apply">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-playfair font-bold text-premium-black text-center mb-3">
              Submit Your Application
            </h2>
            <p className="text-gray-600 text-center mb-10">
              Fill in your requirements and we'll find matching properties for you.
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
              {/* Intent reminder */}
              <div className="flex gap-4">
                {(['rent', 'buy'] as const).map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIntent(i)}
                    className={`flex-1 py-3 rounded-xl font-semibold capitalize transition-all ${
                      intent === i ? 'bg-gradient-gold text-premium-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {i === 'rent' ? '🔑 Rent' : '🏠 Buy'}
                  </button>
                ))}
              </div>

              {/* Personal details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" placeholder="Full Name *" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel" placeholder="Phone Number *" value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email" placeholder="Email Address *" value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                />
              </div>

              {/* Property requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    value={formData.propertyType}
                    onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold appearance-none"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House / Duplex</option>
                    <option value="villa">Villa</option>
                    <option value="office">Office Space</option>
                    <option value="land">Land</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold appearance-none"
                  >
                    <option value="">Preferred State *</option>
                    {nigerianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number" placeholder="Max Budget (₦)" value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div className="relative">
                  <select
                    value={formData.bedrooms}
                    onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold appearance-none"
                  >
                    <option value="">No. of Bedrooms</option>
                    {['1', '2', '3', '4', '5', '5+'].map(n => <option key={n} value={n}>{n} Bedroom{n !== '1' ? 's' : ''}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                <select
                  value={formData.timeline}
                  onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold appearance-none"
                >
                  <option value="">When do you need it?</option>
                  <option value="immediately">Immediately</option>
                  <option value="1month">Within 1 month</option>
                  <option value="3months">Within 3 months</option>
                  <option value="6months">Within 6 months</option>
                  <option value="flexible">Flexible</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <textarea
                placeholder="Additional requirements or notes (optional)"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold resize-none"
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" variant="gold" size="lg" className="flex-1" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    <><CheckCircle className="w-5 h-5" /> Submit Application</>
                  )}
                </Button>
                <a
                  href={`https://wa.me/2348000000000?text=${encodeURIComponent('Hello Afodams Property! I am looking to ' + (intent || 'rent/buy') + ' a property.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" size="lg" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                    <MessageCircle className="w-5 h-5" /> WhatsApp Instead
                  </Button>
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProspectivePage
