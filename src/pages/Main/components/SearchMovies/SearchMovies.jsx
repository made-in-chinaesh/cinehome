import React from 'react'
import cls from './SearchMovies.module.scss'
import { Main } from 'pages/Main'
import { swiperImageUrl } from 'pages/Main/api'

const SearchMoviesSkeleton = () => {
  const skeletonMovies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    skeletonMovies.map((item) => (
      <div
        key={item}
        className={cls.skeleton}
      >
        <div></div>
        <div></div>
      </div>
    ))
  )
}


export const SearchMovies = ({ isActive, setIsActive }) => {
  const {
    isLoading,
    movies,
    actions: {
      setSearchTerm,
      goToMoviePage,
      setIsLoading,
    },
  } = Main.Hook.SearchMovies.use()

  const closeSearch = () => setIsActive(false)

  const moviePage = (id) => {
    closeSearch()
    goToMoviePage(id)
  }

  const handleValue = (value) => {
    setIsLoading(true)
    setSearchTerm(value)
    if (!value.length) return setIsLoading(false)
  }

  if (!isActive) return


  return (
    <div className={cls.root}>
      <div className={cls.container}>
        <h2 onClick={closeSearch}>Search</h2>
        <input
          type="search"
          onChange={(e) => handleValue(e.target.value)}
        />
        <div className={cls.cardsContainer}>
          {
            isLoading ?
              <SearchMoviesSkeleton /> :
              movies?.map(({ id, title, original_title, poster_path }) => (
                <div
                  key={id}
                  onClick={() => moviePage(id)}
                  className={cls.card}
                >
                  <img
                    src={`${swiperImageUrl}${poster_path}`}
                    alt="#"
                  />
                  <p>{title ? title : original_title}</p>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
