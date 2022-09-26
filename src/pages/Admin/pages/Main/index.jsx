import React from 'react'
import cls from './Main.module.scss'
import { NoAccess } from 'components/NoAccess'
import { Admin } from 'pages/Admin'
import { Loader } from 'components/Loader'
import { WorkerReportsModal } from 'pages/Admin/components/WorkerReportsModal'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import AdminBtn from 'pages/Admin/adminUI/AdminBtn'
import { RoomCards } from 'pages/Admin/components/RoomCards'
import { AddRoomModal } from 'pages/Admin/components/AddRoomModal'
import { ProductCards } from 'pages/Admin/components/ProductCards'
import { AddProductModal } from 'pages/Admin/components/AddProductModal'

const WorkersCard = ({
  worker,
  deleteWorker,
  checkReport,
  deleteReport,
  isLoadingReports,
  getReports,
  reports,

}) => {
  if (!worker) return

  const onDelete = () => {
    Swal.fire({
      title: 'Вы действительно хотите удалить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Отменить',
      confirmButtonText: 'Удалить',
    }).then((result) => {
      if (result.isConfirmed) deleteWorker(worker.key)
    })
  }

  const {
    photoUrl,
    lastName,
    firstName,
  } = worker

  const [isActiveWorkerReportsModal, setIsActiveWorkerReportsModal] = React.useState(false)

  return (
    <>
      <div className={cls.card}>
        <div className={cls.userInfo}>
          <img src={photoUrl} alt="#" />
          <p>{firstName} {lastName}</p>
        </div>
        <div className={cls.btnContainer}>
          <button onClick={() => setIsActiveWorkerReportsModal(true)}>Посмотреть отчеты</button>
          <button onClick={() => onDelete()}>Уволить</button>
        </div>
      </div>
      {
        isActiveWorkerReportsModal &&
        <WorkerReportsModal
          worker={worker}
          setIsActive={setIsActiveWorkerReportsModal}
          checkReport={checkReport}
          deleteReport={deleteReport}
          isLoadingReports={isLoadingReports}
          getReports={getReports}
          reports={reports}
        />
      }
    </>
  )
}

export const Main = () => {
  const {
    workers,
    actions: {
      deleteWorker,
      checkReport,
      deleteReport,
    },
  } = Admin.Hook.Main.use()
  const {
    rooms,
    products,
    reports,
    isLoadingProducts,
    isLoadingPostProduct,
    isLoadingRooms,
    isLoadingPostRoom,
    isLoadingReports,
    actions: {
      postRoom,
      deleteRoom,
      postProduct,
      editProduct,
      deleteProduct,
      getReports,
    },
  } = Admin.Hook.WorkerOffice.use()

  const navigate = useNavigate()
  const goToSignUp = () => navigate('/admin/auth/registerworker')

  const adminId = sessionStorage.getItem('adminLocalId')

  const onDelete = (roomId) => {
    Swal.fire({
      title: 'Вы действительно хотите уволить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Отменить',
      confirmButtonText: 'Уволить',
    }).then((result) => {
      if (result.isConfirmed) deleteRoom(roomId)
    })
  }

  const logout = () => {
    Swal.fire({
      title: 'Вы действительно хотите выйти?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Отменить',
      confirmButtonText: 'Выйти',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('admin')
        navigate('/admin/auth/signin')
      }
    })
  }
  const [isActiveRoomModal, setIsActiveRoomModal] = React.useState(false)
  const [isActiveProductModal, setIsActiveProductModal] = React.useState(false)

  if (!adminId) return <NoAccess isAdmin={true} />

  return (
    <>
      <div className={cls.root}>
        <nav>
          <ul>
            <li><a href="#workers">Работники</a></li>
            <li><a href="#rooms">Комнаты</a></li>
            <li><a href="#products">Продукты</a></li>
          </ul>

          <button onClick={logout}>Выйти</button>
        </nav>
        <div className={cls.container}>

          <div id="workers" className={cls.header}><h1>Работники</h1> <AdminBtn onClick={goToSignUp}> + Добавить работника</AdminBtn></div>
          <div className={cls.workersContainer}>
            {
              !workers?.length ? <h1>Список работников пуст</h1> :
                workers?.map(worker => (
                  <WorkersCard
                    key={worker.key}
                    worker={worker}
                    deleteWorker={deleteWorker}
                    checkReport={checkReport}
                    deleteReport={deleteReport}
                    getReports={getReports}
                    isLoadingReports={isLoadingReports}
                    reports={reports}
                  />
                ))
            }
          </div>

          <div id="rooms" className={cls.header}><h1>Комнаты</h1> <AdminBtn onClick={() => setIsActiveRoomModal(true)}> + Добавить комнату</AdminBtn></div>
          {
            isLoadingRooms ? <Loader isWhite={false}/> :
              <div className={cls.roomContainer}>
                {
                  rooms?.map(({ roomImage, key, personCount }, index) => (
                    <RoomCards
                      key={key}
                      index={index + 1}
                      roomImage={roomImage}
                      personCount={personCount}
                    >
                      <AdminBtn isDelete={true} onClick={() => onDelete(key)}>Удалить</AdminBtn>
                    </RoomCards>
                  ))
                }
              </div>
          }

          <div id="products" className={cls.header}><h1>Продукты</h1> <AdminBtn onClick={() => setIsActiveProductModal(true)}> + Добавить продукт</AdminBtn></div>
          {
            isLoadingProducts ? <Loader isWhite={false}/> :
              <div className={cls.productsContainer}>
                {
                  products?.map(product => (
                    <ProductCards
                      key={product.key}
                      product={product}
                      editProduct={editProduct}
                      deleteProduct={deleteProduct}
                    />
                  ))
                }
              </div>
          }
        </div>

      </div>
      {
        isActiveRoomModal &&
        <AddRoomModal
          isLoading={isLoadingPostRoom}
          postRoom={postRoom}
          isActive={isActiveRoomModal}
          setIsActive={setIsActiveRoomModal}
        />
      }
      {
        isActiveProductModal &&
        <AddProductModal
          isLoading={isLoadingPostProduct}
          isActive={isActiveProductModal}
          postProduct={postProduct}
          setIsActive={setIsActiveProductModal}
        />
      }

    </>
  )
}
