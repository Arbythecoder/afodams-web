import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText, Server, Clock } from 'lucide-react'

const PrivacyPage = () => {
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
              Privacy <span className="text-gradient-gold">Policy</span>
            </h1>
            <p className="text-lg text-gray-300">
              Our commitment to protecting your information and maintaining absolute confidentiality.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last Updated: February 9, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONFIDENTIALITY COMMITMENT */}
      <section className="py-12 bg-luxury-gold/10 border-y border-luxury-gold/20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto flex items-start gap-4"
          >
            <Shield className="w-12 h-12 text-luxury-gold flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-playfair font-bold text-premium-black mb-3">
                Confidentiality is Our Foundation
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                At AFODAMS Property Limited, we understand that the work we do—supporting institutional
                partnerships and sensitive documentation—requires the highest levels of confidentiality
                and discretion. This privacy policy outlines how we collect, use, protect, and respect your information.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 bg-white">
        <div className="container-premium max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-luxury-gold" />
                <h2 className="text-3xl font-playfair font-bold text-premium-black m-0">
                  Information We Collect
                </h2>
              </div>

              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-premium-black mb-2">
                    Personal Information
                  </h3>
                  <p className="leading-relaxed">
                    When you engage our services, we may collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Name, email address, phone number, and contact details</li>
                    <li>Organization name and role (if applicable)</li>
                    <li>Business or professional information relevant to your project</li>
                    <li>Communication preferences and scheduling information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-premium-black mb-2">
                    Project-Related Information
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Documents and files you submit through our secure portal</li>
                    <li>Project descriptions, requirements, and objectives</li>
                    <li>Communications related to your engagement</li>
                    <li>Payment and billing information (processed securely)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-premium-black mb-2">
                    Technical Information
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address, browser type, and device information (for security)</li>
                    <li>Usage data and analytics (anonymized)</li>
                    <li>Cookies for session management and security</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-luxury-gold" />
                <h2 className="text-3xl font-playfair font-bold text-premium-black m-0">
                  How We Use Your Information
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  We use the information we collect solely for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Delivery:</strong> To provide consultancy, documentation, and advisory services you've requested</li>
                  <li><strong>Communication:</strong> To respond to inquiries, schedule consultations, and provide project updates</li>
                  <li><strong>Project Management:</strong> To manage your projects, maintain records, and ensure quality delivery</li>
                  <li><strong>Security:</strong> To protect against unauthorized access, fraud, and security threats</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                  <li><strong>Improvement:</strong> To improve our services and client experience (using anonymized data)</li>
                </ul>

                <div className="bg-gray-50 border-l-4 border-luxury-gold p-4 rounded-r-lg mt-6">
                  <p className="font-semibold text-premium-black m-0">
                    We will NEVER:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2 mb-0">
                    <li>Sell your personal information to third parties</li>
                    <li>Share your project details with unauthorized parties</li>
                    <li>Use your documents or information for purposes outside your engagement</li>
                    <li>Disclose client relationships without explicit permission</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-luxury-gold" />
                <h2 className="text-3xl font-playfair font-bold text-premium-black m-0">
                  How We Protect Your Data
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  We employ industry-leading security measures to protect your information:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-premium-black mb-2">Technical Safeguards</h4>
                    <ul className="text-sm space-y-1">
                      <li>• End-to-end encryption (SSL/TLS)</li>
                      <li>• Secure servers with access controls</li>
                      <li>• Regular security audits and updates</li>
                      <li>• Encrypted database storage</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-premium-black mb-2">Operational Safeguards</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Staff confidentiality agreements</li>
                      <li>• Limited access on need-to-know basis</li>
                      <li>• Secure document handling protocols</li>
                      <li>• Activity logging and monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Data Retention */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-luxury-gold" />
                <h2 className="text-3xl font-playfair font-bold text-premium-black m-0">
                  Data Retention and Deletion
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Active Projects:</strong> Information is retained for the duration of your engagement and necessary follow-up period
                  </li>
                  <li>
                    <strong>Completed Projects:</strong> Documents and project files are typically retained for 6 months after completion, unless you request earlier deletion or extended retention
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> Some information may be retained longer if required by law or regulation
                  </li>
                  <li>
                    <strong>Your Right to Delete:</strong> You can request deletion of your information at any time (subject to legal obligations)
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Third-Party Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-8 h-8 text-luxury-gold" />
                <h2 className="text-3xl font-playfair font-bold text-premium-black m-0">
                  Third-Party Services
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  We use select third-party services to support our operations. These providers are bound by strict 
                  confidentiality agreements and data protection standards:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cloud Storage:</strong> Secure, encrypted cloud storage for document management</li>
                  <li><strong>Payment Processing:</strong> PCI-compliant payment processors (we do not store payment details)</li>
                  <li><strong>Communication Tools:</strong> Secure email and messaging platforms</li>
                  <li><strong>Analytics:</strong> Anonymized usage analytics to improve our services</li>
                </ul>

                <p className="leading-relaxed mt-4">
                  All third-party providers are carefully vetted and required to maintain confidentiality and security 
                  standards consistent with this policy.
                </p>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-playfair font-bold text-premium-black mb-4">
                Your Rights
              </h2>

              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">You have the following rights regarding your information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your information (subject to legal obligations)</li>
                  <li><strong>Objection:</strong> Object to certain processing of your information</li>
                  <li><strong>Portability:</strong> Request a copy of your information in a portable format</li>
                  <li><strong>Withdrawal of Consent:</strong> Withdraw consent for processing where applicable</li>
                </ul>

                <p className="leading-relaxed mt-4">
                  To exercise any of these rights, please contact us at{' '}
                  <a href="mailto:privacy@afodams.com" className="text-luxury-gold hover:underline">
                    privacy@afodams.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Updates to Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-playfair font-bold text-premium-black mb-4">
                Updates to This Policy
              </h2>

              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. 
                  We will notify you of significant changes by email or prominent notice on our website. Your continued use of 
                  our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair font-bold text-premium-black mb-4">
                Contact Us
              </h2>

              <div className="bg-gradient-dark text-white p-8 rounded-2xl">
                <p className="mb-6">
                  If you have any questions, concerns, or requests regarding this privacy policy or how we handle your information:
                </p>

                <div className="space-y-3">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:privacy@afodams.com" className="text-luxury-gold hover:underline">
                      privacy@afodams.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+2348012345678" className="text-luxury-gold hover:underline">
                      +234 801 234 5678
                    </a>
                  </p>
                  <p>
                    <strong>AFODAMS Property Limited</strong><br />
                    Consultancy & Advisory Services<br />
                    Nigeria
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage
