import React from 'react'
import cls from './SignIn.module.scss'
import { Input } from 'components/UI/Input'
import { Button, ButtonVariants } from 'components/UI/Button'
import { useForm } from 'react-hook-form'
import { Admin } from 'pages/Admin'
import { Forms } from 'helpers/Forms'

export const SignIn = () => {
  const {
    isLoading,
    actions: {
      onAuth,
    },
  } = Admin.Hook.SignIn.use()

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    onAuth(data)
  }

  return (
    <div className={cls.root}>
      <div className={cls.container}>
        <h2>Авторизация</h2>
        <Input
          type="email"
          label="Email"
          placeholder="Введите email"
          error={errors.email && errors.email.message}
          {...register('email', Forms.Options.Email)}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Введите пароль"
          error={errors.password && errors.password.message}
          {...register('password', Forms.Options.Password)}
        />
        <Button
          variant={isLoading ? ButtonVariants.loading : ButtonVariants.green}
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >Войти</Button>
      </div>
    </div>
  )
}
