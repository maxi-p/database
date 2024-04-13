import {useState, useEffect} from 'react';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import './app.css';
import isLogged from './logic/isLoggedIn';
import NavBar from './components/NabBar';
import HomePage from './pages/HomePage';
import  UserHomePage  from './pages/UserHomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventDetails from './components/EventDetails';
import RsoDetails from './components/RsoDetails';
import DetailsPage from './pages/DetailsPage';

const  App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLogged());

  const loggedHandler = data => {
    setIsLoggedIn(data);
  }
  return (
    <>
      <BrowserRouter>
        <NavBar loggedUser={isLoggedIn} loggedHandler={loggedHandler}/>
        <Routes>
          <Route path="/">
            <Route            
              index
              element={isLoggedIn? <HomePage loggedHandler={loggedHandler} loggedUser={isLoggedIn}/>:<Navigate to="/login"/>}
            />
            <Route
              path=":id"
              element={isLoggedIn? <DetailsPage loggedUser={isLoggedIn}/>:<Navigate to="/login"/>}
            />
          </Route>

          <Route path="/home"
            index
            element={<Navigate to="/"/>}
          />

          <Route path="/user-home"
            index
            element={isLoggedIn? <UserHomePage loggedHandler={loggedHandler} loggedUser={isLoggedIn}/>:<Navigate to="/login"/>}
          />

          <Route path="/login"
            index
            element={!isLoggedIn? <LoginPage loggedHandler={loggedHandler}/>: <Navigate to="/user-home"/>}
          />

          <Route path="/register"
            index
            element={!isLoggedIn? <RegisterPage loggedHandler={loggedHandler}/> : <Navigate to="/user-home"/>}
          />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App;
