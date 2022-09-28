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
        if (!data) return

        if (data.localId === admin?.localId) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Добро пожаловать!',
            timer: 1000,
          })
          sessionStorage.setItem('adminLocalId', data.localId)
          return setTimeout(() => navigate('/admin'), 1000)
        }

        const isWorker = workers?.find(({ localId }) => localId === data.localId)

        if (isWorker) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Приветсвую ${isWorker.firstName}!`,
            timer: 1000,
          })
          sessionStorage.setItem('workerId', data.localId)
          return setTimeout(navigate(`/admin/worker/${data.localId}/`), 1000)
        }

        return Swal.fire({
          icon: 'error',
          title: 'Ошибка!',
          text: 'Вы не являетесь частью админки',
          timer: 1000,
        })
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Ошибка!',
          timer: 1000,
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
