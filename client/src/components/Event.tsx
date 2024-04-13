import React from 'react'

const Event = props => {
  return (
    <li key={props.name} >{props.name}</li>
  )
}

export default Event
