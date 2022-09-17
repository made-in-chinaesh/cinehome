import React from 'react'
import cls from './WorkerPage.module.scss'
import { Loader } from 'components/Loader'
import { parseJSON } from 'helpers'
import { Admin } from 'pages/Admin'
import { useParams } from 'react-router-dom'
import { AiFillCheckCircle, AiOutlineEye } from 'react-icons/ai'
import { CardButton } from 'pages/Admin/adminUI/CardButton'
import { CheckBox } from 'pages/Admin/adminUI/CheckBox'

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
  const [checked, setChecked] = React.useState(false)


  const checkReport = (id, reportKey) => {
    setChecked(true)
    const request = Admin.API.checkReport(id, reportKey)

    request
      .then(() => getWorker())
  }

  return (
    <div className={cls.container}>
      <div className={isChecked ? cls.checkedCard : cls.card}>
        {
          <CheckBox onClick={(e) => checkReport(id, key)} isChecked={isChecked ? isChecked : checked} style={{ margin: 'auto 0' }}/>
        }
        <h2>Кол-во людей: {clientCount}</h2>
        <h2>Дата: {date}</h2>
        <h2>Время: {time}</h2>
        <p>Чек: {check}</p>

        <CardButton onClick={() => setIsActive(!isActive)} isDelete={false} children={isActive ? 'Закрыть' : 'Открыть'}/>
        <CardButton children={'Удалить'}/>
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
          )) : <h2>Нет отчетов</h2>
        }
      </div>
    </div>
  )
}
