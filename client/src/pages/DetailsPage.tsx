import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EventDetails from '../components/EventDetails';
import RsoDetails from '../components/RsoDetails';

const DetailsPage = props => {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log("param ",id)
    const newId = id?.slice(4)
    // console.log(newId)
    let component;
    if(id?.includes("rso")){
        component = <RsoDetails loggedUser={props.loggedUser} id={newId}/>
    }
    else if(id?.includes("eve")){
        component = <EventDetails loggedUser={props.loggedUser} id={newId}/>
    }
    else{
        console.log("yes")
        navigate('/login');
    }
    
    return (<div>
                {component}
            </div>)
}

export default DetailsPage;
