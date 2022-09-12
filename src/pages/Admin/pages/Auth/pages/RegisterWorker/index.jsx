import React from 'react'
import cls from './RegisterWorker.module.scss'
import { Button } from 'components/UI/Button'
import { Input } from 'components/UI/Input'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import { Admin } from 'pages/Admin'

export const RegisterWorker = () => {
  const {
    image,
    actions: {
      imageReader,
    },
  } = Admin.Hook.FileReader.use()

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    imageReader(data.photoUrl[0])

    if (image) {
      const newData = {
        ...data,
        photoUrl: image,
      }
      console.log(newData)
    }
  }

  return (
    <div className={cls.root}>
      <img src={image && image} alt="" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>
        <Input
          label="Имя"
          placeholder="Введите имя"
          error={errors.firstName && errors.firstName.message}
          {...register('firstName', Forms.Options.SimpleField)}
        />
        <Input
          label="Фамилия"
          placeholder="Введите фамилию"
          error={errors.lastName && errors.lastName.message}
          {...register('lastName', Forms.Options.SimpleField)}
        />
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
        <Input
          type="phoneNumber"
          label="Номер телефона"
          placeholder="Введите номер"
          error={errors.phoneNumber && errors.phoneNumber.message}
          {...register('phoneNumber', Forms.Options.PhoneNumber)}
        />
        <Input
          type="file"
          label="Фотография"
          error={errors.photoUrl && errors.photoUrl.message}
          {...register('photoUrl', Forms.Options.SimpleField)}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
        >Зарегистрировать</Button>
      </form>
    </div>
  )
}
