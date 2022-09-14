import React from 'react'
import cls from './SignIn.module.scss'
import { Button, ButtonVariants } from 'components/UI/Button'
import { Input } from 'components/UI/Input'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import { Auth } from 'pages/Auth'
import { Link } from 'react-router-dom'

export const SignIn = () => {
  const {
    isLoading,
    actions: {
      signIn,
    },
  } = Auth.Hook.SignIn.use()

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => signIn(data)

  return (
    <div className={cls.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Авторизация</h2>
        <Input
          type="email"
          label="Email"
          placeholder="Введите почту"
          error={errors.email && errors.email.message}
          {...register('email', Forms.Options.Email)}
        />
        <Input
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          error={errors.password && errors.password.message}
          {...register('password', Forms.Options.Password)}
        />
        <p>Нет аккаунта <Link to="/auth/signup">регистрироваться</Link></p>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          variant={isLoading ? ButtonVariants.loading : ButtonVariants.blue}
        >Войти</Button>
      </form>
    </div>
  )
}
