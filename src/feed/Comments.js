import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { FatText } from '../components/shared'
import useUser from '../hooks/useUser'
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


const CommentCount = styled.div`
  opacity: 0.5;
  font-size: 12px;
  margin-top:20px;
  margin-bottom: 5px;
  font-weight: 600;
`

const Form = styled.div`
  border-top: 1px solid #dedede;
  padding-top: 10px;
  margin-top: 10px;
`
function Comments({pid,author, caption, numComment, comments}){
  const { data:userData } = useUser();
  const [createComment, {loading}] = useMutation(CREATE_COMMENT,{
    onCompleted:(data)=>{
      console.log(data);
    },
    update:(cache, res)=>{
      const {data:{createComment:{ok,error,id}}} = res;
      if(ok && userData?.self){
        const {payload} = getValues();
        setValue("payload","");
        const new_comment = {
          __typename:'Comment',
          createdAt: Date.now().toString(),
          id,
          isMine: true,
          payload,
          user:{
            ...userData.self,
          }
        }
        console.log("new_comment:",new_comment);

        // Apollo Cache에 새로운 Comment 프래그맨트를 추가한다.
        const new_comment_for_cache = cache.writeFragment({
          data: new_comment,
          fragment: gql`
            fragment BSname on Comment{
              id
              createdAt
              isMine 
              payload 
              user{
                username 
                avatar 
              } 
            }
          `
        });
        console.log("new_comment_for_cache:", new_comment_for_cache);
        cache.modify({
          id:`Photo:${pid}`,
          fields:{
            comments(prev){
              return [...prev,new_comment_for_cache];
            },
            numComment(prev){
              return prev+1;
            }
          }
        })
      }
    }
  });
  const { register, handleSubmit, setValue, getValues} = useForm();
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
  }
  return(
    <Container>
      <Comment  author={author} payload={caption}/>
      <CommentCount>{numComment===1?"1 comment":`${numComment} comments`}</CommentCount>
      {comments?.map(comment=>(
        <Comment 
          pid={pid}
          key={comment.id} 
          id={comment.id} 
          author={comment.user.username} 
          payload={comment.payload}
          isMine={comment.isMine}
        />)
      )}
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