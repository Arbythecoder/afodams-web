import { motion } from 'framer-motion'
import { PhoneCall, FileText, Settings, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const ProcessPage = () => {
  const steps = [
    {
      number: '01',
      icon: PhoneCall,
      title: 'Initial Consultation',
      description: 'Confidential discussion to understand your specific requirements, timeline, and objectives.',
      details: [
        'Schedule a call or in-person meeting at your convenience',
        'Discuss your documentation or advisory needs in detail',
        'Review compliance requirements and objectives',
        'Receive a clear scope of work and timeline estimate',
        'All discussions held in strict confidentiality',
      ],
      duration: '30-60 minutes',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop&q=80'
    },
    {
      number: '02',
      icon: Settings,
      title: 'Strategy Development',
      description: 'Tailored approach designed specifically for your unique situation and compliance needs.',
      details: [
        'Develop customized documentation strategy',
        'Identify all required materials and information',
        'Create detailed project timeline and milestones',
        'Assign dedicated team members to your project',
        'Establish secure communication channels',
      ],
      duration: '2-3 business days',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=80'
    },
    {
      number: '03',
      icon: FileText,
      title: 'Documentation & Execution',
      description: 'Meticulous preparation, review, and compilation of all required materials with regular updates.',
      details: [
        'Comprehensive document preparation and review',
        'Multiple quality assurance checkpoints',
        'Regular progress updates and status reports',
        'Collaborative review sessions as needed',
        'Rigorous compliance and accuracy verification',
      ],
      duration: '5-15 business days (varies by complexity)',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Delivery & Support',
      description: 'Secure handoff of completed materials with ongoing support until your objectives are achieved.',
      details: [
        'Secure delivery of all documentation',
        'Detailed briefing on contents and usage',
        'Post-delivery Q&A and clarification support',
        'Follow-up assistance as needed',
        'Continued confidentiality and secure archiving',
      ],
      duration: 'Ongoing as needed',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=80'
    }
  ]

  const commitments = [
    {
      title: 'Absolute Confidentiality',
      description: 'All client information, documents, and communications are protected under strict confidentiality agreements.'
    },
    {
      title: 'Professional Standards',
      description: 'Every project is handled with the highest professional and ethical standards, ensuring quality and integrity.'
    },
    {
      title: 'Transparent Communication',
      description: 'Regular updates and clear communication at every stage, so you always know the status of your project.'
    },
    {
      title: 'Flexible Approach',
      description: 'Our process adapts to your specific needs, timeline, and level of urgency while maintaining quality standards.'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* HERO SECTION */}
      <section className="relative py-24 bg-gradient-dark text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Our <span className="text-gradient-gold">Process</span>
            </h1>
            <p className="text-xl text-gray-300">
              A proven 4-step approach that ensures quality, confidentiality, and successful outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROCESS STEPS SECTION */}
      <section className="py-20 bg-white">
        <div className="container-premium">
          <div className="space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isReversed = index % 2 === 1

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Connector Line (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-full h-24 w-0.5 bg-gradient-to-b from-luxury-gold to-transparent -translate-x-1/2"></div>
                  )}

                  <div className={`grid md:grid-cols-2 gap-12 items-center ${
                    isReversed ? 'md:flex-row-reverse' : ''
                  }`}>
                    <div className={isReversed ? 'md:order-2' : ''}>
                      <div className="flex items-start gap-6 mb-6">
                        <div className="relative">
                          <div className="text-7xl font-playfair font-bold text-luxury-gold/20">
                            {step.number}
                          </div>
                          <div className="absolute -top-2 -right-2 w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                            <Icon className="w-8 h-8 text-premium-black" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-premium-black mb-3">
                            {step.title}
                          </h2>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <h3 className="font-semibold text-premium-black mb-4">
                          What Happens in This Stage:
                        </h3>
                        <ul className="space-y-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-premium-black">✓</span>
                              </div>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-luxury-gold"></div>
                        <span><strong>Typical Duration:</strong> {step.duration}</span>
                      </div>
                    </div>

                    <div className={isReversed ? 'md:order-1' : ''}>
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* OUR COMMITMENTS */}
      <section className="py-20 bg-gray-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Our Commitments to You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every step of our process and every client relationship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-premium-black mb-3">
                  {commitment.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {commitment.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-dark text-white">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Ready to Start?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Begin with a confidential consultation to discuss your specific needs and objectives.
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

export default ProcessPage
