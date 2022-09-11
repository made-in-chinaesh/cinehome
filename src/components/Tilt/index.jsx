import React from 'react'
import VanillaTilt from 'vanilla-tilt'

export const Tilt = ({
  options,
  rest,
  children,
}) => {
  const tilt = React.useRef(null)

  React.useEffect(() => {
    VanillaTilt.init(tilt.current, options)
  }, [options])

  return <div ref={tilt} {...rest}>{children}</div>
}
