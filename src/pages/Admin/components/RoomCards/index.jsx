import React from 'react'
import cls from './index.module.scss'
import { Admin } from 'pages/Admin'
import { Loader } from 'components/Loader'

export const RoomCards = () => {
  const {
    rooms,
    isLoading,
  } = Admin.Hook.Room.use()

  if (!rooms || isLoading) return <Loader />

  return (
    <div className={cls.root}>
      <h2>Комнаты</h2>
      <div className={cls.container}>
        {
          rooms.map(({ isActive, roomImage }, index) => (
            <div key={index}>
              <img src={roomImage} alt="#" />
            </div>
          ))
        }
      </div>
    </div>
  )
}
