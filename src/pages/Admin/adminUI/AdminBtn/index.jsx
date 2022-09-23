import React from 'react'
import cls from './index.module.scss'
const AdminBtn = ({ onClick, children, isDelete = false }) => {
  return (
    <div onClick={onClick} className={isDelete ? cls.deleteBtn : cls.btn}>
      {children}
    </div>
  )
}

export default AdminBtn
