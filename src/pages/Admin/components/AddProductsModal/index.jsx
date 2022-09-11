import React from 'react'
import { useForm } from 'react-hook-form'

export const AddProductsModal = ({ active, setIsActive }) => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm()

  return (
    <div>

    </div>
  )
}
