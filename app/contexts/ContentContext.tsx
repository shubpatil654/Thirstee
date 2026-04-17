'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { contentAPI } from '@/lib/api'

interface ContentContextType {
  content: any
  refreshContent: () => Promise<void>
  isLoading: boolean
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

interface ContentProviderProps {
  children: ReactNode
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  const refreshContent = async () => {
    try {
      setIsLoading(true)
      const newContent = await contentAPI.get()
      setContent(newContent)
    } catch (error) {
      console.error('Failed to refresh content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshContent()
  }, [])

  const value = {
    content,
    refreshContent,
    isLoading
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}