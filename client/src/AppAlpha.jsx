import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './authComponents/Login';
import Register from './authComponents/Register';
import App from './App';

function AppAlpha() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element= {<Login/>}/>
            <Route path="/register" element= {<Register/>}/>
            <Route path="/dashboard" element= {<App/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppAlpha