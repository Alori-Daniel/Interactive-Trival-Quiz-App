import { useState, React } from 'react'
import './App.css';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  const [count, setCount] = useState(false)

  return (
    <>
   {count 
   ?(<Quiz />) 

   : ( <Home 
        setCount={setCount}
   />)
    }
      
    </>
  )
}

export default App
