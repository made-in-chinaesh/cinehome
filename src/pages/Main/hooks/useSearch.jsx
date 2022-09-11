import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Main } from '..'

const useSearchMovies = () => {
  const navigate = useNavigate()

  const [movies, setMovies] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const debouncedSearchTerm = Main.Hook.Debounce.use(searchTerm, 600)

  const goToMoviePage = (id) => navigate(`/movies/${id}`)

  React.useEffect(() => {
    if (!debouncedSearchTerm) return

    const request = Main.API.searchMovies(debouncedSearchTerm)

    request
      .then(res => {
        const data = res.data.results
        setMovies(data)
      })
      .catch(() => setMovies(null))
      .finally(() => setIsLoading(false))
  }, [debouncedSearchTerm])

  return {
    movies,
    isLoading,
    actions: {
      setSearchTerm,
      goToMoviePage,
      setIsLoading,
    },
  }
}

export const use = useSearchMovies
