import React from 'react'
import cls from './MoviesSlider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { swiperImageUrl } from '../../api'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { Scrollbar, Navigation } from 'swiper'
import { useNavigate } from 'react-router-dom'

import 'swiper/css'
import 'swiper/css/scrollbar'

const breakpoints = {
  1400: {
    slidesPerView: 7,
    slidesPerGroup: 7,
  },
  1300: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
  1000: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  800: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  550: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  400: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
  100: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
}

const MoviesSwiperSkeleton = () => {
  const moviesSkeleton = [1, 2, 3, 4, 5, 6, 7]

  return (
    <Swiper
      spaceBetween={20}
      delay={1000}
      // navigation={{
      //   prevEl: navigationPrevRef.current,
      //   nextEl: navigationNextRef.current,
      // }}

      // onSwiper={(swiper) => {
      //   setTimeout(() => {
      //     swiper.params.navigation.prevEl = navigationPrevRef.current
      //     swiper.params.navigation.nextEl = navigationNextRef.current

      //     swiper.navigation.destroy()
      //     swiper.navigation.init()
      //     swiper.navigation.update()
      //   })
      // }}

      breakpoints={breakpoints}

    >
      {
        moviesSkeleton.map(item => (
          <SwiperSlide
            key={item}
            className="flex flex-col"
          >
            <div className="h-[250px] bg-[#77cc] rounded"></div>
            <div className="h-3 mt-2"></div>
          </SwiperSlide>
        ))
      }
      <SwiperSlide>
        <div>
          <h3>Посмотреть все</h3>
        </div>
      </SwiperSlide>


      {/*
      <div
        ref={navigationPrevRef}
        className={cls.navigationBtnPrev}
      ><GrPrevious /></div>

      <div
        ref={navigationNextRef}
        className={cls.navigationBtnNext}
      ><GrNext /></div> */}

    </Swiper>
  )
}

export const MoviesSlider = ({
  movies,
  isLoading,
  children,
}) => {
  const navigate = useNavigate()

  const goToMovieInfo = (id) => navigate(`/movies/${id}`)

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  if (isLoading) return <MoviesSwiperSkeleton />

  if (!movies?.length) return

  return (
    <div className={cls.root}>
      <h2>{children}</h2>
      <Swiper
        breakpoints={breakpoints}
        spaceBetween={30}
        modules={[Scrollbar, Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        className={cls.swiper}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = navigationPrevRef.current
            swiper.params.navigation.nextEl = navigationNextRef.current

            swiper.navigation.destroy()
            swiper.navigation.init()
            swiper.navigation.update()
          })
        }}
      >
        {
          movies?.map(({ id, original_title, title, poster_path }) => (
            <SwiperSlide
              key={id}
              className={cls.card}
              onClick={() => goToMovieInfo(id)}
            >
              <img
                src={poster_path ? `${swiperImageUrl}${poster_path}` : 'https://i.stack.imgur.com/erwrC.png'}
                alt="#"
                className="w-full rounded"
                title={title ? title : original_title}
              />
              <p>{title ? title : original_title}</p>
            </SwiperSlide>
          ))
        }
        <div className={cls.next} ref={navigationPrevRef}><GrPrevious /></div>
        <div className={cls.prev} ref={navigationNextRef}><GrNext /></div>
      </Swiper>
    </div>
  )
}
