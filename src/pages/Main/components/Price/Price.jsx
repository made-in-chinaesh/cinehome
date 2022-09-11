import React from 'react'
import cls from './Price.module.scss'
import { RiHeartsLine } from 'react-icons/ri'
import { GiCctvCamera, GiUsbKey, GiVacuumCleaner, GiSelfLove } from 'react-icons/gi'
import { IoIosBed } from 'react-icons/io'

export const Price = () => {
  return (
    <div className={cls.root}>
      <h2 className={cls.title}>Преимущества отдыха в нашем Кинотеатре</h2>

      <div className={cls.list}>
        <div className={cls.listItem}>
          <RiHeartsLine />
          <div className={cls.listContent}>
            Весь кинозал только в Вашем распоряжении
          </div>
        </div>

        <div className={cls.listItem}>
          <IoIosBed />
          <div className={cls.listContent}>
            Огромные Лежачие диваны
          </div>
        </div>

        <div className={cls.listItem}>
          <GiCctvCamera />
          <div className={cls.listContent}>
            Отсутствие камер в зонах комфорта
          </div>
        </div>

        <div className={cls.listItem}>
          <GiUsbKey />
          <div className={cls.listContent}>
            Можно со своими фильмами
          </div>
        </div>

        <div className={cls.listItem}>
          <GiVacuumCleaner />
          <div className={cls.listContent}>
            Уборка перед каждым сеансом
          </div>
        </div>

        <div className={cls.listItem}>
          <GiSelfLove />
          <div className={cls.listContent}>
            8 из 10 гостей приходят к нам повторно
          </div>
        </div>

      </div>
    </div>
  )
}
