import React from 'react';
import Register from '../components/Register';

const RegisterPage = props =>
{
    return(
        <div>
            <Register loggedHandler={props.loggedHandler}/>
        </div>
    );
};

export default RegisterPage;