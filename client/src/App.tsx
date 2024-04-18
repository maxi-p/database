import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import './app.css';
import NavBar from './components/NabBar';
import HomePage from './pages/HomePage';
import  UserHomePage  from './pages/UserHomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailsPage from './pages/DetailsPage';
import CreateRso from './components/CreateRso';
import CreateEvent from './components/CreateEvent';
import useLoggedUser from './hooks/useLoggedUser';
import RSOPage from './pages/RSOPage';

const  App = () => {
  const { loggedUser, setLoggedUser} = useLoggedUser();

  return (
    <>
      <BrowserRouter>
        <NavBar loggedUser={loggedUser} loggedHandler={setLoggedUser}/>
        <Routes>
          <Route path="/">
            <Route            
              index
              element={loggedUser? <HomePage loggedHandler={setLoggedUser} loggedUser={loggedUser}/>:<Navigate to="/login"/>}
            />
            <Route
              path=":id"
              element={loggedUser? <DetailsPage loggedUser={loggedUser}/>:<Navigate to="/login"/>}
            />
          </Route>

          <Route path="/home"
            index
            element={<Navigate to="/"/>}
          />

          <Route path="/rso"
            index
            element={loggedUser? <RSOPage loggedHandler={setLoggedUser} loggedUser={loggedUser}/>:<Navigate to="/login"/>}
          />

          <Route path="/user-home"
            index
            element={loggedUser? <UserHomePage loggedHandler={setLoggedUser} loggedUser={loggedUser}/>:<Navigate to="/login"/>}
          />

          <Route path="/create-rso"
            index
            element={loggedUser? <CreateRso loggedUser={loggedUser}  loggedHandler={setLoggedUser}/> : <Navigate to="/login"/>}
          />

          <Route path="/create-event"
            index
            element={loggedUser? <CreateEvent loggedUser={loggedUser}  loggedHandler={setLoggedUser}/> : <Navigate to="/login"/>}
          />

          <Route path="/login"
            index
            element={!loggedUser? <LoginPage loggedHandler={setLoggedUser}/>: <Navigate to="/user-home"/>}
          />

          <Route path="/register"
            index
            element={!loggedUser? <RegisterPage loggedHandler={setLoggedUser}/> : <Navigate to="/user-home"/>}
          />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App;
