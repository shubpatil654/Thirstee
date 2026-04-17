const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// Set auth token in localStorage
const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

// Remove auth token from localStorage
const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }))
    throw new Error(error.error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Authentication API
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    
    if (response.access_token) {
      setAuthToken(response.access_token)
    }
    
    return response
  },

  logout: () => {
    removeAuthToken()
  },

  verifyToken: async () => {
    return apiRequest('/auth/verify')
  },
}

// Products API
export const productsAPI = {
  getAll: () => apiRequest('/products'),
  
  create: (productData: any) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  update: (id: number, productData: any) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  delete: (id: number) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
}

// Gallery API
export const galleryAPI = {
  getAll: () => apiRequest('/gallery'),
  
  create: (itemData: any) => apiRequest('/gallery', {
    method: 'POST',
    body: JSON.stringify(itemData),
  }),
  
  update: (id: number, itemData: any) => apiRequest(`/gallery/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  }),
  
  delete: (id: number) => apiRequest(`/gallery/${id}`, {
    method: 'DELETE',
  }),
}

// Join Requests API
export const joinRequestsAPI = {
  getAll: () => apiRequest('/join-requests'),
  
  create: (requestData: any) => apiRequest('/join-requests', {
    method: 'POST',
    body: JSON.stringify(requestData),
  }),
  
  updateStatus: (id: number, status: string, notes?: string) => apiRequest(`/join-requests/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes }),
  }),
}

// Contact API
export const contactAPI = {
  getAll: () => apiRequest('/contact'),
  
  create: (messageData: any) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),
}

// Upload API
export const uploadAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    
    const token = getAuthToken()
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }))
      throw new Error(error.error || 'Upload failed')
    }
    
    return response.json()
  },
}

// Settings API
export const settingsAPI = {
  get: () => apiRequest('/settings'),
  
  update: (settings: any) => apiRequest('/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  }),
}

// Content API
export const contentAPI = {
  get: () => apiRequest('/content'),
  
  update: (content: any) => apiRequest('/content', {
    method: 'PUT',
    body: JSON.stringify(content),
  }),
}

// Dashboard API
export const dashboardAPI = {
  getStats: () => apiRequest('/dashboard/stats'),
}

// Health Check API
export const healthAPI = {
  check: () => apiRequest('/health'),
}