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
            <Link to={"/eve="+publicEvent.id.toString()} key={publicEvent.name}>
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
            <Link to={"/eve="+privateEvent.id.toString()} key={privateEvent.name}>
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
            <Link to={"/eve="+rsoEvent.id.toString()} key={rsoEvent.name}>
                <Event
                    key={rsoEvent.name}
                    name={rsoEvent.name}
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
                if( res.message !== '' )
                {
                    props.setRsoMessage(res.message);
                }
                else
                {
                    props.setRsoMessage('');

                }
    
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
        )
    });

    const myrsolist = props.myRsos.map(myrso => {
        // console.log(rso)
        return (
                <li key={myrso.name}> 
                    {myrso.name}
                </li>
        )
    });

    return (<div className="post-detail-container">
                <span>{props.rsoMessage}</span>
                <br/><span>Events:</span><br/>
                    <ul>
                        {publicEvents}
                        {privateEvents}
                        {rsoEvents}
                    </ul><br/>
                <span>Rso:</span><br />
                    <ul>
                        {rsolist}
                        {myrsolist}
                    </ul>
            </div>)
};

export default Events;
