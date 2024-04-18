import React, { useState, useEffect } from 'react'
import SelectTime from './SelectTime';

const PrivateEventForm = props => {
    const [universities, setUniversities] = useState([]);
    useEffect(() => {
        const getUniversities = async () => {
            const response = await fetch('api/getUniversities', {method:'POST',body:"{}",headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setUniversities(res.universities)
            props.setUni(res.universities[0].id)
        };
        getUniversities();
    },[]);

    const unis = universities.map(uni => {
        return (
            <option key={uni.id} value={uni.id}>{uni.name}</option>
        )
    });

    return (<div>
                <form
                className='uploadPostInner'
                onSubmit={event => {
                    event.preventDefault();
                    props.createEvent('private')}
                }>
                    <input
                        type="text"
                        placeholder="Event Name"
                        onChange={props.setFormPrivate}
                        name="name"
                        value={props.formPrivate.name}
                    /><br/>
                    <select
                        id="category"
                        value={props.formPrivate.category}
                        onChange={props.setFormPrivate}
                        name="category"
                    >
                        <option value="1">Social</option>
                        <option value="2">Fundraising</option>
                        <option value="3">Tech Talk</option>
                    </select><br/>
                    <select
                        id="university"
                        value={props.formPrivate.university}
                        onChange={props.setFormPrivate}
                        name="university"
                    >
                        {unis}
                    </select><br/>
                    <input
                        type="text"
                        placeholder="Contact Username"
                        onChange={props.setFormPrivate}
                        name="contact_username"
                        value={props.formPrivate.contact_username}
                    /><br/>
                    <SelectTime 
                        setForm={props.setFormPrivate}
                        setTimestamp={props.setTimestamp}
                        kind='private'
                    /><br/>
                    <input
                        type="text"
                        placeholder="Description"
                        onChange={props.setFormPrivate}
                        name="description"
                        value={props.formPrivate.description}
                    /><br/>
                    <input
                        type="text"
                        placeholder="Location Name"
                        onChange={props.setFormPrivate}
                        name="location_name"
                        value={props.formPrivate.location_name}
                    /><br/>
                    <input
                        type="text"
                        placeholder="Latitude"
                        onChange={props.setFormPrivate}
                        name="latitude"
                        value={props.formPrivate.latitude}
                    /><br/>
                    <input
                        type="text"
                        placeholder="Longitude"
                        onChange={props.setFormPrivate}
                        name="longitude"
                        value={props.formPrivate.longitude}
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

export default PrivateEventForm;
