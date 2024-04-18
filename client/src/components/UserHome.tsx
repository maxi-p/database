import React, { useState, useEffect } from 'react';
import Route, {Link, useNavigate} from 'react-router-dom';
import HomeRSO from './HomeRSO';
import HomeAdmin from './HomeAdmin';
import HomePendingEvent from './HomePendingEvent';

const UserHome = props =>
{
    const navigate = useNavigate();
    const [selectedWindow, setSelectedWindow] = useState('rsos');
    const [message, setMessage] = useState("");
    const [requests, setRequests] = useState([]);
    const [pendingEvents, setPendingEvents] = useState([]);
    const [rsoList, setRsoList] = useState([]);

    const windowHandler = event => {
        setSelectedWindow(event.target.id);
    }
    useEffect(() => {
        const getPendingAdmins = async () => {
            const response = await fetch('api/getPendingAdmins', {method:'POST',body:"{}",headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setRequests(res.pendingAdmins)
        };
        getPendingAdmins();
    },[message])

    useEffect(() => {
        const getPendingAdmins = async () => {
            const response = await fetch('api/getPendingEvents', {method:'POST',body:"{}",headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setPendingEvents(res.pendingEvents)
        };
        getPendingAdmins();
    },[message])

    useEffect(() => {
        const getRsos = async () => {
            const json = JSON.stringify({username: props.loggedUser.username});
            const response = await fetch('api/getRsos', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);
            setRsoList(res.rsos);
        };
        getRsos();
    },[message])

    const decideRequest = async event => {
        event.preventDefault();
        const obj = { 
            decision: event.target.id,
            username: event.target.name
        }

        var json = JSON.stringify(obj);
        try
        {
            const response = await fetch('api/decidePending', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setMessage(res.message);
        }
        catch(e){
            alert(e.toString());
            console.log(e.toString());
            return;
        }
    };

    const decideEventRequest = async event => {
        event.preventDefault();
        const obj = { 
            decision: event.target.value,
            id: event.target.id,
            name: event.target.name
        }

        var json = JSON.stringify(obj);
        try
        {
            const response = await fetch('api/decidePendingEvent', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setMessage(res.message);
        }
        catch(e){
            alert(e.toString());
            console.log(e.toString());
            return;
        }
    };

    console.log(props.loggedUser)
    const logOutHandler = () => 
    {
        localStorage.removeItem("user_data")
        props.loggedHandler(null);
        navigate('/login');
    };

    const rsos = rsoList.map(rso => {
        return (
            <Link to={"/rso="+rso.id.toString()} key={rso.id}>
                <HomeRSO
                    rso={rso}
                />
            </Link>
        )
    });

    const reqs = requests.map(request => {
        return (
            <HomeAdmin
                request={request}
                decideRequest={decideRequest}
            />
        )
    });

    const eventReqs = pendingEvents.map(request => {
        return (
                <HomePendingEvent
                    decideEventRequest={decideEventRequest}
                    event={request}
                />
        )
    });

    const requestToBeAdmin = async () =>
    {
        console.log(props.loggedUser)
        var json = JSON.stringify({username: props.loggedUser.username, university: props.loggedUser.university, level: props.loggedUser.level});
        const response = await fetch('api/requestToBeAdmin', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        setMessage(res.message);
    };

    return(
        <div className="loggedInDiv" style={{marginTop: '15px'}}>
            <div className='profile-top-section'>
                <div className='top-holder-section'>
                    <div className='avatar-section'>
                        <div className='profile-avatar'>
                            <img  src='./avatar.png' alt="avatar"></img>
                        </div>
                        <span className='username'>{props.loggedUser.username}</span>    
                    </div>
                    <div className='details-section'>
                        <section className='user-info'>
                            <div className="userDetails">
                                <div className="card--stats">
                                </div>
                                <p className="userprofile-name">{props.loggedUser.firstname} {props.loggedUser.lastname}</p>
                                <p className="card--title">LEVEL: {props.loggedUser.level}</p>
                                <p className="card--title">Email: {props.loggedUser.email}</p>
                                <p className="card--title">Phone: {props.loggedUser.phone}</p>
                                <span>{message}</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            {props.loggedUser && 
            <div className='profile-buttons-section'>
                <div className='button-holder-section'>
                    <div className='profile-button'>
                        <input
                            type="button"
                            id="rsos"
                            className="buttons"
                            value="My RSOs"
                            onClick={windowHandler}
                        />
                    </div>
                    {props.loggedUser.level === 'super_admin' && 
                    <div className='profile-button'>
                        <input
                            type="button"
                            id="admins"
                            className="buttons"
                            value="Pending Admin Requests"
                            onClick={windowHandler}
                        />
                    </div>}
                    {props.loggedUser.level === 'super_admin' && 
                    <div className='profile-button'>
                        <input
                            type="button"
                            id="events"
                            className="buttons"
                            value="Pending RSO Events"
                            onClick={windowHandler}
                        />
                    </div>}
                    {props.loggedUser.level === 'student' &&
                    <div className='profile-button'>
                        <input
                            type="button"
                            id="request"
                            className="buttons"
                            value="Request to be Admin"
                            onClick={() => requestToBeAdmin()}
                        />
                    </div>}
                </div>
            </div>}
            {props.loggedUser && 
            <div className='profile-posts-section'>
                <div className='posts-holder-section'>
                    <span className='name-of-post-type'>
                        {selectedWindow === 'events' && "Pending Public Event Requests:"}
                        {selectedWindow === 'admins' && 'Pending Admin Requests'}
                        {selectedWindow === 'rsos' && 'My RSOs'}
                    </span>
                    <div className='loaded-posts-section'>                   
                        <div className="post-detail-container">
                            <div className='home-post-holder-flex'>
                                {selectedWindow === 'events' && 
                                 (
                                    <div className="post-detail-container">
                                    <div className="body-posts">
                                        <div className="eventContainer">
                                                {eventReqs}
                                        </div>
                                    </div>
                                </div>
                                )}
                                {selectedWindow === 'admins' && (
                                    <div className="post-detail-container">
                                    <div className="body-posts">
                                        <div className="eventContainer">
                                                {reqs}
                                        </div>
                                    </div>
                                </div>
                                )}
                                {selectedWindow === 'rsos' && (
                                    <div className="post-detail-container">
                                        <div className="body-posts">
                                            <div className="eventContainer">
                                                    {rsos}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default UserHome;