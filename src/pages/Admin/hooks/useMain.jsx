import React from 'react'
import { parseJSON } from 'helpers'
import { Admin } from '..'

const useMain = () => {
  const [workers, setWorkers] = React.useState(null)
  const [worker, setWorker] = React.useState(null)
  const [admin, setAdmin] = React.useState(null)

  const getAdmin = () => {
    const request = Admin.API.getAdmin()

    request
      .then(res => {
        const data = res.data
        setAdmin(data)
      })
  }

  const getWorkers = () => {
    const request = Admin.API.getWorkers()

    request
      .then(res => {
        const data = parseJSON(res.data)

        setWorkers(data)
      })
  }

  const getWorker = (id) => {
    const request = Admin.API.getWorker(id)

    request
      .then(res => {
        const data = res.data
        setWorker(data)
      })
  }

  const deleteWorker = (workerId) => {
    const request = Admin.API.deleteWorker(workerId)

    request
      .then(() => getWorkers())
  }

  React.useEffect(() => {
    getAdmin()
    getWorkers()
  }, [])

  return {
    workers,
    admin,
    worker,
    actions: {
      getWorker,
      deleteWorker,
    },
  }
}

export const use = useMain
