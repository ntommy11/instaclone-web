function Login({setIsLoggedIn}){
  return (
    <div>
      <h1>Login</h1>
      <button onClick={()=>setIsLoggedIn(true)}>login</button>
    </div>
  )
}
export default Login;