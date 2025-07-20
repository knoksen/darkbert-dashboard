import axios, { AxiosError } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000 // 10 seconds timeout
})

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.')
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection and ensure the server is running.')
    }
    
    const status = error.response.status
    if (status === 404) {
      throw new Error('Resource not found. Please check the API endpoint.')
    }
    
    if (status === 500) {
      throw new Error('Server error. Please try again later.')
    }
    
    throw error
  }
)

export interface MetricsData {
  epochs: number[];
  train_loss: number[];
  val_loss: number[];
}

export async function fetchMetrics(): Promise<MetricsData> {
  try {
    const resp = await api.get<MetricsData>('/metrics')
    
    // Validate response data
    const data = resp.data
    if (!data || !Array.isArray(data.epochs) || !Array.isArray(data.train_loss) || !Array.isArray(data.val_loss)) {
      throw new Error('Invalid metrics data format received from server')
    }
    
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred while fetching metrics')
  }
}

export default api
