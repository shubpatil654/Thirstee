'use client'

import { useContent } from '@/app/contexts/ContentContext'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

const ContentRefreshIndicator = () => {
  const { isLoading } = useContent()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Updating content...</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContentRefreshIndicator