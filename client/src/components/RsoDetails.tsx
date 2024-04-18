import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RsoDetails = props => {
    const id  = props.id;
    const [rso, setRso] = useState({});
    const [message, setMessage] = useState('wait');
    const [deleteMessage, setDeleteMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getRso = async() => {
            const json = JSON.stringify({ id: id});
            console.log("id ",id);
            const response = await fetch('/api/getRso', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log('res ',res)
            if(res.message === ''){
              setMessage('')
              setRso(res.rso)
          }
          else{
              setMessage(res.message);
          }
        }
        getRso();
    },[]);

    let parts;
    if(Object.keys(rso).length !== 0){
      parts = rso.participants.map( part =>{
        return (<li key={part}>{part}</li>)
      })
    }

    const leaveHandler = () => {
        const leaveRso = async() => {
            const json = JSON.stringify({ id: id, username: props.loggedUser.username});
            const response = await fetch('/api/leaveRso', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log('res ', res)
            if(res.message === '') {
                setDeleteMessage('')
                navigate('/user-home')
            }
          else{
            setDeleteMessage(res.message);
          }
        }
        leaveRso();
    }

    return (
        <div>
            {message !== '' && <span>{message}</span>}
            {deleteMessage !== '' && <span>{deleteMessage}</span>}
            {message === '' && (<div className="post-detail-container">
                <section className='post-details'>
                    <h1>{rso.name}</h1>
                    <div className="card" style={{fontSize: '20px'}}>
                        <img src={'./rso.png'} className="card--image" />
                        <div className="card--stats">
                            <span className="gray">Owner User: {rso.owner_username}</span>
                        </div>
                        <p className="card--title">Status: {rso.status==='inact'? 'Inactive': 'Active'}</p>
                        {rso.participants.includes(props.loggedUser.username) && <input
                            type="button" 
                            id="leave" 
                            className="buttons" 
                            value="Leave RSO"
                            onClick={leaveHandler}
                        />}
                        <span className="bold">Participants:</span><br/>
                          {parts}  
                    </div>
                </section>
            </div>)}
        </div>
        )
}

export default RsoDetails;
