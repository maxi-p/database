import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';

const Register = props =>
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {firstname: "", lastname: "", username: "", password: "", email: "", phoneNumber: ""}
    );

    const handleChange = (event) =>{
        setFormData(prevFormData => {
            const {id, value} = event.target;

            return {
                ...prevFormData,
                [id]: value
            }
        });
        

    };

    const [message,setMessage] = useState('');

    const doRegister = async event =>
    {
        event.preventDefault();

        var json = JSON.stringify(formData);
        try
        {
            const response = await fetch('api/register', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if(res.error)
                setMessage(res.error);
            else
            {
                var user = {username: res.username, firstName:res.firstName, lastName:res.lastName, id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                props.loggedHandler(user)
                setMessage('');
                navigate('/verify-email');
            }
            
        }
        catch(e){
            alert(e.toString());
            console.log(e.toString());
            return;
        }
    };

    return(
        <div id="registerDiv">
            <form onSubmit={doRegister}>
                <span id="inner-title">PLEASE LOG IN</span><br />

                <input 
                    type="text"
                    id="firstname"
                    placeholder="First Name" 
                    value={formData.firstname}
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="text"
                    id="lastname"
                    placeholder="Last Name" 
                    value={formData.lastname}
                    onChange={handleChange} 
                />
                <br/>
                <input 
                    type="text"
                    id="username"
                    placeholder="Username" 
                    value={formData.username}
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="password"
                    id="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange} 
                />
                <br/>
                <input 
                    type="text"
                    id="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone number" 
                    value={formData.phoneNumber}
                    onChange={handleChange} 
                />
                <br/>
                <input 
                    type="submit"
                    id="registerButton"
                    className="buttons" 
                    value = "Register" 
                    onClick={doRegister} 
                />
                <br/>
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;