export const parseJSON = (data) => {
  if (!data) return
  return Object
    .entries(data)
    .map(([key, value]) => {
      return {
        ...value,
        key: key,
      }
    })
}

