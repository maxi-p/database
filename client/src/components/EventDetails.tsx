const EventDetails = props => {
    console.log(props.event)
    const myDate = new Date(props.event.timestamp);
    const month = (myDate.getMonth() + 1) < 10 ? '0'+(myDate.getMonth() + 1):(myDate.getMonth() + 1);
    const day = (myDate.getDate()) < 10 ? '0'+(myDate.getDate()):(myDate.getDate());
    return (  
        <section className='post-details'>
            <span className='grand-event-name'>{props.event.name}</span>
            <div className="card" style={{fontSize: '20px'}}>  
                <div>
                    {props.loggedUser && (props.loggedUser.level==='super_admin' ||  props.event.contact_username === props.loggedUser.username) && 
                    (<button 
                        className="delete--badge"
                        name="open-delete"
                        onClick={props.deleteHandler}
                    >
                        <img src="./delete.jpg" className="card--star" />
                    </button>)}
                </div>
                <img src={'./calendar.png'} className="card--image" />  
                <p className="card--title gray">Contact User: {props.event.contact_username}</p>
                <p className="card--title">Description: {props.event.description}</p>
                <p className="card--title">Time: { myDate.getHours()+5+ ":" + '00' + " " + month + "/" + day}</p>
                {props.event.university_id && <p className="card--title">University: {props.event.university_id}</p>}
            </div>
        </section>
        )
}

export default EventDetails;
