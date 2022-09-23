import React from 'react'
import cls from './index.module.scss'
import { Button, ButtonVariants } from 'components/UI/Button'
import { Input } from 'components/UI/Input'
import { Forms } from 'helpers/Forms'
import { Admin } from 'pages/Admin'
import { useForm } from 'react-hook-form'
import { VscChromeClose } from 'react-icons/vsc'

export const AddRoomModal = ({
  isActive,
  setIsActive,
  postRoom,
  isLoading,
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


  const onSubmit = () => {
    const body = {
      isActive: false,
      roomImage: image,
    }
    setIsActive(false)
    return postRoom(body)
  }

  const handleImage = (value) => {
    imageReader(value[0])
  }

  if (!isActive) return

  return (
    <div className={cls.root}>
      <VscChromeClose onClick={() => setIsActive(false)} />
      <div className={cls.modalOverlay} onClick={() => setIsActive(false)} />
      <div className={cls.container} data-aos="fade-up">
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
