import React from 'react'
import VanillaTilt from 'vanilla-tilt'

export const Tilt = ({
  rest,
  children,
}) => {
  const tilt = React.useRef(null)

  const options = {
    scale: 1.05,
    speed: 300,
    max: 30,
  }

  React.useEffect(() => {
    VanillaTilt.init(tilt.current, options)
  }, [options])

  return <div ref={tilt} {...rest}>{children}</div>
}
