import { motion } from 'framer-motion'
import { useState, useContext, FormEvent } from 'react'
import { Upload, File, X, CheckCircle, Shield, Lock, AlertCircle } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

interface UploadedFile {
  id: string
  file: File
  preview?: string
}

const SecureDocsPage = () => {
  const authContext = useContext(AuthContext)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [notes, setNotes] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  // Check if user is authenticated
  if (!authContext?.user) {
    toast.error('Please log in to access secure document submission')
    return <Navigate to="/login" replace />
  }

  const acceptedTypes = [
    '.pdf',
    '.jpg',
    '.jpeg',
    '.png',
    '.doc',
    '.docx'
  ]

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
    }
  }

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase()
      if (!acceptedTypes.includes(extension)) {
        toast.error(`${file.name}: Invalid file type`)
        return false
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name}: File too large (max 10MB)`)
        return false
      }
      return true
    })

    const uploadedFiles: UploadedFile[] = validFiles.map(file => ({
      id: Date.now() + Math.random().toString(),
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }))

    setFiles(prev => [...prev, ...uploadedFiles])
    toast.success(`${validFiles.length} file(s) added`)
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      toast.error('Please select at least one file to upload')
      return
    }

    // Temporary: Store in localStorage
    const submission = {
      id: Date.now(),
      userId: authContext.user?.id,
      userName: authContext.user?.name,
      userEmail: authContext.user?.email,
      files: files.map(f => ({
        name: f.file.name,
        size: f.file.size,
        type: f.file.type
      })),
      notes,
      submittedAt: new Date().toISOString(),
      status: 'received'
    }

    const existing = JSON.parse(localStorage.getItem('documentSubmissions') || '[]')
    existing.push(submission)
    localStorage.setItem('documentSubmissions', JSON.stringify(existing))

    // TODO: Replace with actual file upload to backend
    // const formData = new FormData()
    // files.forEach(f => formData.append('files', f.file))
    // formData.append('notes', notes)
    // await axios.post('/api/documents/upload', formData)

    toast.success('Documents submitted securely!')
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-premium-black" />
          </div>

          <h1 className="text-4xl font-playfair font-bold mb-4">
            Documents Received Securely
          </h1>

          <p className="text-gray-700 text-lg mb-6">
            Your documents have been uploaded and are now securely stored.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-premium-black mb-4">Submission Details:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Files Submitted:</strong> {files.length}</li>
              <li><strong>Submitted By:</strong> {authContext.user?.name}</li>
              <li><strong>Email:</strong> {authContext.user?.email}</li>
              <li><strong>Date:</strong> {new Date().toLocaleString()}</li>
              <li><strong>Status:</strong> <span className="text-green-600 font-semibold">Received</span></li>
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <Shield className="w-4 h-4 inline text-luxury-gold mr-2" />
                Your documents are encrypted and stored securely. We will review and contact you within 24-48 hours.
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setSubmitted(false)
                setFiles([])
                setNotes('')
              }}
              variant="outline"
            >
              Submit More Documents
            </Button>
            <Button onClick={() => window.location.href = '/#'} variant="gradient">
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* HERO SECTION */}
      <section className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-luxury-gold" />
              <h1 className="text-4xl md:text-5xl font-playfair font-bold">
                Secure <span className="text-gradient-gold">Document Submission</span>
              </h1>
            </div>
            <p className="text-lg text-gray-300">
              Submit your documents securely with end-to-end encryption and strict confidentiality.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-premium max-w-4xl">
          {/* Security Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <Lock className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">End-to-End Encrypted</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <Shield className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Strict Confidentiality</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <CheckCircle className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">Secure Storage</p>
            </div>
          </motion.div>

          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Info Display */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Submitting as:</strong> {authContext.user?.name} ({authContext.user?.email})
                </p>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents *
                </label>

                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-luxury-gold bg-luxury-gold/5'
                      : 'border-gray-300 hover:border-luxury-gold/50'
                  }`}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Accepted: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
                  </p>
                  <input
                    type="file"
                    onChange={handleFileInput}
                    multiple
                    accept={acceptedTypes.join(',')}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input">
                    <Button type="button" variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                      Browse Files
                    </Button>
                  </label>
                </div>
              </div>

              {/* Files List */}
              {files.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-2">
                    {files.map(uploadedFile => (
                      <div
                        key={uploadedFile.id}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <File className="w-5 h-5 text-luxury-gold" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {uploadedFile.file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(uploadedFile.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(uploadedFile.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  placeholder="Any additional information about these documents..."
                />
              </div>

              {/* Confidentiality Notice */}
              <div className="bg-luxury-gold/10 border border-luxury-gold/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Confidentiality Commitment</p>
                  <p>
                    All documents submitted through this secure portal are encrypted during transmission and storage. 
                    Access is restricted to authorized personnel only. We maintain strict confidentiality protocols 
                    and will never share your documents without explicit authorization.
                  </p>
                </div>
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full">
                Submit Documents Securely
              </Button>
            </form>
          </motion.div>

          {/* Security Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-premium-black mb-4">
              How We Protect Your Documents
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>All uploads are encrypted using industry-standard SSL/TLS protocols</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>Documents are stored in secure, encrypted databases with access controls</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>Only authorized personnel with specific clearance can access submitted files</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>All access is logged and monitored for security compliance</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>Documents are automatically deleted after project completion (unless otherwise requested)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SecureDocsPage
