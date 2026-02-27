import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Shield, LayoutDashboard, LogOut, Lock, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const dashboardRoutes: Record<string, string> = {
  admin: '/admin/dashboard',
  landlord: '/landlord/dashboard',
  tenant: '/tenant/dashboard',
  investor: '/investor/dashboard',
  agent: '/agent/dashboard',
}

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswordSection, setShowPasswordSection] = useState(false)

  if (!user) return null

  const dashboardPath = dashboardRoutes[user.role] ?? '/dashboard'
  const initials = user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // Profile update would call backend here
    toast.success('Profile updated successfully!')
    setEditMode(false)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    // Password change would call backend here
    toast.success('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowPasswordSection(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container-premium max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-playfair font-bold text-premium-black mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and settings</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Avatar Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
                <span className="text-3xl font-playfair font-bold text-premium-black">{initials}</span>
              </div>
              <h2 className="text-xl font-bold text-premium-black mb-1">{user.name}</h2>
              <p className="text-gray-500 text-sm mb-3">{user.email}</p>
              <span className="inline-block px-4 py-1.5 rounded-full bg-luxury-gold/15 text-luxury-gold text-sm font-semibold capitalize border border-luxury-gold/30">
                {user.role}
              </span>

              {/* Quick Links */}
              <div className="mt-8 space-y-2">
                <Link to={dashboardPath} className="block">
                  <Button variant="gold" size="sm" className="w-full">
                    <LayoutDashboard className="w-4 h-4" />
                    My Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-red-500 border-red-200 hover:bg-red-50"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="font-semibold text-premium-black mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Account Active</p>
                    <p className="text-xs text-gray-400">Your account is in good standing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-luxury-gold" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Role: {user.role}</p>
                    <p className="text-xs text-gray-400 capitalize">Full {user.role} access</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-premium-black">Personal Information</h3>
                {!editMode && (
                  <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                    Edit
                  </Button>
                )}
              </div>

              {editMode ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleProfileChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleProfileChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleProfileChange}
                        placeholder="+234 800 000 0000"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" variant="gradient">
                      Save Changes
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                      <User className="w-5 h-5 text-premium-black" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Full Name</p>
                      <p className="font-semibold text-premium-black">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                      <Mail className="w-5 h-5 text-premium-black" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                      <p className="font-semibold text-premium-black">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                      <Shield className="w-5 h-5 text-premium-black" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Account Role</p>
                      <p className="font-semibold text-premium-black capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-premium-black">Password & Security</h3>
                {!showPasswordSection && (
                  <Button variant="outline" size="sm" onClick={() => setShowPasswordSection(true)}>
                    Change Password
                  </Button>
                )}
              </div>

              {showPasswordSection ? (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                        placeholder="At least 6 characters"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                        placeholder="Repeat new password"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" variant="gradient">
                      Update Password
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowPasswordSection(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                    <Lock className="w-5 h-5 text-premium-black" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Password</p>
                    <p className="font-semibold text-premium-black">••••••••••</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
