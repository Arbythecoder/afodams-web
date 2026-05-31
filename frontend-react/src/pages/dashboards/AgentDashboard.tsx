import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users, DollarSign, Home, TrendingUp, CheckCircle, Clock,
  Award, BookOpen, Target, Loader2, XCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import { agentAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const AgentDashboard = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  // Real data state
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [assignedProperties, setAssignedProperties] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const results = await Promise.allSettled([
        agentAPI.getDashboard(),
        agentAPI.getAssignedProperties(),
      ])
      if (results[0].status === 'fulfilled') {
        setDashboardData(results[0].value.data || results[0].value)
      }
      if (results[1].status === 'fulfilled') {
        const d = results[1].value.data || results[1].value
        setAssignedProperties(Array.isArray(d) ? d : d.properties || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // Fallback mock data
  const stats = [
    { label: 'Properties Assigned', value: (dashboardData?.assignedProperties ?? assignedProperties.length ?? 12).toString(), icon: <Home className="w-6 h-6" />, color: 'from-blue-500 to-blue-700' },
    { label: 'Total Commission', value: dashboardData?.totalCommission ? `₦${Number(dashboardData.totalCommission).toLocaleString()}` : '₦4,500,000', icon: <DollarSign className="w-6 h-6" />, color: 'from-luxury-gold to-premium-orange' },
    { label: 'Leads', value: (dashboardData?.leads ?? 23).toString(), icon: <Users className="w-6 h-6" />, color: 'from-green-500 to-emerald-700' },
    { label: 'Success Rate', value: `${dashboardData?.successRate ?? 85}%`, icon: <TrendingUp className="w-6 h-6" />, color: 'from-purple-500 to-indigo-700' },
  ]

  const applicationStatus = {
    status: dashboardData?.status || 'Approved',
    approvedDate: dashboardData?.approvedDate || 'October 15, 2024',
    agentId: dashboardData?.agentId || user?.id?.slice(0, 12).toUpperCase() || 'AGT-2024-0001',
    level: dashboardData?.level || 'Certified Agent',
  }

  const trainingModules = dashboardData?.trainingModules || [
    { id: '1', title: 'Real Estate Sales Fundamentals', progress: 100, status: 'Completed', certificate: true },
    { id: '2', title: 'Property Valuation & Market Analysis', progress: 75, status: 'In Progress', certificate: false },
    { id: '3', title: 'Client Relationship Management', progress: 0, status: 'Not Started', certificate: false },
    { id: '4', title: 'Legal Aspects of Real Estate', progress: 0, status: 'Locked', certificate: false },
  ]

  const displayProperties = assignedProperties.length > 0 ? assignedProperties : [
    { _id: '1', title: 'Lekki Phase 1 Villa', location: { city: 'Lagos' }, price: 150000000, leads: 5, images: [{ url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400' }] },
    { _id: '2', title: 'Victoria Island Apartment', location: { city: 'Lagos' }, price: 75000000, leads: 3, images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400' }] },
  ]

  const isPending = applicationStatus.status?.toLowerCase() === 'pending'
  const isRejected = applicationStatus.status?.toLowerCase() === 'rejected'

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-luxury-gold mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-2">Agent Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome back, {user?.name?.split(' ')[0] || 'Agent'}</p>
        </motion.div>

        {/* Application Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-8 text-white shadow-lg mb-12 bg-gradient-to-br ${
            isPending ? 'from-orange-500 to-amber-600' :
            isRejected ? 'from-red-500 to-red-700' :
            'from-green-500 to-emerald-700'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              {isRejected
                ? <XCircle className="w-8 h-8" />
                : isPending
                ? <Clock className="w-8 h-8" />
                : <CheckCircle className="w-8 h-8" />
              }
            </div>
            <div>
              <h2 className="text-2xl font-bold">Application {applicationStatus.status}</h2>
              <p className="opacity-90">
                {isPending
                  ? 'Your application is under review. We will notify you shortly.'
                  : isRejected
                  ? 'Your application was not approved. Contact support for details.'
                  : `Approved on ${applicationStatus.approvedDate}`
                }
              </p>
            </div>
          </div>
          {!isPending && !isRejected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <div className="text-sm opacity-90 mb-1">Agent ID</div>
                <div className="text-xl font-bold">{applicationStatus.agentId}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <div className="text-sm opacity-90 mb-1">Certification Level</div>
                <div className="text-xl font-bold">{applicationStatus.level}</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-playfair font-bold text-premium-black mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Training & Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Training Modules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-luxury-gold" />
              <h2 className="text-2xl font-playfair font-bold text-premium-black">Training Progress</h2>
            </div>
            <div className="space-y-4">
              {trainingModules.map((module: any) => (
                <div
                  key={module.id || module._id}
                  className={`border rounded-xl p-4 transition-colors ${
                    module.status === 'Locked' ? 'border-gray-100 opacity-60' : 'border-gray-200 hover:border-luxury-gold'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-premium-black mb-1">{module.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          module.status === 'Completed' ? 'bg-green-100 text-green-600' :
                          module.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                          module.status === 'Locked' ? 'bg-gray-100 text-gray-500' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {module.status}
                        </span>
                        {module.certificate && (
                          <span className="text-xs text-luxury-gold flex items-center gap-1">
                            <Award className="w-3 h-3" /> Certificate Earned
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-luxury-gold to-premium-orange h-2 rounded-full transition-all"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{module.progress}% Complete</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Assigned Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-luxury-gold" />
              <h2 className="text-2xl font-playfair font-bold text-premium-black">Assigned Properties</h2>
            </div>
            {displayProperties.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Home className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No properties assigned yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {displayProperties.map((property: any) => {
                  const pid = property._id || property.id
                  return (
                    <div key={pid} className="border border-gray-200 rounded-xl overflow-hidden hover:border-luxury-gold transition-colors group">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={property.images?.[0]?.url || property.image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400'}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-premium-black mb-1">{property.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {property.location?.city || property.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-luxury-gold">
                            ₦{Number(property.price).toLocaleString()}
                          </div>
                          {property.leads !== undefined && (
                            <div className="text-sm text-gray-600">
                              <span className="font-semibold text-premium-black">{property.leads}</span> leads
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">View Details</Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard
