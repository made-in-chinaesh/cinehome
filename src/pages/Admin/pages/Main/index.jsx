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

const WorkersCard = ({
  worker,
  deleteWorker,
  checkReport,
  deleteReport,
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
    isLoadingRooms,
    actions: {
      deleteRoom,
    },
  } = Admin.Hook.WorkerOffice.use()
  const navigate = useNavigate()
  const goToSignUp = () => navigate('/admin/auth/registerworker')

  const adminId = localStorage.getItem('admin')

  const onDelete = (roomId) => {
    Swal.fire({
      title: 'Вы действительно хотите удалить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Отменить',
      confirmButtonText: 'Удалить',
    }).then((result) => {
      if (result.isConfirmed) deleteRoom(roomId)
    })
  }

  if (!adminId) return <NoAccess isAdmin={true} />

  if (!workers) return <Loader isWhite={true} />

  return (
    <div className={cls.root}>
      <div className={cls.container}>
        <div className={cls.header}><h1>Отчеты работников</h1> <AdminBtn onClick={goToSignUp}> + Добавить работника</AdminBtn></div>
        <div className={cls.workersContainer}>
          {
            workers.map(worker => (
              <WorkersCard
                key={worker.key}
                worker={worker}
                deleteWorker={deleteWorker}
                checkReport={checkReport}
                deleteReport={deleteReport}
              />
            ))
          }
        </div>
        <h2>Комнаты</h2>
        {
          isLoadingRooms ? <Loader/> :
            <div className={cls.roomContainer}>
              {
                rooms?.map(({ roomImage, isActive, key, order, personCount }, index) => (
                  <RoomCards
                    key={key}
                    index={index + 1}
                    roomImage={roomImage}
                    personCount={personCount}
                  >
                    <button onClick={() => onDelete(key)}>Удалить</button>
                  </RoomCards>
                ))
              }
            </div>

        }

      </div>

    </div>
  )
}
