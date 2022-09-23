import React from 'react'
import cls from './index.module.scss'
import { VscChromeClose } from 'react-icons/vsc'
import { ProductCards, ProductCardsSkeleton } from '../ProductCards'
import { Admin } from 'pages/Admin'
import { RoomCards } from '../RoomCards'
import { Input } from 'components/UI/Input'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const ProductNavigation = ({
  setProductType,
  productType,
}) => {
  const navigation = [
    {
      id: 1,
      type: 'beverages',
      title: 'Напитки',
    },
    {
      id: 2,
      type: 'snacks',
      title: 'Закуски',
    },
    {
      id: 3,
      type: 'hookah',
      title: 'Кальян',
    },
  ]

  return (
    <div className={cls.productNavigation}>
      {
        navigation.map(({ id, type, title }) => (
          <h2
            key={id}
            onClick={() => setProductType(type)}
            style={{
              transition: '200ms',
              borderBottom: productType === type ? '2px solid #7a5acc' : null,
            }}
          >{title}</h2>
        ))
      }
    </div>
  )
}

export const AddOrderModal = ({
  setIsActive,
  products,
  rooms,
  getRooms,
  workerId,
  getReports,
}) => {
  const navigate = useNavigate()

  const {
    isLoadingBookingRoom,
    actions: {
      increment,
      decrement,
      bookingRoom,
    },
  } = Admin.Hook.Order.use()

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm()

  const [productType, setProductType] = React.useState('beverages')
  const [newProducts, setNewProducts] = React.useState(null)
  const [selectedRoom, setSelectedRoom] = React.useState(null)

  React.useEffect(() => {
    products?.sort((a, b) => {
      if (a.type === 'beverages') return -1
      if (b.type === 'beverages' && a.type !== 'beverages') return 0
      if (a.type === 'snacks') return -1
      if (b.type === 'snacks' && a.type !== 'snacks') return 0
      return 1
    })
    setNewProducts(products)
  }, [])

  const onSubmit = (data) => {
    if (!selectedRoom) {
      return Swal.fire({
        position: 'center',
        title: 'Вы не выбрали комнату',
        timer: 1000,
      })
    }

    const check = newProducts.reduce((prev, product) => {
      return prev + (product.price * product.count)
    }, 0)

    const body = {
      ...data,
      check: check,
      isActive: true,
      order: newProducts,
    }
    navigate('rooms')
    return bookingRoom(workerId, selectedRoom, body, getRooms, getReports, setIsActive)
  }

  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div className={cls.container}>
        <h1>Сделать заказ</h1>
        <div className={cls.formContainer}>
          <Input
            label="Количество персон"
            type="number"
            placeholder="Введите количество персон"
            error={errors.personCount && errors.personCount.message}
            {...register('personCount', Forms.Options.PhoneNumber)}
          />
        </div>
        <h2>Выберите продукты</h2>
        <ProductNavigation
          productType={productType}
          setProductType={setProductType}
        />
        <div className={cls.productsContainer}>
          {
            newProducts ? newProducts.map(product => {
              if (product.type === productType) {
                return (
                  <ProductCards
                    key={product.key}
                    product={product}
                    isWorker={false}
                  >
                    <div>
                      <button onClick={() => increment(newProducts, setNewProducts, product.key)}>+</button>
                      {product.count}
                      <button onClick={() => decrement(newProducts, setNewProducts, product.key)}>-</button>
                    </div>
                  </ProductCards>
                )
              }
              return
            }) : <ProductCardsSkeleton />
          }
        </div>
        <h2>Выберите комнату</h2>
        <div className={cls.roomsContainer}>
          {
            rooms?.map(({ roomImage, isActive, key }, index) => (
              <div
                key={key}
                style={{
                  transition: '500ms',
                  borderRadius: 10,
                  boxShadow: selectedRoom === key ? '0 0 10px #000' : null,
                  transform: selectedRoom === key ? 'scale(1.1)' : null,
                }}
                onClick={
                  () => !isActive ?
                    setSelectedRoom(key) :
                    Swal.fire({
                      position: 'center',
                      title: 'Эта комната уже забронорована',
                      icon: 'error',
                      timer: 1000,
                    })
                }
              >
                <RoomCards
                  index={index + 1}
                  roomImage={roomImage}
                >
                  <p className={cls.bookedText}>{isActive && 'забронировано'}</p>
                </RoomCards>
              </div>
            ))
          }
        </div>
        <button
          className={cls.startBtn}
          onClick={handleSubmit(onSubmit)}
          disabled={isLoadingBookingRoom}
          style={{
            background: isLoadingBookingRoom ? 'gray' : null,
          }}
        >Начать</button>
      </div>
    </div>
  )
}
