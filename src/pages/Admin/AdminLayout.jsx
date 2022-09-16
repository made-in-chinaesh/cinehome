import React from 'react'
import { NotFound } from 'components/NotFound'
import { Route, Routes } from 'react-router-dom'
import { Timer } from './components/Timer'
import { AuthLayout } from './pages/Auth/AuthLayout'
import { Main } from './pages/Main'
import { Room } from './pages/Room'
import { WorkerOffice } from './pages/WorkerOffice'
import { WorkerPage } from './pages/WorkerPage'

export const AdminLayout = () => {
  const time = new Date()
  time.setMinutes(time.getMinutes() + 600)


  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/worker/:workerId" element={<WorkerOffice />} />
      <Route path="/worker/reports/:id" element={<WorkerPage />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/timer" element={<Timer setTime={60} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
