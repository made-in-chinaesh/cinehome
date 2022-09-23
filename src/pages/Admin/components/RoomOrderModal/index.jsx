import React from 'react'
import cls from './index.module.scss'
import { VscChromeClose } from 'react-icons/vsc'
import { ProductCards } from '../ProductCards'

export const RoomOrderModal = ({
  setIsActive,
  order,
  roomId,
  completeRoomOrder,
  personCount,
  check,
}) => {
  const onSubmit = (roomId) => {
    completeRoomOrder(roomId)
    setTimeout(() => {
      setIsActive(false)
    }, 1000)
  }

  const newOrder = order?.filter(item => item.count > 0)

  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div className={cls.container}>
        <h1>Заказ комнаты</h1>
        <h2>Количество персон: {personCount}</h2>
        <div className={cls.orderContainer}>
          {
            !newOrder.length ?
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
              }}>
                <h2>Не было выбора продуктов</h2>
              </div> :
              newOrder?.map(product => (
                <ProductCards
                  key={product.key}
                  product={product}
                  isWorker={false}
                >
                  <p style={{
                    marginLeft: 20,
                  }}>Выбрано: {product.count}шт</p>
                </ProductCards>
              ))
          }
        </div>
        <div className={cls.checkContainer}>
          <h2>Общая сумма закупки: {check}</h2>
        </div>
        <div className={cls.finishBtnContainer}>
          <button onClick={() => onSubmit(roomId)}>Завершить активность</button>
        </div>
      </div>
    </div>
  )
}
