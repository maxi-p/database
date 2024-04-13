import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DeleteEvent from './DeleteEvent'

const EventDetails = props => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const getEvent = async() => {
            const json = JSON.stringify({ id: id});
            const response = await fetch('api/getEvent', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res)
            setEvent(res.event)
        }
        getEvent();
    },[]);

    const deleteHandler = event => {
        if(event.target.name === 'discard')
            setIsDeleting(false);
        else
            setIsDeleting(true);
    }

    return (
        <div>
            <div className="post-detail-container">
                {isDeleting &&
                <DeleteEvent 
                    className="delete-post-popup"
                    event={event}
                    deleteHandler={deleteHandler}
                />}
                <section className='post-details'>
                    <h1>{event.name}</h1>
                    <div className="card">
                        {props.loggedUser && (props.loggedUser.level==='super_admin' ||  event.contact_username === props.loggedUser.username) && 
                        (<button 
                            className="delete--badge"
                            name="open-delete"
                            onClick={deleteHandler}
                        >
                            <img src="./delete.jpg" className="card--star" />
                        </button>)}
                        <img src={'./calendar.png'} className="card--image" />
                        <div className="card--stats">
                            <img src="./star.png" className="card--star" />
                            <span className="gray"> • </span>
                            <span className="gray">{event.name}</span>
                        </div>
                        <p className="card--title">Contact User (Owner): {event.contact_username}</p>
                        <p className="card--title">Description: {event.description}</p>
                        <p className="card--title">Time: {new Date(event.timestamp).toString()}</p>
                        <p className="card--title">University: {event.university_id}</p>
                        <p className="card--price"><span className="bold">{event.location_id}</span></p>
                    </div>
                </section>
            </div>
        </div>
        )
}

export default EventDetails;
