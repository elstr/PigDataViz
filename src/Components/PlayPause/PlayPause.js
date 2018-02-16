import React from 'react'
import './style.css'

const PlayPause = props => {
  const {
    onClick,
    text,
    className
  } = props
  return (
    <div>
      <button className={className} onClick={onClick}>{text}</button>
    </div>
  )
}

export default PlayPause
