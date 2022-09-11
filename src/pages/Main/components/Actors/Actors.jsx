import React from 'react'
import cls from './Actors.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/scrollbar'
import { Main } from 'pages/Main'
import { swiperImageUrl } from 'pages/Main/api'

const breakpoints = {
  1300: {
    slidesPerView: 10,
    slidesPerGroup: 10,
  },
  1200: {
    slidesPerView: 9,
    slidesPerGroup: 9,
  },
  1100: {
    slidesPerView: 8,
    slidesPerGroup: 8,
  },
  900: {
    slidesPerView: 7,
    slidesPerGroup: 7,
  },
  800: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
  660: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  450: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  100: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
}

const FourActors = ({ vote_average, actors }) => {
  const fourActors = actors?.filter((item, index) => index < 4)

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

export const Actors = ({
  isFourActors = false,
  vote_average = 0,
  movieId,
}) => {
  const {
    actors,
    actions: {
      getActors,
    },
  } = Main.Hook.Actors.use()

  React.useEffect(() => {
    if (!movieId) return

    getActors(movieId)
  }, [])

  if (isFourActors) return <FourActors vote_average={vote_average} actors={actors} />

  return (
    <div>
      <h2>Актеры</h2>
      <Swiper
        spaceBetween={30}
        breakpoints={breakpoints}
        className="my-6"
      >
        {
          actors?.map(({ id, name, profile_path }) => (
            <SwiperSlide
              key={id}
            >
              <img
                src={profile_path ? `${swiperImageUrl}${profile_path}` : 'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg'}
                alt="#"
              />
              <h2>{name}</h2>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
