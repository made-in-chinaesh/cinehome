import React from 'react'
import cls from './OrdersReportPage.module.scss'
import { OrdersReportCards, OrdersReportCardsSkeleton } from 'pages/Admin/components/OrdersReportCards'
import { useNavigate, useParams } from 'react-router-dom'
import { parseJSON } from 'helpers'

const OrdersReportSkeleton = () => {
  return (
    <div className={cls.ordersReportSkeleton}>
      <div></div>
      <div>
        <OrdersReportCardsSkeleton />
      </div>
    </div>
  )
}

export const OrdersReportPage = ({
  worker,
  deleteOrder,
  workerId,
  getWorker,
}) => {
  const { id } = useParams()

  if (!worker) return <OrdersReportSkeleton />

  const orders = parseJSON(worker.reports).find(({ key }) => key === id).orders

  const onDeleteOrder = (workerId, id) => {
    getWorker()
    deleteOrder(workerId, id)
  }

  if (!orders || !orders.length) {
    return (
      <div>
        <h2>Vash spisok pust</h2>
      </div>
    )
  }

  return (
    <div className={cls.root}>
      <h1>Заказ {id}</h1>
      <div className={cls.orders}>
        {
          orders.map(({ productImg, count, title, key }) => (
            <OrdersReportCards
              key={key}
              title={title}
              count={count}
              productImg={productImg}
            />
          ))
        }
        <button onClick={() => onDeleteOrder(workerId, id)}>Удалить</button>
      </div>
    </div>
  )
}

