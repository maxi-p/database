import { useEffect, useState } from 'react';
import Comment from './Comment'
import { CommentEditingForm } from './CommentEditingForm';

const CommentList = props =>
{  
    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState(false);
    const [newText, setNewText] = useState('');
    const [commentIndex, setCommentIndex] = useState(-1);
    const [editingComment, setEditingComment] = useState({})

    const deleteComment = async event => {
        event.preventDefault();
            var json = JSON.stringify({id: props.allComments[event.target.id].id});
            try
            {
                const response = await fetch('api/deleteComment', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
                var res = JSON.parse(await response.text());
                console.log(res);
                var newComments = [];
                props.allComments.map(comment =>{
                    if(comment.id !== props.allComments[event.target.id].id)
                        newComments.push(comment)
                })
                props.setAllComments(newComments);

            }
            catch(e){
                console.log(e.toString());
                return;
            }
    }

    const turnOnEditing = event => {
        setIsEditing(true);
        setCommentIndex(event.target.id)
        setEditingComment(props.allComments[event.target.id])
    }

    const turnOffEditing = () => {
        console.log('setting')
        setIsEditing(false);
    }

    const setNewTextHandler = data => {
        setNewText(data)
    }

    useEffect(() => {
        if(edited === true){
            var newComments = [...props.allComments];
            newComments[commentIndex].text = newText;
            props.setAllComments(newComments);
            setEdited(false);
        }
    }, [edited])

    const declaredEdited = () => {
        
        setEdited(true);
    }

    console.log("all comments", props.allComments)
    const comments = props.allComments.map((comment,index) => {
        return (
                <Comment 
                    loggedUser={props.loggedUser}
                    key={comment.id}
                    comment={comment} 
                    index={index}
                    turnOnEditing={turnOnEditing}
                    deleteComment={deleteComment}
                />
        )
    });

    return (<div className='comment-holder'>
                {isEditing && 
                <CommentEditingForm
                    comment={editingComment}
                    setEdited={declaredEdited}
                    turnOffEditing={turnOffEditing}
                    setNewText = {setNewTextHandler}
                />}
                <span className='small-event-names'>Comments:</span>
                    <div className='listOfComments'>
                        {comments}
                    </div>
            </div>)
};

export default CommentList;
