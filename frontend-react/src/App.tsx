import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Context
import { AuthProvider } from './context/AuthContext'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ProfilePage from './pages/ProfilePage'
import PropertyListPage from './pages/PropertyListPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import DealSealingPage from './pages/DealSealingPage'
import ProspectivePage from './pages/ProspectivePage'
import PaymentConfirmationPage from './pages/PaymentConfirmationPage'

// Consultancy Pages
import ServicesPage from './pages/ServicesPage'
import IndustriesPage from './pages/IndustriesPage'
import ProcessPage from './pages/ProcessPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import BookConsultationPage from './pages/BookConsultationPage'
import SecureDocsPage from './pages/SecureDocsPage'

// Auth Pages
import RoleSelector from './pages/auth/RoleSelector'
import LandlordSignup from './pages/auth/LandlordSignup'
import TenantSignup from './pages/auth/TenantSignup'
import InvestorSignup from './pages/auth/InvestorSignup'
import AgentSignup from './pages/auth/AgentSignup'

// Dashboard Pages
import DashboardPage from './pages/DashboardPage'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import LandlordDashboard from './pages/dashboards/LandlordDashboard'
import TenantDashboard from './pages/dashboards/TenantDashboard'
import InvestorDashboard from './pages/dashboards/InvestorDashboard'
import AgentDashboard from './pages/dashboards/AgentDashboard'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Route Guards
import ProtectedRoute from './components/auth/ProtectedRoute'
import GuestRoute from './components/auth/GuestRoute'

// UI Utilities
import BackToTop from './components/ui/BackToTop'
import ScrollToTop from './components/ui/ScrollToTop'
import AppComingSoon from './components/ui/AppComingSoon'

// Lead Capture
import IkejaLanding from './pages/IkejaLanding'
import { WhatsAppButton } from './components/leads/WhatsAppButton'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <ScrollToTop />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/book-consultation" element={<BookConsultationPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Lead Capture Landing Pages */}
              <Route path="/ikeja" element={<IkejaLanding />} />

              {/* Property Public Routes */}
              <Route path="/properties" element={<PropertyListPage />} />
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/prospective" element={<ProspectivePage />} />
              <Route path="/payment/confirmation" element={<PaymentConfirmationPage />} />

              {/* Guest-only Routes (redirect to dashboard if already logged in) */}
              <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
              <Route path="/forgot-password" element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />
              <Route path="/signup" element={<GuestRoute><RoleSelector /></GuestRoute>} />
              <Route path="/signup/landlord" element={<GuestRoute><LandlordSignup /></GuestRoute>} />
              <Route path="/signup/tenant" element={<GuestRoute><TenantSignup /></GuestRoute>} />
              <Route path="/signup/investor" element={<GuestRoute><InvestorSignup /></GuestRoute>} />
              <Route path="/signup/agent" element={<GuestRoute><AgentSignup /></GuestRoute>} />

              {/* Profile (Protected) */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Secure Document Upload (Protected) */}
              <Route
                path="/secure-docs"
                element={
                  <ProtectedRoute>
                    <SecureDocsPage />
                  </ProtectedRoute>
                }
              />

              {/* Deal Sealing (Protected) */}
              <Route
                path="/deals/seal"
                element={
                  <ProtectedRoute>
                    <DealSealingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/deals/seal/:propertyId"
                element={
                  <ProtectedRoute>
                    <DealSealingPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Role-Specific Dashboards */}
              <Route
                path="/landlord/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['landlord', 'admin']}>
                    <LandlordDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenant/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['tenant', 'admin']}>
                    <TenantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/investor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['investor', 'admin']}>
                    <InvestorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agent/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['agent', 'admin']}>
                    <AgentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all: redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <BackToTop />
          <WhatsAppButton />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'linear-gradient(135deg, #FF8C42 0%, #D4AF37 100%)',
                color: '#2C1614',
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
              },
              success: {
                iconTheme: {
                  primary: '#0A0A0A',
                  secondary: '#D4AF37',
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
