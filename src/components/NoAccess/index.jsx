import React from 'react'
import cls from './NoAccess.module.scss'
import { useNavigate } from 'react-router-dom'
import { RiLock2Fill } from 'react-icons/ri'

export const NoAccess = () => {
  const navigate = useNavigate()

  return (
    <div className={cls.root}>
      <div>
        <RiLock2Fill />
        <h2>Вы не авторизованы!</h2>
        <button onClick={() => navigate('/auth')}>Авторизоваться</button>
      </div>
    </div>
  )
}
