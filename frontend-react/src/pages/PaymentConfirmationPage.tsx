import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Home, MessageCircle } from 'lucide-react'
import Button from '../components/ui/Button'

const PaymentConfirmationPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const reference = state?.reference || `REF-${Date.now()}`
  const amount = state?.amount || 0
  const property = state?.property || 'Property'
  const type = state?.type || 'payment'

  const isRent = type === 'rent'
  const isDeal = type === 'deal_sealing'

  const whatsappMessage = encodeURIComponent(
    `Hello Afodams Property, I just completed a ${isRent ? 'rent payment' : 'deal sealing'} for "${property}". Reference: ${reference}`
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
      <div className="container-premium max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-10 text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-14 h-14 text-green-500" />
          </motion.div>

          <h1 className="text-4xl font-playfair font-bold text-premium-black mb-3">
            {isDeal ? 'Deal Submitted!' : 'Payment Successful!'}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            {isDeal
              ? 'The landlord has been notified. Our team will contact you within 24 hours.'
              : 'Your payment has been received and confirmed.'}
          </p>

          {/* Receipt card */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-4">
            <h3 className="font-semibold text-premium-black text-center mb-4">Transaction Receipt</h3>
            <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
              <span className="text-gray-600">Reference</span>
              <span className="font-mono font-semibold text-premium-black">{reference}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
              <span className="text-gray-600">Property</span>
              <span className="font-semibold text-premium-black">{property}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
              <span className="text-gray-600">Transaction Type</span>
              <span className="font-semibold text-premium-black capitalize">
                {isRent ? 'Rent Payment' : isDeal ? 'Deal Sealing' : 'Payment'}
              </span>
            </div>
            {amount > 0 && (
              <div className="flex justify-between pt-2">
                <span className="font-bold text-premium-black">Amount</span>
                <span className="font-bold text-2xl text-luxury-gold">₦{amount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Next steps */}
          <div className="bg-blue-50 rounded-2xl p-5 mb-8 text-left">
            <h4 className="font-semibold text-premium-black mb-3">Next Steps</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {isDeal ? (
                <>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Landlord notified of your intent</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Our agent will contact you within 24 hours</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Property inspection will be scheduled</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Contract signing & final payment completion</li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Payment recorded in your rental history</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Landlord has been notified</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Receipt saved to your dashboard</li>
                </>
              )}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" onClick={() => navigate('/dashboard')}>
              <Home className="w-5 h-5" /> Go to Dashboard
            </Button>
            <a
              href={`https://wa.me/2348000000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto border-green-500 text-green-600 hover:bg-green-50">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </Button>
            </a>
            <Button variant="outline" onClick={() => window.print()}>
              <Download className="w-5 h-5" /> Save Receipt
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentConfirmationPage
