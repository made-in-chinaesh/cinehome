import React from 'react'
import cls from './AllMoviesPage.module.scss'
import { Loader } from 'components/Loader'
import { Tilt } from 'components/Tilt'
import { Main } from 'pages/Main'
import { swiperImageUrl } from 'pages/Main/api'
import { useNavigate } from 'react-router-dom'

const MoviesCard = ({
  poster_path,
  title,
  original_title,
  id,
}) => {
  const navigate = useNavigate()

  const goToMoviePage = (id) => navigate(`/movies/${id}`)

  return (
    <Tilt>
      <div onClick={() => goToMoviePage(id)}>
        <img
          src={`${swiperImageUrl}${poster_path}`}
          alt="#"
        />
        <p>{title ? title : original_title}</p>
      </div>
    </Tilt>
  )
}

export const AllMoviesPage = () => {
  const {
    movies,
    isLoading,
    actions: {
      handleCategory,
      nextPage,
      prevPage,
    },
  } = Main.Hook.AllMovies.use()

  return (
    <div className={cls.root}>
      <div className={cls.header}>
        <h2>Фильмы</h2>
        <select onChange={e => handleCategory(e.target.value)}>
          <option value="week">В тренде</option>
          <option value="popular">Популярные</option>
          <option value="top_rated">Топ</option>
        </select>
      </div>
      <div className={cls.main}>
        {
          isLoading || !movies ?
            <Loader /> :
            movies.map(({ id, title, original_title, poster_path }) => (
              <MoviesCard
                key={id}
                title={title}
                original_title={original_title}
                poster_path={poster_path}
                id={id}
              />
            ))
        }
      </div>
      <div className={cls.footer}>
        <button onClick={() => prevPage()}>Prev</button>
        <button onClick={() => nextPage()}>Next</button>
      </div>
    </div>
  )
}
