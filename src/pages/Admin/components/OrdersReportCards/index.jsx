import React from 'react'
import cls from './OrdersReportCards.module.scss'

export const OrdersReportCardsSkeleton = () => {
  const ordersReportArr = [1, 2, 3, 4, 5, 6, 7, 8]

  return ordersReportArr.map(item => (
    <div
      key={item}
      className={cls.ordersReportCardsSkeleton}
    />
  ))
}

export const OrdersReportCards = ({
  productImg,
  title,
  count,
}) => {
  return (
    <div className={cls.root}>
      <img src={productImg} alt="#" />
      <h2>{title}</h2>
      <p>Кол-во: {count}</p>
    </div>
  )
}
