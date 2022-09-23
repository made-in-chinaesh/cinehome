import React from 'react'
import cls from './OrdersReportPage.module.scss'
import { OrdersReportCards, OrdersReportCardsSkeleton } from 'pages/Admin/components/OrdersReportCards'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

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
  deleteOrder,
  workerId,
  reports,
}) => {
  const { id } = useParams()

  const onDelete = (workerId, id) => {
    Swal.fire({
      title: 'Вы действительно хотите удалить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Отменить',
      confirmButtonText: 'Удалить',
    }).then((result) => {
      if (result.isConfirmed) deleteOrder(workerId, id)
    })
  }

  const newReports = reports?.find(item => item.key === id)
  return (
    <div className={cls.root}>
      <h1>Заказ</h1>
      <div className={cls.orders}>
        {

          newReports ? newReports.order.map(({ productImg, count, title, key, totalPrice, price }) => {
            if (count > 0) {
              return <OrdersReportCards
                key={key}
                price={price}
                totalPrice={totalPrice}
                title={title}
                count={count}
                productImg={productImg}
              />
            }
            return
          }) : <OrdersReportSkeleton />
        }
        <h2 className={cls.totalCheck}>Общая сумма закупок: {newReports?.check && newReports?.check}</h2>
      </div>
      <div className={cls.btnContainer}>
        <button onClick={() => onDelete(workerId, id)}>Удалить</button>
      </div>
    </div>
  )
}

