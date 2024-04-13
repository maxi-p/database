import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const DeleteEvent = props => {
    const navigate = useNavigate();
    const [message,setMessage] = useState('');

    const doDelete = async event =>
    {
        event.preventDefault();
        var json = JSON.stringify({...props.event.id});

        try
        {
            const response = await fetch('api/deleteEvent', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Event wasn\'t deleted');
            }
            else
            {
                setMessage('');
                navigate('/');
            }

        }
        catch(e){
            console.log(json)
            alert(e.toString());
            return;
        }
    };
  return (
    <div id="editPostDiv">
            <form onSubmit={doDelete}>
                <span id="inner-title">Are You Sure You Want to Delete this Event?</span><br />
                <br/>
                <input 
                    type="submit" 
                    value = "Yes, Detele!"
                    id="saveButton" 
                    className="buttons"  
                />
                <input 
                    type="button" 
                    value = "Discard"
                    id="saveButton" 
                    name="discard"
                    className="buttons"
                    onClick={props.deleteHandler}  
                />
            </form>
            <span id="postResult">{message}</span>
        </div>
  )
}

export default DeleteEvent;