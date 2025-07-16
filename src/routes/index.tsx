import React from 'react'
import DashboardChart from '@/components/DashboardChart'

export default function Dashboard() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Overview</h1>
      <DashboardChart />
    </div>
  )
}
