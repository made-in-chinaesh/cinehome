import React from 'react'
import cls from './BottomNavbar.module.scss'
import { NavLink } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdFavorite } from 'react-icons/md'
import { RiMovieFill } from 'react-icons/ri'
import { SearchMovies } from '../SearchMovies/SearchMovies'

const nav = [
  {
    id: 1,
    to: '/',
    title: 'Home',
    icon: <RiMovieFill />,
  },
  {
    id: 2,
    to: '/movies',
    title: 'Фильмы',
    icon: <RiMovieFill />,
  },
  {
    id: 3,
    to: '/favorites',
    title: 'Избранные',
    icon: <MdFavorite />,
  },
]

export const BottomNavbar = () => {
  const [isSearchActive, setIsSearchActive] = React.useState(false)

  return (
    <>
      <div className={cls.root}>
        {
          nav.map(({ id, to, title, icon }) => (
            <NavLink
              key={id}
              to={to}
              style={({ isActive }) => {
                return isActive ? { color: '#fff' } : null
              }}
            >
              {icon}
              <span>{title}</span>
            </NavLink>
          ))
        }
        <div onClick={() => setIsSearchActive(true)}>
          <AiOutlineSearch />
          <span>search</span>
        </div>
      </div>
      <SearchMovies isActive={isSearchActive} setIsActive={setIsSearchActive} />
    </>
  )
}
