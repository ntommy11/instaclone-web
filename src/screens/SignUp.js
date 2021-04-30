import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import Devider from "../components/auth/Devider";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Subtitle = styled.h3`
  font-weight:600;
  font-size: 15px;
  text-align: center;
  color: #828282;
  margin-top: 10px;
`

const FacebookLogin = styled.div`
  color: #385285;
  span{
    margin-left: 10px;
    font-weight: 600;
  }
`
function SignUp(){
  return (
      <AuthLayout>
        <FormBox>
          <HeaderContainer>
            <FontAwesomeIcon icon={faInstagram}/>
            <Subtitle>친구들의 사진과 영상을 보려면 회원가입하세요</Subtitle>
          </HeaderContainer>
          <form>
            <Input type="text" placeholder="Email"/>
            <Input type="text" placeholder="Name"/>
            <Input type="text" placeholder="Username"/>
            <Input type="password" placeholder="password"/>
            <Button type="submit" value="Sign Up"/>
          </form>

        </FormBox>
        <BottomBox cta="Have an account?" link={routes.home} linkText="Log in"/>
      </AuthLayout>
  )
}

export default SignUp;