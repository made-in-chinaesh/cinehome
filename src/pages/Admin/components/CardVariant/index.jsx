import React from 'react'
import cls from './index.module.scss'

const CardVariant = ({ product, increment, decrement }) => {
  const { key, title, count, price, totalPrice } = product
  return (
    <div className={cls.root}>
      <div className={cls.cardHeader}>
        <img src={productImage} alt="image of product" />
      </div>
      <div className={cls.cardBody}>
        <span>{title}</span>
        <div className={cls.counterContainer}>
          <span>{price}</span>
          <div className={cls.buttonContainer}>
            <button onClick={decrement(key)}>-</button>
            <span>{count}</span>
            <button onClick={increment(key)}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardVariant
