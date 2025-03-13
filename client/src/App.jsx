import { useState } from 'react'
import { Button } from './components/Button'
import {Input} from './components/Input'
import { Card } from './components/Card'
function App() {
  //get the value of the query from the query input
  const [queryValue, setQueryValue]= useState('')

  //get the value of the query from the query input
  const [locationValue, setlocationValue]= useState('')

  //function fired off by the button
const func=()=>{
  return alert("working")
}
  return (
    <>
      <div className='container'>
        <div className="form-section">
        <div className="form">
        <Input placeholder="Enter mood..." setValue={setQueryValue}/>
        <Input placeholder="Zip Code..." setValue={setlocationValue}/>
        <Button label="click" onClick={func}/>
        </div>
        </div>
       <div className="card-section">
       <div className="card-grid">
          <Card className="card-music"/>
          <Card className="card-food"/>
          <Card className="card-events"/>
        </div>
       </div>
        <p>{queryValue}</p>
        <p>{locationValue}</p>
      </div>
    </>
  )
}

export default App
