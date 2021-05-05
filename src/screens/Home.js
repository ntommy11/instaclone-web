import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import Photo from "../feed/Photo";


const FEED_QUERY = gql` 
  query seeFeed {
    seeFeed{
      id
      user{
        username 
        avatar 
      }
      file 
      caption
      likes
      createdAt
      isMine 
      isLiked
      numComment
      comments{
        id 
        user{
          avatar 
          username 
        }
        payload
        isMine 
        createdAt
      }
    }
  }
`
const Container = styled.div`
  display:flex;
  flex-direction:column;
  width: 100%;
  justify-content: center;
  align-items:center;
  align-items:center;
  justify-content:center;
`

function Home(){
  const {data} = useQuery(FEED_QUERY);
  return (
    <Container>
      <PageTitle title="Home"/>
      {data?.seeFeed?.map((photo,key)=><Photo key={key} {...photo}/> )}
    </Container>
  )
}
export default Home;