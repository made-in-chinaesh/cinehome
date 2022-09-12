import React from 'react'
import { WorkerCards } from 'pages/Admin/components/WorkerCards'
import { NoAccess } from 'components/NoAccess'

export const Main = () => {
  const adminLocalId = localStorage.getItem('admin')

  if (!adminLocalId) return <NoAccess isAdmin={true} />

  return (
    <WorkerCards />
  )
}
