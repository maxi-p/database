import React, {useState} from 'react';
import Event from './Event'

const Events = props =>
{   
    console.log(props.loggedUser)
    // console.log(props.publicEvents,props.privateEvents,props.rsoEvents)
    const publicEvents = props.publicEvents.map(publicEvent => {
        // console.log(publicEvent.name)
        return (
            <Event
                key={props.name}
                name={publicEvent.name}
            />
        )
    });

    const privateEvents = props.privateEvents.map(privateEvent => {
        // console.log(privateEvent.name)
        return (
            <Event
                key={props.name}
                name={privateEvent.name}
            />
        )
    });

    const rsoEvents = props.rsoEvents.map(rsoEvent => {
        // console.log(rsoEvent.name)
        return (
            <Event
                key={props.name}
                name={rsoEvent.name}
            />
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
