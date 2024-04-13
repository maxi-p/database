import React, { useState, useEffect } from 'react';

const Filter = props =>
{
    console.log(props.loggedUser)
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState(
        {
            public: true,
            private: true,
            rso: true,
            username: props.loggedUser.username
        }
    );

    useEffect(() => {
        const getAllEvents = async () => {
            const json = JSON.stringify(formData);
            const response = await fetch('api/getEvents', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res)
            if(res.message === ''){
                setMessage('')
                props.setPublicEvents(res.public_event);
                props.setPrivateEvents(res.private_event);
                props.setRsoEvents(res.rso_event);
            }
            else{
                setMessage(res.message);
            }
        };
        getAllEvents();
    },[])

    const handleChange = (event) => { 
        const {name, checked} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: checked
            }
        } )
    }

    const submitHandler = async event => {
        event.preventDefault();
        console.log(formData)
        const json = JSON.stringify(formData);
        const response = await fetch('api/getEvents', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        if(res.message === ''){
            setMessage('')
            props.setPublicEvents(res.public_event);
            props.setPrivateEvents(res.private_event);
            props.setRsoEvents(res.rso_event);
        }
        else
            setMessage(res.message)
    }

    // 5 15 84 1

    return(
        <div>
            <form onSubmit={submitHandler}>
                <input 
                    type="checkbox" 
                    id="public" 
                    name="public"
                    checked={formData.public}
                    onChange={handleChange}
                />
                <label htmlFor="public"> public</label>
                <input 
                    type="checkbox" 
                    id="private" 
                    name="private"
                    checked={formData.private}
                    onChange={handleChange}
                />
                <label htmlFor="private"> private </label>
                <input 
                    type="checkbox" 
                    id="rso" 
                    name="rso"
                    checked={formData.rso}
                    onChange={handleChange}
                />
                <label htmlFor="rso"> rso </label><br/>
                <button>Search</button>
                <span>{message}</span><br/>
            </form>
        </div>
    );
};

export default Filter;
