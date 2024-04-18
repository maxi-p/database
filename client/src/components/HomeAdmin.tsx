

const HomeAdmin = props => {
  return (
    <div className="home-event">
        <div className="event-name">
            {props.request.username}
        </div>
        <div style={{display:"flex",justifyContent:'center',marginTop:'10px'}}>
            <div className="event-details">
                <input
                    type="button" 
                    id="accept" 
                    name={props.request.username}  
                    value="Accept"
                    onClick={props.decideRequest}
                    />
            </div>
            <div className="event-details">
                <input
                    type="button" 
                    id="reject" 
                    name={props.request.username} 
                    value="Reject"
                    onClick={props.decideRequest}
                    />
            </div>
        </div>
    </div>
  )
}

export default HomeAdmin