import React from 'react'
import cls from './WorkerOffice.module.scss'
import { Admin } from 'pages/Admin'
import { Route, Routes, useParams } from 'react-router-dom'
import { WorkerSidebar } from 'pages/Admin/components/WorkerSidebar'
import { ProductCardsPage } from './pages/ProductCardsPage'
import { OrdersReportPage } from './pages/OrdersReportPage'
import { RoomCardsPage } from './pages/RoomCardsPage'

export const WorkerOffice = () => {
  const { workerId } = useParams()

  const {
    worker,
    actions: {
      getWorker,
    },
  } = Admin.Hook.Main.use()

  const {
    products,
    rooms,
    isLoadingProducts,
    isLoadingRooms,
    isLoadingPostProduct,
    isLoadingEditProduct,
    isLoadingPostRoom,
    actions: {
      deleteProduct,
      postProduct,
      editProduct,
      deleteOrder,
      deleteRoom,
      postRoom,
    },
  } = Admin.Hook.WorkerOffice.use()

  React.useEffect(() => {
    getWorker(workerId)
  }, [])

  return (
    <>
      <div className={cls.root}>
        <WorkerSidebar
          workerId={workerId}
          worker={worker}
        />
        <div className={cls.container}>
          <Routes>
            <Route
              index
              element={
                <ProductCardsPage
                  products={products}
                  worker={worker}
                  isLoadingProducts={isLoadingProducts}
                  isLoadingPostProduct={isLoadingPostProduct}
                  isLoadingEditProduct={isLoadingEditProduct}
                  postProduct={postProduct}
                  deleteProduct={deleteProduct}
                  editProduct={editProduct}
                />
              }
            />
            <Route
              path="/report/:id"
              element={
                <OrdersReportPage
                  worker={worker}
                  deleteOrder={deleteOrder}
                  workerId={workerId}
                  getWorker={getWorker}
                />
              }
            />
            <Route
              path="/rooms"
              element={
                <RoomCardsPage
                  rooms={rooms}
                  isLoadingRooms={isLoadingRooms}
                  isLoadingPostRoom={isLoadingPostRoom}
                  deleteRoom={deleteRoom}
                  postRoom={postRoom}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  )
}
