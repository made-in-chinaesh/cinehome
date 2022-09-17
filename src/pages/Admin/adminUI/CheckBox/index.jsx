import React from 'react'
import cls from './CheckBox.module.scss'

export const CheckBox = ({ isChecked, onClick }) => {
  return (
    <label className={cls.container}>
      <input type="checkbox" checked={isChecked} onClick={onClick} />
      <div className={cls.checkmark}></div>
    </label>
  )
}
