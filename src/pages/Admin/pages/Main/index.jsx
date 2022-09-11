import React from 'react'
import { WorkerCards } from 'pages/Admin/components/WorkerCards'
import { NotFound } from 'components/NotFound'
import { useNavigate } from 'react-router-dom'

export const Main = () => {
  const adminLocalId = localStorage.getItem('admin')

  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  if (!adminLocalId) return goBack()

  return (
    <WorkerCards />
  )
}
