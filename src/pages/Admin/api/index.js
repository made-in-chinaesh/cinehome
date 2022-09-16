import { baseRequest } from 'configs'

export const getAdmin = () => {
  return baseRequest.get('/admin.json')
}

export const getWorkers = () => {
  return baseRequest.get('/workers.json')
}

export const getWorker = (id) => {
  return baseRequest.get(`/workers/${id}.json`)
}

export const postWorker = (id, body) => {
  return baseRequest.put(`/workers/${id}.json`, body)
}

export const getRooms = () => {
  return baseRequest.get('/rooms.json')
}

export const getSingleRoom = (roomId) => {
  return baseRequest.get(`/rooms/${roomId}.json`)
}

export const activateRoom = (roomId, body) => {
  return baseRequest.patch(`/rooms/${roomId}.json`, body)
}

export const postProduct = (body) => {
  return baseRequest.post(`/products/${body.type}.json`, body)
}

export const getProducts = () => {
  return baseRequest.get('/products.json')
}

export const postReports = (workerId, body) => {
  return baseRequest.post(`/workers/${workerId}/reports.json`, body)
}

export const getReports = (workerId) => {
  return baseRequest.get(`/workers/${workerId}/reports.json`)
}

export const checkReport = (id, reportKey) => {
  const body = {
    isChecked: true,
  }
  return baseRequest.patch(`/workers/${id}/reports/${reportKey}.json`, body)
}

export const deleteReport = (id, reportKey) => {
  return baseRequest.delete(`/workers/${id}/reports/${reportKey}.json`)
