import React from 'react'
import cls from './Loader.module.scss'

export const Loader = ({ isFullPage = false }) => {
  const style = isFullPage ? { height: '80vh' } : { height: 150 }

  return (
    <div
      className={cls.root}
      style={style}
    >
      <span></span>
    </div>
  )
}
