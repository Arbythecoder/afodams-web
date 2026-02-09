import { motion } from 'framer-motion'
import { ArrowRight, Shield, FileCheck, Scale, Lock, Building2, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const HomePage = () => {
  const services = [
    {
      icon: FileCheck,
      title: 'Consultation & Advisory',
      description: 'Expert guidance on government contracts, institutional partnerships, and strategic documentation.',
      link: '/services#consultation'
    },
    {
      icon: Scale,
      title: 'Government Bids & Tenders',
      description: 'Comprehensive support for RFP responses, bid preparation, and compliance verification.',
      link: '/services#bids'
    },
    {
      icon: Shield,
      title: 'Documentation Services',
      description: 'Property documentation, legal process support, and regulatory compliance assistance.',
      link: '/services#documentation'
    },
    {
      icon: Building2,
      title: 'Institutional Partnerships',
      description: 'Procurement support, partnership structuring, and institutional engagement strategies.',
      link: '/services#partnerships'
    }
  ]

  const industries = [
    {
      title: 'Government Agencies',
      description: 'Supporting public sector procurement and compliance requirements',
      icon: '🏛️'
    },
    {
      title: 'Institutions',
      description: 'Universities, hospitals, and large organizations',
      icon: '🏢'
    },
    {
      title: 'Private Clients',
      description: 'Individual and corporate documentation needs',
      icon: '👤'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'Confidential discussion to understand your specific requirements and objectives.'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Tailored approach designed for your unique situation and compliance needs.'
    },
    {
      step: '03',
      title: 'Documentation & Support',
      description: 'Meticulous preparation and review of all required materials.'
    },
    {
      step: '04',
      title: 'Delivery & Follow-up',
      description: 'Secure handoff with ongoing support until your objectives are achieved.'
    }
  ]

  const caseStudies = [
    {
      title: 'Federal Government Contract Support',
      category: 'Government Bid',
      outcome: 'Successfully supported bid submission process',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800'
    },
    {
      title: 'Institutional Procurement Documentation',
      category: 'Compliance',
      outcome: 'Complete documentation package delivered',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800'
    },
    {
      title: 'Multi-Property Legal Verification',
      category: 'Documentation',
      outcome: 'Comprehensive verification completed',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920"
            alt="Professional Advisory"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container-premium relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-luxury-gold/20 border border-luxury-gold/40 rounded-full px-6 py-2 mb-8"
            >
              <Lock className="w-4 h-4 text-luxury-gold" />
              <span className="text-luxury-gold font-semibold text-sm uppercase tracking-wide">
                Confidential & Professional
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight">
              AFODAMS Property Limited
            </h1>
            <p className="text-3xl md:text-4xl font-light mb-8 text-gray-300">
              Advisory, Government Bids Support,<br />
              <span className="text-luxury-gold">and Secure Documentation</span>
            </p>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Expert consultancy services for government contracts, institutional partnerships,
              and comprehensive documentation with absolute confidentiality.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-consultation">
                <Button variant="gold" size="lg" className="w-full sm:w-auto">
                  <FileCheck className="w-5 h-5" />
                  Book a Consultation
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/secure-docs">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">
                  <Lock className="w-5 h-5" />
                  Submit Documents Securely
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-luxury-gold" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-luxury-gold" />
                <span>Compliance-Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-luxury-gold" />
                <span>Secure Document Handling</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="py-24 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-premium mb-6 inline-block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized consultancy services designed to support your most critical business
              and institutional needs with professionalism and discretion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.a
                key={service.title}
                href={service.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-luxury-gold hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-premium-black" />
                </div>
                <h3 className="text-2xl font-bold text-premium-black mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 inline-flex items-center text-luxury-gold font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:ml-3 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Trusted by government agencies, institutions, and private clients
              across Nigeria for sensitive and high-stakes engagements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="text-5xl mb-4">{industry.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{industry.title}</h3>
                <p className="text-gray-400">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS SECTION */}
      <section className="py-24 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-premium mb-6 inline-block">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured, confidential approach designed to deliver results
              while maintaining the highest standards of professionalism.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="text-6xl font-bold text-luxury-gold/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-premium-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>

                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-luxury-gold/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-6">
                Why Trust AFODAMS
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-premium-black mb-2">
                    Absolute Confidentiality
                  </h3>
                  <p className="text-gray-600">
                    All client engagements are handled with strict NDAs and secure document protocols.
                    Your sensitive information never leaves our protected systems.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-premium-black mb-2">
                    Compliance-Aware
                  </h3>
                  <p className="text-gray-600">
                    Deep understanding of Nigerian regulatory frameworks, government procurement
                    processes, and institutional requirements.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-premium-black mb-2">
                    Experienced Professionals
                  </h3>
                  <p className="text-gray-600">
                    Our team brings decades of combined experience in government relations,
                    legal documentation, and institutional partnerships.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-premium-black mb-2">
                    Proven Track Record
                  </h3>
                  <p className="text-gray-600">
                    Successfully supported numerous government bids, institutional partnerships,
                    and complex documentation projects across Nigeria.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES PREVIEW SECTION */}
      <section className="py-24 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-premium mb-6 inline-block">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-6">
              Recent Engagements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A glimpse into our recent work supporting clients in achieving their objectives
              with professionalism and discretion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-luxury-gold text-premium-black text-xs font-bold px-3 py-1 rounded-full">
                    {study.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-premium-black mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600">
                    {study.outcome}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/case-studies">
              <Button variant="outline" size="lg">
                View All Case Studies
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Schedule a confidential consultation to discuss your requirements,
              or securely submit your documents through our encrypted portal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-consultation">
                <Button variant="gold" size="lg" className="w-full sm:w-auto">
                  <FileCheck className="w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">
                  Contact Us
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              All consultations are confidential. We respect your privacy.{' '}
              <Link to="/privacy" className="text-luxury-gold hover:underline">
                Read our Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
