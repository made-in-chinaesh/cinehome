import React from 'react'
import cls from './RoomCards.module.scss'

export const RoomCards = ({
  roomImage,
  isActive,
  index,
  children,
<<<<<<< HEAD
  onClick,
}) => {
  return (
    <div className={cls.root} onClick={onClick}>
=======
}) => {
  return (
    <div className={cls.root}>
>>>>>>> 413fe14 (last)
      <img src={roomImage} alt="#" />
      <p>Комната {index} {isActive && '(занято)'}</p>
      {children}
    </div>
  )
}
