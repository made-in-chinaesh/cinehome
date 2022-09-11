import React from 'react'
import cls from './index.module.scss'

export const ButtonVariants = {
  loading: {
    backgroundColor: 'gray',
    color: 'gainsboro',
  },
  green: {
    backgroundColor: 'green',
    color: '#fff',
  },
}

export const Button = React.forwardRef(({
  children,
  variant,
  disabled = false,
  ...rest
}, ref) => {
  return (
    <button
      className={cls.root}
      ref={ref}
      style={variant}
      disabled={disabled}
      {...rest}
    >{children}</button>
  )
})
