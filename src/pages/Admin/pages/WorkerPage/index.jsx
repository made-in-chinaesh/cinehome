import React from 'react'
import cls from './WorkerPage.module.scss'
import { Loader } from 'components/Loader'
import { parseJSON } from 'helpers'
import { Admin } from 'pages/Admin'
import { useParams } from 'react-router-dom'


const ReportCards = ({
  report,
  children,
  id,
  getWorker,
}) => {
  const {
    check,
    clientCount,
    date,
    time,
    key,
    isChecked,
  } = report

  const [isActive, setIsActive] = React.useState(false)

  const checkReport = (id, reportKey) => {
    const request = Admin.API.checkReport(id, reportKey)

    request
      .then(() => getWorker())
  }

  return (
    <div className={cls.container}>
      <div className={cls.card}>
        <div style={{ background: isChecked ? 'green' : 'red' }}></div>
        <h2>Кол-во людей: {clientCount}</h2>
        <h2>Дата: {date}</h2>
        <h2>Время: {time}</h2>
        <p>Чек: {check}</p>
        {
          !isChecked && <button onClick={() => checkReport(id, key)}>Check</button>
        }
        <button onClick={() => setIsActive(!isActive)}>{isActive ? 'закрыть' : 'открыть'}</button>
      </div>
      {
        isActive && <div className={cls.productsCard}>{children}</div>
      }
    </div>
  )
}

const WorkerHeader = ({
  photoUrl,
  firstName,
  lastName,
}) => {
  return (
    <div className={cls.header}>
      <img src={photoUrl} alt="" />
      <p>{firstName} {lastName}</p>
    </div>
  )
}

export const WorkerPage = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(false)
  const [worker, setWorker] = React.useState(null)

  const getWorker = () => {
    const request = Admin.API.getWorker(id)

    setIsLoading(true)
    request
      .then(res => {
        const data = res.data
        setWorker(data)
      })
      .finally(() => setIsLoading(false))
  }

  React.useEffect(() => {
    getWorker()
  }, [])

  if (isLoading) return <Loader isFullPage={true} />

  if (!worker) return

  const {
    firstName,
    lastName,
    photoUrl,
    reports: workerReports,
  } = worker

  const reports = parseJSON(workerReports)

  return (
    <div className={cls.root}>
      <WorkerHeader
        photoUrl={photoUrl}
        firstName={firstName}
        lastName={lastName}
      />
      <div className={cls.main}>
        {
          reports?.length ? reports.map((report) => (
            <ReportCards
              key={report.key}
              report={report}
              id={id}
              getWorker={getWorker}
            >
              {
                report.orders.map(({ count, title, totalPrice }, index) => (
                  <div key={index}>
                    <h2>{title}</h2>
                    <h2>Общ-стоимость: {totalPrice}</h2>
                    <h2>Кол-во: {count}</h2>
                  </div>
                ))
              }
            </ReportCards>
          )) : <h2>Pusto!</h2>
        }
      </div>
    </div>
  )
}
