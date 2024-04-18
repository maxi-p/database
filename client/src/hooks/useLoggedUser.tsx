import { useState } from 'react';

export default function useLoggedUser() {
  const getLoggedUser = () => {
    return JSON.parse(localStorage.getItem('logged_user'));
  };

  const [loggedUser, setLoggedUser] = useState(getLoggedUser());

  const saveLoggedUser = data => {
    if(data == null){
      localStorage.removeItem('logged_user');
    }
    else{
      localStorage.setItem('logged_user', JSON.stringify(data));
    }
    setLoggedUser(data);
  };

  return {
    setLoggedUser: saveLoggedUser,
    loggedUser
  }
}