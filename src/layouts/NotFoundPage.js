import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../assets/img/404-error.png';
class NotFoundPage extends React.Component{
    render(){
        return <div>
            <p style={{textAlign:"center"}}>
            <img src={PageNotFound}  />
            </p>
            <p style={{textAlign:"center"}}>
                <Link to="/">Go to Home </Link>
            </p>
        </div>;
    }
}
export default NotFoundPage;