import React from 'react'
import"./home.css"
const Home = ({setCount}) => {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}> 
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"1rem"}}>
      <h2 style={{color:"#4D5B9E", fontSize:"39px", marginBottom:"0"}}>Quizzical</h2>
      <p style={{marginTop:"0", fontSize:"19px"}}>Click the button below to start Quiz</p>
      <button
      onClick={()=> {setCount(true)
                    console.log("clicked")}
      }
      
      >Start Quiz</button>
      </div>
    </div>
  )
}

export default Home
