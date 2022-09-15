import React from 'react'
import cls from './NoAccess.module.scss'
import { useNavigate } from 'react-router-dom'
import { RiLock2Fill } from 'react-icons/ri'

export const NoAccess = ({ isAdmin = false }) => {
  const navigate = useNavigate()

  const goToAuthPage = () => navigate(isAdmin ? '/admin/auth/signin' : '/auth/signin')

  return (
    <div className={cls.root}>
      <div>
        <RiLock2Fill />
        <h2>Вы не авторизованы!</h2>
        <button onClick={() => goToAuthPage()}>Авторизоваться</button>
      </div>
    </div>
  )
}
