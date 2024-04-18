import React, { useState } from 'react'

export const CommentEditingForm = props => {

    const [message, setMessage] = useState('');
    const [newComment, setNewComment] = useState(props.comment.text);
    
    const handleChange = (event) => {
        setNewComment(event.target.value)
    };

    const doEditComment = async (event) =>
        {
            event.preventDefault();
            var json = JSON.stringify({id: props.comment.id, newComment: newComment});
    
            try
            {
                const response = await fetch('api/editComment', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
                var res = JSON.parse(await response.text());
    
                if( res.message !== '' )
                {
                    setMessage(res.message);
                }
                else
                {
                    setMessage('');
                    props.setNewText(newComment);
                    props.setEdited();
                    props.turnOffEditing();
                }
    
            }
            catch(e){
                console.log(e.toString());
                return;
            }
    
        };

    return(
        <div className="commentEditing comment-form">
            <form>
                <span className="inner-title-edit">Edit Your Comment</span><br />
                <input 
                    type="text"
                    placeholder="newComment"
                    id="newComment"
                    className='comment-field'
                    onChange={handleChange}
                    value={newComment}
                />
                <br/>
                <input 
                    type="button" 
                    value = "Save"
                    id="loginButton" 
                    className="buttons"  
                    onClick={doEditComment} 
                />
                <input 
                    type="button" 
                    value = "Discard"
                    id="loginButton" 
                    className="buttons"  
                    onClick={props.turnOffEditing} 
                />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
}
