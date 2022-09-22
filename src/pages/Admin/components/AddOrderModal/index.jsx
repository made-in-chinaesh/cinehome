import { Loader } from 'components/Loader'
import { Admin } from 'pages/Admin'
import React from 'react'
import { useForm } from 'react-hook-form'
import { VscChromeClose } from 'react-icons/vsc'
import CardVariant from '../CardVariant'
import { RoomCards } from '../RoomCards'
import cls from './index.module.scss'

export const AddOrderModal = ({
  rooms,
  isActive,
  setIsActive,
}) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm()

  const {
    products,
    category,
    navigation,
    actions: {
      handleCategory,
      increment,
      decrement,
      totalCheck,
    },
  } = Admin.Hook.Room.use()

  const [upRooms, setUpRooms] = React.useState(false)

  React.useEffect(() => {
    console.log(upRooms)
  }, [upRooms])

  return (
    <div className={cls.root}>
      <div className={cls.modalOverlay} onClick={() => setIsActive(false)}/>

      <div className={cls.content}>
        <VscChromeClose
          className={cls.closeIcon}
          size={40}
          onClick={() => setIsActive(false)}/>
        <div className={upRooms ? cls.upRoomContainer : cls.roomContainer}>
          {
            rooms?.map(({ key, roomImage, isActive }) => (
              <RoomCards key={key} roomImage={roomImage} onClick={() => setUpRooms(!upRooms)}/>
            ))
          }
        </div>
        <div className={cls.orderContainer}>
          <form>

            <label htmlFor="count">
              <span>Количество персон</span> <br />
              <input
                id={cls.count}
                type="number"
                min="1"
                {...register('clientCount', { required: true } )}
              />
            </label>

            <label htmlFor="minute">
              <span>Минут</span> <br />
              <input
                id="minute"
                type="number"
                min="1"
                {...register('minute', { required: true })}
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
              products ? products[category]?.map(product => (
                <CardVariant
                  key={product.key}
                  increment={increment}
                  decrement={decrement}

                />
              )) : <Loader isFullPage={true}/>
            }
          </div>


          <h1 onClick={() => setUpRooms(false)}>fff</h1>
        </div>
      </div>
    </div>
  )
}
