import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, DollarSign, Briefcase, Target, Copy, Check,
  ArrowUpRight, Eye, Plus, Sparkles, Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import { investorAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const InvestorDashboard = () => {
  const { user } = useAuth()
  const [copiedToken, setCopiedToken] = useState(false)
  const [loading, setLoading] = useState(true)

  // Real data
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [investments, setInvestments] = useState<any[]>([])
  const [opportunities, setOpportunities] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const results = await Promise.allSettled([
        investorAPI.getDashboard(),
        investorAPI.getInvestments(),
        investorAPI.getOpportunities(),
      ])
      if (results[0].status === 'fulfilled') {
        setDashboardData(results[0].value.data || results[0].value)
      }
      if (results[1].status === 'fulfilled') {
        const d = results[1].value.data || results[1].value
        setInvestments(Array.isArray(d) ? d : d.investments || [])
      }
      if (results[2].status === 'fulfilled') {
        const d = results[2].value.data || results[2].value
        setOpportunities(Array.isArray(d) ? d : d.opportunities || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // Investor token comes from auth context (set during login/signup)
  const investorToken = user?.investorToken || dashboardData?.investorToken || 'Token not yet assigned'

  const handleCopyToken = () => {
    navigator.clipboard.writeText(investorToken)
    setCopiedToken(true)
    toast.success('Investor token copied!')
    setTimeout(() => setCopiedToken(false), 2000)
  }

  // Fallback mock data when API not connected
  const displayStats = dashboardData ? [
    { label: 'Total Investment', value: `₦${Number(dashboardData.totalInvestment || 45000000).toLocaleString()}`, change: '+0%', icon: <DollarSign className="w-6 h-6" />, color: 'from-blue-500 to-blue-700' },
    { label: 'Current Value', value: `₦${Number(dashboardData.currentValue || 58500000).toLocaleString()}`, change: `+${dashboardData.growthPercent || 30}%`, icon: <TrendingUp className="w-6 h-6" />, color: 'from-green-500 to-emerald-700' },
    { label: 'Total ROI', value: `₦${Number(dashboardData.totalROI || 13500000).toLocaleString()}`, change: `+${dashboardData.roiPercent || 30}%`, icon: <Target className="w-6 h-6" />, color: 'from-luxury-gold to-premium-orange' },
    { label: 'Properties', value: (dashboardData.totalProperties || 3).toString(), change: '+0%', icon: <Briefcase className="w-6 h-6" />, color: 'from-purple-500 to-indigo-700' },
  ] : [
    { label: 'Total Investment', value: '₦45,000,000', change: '+0%', icon: <DollarSign className="w-6 h-6" />, color: 'from-blue-500 to-blue-700' },
    { label: 'Current Value', value: '₦58,500,000', change: '+30%', icon: <TrendingUp className="w-6 h-6" />, color: 'from-green-500 to-emerald-700' },
    { label: 'Total ROI', value: '₦13,500,000', change: '+30%', icon: <Target className="w-6 h-6" />, color: 'from-luxury-gold to-premium-orange' },
    { label: 'Properties', value: '3', change: '+0%', icon: <Briefcase className="w-6 h-6" />, color: 'from-purple-500 to-indigo-700' },
  ]

  const displayInvestments = investments.length > 0 ? investments : [
    { _id: '1', property: 'Lekki Phase 1 Luxury Villa', location: 'Lagos, Nigeria', invested: 15000000, currentValue: 19500000, growth: 30, status: 'Active', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', date: 'Jan 2024' },
    { _id: '2', property: 'Ikoyi Modern Apartments', location: 'Lagos, Nigeria', invested: 20000000, currentValue: 26000000, growth: 30, status: 'Active', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600', date: 'Mar 2024' },
    { _id: '3', property: 'Victoria Island Commercial', location: 'Lagos, Nigeria', invested: 10000000, currentValue: 13000000, growth: 30, status: 'Active', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', date: 'Jun 2024' },
  ]

  const displayOpportunities = opportunities.length > 0 ? opportunities : [
    { _id: '1', title: 'Abuja Smart City Development', location: 'Abuja, Nigeria', minInvestment: 5000000, expectedROI: 35, duration: '24 months', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600', category: 'Commercial' },
    { _id: '2', title: 'Lagos Waterfront Residences', location: 'Lagos, Nigeria', minInvestment: 10000000, expectedROI: 40, duration: '18 months', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', category: 'Residential' },
  ]

  // Chart data
  const monthlyGrowth = dashboardData?.monthlyGrowth || [
    { month: 'Jan', value: 45 }, { month: 'Feb', value: 47 }, { month: 'Mar', value: 49 },
    { month: 'Apr', value: 52 }, { month: 'May', value: 55 }, { month: 'Jun', value: 58.5 },
  ]
  const maxValue = Math.max(...monthlyGrowth.map((d: any) => d.value))

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-luxury-gold mx-auto mb-4" />
          <p className="text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium">
        {/* Header with Token */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-2">
                Investment Portfolio
              </h1>
              <p className="text-gray-600 text-lg">Welcome back, {user?.name?.split(' ')[0]}</p>
            </div>

            {/* Investor Token — real value from auth context */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium opacity-90">Your Investor Token</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="text-xl font-bold tracking-wider break-all">{investorToken}</code>
                <button
                  onClick={handleCopyToken}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors shrink-0"
                  title="Copy token"
                >
                  {copiedToken ? <Check className="w-5 h-5 text-yellow-300" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayStats.map((stat, index) => (
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
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-gray-500'}`}>
                  {stat.change.startsWith('+') && <ArrowUpRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-playfair font-bold text-premium-black mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-premium-black mb-2">Portfolio Growth</h2>
              <p className="text-gray-600">Your investment value over time</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-500">
                +{dashboardData?.growthPercent || 30}%
              </div>
              <div className="text-sm text-gray-600">Last 6 months</div>
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 h-64">
            {monthlyGrowth.map((data: any, index: number) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.value / maxValue) * 100}%` }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="flex-1 relative group"
              >
                <div className="h-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-xl flex items-end justify-center pb-2 hover:from-green-600 hover:to-emerald-500 transition-all cursor-pointer">
                  <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    ₦{data.value}M
                  </span>
                </div>
                <div className="text-center mt-3 text-sm font-medium text-gray-600">{data.month}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Investments */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-12">
          <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6">My Investments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {displayInvestments.map((inv: any, index: number) => {
              const invested = inv.invested || inv.amount || 0
              const currentVal = inv.currentValue || inv.current_value || invested
              const growth = inv.growth || (invested > 0 ? Math.round(((currentVal - invested) / invested) * 100) : 0)
              return (
                <motion.div
                  key={inv._id || inv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={inv.image || inv.propertyImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
                      alt={inv.property || inv.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                        {inv.status || 'Active'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-playfair font-bold text-premium-black mb-2">{inv.property || inv.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{inv.location}</p>
                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Invested:</span>
                        <span className="font-semibold text-premium-black">₦{Number(invested).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Value:</span>
                        <span className="font-semibold text-green-600">₦{Number(currentVal).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Growth:</span>
                        <span className="font-bold text-green-500 flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4" />+{growth}%
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4" /> View Details
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Investment Opportunities */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6">New Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayOpportunities.map((opp: any, index: number) => (
              <motion.div
                key={opp._id || opp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={opp.image || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600'}
                    alt={opp.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-full text-xs font-semibold">
                      {opp.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-premium-black mb-2">{opp.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{opp.location}</p>
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Min. Investment</div>
                      <div className="font-semibold text-premium-black text-sm">
                        ₦{Number(opp.minInvestment || opp.min_investment || 0).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Expected ROI</div>
                      <div className="font-bold text-green-500 text-sm">{opp.expectedROI || opp.expected_roi}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Duration</div>
                      <div className="font-semibold text-premium-black text-sm">{opp.duration}</div>
                    </div>
                  </div>
                  <Button variant="gold" size="sm" className="w-full">
                    <Plus className="w-4 h-4" /> Invest Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InvestorDashboard
