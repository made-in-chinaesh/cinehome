import React from 'react'
import { MainLayout } from 'pages/Main/MainLayout'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from 'pages/Auth/AuthPage'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from 'configs'
import { AdminLayout } from 'pages/Admin/AdminLayout'

initializeApp(firebaseConfig)

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  )
}

export default App
