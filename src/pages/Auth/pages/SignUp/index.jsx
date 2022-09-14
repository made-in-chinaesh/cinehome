import React from 'react'
import cls from '../SignIn./SignIn.module.scss'
import { Input } from 'components/UI/Input'
import { Button, ButtonVariants } from 'components/UI/Button'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import { Auth } from 'pages/Auth'
import { Link } from 'react-router-dom'

export const SignUp = () => {
  const {
    isLoading,
    actions: {
      signUp,
    },
  } = Auth.Hook.SignUp.use()

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => signUp(data)

  return (
    <div className={cls.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>
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
        <p>Есть аккаунт <Link to="/auth/signin">войти</Link></p>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          variant={isLoading ? ButtonVariants.loading : ButtonVariants.blue}
        >Зарегистрироваться</Button>
      </form>
    </div>
  )
}
