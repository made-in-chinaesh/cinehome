import React from 'react'
import cls from './WorkerOffice.module.scss'
import { NoAccess } from 'components/NoAccess'
import { Admin } from 'pages/Admin'
import { useNavigate, useParams } from 'react-router-dom'

export const WorkerOffice = () => {
  const workerId = localStorage.getItem('workerId')
  const navigate = useNavigate()

  const goToSingleRoom = (roomId) => navigate(`/admin/roomtest/${roomId}`)

  const {
    rooms,
  } = Admin.Hook.Room.use()

  if (!workerId) return (<NoAccess isAdmin={true}/>)

  return (
    <div className={cls.root}>
      <div className={cls.roomsContainer}>
        {
          rooms?.map(({ roomImage, isActive, key }, index) => (
            <div
              className={isActive ? cls.activeRoomBlock : cls.roomBlock}
              key={key}
              onClick={() => goToSingleRoom(key)}
            >
              <img src={roomImage} alt="#" />
              {
                isActive ? <span>Занято</span> : <span>room {index + 1}</span>
              }
            </div>
          ))
        }
      </div>

      <div className={cls.productsContainer}>

      </div>

    </div>
  )
}
