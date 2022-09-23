import React from 'react'
import { parseJSON } from 'helpers'
import { Admin } from '..'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const useWorkerOffice = () => {
  const navigate = useNavigate()

  const [products, setProducts] = React.useState(null)
  const [rooms, setRooms] = React.useState(null)
  const [reports, setReports] = React.useState(null)

  const [isLoadingProducts, setIsLoadingProducts] = React.useState(false)
  const [isLoadingRooms, setIsLoadingRooms] = React.useState(false)
  const [isLoadingReports, setIsLoadingReports] = React.useState(false)
  const [isLoadingDeleteProduct, setIsLoadingDeleteProduct] = React.useState(false)
  const [isLoadingPostProduct, setIsLoadingPostProduct] = React.useState(false)
  const [isLoadingEditProduct, setIsLoadingEditProduct] = React.useState(false)
  const [isLoadingPostRoom, setIsLoadingPostRoom] = React.useState(false)
  const getProducts = () => {
    const request = Admin.API.getProducts()

    setIsLoadingProducts(true)
    request
      .then(res => {
        const data = parseJSON(res.data)

        if (!data) return

        setProducts(data)
      })
      .finally(() => setIsLoadingProducts(false))
  }

  const getRooms = () => {
    const request = Admin.API.getRooms()

    setIsLoadingRooms(true)
    request
      .then(res => {
        const data = parseJSON(res.data)

        if (!data) return

        setRooms(data)
      })
      .finally(() => setIsLoadingRooms(false))
  }

  const postProduct = (body) => {
    const request = Admin.API.postProduct(body)
    setIsLoadingPostProduct(true)
    request
      .then(() => {
        getProducts()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Успешно добавлено!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .finally(() => setIsLoadingPostProduct(false))
  }

  const editProduct = (body) => {
    const request = Admin.API.editProduct(body.key, body)
    setIsLoadingEditProduct(true)
    request
      .then(() => {
        getProducts()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Успешно изменено!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .finally(() => setIsLoadingEditProduct(false))
  }

  const deleteProduct = (productId) => {
    const request = Admin.API.deleteProduct(productId)

    setIsLoadingDeleteProduct(true)
    request
      .then(() => {
        getProducts()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Успешно удалено!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .finally(() => setIsLoadingDeleteProduct(false))
  }

  const getReports = (workerId) => {
    const request = Admin.API.getReports(workerId)

    setIsLoadingReports(true)
    request
      .then(res => {
        const data = parseJSON(res.data)

        if (!data) return

        setReports(data)
      })
      .finally(() => setIsLoadingReports(false))
  }

  const deleteOrder = (workerId, orderId) => {
    const request = Admin.API.deleteOrder(workerId, orderId)

    request
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Успешно удалено!',
          showConfirmButton: false,
          timer: 1500,
        })
        navigate(-1)
        getReports()
      })
  }

  const postRoom = (body) => {
    const request = Admin.API.postRoom(body)

    setIsLoadingPostRoom(true)
    request
      .then(() => {
        getRooms()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Успешно добавлено!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .finally(() => setIsLoadingPostRoom(false))
  }

  const deleteRoom = (roomId) => {
    const request = Admin.API.deleteRoom(roomId)

    request
      .then(() => {
        getRooms()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Успешно удалено!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  const completeRoomOrder = (roomId) => {
    const body = {
      isActive: false,
    }

    const request = Admin.API.completeRoomOrder(roomId, body)

    request
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Успешно завершено!',
          timer: 1500,
        })
        getRooms()
      })
  }

  React.useEffect(() => {
    getProducts()
    getRooms()
  }, [])

  return {
    products,
    rooms,
    reports,
    isLoadingProducts,
    isLoadingRooms,
    isLoadingReports,
    isLoadingDeleteProduct,
    isLoadingPostProduct,
    isLoadingEditProduct,
    isLoadingPostRoom,
    actions: {
      deleteProduct,
      postProduct,
      getReports,
      editProduct,
      deleteOrder,
      deleteRoom,
      postRoom,
      getRooms,
      completeRoomOrder,
    },
  }
}

export const use = useWorkerOffice
