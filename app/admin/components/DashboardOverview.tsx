'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Package, 
  MessageSquare, 
  Eye, 
  Edit,
  BarChart3,
  Calendar,
  Globe,
  Star
} from 'lucide-react'

const DashboardOverview = () => {
  const stats = [
    { 
      label: 'Total Sponsors', 
      value: '52', 
      change: '+8%', 
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Bottles Distributed', 
      value: '125,430', 
      change: '+15%', 
      changeType: 'increase',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Active Campaigns', 
      value: '18', 
      change: '+3%', 
      changeType: 'increase',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      label: 'Join Requests', 
      value: '24', 
      change: '+12%', 
      changeType: 'increase',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentActivity = [
    { id: 1, action: 'New product added', item: 'Premium Glass Bottle', time: '2 hours ago', type: 'product' },
    { id: 2, action: 'Gallery updated', item: 'Corporate Event Photos', time: '4 hours ago', type: 'gallery' },
    { id: 3, action: 'Join request received', item: 'TechCorp Solutions', time: '6 hours ago', type: 'request' },
    { id: 4, action: 'Content updated', item: 'About Section', time: '1 day ago', type: 'content' },
    { id: 5, action: 'New sponsor approved', item: 'Green Energy Inc', time: '2 days ago', type: 'sponsor' }
  ]

  const recentJoinRequests = [
    { id: 1, name: 'John Smith', email: 'john@company.com', company: 'Tech Corp', date: '2024-01-15', status: 'pending' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@startup.com', company: 'Green Startup', date: '2024-01-14', status: 'approved' },
    { id: 3, name: 'Mike Chen', email: 'mike@events.com', company: 'Event Solutions', date: '2024-01-13', status: 'pending' },
    { id: 4, name: 'Lisa Park', email: 'lisa@nonprofit.org', company: 'Community Help', date: '2024-01-12', status: 'reviewed' }
  ]

  const quickActions = [
    { label: 'Add New Product', action: 'products', icon: Package, color: 'bg-blue-500' },
    { label: 'Upload Gallery Image', action: 'gallery', icon: Eye, color: 'bg-green-500' },
    { label: 'Edit Homepage Content', action: 'content', icon: Edit, color: 'bg-purple-500' },
    { label: 'Review Join Requests', action: 'requests', icon: MessageSquare, color: 'bg-orange-500' }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your THIRSTEE website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                {(() => {
                  const IconComponent = stat.icon;
                  return <IconComponent className={`h-6 w-6 ${stat.color}`} />;
                })()}
              </div>
              <span className={`text-sm font-semibold ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-display font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <button
                key={action.label}
                className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-left"
              >
                <div className={`${action.color} p-3 rounded-lg`}>
                  {(() => {
                    const IconComponent = action.icon;
                    return <IconComponent className="h-5 w-5 text-white" />;
                  })()}
                </div>
                <span className="font-medium text-gray-900">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
            System Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Website Status</span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Online</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Connected</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Backup</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage Used</span>
              <span className="text-sm text-gray-500">2.4 GB / 10 GB</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Join Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 bg-white rounded-2xl shadow-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold text-gray-900">
              Recent Join Requests
            </h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Company</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentJoinRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{request.name}</div>
                      <div className="text-sm text-gray-500">{request.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{request.company}</td>
                  <td className="py-4 px-6 text-gray-700">{request.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'approved' ? 'bg-green-100 text-green-600' :
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                        View
                      </button>
                      <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors text-sm">
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardOverview