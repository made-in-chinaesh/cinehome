import React from 'react'
import cls from './index.module.scss'
import { Input } from 'components/UI/Input'
import { useForm } from 'react-hook-form'
import { Forms } from 'helpers/Forms'
import { Admin } from 'pages/Admin'
import { Button, ButtonVariants } from 'components/UI/Button'
import { VscChromeClose } from 'react-icons/vsc'

export const AddProductModal = ({
  isActive,
  setIsActive,
  postProduct,
  isLoading,
}) => {
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
      price: +data.price,
      productImg: image,
      title: data.title,
      totalPrice: 0,
      type: data.type,
    }

    setIsActive(false)
    return postProduct(body)
  }

  if (!isActive) return

  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div
        className={cls.container}
        data-aos="fade-up"
      >
        <h2>Добавить продукт</h2>
        <label>
          <span>Тип продукта</span>
          <select
            {...register('type', Forms.Options.SimpleField)}
          >
            <option value="beverages">Напитки</option>
            <option value="hookah">Кальян</option>
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
          {...register('price', {
            required: true,
          })}
        />
        <Input
          type="file"
          label="Картинка продукта"
          {...register('productImage', Forms.Options.SimpleField)}
          onChange={(e) => handleImage(e.target.files)}
        />
        <Button
          disabled={isLoading}
          variant={isLoading ? ButtonVariants.loading : ButtonVariants.blue}
          onClick={handleSubmit(onSubmit)}
        >Добавить</Button>
      </div>
    </div>
  )
}
