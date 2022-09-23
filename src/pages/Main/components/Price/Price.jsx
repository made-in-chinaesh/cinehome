import React from 'react'
import cls from './Price.module.scss'
import { RiHeartsLine } from 'react-icons/ri'
import { GiCctvCamera, GiUsbKey, GiVacuumCleaner, GiSelfLove } from 'react-icons/gi'
import { IoIosBed } from 'react-icons/io'

export const Price = () => {
  const listArr = [
    {
      id: 1,
      description: 'Весь кинозал только в Вашем распоряжении',
      icon: <RiHeartsLine />,
    },
    {
      id: 2,
      description: 'Огромные Лежачие диваны',
      icon: <IoIosBed />,
    },
    {
      id: 3,
      description: 'Отсутствие камер в зонах комфорта',
      icon: <GiCctvCamera />,
    },
    {
      id: 4,
      description: 'Можно со своими фильмами',
      icon: <GiUsbKey />,
    },
    {
      id: 5,
      description: 'Уборка перед каждым сеансом',
      icon: <GiVacuumCleaner />,
    },
    {
      id: 6,
      description: '8 из 10 гостей приходят к нам повторно',
      icon: <GiSelfLove />,
    },
  ]

  return (
    <div className={cls.root}>
      <h2 className={cls.title}>Преимущества отдыха в нашем Кинотеатре</h2>

      <div className={cls.list}>

        {
          listArr.map(({ id, description, icon }) => (
            <div
              className={cls.listItem}
              key={id}
            >
              {icon}
              <div className={cls.listContent}>
                {description}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
