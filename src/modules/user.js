import { baseRequest } from 'configs'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const getCurrentUser = (userId) => {
  return baseRequest.get(`/users/${userId}.json`)
}

const useUser = () => {
  const navigate = useNavigate()

  const userId = localStorage.getItem('userId')

  const [user, setUser] = React.useState(null)

  const get = (userId) => {
    const request = getCurrentUser(userId)

    request
      .then(res => {
        const currentUser = res.data

        if (!currentUser) return

        setUser(currentUser)
      })
  }

  const logout = () => {
    localStorage.removeItem('userId')
    navigate('/auth/signin')
  }

  React.useEffect(() => {
    if (!userId) return

    get(userId)
  }, [])

  return {
    user,
    actions: {
      logout,
    },
  }
}

const use = useUser

export const CurrentUser = {
  use,
}

