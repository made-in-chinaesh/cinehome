import { NotFound } from 'components/NotFound'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RegisterWorker } from './pages/RegisterWorker'
import { SignIn } from './pages/SignIn'

export const AuthLayout = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/registerworker" element={<RegisterWorker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

