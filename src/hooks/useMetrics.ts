import { useQuery } from 'react-query'
import { fetchMetrics } from '@/services/api'

export default function useMetrics() {
  return useQuery('metrics', fetchMetrics, { staleTime: 60000 })
}
