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

  const postOrder = (workerId, body, getRooms, getReports) => {
    const request = Admin.API.postOrder(workerId, body)

    request
      .then(() => {
        getReports(workerId)
        getRooms()
      })
  }

  const bookingRoom = (workerId, roomId, body, getRooms, getReports, setIsActive) => {
    const request = Admin.API.bookingRoom(roomId, body)

    setIsLoadingBookingRoom(true)
    request
      .then(() => {
        const postOrderBody = {
          order: body.order,
          personCount: body.personCount,
          date: new Date().toLocaleDateString(),
          isChecked: false,
          check: body.check,
        }
        postOrder(workerId, postOrderBody, getRooms, getReports)
        setIsActive(false)
        Swal.fire({
          position: 'center',
          title: 'Успешно забронировано!',
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
