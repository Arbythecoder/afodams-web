import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Context
import { AuthProvider } from './context/AuthContext'

// Pages
import HomePage from './pages/HomePage'
// import PropertyListPage from './pages/PropertyListPage' // DISABLED: Property platform features
// import PropertyDetailsPage from './pages/PropertyDetailsPage' // DISABLED: Property platform features
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'

// Consultancy Pages
import ServicesPage from './pages/ServicesPage'
import IndustriesPage from './pages/IndustriesPage'
import ProcessPage from './pages/ProcessPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import BookConsultationPage from './pages/BookConsultationPage'
import SecureDocsPage from './pages/SecureDocsPage'
import PrivacyPage from './pages/PrivacyPage'

// Auth Pages
import RoleSelector from './pages/auth/RoleSelector'
// import LandlordSignup from './pages/auth/LandlordSignup' // DISABLED: Property platform features
// import TenantSignup from './pages/auth/TenantSignup' // DISABLED: Property platform features
// import InvestorSignup from './pages/auth/InvestorSignup' // DISABLED: Property platform features
// import AgentSignup from './pages/auth/AgentSignup' // DISABLED: Property platform features

// Dashboard Pages
import DashboardPage from './pages/DashboardPage'
import AdminDashboard from './pages/dashboards/AdminDashboard'
// import LandlordDashboard from './pages/dashboards/LandlordDashboard' // DISABLED: Property platform features
// import TenantDashboard from './pages/dashboards/TenantDashboard' // DISABLED: Property platform features
// import InvestorDashboard from './pages/dashboards/InvestorDashboard' // DISABLED: Property platform features
// import AgentDashboard from './pages/dashboards/AgentDashboard' // DISABLED: Property platform features

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Protected Route
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

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
              <Route path="/login" element={<LoginPage />} />

              {/* DISABLED: Property platform routes */}
              {/* <Route path="/properties" element={<PropertyListPage />} /> */}
              {/* <Route path="/properties/:id" element={<PropertyDetailsPage />} /> */}

              {/* Signup Routes */}
              <Route path="/signup" element={<RoleSelector />} />
              {/* DISABLED: Role-specific signups */}
              {/* <Route path="/signup/landlord" element={<LandlordSignup />} /> */}
              {/* <Route path="/signup/tenant" element={<TenantSignup />} /> */}
              {/* <Route path="/signup/investor" element={<InvestorSignup />} /> */}
              {/* <Route path="/signup/agent" element={<AgentSignup />} /> */}

              {/* Secure Document Upload (Protected) */}
              <Route
                path="/secure-docs"
                element={
                  <ProtectedRoute>
                    <SecureDocsPage />
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

              {/* DISABLED: Role-Specific Dashboards (Property Platform) */}
              {/* <Route
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
              /> */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFA500 100%)',
                color: '#0A0A0A',
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
