import { baseRequest } from 'configs'

export const postUser = (userId, body) => {
  return baseRequest.put(`/users/${userId}.json`, body)
}

export const getUser = (userId) => {
  return baseRequest.get(`/users/${userId}.json`)
}
