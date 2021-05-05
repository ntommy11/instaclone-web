import React from 'react';
import styled from "styled-components";
import { FatText } from "../components/shared";
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html'
import { Link } from "react-router-dom";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_COMMENT = gql`
  mutation deleteComment($id:Int!){
    deleteComment(id:$id){
      ok 
    }
  }
`

const CommentContainer = styled.div`
  margin-top: 5px;
`

const Caption = styled.span`
  margin-left:10px;
  mark{
    background-color: inherit;
    color:${props=>props.theme.blue};
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
`

const Button = styled.button`
  border-width: 0px;
  background-color:inherit;
  color: #bcbcbc;
  font-size: 10px;
  cursor: pointer;
  &:hover{
    color: tomato;
    font-weight: 600;
  }
`

function Comment({pid, id, author, payload, isMine}){
  const [deleteComment] = useMutation(DELETE_COMMENT,{
    variables:{
      id, 
    },
    update:(cache, res)=>{
      const {data:{deleteComment:{ok}}} = res;
      if(ok){
        cache.evict({id:`Comment:${id}`});
        cache.modify({
          id: `Photo:${pid}`,
          fields:{
            numComment(prev){
              return prev-1;
            }
          }
        })
      }
    }
  });
  const onDeleteClick = ()=>{
    deleteComment();
  }
  return(
    <CommentContainer>
      <FatText>{author}</FatText>
      <Caption>
        {payload.split(" ").map(
          (word,index)=>/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word)?
            <Link key = {index} to={`/hashtags/${word}`}>{word+" "}</Link> 
            :
            <React.Fragment key={index}>{word+" "}</React.Fragment>)}
      </Caption>
      {isMine? <Button onClick={onDeleteClick}>X</Button>:null}
    </CommentContainer>
  )
}
Comment.propTypes = {
  pid:PropTypes.number,
  id:PropTypes.number,
  author:PropTypes.string.isRequired,
  payload:PropTypes.string.isRequired,
  isMine:PropTypes.bool,
}
export default Comment;