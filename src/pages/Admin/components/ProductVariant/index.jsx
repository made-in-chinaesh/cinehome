import React from 'react'
import cls from './ProductVariant.module.scss'
import CounterButton from '../CounterButton'

export const ProductVariant = ({
  id,
  count,
  title,
  price,
  totalPrice,
  productImg,
  increment,
  decrement,
}) => {
  return (
    <div className={cls.root}>
      <div className={cls.imgContainer}>
        <img src={productImg} alt="#" />
      </div>
      <div className={cls.cardBody}>
        <span>{title}</span>
        <span>{price} сом</span>

        <div>
          <CounterButton onClick={e => decrement(e, id)} children={'-'}/>
          <h6>{count}</h6>
          <CounterButton onClick={e => increment(e, id)} children={'+'}/>
        </div>
      </div>
    </div>
  )
}
