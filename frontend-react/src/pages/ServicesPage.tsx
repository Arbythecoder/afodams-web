import { motion } from 'framer-motion'
import { FileCheck, Scale, Shield, Building2, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/ui/Button'

const ServicesPage = () => {
  const [expandedService, setExpandedService] = useState<number | null>(0)

  const services = [
    {
      icon: FileCheck,
      title: 'Consultation & Advisory',
      tagline: 'Expert Strategic Guidance',
      description: 'Professional consultation services for complex documentation, regulatory compliance, and institutional engagement.',
      features: [
        'Strategic documentation planning and review',
        'Regulatory compliance assessment',
        'Institutional partnership strategies',
        'Contract review and advisory',
        'Risk assessment and mitigation',
      ],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&auto=format&fit=crop&q=80'
    },
    {
      icon: Scale,
      title: 'Government Bids & Tenders',
      tagline: 'RFP & Procurement Support',
      description: 'Comprehensive support for government bid submissions, tender responses, and procurement documentation.',
      features: [
        'RFP response preparation and review',
        'Tender documentation compilation',
        'Compliance verification and checklists',
        'Bid submission coordination',
        'Post-submission follow-up support',
      ],
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&auto=format&fit=crop&q=80'
    },
    {
      icon: Shield,
      title: 'Documentation Services',
      tagline: 'Secure Document Management',
      description: 'Professional documentation services with absolute confidentiality for property, legal, and institutional documents.',
      features: [
        'Property title verification and review',
        'Legal document preparation support',
        'Document compilation and organization',
        'Secure document storage and retrieval',
        'Regulatory filing assistance',
      ],
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&auto=format&fit=crop&q=80'
    },
    {
      icon: Building2,
      title: 'Institutional Partnerships',
      tagline: 'Corporate & Government Engagement',
      description: 'Strategic support for institutional procurement, partnership structuring, and organizational engagement.',
      features: [
        'Institutional procurement documentation',
        'Partnership proposal development',
        'Corporate compliance support',
        'Stakeholder engagement strategies',
        'Institutional relationship management',
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80'
    }
  ]

  const faqs = [
    {
      question: 'How do you ensure confidentiality?',
      answer: 'All client information and documents are handled with the strictest confidentiality protocols. We use secure systems, encrypted communications, and strict access controls. Our team operates under professional confidentiality agreements.'
    },
    {
      question: 'What is your typical turnaround time?',
      answer: 'Turnaround times vary by project complexity. Initial consultations are scheduled within 48 hours. Standard documentation projects typically complete within 5-10 business days. Urgent requests can be accommodated with priority service.'
    },
    {
      question: 'Do you work with government agencies directly?',
      answer: 'We provide documentation and advisory support for government bid submissions and institutional partnerships. We assist clients in preparing comprehensive, compliant documentation packages but do not act as agents or intermediaries.'
    },
    {
      question: 'What industries do you serve?',
      answer: 'We work with government agencies, educational institutions, healthcare organizations, private corporations, and individual professionals requiring expert documentation and advisory services.'
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* HERO SECTION */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Professional <span className="text-gradient-gold">Consultancy Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Expert advisory, government bid support, and comprehensive documentation services with absolute confidentiality.
            </p>
            <Link to="/book-consultation">
              <Button size="lg" variant="gradient">
                Book a Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES DETAIL SECTION */}
      <section className="py-20 bg-white">
        <div className="container-premium">
          <div className="space-y-8">
            {services.map((service, index) => {
              const Icon = service.icon
              const isExpanded = expandedService === index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div
                    onClick={() => setExpandedService(isExpanded ? null : index)}
                    className="p-8 cursor-pointer flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                        <Icon className="w-8 h-8 text-premium-black" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-playfair font-bold text-premium-black mb-1">
                          {service.title}
                        </h3>
                        <p className="text-luxury-gold font-medium">{service.tagline}</p>
                      </div>
                    </div>
                    <div className="text-luxury-gold">
                      {isExpanded ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200"
                    >
                      <div className="grid md:grid-cols-2 gap-8 p-8">
                        <div>
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-64 object-cover rounded-xl shadow-lg"
                          />
                        </div>
                        <div>
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          <h4 className="font-semibold text-premium-black mb-4">What We Provide:</h4>
                          <ul className="space-y-3 mb-6">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center mt-0.5 flex-shrink-0">
                                  <span className="text-xs text-premium-black">✓</span>
                                </div>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Link to="/book-consultation">
                            <Button variant="gradient" className="w-full md:w-auto">
                              Request This Service
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Answers to common questions about our services and confidentiality commitments
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-premium-black mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule a confidential consultation to discuss your specific needs.
            </p>
            <Link to="/book-consultation">
              <Button size="lg" variant="gradient">
                Book Your Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
