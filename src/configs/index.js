import axios from 'axios'

export const firebaseConfig = {
  apiKey: 'AIzaSyBByCFkcjGVer43NcymHaKbOsxmk8T88IQ',
  authDomain: 'auth-cinema.firebaseapp.com',
  databaseURL: 'https://auth-cinema-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'auth-cinema',
  storageBucket: 'auth-cinema.appspot.com',
  messagingSenderId: '753067574491',
  appId: '1:753067574491:web:56d8af69ebf6cf5a0a78fe',
  measurementId: 'G-JGY3STF1KJ',
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
