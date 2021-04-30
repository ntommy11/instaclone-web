import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import Devider from "../components/auth/Devider";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import routes from "../routes";


const FacebookLogin = styled.div`
  color: #385285;
  span{
    margin-left: 10px;
    font-weight: 600;
  }
`
function Login(){
  const [potato, setPotato] = useState(false);
  const togglePotato=()=>setPotato((current)=>!current);
  return (
      <AuthLayout>
        <FormBox>
          <FontAwesomeIcon icon={faInstagram}/>
          <form>
            <Input type="text" placeholder="username"/>
            <Input type="password" placeholder="password"/>
            <Button type="submit" value="Log in"/>
          </form>
          <Devider text="or"/>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare}/>
            <span>Log in with Facebook</span>
          </FacebookLogin>
        </FormBox>
        <BottomBox cta="Don't have an account?" link={routes.signUp} linkText="Sign Up"/>
      </AuthLayout>
  )
}
export default Login;