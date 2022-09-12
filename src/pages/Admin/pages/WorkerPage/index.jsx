import { NoAccess } from 'components/NoAccess'
import { Admin } from 'pages/Admin'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cls from './WorkerPage.module.scss'
export const WorkerPage = () => {
  const { workerId: index } = useParams()
  const workerId = localStorage.getItem('workerId')
  const navigate = useNavigate()

  const goToSingleRoom = () => navigate(`/admin/room/${roomId}`)
  const {
    rooms,
  } = Admin.Hook.Room.use()

  if (!workerId) return (<NoAccess isAdmin={true}/>)

  return (
    <div className={cls.root}>

      <div className={cls.roomsContainer}>
        {
          rooms?.map(({ roomImage }, index) => (
            <div className={cls.roomBlock} key={roomImage}>
              <img src={roomImage} alt="#" />
              <span>room {index + 1}</span>
            </div>
          ))
        }
      </div>

      <div className={cls.productsContainer}>

      </div>

    </div>
  )
}
