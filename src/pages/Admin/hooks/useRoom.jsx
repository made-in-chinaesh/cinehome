import React from 'react'
import { Admin } from '..'

const useRoom = () => {
  const [rooms, setRooms] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const getRooms = () => {
    const request = Admin.API.getRooms()

    setIsLoading(true)

    request
      .then(res => {
        const data = res.data.filter(item => item)
        setRooms(data)
      })
      .finally(() => setIsLoading(false))
  }

  const bookRoom = () => {

  }

  React.useEffect(() => {
    getRooms()
  }, [])

  return {
    rooms,
    isLoading,
  }
}

export const use = useRoom
