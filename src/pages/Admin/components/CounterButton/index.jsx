import React from 'react'
import cls from './CounterButton.module.scss'

const CounterButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={cls.root}>{children}</button>
  )
}

export default CounterButton
