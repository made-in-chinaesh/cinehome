import React from 'react'

const useFileReader = () => {
  const [image, setImage] = React.useState(null)

  const imageReader = (file) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = (e) => setImage(e.target.result)
  }

  return {
    image,
    actions: {
      imageReader,
    },
  }
}

export const use = useFileReader
