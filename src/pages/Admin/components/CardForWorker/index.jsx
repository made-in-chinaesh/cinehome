import React from 'react'
import cls from './CardForWorker.module.scss'
import { Admin } from 'pages/Admin'
import { CardButton } from 'pages/Admin/adminUI/CardButton'
import { EditProductModal } from '../EditProductModal'
import { DeleteProductModal } from '../DeleteProductModal'

export const CardForWorker = ({ product, getProducts }) => {
  const {
    title,
    price,
    key,
    type,
    productImg,
  } = product

  const [editProductModalActive, setEditProductModalActive] = React.useState(false)
  const [deleteProductModalActive, setDeleteProductModalActive] = React.useState(false)

  const [deleteProductModalIsLoading, setDeleteProductModalIsLoading] = React.useState(false)

  const deleteProduct = (type, key) => {
    const request = Admin.API.deleteProduct(type, key)

    setDeleteProductModalIsLoading(true)

    request
      .then(() => getProducts())
      .finally(() => setDeleteProductModalIsLoading(false))
  }

  return (
    <>
      <div className={cls.root}>
        <div className={cls.imgContainer}>
          <img src={productImg} alt="#" />
        </div>
        <div className={cls.cardBody}>
          <span className={cls.productTitle}>{title}</span>
          <span className={cls.productTitle}>{price} сом</span>
          <div className={cls.btnContainer}>
            <CardButton onClick={() => setEditProductModalActive(true)} children={'Редакт..'} isDelete={false}/>
            <CardButton onClick={() => setDeleteProductModalActive(true)} children={'Удалить'} />

          </div>
        </div>
      </div>
      {
        editProductModalActive &&
        <EditProductModal
          isActive={editProductModalActive}
          setIsActive={setEditProductModalActive}
          product={product}
          getProducts={getProducts}
        />
      }
      {
        deleteProductModalActive &&
        <DeleteProductModal
          isActive={deleteProductModalActive}
          setIsActive={setDeleteProductModalActive}
          onClick={() => deleteProduct(type, key)}
          isLoading={deleteProductModalIsLoading}
        />
      }
    </>
  )
}
