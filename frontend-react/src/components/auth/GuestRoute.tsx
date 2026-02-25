import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Loader2 } from 'lucide-react'

const dashboardRoutes: Record<string, string> = {
  admin: '/admin/dashboard',
  landlord: '/landlord/dashboard',
  tenant: '/tenant/dashboard',
  investor: '/investor/dashboard',
  agent: '/agent/dashboard',
}

interface GuestRouteProps {
  children: React.ReactNode
}

/**
 * Wraps login/signup pages. Redirects already-authenticated users
 * to their role-specific dashboard instead of showing auth pages.
 */
const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-luxury-gold animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return <Navigate to={dashboardRoutes[user.role] ?? '/dashboard'} replace />
  }

  return <>{children}</>
}

export default GuestRoute
