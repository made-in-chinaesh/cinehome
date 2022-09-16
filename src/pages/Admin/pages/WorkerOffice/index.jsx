import React from 'react'
import cls from './WorkerOffice.module.scss'
import { NoAccess } from 'components/NoAccess'
import { Admin } from 'pages/Admin'
import { useNavigate, useParams } from 'react-router-dom'
import { AddProductsModal } from 'pages/Admin/components/AddProductsModal'
import { AddRoomModal } from 'pages/Admin/components/AddRoomModal'
import { Loader } from 'components/Loader'
import { CardForWorker } from 'pages/Admin/components/CardForWorker'

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

  const goToSingleRoom = (roomId) => navigate(`/admin/room/${roomId}`)

  const {
    rooms,
    isLoading,
    products,
    filteredProduct,
    actions: {
      getRooms,
      onChangeInput,
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


        <input type="text" placeholder="Поиск" onChange={onChangeInput}/>
        <div className={cls.productsContainer}>
          {
            filteredProduct ?
              filteredProduct?.map((category) => {
                return category?.map(product => (
                  (
                    <CardForWorker
                      key={product.key}
                      product={product}
                    />
                  )
                ))
              }) :
              products?.map((category) => {
                return category.map(product => (
                  (
                    <CardForWorker
                      key={product.key}
                      product={product}
                    />
                  )
                ))
              })
          }
        </div>
        <button onClick={() => setAddProductModalActive(true)}>Добавить продукт</button>
      </div>
      {
        addRoomModalActive &&
        <AddRoomModal
          isActive={addRoomModalActive}
          setIsActive={setAddRoomModalActive}
          getRooms={getRooms}
        />
      }
      {
        addProductModalActive &&
        <AddProductsModal
          isActive={addProductModalActive}
          setIsActive={setAddProductModalActive}
        />
      }
    </>
  )
}
