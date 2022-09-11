import { baseRequest, moviesRequest } from 'configs'

export const posterUrl = 'https://image.tmdb.org/t/p/original'
export const swiperImageUrl = 'https://image.tmdb.org/t/p/w400'

const apiKey = '0dbbd93f72bfa8dcaa650cc94b685516'

// movies api ==========================================

const setQuery = (query, page, search) => `${query}?api_key=${apiKey}&language=ru${page ? `&page=${page}` : ''}${search ? `&query=${search}` : ''}`

export const getPopularMovies = () => {
  return moviesRequest.get(setQuery('/movie/popular'))
}

export const getTopRatedMovies = () => {
  return moviesRequest.get(setQuery('/movie/top_rated'))
}

export const getMovieActors = (id) => {
  return moviesRequest.get(setQuery(`/movie/${id}/credits`))
}

export const getMovie = (id) => {
  return moviesRequest.get(setQuery(`/movie/${id}`))
}

export const getRecommendationsMovies = (id) => {
  return moviesRequest.get(setQuery(`/movie/${id}/recommendations`))
}

export const getSimilarMovies = (id) => {
  return moviesRequest.get(setQuery(`/movie/${id}/similar`))
}

export const getCategoryMovies = (category, page) => {
  return moviesRequest.get(setQuery(`/${category === 'week' ? 'trending/movie' : 'movie'}/${category}`, page))
}

export const searchMovies = (query) => {
  return moviesRequest.get(setQuery('/search/movie', '', query))
}

export const getMovieTrailer = (id) => {
  return moviesRequest.get(setQuery(`/movie/${id}/videos`))
}


// firebase api ======================================
export const addFavorite = (localId, id, data) => {
  return baseRequest.put(`/favorites/${localId}/${id}.json`, data)
}

export const removeFavorite = (localId, id) => {
  return baseRequest.delete(`/favorites/${localId}/${id}.json`)
}

export const getFavorites = (id) => {
  return baseRequest.get(`/favorites/${id}.json`)
}
