import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {
    console.log('updatedComment', props.updatedComment);
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {
       console.log('first call');
    }, [])
    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])

    console.log('OpenReplyComments', OpenReplyComments);
    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (
            <div className="comment_section">
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: props.firstChildCommentId && props.firstChildCommentId === comment.responseTo ? '95%': '100%', 
                    marginLeft: props.firstChildCommentId && props.firstChildCommentId === comment.responseTo ? '40px' : '0'}}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} updatedComment={props.updatedComment} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment.commentId} postId={props.postId} refreshFunction={props.refreshFunction} 
                        updatedComment={props.updatedComment} />
                    </div>
                }
            </div>
        ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
        props.refreshFunction(false);
    }


    return (
        <div>

            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: '0 0 0 20px', padding: '0 0 10px 0', color: 'gray' }}
                    onClick={handleChange} >
                    View {ChildCommentNumber} more replies
             </p>
            }

            {(OpenReplyComments || props.updatedComment) &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment
