import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Auth } from '..'
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from 'modules/user'

const useAuth = () => {
  const {
    actions: {
      get,
    },
  } = CurrentUser.use()

  const navigate = useNavigate()

  const goToMainPage = () => navigate('/')

  const handleAuth = () => {
    const auth = getAuth()

    const provider = new GoogleAuthProvider()

    return signInWithPopup(auth, provider)
  }

  const postUser = (userId, body) => Auth.API.postUser(userId, body)


  const onAuth = () => {
    const request = handleAuth()

    request
      .then(res => {
        const tokenResponse = res._tokenResponse
        const isNewUser = tokenResponse.isNewUser
        const userId = tokenResponse.localId

        const registerBody = {
          userId: tokenResponse.localId,
          firstName: tokenResponse.firstName,
          lastName: tokenResponse.lastName,
          email: tokenResponse.email,
          photoUrl: tokenResponse.photoUrl,
        }

        localStorage.setItem('userId', userId)
        if (isNewUser) {
          return postUser(userId, registerBody)
            .then(() => {
              get(userId)
            })
            .then(() => goToMainPage())
        }
        goToMainPage()
      })
  }

  return {
    actions: {
      onAuth,
    },
  }
}

export const use = useAuth
