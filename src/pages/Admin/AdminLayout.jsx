import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './pages/Auth/AuthLayout'
import { Main } from './pages/Main'
import { Room } from './pages/Room'
import { Worker, WorkerOffice } from './pages/WorkerOffice'
import { WorkerPage } from './pages/WorkerPage'

export const AdminLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/worker" element={<WorkerOffice />} />
      <Route path="/worker/:workerId" element={<WorkerPage />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  )
}
