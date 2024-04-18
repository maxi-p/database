import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Event from './Event'
import HomeEvent from './HomeEvent'
import HomeRSO from './HomeRSO';

const Events = props =>
{   
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
                    <HomeRSO
                        rso={rso}
                        join={true}
                        joinHandler={joinHandler}
                        index={rso.id}
                    />
                    {/* <li key={rso.name}> 
                        <input
                            type="button" 
                            id={rso.id} 
                            className="buttons" 
                            value="Join"
                            onClick={joinHandler}
                            />
                        {rso.name}
                    </li> */}
                </Link>
        )
    });

    const myrsolist = props.myRsos.map(myrso => {
        // console.log(rso)
        return (
            <Link to={"/rso="+myrso.id.toString()} key={myrso.id}>
                <HomeRSO
                    rso={myrso}
                />
            </Link>
        )
    });

    return (<div className="post-detail-container">
                <div className="body-posts">
                    <span>{props.rsoMessage}</span>
                    <span className="events-span">Rso:</span>
                    <div className="eventContainer">
                            {rsolist}
                            {myrsolist}
                    </div>
                </div>
            </div>)
};

export default Events;
