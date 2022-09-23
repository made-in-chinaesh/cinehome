import React from 'react'
import cls from './index.module.scss'
import { VscChromeClose } from 'react-icons/vsc'
import { Admin } from 'pages/Admin'
import { Loader } from 'components/Loader'
import { parseJSON } from 'helpers'
import { ProductCards } from '../ProductCards'
import AdminBtn from 'pages/Admin/adminUI/AdminBtn'
import { CheckBox } from 'pages/Admin/adminUI/CheckBox'
import Swal from 'sweetalert2'

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
  checkReport,
  worker,
  getReports,
  deleteReport,
}) => {
  if (!report) return

  const {
    date,
    personCount,
    order,
    isChecked,
    key,
  } = report

  const [isShow, setIsShow] = React.useState(false)

  const onDelete = () => {
    Swal.fire({
      title: 'Вы действительно хотите удалить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Отменить',
      confirmButtonText: 'Удалить',
    }).then((result) => {
      if (result.isConfirmed) deleteReport(worker, key, getReports)
    })
  }


  return (
    <div
      style={isChecked ? { backgroundColor: 'rgba(0, 128, 0, 0.81)' } : null}
      className={cls.report}
    >
      <div className={cls.reportBlock}>
        <CheckBox isChecked={isChecked} onClick={() => checkReport(worker, key, getReports)}/>
        <h2>{date}</h2>
        <h2>количество посетителей: {personCount}</h2>
        <div className={cls.btnContainer}>
          <AdminBtn onClick={onDelete} isDelete={true}>Удалить</AdminBtn>
          <AdminBtn onClick={() => setIsShow(!isShow)}>{isShow ? 'Закрыть' : 'Показать'}</AdminBtn>
        </div>
      </div>
      {
        isShow &&
      <div className={cls.ordersContainer}>
        {
          order.map(product => {
            if (product.count > 0) {
              return (
                <ProductCards
                  key={product.key}
                  product={product}
                  isWorker={false}
                >
                  <p>Выбранное кол-во: {product.count}</p>
                </ProductCards>)
            }
            return
          })
        }
      </div>
      }
    </div>
  )
}

export const WorkerReportsModal = ({
  setIsActive,
  worker,
  checkReport,
  deleteReport,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [reports, setReports] = React.useState(null)

  const getReports = (worker) => {
    const request = Admin.API.getReports(worker.key)
    setIsLoading(true)
    request
      .then(res => {
        const data = parseJSON(res.data)
        if (!data) return
        const filteredData = data.filter(item => !item.isChecked)
        if (!filteredData) return

        setReports(filteredData)
      })
      .finally(() => setIsLoading(false))
  }


  React.useEffect(() => {
    getReports(worker)
  }, [])


  if (!worker) return
  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div className={cls.container}>
        <WorkerHeader
          worker={worker}
        />
        {
          isLoading ? <Loader isFullPage={true}/> :
            <div className={cls.reportsContainer}>
              {
                !reports?.length ? <div className={cls.emptyText}><h1>Список данного работника пуст!</h1></div> :
                  reports?.map(report => (
                    <ReportsList
                      worker={worker}
                      key={report.key}
                      report={report}
                      checkReport={checkReport}
                      getReports={getReports}
                      deleteReport={deleteReport}
                    />
                  ))
              }
              {

              }
            </div>
        }

      </div>
    </div>
  )
}
