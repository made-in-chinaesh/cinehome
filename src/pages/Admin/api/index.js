import { baseRequest } from 'configs'

export const getAdmin = () => {
  return baseRequest.get('/admin.json')
}

export const getWorkers = () => {
  return baseRequest.get('/workers.json')
}

export const postWorker = (id, body) => {
  return baseRequest.put(`/workers/${id}.json`, body)
}

export const getRooms = () => {
  return baseRequest.get('/rooms.json')
}
