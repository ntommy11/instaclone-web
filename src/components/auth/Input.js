import styled from "styled-components"

const StyledInput = styled.input`
  box-sizing: border-box;
  width:100%;
  border-radius: 3px;
  margin-bottom: 5px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${props=>props.theme.borderColor};
`

function Input(props){
  return <StyledInput {...props}/>
}

export default Input;