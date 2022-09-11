import React from 'react'
import { useParams } from 'react-router-dom'

export const WorkerPage = () => {
  const { workerId } = useParams()

  return (
    <div>
      <h2 style={{ color: '#fff' }}>Hello, {workerId}</h2>
    </div>
  )
}
