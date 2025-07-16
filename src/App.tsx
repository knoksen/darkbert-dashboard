import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Dashboard from '@/routes/index'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}
