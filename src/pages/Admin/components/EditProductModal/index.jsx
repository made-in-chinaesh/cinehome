import React from 'react'
import cls from './index.module.scss'
import { Button, ButtonVariants } from 'components/UI/Button'
import { Input } from 'components/UI/Input'
import { useForm } from 'react-hook-form'
import { VscChromeClose } from 'react-icons/vsc'
import { Forms } from 'helpers/Forms'
import { Admin } from 'pages/Admin'

export const EditProductModal = ({
  isActive,
  setIsActive,
  product,
  getProducts,
}) => {
  const {
    image,
    actions: {
      imageReader,
    },
  } = Admin.Hook.FileReader.use()

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm()

  const [isLoading, setIsLoading] = React.useState(false)

  const handleImage = (value) => {
    imageReader(value[0])
  }

  const editProduct = (body) => {
    const request = Admin.API.editProduct(body.type, body.key, body)
    setIsLoading(true)
    request
      .then(() => {
        setIsActive(false)
        getProducts()
      })
      .finally(() => setIsLoading(false))
  }

  const onSubmit = (data) => {
    const body = {
      ...product,
      title: data.title,
      price: data.price,
      productImg: image,
    }

    return editProduct(body)
  }

  React.useEffect(() => {
    if (!isActive) return

    reset(product)
  }, [])


  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div className={cls.container}>
        <h2>Изменить продукт</h2>
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
          {...register('productImg', Forms.Options.SimpleField)}
          onChange={(e) => handleImage(e.target.files)}
        />
        <Button
          disabled={isLoading}
          variant={isLoading ? ButtonVariants.loading : ButtonVariants.blue}
          onClick={handleSubmit(onSubmit)}
        >Изменить</Button>
      </div>
    </div>
  )
}
