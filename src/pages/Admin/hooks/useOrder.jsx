import React from 'react'
import Swal from 'sweetalert2'
import { Admin } from '..'

const useOrder = () => {
  const [isLoadingBookingRoom, setIsLoadingBookingRoom] = React.useState(false)

  const increment = (products, setProducts, key) => {
    const newProducts = products.map(product => {
      if (product.key === key) {
        return {
          ...product,
          count: product.count += 1,
        }
      }
      return product
    })
    setProducts(newProducts)
  }

  const decrement = (products, setProducts, key) => {
    const newProducts = products.map(product => {
      if (product.key === key && product.count > 0) {
        return {
          ...product,
          count: product.count -= 1,
        }
      }
      return product
    })
    setProducts(newProducts)
  }

  const postOrder = (workerId, body) => Admin.API.postOrder(workerId, body)

  const bookingRoom = (workerId, roomId, body, getRooms, getReports) => {
    const request = Admin.API.bookingRoom(roomId, body)

    setIsLoadingBookingRoom(true)
    request
      .then(() => {
        const postOrderBOdy = {
          order: body.order,
          personCount: body.personCount,
          date: new Date().toLocaleDateString(),
        }
        postOrder(workerId, postOrderBOdy)
        getReports(workerId)
        getRooms()
        Swal.fire({
          position: 'center',
          title: 'Успешно заброноровано!',
          icon: 'success',
          timer: 1000,
        })
      })
      .finally(() => setIsLoadingBookingRoom(false))
  }

  return {
    isLoadingBookingRoom,
    actions: {
      increment,
      decrement,
      bookingRoom,
    },
  }
}

export const use = useOrder
