import { useMutation } from '@apollo/client';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {faHeart as faSolidHeart} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import PropTypes, { shape } from 'prop-types';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import { FatText } from '../components/shared';
import Comments from './Comments';

const TOGGLE_LIKE = gql`
  mutation toggleLike($id:Int!){
    toggleLike(id:$id){
      ok
      error 
    }
  }
`

const PhotoContainer = styled.div`
  background-color:white;
  border: 1px solid ${props=>props.theme.borderColor};
  margin-bottom: 20px;
  width: 415px;
  border-radius: 5px;
`
const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`
const Username = styled(FatText)`
  margin-left: 5px;
`

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`

const PhotoData = styled.div`
  padding: 15px;

`

const PhotoActions = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  div{
    display:flex;
    align-items: center;
  }
`
const PhotoAction = styled.div`
margin-right: 10px;
cursor: pointer;
`

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`

function Photo({id,user,file,likes,isLiked,caption,numComment,comments}){
  const [toggleLike, {loading}] = useMutation(TOGGLE_LIKE,{
    variables:{
      id,
    },
    update:(cache,result)=>{
      const {data:{toggleLike:{ok}}} = result; 
      console.log(ok);
      if(ok){
        /*
        cache.writeFragment({
          id: `Photo:${id}`,
          fragment: gql`
            fragment BSName on Photo{
              isLiked 
              likes
            }
          `,
          data:{
            isLiked: !isLiked,
            likes: isLiked? likes-1:likes+1
          }
        })
        */
       cache.modify({
         id: `Photo:${id}`,
         fields:{
           isLiked(prev){
             return !prev;
           },
           likes(prev){
             return isLiked? prev-1:prev+1;
           }
         }
       })
      }
    }
  })
  return(
    <PhotoContainer key={id}>
        <PhotoHeader>
          <Avatar url={user.avatar} lg={true}/>
          <Username>{user.username}</Username>
        </PhotoHeader>
        <PhotoFile src={file} />
        <PhotoData>
          <PhotoActions>
            <div>
              <PhotoAction onClick={toggleLike}><FontAwesomeIcon style={{color:isLiked?"tomato":"inherit"}} size={"lg"} icon={isLiked? faSolidHeart:faHeart}/></PhotoAction>
            <PhotoAction><FontAwesomeIcon size={"lg"} icon={faComment}/></PhotoAction>
            <PhotoAction><FontAwesomeIcon size={"lg"} icon={faPaperPlane}/></PhotoAction>
            </div>
            <div>
              <FontAwesomeIcon size={"lg"} icon={faBookmark}/>
            </div>
          </PhotoActions>
          <Likes>{likes===1? "1 like":`${likes} likes`}</Likes>
          <Comments 
            pid={id}
            author={user.username}
            caption={caption}
            comments={comments}
            numComment={numComment}
          />
        </PhotoData>
      </PhotoContainer>
  );
}

Photo.propTypes ={
  id:PropTypes.number.isRequired,
  user:PropTypes.shape({
    avatar:PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file:PropTypes.string.isRequired,
  likes:PropTypes.number.isRequired,
  isLiked:PropTypes.bool.isRequired,
  caption: PropTypes.string,
  numComment: PropTypes.number.isRequired,
}

export default Photo;