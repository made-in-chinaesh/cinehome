import React from 'react'
import cls from './WorkerSidebar.module.scss'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { parseJSON } from 'helpers'

const WorkerHeaderSkeleton = () => {
  return (
    <div className={cls.headerSkeleton}>
      <div></div>
      <section></section>
    </div>
  )
}

const ReportCardsSkeleton = () => {
  const reportsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
}) => {
  const navigate = useNavigate()
  const location = useLocation()

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

  const reportIdShorter = (key) => {
    return location.pathname.substring(location.pathname.length - key.length)
  }

  const reports = parseJSON(worker?.reports)

  return (
    <div className={cls.root}>
      {
        worker ?
          <div className={cls.header}>
            <img src={worker.photoUrl} alt="#" />
            <p>{worker.firstName} {worker.lastName}</p>
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
        <h1>{!reports?.length ? 'Ваш список пуст' : 'Ваши отчеты'}</h1>
        <div className={cls.reports}>
          {
            worker ? reports?.map(({ check, date, key }) => (
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
                <h2>Чек: {check}</h2>
                <p>{date}</p>
              </div>
            )) : <ReportCardsSkeleton />
          }
        </div>
      </div>
    </div>
  )
}
