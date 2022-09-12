import React from 'react'
import cls from './FavoritesPage.module.scss'
import { Main } from 'pages/Main'
import { swiperImageUrl } from 'pages/Main/api'
import { Tilt } from 'components/Tilt'
import { Loader } from 'components/Loader'
import { NoAccess } from 'components/NoAccess'


const EmptyFavorites = () => {
  return (
    <div className={cls.emptyFavorites}>
      <h2>Избранные на вашеи аккаунте пуст!</h2>
    </div>
  )
}

export const FavoritesPage = () => {
  const userId = localStorage.getItem('userId')

  const {
    favorites,
    isLoadingFavorites,
  } = Main.Hook.Movie.use()

  if (!userId) return <NoAccess />

  if (!favorites || isLoadingFavorites) return <Loader />

  if (!favorites.length) return <EmptyFavorites />


  return (
    <div className={cls.root}>
      {
        favorites.map(({ id, title, original_title, poster_path }) => (
          <Tilt key={id}>
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
