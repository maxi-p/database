import { useNavigate } from 'react-router-dom';

const NavBar = props => {
  const navigate = useNavigate();
  
  const nav = event => {
    const {name} = event.target;
    if(name === 'logout')
    {
      props.loggedHandler(null);
      navigate('/login');
    }
    else
    {
      navigate('/'+name);
    }
  }
  return (
    <ul className='ul'>
      <li className='li'>
        <a 
          className=""
          onClick={nav}
          name='home'
        >Home</a>
      </li>
      <li className='li'>
        <a 
          className=""
          onClick={nav}
          name='rso'
        >RSOs</a>
      </li>
      {!props.loggedUser && 
      (<li className='li'>
        <a 
          className=""
          onClick={nav}
          name='login'
        >Login</a>
      </li>)
      }
      {!props.loggedUser && (<li className='li'>
        <a 
          className=""
          onClick={nav}
          name='register'
        >Register</a>
      </li>)
      }
      {props.loggedUser &&
      (<li className='li'>
        <a 
          className=""
          onClick={nav}
          name='logout'
        >Logout</a>
      </li>)
      }  
      {props.loggedUser &&
      (<li className='li'>
        <a 
          className=""
          onClick={nav}
          name='user-home'
        >User Home</a>
      </li>)
      }
      {props.loggedUser &&
      (<li className='li'>
        <a 
          className=""
          onClick={nav}
          name='create-rso'
        >Create RSO</a>
      </li>)
      }
      {props.loggedUser &&
      (<li className='li'>
        <a 
          className=""
          onClick={nav}
          name='create-event'
        >Create Event</a>
      </li>)
      }
        
    </ul>
  )
}

export default NavBar;