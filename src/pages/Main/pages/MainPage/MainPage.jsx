import React from 'react'
import cls from './MainPage.module.scss'
import { Main } from '../..'
import { MoviesSlider } from '../../components/MoviesSlider/MoviesSlider'

export const MainPage = () => {
  const {
    popularMovies,
    topRatedMovies,
    isLoadingPopularMovies,
    isLoadingTopRatedMovies,
  } = Main.Hook.Main.use()

  return (
    <div className={cls.root}>
      <img
        src="https://thumbs.dfs.ivi.ru/storage37/contents/e/2/4bd9a6b747269e2c428823a4e1129f.jpg"
        alt="poster"
      />
      <h2>Фильмы смотреть</h2>
      <p>Выбирайте фильм и смотрите с удовольствием!</p>
      <MoviesSlider
        movies={popularMovies}
        children="Популярные фильмы"
        isLoading={isLoadingPopularMovies}
      />
      <MoviesSlider
        movies={topRatedMovies}
        children="Топ рейтинга"
        isLoading={isLoadingTopRatedMovies}
      />
    </div>
  )
}
