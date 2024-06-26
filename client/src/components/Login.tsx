import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';

const Login = props =>
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {username: "",password: ""}
    );
    
    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value
            }
        })
    };

    const [message,setMessage] = useState('');

    const doLogin = async (event) =>
    {
        event.preventDefault();
        var json = JSON.stringify(formData);

        try
        {
            const response = await fetch('api/login', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if( res.message !== '' )
            {
                setMessage(res.message);
            }
            else
            {
                var user = {level: res.level, university: res.university, email: res.email ,firstname: res.firstname,lastname: res.lastname,password: res.password,phone: res.phone,username: res.username};
                console.log('user',user);
                localStorage.setItem('logged_user', JSON.stringify(user));
                props.loggedHandler(user);
                setMessage('');
                navigate('/home');
            }

        }
        catch(e){
            console.log(json)
            alert(e.toString());
            return;
        }

    };

    return(
        <div >
            <form id="loginDiv" onSubmit={doLogin}>
                <span id="inner-title" style={{textAlign:'center'}}>PLEASE LOG IN</span><br />
                <input 
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                    value={formData.username}
                />
                <br/>
                <input 
                    type="password" 
                    placeholder="Password"
                    id="password"
                    onChange={handleChange} 
                    value={formData.password}
                />
                <br/>
                <input 
                    type="submit" 
                    value = "Login"
                    id="loginButton" 
                    className="buttons"  
                    onClick={doLogin} 
                />
            <span id="loginResult">{message}</span>
            </form>
        </div>
    );
};

export default Login;