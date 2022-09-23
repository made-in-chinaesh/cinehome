import React from 'react'
import cls from './WorkerSidebar.module.scss'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AddOrderModal } from '../AddOrderModal'
import Swal from 'sweetalert2'

const WorkerHeaderSkeleton = () => {
  return (
    <div className={cls.headerSkeleton}>
      <div></div>
      <section></section>
    </div>
  )
}

const ReportCardsSkeleton = () => {
  const reportsArr = [1, 2, 3, 4, 5, 6]

  return (
    reportsArr.map(item => (
      <div
        className={cls.reportsSkeleton}
        key={item}
      >
        <div></div>
        <div></div>
      </div>

    ))
  )
}

export const WorkerSidebar = ({
  workerId,
  worker,
  products,
  rooms,
  getRooms,
  reports,
  isLoadingReports,
  getReports,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isActiveOrderModal, setIsActiveOrderModal] = React.useState(false)

  const navigation = [
    {
      id: 1,
      to: `/admin/worker/${workerId}/`,
      title: 'Products',
    },
    {
      id: 2,
      to: 'rooms',
      title: 'Rooms',
    },
  ]

  const logout = () => {
    Swal.fire({
      title: 'Вы действительно хотите выйти из аккаунта?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Отменить',
      confirmButtonText: 'Выйти',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('workerId')
        navigate('/admin/auth/signin')
      }
    })
  }

  const reportIdShorter = (key) => {
    return location.pathname.substring(location.pathname.length - key.length)
  }

  return (
    <>
      <div className={cls.root}>
        {
          worker ?
            <div className={cls.header}>
              <img src={worker.photoUrl} alt="#" />
              <p>{worker.firstName} {worker.lastName}</p>
              <button onClick={() => logout()}>Выйти</button>
            </div> :
            <WorkerHeaderSkeleton />
        }
        <div className={cls.nav}>
          <nav>
            {
              navigation.map(({ title, to, id }) => (
                <NavLink
                  key={id}
                  to={to}
                  style={({ isActive }) => {
                    return isActive ?
                      {
                        background: '#7a5acc',
                        color: '#fff',
                      } : null
                  }}
                >{title}</NavLink>
              ))
            }
          </nav>
        </div>
        <div className={cls.reportsContainer}>
          <h1>Ваши отчеты</h1>
          <div className={cls.reports}>
            {
              !isLoadingReports ? reports?.map(({ isChecked, date, key }) => (
                <div
                  key={key}
                  onClick={() => navigate(`/admin/worker/${workerId}/report/${key}`)}
                  style={
                    reportIdShorter(key) === key ?
                      {
                        background: '#7a5acc',
                        color: '#fff',
                      } : null
                  }
                >
                  <p>{date}</p>
                  <h2>{isChecked ? 'Проверено' : 'Просматривается'}</h2>
                </div>
              )) : <ReportCardsSkeleton />
            }
          </div>
        </div>
        <div className={cls.orderBtnContainer}>
          <button
            className={cls.orderBtn}
            onClick={() => setIsActiveOrderModal(true)}
          >Сделать заказ</button>
        </div>
      </div>
      {
        isActiveOrderModal &&
        <AddOrderModal
          products={products}
          rooms={rooms}
          isActive={isActiveOrderModal}
          setIsActive={setIsActiveOrderModal}
          getRooms={getRooms}
          workerId={workerId}
          getReports={getReports}
        />
      }
    </>
  )
}
