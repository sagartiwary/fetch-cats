// import "./App.css";
import { useState } from 'react'
import  {Dashboard  }from "./Components/Dashboard/Dashboard";
import { Form } from "./Components/Form/Form";



function App() {
  const [show, setShow] = useState(false)
  return (
    <>

      <button className='border border-gray-300 text-center block mx-auto mt-4 px-2 py-2 bg-orange-500 text-white rounded font-semibold font-serif' onClick={() => setShow(!show)}>{show ? "Show Add Cats Page" : "Show Dashboard"}</button>

      {
        !show ? <Form /> : <Dashboard />
      }

    </>
  )
}
export default App;
