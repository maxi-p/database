import React, { useState } from 'react'
import Filter from '../components/Filter';
import Events from '../components/Events';

const HomePage = props => {

  const [publicEvents, setPublicEvents] = useState([]);
  const [privateEvents, setPrivateEvents] = useState([]);
  const [rsoEvents, setRsoEvents] = useState([]);

  const publicHandler = data => {
      setPublicEvents(data)
  }

  const privateHandler = data => {
    setPrivateEvents(data)
  }

  const rsoHandler = data => {
    setRsoEvents(data)
  }

  return (
    <div>
      <Filter loggedUser={props.loggedUser} setPublicEvents={publicHandler} setPrivateEvents={privateHandler} setRsoEvents={rsoHandler}/>
      <Events loggedUser={props.loggedUser} publicEvents={publicEvents} privateEvents={privateEvents} rsoEvents={rsoEvents}/>
    </div>
  )
}

export default HomePage;
