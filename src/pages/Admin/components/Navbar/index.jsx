import React from 'react'
import cls from './index.module.scss'
import { NavLink } from 'react-router-dom'

const navigation = [
  {
    id: 1,
    to: '/admin/',
    title: 'Работники',
  },
  {
    id: 2,
    to: '/admin/products',
    title: 'Продукты',
  },
  {
    id: 3,
    to: '/admin/rooms',
    title: 'Комнаты',
  },
]

export const Navbar = () => {
  return (
    <nav className={cls.root}>
      <h2>Admin Panel</h2>
      {
        navigation.map(({ id, to, title }) => (
          <NavLink
            key={id}
            to={to}
            className={({ isActive }) => {
              return isActive ? cls.red : null
            }}
          >{title}</NavLink>
        ))
      }
    </nav>
  )
}
