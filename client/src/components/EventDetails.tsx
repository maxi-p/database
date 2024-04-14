const EventDetails = props => {
    return (  
        <section className='post-details'>
            <h1>{props.event.name}</h1>
            <div className="card">
                {props.loggedUser && (props.loggedUser.level==='super_admin' ||  props.event.contact_username === props.loggedUser.username) && 
                (<button 
                    className="delete--badge"
                    name="open-delete"
                    onClick={props.deleteHandler}
                >
                    <img src="./delete.jpg" className="card--star" />
                </button>)}
                <img src={'./calendar.png'} className="card--image" />
                <div className="card--stats">
                    <img src="./star.png" className="card--star" />
                    <span className="gray"> • </span>
                    <span className="gray">{props.event.name}</span>
                </div>
                <p className="card--title">Contact User (Owner): {props.event.contact_username}</p>
                <p className="card--title">Description: {props.event.description}</p>
                <p className="card--title">Time: {new Date(props.event.timestamp).toString()}</p>
                <p className="card--title">University: {props.event.university_id}</p>
                <p className="card--price"><span className="bold">{props.event.location_id}</span></p>
            </div>
        </section>
        )
}

export default EventDetails;
