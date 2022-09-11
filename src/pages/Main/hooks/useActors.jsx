import React from 'react'
import { Main } from '..'

const useActors = () => {
  const [actors, setActors] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const getActors = (id) => {
    const request = Main.API.getMovieActors(id)

    setIsLoading(true)
    request
      .then(res => {
        const data = res.data.cast.filter((item, index) => index < 20)
        setActors(data)
      })
  }

  return {
    actors,
    isLoading,
    actions: {
      getActors,
    },
  }
}

export const use = useActors
