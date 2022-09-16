import React from 'react'
import { Admin } from 'pages/Admin'
import { Product } from 'pages/Admin/components/Product'
import { parseJSON } from 'helpers'
import { useNavigate, useParams } from 'react-router-dom'
import { baseRequest } from 'configs'

const getRoom = (roomId) => baseRequest.get(`/rooms/${roomId}.json`)

const navigation = [
  {
    id: 0,
    title: 'Напитки',
    original_title: 'beverages',
  },
  {
    id: 1,
    title: 'Закуски',
    original_title: 'snacks',
  },
  {
    id: 2,
    title: 'Кальян',
    original_title: 'hookah',
  },
]

export const RoomTest = () => {
  const { id: roomId } = useParams()

  const navigate = useNavigate()

  const [products, setProducts] = React.useState(null)
  const [category, setCategory] = React.useState(1)
  const [room, setRoom] = React.useState(null)

  const increment = (e, key) => {
    e.preventDefault()
    const updateProducts = products.map(item => {
      return item.map(product => {
        if (product.key === key) {
          return {
            ...product,
            count: ++product.count,
            totalPrice: product.count * product.price,
          }
        }
        return product
      })
    })

    setProducts(updateProducts)
  }
  const decrement = (e, key) => {
    e.preventDefault()

    const updateProducts = products.map(item => {
      return item.map(product => {
        if (product.key === key && product.count > 0) {
          return {
            ...product,
            count: product.count -= 1,
            totalPrice: product.totalPrice -= product.price,
          }
        }
        return product
      })
    })

    setProducts(updateProducts)
  }

  const getProducts = () => {
    const request = Admin.API.getProducts()

    request
      .then(res => {
        const data = res.data

        const beverages = parseJSON(data.beverages)
        const hookah = parseJSON(data.hookah)
        const snacks = parseJSON(data.snacks)
        setProducts([beverages, snacks, hookah])
      })
  }

  const handleCategory = (type) => {
    switch (type) {
    case 'beverages':
      setCategory(0)
      break
    case 'snacks':
      setCategory(1)
      break
    case 'hookah':
      setCategory(2)
      break
    default:
      return type
    }
  }

  const activeRoom = (body) => Admin.API.activateRoom(roomId, body)

  const disActiveRoom = () => {
    const body = {
      isActive: false,
    }
    navigate(-1)
    return baseRequest.patch(`/rooms/${roomId}.json`, body)
  }

  const onSubmit = () => {
    const newArr = []
    products.forEach(category => {
      return category.map(product => product.count > 0 && newArr.push(product))
    })
    const body = {
      [!room?.isActive && 'isActive']: true,
      order: newArr,
    }

    // activeRoom(body) // .then(() => navigate(-1))
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  React.useEffect(() => {
    const request = getRoom(roomId)

    request
      .then(res => {
        const data = res.data

        if (!data) return

        setRoom(data)
      })
  }, [])

  React.useEffect(() => {
    if (!products) return


    room?.order.forEach(item => {
      const updateProducts = products?.map(category => {
        return category.map(product => {
          if (item.key === product.key) {
            return {
              ...product,
              count: item.count,
            }
          }
          return product
        })
      })
      setProducts(updateProducts)
    })
  }, [])

  if (!room) return

  return (
    <div style={{
      width: 1300,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        {
          navigation.map(({ id, title, original_title }) => (
            <h2 key={id}
              style={{
                fontSize: 20,
                fontWeight: 500,
                textAlign: 'center',
                color: id === category ? 'red' : 'gray',
                padding: 15,
                marginBottom: 20,
                borderBottom: `1px solid ${id === category ? 'red' : 'gray'}`,
              }}
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
        onClick={onSubmit}
        style={{
          padding: 15,
          margin: '20px 0',
          background: '#000',
          border: '1px solid #fff',
          color: '#fff',
          cursor: 'pointer',
        }}
      >Submit</button>
      {
        room.isActive &&
        <button
          style={{
            padding: 15,
            margin: '20px 0',
            background: '#000',
            border: '1px solid #fff',
            color: '#fff',
            cursor: 'pointer',
          }}
          onClick={disActiveRoom}
        >Закрыть комнату</button>
      }
    </div>
  )
}
