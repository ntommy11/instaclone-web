function Home({setIsLoggedIn}){
  return (
    <div>
      <h1>Home</h1>
      <button onClick={()=>setIsLoggedIn(false)}>logout</button>
    </div>
  )
}
export default Home;