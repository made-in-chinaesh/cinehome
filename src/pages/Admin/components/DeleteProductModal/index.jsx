import React from 'react'
import cls from './index.module.scss'
import { Button, ButtonVariants } from 'components/UI/Button'
import { VscChromeClose } from 'react-icons/vsc'

export const DeleteProductModal = ({
  isActive,
  setIsActive,
  onClick,
  isLoading,
}) => {
  if (!isActive) return

  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div className={cls.container}>
        <h2>Удаление</h2>
        <Button
          disabled={isLoading}
          variant={isLoading ? ButtonVariants.loading : ButtonVariants.blue}
          onClick={onClick}
        >Удалить</Button>
      </div>
    </div>
  )
}
