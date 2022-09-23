import React from 'react'
import cls from './WorkerOffice.module.scss'
import { Admin } from 'pages/Admin'
import { Route, Routes, useParams } from 'react-router-dom'
import { WorkerSidebar } from 'pages/Admin/components/WorkerSidebar'
import { ProductCardsPage } from './pages/ProductCardsPage'
import { OrdersReportPage } from './pages/OrdersReportPage'
import { RoomCardsPage } from './pages/RoomCardsPage'
import { NoAccess } from 'components/NoAccess'

export const WorkerOffice = () => {
  const authorizedWorkerId = sessionStorage.getItem('workerId')

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
    reports,
    isLoadingProducts,
    isLoadingRooms,
    isLoadingReports,
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
  } = Admin.Hook.WorkerOffice.use()

  React.useEffect(() => {
    getWorker(workerId)
    getReports(workerId)
  }, [])

  if (!authorizedWorkerId) return <NoAccess isAdmin={true} />

  return (
    <>
      <div className={cls.root}>
        <WorkerSidebar
          workerId={workerId}
          worker={worker}
          products={products}
          rooms={rooms}
          getRooms={getRooms}
          reports={reports}
          isLoadingReports={isLoadingReports}
          getReports={getReports}
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
                  reports={reports}
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
                  completeRoomOrder={completeRoomOrder}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  )
}
