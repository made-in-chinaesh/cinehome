import React from 'react'
import { useForm } from 'react-hook-form'

export const RegisterWorker = () => {
  const {
    register,
    formState: {
      errors,
    },

  } = useForm()

  return (
    <div>
      <h2>Register Worker!</h2>
    </div>
  )
}
