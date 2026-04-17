'use client'

import { 
  BarChart3, 
  FileText, 
  Package, 
  Image as ImageIcon, 
  Users, 
  MessageSquare,
  Settings,
  LogOut,
  User,
  Star,
  Globe
} from 'lucide-react'

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout: () => void
}

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview & Analytics' },
    { id: 'content', label: 'Content Manager', icon: FileText, description: 'Edit all website content' },
    { id: 'products', label: 'Products', icon: Package, description: 'Manage water bottles' },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, description: 'Project images & media' },
    { id: 'users', label: 'Users & Sponsors', icon: Users, description: 'Manage users & sponsors' },
    { id: 'requests', label: 'Join Requests', icon: MessageSquare, description: 'Partnership requests' },
    { id: 'settings', label: 'Site Settings', icon: Settings, description: 'Global site configuration' }
  ]

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-16 overflow-y-auto">
      <div className="p-6">
        {/* Admin Profile */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Admin Panel</h3>
              <p className="text-sm text-gray-500">Content Management</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to logout?')) {
                onLogout()
              }
            }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-start space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                activeTab === item.id
                  ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {(() => {
                const IconComponent = item.icon;
                return <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />;
              })()}
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Products</span>
              <span className="font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gallery Images</span>
              <span className="font-medium text-gray-900">48</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pending Requests</span>
              <span className="font-medium text-orange-600">6</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to logout?')) {
                onLogout()
              }
            }}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-semibold">Logout</span>
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">
            Logged in as Admin
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar