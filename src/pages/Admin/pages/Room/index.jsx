import { Admin } from 'pages/Admin'
import { OrderList } from 'pages/Admin/components/OrderLIst'
import { Product } from 'pages/Admin/components/Product'
import { ProductVariant } from 'pages/Admin/components/ProductVariant'
import { RoomStartBtn } from 'pages/Admin/components/RoomStartBtn'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import cls from './Room.module.scss'

export const Room = () => {
  const { roomId } = useParams()
  const {
    products,
    navigation,
    category,
    singleRoom,
    roomOrders,
    actions: {
      increment,
      decrement,
      handleCategory,
      totalCheck,
      removeActivityRoom,
      patchLastOrder,
    },
  } = Admin.Hook.Room.use(roomId)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    totalCheck(data)
    // reset({
    //   clientCount: '',
    //   minute: '',
    // })
  }

  return (
    <div className={cls.root}>

      {
        singleRoom?.isActive && <OrderList orderList={roomOrders}/>
      }

      <form>

        <label htmlFor="count">
          <span>Количество персон</span> <br />
          <input
            id={cls.count}
            type="number"
            min="1"
            {...register('clientCount', { required: !singleRoom?.isActive } )}
          />
        </label>

        <label htmlFor="minute">
          <span>Минут</span> <br />
          <input
            id="minute"
            type="number"
            min="1"
            {...register('minute', { required: !singleRoom?.isActive })}
          />
        </label>
      </form>


      <div className={cls.categoryes}>
        {
          navigation.map(({ id, title, original_title }) => (
            <h2 key={id}
              className={id === category ? cls.activeCategory : cls.category}
              onClick={() => handleCategory(original_title)}
            >{title}</h2>
          ))
        }
      </div>

      <div className={cls.productsContainer}>
        {
          products ? products[category]?.map(({ key, title, count, price, totalPrice, productImg }) => (
            <ProductVariant
              key={key}
              id={key}
              title={title}
              count={count}
              price={price}
              productImg={productImg}
              increment={increment}
              decrement={decrement}
              totalPrice={totalPrice}
            />
          )) : 'Пусто!'
        }
      </div>

      {
        singleRoom?.isActive ? (
          <div>
            <RoomStartBtn onClick={removeActivityRoom}>
            Завершить активность
            </RoomStartBtn>
            <RoomStartBtn onClick={handleSubmit(patchLastOrder)}>
              Изменить
            </RoomStartBtn>
          </div>
        ) :
          <RoomStartBtn onClick={handleSubmit(onSubmit)}>
            START
          </RoomStartBtn>
      }

    </div>
  )
}

