import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Plus, LogIn, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

const dashboardRoutes: Record<string, string> = {
  admin: '/admin/dashboard',
  landlord: '/landlord/dashboard',
  tenant: '/tenant/dashboard',
  investor: '/investor/dashboard',
  agent: '/agent/dashboard',
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setUserMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Process', path: '/process' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  const dashboardPath = user ? (dashboardRoutes[user.role] ?? '/dashboard') : '/dashboard'
  const initials = user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : ''

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-premium">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-all">
              <span className="text-2xl font-playfair font-bold text-premium-black">A</span>
            </div>
            <div>
              <h1 className="text-xl font-playfair font-bold text-gradient-gold">
                Afodams Property
              </h1>
              <p className="text-xs text-gray-600">Advisory & Documentation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-luxury-gold'
                    : isScrolled
                    ? 'text-gray-700 hover:text-luxury-gold'
                    : 'text-white hover:text-luxury-gold'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              /* Logged-in user menu */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-gold text-premium-black font-semibold hover:shadow-gold transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-premium-black flex items-center justify-center text-luxury-gold text-xs font-bold">
                    {initials}
                  </div>
                  <span className="max-w-[120px] truncate text-sm">{user.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-sm font-semibold text-premium-black truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold capitalize">
                          {user.role}
                        </span>
                      </div>
                      <div className="py-1">
                        <Link
                          to={dashboardPath}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-luxury-gold transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          My Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-luxury-gold transition-colors"
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Guest buttons */
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/book-consultation">
                  <Button variant="gold" size="sm">
                    <Plus className="w-4 h-4" />
                    Book Consultation
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-gradient-gold text-premium-black"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container-premium py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 font-medium ${
                    isActive(link.path)
                      ? 'text-luxury-gold'
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-gray-100">
                {user ? (
                  <>
                    <div className="px-3 py-2 bg-gray-50 rounded-xl mb-3">
                      <p className="font-semibold text-premium-black">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold capitalize">
                        {user.role}
                      </span>
                    </div>
                    <Link to={dashboardPath} onClick={() => setIsOpen(false)}>
                      <Button variant="gold" size="sm" className="w-full">
                        <LayoutDashboard className="w-4 h-4" />
                        My Dashboard
                      </Button>
                    </Link>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        <User className="w-4 h-4" />
                        My Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/book-consultation" onClick={() => setIsOpen(false)}>
                      <Button variant="gold" size="sm" className="w-full">
                        <Plus className="w-4 h-4" />
                        Book Consultation
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
