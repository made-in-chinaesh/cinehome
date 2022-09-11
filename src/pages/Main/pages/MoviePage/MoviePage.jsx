import React from 'react'
import cls from './MoviePage.module.scss'
import { Loader } from 'components/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { BiSkipPrevious } from 'react-icons/bi'
import { posterUrl } from 'pages/Main/api'
import { Main } from 'pages/Main'
import { MoviesSlider } from 'pages/Main/components/MoviesSlider/MoviesSlider'
import { Actors } from 'pages/Main/components/Actors/Actors'
import { MovieTrailer } from 'pages/Main/components/MovieTrailer/MovieTrailer'

const MovieInfoBar = ({
  title,
  original_title,
  runtime,
  release_date,
  genres,
  className,
}) => {
  return (
    <div className={className}>
      <h1>{title ? title : original_title}</h1>
      <h2>Фильм длиться {runtime}мин</h2>
      <h3>Дата выхода: {release_date}</h3>
      <div
        className={cls.genres}
        style={{
          gridTemplateColumns: `repeat(${genres.length}, 1fr)`,
        }}
      >
        {
          genres.map(({ id, name }) => (
            <h4
              key={id}
              className="p-2 border-[#fff] text-center rounded-3xl border transition-[300ms] hover:bg-white hover:text-black"
            >
              {name}
            </h4>
          ))
        }
      </div>
    </div>
  )
}

export const MoviePage = () => {
  const {
    favorites,
    actions: {
      addFavorite,
      removeFavorite,
    },
  } = Main.Hook.Movie.use()

  const userId = localStorage.getItem('userId')
  const { movieId } = useParams()
  const navigate = useNavigate()

  const [isMovieTrailerActive, setIsMovieTrailerActive] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)
  const goBack = () => navigate(-1)

  const {
    movie,
    recommendedMovies,
    similarMovies,
    isLoading,
    actions: {
      getMovie,
      getSimilar,
      getRecommend,
    },
  } = Main.Hook.Movie.use()

  const handleFavorite = () => {
    if (!userId) return alert('авторизуйтесь')

    if (isFavorite) {
      setIsFavorite(false)
      return removeFavorite(userId, movieId)
    }

    addFavorite(userId, movieId, movie)
    setIsFavorite(true)
  }

  React.useEffect(() => {
    getMovie(movieId)
    getSimilar(movieId)
    getRecommend(movieId)
  }, [movieId])


  React.useEffect(() => {
    document.title = `${movie?.title} (${movie?.release_date})`
  }, [movie?.id])


  React.useEffect(() => {
    const isFavoriteMovie = !!favorites?.find(({ id }) => id === Number(movieId))
    console.log(isFavoriteMovie)
    setIsFavorite(isFavoriteMovie)
  }, [movieId])


  if (!movie || isLoading) return <Loader />

  const {
    backdrop_path,
    poster_path,
    title,
    original_title,
    overview,
    genres,
    runtime,
    release_date,
    trailer_key,
  } = movie

  return (
    <>
      <div
        style={{
          background: `url(${posterUrl}${backdrop_path}) center / cover fixed`,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
        className={cls.root}
      >

        <div
          style={{
            background: 'linear-gradient(0deg,#060606,rgba(0,0,0,.842) 35%,rgba(83,100,141,0)) fixed',
          }}
          className={cls.backShadow}
        ></div>

        <div className={cls.previous}>
          <BiSkipPrevious
            onClick={goBack}
            className="w-[50px] h-[50px] text-white cursor-pointer"
          />
        </div>
        <div className={cls.container}>
          <div className={cls.movieInfo}>
            <div className={cls.image}>
              <MovieInfoBar
                title={title}
                original_title={original_title}
                runtime={runtime}
                release_date={release_date}
                genres={genres}
                className={cls.movieInfoBar}
              />
              <img
                src={`${posterUrl}${poster_path}`}
                alt="#"
              />
            </div>
            <div className={cls.info}>
              <MovieInfoBar
                title={title}
                original_title={original_title}
                runtime={runtime}
                release_date={release_date}
                genres={genres}
                className={cls.movieInfoBarHidden}
              />
              <Actors movieId={movieId} isFourActors={true} />
              <p>{overview}</p>
              <div className={cls.buttonsContainer}>
                <button onClick={() => handleFavorite()}>{isFavorite ? '-' : '+'}</button>
                <button onClick={() => setIsMovieTrailerActive(true)}>Трейлер</button>
              </div>
            </div>
          </div>
          <MoviesSlider
            movies={recommendedMovies}
            children="Рекомендации для фильма"
          />
          {/* <Actors movieId={movieId} /> */}
          <MoviesSlider
            movies={similarMovies}
            children="Похожие фильмы"
          />
        </div>
      </div>
      <MovieTrailer trailer_key={trailer_key} isActive={isMovieTrailerActive} setIsActive={setIsMovieTrailerActive} />
    </>
  )
}
