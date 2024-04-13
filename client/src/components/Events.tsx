import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Event from './Event'

const Events = props =>
{   
    console.log(props.loggedUser)
    // console.log(props.publicEvents,props.privateEvents,props.rsoEvents)
    const publicEvents = props.publicEvents.map(publicEvent => {
        // console.log(publicEvent.name)
        return (
            <Link to={publicEvent.id.toString()} key={publicEvent.name}>
                <Event
                    key={publicEvent.name}
                    name={publicEvent.name}    
                />
            </Link>
        )
    });

    const privateEvents = props.privateEvents.map(privateEvent => {
        // console.log(privateEvent.name)
        return (
            <Link to={privateEvent.id.toString()} key={privateEvent.name}>
                <Event
                    key={privateEvent.name}
                    name={privateEvent.name}
                />
            </Link>
        )
    });

    const rsoEvents = props.rsoEvents.map(rsoEvent => {
        // console.log(rsoEvent.name)
        return (
            <Link to={rsoEvent.id.toString()} key={rsoEvent.name}>
                <Event
                    key={rsoEvent.name}
                    name={rsoEvent.name}
                />
            </Link>
        )
    });

    return (<div className="post-detail-container">
            <span>Events:</span><br /><br />
            <section className="posts-list">
                <ul>
                    {publicEvents}
                    {privateEvents}
                    {rsoEvents}
                </ul>
            </section>
        </div>)
};

export default Events;
