import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';

const CreateRso = props => 
{
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {owner_username: props.loggedUser.username, name:'', username1:'',username2:'',username3:'',username4:'',}
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

    const doCreate = async event =>
    {
        event.preventDefault();
        var json = JSON.stringify(formData);

        try
        {
            const response = await fetch('api/createRso', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log("new rso",res)
            if( res.message !== '' )
            {
                setMessage(res.message);
            }
            else
            {
                setMessage('');
                navigate('/rso='+res.id);
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
        {props.loggedUser && props.loggedUser.level === 'student' ?<span>You are not an admin</span>:
            <form onSubmit={doCreate} id="uploadRsoDiv">
                <span id="inner-title" style={{fontWeight:"bold",textAlign:'center'}}>Enter Your RSO Name</span><br />
                <input 
                    type="text"
                    placeholder="name"
                    id="name"
                    onChange={handleChange}
                    value={formData.name}
                /><br/>
                <span style={{textAlign:'center'}}>
                    Enter names of initial members<br/>
                </span>
                <input 
                    type="text"
                    placeholder="username"
                    id="username1"
                    onChange={handleChange}
                    value={formData.username1}
                /><br/>
                <input 
                    type="text"
                    placeholder="username"
                    id="username2"
                    onChange={handleChange}
                    value={formData.username2}
                /><br/>
                <input 
                    type="text"
                    placeholder="username"
                    id="username3"
                    onChange={handleChange}
                    value={formData.username3}
                /><br/>
                <input 
                    type="text"
                    placeholder="username"
                    id="username4"
                    onChange={handleChange}
                    value={formData.username4}
                /><br/>
                <input 
                    type="submit" 
                    value = "Create"
                    id="createButton" 
                    className="buttons"  
                />
            </form>}
            <span id="postResult">{message}</span>
        </div>
    );
}

export default CreateRso;
