import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { FatText } from '../components/shared'
import Comment from './Comment'
const Container = styled.div`
  margin-top: 20px;
`

const CREATE_COMMENT = gql`
  mutation createComment($pid:Int!, $payload: String!){
    createComment(pid:$pid, payload:$payload){
      ok 
      error 
      id 
    }
  }
`


const CommentCount = styled.span`
  opacity: 0.5;
  font-size: 12px;
  margin-top:10px;
  font-weight: 600;
`

const Form = styled.div`
  border-top: 1px solid #dedede;
  padding-top: 20px;
  margin-top: 10px;
`
function Comments({pid,author, caption, numComment, comments}){
  const [createComment, {loading}] = useMutation(CREATE_COMMENT,{
    onCompleted:(data)=>{
      console.log(data);
    }
  });
  const { register, handleSubmit, setValue} = useForm();
  const onValid = (data)=>{
    const {payload} = data;
    if(loading){
      return;
    }
    createComment({
      variables:{
        pid,
        payload,
      },
    });
    setValue("payload","");
  }
  return(
    <Container>
      <Comment author={author} payload={caption}/>
      <CommentCount>{numComment===1?"1 comment":`${numComment} comments`}</CommentCount>
      {comments?.map(comment=><Comment key={comment.id} author={comment.user.username} payload={comment.payload}/>)}
    <Form>
      <form onSubmit={handleSubmit(onValid)}>
        <input name="payload" {...register('payload',{required:true})} type="text" placeholder="Write a comment..." />
      </form>
    </Form>
    </Container>
  )
}

Comments.propTypes={
  pid:PropTypes.number.isRequired,
  author:PropTypes.string.isRequired,
  caption:PropTypes.string,
  numComment:PropTypes.number.isRequired,
  comments:PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatar:PropTypes.string,
      username: PropTypes.string.isRequired,
    }),
    payload: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }))
}
export default Comments;