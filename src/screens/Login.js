import { useState } from "react";
import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
  color: ${props=>props.theme.fontColor};
  font-family:--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  
`
const Container = styled.div`

`
const TogglePotato = styled.button`
  color: red;
`

function Login(){
  const [potato, setPotato] = useState(false);
  const togglePotato=()=>setPotato((current)=>!current);
  return (
    <Container>
      <Title potato={potato}>Login</Title>
      <TogglePotato onClick={()=>darkModeVar(true)}>dark</TogglePotato>
      <TogglePotato onClick={()=>darkModeVar(false)}>light</TogglePotato>
    </Container>
  )
}
export default Login;