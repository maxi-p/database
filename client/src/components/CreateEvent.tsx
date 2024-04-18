import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';
import PublicEventForm from './PublicEventForm';
import PrivateEventForm from './PrivateEventForm';
import RsoEventForm from './RsoEventForm';

const CreateRso = props => 
{
    const navigate = useNavigate();
    const [eventType, setEventType] = useState('public');
    const [formPublic, setFormPublic] = useState({name:'',category:'1',contact_username:'', timestamp:'', description:'', location_name:'', latitude:'',longitude:''});
    const [formPrivate, setFormPrivate] = useState({name:'', university:'', category:'1',contact_username:'', timestamp:'', description:'', location_name:'', latitude:'',longitude:''});
    const [formRSO, setFormRSO] = useState({name:'', rso:'', category:'1',contact_username:'', timestamp:'', description:'', location_name:'', latitude:'',longitude:''});
    const [message,setMessage] = useState('');
    
    const handleType = event => {
        setEventType(event.target.value)
    };

    const handlePublic = (event) => {
        setFormPublic(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    };
    const handlePrivate = (event) => {
        setFormPrivate(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    };
    const setUni = data => {
        setFormPrivate(prevFormData => {
            return {
                ...prevFormData,
                university: data
            }
        })
    };
    const handleRso = (event) => {
        console.log()
        setFormRSO(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    };
    const setRso = data => {
        setFormRSO(prevFormData => {
            return {
                ...prevFormData,
                rso: data
            }
        })
    };

    const setTimestamp = (timestamp1,kind) => {
        if(kind === 'public'){
            setFormPublic(prevFormData => {
                return {
                    ...prevFormData,
                    timestamp: timestamp1
                }
            })
        }
        else if(kind === 'private'){
            setFormPrivate(prevFormData => {
                return {
                    ...prevFormData,
                    timestamp: timestamp1
                }
            }) 
        }
        else if(kind === 'rso'){
            setFormRSO(prevFormData => {
                return {
                    ...prevFormData,
                    timestamp: timestamp1
                }
            }) 
        }
        
    }


    const createEvent = async arg =>
    {
        const formData = arg==='public'? formPublic: arg==='private'? formPrivate: formRSO;
        var json = JSON.stringify({...formData,type: arg});

        try
        {
            const response = await fetch('api/createEvent', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log("new rso",res)
            if( res.message !== '' )
            {
                setMessage(res.message);
            }
            else
            {
                setMessage('');
                navigate('/eve='+res.id);
            }
        }
        catch(e){
            console.log(e);return;
        }
    };

    return(
        <div id="uploadPostDiv">
                <span className="bold" id="inner-title">Enter Your Event Type</span><br />
                <div>
                    <select
                        style={{width: "100px", marginBottom:"10px"}} 
                        id="favColor"
                        value={eventType}
                        onChange={handleType}
                        name="eventType"
                        >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="rso">RSO</option>
                    </select>
                </div>
            {eventType === 'public' && <PublicEventForm loggedUser={props.loggedUser} formPublic={formPublic} setFormPublic={handlePublic} createEvent={createEvent} setTimestamp={setTimestamp}/>}
            {eventType === 'private' && <PrivateEventForm loggedUser={props.loggedUser} formPrivate={formPrivate} setFormPrivate={handlePrivate} createEvent={createEvent} setUni={setUni} setTimestamp={setTimestamp}/>}
            {eventType === 'rso' && <RsoEventForm loggedUser={props.loggedUser} formRso={formRSO} setFormRso={handleRso} createEvent={createEvent} setRso={setRso} setTimestamp={setTimestamp}/>}
            <span id="postResult">{message}</span>
        </div>
    );
}

export default CreateRso;
