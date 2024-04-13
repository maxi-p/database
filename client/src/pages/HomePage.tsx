import React, { useState } from 'react'
import Filter from '../components/Filter';
import Events from '../components/Events';

const HomePage = props => {

  const [publicEvents, setPublicEvents] = useState([]);
  const [privateEvents, setPrivateEvents] = useState([]);
  const [rsoEvents, setRsoEvents] = useState([]);
  const [rsoMessage, setRsoMessage] = useState("");
  const [rsos, setRsos] = useState([]);
  const [myRsos, setMyRsos] = useState([]);

  const publicHandler = data => {
      setPublicEvents(data)
  }

  const privateHandler = data => {
    setPrivateEvents(data)
  }

  const rsoHandler = data => {
    setRsoEvents(data)
  }

  const rsoMessageHandler = data => {
    setRsoMessage(data)
  }

  const rso = data => {
    setRsos(data)
  }

  const myrso = data => {
    setMyRsos(data)
  }

  return (
    <div>
      <Filter loggedUser={props.loggedUser} setRsos={rso} setMyRsos={myrso} setPublicEvents={publicHandler} setPrivateEvents={privateHandler} setRsoEvents={rsoHandler} rsoMessage={rsoMessage}/>
      <Events loggedUser={props.loggedUser} rsos={rsos} myRsos={myRsos} publicEvents={publicEvents} privateEvents={privateEvents} rsoEvents={rsoEvents} rsoMessage={rsoMessage} setRsoMessage={rsoMessageHandler}/>
    </div>
  )
}

export default HomePage;
