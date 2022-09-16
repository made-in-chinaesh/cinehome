import { Button, ButtonVariants } from 'components/UI/Button'
import { Input } from 'components/UI/Input'
import { Forms } from 'helpers/Forms'
import { Admin } from 'pages/Admin'
import React from 'react'
import { useForm } from 'react-hook-form'
import { VscChromeClose } from 'react-icons/vsc'
import cls from './index.module.scss'

export const AddRoomModal = ({
  isActive,
  setIsActive,
  getRooms,
}) => {
  const {
    register,
    handleSubmit,
  } = useForm()

  const {
    image,
    actions: {
      imageReader,
    },
  } = Admin.Hook.FileReader.use()


  const [isLoading, setIsLoading] = React.useState(false)


  const addRoom = (body) => {
    const request = Admin.API.addRoom(body)

    setIsLoading(true)
    request
      .then(res => {
        const data = res.data

        if (!data) return

        setIsActive(false)
        getRooms()
      })
      .finally(() => setIsLoading(false))
  }

  const onSubmit = (data) => {
    const body = {
      isActive: false,
      roomImage: image,
    }

    return addRoom(body)
  }

  const handleImage = (value) => {
    imageReader(value[0])
  }

  if (!isActive) return

  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div className={cls.container}>
        <h2>Add Room</h2>
        <Input
          type="file"
          label="Добавьте фотку"
          {...register('roomImage', Forms.Options.SimpleField)}
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
