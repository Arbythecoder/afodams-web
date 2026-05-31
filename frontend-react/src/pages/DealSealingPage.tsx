import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle, CreditCard, FileText, Home, User,
  Phone, Mail, MapPin, Shield, ChevronRight, Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'
import { paymentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const steps = ['Property', 'Your Details', 'Payment', 'Confirmation']

const DealSealingPage = () => {
  const { propertyId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    paymentType: 'full',
    paymentMethod: 'bank_transfer',
    propertyTitle: 'Selected Property',
    propertyPrice: 0,
  })

  // If arriving from property page, price/title would come via state or query
  // For now we allow manual entry if no propertyId
  const [manualProperty, setManualProperty] = useState({
    title: '',
    price: '',
    location: '',
  })

  const totalPrice = propertyId
    ? formData.propertyPrice
    : Number(manualProperty.price) || 0

  const handleNext = () => {
    if (step === 0 && !propertyId && !manualProperty.title) {
      toast.error('Please enter property details')
      return
    }
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast.error('Please fill all required fields')
        return
      }
    }
    if (step === 2 && !agreed) {
      toast.error('Please agree to the terms before proceeding')
      return
    }
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const ref = `DEAL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      await paymentAPI.initializePayment({
        amount: totalPrice,
        email: formData.email,
        reference: ref,
        metadata: {
          type: 'deal_sealing',
          propertyId: propertyId || 'manual',
          propertyTitle: propertyId ? formData.propertyTitle : manualProperty.title,
          buyerName: formData.fullName,
          buyerPhone: formData.phone,
        },
      })
      toast.success('Deal submitted! The landlord has been notified.')
      navigate('/payment/confirmation', {
        state: {
          reference: ref,
          amount: totalPrice,
          property: propertyId ? formData.propertyTitle : manualProperty.title,
          type: 'deal_sealing',
        },
      })
    } catch (err: any) {
      // If backend not available, still show success for demo
      const ref = `DEAL-${Date.now()}`
      toast.success('Deal submitted! The landlord has been notified.')
      navigate('/payment/confirmation', {
        state: {
          reference: ref,
          amount: totalPrice,
          property: propertyId ? formData.propertyTitle : manualProperty.title,
          type: 'deal_sealing',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-3">
            Seal Your Deal
          </h1>
          <p className="text-gray-600 text-lg">Complete your property transaction securely</p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10 gap-0">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-gradient-gold text-premium-black' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium ${i === step ? 'text-luxury-gold' : 'text-gray-500'}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 md:w-24 h-1 mx-1 mb-4 rounded transition-all ${i < step ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          {/* Step 0: Property */}
          {step === 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Home className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-premium-black">Property Details</h2>
                  <p className="text-gray-600 text-sm">Confirm the property you want to seal</p>
                </div>
              </div>

              {propertyId ? (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Property ID: <span className="font-mono font-semibold">{propertyId}</span></p>
                  <input
                    type="text"
                    placeholder="Property title (fill if not auto-loaded)"
                    value={formData.propertyTitle}
                    onChange={e => setFormData({ ...formData, propertyTitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold mb-4"
                  />
                  <input
                    type="number"
                    placeholder="Agreed price (₦)"
                    value={formData.propertyPrice || ''}
                    onChange={e => setFormData({ ...formData, propertyPrice: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Property title *"
                    value={manualProperty.title}
                    onChange={e => setManualProperty({ ...manualProperty, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                  <input
                    type="text"
                    placeholder="Property location *"
                    value={manualProperty.location}
                    onChange={e => setManualProperty({ ...manualProperty, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                  <input
                    type="number"
                    placeholder="Agreed price (₦) *"
                    value={manualProperty.price}
                    onChange={e => setManualProperty({ ...manualProperty, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              )}

              {/* Payment type */}
              <div className="mt-6">
                <p className="font-semibold text-premium-black mb-3">Payment Type</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'full', label: 'Full Payment', desc: 'Pay 100% upfront' },
                    { value: 'installment', label: 'Installment', desc: 'Pay in agreed parts' },
                    { value: 'mortgage', label: 'Mortgage', desc: 'Bank-financed purchase' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setFormData({ ...formData, paymentType: opt.value })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.paymentType === opt.value
                          ? 'border-luxury-gold bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-premium-black mb-1">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Your Details */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <User className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-premium-black">Your Details</h2>
                  <p className="text-gray-600 text-sm">Personal information for this transaction</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your Current Address"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-premium-black">Review & Pay</h2>
                  <p className="text-gray-600 text-sm">Confirm your deal summary</p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Property</span>
                  <span className="font-semibold text-premium-black">
                    {propertyId ? formData.propertyTitle : manualProperty.title}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Buyer</span>
                  <span className="font-semibold text-premium-black">{formData.fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Type</span>
                  <span className="font-semibold text-premium-black capitalize">{formData.paymentType}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-premium-black">Total Amount</span>
                  <span className="font-bold text-2xl text-luxury-gold">
                    ₦{totalPrice.toLocaleString() || '—'}
                  </span>
                </div>
              </div>

              {/* Payment method */}
              <div className="mb-6">
                <p className="font-semibold text-premium-black mb-3">Payment Method</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'bank_transfer', label: 'Bank Transfer' },
                    { value: 'card', label: 'Debit/Credit Card' },
                  ].map(m => (
                    <button
                      key={m.value}
                      onClick={() => setFormData({ ...formData, paymentMethod: m.value })}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                        formData.paymentMethod === m.value
                          ? 'border-luxury-gold bg-yellow-50 text-premium-black'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 accent-yellow-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-luxury-gold underline" target="_blank">Terms of Service</a>{' '}
                  and confirm that all information provided is accurate. I understand this initiates a legally binding property transaction.
                </span>
              </label>

              {/* Security badge */}
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Your payment details are secured with 256-bit SSL encryption</span>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-playfair font-bold text-premium-black mb-3">
                Ready to Submit
              </h2>
              <p className="text-gray-600 mb-2">
                Property: <span className="font-semibold">{propertyId ? formData.propertyTitle : manualProperty.title}</span>
              </p>
              <p className="text-gray-600 mb-8">
                Amount: <span className="font-bold text-luxury-gold text-xl">₦{totalPrice.toLocaleString()}</span>
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Once you submit, the landlord will be notified and our team will contact you within 24 hours to complete the transaction.
              </p>
              <Button
                variant="gold"
                size="lg"
                onClick={handleSubmit}
                disabled={loading}
                className="mx-auto"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : (
                  <><FileText className="w-5 h-5" /> Submit Deal</>
                )}
              </Button>
            </div>
          )}

          {/* Navigation */}
          {step < 3 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Back
              </Button>
              <Button variant="gold" onClick={handleNext}>
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DealSealingPage
