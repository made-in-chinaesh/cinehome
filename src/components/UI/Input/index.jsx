import React from 'react'
import cls from './index.module.scss'

export const Input = React.forwardRef(({
  label,
  type = 'text',
  error,
  placeholder,
  ...rest
}, ref) => {
  return (
    <div className={cls.root}>
      <label>
        <span>{label}</span>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
      </label>
      <span className={cls.error}>{error}</span>
    </div>
  )
})
