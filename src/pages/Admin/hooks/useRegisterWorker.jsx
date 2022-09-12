import { auth } from 'configs'
import React from 'react'
import Swal from 'sweetalert2'
import { Admin } from '..'

const useRegisterWorker = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const registerWorker = (body) => {
    const request = auth(body, false)

    setIsLoading(true)
    return request
      .then(res => {
        const data = res.data

        return data
      })
      .catch(() => {
        Swal.fire({
          title: 'Custom width, padding, color, background.',
          width: 600,
          padding: '3em',
          color: '#716add',
        })
      })
      .finally(() => setIsLoading(false))
  }

  const postWorker = (id, body) => {
    const request = Admin.API.postWorker(id, body)

    request
      .then(() => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Регистрация прошла успешно!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .catch(() => {
        Swal.fire({
          position: 'top',
          icon: 'errro',
          title: 'Ошибка!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  return {
    isLoading,
    actions: {
      registerWorker,
      postWorker,
    },
  }
}

export const use = useRegisterWorker
