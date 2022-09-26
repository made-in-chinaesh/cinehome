import { auth } from 'configs'
import React from 'react'
import Swal from 'sweetalert2'
import { Admin } from '..'

const useRegisterWorker = () => {
  const [isLoading, setIsLoading] = React.useState(false)

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

  const registerWorker = (body, registerBody) => {
    const request = auth(body, false)

    setIsLoading(true)
    return request
      .then(res => {
        const data = res.data

        if (!data) return

        const newRegisterBody = {
          ...registerBody,
          localId: data.localId,
        }
        postWorker(data.localId, newRegisterBody)
      })
      .catch(error => {
        console.log(error)
        const errorMessage = error.response.data.error.message

        if (errorMessage === 'EMAIL_EXISTS') {
          return Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Эта почта уже зарегистрирована',
            timer: 1000,
          })
        }
        return Swal.fire({
          position: 'center',
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
      registerWorker,
      postWorker,
    },
  }
}

export const use = useRegisterWorker
