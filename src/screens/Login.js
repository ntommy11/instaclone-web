import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import Devider from "../components/auth/Devider";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";


const FacebookLogin = styled.div`
  color: #385285;
  span{
    margin-left: 10px;
    font-weight: 600;
  }
`
function Login(){
  const {
    register, 
    watch, 
    handleSubmit, // (onValid, onInvalid) 
    formState,
    setValue,
  } = useForm({
    mode:"onChange",

  }); 
  console.log("watch:",watch());
  console.log(formState.errors);
  console.log("isValid?", formState.isValid);
  const onValid = (data)=>{
    console.log(data);
  }
  const onInvalid = (data)=>{
    console.log(data)
  }

  return (
      <AuthLayout>
        <PageTitle title="Login"/>
        <FormBox>
          <FontAwesomeIcon icon={faInstagram}/>
          <form onSubmit={handleSubmit(onValid,onInvalid)}>
            <Input 
              {...register('username',{
                required:"이름을 입력하세요",
                minLength:{
                  value: 5,
                  message: "이름은 5자 이상으로."
                }
              })}
              name="username"
              type="text" 
              placeholder="username"
              invalid={Boolean(formState.errors?.username?.message)}  
            />
            <FormError message={formState.errors?.username?.message}/>
            <Input 
              name="password"
              {...register('password',{required:"비밀번호를 입력하세요", minLength:{
                value: 5,
                message: "비밀번호는 5글자 이상"
              }})}
              type="password" 
              placeholder="password"
              invalid={Boolean(formState.errors?.password?.message)}    
            />
            <FormError message={formState.errors?.password?.message}/>
            <Button type="submit" value="Log in" disabled={!formState.isValid || !Object.keys(watch()).length}/>
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