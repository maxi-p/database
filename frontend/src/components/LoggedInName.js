import React from 'react';

function LoggedInName()
{
    // var user={};
    const doLogout = event =>
    {
        event.preventDefault();
        alert('doLogout');
    };
    return(
        <div id="loggedInDiv">
            <span id="userName">Logged In As First Last </span><br />
            <button type="button" id="logoutButton" className="buttons" onClick={doLogout}> Log Out </button>
        </div>
    );
};
export default LoggedInName;