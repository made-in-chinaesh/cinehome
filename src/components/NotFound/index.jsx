import React from 'react'
import cls from './NotFound.module.scss'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <div className={cls.root}>
      <div>
        <h1>404</h1>
        <h2>Not found page!</h2>
        <button onClick={() => goBack()}>Back</button>
      </div>
    </div>
  )
}
