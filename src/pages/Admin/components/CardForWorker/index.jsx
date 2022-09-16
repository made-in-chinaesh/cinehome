import { CardButton } from 'pages/Admin/adminUI/CardButton'
import React from 'react'
import cls from './CardForWorker.module.scss'

export const CardForWorker = ({ product }) => {
  console.log(product)
  const { title, price, productImg } = product
  return (
    <div className={cls.root}>
      <div className={cls.imgContainer}>
        <img src={productImg} alt="#" />
      </div>
      <div className={cls.cardBody}>
        <input type="text" defaultValue={title} />
        <span className={cls.productTitle}>{title}</span>
        <span className={cls.productTitle}>{price} сом</span>
        <div className={cls.btnContainer}>
          <CardButton onClick={() => alert('Тут должна быть модалка!')} children={'Редакт..'} isDelete={false}/>
          <CardButton onClick={() => alert('Тут должна быть модалка!')} children={'Удалить'} />

        </div>
      </div>
    </div>
  )
}
