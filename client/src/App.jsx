import { useState } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Card } from './components/Card';
function App() {
  //get the value of the query from the query input
  const [queryValue, setQueryValue] = useState('');

  //get the value of the location from the location input
  const [locationValue, setlocationValue] = useState('');

  //get the suggestion from the back-end
  const [suggestions, setSuggestion] = useState([]);

  //Function to send the query and location to the backend
  const handleClickQuery = async () => {
    const response = await fetch(`http://localhost:3000/api/userquery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery: queryValue, location: locationValue }),
    });
    //Response returned from the back-end.
    const data = await response.json();
    setSuggestion(data);
  };
  // console.log('suggestions: ', suggestions);

  const handleFoodClickQuery = async () => {
    const response = await fetch(`http://localhost:3000/api/userfoodquery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery: 'food', location: locationValue }),
    });
    //Response returned from the back-end.
    const data = await response.json();
    console.log('data',data)
    setSuggestion(data);
  };

  const handleMusicClickQuery = async () => {
    const response = await fetch(`http://localhost:3000/api/usermusicquery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery: 'music', location: locationValue }),
    });
    //Response returned from the back-end.
    const data = await response.json();
    setSuggestion(data);
  };

 

  const handleEventsClickQuery = async () => {
    const response = await fetch(`http://localhost:3000/api/usereventsquery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery: 'events', location: locationValue }),
    });
    //Response returned from the back-end.
    const data = await response.json();
    setSuggestion(data);
  };

  //Function to display AI suggestions
  const listOfSuggestions = () => {

    if (!Array.isArray(suggestions)) {
      return <p>No suggestions available.</p>;
    }

    return suggestions.map((suggestion, index) => (
      <div key={index} className='suggestion-card'>
        <div className='suggestion-image'>
          <img src={suggestions[index].photoUrl} alt='image' />
        </div>
        <div className='suggestion-content'>
          <div className='content-text'>
            <h3>{suggestions[index].displayName.text}</h3>
            <p className='address'>{suggestions[index].formattedAddress}</p>
            <p>
              <span>rating:</span> {suggestions[index].rating}
            </p>
          </div>
          <a
            className='suggestion-info'
            href={suggestions[index].googleMapsUri}
            target='_blank'
          >
            More
          </a>
        </div>
      </div>
    ));
  };

  return (
    <>
      <main>
        <div className='container'>
          <section className='form-section'>
            <div className='form'>
              <Input placeholder='Enter mood...' setValue={setQueryValue} />
              <Input placeholder='Zip Code...' setValue={setlocationValue} />
              <Button label='ASK' onClick={() => handleClickQuery()} />
            </div>
          </section>
          <div className='header'>
            <h2>Explore</h2>
          </div>
          <section className='card-section'>
            <div className='card-grid'>
              <Card
                className='card-music'
                label='MUSIC'
                onClick={() => handleMusicClickQuery()}
              />
              <Card
                className='card-food'
                label='FOOD'
                onClick={() => handleFoodClickQuery()}
              />
              <Card
                className='card-events'
                label='EVENTS'
                onClick={() => handleEventsClickQuery()}
              />
            </div>
          </section>
          <div className='header'>
            <h2>Suggestions for You</h2>
          </div>
          <section className='suggestion-section'>
            {suggestions.length > 0 ? listOfSuggestions() : ''}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
