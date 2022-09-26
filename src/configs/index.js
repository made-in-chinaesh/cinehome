import axios from 'axios'

export const firebaseConfig = {
  apiKey: 'AIzaSyCCVmJP1m8C9Cp8kvdi1DM0Z3s8YIzkLpo',
  authDomain: 'cinehome-bb324.firebaseapp.com',
  databaseURL: 'https://cinehome-bb324-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'cinehome-bb324',
  storageBucket: 'cinehome-bb324.appspot.com',
  messagingSenderId: '66210663289',
  appId: '1:66210663289:web:d9581b1a78c78a3b9bfda8',
  measurementId: 'G-4190YGZ2WQ',
}
export const auth = (data, isSignIn) => {
  return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${isSignIn ? 'signInWithPassword' : 'signUp'}?key=${firebaseConfig.apiKey}`, data)
}

export const baseUrl = firebaseConfig.databaseURL

const movieBaseUrl = 'https://api.themoviedb.org/3'

export const moviesRequest = axios.create({
  baseURL: movieBaseUrl,
})

export const baseRequest = axios.create({
  baseURL: baseUrl,
})
