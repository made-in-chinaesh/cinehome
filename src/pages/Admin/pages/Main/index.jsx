import React from 'react'
import cls from './index.module.scss'
import { WorkerCards } from 'pages/Admin/components/WorkerCards'
import { NoAccess } from 'components/NoAccess'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from 'pages/Admin/components/Navbar'
import { ProductCards } from 'pages/Admin/components/ProductCards'
import { RoomCards } from 'pages/Admin/components/RoomCards'

export const Main = () => {
  const adminLocalId = localStorage.getItem('admin')

  if (!adminLocalId) return <NoAccess isAdmin={true} />

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<WorkerCards />} />
        <Route path="/products" element={<ProductCards />} />
        <Route path="/rooms" element={<RoomCards />} />
      </Routes>
    </>
  )
}
