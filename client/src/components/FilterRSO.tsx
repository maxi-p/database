import React, { useState, useEffect } from 'react';

const Filter = props =>
{
    console.log(props.loggedUser)
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getAllRsos = async () => {
            const json = JSON.stringify({username: props.loggedUser.username});
            const response = await fetch('api/getAllRsos', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res)
            if(res.message === ''){
                setMessage('')
                props.setRsos(res.rsos);
                props.setMyRsos(res.myRsos);
            }
            else{
                setMessage(res.message);
            }
        };
        getAllRsos();
    },[props.rsoMessage]);

    const handleChange = (event) => { 
        const {name, checked} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: checked
            }
        } )
    }


    // 5 15 84 1

    return(
        <div>
        </div>
    );
};

export default Filter;
