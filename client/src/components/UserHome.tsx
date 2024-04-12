import React, { useState, useEffect } from 'react';
import Route, {useNavigate} from 'react-router-dom';

const UserHome = props =>
{
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getPendingAdmins = async () => {
            const response = await fetch('api/getPendingAdmins', {method:'POST',body:"{}",headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setRequests(res.pendingAdmins)
        };
        getPendingAdmins();
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

    console.log(props.loggedUser)
    const logOutHandler = () => 
    {
        localStorage.removeItem("user_data")
        props.loggedHandler(null);
        navigate('/login');
    };

    const reqs = requests.map(request => {
        return (
            <li key={request.username}>
                <input
                    type="button" 
                    id="accept" 
                    name={request.username}  
                    value="Accept"
                    onClick={decideRequest}
                />
                <input
                    type="button" 
                    id="reject" 
                    name={request.username} 
                    value="Reject"
                    onClick={decideRequest}
                />
                {" "+request.username}
            </li>
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
      <div id="loggedInDiv">
        <img src='./avatar.png' style={{width:100,height:100}} alt="avatar"></img><br/>
        {props.loggedUser && <span id="userName">{props.loggedUser.firstname} {props.loggedUser.lastname}</span>}<br/>
        {props.loggedUser && props.loggedUser.level === 'student' && (<input
            type="button" 
            id="requestAdmin" 
            className="buttons" 
            value="Request to be Admin"
            onClick={() => requestToBeAdmin()}
        />)}
        <input
            type="button" 
            id="logoutButton" 
            className="buttons" 
            value="Log Out"
            onClick={() => logOutHandler()}
        />
        <span>{message}</span>
        <br/>
        <br/>
        {props.loggedUser && props.loggedUser.level === 'super_admin' && 
        (<ul>
            {reqs}
        </ul>)
        }
      </div>
    );
};

export default UserHome;