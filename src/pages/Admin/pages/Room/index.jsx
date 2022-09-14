import { Admin } from 'pages/Admin'
import { Product } from 'pages/Admin/components/Product'
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
    actions: {
      increment,
      decrement,
      handleCategory,
      totalCheck,
    },
  } = Admin.Hook.Room.use(roomId)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm()


  return (
    <div className={cls.root}>
      <form
        onSubmit={handleSubmit(totalCheck)}
      >

        <label htmlFor="count">
          <span>Количество персон</span> <br />
          <input
            id="count"
            type="number"
            min="1"
            {...register('clientCount', { required: true } )}
          />
        </label>

        <label htmlFor="time">
          <span>Время</span> <br />
          <input
            id="time"
            type="time"
            min="1"
            {...register('time', { required: true })}
          />
        </label>

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

        {
          products ? products[category]?.map(({ key, title, count, price, totalPrice }) => (
            <Product
              key={key}
              id={key}
              title={title}
              count={count}
              price={price}
              increment={increment}
              decrement={decrement}
              totalPrice={totalPrice}
            />
          )) : 'Пусто!'
        }
        <button
          id="SubmitBtn"
          className={cls.startBtn}
          onClick={handleSubmit(totalCheck)}
        >Start
        </button>

      </form>
    </div>
  )
}

