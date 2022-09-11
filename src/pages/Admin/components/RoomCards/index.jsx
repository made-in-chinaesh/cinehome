import React from 'react'
import { Admin } from 'pages/Admin'
import { Loader } from 'components/Loader'

export const RoomCards = () => {
  const {
    rooms,
    isLoading,
  } = Admin.Hook.Room.use()

  if (!rooms || isLoading) return <Loader />

  return (
    <div>
      {
        rooms.map(({ isActive, roomImage }, index) => (
          <div key={index}>
            <img src={roomImage} alt="#" />
          </div>
        ))
      }
    </div>
  )
}
