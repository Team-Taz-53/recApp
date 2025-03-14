//Boilerplate imports
import { useRef, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
// import './Login-Page.css';


const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginRequest = async () => {

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        console.log('the username is', username)
        console.log('the password is', password)
        console.log('You are logged in');
        navigate('/dashboard', {
          state: { username: `${username}` },
        });
      } else {
        const error = await response.json();
        console.error('Login failed', error);
        alert('Login failed' + (error.message  || 'Invalid login information.'));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const registerButtonClick = async () => {
    navigate('/register');
  };

  return (
    <>
      <h1>Log In</h1>
      <div>
        <label>Username</label>
        <input type='text' placeholder ='Enter Username' onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type='password' placeholder ='Enter Password' onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <div>
          <button onClick={loginRequest}>Login</button>
          <button onClick={registerButtonClick}>Register</button>
        </div>
      </div>
    </>
  );
}

export default Login;

