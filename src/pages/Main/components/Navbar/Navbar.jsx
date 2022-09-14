import React from 'react'
import cls from './Navbar.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { SearchMovies } from '../SearchMovies/SearchMovies'
import { AiOutlineSearch } from 'react-icons/ai'
import { CurrentUser } from 'modules/user'
import { RiLogoutBoxRFill, RiLogoutBoxRLine } from 'react-icons/ri'

const nav = [
  {
    id: 1,
    to: '/',
    title: 'Home',
  },
  {
    id: 2,
    to: '/movies',
    title: 'Фильмы',
  },
  {
    id: 3,
    to: '/favorites',
    title: 'Избранные',
  },
]

export const Navbar = () => {
  const userId = localStorage.getItem('userId')

  const {
    actions: {
      logout,
    },
  } = CurrentUser.use()

  const navigate = useNavigate()


  const [searchActive, setSearchActive] = React.useState(false)

  return (
    <>
      <div className={cls.root}>
        <nav>
          <div>
            <h2>Cine<span>home</span></h2>
            {
              nav.map(({ id, to, title }) => (
                <NavLink
                  key={id}
                  to={to}
                  style={({ isActive }) => {
                    return isActive ? { color: '#fff' } : null
                  }}
                >
                  {title}
                </NavLink>
              ))
            }
          </div>
          <div>
            <p
              onClick={() => setSearchActive(true)}
              className={cls.search}
            ><AiOutlineSearch /><span>search</span></p>
            <div onClick={() => !userId ? navigate('/auth/signin') : logout()}>
              {
                !userId ? <p>войти <RiLogoutBoxRFill /></p> : <p>выйти <RiLogoutBoxRLine /></p>
              }
            </div>
          </div>
        </nav>
      </div>
      <SearchMovies isActive={searchActive} setIsActive={setSearchActive} />
    </>
  )
}
