import React from 'react'
import { RoomOrderModal } from '../RoomOrderModal'
import cls from './RoomCards.module.scss'

export const RoomCards = ({
  roomImage,
  isActive,
  index,
  order,
  children,
  roomId,
  completeRoomOrder,
  personCount,
  check,
}) => {
  const [isActiveRoomOrderModal, setIsActiveRoomOrderModal] = React.useState(false)

  return (
    <>
      <div className={cls.root}>
        <img
          src={roomImage} alt="#"
          onClick={() => isActive ? setIsActiveRoomOrderModal(true) : null}
        />
        <p>Комната {index} {isActive && '(забронировано)'}</p>
        {children}
      </div>
      {
        isActiveRoomOrderModal &&
        <RoomOrderModal
          setIsActive={setIsActiveRoomOrderModal}
          order={order}
          roomId={roomId}
          completeRoomOrder={completeRoomOrder}
          personCount={personCount}
          check={check}
        />
      }
    </>
  )
}
