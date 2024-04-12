import React from 'react'
import UserHome from '../components/UserHome';

const UserHomePage = props =>
{
    return(
        <div>
            <UserHome loggedHandler={props.loggedHandler} loggedUser={props.loggedUser}/>
        </div>
    );
}

export default UserHomePage;