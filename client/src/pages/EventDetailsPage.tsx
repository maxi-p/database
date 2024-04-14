import React, { useEffect, useState } from 'react'
import DeleteEvent from '../components/DeleteEvent'
import EventDetails from '../components/EventDetails'
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const EventDetailsPage = props => {
    const id  = props.id;
    const [event, setEvent] = useState({});
    const [allComments, setAllComments] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const getEvent = async() => {
            console.log("iddd",id)
            const json = JSON.stringify({ id: id});
            const response = await fetch('api/getEvent', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res)
            setEvent(res.event)
        }
        getEvent();
    },[]);

    const deleteHandler = event => {
        if(event.target.name === 'discard')
            setIsDeleting(false);
        else
            setIsDeleting(true);
    }

    const commentHandler = data => {
        setAllComments(data)
    }

    return (
        <div>
            <div className="post-detail-container">
                {isDeleting &&
                <DeleteEvent 
                    className="delete-post-popup"
                    event={event}
                    deleteHandler={deleteHandler}
                />}
                <EventDetails event={event} loggedUser={props.loggedUser} deleteHander={deleteHandler}/>
                <CommentList loggedUser={props.loggedUser} id={id} allComments={allComments}/>
                <CommentForm loggedUser={props.loggedUser} id={id} setAllComments={commentHandler}/>
            </div>
        </div>
        )
}

export default EventDetailsPage;
