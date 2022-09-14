import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './pages/Auth/AuthLayout'
import { Main } from './pages/Main'
import { Room } from './pages/Room'
import { WorkerOffice } from './pages/WorkerOffice'
import { WorkerPage } from './pages/WorkerPage'

export const AdminLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/worker/:workerId" element={<WorkerOffice />} />
      <Route path="/worker/reports/:id" element={<WorkerPage />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  )
}
