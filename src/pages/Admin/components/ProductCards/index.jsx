import React from 'react'
import cls from './index.module.scss'
import { Admin } from 'pages/Admin'
import { CardForWorker } from '../CardForWorker'
import { Loader } from 'components/Loader'

export const ProductCards = () => {
  const {
    products,
    actions: {
      getProducts,
    },
  } = Admin.Hook.Room.use()

  if (!products) return <Loader />

  return (
    <div className={cls.root}>
      <h2>Продукты</h2>
      <div className={cls.container}>
        {
          products ? products?.map((category) => {
            return category?.map(product => (
              (
                <CardForWorker
                  key={product.key}
                  product={product}
                  getProducts={getProducts}
                />
              )
            ))
          }) : <h1>Пусто</h1>
        }
      </div>
    </div>
  )
}
