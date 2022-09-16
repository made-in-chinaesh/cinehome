import { parseJSON } from 'helpers'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Admin } from '..'

const useRoom = (roomId) => {
  const [rooms, setRooms] = React.useState(null)
  const [singleRoom, setSingleRoom] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [products, setProducts] = React.useState(null)
  const [filteredProduct, setFilteredProduct] = React.useState(null)
  const [roomOrders, setRoomOrders] = React.useState(null)
  const [category, setCategory] = React.useState(0)
  const workerId = localStorage.getItem('workerId')
  const navigate = useNavigate()

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

  const getRooms = () => {
    const request = Admin.API.getRooms()

    setIsLoading(true)

    request
      .then(res => {
        const data = parseJSON(res.data)

        if (!data) return

        setRooms(data)
      })
      .finally(() => setIsLoading(false))
  }

  const bookRoom = () => {
    const body = { isActive: true }
    const request = Admin.API.activateRoom(roomId, body)

    request
      .catch(err => {
        console.log(err)
      })
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
        setFilteredProduct([beverages, snacks, hookah])
      })
  }

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

  const resetProducts = () => {
    setProducts(products?.map(category => {
      return category.map(product => {
        return {
          ...product,
          count: 0,
          totalPrice: 0,
        }
      })
    }))
  }

  const getPriceByCount = (count) => {
    let check = 0
    switch (+count) {
    case 1:
      check = 300
      break
    case 2:
      check = 500
      break
    case 3:
      check = 700
      break
    default:
      check = count * 200
      break
    }
    return check
  }

  const patchLastOrder = (data) => {
    const orderId = localStorage.getItem(`room${roomId}`)

    if (!orderId) return
    if (!workerId) return

    let check = getPriceByCount(data?.clientCount)

    const newArr = []
    products.forEach(category => {
      return category.map(product => product.count > 0 && newArr.push(product))
    })

    check += newArr.reduce((prev, current) => {
      return prev + +current.totalPrice
    }, 0)


    const body = {
      orders: newArr,
      check,
      isChecked: false,
      clientCount: +data?.clientCount,
      time: data?.time,
      editDate: new Date().toLocaleString(),
    }

    const request = Admin.API.patchOrder(workerId, orderId, body)

    request
      .then(res => {
        const data = res.data

        console.log(data)
      })
  }

  const totalCheck = (data) => {
    if (!workerId) return

    let check = getPriceByCount(data?.clientCount)

    const newArr = []
    products.forEach(category => {
      return category.map(product => product.count > 0 && newArr.push(product))
    })

    check += newArr.reduce((prev, current) => {
      return prev + +current.totalPrice
    }, 0)


    const body = {
      orders: newArr,
      check,
      isChecked: false,
      clientCount: +data?.clientCount,
      time: data?.time,
      entryPrice: getPriceByCount(data?.clientCount),
      date: new Date().toLocaleString(),
    }
    const request = Admin.API.postReports(workerId, body)

    request
      .then((res) => {
        const data = res.data
        console.log(data.name)
        localStorage.setItem(`room${roomId}`, data.name)
        navigate(-1)
      })

    bookRoom(roomId)
  }

  const removeActivityRoom = () => {
    const body = { isActive: false }
    const request = Admin.API.activateRoom(roomId, body)

    request
      .then(() => {
        resetProducts()
        setRoomOrders(null)
        localStorage.removeItem(`room${roomId}`)
        navigate(-1)
      })
  }

  const getRoom = () => {
    const request = Admin.API.getSingleRoom(roomId)

    request
      .then(res => {
        setSingleRoom(res.data)
      })
  }

  const getOldOrder = () => {
    if (!roomId) return
    const orderId = localStorage.getItem(`room${roomId}`)
    if (!orderId) return

    const request = Admin.API.getOldOrder(workerId, orderId)

    request
      .then(res => {
        const data = res.data
        console.log(data)

        if (!data) return

        setRoomOrders(data)
      })
  }

  const onChangeInput = (e) => {
    const value = e.target.value.toUpperCase()

    if (value.length === 0) return setProducts(filteredProduct)

    const findProduct = products?.map(category => {
      return category.filter(product => product.title.toUpperCase().includes(value))
    })

    if (!products) return

    if (!products[0].length) return setProducts(null)

    return setProducts(findProduct)
  }

  React.useEffect(() => {
    getRooms()
    getProducts()
    getRoom()
    getOldOrder()
  }, [])

  return {
    rooms,
    singleRoom,
    isLoading,
    products,
    navigation,
    category,
    roomOrders,
    actions: {
      increment,
      decrement,
      handleCategory,
      resetProducts,
      totalCheck,
      bookRoom,
      removeActivityRoom,
      patchLastOrder,
      getRooms,
      onChangeInput,
      getProducts,
    },
  }
}

export const use = useRoom
