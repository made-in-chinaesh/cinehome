import React from 'react'
import { auth } from 'configs'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const useSignUp = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = React.useState(false)

  const signUp = (body) => {
    const request = auth(body, false)

    setIsLoading(true)
    request
      .then(res => {
        const data = res.data

        if (!data) return

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Успешная регистрация!',
          showConfirmButton: false,
          timer: 1500,
        })
        setTimeout(() => {
          navigate('/auth/signin')
        }, 1500)
      })
      .catch(err => {
        const errorMessage = err.response.data.error.message

        Swal.fire({
          position: 'top',
          icon: 'error',
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .finally(() => setIsLoading(false))
  }

  return {
    isLoading,
    actions: {
      signUp,
    },
  }
}

export const use = useSignUp
