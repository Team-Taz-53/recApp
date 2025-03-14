import { useState } from 'react'
import { Button } from './components/Button'
import {Input} from './components/Input'
import { Card } from './components/Card'
function App() {
  //get the value of the query from the query input
  const [queryValue, setQueryValue]= useState('')

  //get the value of the location from the location input
  const [locationValue, setlocationValue]= useState('')

    //get the suggestion from the back-end
    const [suggestions, setSuggestion]= useState([])

  //Function to send the query and location to the backend
  const handleClickQuery= async ()=>{
  const response = await fetch(`http://localhost:3000/api/userquery`,{
    method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userQuery: queryValue, location: locationValue }),
  } )
  //Response returned from the back-end.
  const data = await response.json();
  setSuggestion(data)
}
console.log(suggestions)

//Function to display AI suggestions
const listOfSuggestions = () => {

  return suggestions.map((suggestion, index) => (
    <div key={index} className='suggestion-card'>
      <img src="https://placehold.co/600x400" alt="Logo" />;
      <div className="content-col">
        <h3>{suggestions[index].displayName.text}</h3>
        <p>{suggestions[index].formattedAddress}</p>
        <p>{suggestions[index].rating}</p>
        <a href={suggestions[index].googleMapsUri}>More</a>
      </div>
    </div>
  ));
};

  return (
    <>
      <main>
      <div className='container'>
        <section className="form-section">
        <div className="form">
        <Input placeholder="Enter mood..." setValue={setQueryValue}/>
        <Input placeholder="Zip Code..." setValue={setlocationValue}/>
        <Button label="click" onClick={()=>handleClickQuery()}/>
        </div>
        </section>
       <section className="card-section">
       <div className="card-grid">
          <Card className="card-music" label="MUSIC"/>
          <Card className="card-food"label="FOOD"/>
          <Card className="card-events"label="EVENTS"/>
        </div>
       </section>
        <section className='suggestion-section'>
      {listOfSuggestions()}
        </section>
      </div>
      </main>
    </>
  )
}

export default App
