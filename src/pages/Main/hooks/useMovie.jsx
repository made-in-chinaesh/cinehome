import React from 'react'
import { parseJSON } from 'helpers'
import { Main } from '..'

const useMovie = () => {
  const userId = localStorage.getItem('userId')

  const [movie, setMovie] = React.useState(null)
  const [similarMovies, setSimilarMovies] = React.useState(null)
  const [recommendedMovies, setRecommendedMovies] = React.useState(null)
  const [favorites, setFavorites] = React.useState(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingFavorites, setIsLoadingFavorites] = React.useState(false)

  const movieTrailer = (id) => {
    const request = Main.API.getMovieTrailer(id)

    return request
      .then(res => {
        const data = res.data.results

        if (!data.length) return 'rzcFsykYPgA'

        return data[0].key
      })
  }

  const getMovie = (id) => {
    const request = Main.API.getMovie(id)

    setIsLoading(true)
    request
      .then(res => {
        const data = res.data

        return data
      })
      .then(res => {
        movieTrailer(id)
          .then(trailer => {
            setMovie({
              ...res,
              trailer_key: trailer,
            })
          })
      })
      .finally(() => setIsLoading(false))
  }

  const getSimilar = (id) => {
    const request = Main.API.getSimilarMovies(id)

    request
      .then(res => {
        const data = res.data.results
        setSimilarMovies(data)
      })
  }

  const getRecommend = (id) => {
    const request = Main.API.getRecommendationsMovies(id)

    request
      .then(res => {
        const data = res.data.results
        setRecommendedMovies(data)
      })
  }

  const addFavorite = (userId, id, body) => Main.API.addFavorite(userId, id, body)

  const removeFavorite = (userId, id) => Main.API.removeFavorite(userId, id)

  const getFavorites = (userId) => {
    const request = Main.API.getFavorites(userId)

    setIsLoadingFavorites(true)
    request
      .then(res => {
        const data = parseJSON(res.data)

        if (!data || !data.length) return

        setFavorites(data)
      })
      .finally(() => setIsLoadingFavorites(false))
  }

  React.useEffect(() => {
    if (!userId) return

    getFavorites(userId)
  }, [])

  return {
    movie,
    similarMovies,
    recommendedMovies,
    isLoading,
    favorites,
    isLoadingFavorites,
    actions: {
      getMovie,
      getSimilar,
      getRecommend,
      addFavorite,
      removeFavorite,
    },
  }
}

export const use = useMovie
