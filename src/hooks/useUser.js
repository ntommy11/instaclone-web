import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const SELF_QUERY = gql`
  query self{
    self{
      username,
      avatar
    }
  }
`

function useUser(){
  const hasToken = useReactiveVar(isLoggedInVar);
  const {data, error} = useQuery(SELF_QUERY,{
    skip: !hasToken
  });
  useEffect(()=>{
    if(data?.self !== undefined && data.self === null){ // Fake Token
      console.log("invalid token!");
      logUserOut();
    }else{
      console.log(data); 
    }
      
  },[data]);
  return {data};
}
export default useUser;