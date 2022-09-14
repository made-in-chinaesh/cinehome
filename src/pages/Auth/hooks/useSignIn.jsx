import React from 'react'
import { auth } from 'configs'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const useSignIn = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = React.useState(false)

  const signIn = (body) => {
    const request = auth(body, true)

    setIsLoading(true)
    request
      .then(res => {
        const data = res.data

        if (!data) return

        localStorage.setItem('userId', data.localId)
        navigate('/')
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
      signIn,
    },
  }
}

export const use = useSignIn
