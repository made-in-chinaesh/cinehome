import React from 'react'
import { auth } from 'configs'
import { Admin } from '..'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const useSignIn = () => {
  const {
    workers,
    admin,
  } = Admin.Hook.Main.use()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = React.useState(false)

  const onAuth = (body) => {
    const request = auth(body, true)

    setIsLoading(true)
    request
      .then(res => {
        const data = res.data
        if (data.localId === admin.localId) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Добро пожаловать!',
            showConfirmButton: false,
            timer: 1500,
          })
          localStorage.setItem('admin', data.localId)
          return navigate('/admin')
        }

        const isWorker = workers.find(({ email }) => email === data.email)

        if (isWorker) {
          Swal.fire({
            icon: 'success',
            position: 'center',
            title: `Приветствую ${isWorker.firstName}`,
            showConfirmButton: false,
            timer: 1500,
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          })

          localStorage.setItem('workerId', isWorker.key)
          return setTimeout(() => {
            navigate(`/admin/worker/${isWorker.key}`)
          }, 1500)
        }

        Swal.fire({
          icon: 'error',
          title: 'Вы не являетесь частью админки!',
        })
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Ошибка!',
        })
      })
      .finally(() => setIsLoading(false))
  }

  return {
    isLoading,
    actions: {
      onAuth,
    },
  }
}

export const use = useSignIn
