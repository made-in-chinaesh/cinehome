import React from 'react'
import { useParams } from 'react-router-dom'

export const WorkerPage = () => {
  const { id } = useParams()

  return (
    <div>
      <h2 style={{ color: '#fff' }} >Hello, Worker {id}</h2>
      <button>Add Products</button>
    </div>
  )
}
