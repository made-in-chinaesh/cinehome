import React from 'react'
import cls from './index.module.scss'
import { Input } from 'components/UI/Input'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import { Admin } from 'pages/Admin'
import { Button, ButtonVariants } from 'components/UI/Button'

export const AddProductsModal = ({ isActive, setIsActive }) => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm()

  const {
    image,
    actions: {
      imageReader,
    },
  } = Admin.Hook.FileReader.use()


  const handleImage = (value) => {
    imageReader(value[0])
  }

  const onSubmit = (data) => {
    const body = {
      count: 0,
      price: data.price,
      productImage: image,
      title: data.title,
      totalPrice: 0,
      type: data.type,
    }
    console.log(body)
  }

  if (!isActive) return

  return (
    <div className={cls.root}>
      <div className={cls.container}>
        <h2 onClick={() => setIsActive(false)}>Добавить продукт</h2>
        <label>
          <span>Тип продукта</span>
          <select
            {...register('type', Forms.Options.SimpleField)}
          >
            <option value="bevarages">Напитки</option>
            <option value="hookas">Кальян</option>
            <option value="snacks">Закуски</option>
          </select>
        </label>
        <Input
          label="Название"
          placeholder="Введите название продукта"
          {...register('title', Forms.Options.SimpleField)}
        />
        <Input
          label="Цена"
          type="number"
          placeholder="Введите цену продукта"
          {...register('price', Forms.Options.SimpleField)}
        />
        <Input
          type="file"
          label="Картинка продукта"
          {...register('productImage', Forms.Options.SimpleField)}
          onChange={(e) => handleImage(e.target.files)}
        />
        <Button
          // variant={isLoading ? ButtonVariants.loading : ButtonVariants.blue}
          onClick={handleSubmit(onSubmit)}
        >Добавить</Button>
      </div>
    </div>
  )
}
