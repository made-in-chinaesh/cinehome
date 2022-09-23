import React from 'react'
import cls from './HomeSlider.module.scss'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { Main } from 'pages/Main'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/controller'
import { posterUrl, swiperImageUrl } from 'pages/Main/api'
import { useNavigate } from 'react-router-dom'

export const HomeSlider = () => {
  const navigate = useNavigate()

  const {
    popularMovies,
  } = Main.Hook.Main.use()

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const shortedText = (text, length) => {
    if (text.length < length) return text

    let newText = ''
    for (let i = 0; i < length; i++) {
      newText += text[i]
    }

    return `${newText}...`
  }

  const goToMoviePage = (id) => navigate(`/movies/${id}`)

  return (
    <div className={cls.root}>
      <div className={cls.swiperContainer}>
        <Swiper
          loop={true}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}

          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = navigationPrevRef.current
              swiper.params.navigation.nextEl = navigationNextRef.current

              swiper.navigation.destroy()
              swiper.navigation.init()
              swiper.navigation.update()
            })
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1800}
          spaceBetween={30}
          className={cls.mySwiper}
          modules={[Navigation, Pagination, Autoplay]}
        >

          {
            popularMovies?.map(({ backdrop_path, poster_path, title, id, overview }) => (

              <SwiperSlide
                className={cls.activeSlide}
                key={id}
              >
                {
                  (({ isActive }) => (
                    <div style={{
                      background: `url(${posterUrl}/${backdrop_path}) center / cover`,
                    }}
                    className={isActive ? cls.activeSlideContent : cls.content}>

                      <div
                        className={cls.posterContent} >
                        <h1>{title}</h1>
                        <p>{shortedText(overview, 300)}</p>

                        <div className={cls.infoBtnContainer}>
                          <button onClick={() => goToMoviePage(id)} className={cls.trailerBtn} >Посмотреть</button>
                        </div>
                      </div>

                      <div className={cls.posterContaier}>
                        {
                          poster_path && <img src={`${swiperImageUrl}/${poster_path}`} alt="#" />
                        }
                      </div>
                    </div>
                  ))
                }

              </SwiperSlide>
            ))
          }

          <div ref={navigationPrevRef} className={cls.swiperButtonPrev}><GrPrevious /></div>
          <div ref={navigationNextRef} className={cls.swiperButtonNext} ><GrNext /></div>
        </Swiper>
      </div>
    </div>
  )
}
