import React from 'react'
import cls from './RegisterWorker.module.scss'
import { Button, ButtonVariants } from 'components/UI/Button'
import { Input } from 'components/UI/Input'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import { Admin } from 'pages/Admin'
import { auth } from 'configs'
import Swal from 'sweetalert2'

export const RegisterWorker = () => {
  const {
    image,
    actions: {
      imageReader,
    },
  } = Admin.Hook.FileReader.use()

  const {
    isLoading,
    actions: {
      registerWorker,
      postWorker,
    },
  } = Admin.Hook.RegisterWorker.use()

  const {
    workers,
  } = Admin.Hook.Main.use()

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm()

  const onSubmit = (data) => {
    imageReader(data.photoUrl[0])

    if (image) {
      const newData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        photoUrl: image,
      }

      const registerBody = {
        email: data.email,
        password: data.password,
      }

      return registerWorker(registerBody)
        .then(res => {
          if (!res) return

          postWorker(res.localId, newData)
          reset({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            photoUrl: '',
          })
        })
        .catch((error) => {
          const errorMessage = error.response.data.error.message

          if (errorMessage === 'EMAIL_EXISTS') {
            const request = auth(registerBody, true)

            return request
              .then(res => {
                const localId = res.data.localId

                if (!localId) return
                const isWorker = workers?.find(({ key }) => key === localId)

                if (isWorker) {
                  return Swal.fire({
                    title: 'Этот работник уже нанят',
                    padding: '3em',
                    color: '#716add',
                    icon: 'error',
                    timer: 1000,
                  })
                }
                postWorker(localId, newData)
                reset({
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  phoneNumber: '',
                  photoUrl: '',
                })
              })
          }
          return Swal.fire({
            title: 'Error!',
            width: 600,
            padding: '3em',
            color: '#716add',
            icon: 'error',
            timer: 1000,
          })
        })
    }
    return
  }

  return (
    <div className={cls.root}>
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
          disabled={isLoading}
          variant={isLoading ? ButtonVariants.loading : ButtonVariants.blue}
        >Зарегистрировать</Button>
      </form>
    </div>
  )
}
