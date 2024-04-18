import React from 'react'

const HomeEvent = props => {
    console.log(props.rso)
  return (
    <div className="home-rso">
        <div className="event-name">
            {props.rso.name}
        </div>
        <div className="event-details">
            Owner: {props.rso.owner_username}
        </div>
        <div className="event-details">
            Status: { props.rso.status === 'active'? "Active": "Inactive" }
        </div>
        { props.join && <div className="input-join-rso">
            <button
                type="button" 
                id={props.index} 
                className="buttons" 
                onClick={props.joinHandler}
            >Join</button>
        </div>}
    </div>
  )
}

export default HomeEvent