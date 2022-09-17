import React from 'react'
import cls from './MoviePage.module.scss'
import { Loader } from 'components/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { BiMovie, BiSkipPrevious } from 'react-icons/bi'
import { posterUrl, swiperImageUrl } from 'pages/Main/api'
import { Main } from 'pages/Main'
import { MoviesSlider } from 'pages/Main/components/MoviesSlider/MoviesSlider'
import { MovieTrailer } from 'pages/Main/components/MovieTrailer/MovieTrailer'
import Swal from 'sweetalert2'

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

const Actors = ({
  actors,
  vote_average,
}) => {
  if (!actors) return

  const fourActors = actors.filter((item, index) => index < 4)

  return (
    <div className={cls.fourActorsContianer}>
      <div className={cls.averageCard}>
        <div>
          <h3>{vote_average}</h3>
        </div>
      </div>
      {
        fourActors?.map(({ id, name, profile_path }) => (
          <div
            key={id}
            className={cls.card}
          >
            <div>
              <img
                src={`${swiperImageUrl}${profile_path}`}
                alt="#"
              />
            </div>
            <p>{name}</p>
          </div>
        ))
      }
    </div>
  )
}

export const MoviePage = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const { movieId } = useParams()

  const {
    actors,
    actions: {
      getActors,
    },
  } = Main.Hook.Actors.use()

  const {
    movie,
    recommendedMovies,
    similarMovies,
    favorites,
    isLoading,
    actions: {
      getMovie,
      getSimilar,
      getRecommend,
      addFavorite,
      removeFavorite,
    },
  } = Main.Hook.Movie.use()

  const [isMovieTrailerActive, setIsMovieTrailerActive] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)

  const goBack = () => navigate(-1)


  const handleFavorite = () => {
    if (!userId) {
      return Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Авторизуйтесь чтобы добавлять в избранные',
        timer: 1500,
      })
    }

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: isFavorite ? 'Успешно удалено!' : 'Добавлено в избранные',
      showConfirmButton: false,
      timer: 1500,
    })

    if (isFavorite) {
      setIsFavorite(false)
      return removeFavorite(userId, movieId)
    }

    addFavorite(userId, movieId, movie)
    setIsFavorite(true)
  }

  React.useEffect(() => {
    if (!movieId) return

    getActors(movieId)
  }, [movieId])


  React.useEffect(() => {
    getMovie(movieId)
    getSimilar(movieId)
    getRecommend(movieId)
  }, [movieId])

  React.useEffect(() => {
    const isFavoriteMovie = !!favorites?.find(({ id }) => id === Number(movieId))
    setIsFavorite(isFavoriteMovie)
  }, [movieId, favorites])

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
    vote_average,
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
          />
          <BiMovie
            onClick={() => navigate('/movies')}
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
              <Actors actors={actors} vote_average={vote_average} />
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
