import React from 'react'
import cls from './Timer.module.scss'
import { useTimer } from 'react-timer-hook'

export const Timer = ({ setTime }) => {
  const time = new Date()
  time.setMinutes(time.getMinutes() + setTime)

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => console.warn('onExpire called'),
  })


  return (
    <div className={cls.root}>
      <div className={cls.container}>
        <p>Timer</p>
        <h2>{hours}:{minutes}:{seconds}</h2>
        <p>{isRunning ? 'Running' : 'Not running'}</p>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
        <button onClick={() => {
          restart()
        }}>Restart</button>
      </div>
    </div>
  )
}
