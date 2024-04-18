import React from 'react'
import SelectTime from './SelectTime';

const PublicEventForm = props => {
    // {name:'',category:'',contact_username:'', timestamp:'', description:'', location_name:'', latitude:'',longitude:''}
    return (<div>
                <form className='uploadPostInner' onSubmit={event => {
                    event.preventDefault();
                    props.createEvent('public')}
                }>
                <input
                    type="text"
                    placeholder="Event Name"
                    name="name"
                    value={props.formPublic.name}
                    onChange={props.setFormPublic}
                /><br/>
                <select 
                    id="category"
                    value={props.formPublic.category}
                    onChange={props.setFormPublic}
                    name="category"
                >
                    <option value="1">Social</option>
                    <option value="2">Fundraising</option>
                    <option value="3">Tech Talk</option>
                </select><br/>
                <input
                    type="text"
                    placeholder="Contact Username"
                    onChange={props.setFormPublic}
                    name="contact_username"
                    value={props.formPublic.contact_username}
                /><br/>
                <SelectTime 
                    setForm={props.setFormPublic}
                    setTimestamp={props.setTimestamp}
                    kind='public'
                />
                <br/>
                <input
                    type="text"
                    placeholder="Description"
                    onChange={props.setFormPublic}
                    name="description"
                    value={props.formPublic.description}
                /><br/>
                <input
                    type="text"
                    placeholder="Location Name"
                    onChange={props.setFormPublic}
                    name="location_name"
                    value={props.formPublic.location_name}
                /><br/>
                <input
                    type="text"
                    placeholder="Latitude"
                    onChange={props.setFormPublic}
                    name="latitude"
                    value={props.formPublic.latitude}
                /><br/>
                <input
                    type="text"
                    placeholder="Longitude"
                    onChange={props.setFormPublic}
                    name="longitude"
                    value={props.formPublic.longitude}
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

export default PublicEventForm;
