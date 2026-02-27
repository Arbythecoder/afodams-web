import { motion } from 'framer-motion'
import { GraduationCap, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const IndustriesPage = () => {
  const industries = [
    {
      icon: GraduationCap,
      title: 'Institutions & Organizations',
      description: 'Comprehensive documentation and advisory services for universities, hospitals, and large organizations.',
      services: [
        'Institutional procurement documentation',
        'Partnership and MOU preparation',
        'Compliance and accreditation support',
        'Stakeholder engagement strategies',
        'Organizational documentation systems',
      ],
      caseStudy: 'Delivered complete procurement documentation packages for multiple educational institutions',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80'
    },
    {
      icon: Users,
      title: 'Private Clients & Corporations',
      description: 'Professional documentation services for individual and corporate clients requiring expert support.',
      services: [
        'Property title verification and documentation',
        'Legal document preparation support',
        'Corporate compliance documentation',
        'Contract review and advisory',
        'Confidential document management',
      ],
      caseStudy: 'Provided comprehensive documentation support for multi-property transactions and corporate partnerships',
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&auto=format&fit=crop&q=80'
    }
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
              Industries <span className="text-gradient-gold">We Serve</span>
            </h1>
            <p className="text-xl text-gray-300">
              Specialized consultancy and documentation services tailored to your sector's unique requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES DETAIL SECTION */}
      <section className="py-20 bg-white">
        <div className="container-premium">
          <div className="space-y-16">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              const isReversed = index % 2 === 1

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    isReversed ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={isReversed ? 'md:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                        <Icon className="w-8 h-8 text-premium-black" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-playfair font-bold text-premium-black">
                        {industry.title}
                      </h2>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {industry.description}
                    </p>

                    <h3 className="font-semibold text-premium-black mb-4 text-lg">
                      Our Services for This Sector:
                    </h3>
                    <ul className="space-y-3 mb-6">
                      {industry.services.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center mt-0.5 flex-shrink-0">
                            <span className="text-xs text-premium-black">✓</span>
                          </div>
                          <span className="text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-gray-50 border-l-4 border-luxury-gold p-4 rounded-r-lg mb-6">
                      <p className="text-sm text-gray-600 italic">
                        <strong className="text-premium-black">Success Story:</strong> {industry.caseStudy}
                      </p>
                    </div>

                    <Link to="/book-consultation">
                      <Button variant="gradient">
                        Discuss Your Needs
                      </Button>
                    </Link>
                  </div>

                  <div className={isReversed ? 'md:order-1' : ''}>
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CROSS-SECTOR CAPABILITIES */}
      <section className="py-20 bg-gray-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Cross-Sector Expertise
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Our experience spans multiple industries, allowing us to bring best practices and insights 
              from diverse sectors to your project. Whether you're an educational institution, 
              or private corporation, we understand the unique compliance requirements, documentation standards, 
              and confidentiality expectations of your industry.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-gradient-gold mb-2">50+</div>
                <p className="text-gray-700">Successful Projects</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-gradient-gold mb-2">100%</div>
                <p className="text-gray-700">Confidentiality Maintained</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-gradient-gold mb-2">15+</div>
                <p className="text-gray-700">Years Combined Experience</p>
              </div>
            </div>
          </motion.div>
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
              Your Industry, Our Expertise
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our specialized services can support your specific sector requirements.
            </p>
            <Link to="/book-consultation">
              <Button size="lg" variant="gradient">
                Schedule a Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default IndustriesPage
