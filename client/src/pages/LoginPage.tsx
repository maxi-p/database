import React from 'react';
import Login from '../components/Login';
const LoginPage = props =>
{
    return(
        <div>
            <Login loggedHandler={props.loggedHandler}/>
        </div>
    );
};

export default LoginPage;