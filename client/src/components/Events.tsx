import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Event from './Event'
import HomeEvent from './HomeEvent'

const Events = props =>
{   
    console.log(props.loggedUser)
    // console.log(props.publicEvents,props.privateEvents,props.rsoEvents)
    const publicEvents = props.publicEvents.map(publicEvent => {
        // console.log(publicEvent.name)
        return (
            <Link to={"/eve="+publicEvent.id.toString()} key={publicEvent.name}>
                <HomeEvent 
                    event={publicEvent}
                />
            </Link>
        )
    });
    

    const privateEvents = props.privateEvents.map(privateEvent => {
        // console.log(privateEvent.name)
        return (
            <Link to={"/eve="+privateEvent.id.toString()} key={privateEvent.name}>
                <HomeEvent 
                    event={privateEvent}
                />
            </Link>
        )
    });
    console.log(props.privateEvents)
    console.log(props.publicEvents)

    const rsoEvents = props.rsoEvents.map(rsoEvent => {
        // console.log(rsoEvent.name)
        return (
            
            <Link to={"/eve="+rsoEvent.id.toString()} key={rsoEvent.name}>
                <HomeEvent 
                    event={rsoEvent}
                />
            </Link>
        )
    });

    const joinHandler = async event => 
        {
            event.preventDefault();
            var json = JSON.stringify({id: event.target.id, username: props.loggedUser.username});
    
            try
            {
                const response = await fetch('api/joinRso', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
                var res = JSON.parse(await response.text());
                console.log("join result",res)
                props.setRsoMessage(res.message);
            }
            catch(e){
                console.log(json)
                alert(e.toString());
                return;
            }
        };
    
    const rsolist = props.rsos.map(rso => {
        // console.log(rso)
        return (
                <Link to={"/rso="+rso.id.toString()} key={rso.id}>
                    <li key={rso.name}> 
                        <input
                            type="button" 
                            id={rso.id} 
                            className="buttons" 
                            value="Join"
                            onClick={joinHandler}
                            />
                        {rso.name}
                    </li>
                </Link>
        )
    });

    const myrsolist = props.myRsos.map(myrso => {
        // console.log(rso)
        return (
            <Link to={"/rso="+myrso.id.toString()} key={myrso.id}>
                <li key={myrso.name}> 
                    {myrso.name}
                </li>
            </Link>
        )
    });

    return (<div className="post-detail-container">
                <div className="body-posts">
                    <span>{props.rsoMessage}</span>
                    <span className="events-span">Events:</span>
                    <div className="eventContainer">
                        {publicEvents}
                        {privateEvents}
                        {rsoEvents}
                    </div>
                </div>
            </div>)
};

export default Events;
