import Comment from './Comment'

const CommentList = props =>
{  
    const comments = props.allComments.map(comment => {
        return (
                <Comment 
                    key={comment.id}
                    comment={comment} 
                />
        )
    });

    return (<div>
                <h3>Comments:</h3>
                    <ul>
                        {comments}
                    </ul>
            </div>)
};

export default CommentList;
