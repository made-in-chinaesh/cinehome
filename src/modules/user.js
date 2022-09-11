import { baseRequest } from 'configs'
import React from 'react'

const getCurrentUser = (userId) => {
  return baseRequest.get(`/users/${userId}.json`)
}

const useUser = () => {
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
  }

  React.useEffect(() => {
    if (!userId) return

    get(userId)
  }, [])

  return {
    user,
    actions: {
      logout,
      get,
    },
  }
}

const use = useUser

export const CurrentUser = {
  use,
}

