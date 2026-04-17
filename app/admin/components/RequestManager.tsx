'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Eye, 
  Check, 
  X, 
  Clock, 
  Search, 
  Filter,
  Mail,
  Phone,
  Building,
  Calendar,
  User,
  FileText
} from 'lucide-react'

interface JoinRequest {
  id: number
  name: string
  email: string
  phone: string
  company: string
  position: string
  message: string
  service: string
  status: 'pending' | 'approved' | 'rejected' | 'reviewed'
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  notes?: string
}

const RequestManager = () => {
  const [requests, setRequests] = useState<JoinRequest[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions',
      position: 'Marketing Director',
      message: 'We are interested in partnering with THIRSTEE for our upcoming product launch campaign. We need custom-labeled bottles for 5000 attendees.',
      service: 'Custom Label Water Bottles',
      status: 'pending',
      submittedDate: '2024-01-20'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@greenstartup.com',
      phone: '+1 (555) 987-6543',
      company: 'Green Startup Inc',
      position: 'CEO',
      message: 'Looking for sustainable water bottle solutions for our corporate events and employee wellness program.',
      service: 'Corporate Solutions',
      status: 'approved',
      submittedDate: '2024-01-18',
      reviewedDate: '2024-01-19',
      reviewedBy: 'Admin',
      notes: 'Great fit for our sustainability goals. Approved for corporate partnership.'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike@eventsolutions.com',
      phone: '+1 (555) 456-7890',
      company: 'Event Solutions LLC',
      position: 'Event Coordinator',
      message: 'We organize large-scale conferences and need reliable water bottle suppliers with custom branding options.',
      service: 'Event Packs',
      status: 'reviewed',
      submittedDate: '2024-01-15',
      reviewedDate: '2024-01-16',
      reviewedBy: 'Admin'
    },
    {
      id: 4,
      name: 'Lisa Park',
      email: 'lisa@nonprofit.org',
      phone: '+1 (555) 321-0987',
      company: 'Community Help Foundation',
      position: 'Program Manager',
      message: 'Our nonprofit organization is interested in your free water supply program for underserved communities.',
      service: 'Free Water Supply',
      status: 'pending',
      submittedDate: '2024-01-22'
    }
  ])

  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterService, setFilterService] = useState('all')

  const services = [
    'All Services',
    'Advertising Solutions',
    'Custom Label Water Bottles',
    'Corporate Solutions',
    'Event Packs',
    'Free Water Supply'
  ]

  const statuses = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'reviewed', label: 'Reviewed', color: 'blue' },
    { value: 'approved', label: 'Approved', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' }
  ]

  const handleStatusChange = (requestId: number, newStatus: string, notes?: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: newStatus as any,
            reviewedDate: new Date().toISOString().split('T')[0],
            reviewedBy: 'Admin',
            notes: notes || request.notes
          }
        : request
    ))
  }

  const openModal = (request: JoinRequest) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedRequest(null)
    setIsModalOpen(false)
  }

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    const matchesService = filterService === 'All Services' || request.service === filterService
    return matchesSearch && matchesStatus && matchesService
  })

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Join Request Management
        </h1>
        <p className="text-gray-600">
          Review and manage partnership and service requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <Check className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <X className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {services.map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Company</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Service</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {request.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                        <div className="text-sm text-gray-500">{request.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1 text-gray-700">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span>{request.company}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{request.service}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      request.status === 'approved' ? 'bg-green-100 text-green-600' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{request.submittedDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(request)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors text-sm flex items-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>View</span>
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(request.id, 'approved')}
                            className="bg-green-100 text-green-600 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors text-sm flex items-center space-x-1"
                          >
                            <Check className="h-3 w-3" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleStatusChange(request.id, 'rejected')}
                            className="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center space-x-1"
                          >
                            <X className="h-3 w-3" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Request Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{selectedRequest.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{selectedRequest.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{selectedRequest.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{selectedRequest.company}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm text-gray-500">Position: </span>
                    <span className="text-gray-700">{selectedRequest.position}</span>
                  </div>
                </div>

                {/* Request Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Service Requested:</span>
                      <p className="text-gray-700">{selectedRequest.service}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Message:</span>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">
                        {selectedRequest.message}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Submitted:</span>
                        <p className="text-gray-700">{selectedRequest.submittedDate}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                          selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          selectedRequest.status === 'approved' ? 'bg-green-100 text-green-600' :
                          selectedRequest.status === 'rejected' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {selectedRequest.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Information */}
                {selectedRequest.reviewedDate && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Review Information</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Reviewed by:</span>
                        <span className="text-gray-700 ml-2">{selectedRequest.reviewedBy}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Review date:</span>
                        <span className="text-gray-700 ml-2">{selectedRequest.reviewedDate}</span>
                      </div>
                      {selectedRequest.notes && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Notes:</span>
                          <p className="text-gray-700 mt-1">{selectedRequest.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              {selectedRequest.status === 'pending' && (
                <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedRequest.id, 'rejected')
                      closeModal()
                    }}
                    className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedRequest.id, 'approved')
                      closeModal()
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Check className="h-4 w-4" />
                    <span>Approve Request</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RequestManager