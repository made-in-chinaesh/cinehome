import React from 'react'
import { MainLayout } from 'pages/Main/MainLayout'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from 'pages/Auth/AuthLayout'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from 'configs'
import { AdminLayout } from 'pages/Admin/AdminLayout'
import Aos from 'aos'
import 'aos/dist/aos.css'

initializeApp(firebaseConfig)

const App = () => {
  React.useEffect(() => {
    Aos.init()
  }, [])

  return (
    <Routes>
      <Route path="/*" element={<MainLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  )
}

export default App
