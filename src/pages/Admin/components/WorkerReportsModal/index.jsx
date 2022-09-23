import React from 'react'
import cls from './index.module.scss'
import { VscChromeClose } from 'react-icons/vsc'
import { Admin } from 'pages/Admin'
import { Loader } from 'components/Loader'
import { parseJSON } from 'helpers'
import { ProductCards } from '../ProductCards'

const WorkerHeader = ({
  worker,
}) => {
  if (!worker) return

  const {
    photoUrl,
    firstName,
    lastName,
  } = worker

  return (
    <div className={cls.header}>
      <img src={photoUrl} alt="#" />
      <p>{firstName} {lastName}</p>
    </div>
  )
}

const ReportsList = ({
  report,

}) => {
  if (!report) return

  const {
    date,
    personCount,
    order,
  } = report

  const [isShow, setIsShow] = React.useState(false)

  return (
    <div
      className={cls.report}
    >
      <div>
        <h2>{date}</h2>
        <h2>{personCount}</h2>
        <button onClick={() => setIsShow(!isShow)}>{isShow ? 'Закрыть' : 'Показать'}</button>
      </div>
      {
        isShow &&
      <div className={cls.ordersContainer}>
        {
          order.map(product => (
            <ProductCards
              key={product.key}
              product={product}
              isWorker={false}
            >
              <p>Выбранное кол-во: {product.count}</p>
            </ProductCards>
          ))
        }
      </div>
      }
    </div>
  )
}

export const WorkerReportsModal = ({
  setIsActive,
  worker,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [reports, setReports] = React.useState(null)


  React.useEffect(() => {
    const request = Admin.API.getReports(worker.key)
    setIsLoading(true)
    request
      .then(res => {
        const data = parseJSON(res.data)
        console.log(data)
        if (!data) return

        setReports(data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (!worker) return
  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div className={cls.container}>
        <WorkerHeader
          worker={worker}
        />
        <div className={cls.reportsContainer}>
          {
            isLoading ? <Loader /> :
              reports?.map(report => (
                <ReportsList
                  key={report.key}
                  report={report}
                />
              ))
          }
        </div>
      </div>
    </div>
  )
}
