import { useNavigate, useParams } from 'react-router-dom';
import RsoDetails from '../components/RsoDetails';
import EventDetailsPage from './EventDetailsPage';

const DetailsPage = props => {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log("param ",id)
    const newId = id?.slice(4)
    // console.log(newId)
    let component;
    if(id?.includes("rso")){
        component = <RsoDetails loggedUser={props.loggedUser} id={newId}/>
    }
    else if(id?.includes("eve")){
        component = <EventDetailsPage loggedUser={props.loggedUser} id={newId}/>
    }
    else{
        console.log("yes")
        navigate('/login');
    }
    
    return (<div>
                {component}
            </div>)
}

export default DetailsPage;
