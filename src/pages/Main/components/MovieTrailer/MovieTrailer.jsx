import React from 'react'
import cls from './MovieTrailer.module.scss'
import { VscChromeClose } from 'react-icons/vsc'

export const MovieTrailer = ({
  trailer_key,
  isActive,
  setIsActive,
}) => {
  const body = document.querySelector('body')

  const closeTrailer = () => {
    setIsActive(false)
    body.style.overflow = 'auto'
  }

  React.useEffect(() => {
    if (isActive) body.style.overflow = 'hidden'
    else body.style.overflow = 'auto'
  }, [body, isActive])

  if (!isActive) return

  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => closeTrailer()} />
      <iframe width="1000" height="550" src={`https://www.youtube.com/embed/${trailer_key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}
