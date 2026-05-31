import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          title="Back to top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowUp className="w-5 h-5 text-premium-black" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
