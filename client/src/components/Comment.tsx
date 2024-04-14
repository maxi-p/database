import React from 'react'

const Comment = props => {
  return (<div key={props.comment.id} className="comment mt-4 text-justify float-left">
            <h4>{props.comment.student_username}</h4>
            <span>{new Date(props.comment.timestamp).toString()}</span>
            <br/>
            <p>{props.comment.text}</p>
        </div>)
}
export default Comment;