import React from 'react'
import cls from './WorkerOffice.module.scss'
import { NoAccess } from 'components/NoAccess'
import { Admin } from 'pages/Admin'
import { useNavigate, useParams } from 'react-router-dom'
import { AddProductsModal } from 'pages/Admin/components/AddProductsModal'
import { AddRoomModal } from 'pages/Admin/components/AddRoomModal'
import { Loader } from 'components/Loader'

export const WorkerOffice = () => {
  const workerId = localStorage.getItem('workerId')
  const navigate = useNavigate()

  const {
    actions: {
      getRoom,
    },
  } = Admin.Hook.Room.use()

  const [addRoomModalActive, setAddRoomModalActive] = React.useState(false)
  const [addProductModalActive, setAddProductModalActive] = React.useState(false)

  const goToSingleRoom = (roomId) => navigate(`/admin/roomtest/${roomId}`)

  const {
    rooms,
    isLoading,
    actions: {
      getRooms,
    },
  } = Admin.Hook.Room.use()

  if (!workerId) return (<NoAccess isAdmin={true}/>)

  if (isLoading) return <Loader isFullPage={true} />

  return (
    <>
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
        <button onClick={() => setAddRoomModalActive(true)}>Добавить новую комнату</button>
        <button>Добавить продукт</button>
      </div>
    </>
  )
}
