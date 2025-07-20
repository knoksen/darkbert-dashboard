import { useQuery, UseQueryResult } from 'react-query'
import { fetchMetrics, MetricsData } from '@/services/api'

export default function useMetrics(): UseQueryResult<MetricsData, Error> {
  return useQuery('metrics', fetchMetrics, {
    staleTime: 60000,
    retry: 2,
    refetchOnWindowFocus: true,
    onError: (error) => {
      console.error('Error fetching metrics:', error)
    }
  })
}
