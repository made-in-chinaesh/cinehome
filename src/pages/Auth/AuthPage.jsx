import React from 'react'
import cls from './AuthPage.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { Auth } from '.'
import { CurrentUser } from 'modules/user'

export const AuthPage = () => {
  const {
    actions: {
      get,
    },
  } = CurrentUser.use()

  const {
    actions: {
      onAuth,
    },
  } = Auth.Hook.Auth.use()


  return (
    <div className={cls.root}>
      <div>
        <h2>Welcome to home-cinema!</h2>
        <h3>Sign in to add favorites</h3>
        <FcGoogle onClick={onAuth}/>
      </div>
    </div>
  )
}
