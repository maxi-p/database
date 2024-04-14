import React, { useEffect, useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';

const Login = props =>
{
    const [comment, setComment] = useState("");
    const [message,setMessage] = useState('');
    
    const handleChange = event => {
        setComment(event.target.value)
    };

    useEffect(() => {
        const getComments = async () => {
            var json = JSON.stringify({event_id: props.id});
            const response = await fetch('api/getComments', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            props.setAllComments(res.comments)
            setMessage(res.message);
        }
        getComments();
    },[message]);

    const postComment = async (event) =>
    {
        event.preventDefault();
        var json = JSON.stringify({text: comment, student_username: props.loggedUser.username, event_id: props.id, timestamp: Date.now()});

        try
        {
            const response = await fetch('api/addComment', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setMessage(res.message);
        }
        catch(e){
            console.log(json)
            alert(e.toString());
            return;
        }

    };

    return(
        <div>
            <form onSubmit={postComment}>
                <span id="inner-title">Comment</span><br />
                <input 
                    type="text"
                    placeholder="comment"
                    id="comment"
                    onChange={handleChange}
                    value={comment}
                />
                <br/>
                <input 
                    type="submit" 
                    value = "Post Comment"
                    id="loginButton" 
                    className="buttons"  
                    onClick={postComment} 
                />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;