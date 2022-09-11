import { baseRequest } from 'configs'

export const getAdmin = () => {
  return baseRequest.get('/admin.json')
}

export const getWorkers = () => {
  return baseRequest.get('/workers.json')
}


export const getRooms = () => {
  return baseRequest.get('/rooms.json')
}
