import axios from 'axios'

// Use a relative base URL so Vite can proxy requests during development.
// You can override it with an absolute URL when needed in production.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Basic logging for all requests/responses
apiClient.interceptors.request.use(
  (config) => {
    try {
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.params || config.data || '')
    } catch (e) {
      /* ignore logging errors */
    }
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    try {
      console.log('API Response:', response.config.url, response.status)
    } catch (e) {
      /* ignore logging errors */
    }
    return response
  },
  (error) => {
    console.error('API Response Error:', error)
    return Promise.reject(error)
  }
)

export const businessAPI = {
  // Get business by ID
  getBusinessById: async (id) => {
    console.log('businessAPI.getBusinessById called with id:', id)
    try {
      const response = await apiClient.get(`/business/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching business:', error)
      throw error
    }
  },

  // Add new business
  addBusiness: async (businessData) => {
    console.log('businessAPI.addBusiness called with data:', businessData)
    try {
      const response = await apiClient.post('/business', businessData)
      return response.data
    } catch (error) {
      console.error('Error adding business:', error)
      throw error
    }
  },

  // Update business
  updateBusiness: async (id, businessData) => {
    console.log('businessAPI.updateBusiness called with id:', id)
    try {
      const response = await apiClient.put(`/business/${id}`, businessData)
      return response.data
    } catch (error) {
      console.error('Error updating business:', error)
      throw error
    }
  },

  // Delete business
  deleteBusiness: async (id) => {
    console.log('businessAPI.deleteBusiness called with id:', id)
    try {
      const response = await apiClient.delete(`/business/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting business:', error)
      throw error
    }
  },

  // Search nearby businesses
  searchNearby: async (latitude, longitude, radius = 5.0) => {
    console.log('businessAPI.searchNearby called with:', { latitude, longitude, radius })
    try {
      const response = await apiClient.get(
        `/nearby/search/${latitude}/${longitude}?radius=${radius}`
      )
      return response.data
    } catch (error) {
      console.error('Error searching nearby businesses:', error)
      throw error
    }
  },
}

export default apiClient
