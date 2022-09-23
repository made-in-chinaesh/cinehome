import React from 'react'
import cls from './Main.module.scss'
import { NoAccess } from 'components/NoAccess'
import { Admin } from 'pages/Admin'
import { Loader } from 'components/Loader'
import { WorkerReportsModal } from 'pages/Admin/components/WorkerReportsModal'
import Swal from 'sweetalert2'

const WorkersCard = ({
  worker,
  deleteWorker,
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
        <img src={photoUrl} alt="#" />
        <p>{firstName} {lastName}</p>
        <div>
          <button onClick={() => setIsActiveWorkerReportsModal(true)}>Посмотреть отчеты</button>
          <button onClick={() => onDelete()}>Удалить</button>
        </div>
      </div>
      {
        isActiveWorkerReportsModal &&
        <WorkerReportsModal
          worker={worker}
          setIsActive={setIsActiveWorkerReportsModal}
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
    },
  } = Admin.Hook.Main.use()

  const adminId = localStorage.getItem('admin')

  if (!adminId) return <NoAccess isAdmin={true} />

  if (!workers) return <Loader isWhite={true} />

  return (
    <div className={cls.root}>
      <div className={cls.container}>
        <h1>Admin Panel</h1>
        <div className={cls.workersContainer}>
          {
            workers.map(worker => (
              <WorkersCard
                key={worker.key}
                worker={worker}
                deleteWorker={deleteWorker}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
