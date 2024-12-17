import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';
console.log('API Base URL:', API_BASE_URL);

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.url, 'with config:', config);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response from:', response.config.url, 'Data:', response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export const api = {
  async getProperties(filters = {}) {
    try {
      console.log('Starting getProperties call with filters:', filters);
      
      // Clean up empty filter values
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && (!Array.isArray(value) || value.length > 0)) {
          acc[key] = value;
        }
        return acc;
      }, {});

      console.log('Cleaned filters:', cleanFilters);
      console.log('Making request to:', `${API_BASE_URL}/properties`);
      
      const response = await axiosInstance.get('/properties', { 
        params: cleanFilters,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Raw response:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Detailed error in getProperties:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config
      });
      throw error;
    }
  },

  async getFeaturedProperties() {
    const response = await axiosInstance.get('/properties/featured');
    return response.data;
  },

  async getPropertyById(id) {
    const response = await axiosInstance.get(`/properties/${id}`);
    return response.data;
  },

  async searchProperties(query) {
    const response = await axiosInstance.get(`/properties/search?query=${query}`);
    return response.data;
  },

  async saveProperty(propertyId) {
    const response = await axiosInstance.post('/saved-properties', { propertyId });
    return response.data;
  },

  async removeSavedProperty(propertyId) {
    const response = await axiosInstance.delete(`/saved-properties/${propertyId}`);
    return response.data;
  },

  async getSavedProperties() {
    const response = await axiosInstance.get('/saved-properties');
    return response.data;
  }
}; 