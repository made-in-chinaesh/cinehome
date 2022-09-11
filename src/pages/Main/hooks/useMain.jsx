import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Main } from '..'

const useMain = () => {
  const navigate = useNavigate()

  const [popularMovies, setPopularMovies] = React.useState(null)
  const [topRatedMovies, setTopRatedMovies] = React.useState(null)
  const [isLoadingPopularMovies, setIsLoadingPopularMovies] = React.useState(false)
  const [isLoadingTopRatedMovies, setIsLoadingTopRatedMovies] = React.useState(false)

  const goToMovieInfo = (id) => navigate(`/movies/${id}`)

  const getPopularMovies = () => {
    const request = Main.API.getPopularMovies()

    setIsLoadingPopularMovies(true)

    request
      .then(res => {
        const data = res.data.results
        setPopularMovies(data)
      })
      .finally(() => setIsLoadingPopularMovies(false))
  }

  const getTopRatedMovies = () => {
    const request = Main.API.getTopRatedMovies()

    setIsLoadingTopRatedMovies(true)

    request
      .then(res => {
        const data = res.data.results
        setTopRatedMovies(data)
      })
      .finally(() => setIsLoadingTopRatedMovies(false))
  }

  React.useEffect(() => {
    getPopularMovies()
    getTopRatedMovies()
  }, [])

  return {
    popularMovies,
    topRatedMovies,
    isLoadingPopularMovies,
    isLoadingTopRatedMovies,
    actions: {
      goToMovieInfo,
    },
  }
}

export const use = useMain
