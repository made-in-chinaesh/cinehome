import { parseJSON } from 'helpers'
import React from 'react'
import { Admin } from '..'

const useRoom = (roomId) => {
  const [rooms, setRooms] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [products, setProducts] = React.useState(null)
  const [category, setCategory] = React.useState(0)
  const workerId = localStorage.getItem('workerId')

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
        const data = res.data.filter(item => item)
        setRooms(data)
      })
      .finally(() => setIsLoading(false))
  }

  const bookRoom = (roomId) => {
    const body = { isActive: true }
    const request = Admin.API.activateRoom(roomId, body)

    request
      .then(res => {
        const data = res.data
        console.log(data)
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
    setProducts(products.map(category => {
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
      clientCount: +data?.clientCount,
      time: data?.time,
      date: new Date().toLocaleString(),
    }
    console.log(body)
    console.log(roomId)
    resetProducts()

    // const request = Admin.API.postReports(workerId, body)

    // request
    //   .then(res => {
    //     console.log(res.data)
    //   })

    bookRoom(roomId)
  }


  React.useEffect(() => {
    getRooms()
    getProducts()

    const request = Admin.API.getReports(workerId)

    request
      .then(res => {
        const data = res.data
        console.log(data)
      })
  }, [])

  return {
    rooms,
    isLoading,
    products,
    navigation,
    category,
    actions: {
      increment,
      decrement,
      handleCategory,
      resetProducts,
      totalCheck,
    },
  }
}

export const use = useRoom
