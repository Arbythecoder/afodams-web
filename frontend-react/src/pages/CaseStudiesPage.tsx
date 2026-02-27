import { motion } from 'framer-motion'
import { Shield, Building2, FileCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      icon: Building2,
      category: 'Institutional Procurement',
      title: 'Corporate Procurement Documentation',
      client: 'Confidential',
      challenge: 'A corporate client required comprehensive documentation and compliance support for a major institutional procurement process with strict requirements and tight deadlines.',
      solution: 'We provided end-to-end documentation preparation, compliance verification, and strategic advisory services throughout the submission process.',
      outcome: 'Successfully submitted complete, compliant documentation package. Client reported the process was significantly smoother than previous attempts.',
      duration: '3 weeks',
      services: ['Consultation & Advisory', 'Compliance Verification', 'Documentation Preparation'],
      image: 'https://images.unsplash.com/photo-1580983218765-e6519dfd3d21?w=1600&auto=format&fit=crop&q=80'
    },
    {
      icon: Shield,
      category: 'Institutional Documentation',
      title: 'University Procurement Documentation',
      client: 'Confidential',
      challenge: 'A vendor needed to prepare comprehensive procurement documentation for an institutional partnership with a major university, including compliance with institutional procurement policies.',
      solution: 'Developed complete documentation package aligned with university requirements, including all supporting materials, compliance certificates, and partnership proposals.',
      outcome: 'Documentation accepted without revision. Client established successful long-term institutional partnership.',
      duration: '2 weeks',
      services: ['Institutional Partnerships', 'Documentation Services', 'Consultation & Advisory'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80'
    },
    {
      icon: FileCheck,
      category: 'Multi-Property Documentation',
      title: 'Portfolio Title Verification',
      client: 'Confidential',
      challenge: 'An investor required comprehensive title verification and documentation for a portfolio of multiple properties across different states, each with unique regulatory requirements.',
      solution: 'Conducted thorough verification processes for each property, compiled all necessary documentation, and provided detailed status reports and recommendations.',
      outcome: 'Identified and resolved potential issues in 2 titles before transaction. Complete documentation package facilitated smooth closing process.',
      duration: '4 weeks',
      services: ['Documentation Services', 'Verification & Review', 'Consultation & Advisory'],
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&auto=format&fit=crop&q=80'
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
              Case <span className="text-gradient-gold">Studies</span>
            </h1>
            <p className="text-xl text-gray-300">
              Real-world examples of how we've helped clients achieve their documentation and advisory objectives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONFIDENTIALITY NOTICE */}
      <section className="py-12 bg-luxury-gold/10 border-y border-luxury-gold/20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-luxury-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-premium-black mb-2">
                  Confidentiality Notice
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To protect our clients' privacy and maintain the confidentiality commitments that are 
                  central to our practice, all case studies presented below have been anonymized. Specific 
                  client names, identifying details, and sensitive information have been removed or generalized. 
                  These examples represent the types of engagements we undertake and demonstrate our capabilities 
                  while respecting our clients' need for discretion.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-white">
        <div className="container-premium">
          <div className="space-y-16">
            {caseStudies.map((study, index) => {
              const Icon = study.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Image Section */}
                    <div className="md:col-span-2 relative overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full min-h-[300px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-premium-black/60 to-transparent flex items-end p-8">
                        <div className="text-white">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="w-6 h-6" />
                            <span className="text-sm font-medium">{study.category}</span>
                          </div>
                          <h3 className="text-2xl font-playfair font-bold">
                            {study.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-3 p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-medium text-gray-500">CLIENT:</span>
                        <span className="text-sm font-semibold text-premium-black">{study.client}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm font-medium text-gray-500">DURATION:</span>
                        <span className="text-sm font-semibold text-premium-black">{study.duration}</span>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-premium-black mb-2">Challenge</h4>
                          <p className="text-gray-700 leading-relaxed">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-premium-black mb-2">Our Solution</h4>
                          <p className="text-gray-700 leading-relaxed">{study.solution}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-premium-black mb-2">Outcome</h4>
                          <p className="text-gray-700 leading-relaxed">{study.outcome}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-premium-black mb-3">Services Provided</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-gradient-gold/10 text-premium-black text-sm font-medium rounded-lg border border-luxury-gold/30"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RESULTS SUMMARY */}
      <section className="py-20 bg-gray-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Proven Track Record
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-12">
              Across educational institutions, private corporations, and individual clients, we've consistently
              delivered comprehensive documentation and advisory services that meet the highest standards of
              professionalism, accuracy, and confidentiality.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-gradient-gold mb-2">50+</div>
                <p className="text-gray-700">Successful Projects</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-gradient-gold mb-2">100%</div>
                <p className="text-gray-700">Confidentiality Maintained</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-gradient-gold mb-2">95%</div>
                <p className="text-gray-700">Client Satisfaction</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-gradient-gold mb-2">3</div>
                <p className="text-gray-700">Key Industries Served</p>
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
              Let's Discuss Your Project
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Every project is unique. Schedule a confidential consultation to explore how we can support your specific needs.
            </p>
            <Link to="/book-consultation">
              <Button size="lg" variant="gradient">
                Book a Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CaseStudiesPage
