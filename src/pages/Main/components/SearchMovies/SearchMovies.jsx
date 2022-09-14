import React from 'react'
import cls from './SearchMovies.module.scss'
import { Main } from 'pages/Main'
import { swiperImageUrl } from 'pages/Main/api'
import { VscChromeClose } from 'react-icons/vsc'
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
  const body = document.querySelector('body')

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
    body.style.overflow = 'auto'
    goToMoviePage(id)
  }

  const handleValue = (value) => {
    setIsLoading(true)
    setSearchTerm(value)
    if (!value.length) return setIsLoading(false)
  }

  React.useEffect(() => {
    if (isActive) body.style.overflow = 'hidden'
  }, [body])

  if (!isActive) return


  return (
    <div className={cls.root}>
      <VscChromeClose onClick={closeSearch} />
      <div className={cls.container}>
        <h2>Search</h2>
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
