'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from './layout'
import {
  AdminSidebar,
  DashboardOverview,
  ContentManager,
  ProductManager,
  GalleryManager,
  UserManager,
  RequestManager,
  SiteSettings
} from './components'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { logout } = useAuth()

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />
      case 'content':
        return <ContentManager />
      case 'products':
        return <ProductManager />
      case 'gallery':
        return <GalleryManager />
      case 'users':
        return <UserManager />
      case 'requests':
        return <RequestManager />
      case 'settings':
        return <SiteSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="pt-16 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={logout} />
      <div className="flex-1 ml-64 p-8">
        {renderContent()}
      </div>
    </div>
  )
}

export default AdminPage