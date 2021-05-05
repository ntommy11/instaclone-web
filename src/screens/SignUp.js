import { useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
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

const SIGNUP_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ){
    createAccount(
      firstName:$firstName,
      lastName:$lastName,
      username:$username,
      email:$email,
      password:$password
    ){
      ok
      error 
    }
  }

`

function SignUp(){
  const history = useHistory();
  const [createAccount,{loading}] =useMutation(SIGNUP_MUTATION,{
    onCompleted:(data)=>{
      console.log(data);
      const {createAccount:{ok}} = data;
      if(!ok){
        window.alert("Sign up FAILED");
      }else{
        history.push(routes.home,{
          message:"Account Created. Please Log in."
        });
      }
    }
  });

  const {register,formState,watch,handleSubmit} = useForm({
    mode:"onChange"
  });
  const onValid = (data)=>{
    if(loading) return;

    createAccount({
      variables:{
        ...data,
      }
    })
  }
  return (
      <AuthLayout>
        <FormBox>
          <HeaderContainer>
            <FontAwesomeIcon icon={faInstagram}/>
            <Subtitle>친구들의 사진과 영상을 보려면 회원가입하세요</Subtitle>
          </HeaderContainer>
          <form onSubmit={handleSubmit(onValid)}>
            <Input 
              {...register('firstName',{
                required:"이름을 입력하세요",
                minLength:{
                  value: 5,
                  message: "이름은 5자 이상으로."
                }
              })}
              name="firstName"
              type="text" placeholder="First Name"/>
            <FormError message={formState.errors?.firstName?.message}/>
            <Input 
              {...register('lastName')} 
              name="lastName"
              type="text" placeholder="Last Name"/>
            <Input               
              {...register('email',{
                required:"이메일을 입력하세요",
                minLength:{
                  value: 5,
                  message: "이메일 형식을 확인하세요."
                }
              })}
              name="email"
              type="text" placeholder="Email"/>
            <FormError message={formState.errors?.email?.message}/>
            <Input               
              {...register('username',{
                required:"이름을 입력하세요",
                minLength:{
                  value: 5,
                  message: "이름은 5자 이상으로."
                }
              })}
              name="username"
              type="text" placeholder="Username"/>
            <FormError message={formState.errors?.username?.message}/>
            <Input               
              {...register('password',{
                required:"비밀번호를 입력하세요",
                minLength:{
                  value: 5,
                  message: "이름은 5자 이상으로."
                }
              })}
              name="password"
              type="password" placeholder="password"/>
            <FormError message={formState.errors?.password?.message}/>
          <Button type="submit" value="Sign Up" disabled={!formState.isValid || !Object.keys(watch()).length}/>
          </form>

        </FormBox>
        <BottomBox cta="Have an account?" link={routes.home} linkText="Log in"/>
      </AuthLayout>
  )
}

export default SignUp;