import React from 'react'
import './style.css'

const PlayPause = props => {
  const {
    onClick,
    text,
    className
  } = props
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}

export default PlayPause
