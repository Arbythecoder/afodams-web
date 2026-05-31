import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Home, TrendingUp, CheckCircle, XCircle, Clock,
  Search, Filter, Eye, Building2, UserCheck, Loader2,
  ShieldAlert, Ban, Trash2, RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import { adminAPI, agentAPI } from '../../services/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'properties' | 'agents' | 'users'>('properties')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Real data state
  const [stats, setStats] = useState({
    totalProperties: '—',
    totalUsers: '—',
    pendingApprovals: '—',
    revenue: '—',
  })
  const [pendingProperties, setPendingProperties] = useState<any[]>([])
  const [agentApplications, setAgentApplications] = useState<any[]>([])
  const [allUsers, setAllUsers] = useState<any[]>([])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const results = await Promise.allSettled([
      adminAPI.getStats(),
      adminAPI.getPendingProperties(),
      agentAPI.getAllApplications(),
      adminAPI.getUsers(),
    ])

    if (results[0].status === 'fulfilled') {
      const d = results[0].value.data || results[0].value
      setStats({
        totalProperties: (d.totalProperties ?? d.properties ?? '—').toString(),
        totalUsers: (d.totalUsers ?? d.users ?? '—').toString(),
        pendingApprovals: (d.pendingApprovals ?? d.pending ?? '—').toString(),
        revenue: d.revenue ? `₦${Number(d.revenue).toLocaleString()}` : '—',
      })
    }
    if (results[1].status === 'fulfilled') {
      const d = results[1].value.data || results[1].value
      setPendingProperties(Array.isArray(d) ? d : d.properties || [])
    }
    if (results[2].status === 'fulfilled') {
      const d = results[2].value.data || results[2].value
      setAgentApplications(Array.isArray(d) ? d : d.agents || [])
    }
    if (results[3].status === 'fulfilled') {
      const d = results[3].value.data || results[3].value
      setAllUsers(Array.isArray(d) ? d : d.users || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleApproveProperty = async (id: string) => {
    setActionLoading(id)
    try {
      await adminAPI.approveProperty(id)
      toast.success('Property approved and published!')
      setPendingProperties(prev => prev.filter(p => (p._id || p.id) !== id))
    } catch {
      toast.error('Failed to approve property')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectProperty = async (id: string) => {
    const reason = window.prompt('Reason for rejection (optional):') ?? ''
    setActionLoading(id)
    try {
      await adminAPI.rejectProperty(id, reason)
      toast.success('Property rejected.')
      setPendingProperties(prev => prev.filter(p => (p._id || p.id) !== id))
    } catch {
      toast.error('Failed to reject property')
    } finally {
      setActionLoading(null)
    }
  }

  const handleApproveAgent = async (id: string) => {
    setActionLoading(id)
    try {
      await agentAPI.approveApplication(id)
      toast.success('Agent application approved!')
      setAgentApplications(prev =>
        prev.map(a => (a._id || a.id) === id ? { ...a, status: 'approved' } : a)
      )
    } catch {
      toast.error('Failed to approve agent')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectAgent = async (id: string) => {
    const reason = window.prompt('Reason for rejection (optional):') ?? ''
    setActionLoading(id)
    try {
      await agentAPI.rejectApplication(id, reason)
      toast.success('Agent application rejected.')
      setAgentApplications(prev =>
        prev.map(a => (a._id || a.id) === id ? { ...a, status: 'rejected' } : a)
      )
    } catch {
      toast.error('Failed to reject agent')
    } finally {
      setActionLoading(null)
    }
  }

  // Fallback mock data when backend not connected
  const displayProperties = pendingProperties.length > 0 ? pendingProperties : [
    { _id: '1', title: 'Luxury 5-Bedroom Villa', landlord: { name: 'John Adebayo' }, location: { city: 'Lekki Phase 1', state: 'Lagos' }, price: 150000000, createdAt: '2 hours ago', images: [{ url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400' }] },
    { _id: '2', title: 'Modern 3-Bedroom Apartment', landlord: { name: 'Sarah Okonkwo' }, location: { city: 'Victoria Island', state: 'Lagos' }, price: 75000000, createdAt: '5 hours ago', images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400' }] },
    { _id: '3', title: 'Commercial Office Space', landlord: { name: 'David Eze' }, location: { city: 'Ikoyi', state: 'Lagos' }, price: 200000000, createdAt: '1 day ago', images: [{ url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400' }] },
  ]

  const displayAgents = agentApplications.length > 0 ? agentApplications : [
    { _id: '1', name: 'Michael Okafor', email: 'michael@example.com', experience: '5 years', specialization: 'Luxury Properties', status: 'pending', createdAt: '1 day ago' },
    { _id: '2', name: 'Grace Nwosu', email: 'grace@example.com', experience: '3 years', specialization: 'Commercial Real Estate', status: 'pending', createdAt: '2 days ago' },
  ]

  const displayUsers = allUsers.length > 0 ? allUsers : [
    { _id: '1', name: 'John Adebayo', email: 'john@example.com', role: 'landlord', status: 'active', createdAt: '2024-01-10' },
    { _id: '2', name: 'Sarah Okonkwo', email: 'sarah@example.com', role: 'tenant', status: 'active', createdAt: '2024-02-15' },
    { _id: '3', name: 'Michael Okafor', email: 'michael@example.com', role: 'agent', status: 'pending', createdAt: '2024-03-20' },
    { _id: '4', name: 'Grace Nwosu', email: 'grace@example.com', role: 'investor', status: 'active', createdAt: '2024-04-05' },
  ]

  const filteredUsers = displayUsers.filter((u: any) =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredProperties = displayProperties.filter((p: any) =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location?.city?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const statsDisplay = [
    { label: 'Total Properties', value: stats.totalProperties, change: '+12%', icon: <Home className="w-6 h-6" />, color: 'from-blue-500 to-blue-700' },
    { label: 'Total Users', value: stats.totalUsers, change: '+18%', icon: <Users className="w-6 h-6" />, color: 'from-green-500 to-emerald-700' },
    { label: 'Pending Approvals', value: stats.pendingApprovals, change: '', icon: <Clock className="w-6 h-6" />, color: 'from-orange-500 to-red-500' },
    { label: 'Revenue', value: stats.revenue, change: '+24%', icon: <TrendingUp className="w-6 h-6" />, color: 'from-luxury-gold to-premium-orange' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">Manage your platform and approve listings</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsDisplay.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                {stat.change && (
                  <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-playfair font-bold text-premium-black mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-2 mb-8 inline-flex gap-2 flex-wrap"
        >
          {[
            { key: 'properties', label: 'Pending Properties', icon: <Building2 className="w-5 h-5" />, count: displayProperties.length },
            { key: 'agents', label: 'Agent Applications', icon: <UserCheck className="w-5 h-5" />, count: displayAgents.filter((a: any) => a.status === 'pending').length },
            { key: 'users', label: 'All Users', icon: <Users className="w-5 h-5" />, count: displayUsers.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-gradient-gold text-premium-black shadow-md'
                  : 'text-gray-600 hover:text-premium-black'
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-black/10' : 'bg-gray-200'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Search bar */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-luxury-gold transition-colors"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="w-5 h-5" /> Filters
            </Button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-luxury-gold mx-auto mb-4" />
            <p className="text-gray-600">Loading data...</p>
          </div>
        )}

        {/* Content Area */}
        {!loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>

            {/* ===== PENDING PROPERTIES TAB ===== */}
            {activeTab === 'properties' && (
              <div className="space-y-6">
                {filteredProperties.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">All caught up!</h3>
                    <p className="text-gray-500">No pending properties to review.</p>
                  </div>
                )}
                {filteredProperties.map((property: any, index: number) => {
                  const pid = property._id || property.id
                  const isActing = actionLoading === pid
                  return (
                    <motion.div
                      key={pid}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
                          <img
                            src={property.images?.[0]?.url || property.image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400'}
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-playfair font-bold text-premium-black mb-2">{property.title}</h3>
                              <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Landlord:</span>{' '}
                                {property.landlord?.name || property.landlord || 'Unknown'}
                              </p>
                              <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Location:</span>{' '}
                                {property.location?.city || property.location}, {property.location?.state || ''}
                              </p>
                              <p className="text-luxury-gold font-bold text-xl">
                                ₦{Number(property.price).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">Pending</span>
                              <span className="text-sm text-gray-500">{property.createdAt}</span>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-6">
                            <Button variant="outline" size="sm" className="flex-1 md:flex-initial">
                              <Eye className="w-4 h-4" /> View Details
                            </Button>
                            <Button
                              variant="gold"
                              size="sm"
                              onClick={() => handleApproveProperty(pid)}
                              disabled={isActing}
                              className="flex-1 md:flex-initial bg-green-500 hover:bg-green-600 border-green-500"
                            >
                              {isActing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectProperty(pid)}
                              disabled={isActing}
                              className="flex-1 md:flex-initial border-red-500 text-red-500 hover:bg-red-50"
                            >
                              {isActing ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* ===== AGENT APPLICATIONS TAB ===== */}
            {activeTab === 'agents' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Experience</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Specialization</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Applied</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {displayAgents.map((agent: any) => {
                        const aid = agent._id || agent.id
                        const isActing = actionLoading === aid
                        return (
                          <tr key={aid} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-premium-black">{agent.name}</td>
                            <td className="px-6 py-4 text-gray-600">{agent.email}</td>
                            <td className="px-6 py-4 text-gray-600">{agent.experience}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                                {agent.specialization}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                agent.status === 'approved' ? 'bg-green-100 text-green-600' :
                                agent.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                'bg-orange-100 text-orange-600'
                              }`}>
                                {agent.status || 'pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-sm">{agent.createdAt}</td>
                            <td className="px-6 py-4">
                              {agent.status === 'pending' && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleApproveAgent(aid)}
                                    disabled={isActing}
                                    className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600 disabled:opacity-50"
                                    title="Approve"
                                  >
                                    {isActing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                                  </button>
                                  <button
                                    onClick={() => handleRejectAgent(aid)}
                                    disabled={isActing}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 disabled:opacity-50"
                                    title="Reject"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </div>
                              )}
                              {agent.status !== 'pending' && (
                                <span className="text-gray-400 text-sm">Processed</span>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                      {displayAgents.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-gray-500">No agent applications found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===== ALL USERS TAB ===== */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((u: any) => {
                        const uid = u._id || u.id
                        return (
                          <tr key={uid} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center text-premium-black font-bold text-sm shrink-0">
                                  {u.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <span className="font-medium text-premium-black">{u.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{u.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                u.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                                u.role === 'landlord' ? 'bg-blue-100 text-blue-600' :
                                u.role === 'tenant' ? 'bg-green-100 text-green-600' :
                                u.role === 'investor' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                u.status === 'active' || !u.status ? 'bg-green-100 text-green-600' :
                                u.status === 'suspended' ? 'bg-red-100 text-red-600' :
                                'bg-orange-100 text-orange-600'
                              }`}>
                                {u.status || 'active'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-sm">
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-NG') : '—'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500" title="View">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors text-orange-500" title="Suspend">
                                  <Ban className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500" title="Delete">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                            <ShieldAlert className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* User count footer */}
                <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
                  Showing {filteredUsers.length} of {displayUsers.length} users
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
