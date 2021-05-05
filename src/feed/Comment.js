import React from 'react';
import styled from "styled-components";
import { FatText } from "../components/shared";
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html'
import { Link } from "react-router-dom";
const CommentContainer = styled.div`

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

function Comment({author, payload}){
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
    </CommentContainer>
  )
}
Comment.propTypes = {
  author:PropTypes.string.isRequired,
  payload:PropTypes.string.isRequired,
}
export default Comment;