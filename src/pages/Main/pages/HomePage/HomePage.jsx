import React from 'react'
import cls from './HomePage.module.scss'
import { HomeSlider } from 'pages/Main/components/HomeSlider/HomeSlider'
import { Price } from 'pages/Main/components/Price/Price'

const peaplesPrice = [
  {
    id: 1,
    headerTitle: 'Всего',
    price: 300,
    title: 'за 1 персону',
  },
  {
    id: 2,
    headerTitle: 'Всего',
    price: 500,
    title: 'за 2 персону',
  },
  {
    id: 3,
    headerTitle: 'Всего',
    price: 700,
    title: 'за 3 персону',
  },
  {
    id: 4,
    headerTitle: 'С каждого',
    price: 200,
    title: 'за 3 и больше персон',
  },
  {
    id: 5,
    headerTitle: 'Ночь кино',
    price: 500,
    title: 'Ночь кино на 8 часов',
  },
]

export const HomePage = () => {
  const scrollBottom = React.useRef(null)

  const bottomScroll = () => {
    scrollBottom.current?.scrollIntoView({ behavoir: 'smooth' })
  }

  return (
    <div className={cls.root}>
      <HomeSlider />
      <div className={cls.mouseContainer}>
        <span className={cls.mouseBtn} onClick={() => bottomScroll()}>
          <span className={cls.mouseScroll}></span>
        </span>
      </div>
      <Price />
      <div className={cls.priceContainer}>
        {
          peaplesPrice.map(({ id, headerTitle, price, title }) => (
            <div
              className={cls.card}
              key={id}
              data-aos="fade-up"
            >
              <h4>{headerTitle}</h4>
              <h2>{price} сом</h2>
              <p>{title}</p>
            </div>
          ))
        }
      </div>
      <div ref={scrollBottom} />
    </div>
  )
}
