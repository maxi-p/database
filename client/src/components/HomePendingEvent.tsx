import React from 'react'

const HomePendingEvent = props => {
    console.log(props.event)
    const myDate = new Date(props.event.timestamp)
    const month = (myDate.getMonth() + 1) < 10 ? '0'+(myDate.getMonth() + 1):(myDate.getMonth() + 1);
    const day = (myDate.getDate()) < 10 ? '0'+(myDate.getDate()):(myDate.getDate());
  return (
    <div className="home-event">
        <div className="event-name">
            {props.event.name}
        </div>
        <div className="event-details">
            Contact: {props.event.contact_username}
        </div>
        <div className="event-details">
            Time: { myDate.getHours()-3 + ":" + '00' + " " + month + "/" + day}
        </div>
        <div style={{textAlign:'center'}}>
            <input
                type="button" 
                id={props.event.id} 
                name={props.event.name}  
                value="accept"
                onClick={props.decideEventRequest}
            />
            <input
                type="button" 
                id={props.event.id} 
                name={props.event.name} 
                value="reject"
                onClick={props.decideEventRequest}
            />
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default HomePendingEvent