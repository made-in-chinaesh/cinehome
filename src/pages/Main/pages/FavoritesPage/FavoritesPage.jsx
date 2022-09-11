import React from 'react'
import cls from './FavoritesPage.module.scss'
import { Main } from 'pages/Main'
import { swiperImageUrl } from 'pages/Main/api'
import { Tilt } from 'components/Tilt'
import { Loader } from 'components/Loader'

export const FavoritesPage = () => {
  const {
    favorites,
    isLoadingFavorites,
  } = Main.Hook.Movie.use()

  if (!favorites || isLoadingFavorites) return <Loader />

  const options = {
    scale: 1.05,
    speed: 300,
    max: 30,
  }

  return (
    <div className={cls.root}>
      {
        favorites.map(({ id, title, original_title, poster_path }) => (
          <Tilt key={id} options={options}>
            <div className={cls.card}>
              <img src={`${swiperImageUrl}${poster_path}`} alt="#" />
              <p>{title ? title : original_title}</p>
            </div>
          </Tilt>
        ))
      }
    </div>
  )
}
