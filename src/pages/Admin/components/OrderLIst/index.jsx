import React from 'react'
import cls from './OrderList.module.scss'

export const OrderList = ({ orderList }) => {
  console.log(orderList)


  const totalCheck = orderList?.orders?.reduce((prev, current) => {
    return prev + current.totalPrice
  }, 0)
  return (
    <div className={cls.root}>
      <div className={cls.listHeader}>
        <div>Название</div>
        <div>Цена</div>
        <div>Количество</div>
        <div>Итого</div>
      </div>
      <div className={cls.listBody}>
        {
          orderList?.orders?.map(({ key, title, count, price, totalPrice }) => (
            <div className={cls.singleProduct} key={key}>
              <div>{title}</div>
              <div>{price} сом</div>
              <div>{count} шт</div>
              <div>{totalPrice} сом</div>
            </div>
          ))
        }
        <div className={cls.visitorsContainer}>
          <div>Количество посетителей</div>
          <div>Стоимость входа</div>
        </div>
        <div className={cls.singleProduct}>
          <div>{orderList?.clientCount}</div>
          <div>{orderList?.entryPrice}</div>
        </div>

      </div>
      <div className={cls.listFooter}>
        <h3>итого: {totalCheck}</h3>
      </div>
    </div>
  )
}
