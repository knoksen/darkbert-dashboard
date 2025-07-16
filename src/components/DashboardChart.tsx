import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 70 },
  { month: 'Apr', value: 60 }
]

export default function DashboardChart() {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Line type='monotone' dataKey='value' stroke='#3f51b5' strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
