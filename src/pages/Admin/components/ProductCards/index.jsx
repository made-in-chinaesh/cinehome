import React from 'react'
import cls from './ProductCards.module.scss'
import { EditProductModal } from '../EditProductModal'
import Swal from 'sweetalert2'


export const ProductCardsSkeleton = () => {
  const productsArr = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    productsArr.map(item => (
      <div key={item} className={cls.productCardsSkeleton}></div>
    ))
  )
}

export const ProductCards = ({
  product,
  isLoadingEditProduct,
  editProduct,
  deleteProduct,
}) => {
  if (!product) return

  const {
    productImg,
    title,
    price,
  } = product

  const onDelete = () => {
    Swal.fire({
      title: 'Вы действительно хотите удалить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Отменить',
      confirmButtonText: 'Удалить',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product.key)
      }
    })
  }
  const [isActiveEditProductModal, setIsActiveEditProductModal] = React.useState(false)

  return (
    <>
      <div className={cls.root}>
        <img src={productImg} alt="#" />
        <h2>{title}</h2>
        <div>
          <p>Стоимость: {price} сом</p>
          <button onClick={() => setIsActiveEditProductModal(true)}>Изменить</button>
          <button onClick={() => onDelete()}>Удалить</button>
        </div>
      </div>
      {
        isActiveEditProductModal &&
        <EditProductModal
          isActive={isActiveEditProductModal}
          setIsActive={setIsActiveEditProductModal}
          isLoading={isLoadingEditProduct}
          editProduct={editProduct}
          product={product}
        />
      }
    </>
  )
}
