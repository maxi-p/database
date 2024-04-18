const Comment = props => {
  // console.log(props.comment)
  // console.log(props.loggedUser)
  const myDate = new Date(props.comment.timestamp);
  return (<div
            key={props.comment.id} 
            className="comment mt-4 text-justify float-left"
          >
            <div >
              <span className="username-comment">{props.comment.student_username}</span>
              <span className="small-time">{ myDate.getHours() + ":" + myDate.getMinutes() + " " + (myDate.getMonth() + 1) + "/" + myDate.getDate()}</span>
            </div>
            <span className='main-message'>{props.comment.text}</span>
            <div className='button-outside-holder'>
              {props.loggedUser.username == props.comment.student_username && <input 
                type="button" 
                value = "Edit"
                id={props.index} 
                className="buttons1"  
                onClick={props.turnOnEditing} 
                />}
            </div>
            <div className='button-outside-holder'>

            {props.loggedUser.username == props.comment.student_username && <input 
              type="button" 
              value = "Delete"
              id={props.index}
              className="buttons1"  
              onClick={props.deleteComment} 
              />}
            </div>
          </div>)
}
export default Comment;