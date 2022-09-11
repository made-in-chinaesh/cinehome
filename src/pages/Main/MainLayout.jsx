import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BottomNavbar } from './components/BottomNavbar/BottomNavbar'
import { Navbar } from './components/Navbar/Navbar'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { HomePage } from './pages/HomePage/HomePage'
import { MainPage } from './pages/MainPage/MainPage'
import { MoviePage } from './pages/MoviePage/MoviePage'

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MainPage />} />
        <Route path="/movies/:movieId" element={<MoviePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <BottomNavbar />
    </>
  )
}
