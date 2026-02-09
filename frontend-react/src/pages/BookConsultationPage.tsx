import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import { Calendar, Phone, Mail, Building, FileText, CheckCircle, Shield } from 'lucide-react'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const BookConsultationPage = () => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    organizationType: '',
    serviceNeeded: '',
    description: '',
    preferredDate: '',
    preferredTime: ''
  })

  const organizationTypes = [
    'Government Agency',
    'Educational Institution',
    'Healthcare Organization',
    'Private Corporation',
    'Individual/Professional',
    'Other'
  ]

  const services = [
    'Consultation & Advisory',
    'Government Bids & Tenders',
    'Documentation Services',
    'Institutional Partnerships',
    'General Inquiry'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceNeeded) {
      toast.error('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Store in localStorage (temporary solution until backend integration)
    const existing = JSON.parse(localStorage.getItem('consultations') || '[]')
    const newConsultation = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    existing.push(newConsultation)
    localStorage.setItem('consultations', JSON.stringify(existing))

    // TODO: Replace with actual API call
    // await axios.post('/api/consultations', formData)

    toast.success('Consultation request received!')
    setSubmitted(true)

    // Scroll to success message
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-premium-black" />
          </div>

          <h1 className="text-4xl font-playfair font-bold mb-4">
            Request Received!
          </h1>

          <p className="text-gray-700 text-lg mb-6">
            Thank you for your consultation request, <strong>{formData.name}</strong>.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-premium-black mb-4">What Happens Next:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-xs text-premium-black">1</span>
                </div>
                <span className="text-gray-700">
                  We'll review your request and contact you within <strong>24 hours</strong> (business days)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-xs text-premium-black">2</span>
                </div>
                <span className="text-gray-700">
                  We'll reach out via email at <strong>{formData.email}</strong> and phone at <strong>{formData.phone}</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-xs text-premium-black">3</span>
                </div>
                <span className="text-gray-700">
                  We'll schedule your consultation at a time convenient for you
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-xs text-premium-black">4</span>
                </div>
                <span className="text-gray-700">
                  All discussions will be held in <strong>strict confidentiality</strong>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  organization: '',
                  organizationType: '',
                  serviceNeeded: '',
                  description: '',
                  preferredDate: '',
                  preferredTime: ''
                })
              }}
              variant="outline"
            >
              Submit Another Request
            </Button>
            <Button onClick={() => window.location.href = '/#'} variant="gradient">
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* HERO SECTION */}
      <section className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Book a <span className="text-gradient-gold">Consultation</span>
            </h1>
            <p className="text-lg text-gray-300">
              Schedule a confidential discussion to explore how we can support your needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-premium">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* FORM */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-premium-black mb-4">
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          placeholder="+234 800 000 0000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization (Optional)
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          placeholder="Your Organization"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-premium-black mb-4">
                      Project Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization Type
                        </label>
                        <select
                          name="organizationType"
                          value={formData.organizationType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                        >
                          <option value="">Select Type</option>
                          {organizationTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Needed *
                        </label>
                        <select
                          name="serviceNeeded"
                          value={formData.serviceNeeded}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                        >
                          <option value="">Select Service</option>
                          {services.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                        placeholder="Please provide details about your project, requirements, and any specific needs..."
                      />
                    </div>
                  </div>

                  {/* Scheduling Preferences */}
                  <div>
                    <h3 className="text-xl font-semibold text-premium-black mb-4">
                      Scheduling Preferences (Optional)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time
                        </label>
                        <input
                          type="time"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Confidentiality Notice */}
                  <div className="bg-luxury-gold/10 border border-luxury-gold/20 rounded-xl p-4 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      All information provided is held in <strong>strict confidentiality</strong>. 
                      Your details will only be used to contact you regarding your consultation request.
                    </p>
                  </div>

                  <Button type="submit" variant="gradient" size="lg" className="w-full">
                    Submit Consultation Request
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* SIDEBAR INFO */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 sticky top-24"
              >
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-premium-black mb-4">
                    What to Expect
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-premium-black">Quick Response</strong>
                        <p className="text-sm text-gray-600">We'll contact you within 24 business hours</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-premium-black">Flexible Scheduling</strong>
                        <p className="text-sm text-gray-600">Consultations at your convenience</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-premium-black">Confidential</strong>
                        <p className="text-sm text-gray-600">All discussions held in strict confidence</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-premium-black">No Obligation</strong>
                        <p className="text-sm text-gray-600">Free initial consultation with no commitment</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">Need Immediate Assistance?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-luxury-gold" />
                      <a href="tel:+2348012345678" className="hover:text-luxury-gold transition-colors">
                        +234 801 234 5678
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-luxury-gold" />
                      <a href="mailto:consultancy@afodams.com" className="hover:text-luxury-gold transition-colors">
                        consultancy@afodams.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookConsultationPage
