import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, Shield, AlertCircle, Users, CreditCard, Ban } from 'lucide-react'

const TermsPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* HERO SECTION */}
      <section className="relative py-16 bg-gradient-dark text-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Terms of <span className="text-gradient-gold">Service</span>
            </h1>
            <p className="text-lg text-gray-300">
              Please read these terms carefully before using the Afodams Property platform.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last Updated: February 2026</p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-white">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto space-y-12">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-luxury-gold/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using the Afodams Property Limited platform, website, or any of our services,
                  you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree
                  to these terms, please do not use our platform.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">2. Use of Platform</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  You agree to use the platform only for lawful purposes and in accordance with Nigerian law.
                  You must be at least 18 years old to create an account or transact on the platform.
                </p>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'You are responsible for maintaining the security of your account credentials.',
                    'All information provided during registration must be accurate and truthful.',
                    'You must not share your login credentials with any third party.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">3. Property Listings & Accuracy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Landlords and agents are solely responsible for the accuracy of property listings.
                  Afodams Property does not guarantee the accuracy, completeness, or legality of any listing.
                  We reserve the right to remove any listing that violates these terms.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">4. Payments & Transactions</h2>
                <p className="text-gray-600 leading-relaxed">
                  All payments processed through the platform are handled securely via Paystack.
                  Service fees are non-refundable unless otherwise agreed in writing.
                  Rental payments and investment amounts are subject to the agreements between the parties involved.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <Ban className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">5. Prohibited Conduct</h2>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Posting false, misleading, or fraudulent property listings',
                    'Impersonating another person or entity',
                    'Using the platform to launder money or engage in illegal transactions',
                    'Scraping, hacking, or attempting unauthorised access to the platform',
                    'Harassing, abusing, or threatening other users',
                    'Circumventing fees or payment systems',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  Afodams Property Limited shall not be liable for any indirect, incidental, special,
                  or consequential damages arising from your use of the platform. Our total liability
                  shall not exceed the amount paid by you for our services in the preceding three months.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">7. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes
                shall be resolved through arbitration in Lagos, Nigeria.
              </p>
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to update these Terms at any time. Continued use of the platform
                after changes are posted constitutes acceptance of the revised Terms.
              </p>
            </motion.div>

            <div className="text-center pt-4">
              <p className="text-gray-500">
                Questions?{' '}
                <Link to="/contact" className="text-luxury-gold hover:underline font-semibold">Contact Us</Link>
                {' '}or review our{' '}
                <Link to="/privacy" className="text-luxury-gold hover:underline font-semibold">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsPage
