import React from 'react'
import { Main } from '..'

const useAllMovies = () => {
  const [movies, setMovies] = React.useState(null)
  const [page, setPage] = React.useState(1)
  const [category, setCategory] = React.useState('week')

  const [isLoading, setIsLoading] = React.useState(false)

  const handleCategory = (value) => setCategory(value)

  const nextPage = () => setPage(prev => prev + 1)

  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const getCategoryMovies = (category, page) => {
    const request = Main.API.getCategoryMovies(category, page)

    setIsLoading(true)
    request
      .then(res => {
        const data = res.data.results

        setMovies(data)
      })
      .finally(() => setIsLoading(false))
  }

  React.useEffect(() => {
    getCategoryMovies(category, page)
  }, [category, page])

  return {
    movies,
    isLoading,
    actions: {
      handleCategory,
      nextPage,
      prevPage,
    },
  }
}

export const use = useAllMovies
