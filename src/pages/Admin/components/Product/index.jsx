import React from 'react'
import CounterButton from '../../adminUI/CounterButton'
import cls from './Product.module.scss'

export const Product = ({
  id,
  count,
  title,
  price,
  totalPrice,
  increment,
  decrement,
}) => {
  return (
    <div className={cls.root}>
      <h2>{title}</h2>

      <div>
        <span>{price} сом</span>
      </div>

      <div>

        <CounterButton onClick={e => decrement(e, id)} children={'-'}/>


        <h2>{count}</h2>

        <CounterButton onClick={e => increment(e, id)} children={'+'}/>


      </div>

      <div><span>{totalPrice} сом</span></div>

    </div>
  )
}
