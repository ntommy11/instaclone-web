import styled from "styled-components"

const Container = styled.div`
  width: ${props=>props.lg?"30px":"20px"};
  height: ${props=>props.lg?"30px":"20px"};
  border-radius: ${props=>props.lg?"15px":"10px"};
  background-color: #dedede;
  overflow: hidden;
`
const Img =styled.img`
  max-width: 100%;
`

function Avatar({url="", lg=false}){
  return (
    <Container lg={lg}>
      {url !== ""?<Img src={url}/>:null}
    </Container>
  )
}
export default Avatar;