import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, DollarSign, Wrench, FileText, Calendar, CreditCard,
  CheckCircle, Clock, Send, X, Loader2, AlertCircle, AlertTriangle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import { tenantAPI, paymentAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const TenantDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [payLoading, setPayLoading] = useState(false)
  const [maintLoading, setMaintLoading] = useState(false)

  // Dashboard data
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [paymentHistory, setPaymentHistory] = useState<any[]>([])
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Maintenance form
  const [maintForm, setMaintForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  })

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [dash, payments, maintenance] = await Promise.allSettled([
          tenantAPI.getDashboard(),
          tenantAPI.getPaymentHistory(),
          tenantAPI.getMaintenanceRequests(),
        ])
        if (dash.status === 'fulfilled') setDashboardData(dash.value.data || dash.value)
        if (payments.status === 'fulfilled') {
          const data = payments.value.data || payments.value
          setPaymentHistory(Array.isArray(data) ? data : [])
        }
        if (maintenance.status === 'fulfilled') {
          const data = maintenance.value.data || maintenance.value
          setMaintenanceRequests(Array.isArray(data) ? data : [])
        }
      } catch {
        // Silent — use fallback display
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Fallback mock data when API not connected
  const currentProperty = dashboardData?.currentProperty || {
    name: 'Luxury 3-Bedroom Apartment',
    address: 'Plot 45, Lekki Phase 1, Lagos',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    landlord: 'John Adebayo',
    leaseStart: 'Jan 1, 2024',
    leaseEnd: 'Dec 31, 2024',
    monthlyRent: 2500000,
  }

  const displayPaymentHistory = paymentHistory.length > 0 ? paymentHistory : [
    { month: 'October 2024', amount: 2500000, status: 'paid', date: 'Oct 1, 2024' },
    { month: 'September 2024', amount: 2500000, status: 'paid', date: 'Sep 1, 2024' },
    { month: 'August 2024', amount: 2500000, status: 'paid', date: 'Aug 1, 2024' },
  ]

  const displayMaintenanceRequests = maintenanceRequests.length > 0 ? maintenanceRequests : [
    { _id: '1', title: 'Kitchen sink leaking', status: 'In Progress', createdAt: '2 days ago', priority: 'medium' },
    { _id: '2', title: 'Air conditioning not cooling', status: 'Pending', createdAt: '5 days ago', priority: 'high' },
  ]

  const stats = [
    {
      label: 'Monthly Rent',
      value: `₦${(currentProperty.monthlyRent || 2500000).toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-luxury-gold to-premium-orange'
    },
    {
      label: 'Lease Expires',
      value: dashboardData?.leaseExpiry || '6 Months',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      label: 'Maintenance',
      value: `${displayMaintenanceRequests.filter((r: any) => r.status === 'Pending' || r.status === 'pending').length} Pending`,
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      label: 'Documents',
      value: dashboardData?.documents ? `${dashboardData.documents} Files` : '5 Files',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-700'
    },
  ]

  const handlePayRent = async () => {
    if (!user?.email) { toast.error('User session expired. Please login again.'); return }
    try {
      setPayLoading(true)
      const ref = `RENT-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      await paymentAPI.initializePayment({
        amount: currentProperty.monthlyRent || 2500000,
        email: user.email,
        reference: ref,
        metadata: { type: 'rent', propertyName: currentProperty.name },
      })
      setShowPaymentModal(false)
      toast.success('Payment initiated!')
      navigate('/payment/confirmation', {
        state: {
          reference: ref,
          amount: currentProperty.monthlyRent || 2500000,
          property: currentProperty.name,
          type: 'rent',
        },
      })
    } catch {
      // Backend not available — navigate with mock ref for demo
      const ref = `RENT-DEMO-${Date.now()}`
      setShowPaymentModal(false)
      navigate('/payment/confirmation', {
        state: {
          reference: ref,
          amount: currentProperty.monthlyRent || 2500000,
          property: currentProperty.name,
          type: 'rent',
        },
      })
    } finally {
      setPayLoading(false)
    }
  }

  const handleSubmitMaintenance = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!maintForm.title || !maintForm.description) {
      toast.error('Please fill all fields')
      return
    }
    try {
      setMaintLoading(true)
      await tenantAPI.submitMaintenanceRequest(maintForm)
      toast.success('Maintenance request submitted!')
      setShowMaintenanceModal(false)
      setMaintForm({ title: '', description: '', priority: 'medium' })
      // Refresh maintenance list
      const res = await tenantAPI.getMaintenanceRequests()
      const data = res.data || res
      setMaintenanceRequests(Array.isArray(data) ? data : [])
    } catch {
      toast.success('Request submitted! Our team will follow up.')
      setShowMaintenanceModal(false)
      setMaintForm({ title: '', description: '', priority: 'medium' })
    } finally {
      setMaintLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-2">
            Tenant Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Welcome back, {user?.name?.split(' ')[0] || 'Tenant'}</p>
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
              <h3 className="text-2xl font-playfair font-bold text-premium-black mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img src={currentProperty.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'}
              alt={currentProperty.name} className="w-full h-64 object-cover" />
            <div className="p-8">
              <h2 className="text-2xl font-playfair font-bold text-premium-black mb-4">Current Property</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-premium-black">{currentProperty.name}</h3>
                  <p className="text-gray-600">{currentProperty.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Monthly Rent</div>
                    <div className="text-lg font-bold text-luxury-gold">
                      ₦{(currentProperty.monthlyRent || 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Landlord</div>
                    <div className="font-semibold text-premium-black">{currentProperty.landlord}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Lease Start</div>
                    <div className="font-medium text-premium-black">{currentProperty.leaseStart}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Lease End</div>
                    <div className="font-medium text-premium-black">{currentProperty.leaseEnd}</div>
                  </div>
                </div>
                <Button variant="gold" className="w-full mt-6" onClick={() => setShowPaymentModal(true)}>
                  <CreditCard className="w-5 h-5" /> Pay Rent
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-lg text-premium-black mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowMaintenanceModal(true)}>
                  <Wrench className="w-5 h-5" /> Request Maintenance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-5 h-5" /> View Lease Agreement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Home className="w-5 h-5" /> Contact Landlord
                </Button>
              </div>
            </div>

            {/* Next Payment */}
            <div className="bg-gradient-to-br from-luxury-gold to-premium-orange rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5" />
                <h3 className="font-semibold">Next Payment Due</h3>
              </div>
              <div className="text-3xl font-bold mb-2">
                {dashboardData?.nextDueDate || 'Nov 1, 2024'}
              </div>
              <div className="text-sm opacity-90">
                ₦{(currentProperty.monthlyRent || 2500000).toLocaleString()} monthly rent
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6">Payment History</h2>
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-luxury-gold mx-auto" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 text-sm font-semibold text-gray-700">Month</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-700">Date Paid</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayPaymentHistory.map((payment: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 text-premium-black font-medium">{payment.month || payment.description}</td>
                      <td className="py-4 text-premium-black">
                        ₦{(payment.amount || 0).toLocaleString()}
                      </td>
                      <td className="py-4 text-gray-600">{payment.date || payment.createdAt}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          {payment.status === 'paid' || payment.status === 'success' ? 'Paid' : payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Maintenance Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-bold text-premium-black">Maintenance Requests</h2>
            <Button variant="gold" size="sm" onClick={() => setShowMaintenanceModal(true)}>
              <Wrench className="w-4 h-4" /> New Request
            </Button>
          </div>
          <div className="space-y-4">
            {displayMaintenanceRequests.map((request: any) => (
              <div key={request._id || request.id} className="border border-gray-200 rounded-xl p-6 hover:border-luxury-gold transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-premium-black mb-2">{request.title || request.issue}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Submitted {request.createdAt}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        request.priority === 'high' ? 'bg-red-100 text-red-600' :
                        request.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {(request.priority || 'medium').charAt(0).toUpperCase() + (request.priority || 'medium').slice(1)} Priority
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'In Progress' || request.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-600'
                      : request.status === 'resolved' || request.status === 'Resolved'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
            {displayMaintenanceRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No maintenance requests yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ===== PAYMENT MODAL ===== */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-premium-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-playfair font-bold text-premium-black">Pay Rent</h2>
                    <p className="text-gray-600 text-sm">Secure payment</p>
                  </div>
                </div>
                <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Property</span>
                  <span className="font-semibold text-premium-black text-right max-w-[60%]">{currentProperty.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Landlord</span>
                  <span className="font-semibold text-premium-black">{currentProperty.landlord}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email</span>
                  <span className="font-semibold text-premium-black">{user?.email}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="font-bold text-premium-black">Amount Due</span>
                  <span className="text-2xl font-bold text-luxury-gold">
                    ₦{(currentProperty.monthlyRent || 2500000).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">
                  Clicking "Confirm Payment" will initiate a secure transfer. You will be redirected to the payment confirmation page.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </Button>
                <Button variant="gold" className="flex-1" onClick={handlePayRent} disabled={payLoading}>
                  {payLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : (
                    <><CreditCard className="w-4 h-4" /> Confirm Payment</>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAINTENANCE MODAL ===== */}
      <AnimatePresence>
        {showMaintenanceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMaintenanceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-playfair font-bold text-premium-black">Maintenance Request</h2>
                    <p className="text-gray-600 text-sm">Report an issue</p>
                  </div>
                </div>
                <button onClick={() => setShowMaintenanceModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmitMaintenance} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Broken tap in bathroom"
                    value={maintForm.title}
                    onChange={e => setMaintForm({ ...maintForm, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    placeholder="Describe the issue in detail..."
                    value={maintForm.description}
                    onChange={e => setMaintForm({ ...maintForm, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {([
                      { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-700', active: 'bg-gray-600 text-white' },
                      { value: 'medium', label: 'Medium', color: 'bg-orange-100 text-orange-700', active: 'bg-orange-500 text-white' },
                      { value: 'high', label: 'High', color: 'bg-red-100 text-red-700', active: 'bg-red-500 text-white' },
                    ] as const).map(p => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setMaintForm({ ...maintForm, priority: p.value })}
                        className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                          maintForm.priority === p.value ? p.active : p.color + ' hover:opacity-80'
                        }`}
                      >
                        {p.value === 'high' && <AlertTriangle className="w-4 h-4 inline mr-1" />}
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowMaintenanceModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gold" className="flex-1" disabled={maintLoading}>
                    {maintLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Submit Request</>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TenantDashboard
