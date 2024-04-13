import React, { useEffect, useState } from 'react'

const RsoEventForm = props => {
    const [rsoList, setRsoList] = useState([]);
    
    useEffect(() => {
        const getRsos = async () => {
            const json = JSON.stringify({username: props.loggedUser.username});
            const response = await fetch('api/getRsos', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);
            setRsoList(res.rsos);
            props.setRso(res.rsos[0].id)
        };
        getRsos();
    },[]);

    const rsos = rsoList.map(rso => {
        return (
                <option 
                    key={rso.id} 
                    value={rso.id}
                >
                    {rso.name}
                </option>
        )
    });


    return (<div>
        <form onSubmit={event => {
            event.preventDefault();
            props.createEvent('rso')}
        }>
            <input
                type="text"
                placeholder="Event Name"
                onChange={props.setFormRso}
                name="name"
                value={props.formRso.name}
            /><br/>
            <select
                id="category"
                value={props.formRso.category}
                onChange={props.setFormRso}
                name="category"
            >
                <option value="1">Social</option>
                <option value="2">Fundraising</option>
                <option value="3">Tech Talk</option>
            </select><br/>
            <select
                id="rso"
                value={props.formRso.rso}
                onChange={props.setFormRso}
                name="rso"
            >
                {rsos}
            </select><br/>
            <input
                type="text"
                placeholder="Contact Username"
                onChange={props.setFormRso}
                name="contact_username"
                value={props.formRso.contact_username}
            /><br/>
            <input
                type="text"
                placeholder="Timestamp"
                onChange={props.setFormRso}
                name="timestamp"
                value={props.formRso.timestamp}
            /><br/>
            <input
                type="text"
                placeholder="Description"
                onChange={props.setFormRso}
                name="description"
                value={props.formRso.description}
            /><br/>
            <input
                type="text"
                placeholder="Location Name"
                onChange={props.setFormRso}
                name="location_name"
                value={props.formRso.location_name}
            /><br/>
            <input
                type="text"
                placeholder="Latitude"
                onChange={props.setFormRso}
                name="latitude"
                value={props.formRso.latitude}
            /><br/>
            <input
                type="text"
                placeholder="Longitude"
                onChange={props.setFormRso}
                name="longitude"
                value={props.formRso.longitude}
            /><br/>
            <input 
                type="submit" 
                value = "Create Event"
                id="createButton" 
                className="buttons"   
            />
        </form>
    </div>)
}

export default RsoEventForm;
