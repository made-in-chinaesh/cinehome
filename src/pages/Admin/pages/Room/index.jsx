import React from 'react'
import { useParams } from 'react-router-dom'

export const Room = () => {
  const { roomId } = useParams()


  return (
    <div>
      <h2 style={{ color: '#fff' }}>Hello, room number {roomId}</h2>
    </div>
  )
}

