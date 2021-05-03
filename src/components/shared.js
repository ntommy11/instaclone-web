import styled from "styled-components";

export const BaseBox = styled.div`
  background-color:${props=>props.theme.boxColor};
  border: 1px solid ${props=>props.theme.borderColor};
`;
