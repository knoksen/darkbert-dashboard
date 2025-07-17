import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import useMetrics from '@/hooks/useMetrics'

export default function DashboardChart() {
  const { data, isLoading, error } = useMetrics()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !data) {
    return <div>Error loading metrics</div>
  }

  const chartData = data.epochs.map((epoch: number, idx: number) => ({
    epoch,
    train: data.train_loss[idx],
    val: data.val_loss[idx]
  }))

  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey='epoch' />
        <YAxis />
        <Tooltip />
        <Line type='monotone' dataKey='train' stroke='#3f51b5' strokeWidth={2} />
        <Line type='monotone' dataKey='val' stroke='#f50057' strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
