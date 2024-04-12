import React, { useEffect, useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';

const Register = props =>
{
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);
    const [formData, setFormData] = useState(
        {email: "",firstname: "",lastname: "",password: "",phone: "",username: "", university:0}
    );

    const unis = universities.map(uni => {
        return (
            <option key={uni.id} id={uni.id} value={uni.id}>{uni.name}</option>
        )
    });

    const handleChange = (event) =>{
        setFormData(prevFormData => {
            const {id, value, type} = event.target;
            const attr = type === "select"? "university":id;
            return {
                ...prevFormData,
                [attr]: value
            }
        });
    };

    useEffect(() => {
        const getUniversities = async () => {
            const response = await fetch('api/getUniversities', {method:'POST',body:"{}",headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setUniversities(res.universities)
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    university: 1
                }
            });
        };
        getUniversities();
    },[])

    const [message,setMessage] = useState('');

    const doRegister = async event =>
    {
        event.preventDefault();

        var json = JSON.stringify(formData);
        try
        {
            const response = await fetch('api/register', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if(res.message !== '')
                setMessage(res.message);
            else
            {
                var user = {level: res.level,university: res.university, email: res.email ,firstname: res.firstname,lastname: res.lastname,password: res.password,phone: res.phone,username: res.username};
                console.log(user)
                localStorage.setItem('logged_user', JSON.stringify(user));
                props.loggedHandler(user);
                setMessage('');
                navigate('/home');
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
                    id="phone"
                    placeholder="Phone number" 
                    value={formData.phone}
                    onChange={handleChange} 
                />
                <br/>
                <select 
                    id="university"
                    value={formData.university}
                    onChange={handleChange}
                    name="university"    
                >
                    {unis}
                </select>
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