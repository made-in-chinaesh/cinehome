import React from 'react'
import cls from './Loader.module.scss'

export const Loader = ({
  isFullPage = false,
  isWhite = true,
}) => {
  const heightStyle = isFullPage ? { height: '80vh' } : { height: 150 }

  return (
    <div
      className={cls.root}
      style={heightStyle}
    >
      <span className={isWhite ? cls.isWhite : cls.isBlack}></span>
    </div>
  )
}
