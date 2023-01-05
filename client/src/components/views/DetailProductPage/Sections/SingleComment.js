// 하나의 댓글에 대해 답글을 이어갈 수 있도록 하는 파일, 얘의 부모 파일이 Comments.js

import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

// Comments.js와 상호작용하기 위한 props
function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [ReplyOpened, setReplyOpened] = useState(false) // 처음에는 reply부분이 숨겨져 있어야 하므로 false

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const handleReplyOpen = () => {
        setReplyOpened(!ReplyOpened)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("") // 얘를 해줘야 답글 제출시, 답글을 입력하는 창이 비어있게 됨. 그렇지 않으면 내가 썼던 답글 그대로 입력 창에 남아있게 됨
                    setReplyOpened(!ReplyOpened) // 답글을 작성한 후, 답글 다는 창이 없어져야 하기 때문에 이 코드 추가
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    // 대댓글(=답글) 펼치기/접기 버튼
    const actions = [
        // 나중에 댓글에 좋아요/싫어요 기능 추가 : <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={handleReplyOpen} key="comment-basic-reply-to">{ReplyOpened? "답글 접기" : "답글"}</span>
    ]

    return (
        <div>
            <Comment
                // Comments.js에서 <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} /> 코드와 연관
                actions={actions} // 얘가 주석처리 되어있으면 Reply to 버튼이 보이지 않음
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

            {/* OpenReply가 true인 경우에만 아래의 내용이 보일 수 있도록 함 */}
            {ReplyOpened &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="댓글을 입력하세요"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>등록</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment