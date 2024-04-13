import React, { useEffect, useState } from 'react'

const RsoDetails = props => {
    const id  = props.id;
    const [rso, setRso] = useState({});
    const [message, setMessage] = useState('wait');

    useEffect(() => {
        const getRso = async() => {
            const json = JSON.stringify({ id: id});
            console.log("id ",id)
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

    return (
        <div>
            {message !== '' && <span>{message}</span>}
            {message === '' && (<div className="post-detail-container">
                <section className='post-details'>
                    <h1>{rso.name}</h1>
                    <div className="card">
                        <img src={'./rso.png'} className="card--image" />
                        <div className="card--stats">
                            <img src="./star.png" className="card--star" />
                            <span className="gray"> • </span>
                            <span className="gray">{rso.name}</span>
                        </div>
                        <p className="card--title">Owner User: {rso.owner_username}</p>
                        <p className="card--title">Status: {rso.status}</p>
                        <p className="card--price"><span className="bold">Participants:</span></p><br/>
                        <ul>
                          {parts}  
                        </ul>
                    </div>
                </section>
            </div>)}
        </div>
        )
}

export default RsoDetails;
