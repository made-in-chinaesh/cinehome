import React from 'react'
import cls from './Navbar.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { SearchMovies } from '../SearchMovies/SearchMovies'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'
import { CurrentUser } from 'modules/user'

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
  const {
    user,
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
            <p onClick={() => setSearchActive(true)}><AiOutlineSearch /><span>search</span></p>
            <div onClick={() => !user && navigate('/auth')}>
              {
                user?.photoUrl ? <img src={user?.photoUrl} alt="#" /> : <FiUser />
              }
            </div>
          </div>
        </nav>
      </div>
      <SearchMovies isActive={searchActive} setIsActive={setSearchActive} />
    </>
  )
}
